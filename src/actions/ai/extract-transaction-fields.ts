'use server';

import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import * as chrono from 'chrono-node';

import { TransactionCategory, TransactionType } from '@/interfaces/enums';
import { defaultModel } from '@/lib/ai';
import { transactionExtractionSchema, transactionBatchSchema } from '@/schemas/transaction-schemas';

import type { TransactionExtraction } from '@/schemas/transaction-schemas';
import type { JsonObject } from 'type-fest';

// Maximum number of transactions to process in a single batch
const MAX_BATCH_SIZE = 7;

/**
 * Builds a unified system prompt for transaction extraction
 * Works for both single and batch transactions
 */
function buildSystemPrompt(isBatch: boolean): string {
  return `
// ROLE
You are a financial assistant specialized in extracting transaction details from ${isBatch ? 'multiple transactions at once' : 'text'}.

// TASK
Extract all relevant transaction information from ${isBatch ? 'each transaction in the batch' : 'user input'}, including description, amount, date, merchant, and categorization.

// REQUIRED FIELDS${isBatch ? ' FOR EACH TRANSACTION' : ''}
- Description: What the transaction is for
- Amount: As a number, negative for expenses
- Date: Format as "original: [original expression]|english: [english equivalent]"
- Merchant: If present in the input
- Category: Based on transaction description
- Transaction type: INCOME, OUTCOME, or TRANSFER
- Installment information: If applicable
- Currency: Default to BRL if not specified

// DATE HANDLING EXAMPLES
- "hoje" in Portuguese → "original: hoje|english: today"
- "明天" in Chinese → "original: 明天|english: tomorrow"
- "last Friday" in English → "original: last Friday|english: last Friday"

// LANGUAGE HANDLING
- Detect the language and maintain it for descriptions and merchant names
- Use appropriate formatting conventions for each language
- Only standardize category and type values

// FORMATTING RULES
- Merchant Names
  * Format merchant names with proper capitalization (e.g., "CAIO RODRIGUES" -> "Caio Rodrigues")
  * Preserve original language in merchant names (no translation)
  * Include merchant document/ID when present (e.g., "CAIO RODRIGUES •••.229.046-••" -> "Caio Rodrigues •••.229.046-••")

- Transaction Descriptions
  * Format descriptions according to the detected language conventions
  * Include merchant name in description with proper capitalization
  * For transfers, use appropriate transfer terminology based on language

// EXAMPLES BY LANGUAGE, TYPE AND CATEGORY
// Regular Transactions
- Portuguese: "150 corrida uber ontem" → "Corrida de Uber", type: OUTCOME, category: TRANSPORTATION
- English: "150 uber" → "Uber ride", type: OUTCOME, category: TRANSPORTATION
- Spanish: "50 comida ayer" → "Comida", type: OUTCOME, category: DINING

// P2P Transfers
- Simple: "caio 150" → "Transferência para Caio", type: TRANSFER
- With context: "caio 150 churrasco" → "Transferência para Caio (Churrasco)", type: TRANSFER, category: DINING
- Complex: "Transferência recebida pelo Pix - CAIO RODRIGUES GUIMARAES - •••.229.046-•• - BANCO INTER (0077) Agência: 1 Conta: 6886889-8" → 
  "Transferência recebida pelo Pix de Caio Rodrigues Guimarães - Banco Inter | Agência: 1 | Conta: 6886889-8", type: TRANSFER, category: UNCATEGORIZED
${isBatch ? "\n// PROCESS EACH TRANSACTION INDEPENDENTLY\n- Maintain accuracy for each individual transaction\n- Don't let one transaction influence the categorization of another" : ''}`.trim();
}

/**
 * Extract transaction fields from text input or structured data
 * @param prompt A single transaction description or transaction data object
 * @returns Extracted transaction fields - single object or array depending on input
 */
export async function extractTransactionFields(prompt: string): Promise<TransactionExtraction>;
export async function extractTransactionFields(prompt: JsonObject): Promise<TransactionExtraction>;
export async function extractTransactionFields(prompts: string[]): Promise<TransactionExtraction[]>;
export async function extractTransactionFields(
  prompts: JsonObject[]
): Promise<TransactionExtraction[]>;
export async function extractTransactionFields(
  promptInput: string | JsonObject | string[] | JsonObject[]
): Promise<TransactionExtraction | TransactionExtraction[]> {
  // Handle single string input
  if (typeof promptInput === 'string') {
    return extractSingleTransaction(promptInput);
  }

  // Handle single JsonObject input
  if (!Array.isArray(promptInput) && typeof promptInput === 'object' && promptInput !== null) {
    return extractSingleTransaction(JSON.stringify(promptInput));
  }

  // Now we know it's an array
  const inputArray = promptInput as string[] | JsonObject[];

  // Handle empty array case
  if (inputArray.length === 0) {
    return [];
  }

  // Handle single item array case
  if (inputArray.length === 1) {
    const item = inputArray[0];
    const stringifiedItem = typeof item === 'string' ? item : JSON.stringify(item);

    return [await extractSingleTransaction(stringifiedItem)];
  }

  // Convert all items to strings for batch processing
  const stringifiedArray = inputArray.map(item =>
    typeof item === 'string' ? item : JSON.stringify(item)
  );

  // Handle batch processing for arrays
  return processBatchTransactions(stringifiedArray);
}

