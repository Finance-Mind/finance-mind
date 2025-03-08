import type { TransactionType, TransactionCategory } from '@/lib/ai/types';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: string;
  date: Date;
  description: string;
  category: TransactionCategory;
  card?: string;
  merchant?: string;
  fee?: number;
  installment?: {
    current: number;
    total: number;
  };
  isInternalTransfer?: boolean;
  isP2PTransfer?: boolean;
  transferDetails?: {
    matchingTransactionId?: string;
    fromAccount?: string;
    toAccount?: string;
    fromPerson?: string;
    toPerson?: string;
  };
}
