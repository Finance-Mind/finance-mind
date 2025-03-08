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
    const systemPrompt = `
      You are a financial data specialist with expertise in bank statement files.
      Your task is to analyze a filename and extract any information about the bank, card type, 
      account type, and other relevant details.
      
      Common banks in Brazil include:
      - Nubank
      - Itaú
      - Bradesco
      - Santander
      - Banco do Brasil (often abbreviated as BB)
      - Caixa Econômica Federal (often just Caixa)
      - Inter
      - C6 Bank
      - BTG Pactual
      
      Common card types include:
      - Visa
      - Mastercard
      - Elo
      - American Express (often Amex)
      - Hipercard
      
      Account types include:
      - Checking account (conta corrente)
      - Savings account (poupança)
      - Credit card (cartão de crédito)
      - Investment account (conta investimento)
      
      Instructions:
      1. Analyze the filename carefully to identify any bank names, card types, or account types
      2. Extract any identifiable information like statement periods or card identifiers (e.g., last 4 digits)
      3. If the information is ambiguous or not present, leave the corresponding fields empty
      4. Provide a confidence level for your extraction (higher for clearer matches)
      5. For unclear filenames, provide your best guess but with a lower confidence score
      
      Example filename patterns:
      - "nubank_fatura_abril_2023.csv" (Nubank credit card statement for April 2023)
      - "extrato_itau_03042023.pdf" (Itaú bank statement from March 4, 2023)
      - "Bradesco_extrato_cc_Jan2023.pdf" (Bradesco checking account statement for January 2023)
      - "fatura_mastercard_5678_maio.csv" (Mastercard statement for card ending in 5678 for May)
      
      For any patterns or keywords in Portuguese, consider:
      - "extrato" typically refers to an account statement
      - "fatura" typically refers to a credit card statement
      - Month names in Portuguese: janeiro, fevereiro, março, abril, maio, junho, julho, agosto, setembro, outubro, novembro, dezembro
      - Abbreviated as: jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez
    `;

    // Generate the card extraction
    const result = await generateObject({
      model: openai(defaultModel),
      schema: cardExtractionSchema,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `Please analyze this bank statement filename and extract any relevant bank or card information: "${fileName}"`,
        },
      ],
      temperature: 0.2, // Low temperature for more consistent results
    });

    console.log('Card extraction result:', result);

    return result.object as CardExtraction;
  } catch (error) {
    console.error('Card extraction error:', error);
    // Return a minimal result with low confidence on error
    return {
      confidence: 0.1,
    };
  }
}
