'use server';

import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

import { defaultModel } from '@/lib/ai';

// Schema for card extraction response
const cardExtractionSchema = z.object({
  bankName: z.string().optional().describe('The name of the bank (e.g., Nubank, Itaú, Bradesco)'),
  cardType: z
    .string()
    .optional()
    .describe('The type of card (e.g., Visa, Mastercard, credit, debit)'),
  accountType: z
    .string()
    .optional()
    .describe('The type of account (e.g., checking, savings, credit)'),
  cardIdentifier: z.string().optional().describe('Card identifier like last digits if present'),
  statementType: z.string().optional().describe('Type of statement (e.g., monthly, annual)'),
  statementPeriod: z.string().optional().describe('Period covered by the statement if present'),
  confidence: z.number().min(0).max(1).describe('Confidence level of the extraction (0-1)'),
});

export type CardExtraction = z.infer<typeof cardExtractionSchema>;

/**
 * Use AI to extract card and bank information from a filename
 * @param fileName The filename to analyze
 * @returns Extracted card and bank information
 */
export async function extractCardFromFilename(fileName: string): Promise<CardExtraction> {
  try {
    // Define system instructions for the AI model
    const systemPrompt = `
// ROLE
You are a financial data specialist with expertise in bank statement files.

// TASK
Analyze a filename and extract information about the bank, card type, account type, and other relevant details.

// COMMON BRAZILIAN BANKS
- Nubank
- Itaú
- Bradesco
- Santander
- Banco do Brasil (often abbreviated as BB)
- Caixa Econômica Federal (often just Caixa)
- Inter
- C6 Bank
- BTG Pactual

// COMMON CARD TYPES
- Visa
- Mastercard
- Elo
- American Express (often Amex)
- Hipercard

// ACCOUNT TYPES
- Checking account (conta corrente)
- Savings account (poupança)
- Credit card (cartão de crédito)
- Investment account (conta investimento)

// BRAZILIAN TERMINOLOGY
- "extrato" = account statement
- "fatura" = credit card statement
- Month names in Portuguese: janeiro, fevereiro, março, abril, maio, junho, julho, agosto, setembro, outubro, novembro, dezembro
- Abbreviated months: jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez

// GUIDELINES
- Analyze the filename carefully for bank names, card types, or account types
- Extract any identifiable information like statement periods or card identifiers
- Leave fields empty if information is not present or ambiguous
- Provide confidence level based on clarity of matches
- For unclear filenames, provide best guess with lower confidence
`.trim();

    // Define the specific filename for analysis
    const userPrompt = `
Analyze this bank statement filename and extract any relevant bank or card information: 

"${fileName}"
`.trim();

    // Generate the card extraction
    const result = await generateObject({
      model: openai(defaultModel),
      schema: cardExtractionSchema,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.2, // Low temperature for more consistent results
    });

    // Log warnings if any
    if (result.warnings && result.warnings.length > 0) {
      console.warn('Card extraction warnings:', result.warnings);
    }

    console.log('Card extraction result:', result.object);

    return result.object;
  } catch (error) {
    console.error('Card extraction error:', error);
    // Return a minimal result with low confidence on error
    return {
      confidence: 0.1,
    };
  }
}
