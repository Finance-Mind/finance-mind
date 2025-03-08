'use server';

import { processBankStatement } from '@/actions/process-bank-statement';
import { isDuplicateTransaction } from '@/lib/utils/transaction-utils';

import type { Transaction } from '@/interfaces/transaction';

/**
 * In-memory transaction store (for demo purposes)
 * In a real application, this would be replaced with a database
 */
let transactions: Transaction[] = [];

interface SaveTransactionsResult {
  saved: number;
  duplicatesSkipped: number;
  errors?: string[];
  warnings?: string[];
}

/**
 * Saves transactions to the database, preventing duplicates
 * @param newTransactions Array of transactions to save
 * @returns Result object with counts and any errors/warnings
 */
export async function saveTransactions(
  newTransactions: Transaction[]
): Promise<SaveTransactionsResult> {
  const result: SaveTransactionsResult = {
    saved: 0,
    duplicatesSkipped: 0,
    errors: [],
    warnings: [],
  };

  try {
    for (const transaction of newTransactions) {
      // Check if this transaction already exists in our store
      const isDuplicate = transactions.some(
        existingTx =>
          // Check by ID first (fastest)
          existingTx.id === transaction.id ||
          // Then check by similarity if IDs don't match
          isDuplicateTransaction(existingTx, transaction)
      );

      if (isDuplicate) {
        result.duplicatesSkipped++;
        result.warnings?.push(`Skipped duplicate transaction: ${transaction.description}`);
        continue;
      }

      // In a real app, this would be a database insert/update operation
      transactions.push(transaction);
      result.saved++;
    }

    return result;
  } catch (error) {
    console.error('Error saving transactions:', error);
    result.errors?.push(`Failed to save transactions: ${(error as Error).message}`);
    return result;
  }
}

/**
 * Processes bank statements and saves the extracted transactions
 * @param fileContents Array of file contents to process
 * @returns Result of processing and saving
 */
export async function processAndSaveTransactions(
  fileContents: {
    name: string;
    content: string | ArrayBuffer;
    contentType: string;
  }[]
): Promise<SaveTransactionsResult> {
  try {
    // Process the bank statements, passing in existing transactions to check for duplicates
    const processResult = await processBankStatement(fileContents, transactions);

    // Save the processed transactions
    const saveResult = await saveTransactions(processResult.transactions);

    // Combine results
    return {
      saved: saveResult.saved,
      duplicatesSkipped:
        (saveResult.duplicatesSkipped || 0) + (processResult.duplicatesSkipped || 0),
      errors: [...(processResult.errors || []), ...(saveResult.errors || [])],
      warnings: [...(processResult.warnings || []), ...(saveResult.warnings || [])],
    };
  } catch (error) {
    console.error('Error processing and saving transactions:', error);
    return {
      saved: 0,
      duplicatesSkipped: 0,
      errors: [`Failed to process and save transactions: ${(error as Error).message}`],
      warnings: [],
    };
  }
}

/**
 * Retrieves all transactions
 * @returns Array of all stored transactions
 */
export async function getAllTransactions(): Promise<Transaction[]> {
  // In a real app, this would be a database query
  return [...transactions];
}

/**
 * Clears all transactions (for testing purposes)
 */
export async function clearAllTransactions(): Promise<void> {
  transactions = [];
}
