import type { ProcessedStatement, TimingMetrics } from '@/app/api/process-bank-statement/schemas';
import type { Transaction } from '@/interfaces/transaction';
import type { ReactNode } from 'react';

/**
 * Props for the main FileUploader component
 */
export interface FileUploaderProps {
  onTransactionsProcessed: (
    transactions: Transaction[],
    errors?: string[],
    warnings?: string[]
  ) => void;
}

/**
 * Supported processing step IDs
 */
export type ProcessingStepId = 'parsing' | 'extraction' | 'detection';

/**
 * Interface for tracking processing durations
 */
export interface ProcessingDurations {
  total: number;
  parsing?: number;
  extraction?: number;
  detection?: number;
}

/**
 * Processing step UI model
 */
export interface ProcessingStep {
  id: ProcessingStepId;
  name: string;
  icon: ReactNode;
  isActive: boolean;
  isComplete: boolean;
  isPending: boolean;
  time?: number;
}

/**
 * Props for the FileItem component
 */
export interface FileItemProps {
  file: File;
  onRemove: () => void;
  isProcessing: boolean;
}

/**
 * Props for the ProcessingStepsList component
 */
export interface ProcessingStepsListProps {
  steps: ProcessingStep[];
  activeStep: ProcessingStepId | null;
  activeStepElapsedTime: number;
}

/**
 * Re-export necessary types from API schemas
 */
export type { ProcessedStatement, TimingMetrics };
export type { Transaction };
