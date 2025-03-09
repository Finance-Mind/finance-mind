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

    // Check if this is a mobile device - use a simpler approach for mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    // Limit PDF size on mobile devices to prevent crashes
    if (isMobile && pdfContent.byteLength > 5 * 1024 * 1024) {
      // 5MB limit on mobile
      console.warn('PDF file too large for mobile processing');
      return [
        {
          error: 'PDF file too large for mobile processing',
          message: 'Please use a smaller file or try on desktop',
        },
      ];
    }

    try {
      // Dynamically import PDF.js only on the client side
      // We use any typing here to avoid dependency on specific PDF.js types
      // which can cause issues with type checking in SSR
      const pdfjs = await import('pdfjs-dist');

      // Set the worker source
      const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.mjs');
      pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

      // Use a timeout to prevent hanging on problematic PDFs
      const timeoutPromise = new Promise<never>((_, reject) => {
        const timeout = isMobile ? 15000 : 30000; // Shorter timeout on mobile
        setTimeout(() => reject(new Error('PDF processing timed out')), timeout);
      });

      // Load the PDF document with timeout
      const loadingTask = pdfjs.getDocument({ data: pdfContent });

      // Add progress callback for better user feedback
      loadingTask.onProgress = (progressData: { loaded: number; total: number }) => {
        console.log(
          `PDF loading: ${Math.round((progressData.loaded / progressData.total) * 100)}%`
        );
      };

      // Race between PDF loading and timeout
      const pdf = await Promise.race([loadingTask.promise, timeoutPromise]);

      // Limit the number of pages processed on mobile to improve performance
      const pagesToProcess = isMobile ? Math.min(pdf.numPages, 5) : pdf.numPages;

      // Extract text from pages (with limits for mobile)
      const extractedText: string[] = [];

      for (let i = 1; i <= pagesToProcess; i++) {
        try {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          // Use a type assertion to handle unknown structure

          const pageText = textContent.items.map(item => ('str' in item ? item.str : '')).join(' ');

          extractedText.push(pageText);

          // Mobile optimization: free up memory as we go
          if (isMobile) {
            page.cleanup();
          }
        } catch (pageError) {
          console.warn(`Error extracting text from page ${i}:`, pageError);
          extractedText.push(`[Error extracting page ${i}]`);
          continue; // Continue with next page despite error
        }
      }

      // Join all pages' text
      const fullText = extractedText.join('\n');

      // Clean up PDF document to free memory
      pdf.destroy();

      // Try to extract a table-like structure from the PDF
      const extractedData = extractStructuredData(fullText);

      return extractedData;
    } catch (pdfJsError) {
      console.error('PDF.js error:', pdfJsError);

      // Special handling for mobile-specific errors
      if (isMobile) {
        const errorMessage = (pdfJsError as Error).message || String(pdfJsError);

        if (
          errorMessage.includes('out of memory') ||
          errorMessage.includes('allocation failed') ||
          errorMessage.includes('timeout')
        ) {
          console.log('Attempting minimal PDF extraction for mobile...');

          try {
            // Try the minimal extraction approach as a fallback
            return await extractMinimalPdfContent(pdfContent);
          } catch (minimalError) {
            console.error('Even minimal PDF extraction failed:', minimalError);
            return [
              {
                error: 'PDF processing failed on mobile',
                message: 'This PDF is too complex to process on mobile. Please try on desktop.',
              },
            ];
          }
        }
      }

      throw pdfJsError;
    }
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

    // Return a meaningful error object rather than throwing
    // This allows the application to continue and display a user-friendly error
    return [
      {
        error: 'PDF parsing failed',
        message: (error as Error).message || 'Unknown error',
      },
    ];
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

/**
 * Extract a minimal amount of text from a PDF, optimized for mobile devices
 * This is a fallback when full processing fails on mobile
 * @param pdfContent The PDF content as an ArrayBuffer
 * @returns A simplified extraction with just basic information
 */
async function extractMinimalPdfContent(
  pdfContent: ArrayBuffer
): Promise<Array<Record<string, string | number>>> {
  try {
    // Dynamically import PDF.js
    const pdfjs = await import('pdfjs-dist');
    const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

    // Configure PDF.js with minimal memory usage
    const loadingTask = pdfjs.getDocument({
      data: pdfContent,
      disableFontFace: true,
      // Use type assertion to handle pdfjs-specific options
      // @ts-ignore - PDF.js custom properties
      nativeImageDecoderSupport: 'none',
      ignoreErrors: true,
      isEvalSupported: false,
      cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
      cMapPacked: true,
    } as any); // Use type assertion for PDF.js specific options

    // Use a shorter timeout for mobile
    const timeoutMs = 10000; // 10 seconds
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('PDF minimal processing timed out')), timeoutMs);
    });

    // Only process the first 2 pages at most
    const pdf = await Promise.race([loadingTask.promise, timeoutPromise]);
    const pagesToProcess = Math.min(pdf.numPages, 2);

    const extractedText: string[] = [];

    for (let i = 1; i <= pagesToProcess; i++) {
      try {
        const page = await pdf.getPage(i);
        // Using a simpler text extraction approach
        const textContent = await page.getTextContent({
          // Use type assertion for PDF.js specific options
          normalizeWhitespace: true,
          disableCombineTextItems: false,
        } as any);

        const pageText = textContent.items
          .map(item => ('str' in item ? item.str : ''))
          .join(' ')
          .trim();

        extractedText.push(pageText);

        // Free up memory immediately
        page.cleanup();
      } catch (pageError) {
        console.warn(`Error in minimal extraction from page ${i}:`, pageError);
        continue;
      }
    }

    // Clean up
    pdf.destroy();

    // Extract just the most likely transaction data
    // Look for date patterns and currency values
    const result: Array<Record<string, string | number>> = [];
    const fullText = extractedText.join(' ');

    // Find all dates in the text
    const dateRegex = /\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}-\d{2}-\d{2}/g;
    const dates = Array.from(fullText.matchAll(dateRegex), m => m[0]);

    // Find all monetary values
    const moneyRegex = /[-+]?\s*[R$£€$]?\s*\d{1,3}(?:[,.]\d{3})*(?:[,.]\d{2})/g;
    const amounts = Array.from(fullText.matchAll(moneyRegex), m => m[0]);

    // Create simple records with just dates and amounts if we have any
    if (dates.length > 0 || amounts.length > 0) {
      // Create records with what we have
      const maxItems = Math.max(dates.length, amounts.length);

      for (let i = 0; i < maxItems; i++) {
        const record: Record<string, string | number> = {};

        if (i < dates.length) {
          record.date = dates[i];
        }

        if (i < amounts.length) {
          const amountStr = amounts[i].replace(/[R$£€$\s]/g, '').replace(',', '.');
          try {
            record.amount = parseFloat(amountStr);
          } catch (e) {
            record.amount_text = amounts[i];
          }
        }

        if (Object.keys(record).length > 0) {
          result.push(record);
        }
      }
    }

    // If we couldn't extract structured data, return at least what we found
    if (result.length === 0 && extractedText.length > 0) {
      return [{ raw_content: extractedText.join('\n').substring(0, 1000) }];
    }

    return result;
  } catch (error) {
    console.error('Error in minimal PDF extraction:', error);
    return [
      {
        error: 'PDF minimal extraction failed',
        message: 'Could not extract even basic information from this PDF',
      },
    ];
  }
}
