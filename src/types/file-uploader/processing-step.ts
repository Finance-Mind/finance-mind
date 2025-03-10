import type { ReactNode } from 'react';

/**
 * Supported processing step IDs
 */
export type ProcessingStepId = 'parsing' | 'extraction' | 'detection';

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
