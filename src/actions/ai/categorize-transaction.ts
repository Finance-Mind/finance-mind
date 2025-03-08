'use server';

import { generateObject } from 'ai';

import { openai, defaultModel } from '@/lib/ai';
import { TransactionCategory, TransactionType } from '@/lib/ai/types';
import { transactionCategorizeResponseSchema } from '@/schemas/transaction-schemas';

import type { TransactionCategorizeResponse } from '@/schemas/transaction-schemas';

/**
 * Categorizes a financial transaction using AI
 */
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
  try {
    // Define system instructions for the AI model
    const systemPrompt = `
// ROLE
You are a financial transaction categorization expert specializing in Brazilian and global financial systems.

// TASK
Analyze transaction details and determine the appropriate category, type, and additional metadata.

// CATEGORIES
Income: SALARY, INVESTMENT, REIMBURSEMENT, GIFT, OTHER_INCOME
Expense: GROCERIES, DINING, ENTERTAINMENT, TRANSPORTATION, UTILITIES, HOUSING, HEALTH, EDUCATION, SHOPPING, TRAVEL, PERSONAL_CARE, SUBSCRIPTIONS, OTHER_EXPENSE
Other: UNCATEGORIZED

// TRANSACTION TYPES
- INCOME: For money coming in (positive amounts)
- OUTCOME: For money going out (negative amounts) 
- TRANSFER: For money movement between accounts (PIX, bank transfers, credit card payments)

// RULES
- Preserve original language: Keep merchant names and descriptions in their ORIGINAL LANGUAGE
- Format merchant names without translating them
- Format merchant names with proper capitalization (e.g., "CAIO RODRIGUES" -> "Caio Rodrigues")
- PIX detection: If description contains "Pix" or "PIX", set type to TRANSFER
- Installment detection: If description mentions "parcela" or has a format like "1/3", it's an installment payment
- Transfer keywords: "Transferência", "TED", "DOC", "Transfer" -> set type to TRANSFER
- Credit card payment keywords: "Pagamento de fatura", "Pagamento fatura" -> set type to TRANSFER
- Salary keywords: "Salário", "Salary", "Pagamento", "Folha"

// P2P TRANSFER DETECTION
- Short descriptions with just names (e.g., "caio", "jon") are likely transfers
- Negative amounts indicate money sent TO someone
- Positive amounts indicate money received FROM someone
`.trim();

    // Define the specific transaction data for analysis
    const userPrompt = `
Analyze and categorize this financial transaction:

Description: ${description}
Amount: ${amount}
Date: ${date instanceof Date ? date.toISOString() : date}
${merchant ? `Merchant: ${merchant}` : ''}
`.trim();

    // Use generateObject with the schema to structure the output
    const result = await generateObject({
      model: openai(defaultModel),
      schema: transactionCategorizeResponseSchema,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.2, // Low temperature for consistent results
    });

    // Log warnings if any
    if (result.warnings && result.warnings.length > 0) {
      console.warn('Transaction categorization warnings:', result.warnings);
    }

    console.log('Categorization result:', result.object);

    // Return the categorization result
    return result.object;
  } catch (error) {
    console.error('AI categorization error:', error);
    // Fallback categorization on error
    return {
      category: TransactionCategory.UNCATEGORIZED,
      type: amount >= 0 ? TransactionType.INCOME : TransactionType.OUTCOME,
      confidence: 0.1,
    };
  }
}
