'use server';

import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

import { defaultModel } from '@/lib/ai';
import { userConfig } from '@/config/user';

// Schema for column mapping response
const columnMappingSchema = z.object({
  date: z.string().optional().describe('Column name for transaction date'),
  amount: z.string().optional().describe('Column name for transaction amount'),
  description: z.string().optional().describe('Column name for transaction description'),
  merchant: z.string().optional().describe('Column name for merchant or entity'),
  type: z.string().optional().describe('Column name for transaction type'),
  category: z.string().optional().describe('Column name for transaction category'),
  identifier: z.string().optional().describe('Column name for transaction ID/identifier'),
  currency: z.string().optional().describe('Column name for currency'),
  balance: z.string().optional().describe('Column name for account balance'),
  fee: z.string().optional().describe('Column name for transaction fee'),
  notes: z.string().optional().describe('Column name for notes or additional information'),
  cardHolder: z.string().optional().describe('Column name for card holder name'),
  card: z.string().optional().describe('Column name for card name or identifier'),
  confidence: z.number().min(0).max(1).describe('Confidence level of the mapping (0-1)'),
});

export type ColumnMapping = z.infer<typeof columnMappingSchema>;

/**
 * Use AI to identify column names in bank statement files
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

    const systemPrompt = `
      You are a financial data processing expert specializing in bank statement analysis.
      Your task is to identify the purpose of each column in a bank statement by analyzing the column headers and sample data.
      
      Map each column name to its corresponding standard financial data field:
      
      - date: The transaction date
      - amount: The transaction amount (positive for income, negative for expenses)
      - description: Transaction description or details
      - merchant: Name of the merchant, payee, or entity
      - type: Transaction type or category 
      - identifier: Unique transaction ID or reference number
      - currency: Currency code or symbol
      - balance: Account balance
      - fee: Transaction fee
      - notes: Additional information or notes
      - cardHolder: Card holder name (the account owner, expected to be "${userConfig.cardHolder.name}")
      - card: Card name or identifier (like the last digits of a card or card name)
      
      Instructions:
      1. Analyze the column headers and sample data to understand what each column represents
      2. Return the mapping of standard field names to the actual column headers
      3. Only include fields that you can confidently map
      4. Provide a confidence level (0-1) for your overall mapping
      5. Handle different languages (Portuguese, English, Spanish, etc.)
      6. Look for patterns in the data to help with identification
      7. Be careful with ambiguous column names - use sample data to disambiguate
      
      Common patterns to look for:
      - Date columns often contain formatted dates
      - Amount columns typically contain numeric values, sometimes with currency symbols
      - Description columns usually have longer text with details about the transaction
      - Merchant columns typically contain business names or payment recipient information
      - Card holder could be indicated by columns containing "${userConfig.cardHolder.name}" or variations of this name
      - Card information might include numbers (like "****1234") or card type names
      
      Language considerations:
      - Portuguese: "data" (date), "valor" (amount), "descrição" (description), "titular" (card holder)
      - Spanish: "fecha" (date), "importe" (amount), "descripción" (description), "titular" (card holder)
      - Also consider abbreviations and variations
      
      The primary card holder name is "${userConfig.cardHolder.name}" - look for columns that might contain or reference this name.
    `;

    // Generate the column mapping
    const result = await generateObject({
      model: openai(defaultModel),
      schema: columnMappingSchema,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `
            Please analyze these column headers from a bank statement file:
            Headers: ${headerStr}
            
            Here are a few sample rows to help with identification:
            ${sampleDataStr}
            
            Identify which column corresponds to which transaction field and provide a mapping.
            Remember that the primary card holder name is expected to be "${userConfig.cardHolder.name}" or variations of this name.
          `,
        },
      ],
      temperature: 0.1, // Low temperature for more consistent results
    });

    console.log('Column mapping result:', result);

    return result.object as ColumnMapping;
  } catch (error) {
    console.error('Column identification error:', error);
    // Return a minimal mapping with low confidence on error
    return {
      confidence: 0.1,
    };
  }
}
