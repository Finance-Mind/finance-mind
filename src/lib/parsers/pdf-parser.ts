/**
 * PDF Parser for bank statements
 *
 * This module provides utilities to parse PDF files into structured data
 * for bank statement processing.
 *
 * Note: PDF parsing requires client-side libraries which must be dynamically
 * imported to avoid server-side issues.
 */

/**
 * Parse a PDF file into an array of objects
 * @param pdfContent The PDF content as an ArrayBuffer
 * @returns Array of objects representing extracted data
 */
export async function parsePDF(
  pdfContent: ArrayBuffer
): Promise<Array<Record<string, string | number>>> {
  try {
    // Dynamic import approach to ensure we only load PDF.js in the browser
    // This avoids issues with server-side rendering
    if (typeof window === 'undefined') {
      console.warn('PDF parsing attempted in a server environment, returning empty result');
      return [];
    }

    // Dynamically import PDF.js only on the client side
    // We use any typing here to avoid dependency on specific PDF.js types
    // which can cause issues with type checking in SSR
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfjs = (await import('pdfjs-dist')) as any;

    // Set the worker source
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfjsWorker = (await import('pdfjs-dist/build/pdf.worker.mjs')) as any;
    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

    // Load the PDF document
    const loadingTask = pdfjs.getDocument({ data: pdfContent });
    const pdf = await loadingTask.promise;

    // Extract text from all pages
    const extractedText: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      // Use a type assertion to handle unknown structure
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pageText = textContent.items
        .map((item: any) => ('str' in item ? item.str : ''))
        .join(' ');

      extractedText.push(pageText);
    }

    // Join all pages' text
    const fullText = extractedText.join('\n');

    // Try to extract a table-like structure from the PDF
    const extractedData = extractStructuredData(fullText);

    return extractedData;
  } catch (error) {
    console.error('Error parsing PDF:', error);

    // PDF.js might not be available during server-side rendering
    // Return an empty array in this case to prevent blocking the process
    if (
      (error as Error).message.includes('document is not defined') ||
      (error as Error).message.includes('window is not defined')
    ) {
      console.warn('PDF parsing attempted in a server environment, returning empty result');
      return [];
    }

    throw new Error(`PDF parsing failed: ${(error as Error).message}`);
  }
}

/**
 * Extract structured data from PDF text
 * @param text The extracted text from the PDF
 * @returns Array of objects representing structured data
 */
function extractStructuredData(text: string): Array<Record<string, string | number>> {
  const result: Array<Record<string, string | number>> = [];

  try {
    // Look for table-like sections in the PDF
    // This is a simplified approach that looks for common patterns in bank statements

    // First, try to find date patterns in the text
    const datePatterns = [
      // Common date formats: DD/MM/YYYY or MM/DD/YYYY or YYYY-MM-DD
      /\d{1,2}[/-]\d{1,2}[/-]\d{2,4}/g,
      // ISO format: YYYY-MM-DD
      /\d{4}-\d{2}-\d{2}/g,
    ];

    const potentialDateMatches: number[] = [];

    // Find all position indices where dates appear
    for (const pattern of datePatterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        potentialDateMatches.push(match.index);
      }
    }

    if (potentialDateMatches.length === 0) {
      // No dates found, try a different approach
      return parseUnstructuredText(text);
    }

    // Sort date positions
    potentialDateMatches.sort((a, b) => a - b);

    // Use date positions to identify potential rows
    // This assumes dates are at consistent positions in each row
    const lines = text.split('\n');
    let currentLine = '';
    let dateIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.length === 0) continue;

      // Check if this line contains a date
      let hasDate = false;
      for (const pattern of datePatterns) {
        if (pattern.test(line)) {
          hasDate = true;
          break;
        }
      }

      if (hasDate) {
        // If we had a previous row, add it to the result
        if (currentLine) {
          const parsedRow = parseStatementRow(currentLine);
          if (Object.keys(parsedRow).length > 0) {
            result.push(parsedRow);
          }
        }

        // Start a new row
        currentLine = line;
      } else if (currentLine) {
        // Continue the current row
        currentLine += ' ' + line;
      }
    }

    // Add the last row if any
    if (currentLine) {
      const parsedRow = parseStatementRow(currentLine);
      if (Object.keys(parsedRow).length > 0) {
        result.push(parsedRow);
      }
    }

    // If we couldn't extract any structured data, fall back to unstructured parsing
    if (result.length === 0) {
      return parseUnstructuredText(text);
    }

    return result;
  } catch (error) {
    console.warn('Error extracting structured data from PDF:', error);
    // Fall back to unstructured parsing
    return parseUnstructuredText(text);
  }
}

/**
 * Parse a single row from a bank statement
 * @param text The row text
 * @returns Object with parsed values
 */
function parseStatementRow(text: string): Record<string, string | number> {
  const result: Record<string, string | number> = {};

  try {
    // Try to extract date
    const dateMatch = text.match(/\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}-\d{2}-\d{2}/);
    if (dateMatch) {
      result.date = dateMatch[0];
    }

    // Try to extract amount (typically currency values)
    // Look for patterns like $123.45, R$123,45, 123.45, -123.45
    const amountMatch = text.match(/[-+]?\s*[R$£€$]?\s*\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})/);
    if (amountMatch) {
      const amountStr = amountMatch[0].replace(/[R$£€$\s]/g, '').replace(',', '.');
      result.amount = parseFloat(amountStr);
    }

    // Extract description (everything except date and amount)
    let description = text;
    if (dateMatch) {
      description = description.replace(dateMatch[0], '');
    }
    if (amountMatch) {
      description = description.replace(amountMatch[0], '');
    }

    // Clean up description
    description = description.replace(/\s+/g, ' ').trim();
    if (description) {
      result.description = description;
    }

    return result;
  } catch (error) {
    console.warn('Error parsing statement row:', error);
    return {};
  }
}

/**
 * Parse unstructured PDF text as a fallback
 * @param text The full PDF text
 * @returns Array of objects representing potential transactions
 */
function parseUnstructuredText(text: string): Array<Record<string, string | number>> {
  const result: Array<Record<string, string | number>> = [];

  try {
    // Split by newlines and remove empty lines
    const lines = text.split('\n').filter(line => line.trim().length > 0);

    // Look for lines that might represent transactions
    // This is a simplified approach that looks for lines containing both
    // date patterns and currency values
    for (const line of lines) {
      const parsedRow = parseStatementRow(line);

      // Only consider rows that have at least a date or amount
      if (parsedRow.date || parsedRow.amount !== undefined) {
        result.push(parsedRow);
      }
    }

    return result;
  } catch (error) {
    console.warn('Error parsing unstructured text:', error);
    return [];
  }
}
