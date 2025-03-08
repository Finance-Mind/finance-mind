'use server';

import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

import { defaultModel } from '@/lib/ai';
import { TransactionType } from '@/lib/ai/types';
import type { Transaction } from '@/interfaces/transaction';
import { userConfig } from '@/config/user';

// Schema for person-to-person transfer detection response
const p2pTransferSchema = z.object({
  isP2PTransfer: z.boolean().describe('Whether this transaction is a person-to-person transfer'),
  isInternalTransfer: z
    .boolean()
    .describe('Whether this is a transfer between own accounts (internal)'),
  confidence: z.number().min(0).max(1).describe('Confidence level of the detection (0-1)'),
  matchingTransactionId: z
    .string()
    .optional()
    .describe('ID of a matching transaction in the opposite direction'),
  fromPerson: z.string().optional().describe('The source person/account name'),
  toPerson: z.string().optional().describe('The destination person/account name'),
  reason: z.string().optional().describe('Explanation for why this is considered a P2P transfer'),
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

    const systemPrompt = `
      You are a financial assistant specialized in detecting person-to-person transfers in bank statements.
      
      A person-to-person transfer (P2P) is a money transfer between two people, which can be either:
      1. INTERNAL TRANSFER: between accounts owned by the same person
      2. EXTERNAL TRANSFER: from one person to a different person
      
      Your task is to determine if a given transaction is a P2P transfer, and if so, 
      whether it's an internal transfer (between own accounts) or an external transfer (to another person).
      
      Common indicators of internal transfers:
      1. The description contains terms like "transfer", "transferência", "TED", "DOC", "PIX" between accounts
      2. The description mentions account names, numbers, or banks with terms indicating transfers
      3. Round amounts (e.g., exactly 1000.00) with transfer-related descriptions
      4. The existence of a matching transaction in the opposite direction with similar amount and timing
      5. Mentions of "own account", "self", "between accounts", etc.
      6. Bank names on both sides of the transaction (e.g., "transfer from Nubank to Itaú")
      
      Common indicators of external transfers (to another person):
      1. The description mentions a person's name who is not the account holder
      2. Payment services like "PIX" with a recipient name or key
      3. Mentions of "send", "sent", "enviar", "enviado", "pay", "pagar" to someone else
      4. No matching transaction in the opposite direction
      
      Context about Brazilian banking:
      - "TED" and "DOC" are Brazilian bank transfer methods
      - "PIX" is an instant payment system in Brazil
      - "Transferência entre contas" means "transfer between accounts" in Portuguese
      - "Transferência enviada" means "transfer sent"
      - "Transferência recebida" means "transfer received"
      - "própria" or "mesma titularidade" indicates same ownership ("própria conta" = own account)
      
      The primary account holder is named "${userConfig.cardHolder.name}", so any transfers involving this name
      should be considered as potential internal transfers if both sides mention his name.
      
      You should consider:
      - Transaction description
      - Transaction type
      - Other matching transactions in the opposite direction
      - Known user accounts and cards
      - Source and destination information if available
      - Whether the transfer involves the primary user (${userConfig.cardHolder.name}) on both sides
      
      Return:
      - Whether this is a P2P transfer (either internal or external)
      - Whether this is specifically an internal transfer between own accounts
      - Your confidence level (0-1)
      - Reasoning for your decision
      - Source and destination persons/accounts if identifiable
    `;

    // Generate the detection
    const result = await generateObject({
      model: openai(defaultModel),
      schema: p2pTransferSchema,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `
            Please analyze this transaction and determine if it's a person-to-person transfer:
            
            Transaction: {
              description: "${transaction.description}",
              amount: ${transaction.amount},
              type: "${transaction.type}",
              card: "${transaction.card || 'Unknown'}"
            }
            
            ${
              matchingTransaction
                ? `
            Potential matching transaction found:
            {
              description: "${matchingTransaction.description}",
              amount: ${matchingTransaction.amount},
              type: "${matchingTransaction.type}",
              date: "${matchingTransaction.date.toISOString().split('T')[0]}"
            }
            `
                : 'No potential matching transactions found.'
            }
            
            Known user accounts and cards: ${accountsAndCards.length > 0 ? accountsAndCards.join(', ') : 'None provided'}
            
            The account holder name is "${userConfig.cardHolder.name}".
          `,
        },
      ],
      temperature: 0.1, // Low temperature for more consistent results
    });

    const detection = result.object as P2PTransferDetection;

    // If we found a matching transaction, include its ID
    if (matchingTransaction && (detection.isP2PTransfer || detection.isInternalTransfer)) {
      detection.matchingTransactionId = matchingTransaction.id;
    }

    console.log('P2P transfer detection result:', detection);
    return detection;
  } catch (error) {
    console.error('P2P transfer detection error:', error);
    // Return a minimal result with low confidence on error
    return {
      isP2PTransfer: false,
      isInternalTransfer: false,
      confidence: 0.1,
      reason: `Error detecting P2P transfer: ${(error as Error).message}`,
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
    const timeDiff = Math.abs(transaction.date.getTime() - other.date.getTime());
    const isTimeClose = timeDiff <= maxTimeDifference;

    return isTimeClose;
  });
}
