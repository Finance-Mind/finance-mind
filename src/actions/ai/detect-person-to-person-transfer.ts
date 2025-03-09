'use server';

import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

import { userConfig } from '@/config/user';
import { defaultModel } from '@/lib/ai';
import { TransactionType } from '@/lib/ai/types';
import { calculateStringSimilarity } from '@/utils/calculate-string-similarity';

import type { Transaction } from '@/interfaces/transaction';

// Schema for person-to-person transfer detection response
const p2pTransferSchema = z.object({
  isP2PTransfer: z
    .boolean()
    .describe(
      'Whether this transaction is a person-to-person transfer (between accounts or to another person)'
    ),
  isInternalTransfer: z
    .boolean()
    .describe("Whether this is a transfer between user's own accounts"),
  matchingTransactionId: z.string().optional().describe('ID of the matching transaction if found'),
  fromPerson: z.string().optional().describe('Person or account sending the money'),
  toPerson: z.string().optional().describe('Person or account receiving the money'),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe('Confidence level for this detection from 0.0 to 1.0'),
  reason: z.string().describe('Explanation for why this was classified as it was'),
});

export type P2PTransferDetection = z.infer<typeof p2pTransferSchema>;

/**
 * Improved helper function to check if names are similar (likely the same person)
 * This helps with detecting internal transfers between accounts owned by the same person
 */
function areSimilarNames(name1: string, name2: string): boolean {
  // Clean up names for comparison
  const clean1 = name1.toLowerCase().trim();
  const clean2 = name2.toLowerCase().trim();

  // Direct match
  if (clean1 === clean2) return true;

  // Use string similarity algorithm for fuzzy matching
  const SIMILARITY_THRESHOLD = 0.75; // High threshold for name matching
  const similarityScore = calculateStringSimilarity(clean1, clean2);
  if (similarityScore >= SIMILARITY_THRESHOLD) return true;

  // Check if one is a subset of the other
  if (clean1.includes(clean2) || clean2.includes(clean1)) return true;

  // Check for first name match (if both have multiple names)
  const firstName1 = clean1.split(' ')[0];
  const firstName2 = clean2.split(' ')[0];
  if (firstName1 && firstName2) {
    // If first names are similar with high threshold
    const firstNameSimilarity = calculateStringSimilarity(firstName1, firstName2);
    if (firstNameSimilarity >= 0.9) return true;

    // Exact first name match
    if (firstName1 === firstName2) return true;
  }

  // Check against known variations of the user's name
  const userVariations = userConfig.cardHolder.possibleVariations.map(v => v.toLowerCase().trim());

  // Check similarity against all name variations
  for (const variation of [...userVariations, userConfig.cardHolder.name.toLowerCase().trim()]) {
    // Check similarity of name1 against variation
    if (calculateStringSimilarity(clean1, variation) >= SIMILARITY_THRESHOLD) {
      // If name1 matches a variation, check if name2 matches any variation too
      if (clean2 === userConfig.cardHolder.name.toLowerCase().trim()) return true;

      for (const otherVar of [...userVariations, userConfig.cardHolder.name.toLowerCase().trim()]) {
        if (calculateStringSimilarity(clean2, otherVar) >= SIMILARITY_THRESHOLD) {
          return true;
        }
      }
    }

    // Check similarity of name2 against variation
    if (calculateStringSimilarity(clean2, variation) >= SIMILARITY_THRESHOLD) {
      // If name2 matches a variation, check if name1 matches any variation too
      if (clean1 === userConfig.cardHolder.name.toLowerCase().trim()) return true;

      for (const otherVar of [...userVariations, userConfig.cardHolder.name.toLowerCase().trim()]) {
        if (calculateStringSimilarity(clean1, otherVar) >= SIMILARITY_THRESHOLD) {
          return true;
        }
      }
    }
  }

  return false;
}

/**
 * Detect if a transaction is a person-to-person transfer, including internal transfers
 * @param transaction The transaction to analyze
 * @param otherTransactions Other transactions to compare for potential matches
 * @param accountsAndCards List of user's known accounts and cards
 * @returns Detection result with confidence score
 */
