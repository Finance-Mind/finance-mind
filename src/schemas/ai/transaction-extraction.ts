import { z } from 'zod';

import { TransactionCategory } from '@/types/transaction/enums/transaction-category';
import { TransactionType } from '@/types/transaction/enums/transaction-type';

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
export const transactionBatchExtractionSchema = z.object({
  transactions: z
    .array(transactionExtractionSchema)
    .describe('Array of extracted transaction data'),
});

// Types for schema inference
export type TransactionExtraction = z.infer<typeof transactionExtractionSchema>;
export type TransactionBatchExtraction = z.infer<typeof transactionBatchExtractionSchema>;
