'use server';

import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import * as chrono from 'chrono-node';

import { defaultModel } from '@/lib/ai';
import { transactionExtractionSchema } from '@/schemas/transaction-schemas';

import type { TransactionExtraction } from '@/schemas/transaction-schemas';

/**
 * Extract transaction fields from a text prompt
 * @param prompt The user's text description of a transaction
 * @returns Extracted transaction fields
 */
export async function extractTransactionFields(prompt: string): Promise<TransactionExtraction> {
  try {
    // Define system instructions for the AI model
    const systemPrompt = `
// ROLE
You are a financial assistant specialized in extracting transaction details from text.

// TASK
Extract all relevant transaction information from user input, including description, amount, date, merchant, and categorization.

// REQUIRED FIELDS
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
- "próximo mês" → "original: próximo mês|english: next month"
- When no date is specified in the input → use "original: today|english: today" (today's date)

// TRANSACTION TYPE RULES
- Positive amounts: Treat as INCOME
- Negative amounts: Treat as OUTCOME
- Transfer keywords: "transfer", "sent to", "received from" → TRANSFER
- PIX, TED, DOC keywords → TRANSFER type

// CATEGORIES
- Income: SALARY, INVESTMENT, REIMBURSEMENT, GIFT
- Expense: GROCERIES, DINING, ENTERTAINMENT, TRANSPORTATION, UTILITIES, HOUSING, HEALTH, EDUCATION, SHOPPING, TRAVEL, PERSONAL_CARE, SUBSCRIPTIONS
- Default: UNCATEGORIZED

// P2P TRANSFER DETECTION
- Person name with amount (e.g., "caio 150", "jon 100"):
  * Set type to TRANSFER
  * Choose appropriate category based on context
  * Format as "Transferência para [Name]" (or appropriate translation)
  * Extract person name as merchant
  * Assume negative amount unless context indicates otherwise
  * + prefix indicates money received from person

// LANGUAGE HANDLING
- Detect input language and preserve it in text fields
- Only use English for predefined category and type values
- Format according to conventions of detected language
- Do not translate user content except for date parsing

// FORMATTING RULES
- Format merchant names with proper capitalization, also in the description (e.g., "CAIO RODRIGUES" -> "Caio Rodrigues")
- Format merchant names without translating them

// FORMATTING EXAMPLES
- Portuguese: "150 corrida uber ontem" → "Corrida de Uber", type: OUTCOME, category: TRANSPORTATION
- English: "150 uber" → "Uber ride", type: OUTCOME, category: TRANSPORTATION
- Spanish: "50 comida ayer" → "Comida", type: OUTCOME, category: DINING
- P2P: "caio 150" → "Transferência para Caio", type: TRANSFER
- P2P with context: "caio 150 churrasco" → "Transferência para Caio (Churrasco)", type: TRANSFER, category: DINING
`.trim();

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

        // Check if the date is in the expected format "original: X|english: Y"
        if (dateString.includes('|english:')) {
          const parts = dateString.split('|english:');
          if (parts.length === 2) {
            englishDateExpression = parts[1].trim();
          }
        }

        // Parse the English date expression using chrono-node
        const parsedDate = chrono.parseDate(englishDateExpression);

        // If we successfully parsed the date, convert it to ISO format
        if (parsedDate) {
          extractedResult.date = parsedDate.toISOString();
        } else {
          // If chrono failed to parse, try to use Date.parse as fallback
          const fallbackDate = new Date(englishDateExpression);
          if (!isNaN(fallbackDate.getTime())) {
            extractedResult.date = fallbackDate.toISOString();
          } else {
            // If all parsing attempts fail, default to today's date
            console.log('Date parsing failed, defaulting to today');
            extractedResult.date = new Date().toISOString();
          }
        }
      } catch (error) {
        console.warn('Error parsing natural language date:', error);
        // Default to today's date if parsing fails
        console.log('Date parsing error, defaulting to today');
        extractedResult.date = new Date().toISOString();
      }
    } else if (!extractedResult.date) {
      // If no date was provided at all, default to today
      console.log('No date provided, defaulting to today');
      extractedResult.date = new Date().toISOString();
    }

    console.log('Extraction result:', extractedResult);

    return extractedResult;
  } catch (error) {
    console.error('Transaction extraction error:', error);
    throw new Error('Failed to extract transaction details from text');
  }
}
