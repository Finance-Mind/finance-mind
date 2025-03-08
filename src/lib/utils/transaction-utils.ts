/**
 * Transaction Utilities
 *
 * This module provides utility functions for working with transactions.
 */

/**
 * Generates a deterministic transaction ID based on transaction data
 *
 * Note: In a production environment, we would use a more sophisticated
 * approach with a proper deterministic hash function that considers
 * all relevant transaction properties and produces consistent IDs
 * even when processed multiple times.
 *
 * @returns A unique transaction ID
 */
export function generateTransactionId(): string {
  // For now, use a simple UUID generator as a placeholder
  // In a real implementation, we would generate deterministic IDs
  // based on transaction data
  return crypto.randomUUID();
}

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

  // Check if descriptions are similar
  const description1 = transaction1.description.toLowerCase();
  const description2 = transaction2.description.toLowerCase();
  const descriptionSimilarity = calculateStringSimilarity(description1, description2);

  // Check if dates are close (within 1 day)
  const dateTimeDiff = Math.abs(transaction1.date.getTime() - transaction2.date.getTime());
  const dateMatches = dateTimeDiff <= 24 * 60 * 60 * 1000; // 1 day in milliseconds

  // Consider it a duplicate if amount matches exactly and
  // either descriptions are very similar or dates are close
  return (
    amountMatches && (descriptionSimilarity > 0.7 || (dateMatches && descriptionSimilarity > 0.5))
  );
}

/**
 * Calculate similarity between two strings (0-1 where 1 is identical)
 * Using a simplified version of Levenshtein distance
 *
 * @param str1 First string
 * @param str2 Second string
 * @returns Similarity score between 0-1
 */
function calculateStringSimilarity(str1: string, str2: string): number {
  // If either string is empty, return 0
  if (str1.length === 0 || str2.length === 0) {
    return 0;
  }

  // If strings are identical, return 1
  if (str1 === str2) {
    return 1;
  }

  // Calculate Levenshtein distance
  const matrix: number[][] = [];

  // Initialize matrix
  for (let i = 0; i <= str1.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str2.length; j++) {
    matrix[0][j] = j;
  }

  // Fill matrix
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  // Calculate similarity (1 - normalized distance)
  const distance = matrix[str1.length][str2.length];
  const maxLength = Math.max(str1.length, str2.length);

  return 1 - distance / maxLength;
}
