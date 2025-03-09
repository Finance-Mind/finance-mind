import {
  type FileContent,
  type ExtractedRow,
  type TransactionFields,
  type TransferDetectionResult,
  type TimingMetrics,
  type ProcessedStatement,
  ProcessBankStatementRequestSchema,
} from './schemas';

import type { Transaction } from '@/interfaces/transaction';

import { detectP2PTransfer } from '@/actions/ai/detect-person-to-person-transfer';
import { extractCardFromFilename as aiExtractCardFromFilename } from '@/actions/ai/extract-card-info';
import { extractTransactionFields } from '@/actions/ai/extract-transaction-fields';
import { TransactionType } from '@/interfaces/enums';
import { parseCSV } from '@/lib/parsers/csv-parser';
import { parsePDF } from '@/lib/parsers/pdf-parser';

// API route handlers
export async function POST(request: Request): Promise<Response> {
  try {
    const data = await request.json();

    // Validate request data using Zod schema
    const parseResult = ProcessBankStatementRequestSchema.safeParse(data);

    if (!parseResult.success) {
      return Response.json(
        { error: `Invalid request: ${parseResult.error.message}` },
        { status: 400 }
      );
    }

    const { fileContents, existingTransactions = [] } = parseResult.data;

    // Always use streaming mode - no need to check URL parameters
    const encoder = new TextEncoder();
    const customReadable = new ReadableStream({
      async start(controller) {
        try {
          // Convert Base64-encoded content back to ArrayBuffer for PDF files
          const processableFileContents = fileContents.map(file => {
            if (file.contentType === 'application/pdf' && typeof file.content === 'string') {
              return {
                ...file,
                content: base64ToArrayBuffer(file.content),
              };
            }

            return file;
          });

          // Process with streaming updates
          const result = await processBankStatementWithStreaming(
            processableFileContents,
            existingTransactions,
            // Stream timing updates callback
            timingMetrics => {
              const update = JSON.stringify({
                event: 'timing-update',
                data: timingMetrics,
              });

              controller.enqueue(encoder.encode(update + '\n'));
            }
          );

          // Send the final result
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                event: 'complete',
                data: result,
              }) + '\n'
            )
          );
          controller.close();
        } catch (error) {
          console.error('Error processing files:', error);
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                event: 'error',
                data: {
                  message: `Failed to process bank statements: ${(error as Error).message}`,
                },
              }) + '\n'
            )
          );
          controller.close();
        }
      },
    });

    return new Response(customReadable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in API route:', error);

    return Response.json(
      { error: `Failed to process bank statements: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

// Helper function to convert Base64 back to ArrayBuffer
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  // Use Buffer in Node.js environment instead of window.atob
  const binary = Buffer.from(base64, 'base64');

  return binary.buffer.slice(binary.byteOffset, binary.byteOffset + binary.byteLength);
}

/**
 * Process bank statement files (CSV or PDF) with streaming updates
 * @param fileContents Object containing file content as string/ArrayBuffer and metadata
 * @param existingTransactions Optional array of existing transactions to check for duplicates
 * @param onTimingUpdate Callback for streaming timing updates
 * @returns ProcessedStatement object with extracted transactions
 */
async function processBankStatementWithStreaming(
  fileContents: FileContent[],
  existingTransactions: Transaction[] = [],
  onTimingUpdate: (timingMetrics: TimingMetrics) => void
): Promise<ProcessedStatement> {
  const result = initializeResult();
  const startTime = Date.now();

  // Send initial timing metrics
  onTimingUpdate(result.processingTime);

  try {
    // Extract and process all transactions from files
    const { transactions, detectedAccounts } = await extractTransactionsFromFiles(
      fileContents,
      existingTransactions,
      result,
      // Send updates during extraction
      updatedMetrics => {
        result.processingTime = updatedMetrics;
        onTimingUpdate(updatedMetrics);
      }
    );

    // Detect P2P transfers among transactions
    const detectionStartTime = Date.now();

    // Send update before detection starts
    result.processingTime.detection = 0;
    onTimingUpdate(result.processingTime);

    const processedTransactions = await detectP2PTransfers(
      transactions,
      Array.from(detectedAccounts)
    );

    result.processingTime.detection = Date.now() - detectionStartTime;

    // Send update after detection completes
    onTimingUpdate(result.processingTime);

    // Store and sort the processed transactions
    result.transactions = sortTransactionsByDate(processedTransactions);

    // Record total processing time
    result.processingTime.total = Date.now() - startTime;

    // Send final timing metrics
    onTimingUpdate(result.processingTime);

    return result;
  } catch (error) {
    console.error('Error processing bank statements:', error);
    result.processingTime.total = Date.now() - startTime;

    // Send final timing metrics even on error
    onTimingUpdate(result.processingTime);

    throw new Error(`Failed to process bank statements: ${(error as Error).message}`);
  }
}

/**
 * Process bank statement files (CSV or PDF)
 * @param fileContents Object containing file content as string/ArrayBuffer and metadata
 * @param existingTransactions Optional array of existing transactions to check for duplicates
 * @returns ProcessedStatement object with extracted transactions
 */
async function processBankStatement(
  fileContents: FileContent[],
  existingTransactions: Transaction[] = []
): Promise<ProcessedStatement> {
  const result = initializeResult();
  const startTime = Date.now();

  try {
    // Extract and process all transactions from files
    const { transactions, detectedAccounts } = await extractTransactionsFromFiles(
      fileContents,
      existingTransactions,
      result
    );

    // Detect P2P transfers among transactions
    const detectionStartTime = Date.now();
    const processedTransactions = await detectP2PTransfers(
      transactions,
      Array.from(detectedAccounts)
    );

    result.processingTime.detection = Date.now() - detectionStartTime;

    // Store and sort the processed transactions
    result.transactions = sortTransactionsByDate(processedTransactions);

    // Record total processing time
    result.processingTime.total = Date.now() - startTime;

    return result;
  } catch (error) {
    console.error('Error processing bank statements:', error);
    result.processingTime.total = Date.now() - startTime;
    throw new Error(`Failed to process bank statements: ${(error as Error).message}`);
  }
}

/**
 * Sort transactions by date (newest first)
 */
function sortTransactionsByDate(transactions: Transaction[]): Transaction[] {
  return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Initialize the result object with default values
 */
function initializeResult(): ProcessedStatement {
  return {
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
}

/**
 * Extract transactions from multiple files
 */
async function extractTransactionsFromFiles(
  fileContents: FileContent[],
  existingTransactions: Transaction[],
  result: ProcessedStatement,
  onTimingUpdate?: (timingMetrics: TimingMetrics) => void
): Promise<{ transactions: Transaction[]; detectedAccounts: Set<string> }> {
  const allTransactions: Transaction[] = [];
  const detectedAccounts: Set<string> = new Set();
  const processedTransactionIds: Set<string> = new Set(existingTransactions.map(t => t.id));

  const parsingStartTime = Date.now();

  for (const file of fileContents) {
    try {
      // Extract card info from filename
      const cardInfo = await extractCardInfoFromFilename(file.name);

      if (cardInfo) {
        detectedAccounts.add(cardInfo);
      }

      // Parse file based on its type
      const extractedRows = await parseFile(file, result);

      if (extractedRows.length === 0) {
        result.warnings.push(`No data extracted from ${file.name}`);
        continue;
      }

      // Update parsing time
      result.processingTime.parsing = Date.now() - parsingStartTime;

      // Send timing update if callback is provided
      if (onTimingUpdate) {
        onTimingUpdate(result.processingTime);
      }

      // Process rows into transactions
      const extractionStartTime = Date.now();
      const fileTransactions = await processExtractedRows(
        extractedRows,
        cardInfo,
        processedTransactionIds,
        result
      );

      allTransactions.push(...fileTransactions);
      result.processingTime.extraction += Date.now() - extractionStartTime;

      // Send timing update if callback is provided
      if (onTimingUpdate) {
        onTimingUpdate(result.processingTime);
      }
    } catch (fileError) {
      result.errors.push(`Error processing file ${file.name}: ${(fileError as Error).message}`);
    }
  }

  return { transactions: allTransactions, detectedAccounts };
}

/**
 * Parse a file based on its content type
 */
async function parseFile(file: FileContent, result: ProcessedStatement): Promise<ExtractedRow[]> {
  if (file.contentType === 'text/csv' && typeof file.content === 'string') {
    return await parseCSV(file.content);
  }

  if (file.contentType === 'application/pdf' && file.content instanceof ArrayBuffer) {
    const extractedRows = await parsePDF(file.content);

    // Handle error objects returned by the PDF parser
    if (
      extractedRows.length === 1 &&
      'error' in extractedRows[0] &&
      'message' in extractedRows[0]
    ) {
      const errorObj = extractedRows[0] as { error: string; message: string };

      result.errors.push(`${errorObj.error}: ${errorObj.message} (${file.name})`);

      return [];
    }

    return extractedRows;
  }

  result.errors.push(`Unsupported file type for ${file.name}: ${file.contentType}`);

  return [];
}

/**
 * Process extracted rows into transactions
 */
async function processExtractedRows(
  extractedRows: ExtractedRow[],
  cardInfo: string,
  processedTransactionIds: Set<string>,
  result: ProcessedStatement
): Promise<Transaction[]> {
  const transactions: Transaction[] = [];

  try {
    // Try batch processing first
    const batchResults = await extractTransactionFields(extractedRows);

    for (let i = 0; i < batchResults.length; i++) {
      const transaction = createTransaction(
        extractedRows[i],
        batchResults[i],
        cardInfo,
        processedTransactionIds,
        result
      );

      if (transaction) {
        transactions.push(transaction);
      }
    }

    return transactions;
  } catch (batchError) {
    console.error('Batch processing error, falling back to individual processing:', batchError);

    return processRowsIndividually(extractedRows, cardInfo, processedTransactionIds, result);
  }
}

/**
 * Process rows individually as a fallback strategy
 */
async function processRowsIndividually(
  extractedRows: ExtractedRow[],
  cardInfo: string,
  processedTransactionIds: Set<string>,
  result: ProcessedStatement
): Promise<Transaction[]> {
  const transactions: Transaction[] = [];

  for (const row of extractedRows) {
    try {
      const transactionFields = await extractTransactionFields(row);
      const transaction = createTransaction(
        row,
        transactionFields,
        cardInfo,
        processedTransactionIds,
        result
      );

      if (transaction) {
        transactions.push(transaction);
      }
    } catch {
      result.errors.push(
        `Error extracting transaction from row: ${JSON.stringify(row).substring(0, 100)}...`
      );
    }
  }

  return transactions;
}

/**
 * Create a transaction from extracted data
 */
function createTransaction(
  row: ExtractedRow,
  transactionFields: TransactionFields,
  cardInfo: string,
  processedTransactionIds: Set<string>,
  result: ProcessedStatement
): Transaction | null {
  const transactionId = JSON.stringify(row);

  if (processedTransactionIds.has(transactionId)) {
    result.duplicatesSkipped++;

    return null;
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

  processedTransactionIds.add(transaction.id);

  return transaction;
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

  // First pass: Detect potential P2P transfers
  await detectPotentialTransfers(
    transactions,
    knownAccounts,
    transferMatches,
    processedTransactions
  );

  // Second pass: Mark matched transactions
  applyTransferMatches(processedTransactions, transferMatches);

  return processedTransactions;
}

/**
 * Detect potential P2P transfers in the transactions
 */
async function detectPotentialTransfers(
  transactions: Transaction[],
  knownAccounts: string[],
  transferMatches: Map<string, string>,
  processedTransactions: Transaction[]
): Promise<void> {
  for (const transaction of transactions) {
    // Skip transactions that have already been matched as a transfer
    if (transferMatches.has(transaction.id)) {
      continue;
    }

    if (shouldCheckForTransfer(transaction)) {
      // Get other transactions to compare with (excluding this one)
      const otherTransactions = transactions.filter(t => t.id !== transaction.id);

      // Detect if this is a P2P transfer
      const result = await detectP2PTransfer(transaction, otherTransactions, knownAccounts);

      if (isConfidentTransferResult(result)) {
        applyTransferResult(transaction, result, transferMatches);
      }
    }

    processedTransactions.push(transaction);
  }
}

/**
 * Check if a transaction should be analyzed for transfer detection
 */
function shouldCheckForTransfer(transaction: Transaction): boolean {
  // Only check for transfers for large amounts or explicit transfer types
  const isSignificantAmount = Math.abs(transaction.amount) >= 50;

  return transaction.type === TransactionType.TRANSFER || isSignificantAmount;
}

/**
 * Check if a transfer detection result is confident enough
 */
function isConfidentTransferResult(result: TransferDetectionResult): boolean {
  return (result.isP2PTransfer || result.isInternalTransfer) && result.confidence >= 0.7;
}

/**
 * Apply transfer detection result to a transaction
 */
function applyTransferResult(
  transaction: Transaction,
  result: TransferDetectionResult,
  transferMatches: Map<string, string>
): void {
  // Mark this transaction with the appropriate transfer types
  transaction.isP2PTransfer = result.isP2PTransfer;
  transaction.isInternalTransfer = result.isInternalTransfer;

  // If a matching transaction was identified
  if (result.matchingTransactionId) {
    // Store the transfer details
    transaction.transfer = {
      matchingTransactionId: result.matchingTransactionId,
      fromAccount: result.fromPerson || '',
      toAccount: result.toPerson || '',
      fromPerson: result.fromPerson || '',
      toPerson: result.toPerson || '',
    };

    // Store the match to avoid duplicate processing
    transferMatches.set(transaction.id, result.matchingTransactionId);
    transferMatches.set(result.matchingTransactionId, transaction.id);
  }
}

/**
 * Apply transfer matches to all transactions
 */
function applyTransferMatches(
  processedTransactions: Transaction[],
  transferMatches: Map<string, string>
): void {
  for (const transaction of processedTransactions) {
    if (isUnmarkedTransferMatch(transaction, transferMatches)) {
      const matchingId = transferMatches.get(transaction.id);

      if (!matchingId) continue;

      const matchingTransaction = processedTransactions.find(t => t.id === matchingId);

      if (matchingTransaction?.transfer) {
        copyTransferProperties(transaction, matchingTransaction);
      }
    }
  }
}

/**
 * Check if a transaction is an unmarked transfer match
 */
function isUnmarkedTransferMatch(
  transaction: Transaction,
  transferMatches: Map<string, string>
): boolean {
  return (
    transferMatches.has(transaction.id) &&
    !transaction.isP2PTransfer &&
    !transaction.isInternalTransfer
  );
}

/**
 * Copy transfer properties from matching transaction
 */
function copyTransferProperties(transaction: Transaction, matchingTransaction: Transaction): void {
  // Copy transfer types
  transaction.isP2PTransfer = matchingTransaction.isP2PTransfer;
  transaction.isInternalTransfer = matchingTransaction.isInternalTransfer;

  // Copy transfer details with swapped directions
  if (matchingTransaction.transfer) {
    transaction.transfer = {
      matchingTransactionId: matchingTransaction.id,
      fromAccount: matchingTransaction.transfer.toAccount,
      toAccount: matchingTransaction.transfer.fromAccount,
      fromPerson: matchingTransaction.transfer.toPerson,
      toPerson: matchingTransaction.transfer.fromPerson,
    };
  }
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
