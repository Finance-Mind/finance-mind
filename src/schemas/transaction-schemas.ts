import { z } from 'zod';

import { TransactionCategory, TransactionType } from '@/lib/ai/types';

/**
 * Schema for transaction categorization input
 */
export const transactionCategorizeSchema = z.object({
  description: z.string(),
  amount: z.number(),
  date: z.string().or(z.date()),
  merchant: z.string().optional(),
});

/**
 * Schema for transaction categorization response
 */
export const transactionCategorizeResponseSchema = z.object({
  category: z.nativeEnum(TransactionCategory),
  type: z.nativeEnum(TransactionType),
  merchant: z.string().optional(),
  isInstallment: z.boolean().optional(),
  installmentInfo: z
    .object({
      current: z.number(),
      total: z.number(),
    })
    .optional(),
  confidence: z.number().min(0).max(1).optional(),
});

/**
 * Schema for transaction extraction
 */
export const transactionExtractionSchema = z.object({
  description: z.string().describe('The transaction description'),
  amount: z.number().describe('The transaction amount as a number'),
  date: z.string().describe('The transaction date in ISO format or as specified'),
  merchant: z.string().optional().describe('The merchant or entity name'),
  category: z.nativeEnum(TransactionCategory).describe('The transaction category'),
  type: z
    .nativeEnum(TransactionType)
    .describe('The transaction type (income, outcome, or transfer)'),
  isInstallment: z.boolean().optional().describe('Whether this is an installment payment'),
  installmentInfo: z
    .object({
      current: z.number(),
      total: z.number(),
    })
    .optional()
    .describe('Installment information if applicable'),
  currency: z.string().optional().describe('Currency code (e.g., BRL, USD)'),
});

// Types for schema inference
export type TransactionCategorizeInput = z.infer<typeof transactionCategorizeSchema>;
export type TransactionCategorizeResponse = z.infer<typeof transactionCategorizeResponseSchema>;
export type TransactionExtraction = z.infer<typeof transactionExtractionSchema>;
