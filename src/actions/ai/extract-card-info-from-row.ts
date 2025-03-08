'use server';

import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

import { defaultModel } from '@/lib/ai';

// Schema for card extraction from transaction data
const cardExtractionFromRowSchema = z.object({
  cardType: z
    .string()
    .optional()
    .describe('The type of card (e.g., Visa, Mastercard, credit, debit)'),
  cardIdentifier: z.string().optional().describe('Card identifier like last digits if present'),
  bankName: z.string().optional().describe('The bank name associated with the card'),
  isCredit: z
    .boolean()
    .optional()
    .describe('Whether it is a credit card (true) or debit/other (false)'),
  cardName: z.string().optional().describe('The name of the card product if identifiable'),
  confidence: z.number().min(0).max(1).describe('Confidence level of the extraction (0-1)'),
});

export type CardExtractionFromRow = z.infer<typeof cardExtractionFromRowSchema>;

/**
 * Use AI to extract card information from transaction row data
 * @param rowData Transaction row data
 * @returns Extracted card information with confidence level
 */
export async function extractCardInfoFromRow(
  rowData: Record<string, string | number>
): Promise<CardExtractionFromRow> {
  try {
    // Convert row data to string for AI analysis
    const rowDataString = Object.entries(rowData)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    const systemPrompt = `
      You are a financial data specialist focused on identifying card information in transaction data.
      Your task is to analyze transaction data and extract any card-related information.
      
      Look for:
      - Card types (Visa, Mastercard, Elo, American Express, Hipercard, etc.)
      - Card identifiers (like last 4 digits: ****1234)
      - Bank names associated with the card
      - Whether it's a credit or debit card
      - Specific card product names (like "Nubank Gold", "Itaú Platinum")
      
      Common patterns in Brazilian transactions include:
      - "Cartão" or "Cartao" followed by card brand (e.g., "Cartão Visa")
      - Card numbers with masked digits like "****1234" or "XXXX1234"
      - References to "crédito" (credit) or "débito" (debit)
      - "Fatura" indicating credit card statements
      - "Final" followed by the last digits of a card (e.g., "Final 1234")
      
      Common field names to examine:
      - card, card_name, card_type, card_number
      - cartão, cartao (Portuguese for "card")
      - payment_method, método_pagamento
      - last_digits, últimos_dígitos
      - description/descrição fields often contain card info
      
      Important Portuguese terminology:
      - "cartão de crédito" = credit card
      - "cartão de débito" = debit card
      - "compra no cartão" = card purchase
      - "pagamento" = payment
      
      Instructions:
      1. Carefully analyze all fields in the transaction data
      2. Prioritize explicit card fields, but also check description fields
      3. If multiple card references exist, select the most specific and complete one
      4. Provide a confidence level based on how certain you are of the extraction
      5. For ambiguous or missing information, leave fields empty
    `;

    // Generate the card extraction
    const result = await generateObject({
      model: openai(defaultModel),
      schema: cardExtractionFromRowSchema,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `
            Please analyze this transaction data and extract any card information:
            
            ${rowDataString}
          `,
        },
      ],
      temperature: 0.1, // Low temperature for more consistent results
    });

    console.log('Card extraction from row result:', result);
    return result.object as CardExtractionFromRow;
  } catch (error) {
    console.error('Card extraction from row error:', error);
    // Return a minimal result with low confidence on error
    return {
      confidence: 0.1,
    };
  }
}

/**
 * Format extracted card information into a readable string
 * @param extraction Card extraction result
 * @returns Formatted card string or undefined if no useful information
 */
export async function formatCardInfo(
  extraction: CardExtractionFromRow
): Promise<string | undefined> {
  if (!extraction || extraction.confidence < 0.3) {
    return undefined;
  }

  const parts: string[] = [];

  // Add bank name if available
  if (extraction.bankName) {
    parts.push(extraction.bankName);
  }

  // Add card type with credit/debit designation if available
  if (extraction.cardType) {
    if (extraction.isCredit !== undefined) {
      parts.push(`${extraction.isCredit ? 'Credit' : 'Debit'} ${extraction.cardType}`);
    } else {
      parts.push(extraction.cardType);
    }
  } else if (extraction.isCredit !== undefined) {
    // Just add credit/debit if we have that but no card type
    parts.push(extraction.isCredit ? 'Credit' : 'Debit');
  }

  // Add card name if available and not redundant with bank name
  if (extraction.cardName && extraction.bankName !== extraction.cardName) {
    parts.push(extraction.cardName);
  }

  // Add card identifier if available
  if (extraction.cardIdentifier) {
    parts.push(extraction.cardIdentifier);
  }

  return parts.length > 0 ? parts.join(' - ') : undefined;
}
