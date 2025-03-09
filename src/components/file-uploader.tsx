'use client';

import {
  FileIcon,
  XIcon,
  UploadIcon,
  Loader2,
  ActivityIcon,
  DatabaseIcon,
  ClockIcon,
  ServerIcon,
} from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import type { Transaction } from '@/interfaces/transaction';

import { processBankStatement } from '@/actions/process-bank-statement';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onTransactionsProcessed: (
    transactions: Transaction[],
    errors?: string[],
    warnings?: string[]
  ) => void;
}

interface ProcessingDurations {
  total: number;
  parsing?: number;
  extraction?: number;
  detection?: number;
}

export function FileUploader({ onTransactionsProcessed }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Keep track of processed transactions to avoid duplicates
  const [processedTransactions, setProcessedTransactions] = useState<Transaction[]>([]);
  // Add state to track duplicates that were skipped
  const [skippedDuplicates, setSkippedDuplicates] = useState<number>(0);
  // Add state to detect mobile devices
  const [isMobile, setIsMobile] = useState(false);
  // Add states for tracking processing time
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showDuration, setShowDuration] = useState(false);
  // Add a new state variable to track the current elapsed time
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  // Add state for detailed processing times
  const [processingDurations, setProcessingDurations] = useState<ProcessingDurations>(
    {} as ProcessingDurations
  );

  // Detect if user is on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      // Access window.opera in a type-safe way without using 'any'
      const userAgent =
        navigator.userAgent ||
        navigator.vendor ||
        (window as Window & { opera?: string }).opera ||
        '';
      const mobileRegex =
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;

      setIsMobile(mobileRegex.test(userAgent));
    };

    checkMobile();
  }, []);

  // Format the processing time in a user-friendly way
  const formatDuration = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);

    if (seconds < 60) {
      return `${seconds}s`;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}m ${remainingSeconds}s`;
  };

  // Add useEffect to update the elapsed time in real-time with an interval
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    // Only set up the interval when processing is active and we have a start time
    if (isProcessing && startTime !== null) {
      // Update elapsed time immediately
      setElapsedTime(Date.now() - startTime);

      // Then set up an interval to update it every 100ms (smoother updates)
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    } else {
      // Reset elapsed time when not processing
      setElapsedTime(0);
    }

    // Clean up interval when component unmounts or dependencies change
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isProcessing, startTime]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/pdf': ['.pdf'],
    },
    disabled: isProcessing,
    // Add noClick option for mobile to prevent unintended clicks
    noClick: isMobile,
  });

  const readFileAsText = (file: File): Promise<string> => {
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
  };

  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
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
        setError(
          'File is too large for mobile processing. Please use a smaller file or try on desktop.'
        );
        reject(new Error('File too large for mobile processing'));
        return;
      }

      reader.readAsArrayBuffer(file);
    });
  };

  // Add a helper function to properly deduplicate transactions
  const deduplicateTransactions = (
    currentTransactions: Transaction[],
    newTransactions: Transaction[]
  ): Transaction[] => {
    // Create a Set of existing transaction IDs
    const existingTransactionIds = new Set(currentTransactions.map(t => t.id));

    // Filter out new transactions that match existing IDs
    const uniqueNewTransactions = newTransactions.filter(t => !existingTransactionIds.has(t.id));

    return [...currentTransactions, ...uniqueNewTransactions];
  };

  const handleProcessFiles = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setError(null);
    setShowDuration(false);
    setProcessingDurations({} as ProcessingDurations);

    // Record the start time
    const processingStartTime = Date.now();

    setStartTime(processingStartTime);

    try {
      // Read file contents with improved error handling
      const fileContents = await Promise.all(
        files.map(async file => {
          try {
            // Handle file size limits on mobile
            if (isMobile && file.size > 10 * 1024 * 1024) {
              // 10MB
              throw new Error(`File ${file.name} is too large for mobile processing.`);
            }

            const content =
              file.type === 'text/csv'
                ? await readFileAsText(file)
                : await readFileAsArrayBuffer(file);

            return {
              name: file.name,
              content,
              contentType: file.type,
            };
          } catch (error) {
            console.error(`Error reading file ${file.name}:`, error);
            throw new Error(`Failed to read file ${file.name}: ${(error as Error).message}`);
          }
        })
      );

      // Process the files - pass existing processed transactions to avoid duplicates
      const result = await processBankStatement(fileContents, processedTransactions);

      // Calculate the processing duration
      const endTime = Date.now();
      const duration = endTime - processingStartTime;

      setShowDuration(true);

      setProcessingDurations(prev => ({
        ...prev,
        total: duration,
      }));

      // Store detailed processing times returned from server
      if (result.processingTime) {
        setProcessingDurations(result.processingTime);
      }

      // Use the deduplication helper function for storing transactions
      setProcessedTransactions(prevTransactions =>
        deduplicateTransactions(prevTransactions, result.transactions)
      );

      setSkippedDuplicates(prev => prev + result.duplicatesSkipped);

      // Pass the results to the parent component
      onTransactionsProcessed(result.transactions, result.errors, result.warnings);

      // Clear the files after successful processing
      setFiles([]);
    } catch (error) {
      console.error('Error processing files:', error);
      setError(`Failed to process files: ${(error as Error).message}`);

      // Calculate the processing duration even for errors
      const endTime = Date.now();
      const duration = endTime - processingStartTime;

      setShowDuration(true);

      setProcessingDurations(prev => ({
        ...prev,
        total: duration,
      }));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-full">
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed transition-colors h-full',
          isDragActive ? 'border-primary' : 'border-muted-foreground/25',
          isProcessing ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-muted/50'
        )}
      >
        <input {...getInputProps()} />

        <Card className="border-0 bg-transparent flex flex-col h-full">
          <CardHeader>
            <CardTitle>Upload Bank Statements</CardTitle>

            <CardDescription>
              {isMobile
                ? 'Tap the button below to select your bank or credit card statements'
                : 'Drag and drop your bank or credit card statements in CSV or PDF format'}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-grow">
            {files.length > 0 ? (
              <div className="space-y-3">
                <div className="text-sm font-medium">Selected files:</div>

                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-muted/50 p-2 text-sm"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <FileIcon className="h-4 w-4 text-muted-foreground" />

                        <span className="truncate max-w-36 flex-1">{file.name}</span>

                        <span className="text-muted-foreground min-w-10">
                          ({Math.round(file.size / 1024)} KB)
                        </span>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        disabled={isProcessing}
                        onClick={e => {
                          e.stopPropagation();
                          setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
                        }}
                      >
                        <XIcon className="h-4 w-4" />

                        <span className="sr-only">Remove file</span>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                <UploadIcon className="h-10 w-10 text-muted-foreground mb-2" />

                <p className="text-sm text-muted-foreground">
                  {isProcessing
                    ? 'Processing files... Please wait'
                    : isMobile
                      ? 'Tap to select files'
                      : 'Click or drag and drop to upload files'}
                </p>

                {isMobile && (
                  <Button
                    variant="outline"
                    onClick={e => {
                      e.stopPropagation();
                      open();
                    }}
                    className="mt-4"
                  >
                    Select files
                  </Button>
                )}
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                {error}
              </div>
            )}

            {skippedDuplicates > 0 && (
              <div className="mt-4 p-3 bg-muted text-muted-foreground text-sm rounded-md">
                {`${skippedDuplicates} duplicated transaction${skippedDuplicates !== 1 ? 's' : ''} skipped`}
              </div>
            )}

            {isProcessing && startTime && (
              <div className="mt-4 p-3 bg-muted text-muted-foreground text-sm rounded-md flex items-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />

                <span>Processing for {formatDuration(elapsedTime)}...</span>
              </div>
            )}
          </CardContent>

          <CardFooter className="mt-auto flex flex-col gap-4 items-start">
            {showDuration && processingDurations ? (
              <div className="mt-4 w-full p-5 bg-primary/10 rounded-md space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <ClockIcon className="h-3 w-3 mr-2 text-primary/70" />

                  <span>
                    Processing completed in {formatDuration(processingDurations?.total ?? 0)}
                  </span>
                </div>

                {processingDurations.parsing ? (
                  <div className="flex items-center">
                    <ServerIcon className="h-3 w-3 mr-2 text-primary/70" />

                    <span>Parsing: {formatDuration(processingDurations.parsing)}</span>
                  </div>
                ) : null}

                {processingDurations.extraction ? (
                  <div className="flex items-center">
                    <DatabaseIcon className="h-3 w-3 mr-2 text-primary/70" />

                    <span>Data extraction: {formatDuration(processingDurations.extraction)}</span>
                  </div>
                ) : null}

                {processingDurations.detection ? (
                  <div className="flex items-center">
                    <ActivityIcon className="h-3 w-3 mr-2 text-primary/70" />

                    <span>Transfer detection: {formatDuration(processingDurations.detection)}</span>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="w-full flex flex-col gap-1">
              <p className="mb-2 text-sm">{files.length} file(s) selected</p>

              <Button
                className="w-full"
                disabled={files.length === 0 || isProcessing}
                onClick={e => {
                  e.stopPropagation();
                  handleProcessFiles();
                }}
              >
                {isProcessing ? 'Processing...' : 'Process Statements'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
