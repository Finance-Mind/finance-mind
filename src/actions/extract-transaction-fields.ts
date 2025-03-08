'use server';

import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';

import { defaultModel } from '@/lib/ai/client';
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
      3. Date (in ISO format or as specified)
      4. Merchant name (if present)
      5. Transaction category (based on description)
      6. Transaction type (INCOME, OUTCOME, or TRANSFER)
      7. Whether it's an installment payment
      8. Installment details (current number and total)
      9. Currency (default to BRL if not specified)
      
      Use the information provided in the text. If certain details are missing, make reasonable inferences.
      For example, if no date is mentioned, use the current date.
      
      For transaction types:
      - Positive amounts are typically INCOME
      - Negative amounts are typically OUTCOME
      - Transfers should be identified as TRANSFER based on keywords like "transfer", "sent to", "received from"
      
      For categories, assign one of the following:
      Income categories: SALARY, INVESTMENT, REIMBURSEMENT, GIFT, OTHER_INCOME
      Expense categories: GROCERIES, DINING, ENTERTAINMENT, TRANSPORTATION, UTILITIES, HOUSING, HEALTH, EDUCATION, SHOPPING, TRAVEL, PERSONAL_CARE, SUBSCRIPTIONS, OTHER_EXPENSE
      Transfer categories: TRANSFER, PIX, BOLETO, CREDIT_CARD_PAYMENT
      Other: UNCATEGORIZED
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

    console.log('Extraction result:', result);

    return result.object as TransactionExtraction;
  } catch (error) {
    console.error('Transaction extraction error:', error);
    throw new Error('Failed to extract transaction details from text');
  }
}
