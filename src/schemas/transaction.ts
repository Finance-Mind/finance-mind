import { z } from 'zod';

import { TransactionCategory } from '@/types/transaction/enums/transaction-category';
import { TransactionType } from '@/types/transaction/enums/transaction-type';

// Define the installment schema
const installmentSchema = z.object({
  current: z.number().int().positive().describe('Current installment number'),
  total: z.number().int().positive().describe('Total number of installments'),
});

// Define the transfer schema
const transferSchema = z.object({
  matchingTransactionId: z
    .string()
    .optional()
    .describe('ID of the matching transaction in a transfer'),
  fromAccount: z.string().optional().describe('Source account ID for the transfer'),
  toAccount: z.string().optional().describe('Destination account ID for the transfer'),
  fromPerson: z.string().optional().describe('Source person name for the transfer'),
  toPerson: z.string().optional().describe('Destination person name for the transfer'),
});

// Define the main transaction schema
export const transactionSchema = z.object({
  id: z.string().describe('Unique identifier for the transaction'),
  type: z.nativeEnum(TransactionType).describe('Type of transaction'),
  amount: z.number().describe('Transaction amount'),
  currency: z.string().describe('Currency code for the transaction'),
  date: z.string().describe('Date of the transaction'),
  description: z.string().describe('Description of the transaction'),
  category: z.nativeEnum(TransactionCategory).describe('Category of the transaction'),
  card: z.string().optional().describe('Card used for the transaction'),
  merchant: z.string().optional().describe('Merchant name for the transaction'),
  fee: z.number().optional().describe('Fee associated with the transaction'),
  installment: installmentSchema.optional().describe('Installment details if applicable'),
  isInternalTransfer: z.boolean().optional().describe('Whether this is an internal transfer'),
  isP2PTransfer: z.boolean().optional().describe('Whether this is a peer-to-peer transfer'),
  transfer: transferSchema.optional().describe('Transfer details if applicable'),
});

export type Transaction = z.infer<typeof transactionSchema>;
