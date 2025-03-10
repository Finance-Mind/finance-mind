import type { Transaction } from '@/interfaces/transaction';

/**
 * Deduplicates transactions based on their IDs
 */
export const deduplicateTransactions = (
  currentTransactions: Transaction[],
  newTransactions: Transaction[]
): Transaction[] => {
  const existingTransactionIds = new Set(currentTransactions.map(t => t.id));
  const uniqueNewTransactions = newTransactions.filter(t => !existingTransactionIds.has(t.id));

  return [...currentTransactions, ...uniqueNewTransactions];
};
