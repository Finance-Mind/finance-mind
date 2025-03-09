import type { Transaction } from '@/interfaces/transaction';

/**
 * Utility functions for file reading operations
 */
export const fileReaderUtils = {
  /**
   * Reads a file as text
   */
  readAsText: (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error(`Failed to read file as text: ${file.name}`));
        }
      };

      reader.onerror = event => {
        console.error('FileReader error:', event);
        reject(new Error(`Failed to read file: ${file.name}`));
      };

      reader.readAsText(file);
    });
  },

  /**
   * Reads a file as array buffer
   */
  readAsArrayBuffer: (file: File, isMobile: boolean): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(reader.result);
        } else {
          reject(new Error(`Failed to read file as ArrayBuffer: ${file.name}`));
        }
      };

      reader.onerror = event => {
        console.error('FileReader error:', event);
        reject(new Error(`Failed to read file: ${file.name}`));
      };

      // Use smaller chunk sizes for large files on mobile to avoid memory issues
      if (isMobile && file.size > 5 * 1024 * 1024) {
        // 5MB
        reject(new Error('File too large for mobile processing'));

        return;
      }

      reader.readAsArrayBuffer(file);
    });
  },

  /**
   * Converts array buffer to base64 string
   */
  arrayBufferToBase64: (buffer: ArrayBuffer): string => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return window.btoa(binary);
  },
};

/**
 * Formats a duration in milliseconds to a human-readable string
 */
export const formatDuration = (ms: number): string => {
  if (ms < 1000) {
    return `${ms}ms`;
  }

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${seconds}s`;
  }

  return `${minutes}m ${remainingSeconds}s`;
};

/**
 * Deduplicates transactions based on their IDs
 */
export const deduplicateTransactions = (
  currentTransactions: Transaction[],
  newTransactions: Transaction[]
): Transaction[] => {
  const existingTransactionIds = new Set(currentTransactions.map(t => t.id));
  const uniqueNewTransactions = newTransactions.filter(t => !existingTransactionIds.has(t.id));

  return [...currentTransactions, ...uniqueNewTransactions];
};

/**
 * Detects if the current device is a mobile device
 */
export const detectMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  const userAgent =
    navigator.userAgent || navigator.vendor || (window as Window & { opera?: string }).opera || '';
  const mobileRegex =
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;

  return mobileRegex.test(userAgent);
};
