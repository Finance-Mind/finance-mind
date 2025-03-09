'use server';

import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

import { userConfig } from '@/config/user';
import { defaultModel } from '@/lib/ai';

// Schema for column mapping
const columnMappingSchema = z.object({
  date: z.string().optional().describe('Column containing transaction dates'),
  description: z
    .string()
    .optional()
    .describe('Column containing transaction descriptions or details'),
  amount: z
    .string()
    .optional()
    .describe('Column containing transaction amounts (positive for income, negative for expenses)'),
  balance: z
    .string()
    .optional()
    .describe('Column containing account balance after the transaction'),
  type: z.string().optional().describe('Column containing transaction types or categories'),
  merchant: z.string().optional().describe('Column containing merchant/payee names'),
  identifier: z
    .string()
    .optional()
    .describe('Column containing transaction reference numbers or IDs'),
  currency: z.string().optional().describe('Column containing currency codes or symbols'),
  card: z.string().optional().describe('Column containing card information or identifiers'),
  fee: z.string().optional().describe('Column containing transaction fees or charges'),
  notes: z.string().optional().describe('Column containing additional notes or information'),
  cardHolder: z
    .string()
    .optional()
    .describe('Column containing the card holder name (account owner)'),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe('Confidence level in the column mapping from 0.0 to 1.0'),
});

export type ColumnMapping = z.infer<typeof columnMappingSchema>;

/**
 * Identify the purpose of columns in a bank statement using AI
 * @param headers Array of column headers from the file
 * @param sampleRows Array of sample data rows to help with identification
 * @returns Mapping of standard transaction fields to the actual column names in the file
 */
export async function identifyColumns(
  headers: string[],
  sampleRows: Array<Record<string, string | number>>
): Promise<ColumnMapping> {
  try {
    // Prepare sample data for AI analysis
    const headerStr = headers.join(', ');
    const sampleDataStr = sampleRows
      .slice(0, 3) // Use up to 3 sample rows
      .map(row => {
        return Object.entries(row)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ');
      })
      .join('\n');

    // Define system instructions for the AI model
    const systemPrompt = `
// ROLE
You are a financial data processing expert specializing in bank statement analysis.

// TASK
Identify the purpose of each column in a bank statement by analyzing column headers and sample data.

// STANDARD FINANCIAL FIELDS
- date: Transaction date column
- amount: Transaction amount column (positive for income, negative for expenses)
- description: Transaction description or details column
- balance: Account balance column
- type: Transaction type or category column
- merchant: Column containing merchant/payee names
- identifier: Transaction ID or reference number column
- currency: Currency code or symbol column
- card: Card name or identifier column
- fee: Transaction fee column
- notes: Additional information column
- cardHolder: Card holder name column (expected to contain "${userConfig.cardHolder.name}")

// CONSIDERATIONS
- Column headers vary across banks and languages
- Date formats vary (DD/MM/YYYY, MM/DD/YYYY, etc.)
- Amount columns might be split into separate debit/credit columns
- In Brazilian statements, "Data" means "Date" and "Valor" means "Amount"/"Value"
- Some statements use negative numbers for expenses, others use separate columns
`.trim();

    // Define the specific statement data for analysis
    const userPrompt = `
Identify the purpose of each column in this bank statement:

Headers: ${headerStr}

Sample Data:
${sampleDataStr}

Map each column to the appropriate standard field.
`.trim();

    // Use Vercel AI SDK to generate the column mapping
    const result = await generateObject({
      model: openai(defaultModel),
      schema: columnMappingSchema,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.2, // Low temperature for consistent results
    });

    // Log warnings if any
    if (result.warnings && result.warnings.length > 0) {
      console.warn('Column mapping warnings:', result.warnings);
    }

    console.log('Column mapping result:', result.object);

    return result.object;
  } catch (error) {
    console.error('Column mapping error:', error);

    // Return empty mapping on error
    return {
      confidence: 0.1,
    };
  }
}
