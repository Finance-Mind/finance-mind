'use server';

import { categorizeTransaction } from '@/actions/ai/categorize-transaction';
import { detectP2PTransfer } from '@/actions/ai/detect-person-to-person-transfer';
import { extractCardFromFilename as aiExtractCardFromFilename } from '@/actions/ai/extract-card-info';
import { identifyColumns } from '@/actions/ai/identify-columns';
import { userConfig } from '@/config/user';
import { TransactionCategory, TransactionType } from '@/lib/ai/types';
import { applyColumnMapping, parseCSV } from '@/lib/parsers/csv-parser';
import { parsePDF } from '@/lib/parsers/pdf-parser';
import { generateTransactionId, isDuplicateTransaction } from '@/lib/utils/transaction-utils';

import type { Transaction } from '@/interfaces/transaction';

// Default card holder name
const DEFAULT_CARD_HOLDER = userConfig.cardHolder.name;

export interface ProcessedStatement {
  transactions: Transaction[];
  errors?: string[];
  warnings?: string[];
  duplicatesSkipped?: number; // Add count of duplicates that were skipped
}

/**
 * Process bank statement files (CSV or PDF)
 * @param fileContents Object containing file content as string/ArrayBuffer and metadata
 * @param existingTransactions Optional array of existing transactions to check for duplicates
 * @returns ProcessedStatement object with extracted transactions
 */
export async function processBankStatement(
  fileContents: {
    name: string;
    content: string | ArrayBuffer;
    contentType: string;
  }[],
  existingTransactions: Transaction[] = []
): Promise<ProcessedStatement> {
  const result: ProcessedStatement = {
    transactions: [],
    errors: [],
    warnings: [],
    duplicatesSkipped: 0,
  };

  try {
    const allExtractedTransactions: Transaction[] = [];
    const detectedAccounts: Set<string> = new Set();
    const processedTransactionIds: Set<string> = new Set();

    // Track existing transaction IDs to avoid duplicates
    const existingTransactionIds: Set<string> = new Set(existingTransactions.map(t => t.id));

    // First pass: Extract all transactions from all files
    for (const file of fileContents) {
      try {
        // Extract card info from filename using AI
        const cardInfo = await extractCardInfoFromFilename(file.name);

        // Store card/account info for later transfer detection
        if (cardInfo) {
          detectedAccounts.add(cardInfo);
        }

        let extractedRows: Array<Record<string, string | number>> = [];

        // Parse the file based on its type
        if (file.contentType === 'text/csv' && typeof file.content === 'string') {
          extractedRows = await parseCSV(file.content);
        } else if (file.contentType === 'application/pdf' && file.content instanceof ArrayBuffer) {
          extractedRows = await parsePDF(file.content);
        } else {
          result.errors?.push(`Unsupported file type for ${file.name}: ${file.contentType}`);
          continue;
        }

        if (extractedRows.length === 0) {
          result.warnings?.push(`No data extracted from ${file.name}`);
          continue;
        }

        // Use AI to identify columns
        let mappedRows = extractedRows;

        if (extractedRows.length > 0) {
          try {
            // Extract headers from the first row's keys
            const headers = Object.keys(extractedRows[0]);

            // Use AI to identify columns
            const columnMapping = await identifyColumns(headers, extractedRows.slice(0, 5));

            // Apply the mapping to standardize field names
            if (columnMapping.confidence >= 0.3) {
              mappedRows = applyColumnMapping(extractedRows, columnMapping);
              console.log(`Applied column mapping with confidence: ${columnMapping.confidence}`);
            } else {
              result.warnings?.push(
                `Low confidence column mapping for ${file.name}: ${columnMapping.confidence}`
              );
            }
          } catch (mappingError) {
            console.error('Error identifying columns:', mappingError);
            result.warnings?.push(
              `Error identifying columns in ${file.name}: ${(mappingError as Error).message}`
            );
            // Continue with original rows if mapping fails
          }
        }

        // Process each row to create transactions
        for (const row of mappedRows) {
          try {
            const transaction: Transaction = {
              id: generateTransactionId(row),
              description: '',
              amount: 0,
              date: new Date(),
              type: TransactionType.OUTCOME,
              category: TransactionCategory.UNCATEGORIZED,
              currency: 'BRL', // Default to Brazilian Real
            };

            const categorization = await categorizeTransaction({
              description: transaction.description,
              amount: transaction.amount,
              date: transaction.date,
              merchant: transaction.merchant,
            });

            // Update transaction with AI categorization
            transaction.category = categorization.category;
            transaction.type = categorization.type;

            if (categorization.merchant) {
              transaction.merchant = categorization.merchant;
            }

            if (categorization.isInstallment && categorization.installmentInfo) {
              transaction.installment = {
                current: categorization.installmentInfo.current,
                total: categorization.installmentInfo.total,
              };
            }

            // Check if this transaction is a duplicate of an existing transaction
            const isDuplicate = existingTransactions.some(existingTx =>
              isDuplicateTransaction(existingTx, transaction)
            );

            // Also check if it's a duplicate within the current batch
            const isDuplicateInBatch = allExtractedTransactions.some(newTx =>
              isDuplicateTransaction(newTx, transaction)
            );

            if (isDuplicate || isDuplicateInBatch) {
              // Skip duplicates and increment the counter
              if (result.duplicatesSkipped !== undefined) {
                result.duplicatesSkipped++;
              }

              continue;
            }

            // Skip if we already have a transaction with this ID
            if (
              existingTransactionIds.has(transaction.id) ||
              processedTransactionIds.has(transaction.id)
            ) {
              if (result.duplicatesSkipped !== undefined) {
                result.duplicatesSkipped++;
              }

              continue;
            }

            // Add to processed IDs to avoid duplicates within this batch
            processedTransactionIds.add(transaction.id);
            allExtractedTransactions.push(transaction);
          } catch (rowError) {
            result.errors?.push(
              `Error processing row from ${file.name}: ${(rowError as Error).message}`
            );
          }
        }
      } catch (fileError) {
        result.errors?.push(`Error processing file ${file.name}: ${(fileError as Error).message}`);
      }
    }

    // Second pass: Detect person-to-person transfers across all extracted transactions
    const processedTransactions = await detectP2PTransfers(
      allExtractedTransactions,
      Array.from(detectedAccounts)
    );

    // Store the processed transactions in the result
    result.transactions = processedTransactions;

    // Sort transactions by date (newest first)
    result.transactions.sort((a, b) => b.date.getTime() - a.date.getTime());

    return result;
  } catch (error) {
    console.error('Error processing bank statements:', error);
    throw new Error(`Failed to process bank statements: ${(error as Error).message}`);
  }
}

