import { z } from 'zod';

import { TransactionCategory } from '@/types/transaction/enums/transaction-category';
import { TransactionType } from '@/types/transaction/enums/transaction-type';

/**
 * Schema for transaction categorization input
 */
export const transactionCategorizeSchema = z.object({
  description: z.string().describe('Transaction description or details text'),
  amount: z.number().describe('Transaction amount - positive for income, negative for expenses'),
  date: z.string().or(z.date()).describe('Transaction date as string or Date object'),
  merchant: z.string().optional().describe('Merchant name if available'),
});

/**
 * Schema for transaction categorization response
 */
export const transactionCategorizeResponseSchema = z.object({
  category: z
    .nativeEnum(TransactionCategory)
    .describe('Predefined transaction category from TransactionCategory enum'),
  type: z.nativeEnum(TransactionType).describe('Transaction type: INCOME, OUTCOME, or TRANSFER'),
  merchant: z
    .string()
    .optional()
    .describe('Formatted/cleaned merchant name extracted from the transaction'),
  isInstallment: z
    .boolean()
    .optional()
    .describe('Whether this transaction is part of an installment plan'),
  installmentInfo: z
    .object({
      current: z.number().describe('Current installment number'),
      total: z.number().describe('Total number of installments'),
    })
    .optional()
    .describe('Installment details if this is an installment payment'),
  confidence: z.number().min(0).max(1).optional().describe('AI confidence score from 0.0 to 1.0'),
});

/**
 * Schema for transaction extraction
 */
export const transactionExtractionSchema = z.object({
  description: z.string().describe('The cleaned transaction description in original language'),
  amount: z
    .number()
    .describe('The transaction amount as a number (positive for income, negative for expenses)'),
  date: z
    .string()
    .describe('The transaction date in readable format (e.g., today, yesterday, etc.)'),
  merchant: z.string().optional().describe('The merchant or entity name if present'),
  category: z
    .nativeEnum(TransactionCategory)
    .describe('The transaction category from predefined list'),
  type: z.nativeEnum(TransactionType).describe('The transaction type (INCOME, OUTCOME, TRANSFER)'),
  isInstallment: z.boolean().describe('Whether this is an installment payment'),
  installmentInfo: z
    .object({
      current: z.number().describe('Current installment number'),
      total: z.number().describe('Total number of installments'),
    })
    .optional()
    .describe('Details about the installment if applicable'),
  currency: z.string().default('BRL').describe('ISO currency code (defaults to BRL)'),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .optional()
    .describe('AI confidence level in the extraction (0.0 to 1.0)'),
});

/**
 * Schema for batch transaction extraction - uses an object with numbered transaction properties
 * This is compatible with generateObject which requires object schemas
 */
export const transactionBatchSchema = z.object({
  transactions: z
    .array(transactionExtractionSchema)
    .describe('Array of extracted transaction data'),
});

// Types for schema inference
export type TransactionCategorizeInput = z.infer<typeof transactionCategorizeSchema>;
export type TransactionCategorizeResponse = z.infer<typeof transactionCategorizeResponseSchema>;
export type TransactionExtraction = z.infer<typeof transactionExtractionSchema>;
export type TransactionBatch = z.infer<typeof transactionBatchSchema>;
