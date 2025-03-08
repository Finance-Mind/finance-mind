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
    .describe(
      'Card brand or network (e.g., Visa, Mastercard, Elo, American Express) in original case'
    ),
  cardIdentifier: z
    .string()
    .optional()
    .describe('Card identifier such as final digits (e.g., "Final 1234", "****5678") if present'),
  bankName: z
    .string()
    .optional()
    .describe(
      'Bank or financial institution name (e.g., Nubank, Itaú, Santander) in original language'
    ),
  isCredit: z
    .boolean()
    .optional()
    .describe('Whether this is a credit card (true) or debit/other card (false)'),
  cardName: z
    .string()
    .optional()
    .describe('Card product name or tier (e.g., "Gold", "Platinum", "Black") if identifiable'),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe('Confidence level of the extraction from 0.0 (low) to 1.0 (high)'),
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

    // Define system instructions for the AI model
    const systemPrompt = `
// ROLE
You are a financial data specialist focused on identifying card information in transaction data.

// TASK
Extract card details from transaction rows with high precision.

// PATTERNS TO IDENTIFY
- Card types: Visa, Mastercard, Elo, Amex, etc.
- Card identifiers: "****1234", "XXXX1234", "Final 1234"
- Credit vs. debit indicators
- Bank names associated with cards
- Card product tiers (Gold, Platinum, Black)

// BRAZILIAN TERMINOLOGY
- "cartão" = card
- "crédito" = credit
- "débito" = debit
- "fatura" = statement/bill
- "compra no cartão" = card purchase
- "pagamento" = payment

// FORMATTING RULES
- Keep all extracted text in its ORIGINAL LANGUAGE and case
- Set confidence based on the clarity of the card information (0.0-1.0)
`.trim();

    // Define the specific transaction data for analysis
    const userPrompt = `
Extract card information from this transaction data:

${rowDataString}
`.trim();

    // Generate the card extraction using Vercel AI SDK
    const result = await generateObject({
      model: openai(defaultModel),
      schema: cardExtractionFromRowSchema,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.2, // Low temperature for consistent results
    });

    // Log warnings if any
    if (result.warnings && result.warnings.length > 0) {
      console.warn('Card extraction warnings:', result.warnings);
    }

    console.log('Card extraction from row result:', result.object);
    return result.object;
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
