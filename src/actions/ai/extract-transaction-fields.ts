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
    const systemPrompt = `
      You are a financial assistant specialized in extracting transaction details from text.
      Extract all relevant transaction information including:
      
      1. Transaction description (what the transaction is for)
      2. Amount (as a number, negative for expenses)
      3. Date (provide two outputs in this format: "original: [original date expression]|english: [english equivalent]")
         Examples: 
         - If user says "hoje" in Portuguese → "original: hoje|english: today"
         - If user says "明天" in Chinese → "original: 明天|english: tomorrow"
         - If user says "last Friday" in English → "original: last Friday|english: last Friday"
         - If user says "próximo mês" → "original: próximo mês|english: next month"
      4. Merchant name (if present)
      5. Transaction category (based on description)
      6. Transaction type (INCOME, OUTCOME, or TRANSFER)
      7. Whether it's an installment payment
      8. Installment details (current number and total)
      9. Currency (default to BRL if not specified)
      
      Use the information provided in the text. If certain details are missing, make reasonable inferences.
      For example, if no date is mentioned, use "original: today|english: today".
      
      For transaction types:
      - Positive amounts are typically INCOME
      - Negative amounts are typically OUTCOME
      - Transfers should be identified as TRANSFER based on keywords like "transfer", "sent to", "received from"
      
      For categories, assign one of the following:
      Income categories: SALARY, INVESTMENT, REIMBURSEMENT, GIFT, OTHER_INCOME
      Expense categories: GROCERIES, DINING, ENTERTAINMENT, TRANSPORTATION, UTILITIES, HOUSING, HEALTH, EDUCATION, SHOPPING, TRAVEL, PERSONAL_CARE, SUBSCRIPTIONS, OTHER_EXPENSE
      Transfer categories: TRANSFER, PIX, BOLETO, CREDIT_CARD_PAYMENT
      Other: UNCATEGORIZED
    
      IMPORTANT: Detect the language of the user's input and provide ALL text fields (description, merchant, etc.) in that SAME language. 
      Only the category values and transaction types should use the predefined English constants.
      Do not translate the user's content to English unless specifically needed for date parsing.

      FORMATTING GUIDANCE:
      1. Format and structure the user's content for clarity and consistency
      2. Clean up the merchant names (remove unnecessary prefixes, standardize formats)
      3. Normalize descriptions to be concise and clear while preserving the original meaning and language
      4. Format amounts properly (e.g., ensuring negative for expenses)
      5. Extract installment information in a consistent format
      6. Standardize formatting but DO NOT translate or change the language
      
      LANGUAGE-SPECIFIC FORMATTING EXAMPLES:
      - Portuguese input: "150 corrida uber ontem" → description: "Corrida de Uber"
      - English input: "150 uber" → description: "Uber ride"
      - Spanish input: "50 comida ayer" → description: "Comida"
      
      Use language-appropriate phrasing, articles, and prepositions to create natural descriptions in the detected language.
      Always format according to the conventions of the detected language (e.g., "de" in Portuguese, "ride" in English).
    `;

    // Use generateObject instead of streamText for tools functionality
    const result = await generateObject({
      model: openai(defaultModel),
      schema: transactionExtractionSchema,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.1, // Low temperature for more consistent results
    });

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
          }
        }
      } catch (error) {
        console.warn('Error parsing natural language date:', error);
        // Keep the original date string if parsing fails
      }
    }

    console.log('Extraction result:', extractedResult);

    return extractedResult;
  } catch (error) {
    console.error('Transaction extraction error:', error);
    throw new Error('Failed to extract transaction details from text');
  }
}
