'use server';

import { generateObject } from 'ai';

import { openai, defaultModel } from '@/lib/ai';
import { TransactionCategory, TransactionType } from '@/lib/ai/types';
import { transactionCategorizeResponseSchema as TransactionCategorizeResponseSchema } from '@/schemas/transaction-schemas';

import type { TransactionCategorizeResponse } from '@/schemas/transaction-schemas';

// The transaction categorization AI function
export async function categorizeTransaction({
  description,
  amount,
  date,
  merchant,
}: {
  description: string;
  amount: number;
  date: string | Date;
  merchant?: string;
}): Promise<TransactionCategorizeResponse> {
  // Determine transaction type based on amount
  // Positive amounts are income, negative are expenses
  const type = amount >= 0 ? TransactionType.INCOME : TransactionType.OUTCOME;

  // Create a prompt for the AI to analyze the transaction
  const prompt = `
    I need to categorize this financial transaction:
    
    Description: ${description}
    Amount: ${amount}
    Date: ${date}
    ${merchant ? `Merchant: ${merchant}` : ''}
    
    Based on this information, determine:
    1. The most appropriate transaction category
    2. If this is a transfer between accounts of the same person
    3. If this is an installment payment, extract the current and total installment numbers
    4. Extract a clean merchant name if present in the description
    5. Your confidence level in this categorization (0.0 to 1.0)
    
    Special cases to handle:
    - If the description contains "Pix" or "PIX", categorize as PIX
    - If the description mentions "parcela" or has a format like "1/3", it's likely an installment payment
    - For transfers, look for keywords like "Transferência", "TED", "DOC", or "Transfer"
    - For credit card payments, look for "Pagamento de fatura" or "Pagamento fatura"
    - For salary, look for "Salário", "Salary", "Pagamento", "Folha"
    
    PERSON-TO-PERSON TRANSFERS:
    - If the description is very short and appears to contain just a person's name (e.g., "caio", "jon"):
      * Categorize this as a PIX or TRANSFER
      * Set the transaction type to TRANSFER
      * Identify the person's name as the merchant
      * Format the complete description as "Transferência para [Name]" in Portuguese or appropriate translation in other languages
    - If the amount is positive, this likely means money was received FROM this person
    - If the amount is negative, this likely means money was sent TO this person
    
    Transaction categories to use:
    Income: SALARY, INVESTMENT, REIMBURSEMENT, GIFT, OTHER_INCOME
    Expense: GROCERIES, DINING, ENTERTAINMENT, TRANSPORTATION, UTILITIES, HOUSING, HEALTH, EDUCATION, SHOPPING, TRAVEL, PERSONAL_CARE, SUBSCRIPTIONS, OTHER_EXPENSE
    Transfer: TRANSFER, PIX, BOLETO, CREDIT_CARD_PAYMENT
    Other: UNCATEGORIZED
    
    Transaction types to use: INCOME, OUTCOME, TRANSFER
    
    Provide your analysis as a structured response.

    IMPORTANT: Keep any extracted text (like merchant names) in the ORIGINAL LANGUAGE of the input. Do not translate merchant names or other text values to English, keep them in the language of the original description.
    
    FORMATTING GUIDANCE:
    1. Format and clean up merchant names while keeping the original language
    2. Normalize formatting (e.g., removing excess spaces, fixing capitalization)
    3. Extract key information in a structured way
    4. Ensure proper formatting of installment information if present
    5. Standardize the representation of categories and transaction types
    6. Structure the response for consistent processing by the application
    
    LANGUAGE-SPECIFIC FORMATTING EXAMPLES:
    - Portuguese input with "corrida uber" → Format merchant as "Uber" and include Portuguese terms/prepositions in any text
    - English input with just "uber" → Format merchant as "Uber" and use English conventions
    - Spanish input → Use Spanish language conventions for text formatting
    - Person transfer input: "caio" → merchant: "Caio", description: "Transferência para Caio", category: PIX or TRANSFER
    - Person transfer input: "jon" → merchant: "Jon", description: "Transferência para Jon", category: PIX or TRANSFER
    
    Use language-appropriate phrasing, articles, and prepositions based on the detected language.
    The goal is natural and well-structured text that follows the conventions of the input language.
  `;

  try {
    // Use generateObject instead of streamText for more reliable results
    const result = await generateObject({
      model: openai(defaultModel),
      schema: TransactionCategorizeResponseSchema,
      messages: [
        {
          role: 'system',
          content:
            'You are a financial transaction categorization expert, specialized in Brazilian financial systems and global transactions. Your task is to accurately categorize transactions, detect transfers, and identify installment payments. Always preserve the original language of text fields like merchant names. Format and structure the information for consistency and clarity, but do not translate the content.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.1, // Low temperature for more consistent results
    });

    console.log('Categorization result:', result);

    // Return the categorization result
    return result.object as TransactionCategorizeResponse;
  } catch (error) {
    console.error('AI categorization error:', error);
    // Fallback categorization on error
    return {
      category: TransactionCategory.UNCATEGORIZED,
      type: type,
      confidence: 0.1,
    };
  }
}
