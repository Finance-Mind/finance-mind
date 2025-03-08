import { z } from 'zod';

/**
 * Schema for the transaction categorizer form
 */
export const transactionCategorizerFormSchema = z.object({
  description: z
    .string()
    .min(1, 'Description is required')
    .describe('Transaction description text input by the user'),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine(val => !isNaN(parseFloat(val)), {
      message: 'Amount must be a valid number',
    })
    .describe('Transaction amount as entered by the user (string to be parsed to number)'),
  date: z.string().optional().describe('Optional transaction date in string format'),
  merchant: z.string().optional().describe('Optional merchant name for the transaction'),
});

/**
 * Schema for the transaction extractor form
 */
export const transactionExtractorFormSchema = z.object({
  prompt: z.string().min(1, 'Please describe the transaction'),
});

// Types for the form values
export type TransactionCategorizerFormValues = z.infer<typeof transactionCategorizerFormSchema>;
export type TransactionExtractorFormValues = z.infer<typeof transactionExtractorFormSchema>;
