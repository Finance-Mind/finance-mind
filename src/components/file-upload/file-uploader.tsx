'use client';

import { FileIcon, XIcon, UploadIcon, Loader2 } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

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
import type { Transaction } from '@/interfaces/transaction';

interface FileUploaderProps {
  onTransactionsProcessed: (
    transactions: Transaction[],
    errors?: string[],
    warnings?: string[]
  ) => void;
}

export function FileUploader({ onTransactionsProcessed }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/pdf': ['.pdf'],
    },
  });

  const handleProcessFiles = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Read file contents
      const fileContents = await Promise.all(
        files.map(async file => {
          try {
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

      // Process the files
      const result = await processBankStatement(fileContents);

      // Pass the results to the parent component
      onTransactionsProcessed(result.transactions, result.errors, result.warnings);
    } catch (error) {
      console.error('Error processing files:', error);
      setError(`Failed to process files: ${(error as Error).message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
      reader.readAsText(file);
    });
  };

  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed cursor-pointer hover:bg-muted/50 transition-colors h-full',
        isDragActive ? 'border-primary' : 'border-muted-foreground/25'
      )}
    >
      <input {...getInputProps()} />

      <Card className="border-0 bg-transparent h-full flex flex-col">
        <CardHeader>
          <CardTitle>Upload Bank Statements</CardTitle>
          <CardDescription>
            Drag and drop your bank or credit card statements in CSV or PDF format
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
                    <div className="flex items-center gap-2">
                      <FileIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate max-w-[200px]">{file.name}</span>
                      <span className="text-muted-foreground">
                        ({Math.round(file.size / 1024)} KB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
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
                Click or drag and drop to upload files
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-md">
              {error}
            </div>
          )}
        </CardContent>
        <CardFooter className="mt-auto">
          <div className="w-full">
            <p className="mb-2 text-sm">{files.length} file(s) selected</p>
            <Button
              className="w-full"
              disabled={files.length === 0 || isProcessing}
              onClick={e => {
                e.stopPropagation();
                handleProcessFiles();
              }}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Process Statements'
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
