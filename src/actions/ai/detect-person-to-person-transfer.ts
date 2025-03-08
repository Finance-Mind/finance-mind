'use server';

import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

import { userConfig } from '@/config/user';
import { defaultModel } from '@/lib/ai';
import { TransactionType } from '@/lib/ai/types';

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
    .describe(
      'Whether this is a transfer between own accounts owned by the same person (not to another person)'
    ),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe('Confidence level of the detection from 0.0 to 1.0'),
  matchingTransactionId: z
    .string()
    .optional()
    .describe('ID of a matching transaction in the opposite direction, if found'),
  fromPerson: z
    .string()
    .optional()
    .describe(
      'The source person or account name in original language (e.g., "Own Nubank Account", "João Silva")'
    ),
  toPerson: z
    .string()
    .optional()
    .describe(
      'The destination person or account name in original language (e.g., "Own Itaú Account", "Maria Souza")'
    ),
  reason: z
    .string()
    .optional()
    .describe('Clear explanation for the classification in a single sentence'),
});

export type P2PTransferDetection = z.infer<typeof p2pTransferSchema>;

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

    // Check if the transactions are close in time
    const timeDiff = Math.abs(
      new Date(transaction.date).getTime() - new Date(other.date).getTime()
    );
    const isTimeClose = timeDiff <= maxTimeDifference;

    return isTimeClose;
  });
}
