'use client';

import { useCallback } from 'react';

import { Loader2, UploadIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

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

import { FileItem } from './file-item';
import { getProcessingSteps } from './processing-steps-config';
import { ProcessingStepsList } from './processing-steps-list';
import type { FileUploaderProps } from './types';
import { useFileProcessing } from './use-file-processing';
import { formatDuration } from './utils';

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
  });

  // Get the processing steps
  const processingSteps = getProcessingSteps(isProcessing, activeStep, processingDurations);

  return (
    <div className="h-full">
      <div
        {...getRootProps()}
        className={cn(
          'h-full border-2 border-dashed transition-colors',
          isDragActive ? 'border-primary' : 'border-muted-foreground/25',
          isProcessing ? 'cursor-not-allowed opacity-60' : 'hover:bg-muted/50 cursor-pointer'
        )}
      >
        <input {...getInputProps()} />

        <Card className="flex h-full flex-col border-0 bg-transparent">
          <CardHeader>
            <CardTitle>Upload Bank Statements</CardTitle>

            <CardDescription>
              {isMobile
                ? 'Tap here to select your bank or credit card statements'
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
              <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                <UploadIcon className="text-muted-foreground mb-2 h-10 w-10" />

                <p className="text-muted-foreground text-sm">
                  {isProcessing
                    ? 'Processing files... Please wait'
                    : isMobile
                      ? 'Tap to select files'
                      : 'Click or drag and drop to upload files'}
                </p>
              </div>
            )}

            {error && (
              <div className="bg-destructive/10 text-destructive mt-4 rounded-md p-3 text-sm">
                {error}
              </div>
            )}

            {skippedDuplicates > 0 && (
              <div className="bg-muted text-muted-foreground mt-4 rounded-md p-3 text-sm">
                {`${skippedDuplicates} duplicated transaction${
                  skippedDuplicates !== 1 ? 's' : ''
                } skipped`}
              </div>
            )}

            {isProcessing && startTime && (
              <div className="bg-muted text-muted-foreground mt-4 flex items-center rounded-md p-3 text-sm">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                <span>Processing for {formatDuration(elapsedTime)}...</span>
              </div>
            )}
          </CardContent>

          <CardFooter className="mt-auto flex flex-col items-start gap-5">
            {showDuration && (
              <div className="text-muted-foreground mt-2 text-xs">
                <ProcessingStepsList
                  steps={processingSteps}
                  activeStep={activeStep}
                  activeStepElapsedTime={activeStepElapsedTime}
                />
              </div>
            )}

            <div className="flex w-full flex-col gap-1">
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
