import { describe, expect, test } from 'vitest';

import { generateTransactionId, isDuplicateTransaction } from '@/lib/utils/transaction-utils';


describe('Transaction Utilities', () => {
  describe('generateTransactionId', () => {
    test('should generate a deterministic ID for the same transaction data', () => {
      const transaction1 = {
        date: new Date('2023-05-15'),
        amount: 42.99,
        description: 'Coffee Shop',
        merchant: 'Starbucks',
        card: 'Credit Card',
      };

      const transaction2 = {
        date: new Date('2023-05-15'),
        amount: 42.99,
        description: 'Coffee Shop',
        merchant: 'Starbucks',
        card: 'Credit Card',
      };

      const id1 = generateTransactionId(transaction1);
      const id2 = generateTransactionId(transaction2);

      expect(id1).toBe(id2);
      expect(id1).toMatch(/^tx-\d{4}-\d{2}-\d{2}-[a-f0-9]+$/); // Format: tx-YYYY-MM-DD-hash
    });

    test('should generate different IDs for different transaction data', () => {
      const transaction1 = {
        date: new Date('2023-05-15'),
        amount: 42.99,
        description: 'Coffee Shop',
      };

      const transaction2 = {
        date: new Date('2023-05-15'),
        amount: 42.99,
        description: 'Bookstore',
      };

      const id1 = generateTransactionId(transaction1);
      const id2 = generateTransactionId(transaction2);

      expect(id1).not.toBe(id2);
    });

    test('should generate different IDs for transactions with same description but different amounts', () => {
      const transaction1 = {
        date: new Date('2023-05-15'),
        amount: 42.99,
        description: 'Coffee Shop',
      };

      const transaction2 = {
        date: new Date('2023-05-15'),
        amount: 37.5,
        description: 'Coffee Shop',
      };

      const id1 = generateTransactionId(transaction1);
      const id2 = generateTransactionId(transaction2);

      expect(id1).not.toBe(id2);
    });

    test('should generate a UUID if transaction data is incomplete', () => {
      const id = generateTransactionId({
        date: new Date(),
        // Missing required amount or description
      });

      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i); // UUID format
    });
  });

  describe('isDuplicateTransaction', () => {
    test('should identify exact duplicates', () => {
      const transaction1 = {
        date: new Date('2023-05-15'),
        amount: 42.99,
        description: 'Coffee Shop',
      };

      const transaction2 = {
        date: new Date('2023-05-15'),
        amount: 42.99,
        description: 'Coffee Shop',
      };

      expect(isDuplicateTransaction(transaction1, transaction2)).toBe(true);
    });

    test('should identify duplicates with small variations in description', () => {
      const transaction1 = {
        date: new Date('2023-05-15'),
        amount: 42.99,
        description: 'Coffee Shop - Main St',
      };

      const transaction2 = {
        date: new Date('2023-05-15'),
        amount: 42.99,
        description: 'Coffee Shop Main St',
      };

      expect(isDuplicateTransaction(transaction1, transaction2)).toBe(true);
    });

    test('should identify duplicates with date within 24 hours', () => {
      const transaction1 = {
        date: new Date('2023-05-15T10:00:00'),
        amount: 42.99,
        description: 'Coffee Shop',
      };

      const transaction2 = {
        date: new Date('2023-05-16T09:00:00'), // 23 hours later
        amount: 42.99,
        description: 'Coffee Shop',
      };

      expect(isDuplicateTransaction(transaction1, transaction2)).toBe(true);
    });

    test('should not identify as duplicate if description is very different', () => {
      const transaction1 = {
        date: new Date('2023-05-15'),
        amount: 42.99,
        description: 'Coffee Shop',
      };

      const transaction2 = {
        date: new Date('2023-05-15'),
        amount: 42.99,
        description: 'Bookstore Downtown', // Very different description
      };

      expect(isDuplicateTransaction(transaction1, transaction2)).toBe(false);
    });

    test('should not identify as duplicate if amount is different', () => {
      const transaction1 = {
        date: new Date('2023-05-15'),
        amount: 42.99,
        description: 'Coffee Shop',
      };

      const transaction2 = {
        date: new Date('2023-05-15'),
        amount: 37.5, // Different amount
        description: 'Coffee Shop',
      };

      expect(isDuplicateTransaction(transaction1, transaction2)).toBe(false);
    });

    test('should not identify as duplicate if date is more than 48 hours apart', () => {
      const transaction1 = {
        date: new Date('2023-05-15T10:00:00'),
        amount: 42.99,
        description: 'Coffee Shop',
      };

      const transaction2 = {
        date: new Date('2023-05-18T10:00:00'), // 72 hours later
        amount: 42.99,
        description: 'Coffee Shop',
      };

      // Calculate similarity for debugging
      const description1 = transaction1.description.toLowerCase();
      const description2 = transaction2.description.toLowerCase();

      // Import the similarity function for testing
      const calculateStringSimilarity = (str1: string, str2: string): number => {
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
      };

      const descriptionSimilarity = calculateStringSimilarity(description1, description2);

      // Using the same calculation as in the function
      const dateTimeDiff = Math.abs(transaction1.date.getTime() - transaction2.date.getTime());
      const dateMatches = dateTimeDiff <= 24 * 60 * 60 * 1000; // 1 day in milliseconds

      console.log('Debug info:');
      console.log('Description 1:', description1);
      console.log('Description 2:', description2);
      console.log('Description similarity:', descriptionSimilarity);
      console.log('Date time difference (ms):', dateTimeDiff);
      console.log('Date time difference (hours):', dateTimeDiff / (60 * 60 * 1000));
      console.log('Date matches (within 24h):', dateMatches);

      const result = isDuplicateTransaction(transaction1, transaction2);
      console.log('Result:', result);

      expect(result).toBe(false);
    });
  });
});
