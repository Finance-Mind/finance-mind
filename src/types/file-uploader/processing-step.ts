import type { ReactNode } from 'react';

import type { ProcessingStepId } from './processing-step-id';

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
