import { z } from 'zod';

/**
 * Schema for the transaction categorizer form
 */
export const transactionCategorizerFormSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine(val => !isNaN(parseFloat(val)), {
      message: 'Amount must be a valid number',
    }),
  date: z.string().optional(),
  merchant: z.string().optional(),
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
