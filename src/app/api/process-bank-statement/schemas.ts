import { z } from 'zod';

import { TransactionCategory } from '@/types/transaction/enums/transaction-category';
import { TransactionType } from '@/types/transaction/enums/transaction-type';

// Zod schemas for all the types used in the API
export const FileContentSchema = z.object({
  name: z.string(),
  content: z.union([z.string(), z.instanceof(ArrayBuffer)]),
  contentType: z.string(),
});

export type FileContent = z.infer<typeof FileContentSchema>;

export const ExtractedRowSchema = z.record(z.union([z.string(), z.number()]));

export type ExtractedRow = z.infer<typeof ExtractedRowSchema>;

export const InstallmentInfoSchema = z.object({
  current: z.number(),
  total: z.number(),
});

export const TransactionFieldsSchema = z.object({
  description: z.string(),
  amount: z.number(),
  date: z.string(),
  merchant: z.string().optional(),
  type: z.nativeEnum(TransactionType),
  category: z.nativeEnum(TransactionCategory),
  currency: z.string().optional(),
  installmentInfo: InstallmentInfoSchema.optional(),
  confidence: z.number().optional(),
});

export type TransactionFields = z.infer<typeof TransactionFieldsSchema>;

export const TransferDetectionResultSchema = z.object({
  isP2PTransfer: z.boolean(),
  isInternalTransfer: z.boolean(),
  confidence: z.number(),
  matchingTransactionId: z.string().optional(),
  fromPerson: z.string().optional(),
  toPerson: z.string().optional(),
});

export type TransferDetectionResult = z.infer<typeof TransferDetectionResultSchema>;

export const TimingMetricsSchema = z.object({
  total: z.number(),
  parsing: z.number(),
  extraction: z.number(),
  detection: z.number(),
});

export type TimingMetrics = z.infer<typeof TimingMetricsSchema>;

export const ProcessedStatementSchema = z.object({
  transactions: z.array(z.any()), // Using z.any() for Transaction since it's imported
  errors: z.array(z.string()),
  warnings: z.array(z.string()),
  duplicatesSkipped: z.number(),
  processingTime: TimingMetricsSchema,
});

export type ProcessedStatement = z.infer<typeof ProcessedStatementSchema>;

// Request schema for the API endpoint
export const ProcessBankStatementRequestSchema = z.object({
  fileContents: z.array(FileContentSchema),
  existingTransactions: z.array(z.any()).optional(), // Using z.any() for Transaction since it's imported
});

export type ProcessBankStatementRequest = z.infer<typeof ProcessBankStatementRequestSchema>;
