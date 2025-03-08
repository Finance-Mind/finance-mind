'use server';

import { categorizeTransaction } from '@/actions/ai/categorize-transaction';
import { extractCardFromFilename as aiExtractCardFromFilename } from '@/actions/ai/extract-card-info';
import { extractCardInfoFromRow, formatCardInfo } from '@/actions/ai/extract-card-info-from-row';
import { detectP2PTransfer } from '@/actions/ai/detect-person-to-person-transfer';
import { identifyColumns } from '@/actions/ai/identify-columns';
import { TransactionCategory, TransactionType } from '@/lib/ai/types';
import type { Transaction } from '@/interfaces/transaction';

import { applyColumnMapping, parseCSV } from '@/lib/parsers/csv-parser';
import { parsePDF } from '@/lib/parsers/pdf-parser';
import { generateTransactionId } from '@/lib/utils/transaction-utils';
import { userConfig } from '@/config/user';

// Default card holder name
const DEFAULT_CARD_HOLDER = userConfig.cardHolder.name;

export type ProcessedStatement = {
  transactions: Transaction[];
  errors?: string[];
  warnings?: string[];
};

/**
 * Process bank statement files (CSV or PDF)
 * @param fileContents Object containing file content as string/ArrayBuffer and metadata
 * @returns ProcessedStatement object with extracted transactions
 */
export async function processBankStatement(
  fileContents: {
    name: string;
    content: string | ArrayBuffer;
    contentType: string;
  }[]
): Promise<ProcessedStatement> {
  const result: ProcessedStatement = {
    transactions: [],
    errors: [],
    warnings: [],
  };

  try {
    const allExtractedTransactions: Transaction[] = [];
    const detectedAccounts: Set<string> = new Set();

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
            // Extract basic transaction data with the mapped columns
            const { transaction, requiresAI } = await extractBasicTransaction(
              row,
              file.name,
              cardInfo
            );

            // If AI categorization is required, perform it
            if (requiresAI) {
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
            }

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
      transaction.category === TransactionCategory.TRANSFER ||
      transaction.category === TransactionCategory.PIX ||
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

    return parts.join(' - ');
  } catch (error) {
    console.warn('Error extracting card info from filename:', error);
    return '';
  }
}

/**
 * Extract basic transaction data from a row
 * @param row Extracted row data
 * @param fileName Name of the source file for context
 * @param cardInfo Card information extracted from the filename
 * @returns Transaction object and flag indicating if AI categorization is needed
 */
async function extractBasicTransaction(
  row: Record<string, string | number>,
  fileName: string,
  cardInfo: string
): Promise<{ transaction: Transaction; requiresAI: boolean }> {
  // Initialize a new transaction with default values
  const transaction: Transaction = {
    id: generateTransactionId(),
    description: '',
    amount: 0,
    date: new Date(),
    type: TransactionType.OUTCOME,
    category: TransactionCategory.UNCATEGORIZED,
    currency: 'BRL', // Default to Brazilian Real
  };

  let requiresAI = true;

  // If we have AI-mapped fields, use them directly
  if ('date' in row && row.date) {
    try {
      transaction.date = new Date(row.date);
      if (isNaN(transaction.date.getTime())) {
        // Try to parse Brazilian date format (DD/MM/YYYY)
        const dateStr = String(row.date);
        const parts = dateStr.split(/[\/.-]/);
        if (parts.length === 3) {
          // If the first part is likely a day (1-31), assume DD/MM/YYYY format
          if (parseInt(parts[0]) <= 31) {
            transaction.date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
          }
        }
      }
    } catch (e) {
      console.warn(`Failed to parse date: ${row.date}`, e);
    }
  }

  if ('amount' in row && row.amount !== undefined) {
    const amount =
      typeof row.amount === 'number'
        ? row.amount
        : parseFloat(String(row.amount).replace(',', '.'));

    transaction.amount = amount;
  }

  if ('description' in row && row.description) {
    transaction.description = String(row.description);
  }

  if ('merchant' in row && row.merchant) {
    transaction.merchant = String(row.merchant);
  }

  if ('currency' in row && row.currency) {
    transaction.currency = String(row.currency);
  }

  // Use AI to extract card info from the row data
  const cardExtraction = await extractCardInfoFromRow(row);
  const extractedCardInfo = await formatCardInfo(cardExtraction);

  // Use the card from the row data, the file name, or set a default
  transaction.card = extractedCardInfo || cardInfo || DEFAULT_CARD_HOLDER;

  // Set card holder (with default if not found)
  if ('cardHolder' in row && row.cardHolder) {
    // Card holder found in data, but always set the default one
    transaction.card = `${DEFAULT_CARD_HOLDER} (${transaction.card})`;
  } else if (!transaction.card.includes(DEFAULT_CARD_HOLDER)) {
    // No card holder in data, prepend default
    transaction.card = `${DEFAULT_CARD_HOLDER} (${transaction.card})`;
  }

  // If we still don't have required fields, try to find them with common column names
  if (isNaN(transaction.date.getTime())) {
    // Common column names for date
    const dateColumns = ['date', 'data', 'datetime', 'fecha', 'date_time'];

    for (const colName of dateColumns) {
      if (colName.toLowerCase() in row) {
        const dateValue = row[colName.toLowerCase()];
        try {
          transaction.date = new Date(dateValue);
          if (isNaN(transaction.date.getTime())) {
            // Try to parse Brazilian date format (DD/MM/YYYY)
            const parts = String(dateValue).split(/[\/.-]/);
            if (parts.length === 3) {
              // If the first part is likely a day (1-31), assume DD/MM/YYYY format
              if (parseInt(parts[0]) <= 31) {
                transaction.date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
              }
            }
          }
          break;
        } catch (e) {
          console.warn(`Failed to parse date: ${dateValue}`, e);
        }
      }
    }
  }

  if (transaction.amount === 0) {
    // Common column names for amount
    const amountColumns = ['amount', 'valor', 'value', 'montante', 'quantia'];

    for (const colName of amountColumns) {
      if (colName.toLowerCase() in row) {
        const value = row[colName.toLowerCase()];
        transaction.amount =
          typeof value === 'number' ? value : parseFloat(String(value).replace(',', '.'));
        break;
      }
    }
  }

  if (!transaction.description) {
    // Common column names for description
    const descriptionColumns = [
      'description',
      'descrição',
      'descricao',
      'title',
      'título',
      'titulo',
    ];

    for (const colName of descriptionColumns) {
      if (colName.toLowerCase() in row) {
        transaction.description = String(row[colName.toLowerCase()]);
        break;
      }
    }

    // If we still couldn't extract a description, use all field values as the description
    if (!transaction.description) {
      transaction.description = Object.values(row)
        .filter(v => v)
        .join(' - ');
    }
  }

  // Infer transaction type based on amount
  if (transaction.amount > 0) {
    transaction.type = TransactionType.INCOME;
  } else if (transaction.amount < 0) {
    transaction.type = TransactionType.OUTCOME;
    // Ensure amount is positive for outcomes
    transaction.amount = Math.abs(transaction.amount);
  }

  return { transaction, requiresAI };
}
