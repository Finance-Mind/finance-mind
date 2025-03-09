/**
 * Transaction Utilities
 *
 * This module provides utility functions for working with transactions.
 */

import { calculateStringSimilarity } from '@/utils/calculate-string-similarity';

/**
 * Determines if a transaction is likely a duplicate of another
 *
 * @param transaction1 First transaction to compare
 * @param transaction2 Second transaction to compare
 * @returns True if the transactions are likely duplicates
 */
export function isDuplicateTransaction(
  transaction1: {
    date: Date;
    amount: number;
    description: string;
  },
  transaction2: {
    date: Date;
    amount: number;
    description: string;
  }
): boolean {
  // Check if amount is the same (within a small epsilon for floating point issues)
  const amountMatches = Math.abs(transaction1.amount - transaction2.amount) < 0.01;

  if (!amountMatches) {
    return false;
  }

  // Check if descriptions are similar
  const description1 = transaction1.description.toLowerCase();
  const description2 = transaction2.description.toLowerCase();
  const descriptionSimilarity = calculateStringSimilarity(description1, description2);

  // Check if dates are close (within 1 day)
  const dateTimeDiff = Math.abs(transaction1.date.getTime() - transaction2.date.getTime());
  const dateMatches = dateTimeDiff <= 24 * 60 * 60 * 1000; // 1 day in milliseconds

  // If dates are more than 2 days apart, it's not a duplicate regardless of description
  if (dateTimeDiff > 48 * 60 * 60 * 1000) return false;

  // If dates are between 1-2 days apart, only consider it a duplicate if descriptions are identical
  if (dateTimeDiff > 24 * 60 * 60 * 1000 && descriptionSimilarity < 1) return false;

  // For transactions within 24 hours, use similarity threshold
  return (
    amountMatches &&
    ((dateMatches && descriptionSimilarity > 0.7) ||
      (description1 === description2 && dateTimeDiff <= 48 * 60 * 60 * 1000))
  );
}
