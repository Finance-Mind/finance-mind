/**
 * Transaction Utilities
 *
 * This module provides utility functions for working with transactions.
 */

/**
 * Generates a deterministic transaction ID based on transaction data
 *
 * This function creates a consistent ID for transactions based on their properties,
 * ensuring that the same transaction will always have the same ID regardless of
 * when or how many times it's processed.
 *
 * @param transaction Transaction data to generate ID from
 * @returns A deterministic transaction ID
 */
export function generateTransactionId(transaction?: {
  date?: Date;
  amount?: number;
  description?: string;
  merchant?: string;
  card?: string;
}): string {
  // If no transaction data is provided, fall back to random UUID
  if (!transaction || !transaction.date || !transaction.amount || !transaction.description) {
    return crypto.randomUUID();
  }

  // Create a string combining key transaction properties
  const dateStr = transaction.date.toISOString().split('T')[0]; // YYYY-MM-DD
  const amountStr = transaction.amount.toFixed(2);
  const descriptionStr = transaction.description.trim().toLowerCase();

  // Add merchant if available (for better uniqueness)
  const merchantStr = transaction.merchant ? transaction.merchant.trim().toLowerCase() : '';

  // Add card if available (to distinguish between same transactions on different cards)
  const cardStr = transaction.card ? transaction.card.trim().toLowerCase() : '';

  // Combine all components for hashing
  const dataToHash = `${dateStr}|${amountStr}|${descriptionStr}|${merchantStr}|${cardStr}`;

  // Create a hash of the data
  // Note: In browser environments, this uses the subtle crypto API
  // In Node.js, it would use the crypto module
  const encoder = new TextEncoder();
  const data = encoder.encode(dataToHash);

  // Using a simple hashing approach that works in both browser and Node.js
  // For production, consider using a more robust hashing algorithm
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = (hash << 5) - hash + data[i];
    hash |= 0; // Convert to 32bit integer
  }

  // Create a hex representation and add a prefix to make it clear this is a deterministic ID
  const hexHash = Math.abs(hash).toString(16).padStart(8, '0');
  return `tx-${dateStr}-${hexHash}`;
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
  if (!amountMatches) return false;

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
