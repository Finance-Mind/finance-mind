'use server';

import { detectP2PTransfer } from '@/actions/ai/detect-person-to-person-transfer';
import { extractCardFromFilename as aiExtractCardFromFilename } from '@/actions/ai/extract-card-info';
import { extractTransactionFields } from '@/actions/ai/extract-transaction-fields';
import { TransactionType } from '@/interfaces/enums';
import { parseCSV } from '@/lib/parsers/csv-parser';
import { parsePDF } from '@/lib/parsers/pdf-parser';

import type { Transaction } from '@/interfaces/transaction';

export interface ProcessedStatement {
  transactions: Transaction[];
  errors: string[];
  warnings: string[];
  duplicatesSkipped: number; // Add count of duplicates that were skipped
  processingTime: {
    total: number;
    parsing: number;
    extraction: number;
    detection: number;
  };
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
    processingTime: {
      total: 0,
      parsing: 0,
      extraction: 0,
      detection: 0,
    },
  };

  // Track the overall processing time
  const startTime = Date.now();

  try {
    const allExtractedTransactions: Transaction[] = [];
    const detectedAccounts: Set<string> = new Set();

    // Track existing transaction IDs to avoid duplicates
    const processedTransactionIds: Set<string> = new Set(existingTransactions.map(t => t.id));

    // Start tracking parsing time
    const parsingStartTime = Date.now();

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

          // Handle error objects returned by the PDF parser
          if (
            extractedRows.length === 1 &&
            'error' in extractedRows[0] &&
            'message' in extractedRows[0]
          ) {
            // This is an error object returned by the PDF parser
            const errorObj = extractedRows[0] as { error: string; message: string };
            result.errors?.push(`${errorObj.error}: ${errorObj.message} (${file.name})`);
            continue;
          }
        } else {
          result.errors?.push(`Unsupported file type for ${file.name}: ${file.contentType}`);
          continue;
        }

        if (extractedRows.length === 0) {
          result.warnings?.push(`No data extracted from ${file.name}`);
          continue;
        }

        // Record parsing time
        if (result.processingTime?.parsing !== undefined) {
          result.processingTime.parsing = Date.now() - parsingStartTime;
        }

        // Start tracking extraction time
        const extractionStartTime = Date.now();

        // Process each row to create transactions
        if (extractedRows.length > 0) {
          try {
            // Process all rows at once using the enhanced function (can handle JsonObjects directly)
            const batchResults = await extractTransactionFields(extractedRows);

            // Process each result
            for (let i = 0; i < batchResults.length; i++) {
              const row = extractedRows[i];
              const transactionFields = batchResults[i];

              const transactionId = JSON.stringify(row);

              if (processedTransactionIds.has(transactionId)) {
                result.duplicatesSkipped++;
                continue;
              }

              const transaction: Transaction = {
                id: transactionId,
                description: transactionFields.description,
                amount: transactionFields.amount,
                date: transactionFields.date,
                merchant: transactionFields.merchant,
                type: transactionFields.type,
                category: transactionFields.category,
                currency: transactionFields.currency || 'BRL',
                card: cardInfo,
                installment: transactionFields.installmentInfo,
              };

              // Add to processed IDs to avoid duplicates within this batch
              processedTransactionIds.add(transaction.id);
              allExtractedTransactions.push(transaction);
            }
          } catch (batchError) {
            console.error(
              'Batch processing error, falling back to individual processing:',
              batchError
            );

            // Fall back to individual processing
            for (const row of extractedRows) {
              const transactionId = JSON.stringify(row);

              if (processedTransactionIds.has(transactionId)) {
                result.duplicatesSkipped++;
                continue;
              }

              try {
                // Can now pass row object directly without JSON.stringify
                const transactionFields = await extractTransactionFields(row);

                const transactionId = JSON.stringify(row);

                if (processedTransactionIds.has(transactionId)) {
                  result.duplicatesSkipped++;
                  continue;
                }

                const transaction: Transaction = {
                  id: transactionId,
                  description: transactionFields.description,
                  amount: transactionFields.amount,
                  date: transactionFields.date,
                  merchant: transactionFields.merchant,
                  type: transactionFields.type,
                  category: transactionFields.category,
                  currency: transactionFields.currency || 'BRL',
                  card: cardInfo,
                  installment: transactionFields.installmentInfo,
                };

                // Add to processed IDs to avoid duplicates within this batch
                processedTransactionIds.add(transaction.id);
                allExtractedTransactions.push(transaction);
              } catch (rowError) {
                result.errors?.push(
                  `Error extracting transaction from row: ${JSON.stringify(row).substring(0, 100)}...`
                );
              }
            }
          }
        }

        // Record extraction time
        if (result.processingTime?.extraction !== undefined) {
          result.processingTime.extraction += Date.now() - extractionStartTime;
        }
      } catch (fileError) {
        result.errors?.push(`Error processing file ${file.name}: ${(fileError as Error).message}`);
      }
    }

    // Start tracking detection time
    const detectionStartTime = Date.now();

    // Second pass: Detect person-to-person transfers across all extracted transactions
    const processedTransactions = await detectP2PTransfers(
      allExtractedTransactions,
      Array.from(detectedAccounts)
    );

    // Record detection time
    if (result.processingTime?.detection !== undefined) {
      result.processingTime.detection = Date.now() - detectionStartTime;
    }

    // Store the processed transactions in the result
    result.transactions = processedTransactions;

    // Sort transactions by date (newest first)
    result.transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Record total processing time
    if (result.processingTime) {
      result.processingTime.total = Date.now() - startTime;
    }

    return result;
  } catch (error) {
    console.error('Error processing bank statements:', error);

    // Record total processing time even for errors
    if (result.processingTime) {
      result.processingTime.total = Date.now() - startTime;
    }

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
    if (transaction.type === TransactionType.TRANSFER || isSignificantAmount) {
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
          transaction.transfer = {
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
        if (matchingTransaction.transfer) {
          transaction.transfer = {
            matchingTransactionId: matchingTransaction.id,
            // Swap from/to for the matching transaction
            fromAccount: matchingTransaction.transfer.toAccount,
            toAccount: matchingTransaction.transfer.fromAccount,
            fromPerson: matchingTransaction.transfer.toPerson,
            toPerson: matchingTransaction.transfer.fromPerson,
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
