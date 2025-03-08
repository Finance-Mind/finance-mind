"use server";

import { generateObject } from "ai";
import { openai, defaultModel } from "@/lib/ai/client";
import { TransactionCategory, TransactionType } from "@/lib/ai/types";
import {
  transactionCategorizeResponseSchema as TransactionCategorizeResponseSchema,
  TransactionCategorizeResponse,
} from "@/schemas/transaction-schemas";

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
    ${merchant ? `Merchant: ${merchant}` : ""}
    
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
    
    Transaction categories to use:
    Income: SALARY, INVESTMENT, REIMBURSEMENT, GIFT, OTHER_INCOME
    Expense: GROCERIES, DINING, ENTERTAINMENT, TRANSPORTATION, UTILITIES, HOUSING, HEALTH, EDUCATION, SHOPPING, TRAVEL, PERSONAL_CARE, SUBSCRIPTIONS, OTHER_EXPENSE
    Transfer: TRANSFER, PIX, BOLETO, CREDIT_CARD_PAYMENT
    Other: UNCATEGORIZED
    
    Transaction types to use: INCOME, OUTCOME, TRANSFER
    
    Provide your analysis as a structured response.
  `;

  try {
    // Use generateObject instead of streamText for more reliable results
    const result = await generateObject({
      model: openai(defaultModel),
      schema: TransactionCategorizeResponseSchema,
      messages: [
        {
          role: "system",
          content:
            "You are a financial transaction categorization expert, specialized in Brazilian financial systems and global transactions. Your task is to accurately categorize transactions, detect transfers, and identify installment payments.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.1, // Low temperature for more consistent results
    });

    console.log("Categorization result:", result);

    // Return the categorization result
    return result.object as TransactionCategorizeResponse;
  } catch (error) {
    console.error("AI categorization error:", error);
    // Fallback categorization on error
    return {
      category: TransactionCategory.UNCATEGORIZED,
      type: type,
      confidence: 0.1,
    };
  }
}
