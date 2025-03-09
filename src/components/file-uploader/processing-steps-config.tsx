import { ActivityIcon, DatabaseIcon, ServerIcon } from 'lucide-react';

import type { ProcessingDurations, ProcessingStep, ProcessingStepId } from './types';

/**
 * Creates the processing steps configuration based on current state
 */
export function getProcessingSteps(
  isProcessing: boolean,
  activeStep: ProcessingStepId | null,
  processingDurations: ProcessingDurations
): ProcessingStep[] {
  return [
    {
      id: 'parsing',
      name: 'Parsing',
      icon: <ServerIcon className="mr-1 h-3 w-3" />,
      isActive: isProcessing && activeStep === 'parsing',
      isComplete: processingDurations.parsing !== undefined && processingDurations.parsing > 0,
      isPending: isProcessing && !processingDurations.parsing,
      time: processingDurations.parsing,
    },
    {
      id: 'extraction',
      name: 'Extraction',
      icon: <DatabaseIcon className="mr-1 h-3 w-3" />,
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
      icon: <ActivityIcon className="mr-1 h-3 w-3" />,
      isActive: isProcessing && activeStep === 'detection',
      isComplete: processingDurations.detection !== undefined && processingDurations.detection > 0,
      isPending:
        isProcessing &&
        processingDurations.extraction !== undefined &&
        processingDurations.extraction > 0 &&
        !processingDurations.detection,
      time: processingDurations.detection,
    },
  ];
}