export async function detectP2PTransfer(
  transaction: Transaction,
  otherTransactions: Transaction[] = [],
  accountsAndCards: string[] = []
): Promise<P2PTransferDetection> {
  try {
    // Don't process transactions that are already determined to not be transfers
    if (
      transaction.type !== TransactionType.TRANSFER &&
      !isLikelyTransfer(transaction.description)
    ) {
      return {
        isP2PTransfer: false,
        isInternalTransfer: false,
        confidence: 0.9,
        reason: "Transaction type is not TRANSFER and description doesn't suggest a transfer",
      };
    }

    // First check for obvious internal transfers using name-based heuristics
    if (transaction.merchant) {
      // If this is a received transfer and the merchant name seems to be the same person
      if (
        transaction.amount > 0 &&
        areSimilarNames(transaction.merchant, userConfig.cardHolder.name)
      ) {
        return {
          isP2PTransfer: false,
          isInternalTransfer: true,
          confidence: 0.9,
          fromPerson: transaction.merchant,
          toPerson: userConfig.cardHolder.name,
          reason: `This appears to be an internal transfer between accounts owned by the same person (${transaction.merchant} and ${userConfig.cardHolder.name}).`,
        };
      }
    }

    // Check if we have any matching transactions in the opposite direction
    const matchingTransaction = findMatchingTransaction(transaction, otherTransactions);

    // Define system instructions for the AI model
    const systemPrompt = `
// ROLE
You are a financial transfer detection expert specializing in Brazilian banking systems.

// TASK
Analyze transactions and determine if they represent transfers between people or accounts.

// TRANSFER TYPES
- INTERNAL TRANSFERS: Between accounts owned by the same person (e.g., from checking to savings)
- EXTERNAL TRANSFERS: From one person to another person (e.g., paying a friend)

// TRANSACTION TYPE
Remember that TRANSFER is a transaction type, not a category. Transactions with type TRANSFER can have various categories based on the purpose of the transfer.

// INTERNAL TRANSFER INDICATORS
- Transfer terminology with account references ("transfer from checking to savings")
- Banking terms: "transferência", "TED", "DOC", "PIX" between own accounts
- Bank names on both sides of the transaction
- Matching opposing transaction with similar amount and timing
- References to "own account", "self", or "between accounts"
- Similar names that likely represent the same person (e.g., "Andre Dezzy Victor" and "André Victor")

// EXTERNAL TRANSFER INDICATORS
- Recipient names that are not the account holder
- PIX/payment services with recipient information
- References to sending/receiving money to others
- Personal transfer descriptions

// CONTEXT
Account holder name: "${userConfig.cardHolder.name}"
Known accounts: ${accountsAndCards.join(', ')}
`.trim();

    // Define the specific transaction data for analysis
    const userPrompt = `
Analyze this transaction for P2P transfer detection:

Description: ${transaction.description}
Amount: ${transaction.amount}
Date: ${transaction.date}
Type: ${transaction.type}
Category: ${transaction.category}
${transaction.merchant ? `Merchant: ${transaction.merchant}` : ''}

${
  matchingTransaction
    ? `There is a matching transaction in the opposite direction:
Matching ID: ${matchingTransaction.id}
Matching Description: ${matchingTransaction.description}
Matching Amount: ${matchingTransaction.amount}
Matching Date: ${matchingTransaction.date}
`
    : 'No matching transaction found in the opposite direction.'
}
`.trim();

    const result = await generateObject({
      model: openai(defaultModel),
      schema: p2pTransferSchema,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.2,
    });

    // Log warnings if any
    if (result.warnings && result.warnings.length > 0) {
      console.warn('P2P transfer detection warnings:', result.warnings);
    }

    console.log('P2P transfer detection result:', result.object);

    return result.object;
  } catch (error) {
    console.error('P2P transfer detection error:', error);
    return {
      isP2PTransfer: transaction.type === TransactionType.TRANSFER,
      isInternalTransfer: false,
      confidence: 0.3,
      reason: 'Error in P2P detection, defaulting based on transaction type',
    };
  }
}

