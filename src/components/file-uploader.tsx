'use client';

import {
  FileIcon,
  XIcon,
  UploadIcon,
  Loader2,
  ActivityIcon,
  DatabaseIcon,
  ServerIcon,
} from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import type { ProcessedStatement, TimingMetrics } from '@/app/api/process-bank-statement/schemas';
import type { Transaction } from '@/interfaces/transaction';

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
  const [processingDurations, setProcessingDurations] = useState<ProcessingDurations>({
    total: 0,
  });
  // Add variables to track which step is currently active and when it started
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [activeStepStartTime, setActiveStepStartTime] = useState<number | null>(null);
  const [activeStepElapsedTime, setActiveStepElapsedTime] = useState<number>(0);

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

  // Update useEffect for elapsed time to also update active step elapsed time
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isProcessing && startTime) {
      // Start the interval to update elapsed time every 100ms
      intervalId = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;

        setElapsedTime(elapsed);

        // Also update active step elapsed time if there is an active step
        if (activeStepStartTime) {
          const stepElapsed = currentTime - activeStepStartTime;

          setActiveStepElapsedTime(stepElapsed);
        }
      }, 100);
    } else {
      // Reset elapsed times when not processing
      setElapsedTime(0);
      setActiveStepElapsedTime(0);
    }

    // Clean up the interval when the component unmounts or processing stops
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isProcessing, startTime, activeStepStartTime]);

  // Add useEffect to track active step changes
  useEffect(() => {
    if (!isProcessing) {
      setActiveStep(null);
      setActiveStepStartTime(null);

      return;
    }

    // Determine which step is currently active based on processingDurations
    let currentActiveStep: string | null = null;

    if (processingDurations.detection !== undefined && processingDurations.detection > 0) {
      // Detection completed, no active step
      currentActiveStep = null;
    } else if (processingDurations.extraction !== undefined && processingDurations.extraction > 0) {
      // Extraction completed, detection is active
      currentActiveStep = 'detection';
    } else if (processingDurations.parsing !== undefined && processingDurations.parsing > 0) {
      // Parsing completed, extraction is active
      currentActiveStep = 'extraction';
    } else if (isProcessing) {
      // Processing started, parsing is active
      currentActiveStep = 'parsing';
    }

    // If active step changed, update the start time
    if (currentActiveStep !== activeStep) {
      setActiveStep(currentActiveStep);

      if (currentActiveStep) {
        setActiveStepStartTime(Date.now());
        setActiveStepElapsedTime(0);
      } else {
        setActiveStepStartTime(null);
      }
    }
  }, [isProcessing, processingDurations, activeStep]);

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

  // Add this helper function to convert ArrayBuffer to Base64
  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return window.btoa(binary);
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

            let content;

            if (file.type === 'text/csv') {
              content = await readFileAsText(file);
            } else {
              // For binary files like PDF, convert ArrayBuffer to Base64 string for JSON serialization
              const arrayBuffer = await readFileAsArrayBuffer(file);

              content = arrayBufferToBase64(arrayBuffer);
            }

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

      // Use streaming mode
      const response = await fetch('/api/process-bank-statement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileContents,
          existingTransactions: processedTransactions,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      if (!response.body) {
        throw new Error('Response body is null');
      }

      // Handle the streaming response
      const reader = response.body.getReader();
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

                setProcessingDurations(prev => ({
                  ...prev,
                  ...timingMetrics,
                }));

                // Show duration information
                setShowDuration(true);
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

      // Success - use the final result
      setProcessedTransactions(prevTransactions =>
        deduplicateTransactions(prevTransactions, result!.transactions)
      );

      setSkippedDuplicates(prev => prev + result!.duplicatesSkipped);

      // Pass the results to the parent component
      onTransactionsProcessed(result.transactions, result.errors, result.warnings);

      // Calculate total time including streaming
      const totalDuration = Date.now() - processingStartTime;

      setProcessingDurations(prev => ({
        ...prev,
        total: totalDuration,
      }));

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

  // Update renderProcessingSteps function to show real-time elapsed time for active step
  const renderProcessingSteps = () => {
    const steps = [
      {
        id: 'parsing',
        name: 'Parsing',
        icon: <ServerIcon className="w-3 h-3 mr-1" />,
        isActive: isProcessing && activeStep === 'parsing',
        isComplete: processingDurations.parsing !== undefined && processingDurations.parsing > 0,
        isPending: isProcessing && !processingDurations.parsing,
        time: processingDurations.parsing,
      },
      {
        id: 'extraction',
        name: 'Extraction',
        icon: <DatabaseIcon className="w-3 h-3 mr-1" />,
        isActive: isProcessing && activeStep === 'extraction',
        isComplete:
          processingDurations.extraction !== undefined && processingDurations.extraction > 0,
        isPending:
          isProcessing &&
          processingDurations.parsing !== undefined &&
          processingDurations.parsing > 0 &&
          !processingDurations.extraction,
        time: processingDurations.extraction,
      },
      {
        id: 'detection',
        name: 'Transfer detection',
        icon: <ActivityIcon className="w-3 h-3 mr-1" />,
        isActive: isProcessing && activeStep === 'detection',
        isComplete:
          processingDurations.detection !== undefined && processingDurations.detection > 0,
        isPending:
          isProcessing &&
          processingDurations.extraction !== undefined &&
          processingDurations.extraction > 0 &&
          !processingDurations.detection,
        time: processingDurations.detection,
      },
    ];

    return (
      <div className="flex flex-col space-y-1 mt-2">
        {steps.map(step => {
          let statusIndicator = null;
          let className = 'flex items-center';

          // Determine what time to display
          let displayTime: number | undefined = step.time;

          if (step.isActive && activeStep === step.id) {
            // For the active step, show the real-time elapsed time
            displayTime = activeStepElapsedTime;
          }

          if (step.isComplete) {
            statusIndicator = null;
            className += ' text-emerald-600';
          } else if (step.isActive) {
            statusIndicator = <span className="ml-2 text-primary animate-pulse">⋯</span>;
            className += ' text-primary';
          } else if (step.isPending) {
            statusIndicator = <span className="ml-2 text-muted-foreground text-xs">pending</span>;
            className += ' text-muted-foreground';
          }

          return (
            <div key={step.id} className={className}>
              {step.icon}

              <span>
                {`${step.name}: ${displayTime !== undefined ? formatDuration(displayTime) : '—'}`}
              </span>

              {statusIndicator}
            </div>
          );
        })}
      </div>
    );
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

          <CardFooter className="mt-auto flex flex-col gap-5 items-start">
            {showDuration && (
              <div className="text-xs text-muted-foreground mt-2">
                <div className="flex flex-col space-y-1">{renderProcessingSteps()}</div>
              </div>
            )}

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
