'use client';

import { useState, useEffect } from 'react';

import { fileProcessingService } from './api-service';
import { detectMobileDevice, deduplicateTransactions, fileReaderUtils } from './utils';

import type { Transaction, ProcessingDurations, ProcessingStepId } from './types';

/**
 * Hook for managing file processing state and logic
 */
export function useFileProcessing({
  onTransactionsProcessed,
}: {
  onTransactionsProcessed: (
    transactions: Transaction[],
    errors?: string[],
    warnings?: string[]
  ) => void;
}) {
  // File management state
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Transaction tracking state
  const [processedTransactions, setProcessedTransactions] = useState<Transaction[]>([]);
  const [skippedDuplicates, setSkippedDuplicates] = useState<number>(0);

  // Mobile detection state
  const [isMobile, setIsMobile] = useState(false);

  // Processing timing state
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showDuration, setShowDuration] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [processingDurations, setProcessingDurations] = useState<ProcessingDurations>({
    total: 0,
  });

  // Step tracking state
  const [activeStep, setActiveStep] = useState<ProcessingStepId | null>(null);
  const [activeStepStartTime, setActiveStepStartTime] = useState<number | null>(null);
  const [activeStepElapsedTime, setActiveStepElapsedTime] = useState<number>(0);

  // Detect if user is on a mobile device
  useEffect(() => {
    setIsMobile(detectMobileDevice());
  }, []);

  // Update elapsed time during processing
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

  // Track active step changes
  useEffect(() => {
    if (!isProcessing) {
      setActiveStep(null);
      setActiveStepStartTime(null);

      return;
    }

    // Determine which step is currently active based on processingDurations
    let currentActiveStep: ProcessingStepId | null = null;

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

  /**
   * Adds files to the state
   */
  const addFiles = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
    setError(null);
  };

  /**
   * Removes a file from the state
   */
  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  /**
   * Processes the uploaded files
   */
  const handleProcessFiles = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setError(null);
    setShowDuration(false);
    setProcessingDurations({ total: 0 });

    const processingStartTime = Date.now();

    setStartTime(processingStartTime);

    try {
      // Read file contents
      const fileContents = await Promise.all(
        files.map(async file => {
          try {
            // Handle file size limits on mobile
            if (isMobile && file.size > 10 * 1024 * 1024) {
              throw new Error(`File ${file.name} is too large for mobile processing.`);
            }

            let content;

            if (file.type === 'text/csv') {
              content = await fileReaderUtils.readAsText(file);
            } else {
              const arrayBuffer = await fileReaderUtils.readAsArrayBuffer(file, isMobile);

              content = fileReaderUtils.arrayBufferToBase64(arrayBuffer);
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

      // Process files with API
      const result = await fileProcessingService.processFiles(
        fileContents,
        processedTransactions,
        // Provide a callback for timing updates
        timingMetrics => {
          setProcessingDurations(prev => ({
            ...prev,
            ...timingMetrics,
          }));
          setShowDuration(true);
        }
      );

      // Update state with results
      setProcessedTransactions(prevTransactions =>
        deduplicateTransactions(prevTransactions, result.transactions)
      );
      setSkippedDuplicates(prev => prev + result.duplicatesSkipped);

      // Pass the results to the parent component
      onTransactionsProcessed(result.transactions, result.errors, result.warnings);

      // Calculate total time
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

  return {
    // State
    files,
    isProcessing,
    error,
    isMobile,
    skippedDuplicates,
    elapsedTime,
    startTime,
    showDuration,
    processingDurations,
    activeStep,
    activeStepElapsedTime,

    // Actions
    addFiles,
    removeFile,
    handleProcessFiles,
  };
}