/**
 * Check if a transaction description is likely to be a transfer
 * @param description The transaction description
 * @returns True if the description suggests a transfer
 */
function isLikelyTransfer(description: string): boolean {
  const transferTerms = [
    'transfer',
    'transferencia',
    'transferência',
    'ted',
    'doc',
    'pix',
    'envio',
    'enviada',
    'enviado',
    'recebido',
    'recebida',
    'entre contas',
    'mesma titularidade',
    'para conta',
    'da conta',
    'from account',
    'to account',
    'pagamento para',
    'payment to',
    'enviou pix',
    'sent pix',
    'recebeu pix',
    'received pix',
  ];

  const normalizedDesc = description.toLowerCase();

  return transferTerms.some(term => normalizedDesc.includes(term));
}

/**
 * Find a matching transaction that likely represents the other side of a transfer
 * @param transaction The transaction to find a match for
 * @param otherTransactions List of other transactions to search
 * @returns Matching transaction if found, undefined otherwise
 */
function findMatchingTransaction(
  transaction: Transaction,
  otherTransactions: Transaction[]
): Transaction | undefined {
  // Don't try to match if we don't have other transactions
  if (!otherTransactions.length) return undefined;

  // For transfers, we look for transactions in the opposite direction
  // with a similar amount within a short time window
  const isOutgoing = transaction.amount < 0;
  const absAmount = Math.abs(transaction.amount);

  // For matching, we allow a 3-day window (transfers might take time to appear)
  const maxTimeDifference = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

  // Helper to check name similarity in descriptions/merchants
  const checkDescriptionSimilarity = (desc1: string, desc2: string): boolean => {
    if (!desc1 || !desc2) return false;

    const clean1 = desc1.toLowerCase().trim();
    const clean2 = desc2.toLowerCase().trim();

    // Direct match
    if (clean1 === clean2) return true;

    // Use string similarity for fuzzy matching
    return calculateStringSimilarity(clean1, clean2) >= 0.6; // Lower threshold for descriptions
  };

  // Look for matching transactions
  return otherTransactions.find(other => {
    // If transactions have the same direction, they're not matching sides of a transfer
    const otherIsOutgoing = other.amount < 0;
    if (isOutgoing === otherIsOutgoing) return false;

    // Check if amounts match (allow for small differences due to fees)
    const otherAbsAmount = Math.abs(other.amount);
    const amountDiff = Math.abs(absAmount - otherAbsAmount);
    const isAmountSimilar = amountDiff <= 1 || amountDiff / absAmount <= 0.01; // 1 currency unit or 1% difference

    if (!isAmountSimilar) return false;

    // Check if dates are close (within the allowed window)
    const transactionDate = new Date(transaction.date).getTime();
    const otherDate = new Date(other.date).getTime();
    const timeDiff = Math.abs(transactionDate - otherDate);

    if (timeDiff > maxTimeDifference) return false;

    // Check if the descriptions or merchants are related
    // This helps identify transfers between accounts even if the transaction IDs are different
    if (
      transaction.merchant &&
      other.merchant &&
      areSimilarNames(transaction.merchant, other.merchant)
    ) {
      return true;
    }

    // Check description similarity
    if (checkDescriptionSimilarity(transaction.description, other.description)) {
      return true;
    }

    // If both have merchants, check for similarity in merchants vs descriptions
    if (
      transaction.merchant &&
      other.description &&
      checkDescriptionSimilarity(transaction.merchant, other.description)
    ) {
      return true;
    }

    if (
      other.merchant &&
      transaction.description &&
      checkDescriptionSimilarity(other.merchant, transaction.description)
    ) {
      return true;
    }

    // For transfer identification, if amount and timing match, that's often enough
    return isAmountSimilar && timeDiff <= maxTimeDifference;
  });
}