/**
 * Process all transactions to detect P2P transfers
 * @param transactions List of transactions to process
 * @param knownAccounts List of known account names/cards
 * @returns Processed transactions with P2P transfer information
 */
async function detectP2PTransfers(
  transactions: Transaction[],
  knownAccounts: string[]
): Promise<Transaction[]> {
  const processedTransactions: Transaction[] = [];
  const transferMatches: Map<string, string> = new Map(); // Maps transaction IDs to their matching transfer

  // First pass: Use AI to detect potential P2P transfers
  for (const transaction of transactions) {
    // Skip transactions that have already been matched as a transfer
    if (transferMatches.has(transaction.id)) {
      continue;
    }

    // Only check for transfers for large amounts or explicit transfer types
    const isSignificantAmount = Math.abs(transaction.amount) >= 50; // Threshold to avoid checking small transactions
    if (
      transaction.type === TransactionType.TRANSFER ||
      transaction.category === TransactionCategory.OTHER_INCOME ||
      transaction.category === TransactionCategory.OTHER_EXPENSE ||
      isSignificantAmount
    ) {
      // Get other transactions to compare with (excluding this one)
      const otherTransactions = transactions.filter(t => t.id !== transaction.id);

      // Detect if this is a P2P transfer
      const result = await detectP2PTransfer(transaction, otherTransactions, knownAccounts);

      if ((result.isP2PTransfer || result.isInternalTransfer) && result.confidence >= 0.7) {
        // Mark this transaction with the appropriate transfer types
        transaction.isP2PTransfer = result.isP2PTransfer;
        transaction.isInternalTransfer = result.isInternalTransfer;

        // If a matching transaction was identified
        if (result.matchingTransactionId) {
          // Store the transfer details
          transaction.transferDetails = {
            matchingTransactionId: result.matchingTransactionId,
            fromAccount: result.fromPerson,
            toAccount: result.toPerson,
            fromPerson: result.fromPerson,
            toPerson: result.toPerson,
          };

          // Store the match to avoid duplicate processing
          transferMatches.set(transaction.id, result.matchingTransactionId);
          transferMatches.set(result.matchingTransactionId, transaction.id);
        }
      }
    }

    processedTransactions.push(transaction);
  }

  // Second pass: Make sure all transactions involved in transfers are marked correctly
  for (const transaction of processedTransactions) {
    // If this transaction is matched as part of a transfer but not yet marked
    if (
      transferMatches.has(transaction.id) &&
      !transaction.isP2PTransfer &&
      !transaction.isInternalTransfer
    ) {
      // Find the matching transaction
      const matchingId = transferMatches.get(transaction.id);
      const matchingTransaction = processedTransactions.find(t => t.id === matchingId);

      if (matchingTransaction) {
        // Copy transfer types from the matching transaction
        transaction.isP2PTransfer = matchingTransaction.isP2PTransfer;
        transaction.isInternalTransfer = matchingTransaction.isInternalTransfer;

        // Copy transfer details from the matching transaction
        if (matchingTransaction.transferDetails) {
          transaction.transferDetails = {
            matchingTransactionId: matchingTransaction.id,
            // Swap from/to for the matching transaction
            fromAccount: matchingTransaction.transferDetails.toAccount,
            toAccount: matchingTransaction.transferDetails.fromAccount,
            fromPerson: matchingTransaction.transferDetails.toPerson,
            toPerson: matchingTransaction.transferDetails.fromPerson,
          };
        }
      }
    }
  }

  return processedTransactions;
}

/**
 * Extract card information from filename using AI
 * @param fileName The name of the file
 * @returns Formatted card information string
 */
async function extractCardInfoFromFilename(fileName: string): Promise<string> {
  try {
    // Use AI to extract card information from filename
    const extraction = await aiExtractCardFromFilename(fileName);

    // If confidence is too low, return generic card info
    if (!extraction || extraction.confidence < 0.3) {
      return '';
    }

    // Format the card information based on the extraction
    const parts: string[] = [];

    if (extraction.bankName) {
      parts.push(extraction.bankName);
    }

    if (extraction.accountType) {
      parts.push(extraction.accountType);
    }

    if (extraction.cardType) {
      parts.push(extraction.cardType);
    }

    if (extraction.cardIdentifier) {
      parts.push(extraction.cardIdentifier);
    }

    return parts.join(' ');
  } catch (error) {
    console.warn('Error extracting card info from filename:', error);
    return '';
  }
}
