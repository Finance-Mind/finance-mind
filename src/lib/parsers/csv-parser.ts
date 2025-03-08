/**
 * CSV Parser for bank statements
 *
 * This module provides utilities to parse CSV files into structured data
 * for bank statement processing.
 */

import type { ColumnMapping } from '@/actions/ai/identify-columns';

/**
 * Parse a CSV string into an array of objects
 * @param csvContent The CSV content as a string
 * @returns Array of objects where keys are column headers and values are cell values
 */
export async function parseCSV(
  csvContent: string
): Promise<Array<Record<string, string | number>>> {
  try {
    const rows = csvContent.split(/\r?\n/);

    // Filter out empty rows
    const nonEmptyRows = rows.filter(row => row.trim().length > 0);

    if (nonEmptyRows.length === 0) {
      throw new Error('CSV file is empty');
    }

    // Different CSV files might use different delimiters
    // Let's detect the most likely delimiter
    const possibleDelimiters = [',', ';', '\t', '|'];
    const headerRow = nonEmptyRows[0];
    const delimiter = detectDelimiter(headerRow, possibleDelimiters);

    // Parse headers (first row), and normalize to lowercase
    const headers = parseCSVRow(headerRow, delimiter).map(header => header.toLowerCase().trim());

    // Parse data rows (all rows except the first)
    const results: Array<Record<string, string | number>> = [];

    for (let i = 1; i < nonEmptyRows.length; i++) {
      const row = nonEmptyRows[i];
      const values = parseCSVRow(row, delimiter);

      if (values.length !== headers.length) {
        console.warn(
          `Row ${i + 1} has ${values.length} fields, expected ${headers.length}. Skipping.`
        );
        continue;
      }

      const rowObject: Record<string, string | number> = {};

      for (let j = 0; j < headers.length; j++) {
        const value = values[j].trim();

        // Try to convert to number if it looks like a number
        if (looksLikeNumber(value)) {
          rowObject[headers[j]] = parseFloat(value.replace(',', '.'));
        } else {
          rowObject[headers[j]] = value;
        }
      }

      results.push(rowObject);
    }

    if (results.length === 0) {
      console.warn('No data rows found in CSV');
    }

    return results;
  } catch (error) {
    console.error('Error parsing CSV:', error);
    throw new Error(`CSV parsing failed: ${(error as Error).message}`);
  }
}

/**
 * Apply column mapping to parsed CSV data
 * @param rows The parsed CSV data
 * @param mapping The column mapping from AI
 * @returns Array of objects with standardized field names
 */
export function applyColumnMapping(
  rows: Array<Record<string, string | number>>,
  mapping: ColumnMapping
): Array<Record<string, string | number>> {
  if (!rows.length) return [];

  // Check if we have a valid mapping
  if (!mapping || mapping.confidence < 0.3) {
    // If confidence is too low, return the original data
    return rows;
  }

  return rows.map(row => {
    const mappedRow: Record<string, string | number> = {};

    // Apply each field mapping
    Object.entries(mapping).forEach(([field, columnName]) => {
      // Skip the confidence field
      if (field === 'confidence') return;

      // If we have a mapping for this field and the column exists in the row
      if (columnName && typeof columnName === 'string' && columnName in row) {
        mappedRow[field] = row[columnName];
      }
    });

    // Include all original fields too with their original names
    // This ensures we don't lose any data
    Object.entries(row).forEach(([key, value]) => {
      if (!(key in mappedRow)) {
        mappedRow[key] = value;
      }
    });

    return mappedRow;
  });
}

/**
 * Parse a single CSV row, respecting quoted values that might contain delimiters
 * @param row The CSV row as a string
 * @param delimiter The delimiter character
 * @returns Array of cell values
 */
function parseCSVRow(row: string, delimiter: string): string[] {
  const result: string[] = [];
  let currentValue = '';
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    const nextChar = i < row.length - 1 ? row[i + 1] : '';

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote inside a quoted value
        currentValue += '"';
        i++; // Skip the next quote
      } else {
        // Toggle quotes state
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      // End of field
      result.push(currentValue);
      currentValue = '';
    } else {
      currentValue += char;
    }
  }

  // Add the last field
  result.push(currentValue);

  return result;
}

/**
 * Detect the most likely delimiter in a CSV file
 * @param headerRow The first row of the CSV file
 * @param delimiters Array of possible delimiters to check
 * @returns The most likely delimiter
 */
function detectDelimiter(headerRow: string, delimiters: string[]): string {
  const counts = delimiters.map(delimiter => {
    // Count occurrences outside of quotes
    let count = 0;
    let inQuotes = false;

    for (let i = 0; i < headerRow.length; i++) {
      const char = headerRow[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === delimiter && !inQuotes) {
        count++;
      }
    }

    return { delimiter, count };
  });

  // Return the delimiter with the highest count
  const mostLikely = counts.sort((a, b) => b.count - a.count)[0];

  if (mostLikely.count === 0) {
    // If no delimiter is found, default to comma
    return ',';
  }

  return mostLikely.delimiter;
}

/**
 * Check if a string looks like a number
 * @param value The string to check
 * @returns True if the string looks like a number
 */
function looksLikeNumber(value: string): boolean {
  // Support formats like 1234, 1234.56, 1,234.56, -1234.56, etc.
  return /^-?\s*[\d.,]+\s*$/.test(value);
}
