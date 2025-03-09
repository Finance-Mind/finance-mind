'use client';

import { Loader2, UploadIcon } from 'lucide-react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { FileItem } from './file-item';
import { getProcessingSteps } from './processing-steps-config';
import { ProcessingStepsList } from './processing-steps-list';
import { useFileProcessing } from './use-file-processing';
import { formatDuration } from './utils';

import type { FileUploaderProps } from './types';

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

/**
 * Component for handling file upload and processing of bank statements
 */
export function FileUploader({ onTransactionsProcessed }: FileUploaderProps) {
  // Use the file processing hook
  const {
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
    addFiles,
    removeFile,
    handleProcessFiles,
  } = useFileProcessing({ onTransactionsProcessed });

  // Handle file drop
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      addFiles(acceptedFiles);
    },
    [addFiles]
  );

  // Configure dropzone
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/pdf': ['.pdf'],
    },
    disabled: isProcessing,
    noClick: isMobile,
  });

  // Get the processing steps
  const processingSteps = getProcessingSteps(isProcessing, activeStep, processingDurations);

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
                    <FileItem
                      key={index}
                      file={file}
                      isProcessing={isProcessing}
                      onRemove={() => removeFile(index)}
                    />
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
                {`${skippedDuplicates} duplicated transaction${
                  skippedDuplicates !== 1 ? 's' : ''
                } skipped`}
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
                <ProcessingStepsList
                  steps={processingSteps}
                  activeStep={activeStep}
                  activeStepElapsedTime={activeStepElapsedTime}
                />
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
