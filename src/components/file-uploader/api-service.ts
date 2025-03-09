import type { ProcessedStatement, TimingMetrics, Transaction } from './types';

/**
 * Service for handling API requests for file processing
 */
export const fileProcessingService = {
  /**
   * Processes files with the API and handles streaming responses
   */
  processFiles: async (
    fileContents: Array<{ name: string; content: string; contentType: string }>,
    existingTransactions: Transaction[],
    onTimingUpdate?: (metrics: TimingMetrics) => void
  ): Promise<ProcessedStatement> => {
    const response = await fetch('/api/process-bank-statement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileContents,
        existingTransactions,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.error || `HTTP error ${response.status}`);
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    return await fileProcessingService.handleStreamingResponse(response, onTimingUpdate);
  },

  /**
   * Handles the streaming response from the API
   * @param response The fetch response with a readable stream
   * @param onTimingUpdate Optional callback for timing updates
   */
  handleStreamingResponse: async (
    response: Response,
    onTimingUpdate?: (metrics: TimingMetrics) => void
  ): Promise<ProcessedStatement> => {
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();

    let result: ProcessedStatement | null = null;
    let streamError: Error | null = null;

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        // Decode the chunk and split by newlines (each line is an event)
        const text = decoder.decode(value, { stream: true });
        const lines = text.split('\n').filter(line => line.trim());

        for (const line of lines) {
          try {
            const event = JSON.parse(line);

            if (event.event === 'timing-update') {
              // Update the timing metrics
              const timingMetrics = event.data as TimingMetrics;

              if (onTimingUpdate) {
                onTimingUpdate(timingMetrics);
              }
            } else if (event.event === 'complete') {
              // This is the final result
              result = event.data as ProcessedStatement;
            } else if (event.event === 'error') {
              // Handle error event
              streamError = new Error(event.data.message);
            }
          } catch (parseError) {
            console.error('Failed to parse streaming event:', parseError, line);
          }
        }
      }
    } catch (streamingError) {
      console.error('Error during streaming:', streamingError);
      throw streamingError;
    } finally {
      reader.releaseLock();
    }

    // Check if we got an error from the stream
    if (streamError) {
      throw streamError;
    }

    // Check if we got a result
    if (!result) {
      throw new Error('No result received from the server');
    }

    return result;
  },
};