/**
 * Process a single transaction (internal implementation)
 */
async function extractSingleTransaction(prompt: string): Promise<TransactionExtraction> {
  try {
    // Generate the system prompt for a single transaction
    const systemPrompt = buildSystemPrompt(false);

    // Define the specific user input for analysis
    const userPrompt = prompt; // The user's input is directly used as the prompt

    // Use generateObject with the schema to structure the output
    const result = await generateObject({
      model: openai(defaultModel),
      schema: transactionExtractionSchema,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.2, // Low temperature for consistent results
    });

    // Log warnings if any
    if (result.warnings && result.warnings.length > 0) {
      console.warn('Transaction extraction warnings:', result.warnings);
    }

    // Parse natural language date using chrono-node
    const extractedResult = result.object as TransactionExtraction;

    // If we have a date string, try to parse it with chrono-node
    if (typeof extractedResult.date === 'string') {
      try {
        // Parse the formatted date string to extract original and English versions
        const dateString = extractedResult.date;
        let englishDateExpression = dateString;

        // Extract English expression if available
        if (dateString.includes('|english:')) {
          const parts = dateString.split('|english:');

          if (parts.length > 1) {
            englishDateExpression = parts[1].trim();
          }
        }

        // Use chrono-node to parse the English date expression
        const parsedDate = chrono.parseDate(englishDateExpression);

        if (parsedDate) {
          // Update the date field with the parsed date
          return {
            ...extractedResult,
            date: parsedDate.toISOString(),
          };
        }
      } catch (dateError) {
        console.error('Date parsing error:', dateError);
      }
    }

    return extractedResult;
  } catch (error) {
    console.error('Transaction extraction error:', error);
    throw error;
  }
}

/**
 * Process multiple transactions in a batch (internal implementation)
 */
async function processBatchTransactions(prompts: string[]): Promise<TransactionExtraction[]> {
  // If the batch is too large, split it into smaller chunks
  if (prompts.length > MAX_BATCH_SIZE) {
    const results: TransactionExtraction[] = [];

    // Process in chunks of MAX_BATCH_SIZE
    for (let i = 0; i < prompts.length; i += MAX_BATCH_SIZE) {
      const chunk = prompts.slice(i, i + MAX_BATCH_SIZE);
      const chunkResults = await processBatchTransactions(chunk);

      results.push(...chunkResults);
    }

    return results;
  }

  try {
    // Generate the system prompt for batch transactions
    const systemPrompt = buildSystemPrompt(true);

    // Format the batch data for the prompt
    const batchData = prompts.map((t, i) => `TRANSACTION ${i + 1}:\n${t}`).join('\n\n');

    // Define the user prompt for batch analysis with clear output format guidance
    const userPrompt = `
Process this batch of ${prompts.length} transactions:

${batchData}

EXPECTED OUTPUT FORMAT:
- You should return an object with a 'transactions' array
- Each item in the transactions array should contain all required fields (description, amount, date, etc.)
- Maintain the order of transactions to match the input order
`.trim();

    // Use generateObject with the batch schema (wrapper object with transactions array)
    const result = await generateObject({
      model: openai(defaultModel),
      schema: transactionBatchSchema,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.2, // Low temperature for consistent results
    });

    // Log warnings if any
    if (result.warnings && result.warnings.length > 0) {
      console.warn('Batch transaction extraction warnings:', result.warnings);
    }

    // Extract the transactions array from the response
    const batchResult = result.object;
    const extractedTransactions = batchResult.transactions || [];

    // Process dates for each extracted transaction
    return extractedTransactions.map(processExtractedDate);
  } catch (error) {
    console.error('Batch transaction extraction error:', error);

    // Fall back to individual processing on batch failure
    console.log('Falling back to individual transaction processing');

    const results: TransactionExtraction[] = [];

    for (const prompt of prompts) {
      try {
        // Process each transaction individually
        const result = await extractSingleTransaction(prompt);

        results.push(result);
      } catch (individualError) {
        console.error('Individual transaction extraction error:', individualError);
        // Add a minimal result to maintain array size/order
        results.push({
          description: `Failed to process: ${prompt.substring(0, 50)}...`,
          amount: 0,
          date: new Date().toISOString(),
          type: TransactionType.OUTCOME,
          category: TransactionCategory.UNCATEGORIZED,
          merchant: undefined,
          isInstallment: false,
          installmentInfo: undefined,
          currency: 'BRL',
        });
      }
    }

    return results;
  }
}

/**
 * Helper function to process extracted dates
 */
function processExtractedDate(extractedResult: TransactionExtraction): TransactionExtraction {
  // If we have a date string, try to parse it with chrono-node
  if (typeof extractedResult.date === 'string') {
    try {
      // Parse the formatted date string to extract original and English versions
      const dateString = extractedResult.date;
      let englishDateExpression = dateString;

      // Extract English expression if available
      if (dateString.includes('|english:')) {
        const parts = dateString.split('|english:');

        if (parts.length > 1) {
          englishDateExpression = parts[1].trim();
        }
      }

      // Use chrono-node to parse the English date expression
      const parsedDate = chrono.parseDate(englishDateExpression);

      if (parsedDate) {
        return {
          ...extractedResult,
          date: parsedDate.toISOString(),
        };
      }
    } catch (dateError) {
      console.error('Date parsing error:', dateError);
    }
  }

  return extractedResult;
}
