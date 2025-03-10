'use client';

import { useMemo } from 'react';

import { ActivityIcon, DatabaseIcon, ServerIcon } from 'lucide-react';

import type { ProcessingDurations } from '@/types/file-uploader/processing-durations';
import type { ProcessingStep, ProcessingStepId } from '@/types/file-uploader/processing-step';
import { formatDuration } from '@/utils/format-duration';

/**
 * Checks if a duration value is completed (defined and greater than 0)
 */
function isDurationCompleted(duration?: number): boolean {
  return duration !== undefined && duration > 0;
}

/**
 * Props for the enhanced ProcessingSteps component
 */
interface ProcessingStepsProps {
  isProcessing: boolean;
  activeStep: ProcessingStepId | null;
  processingDurations: ProcessingDurations;
  activeStepElapsedTime: number;
}

export interface ProcessingStepsListProps {
  steps: ProcessingStep[];
  activeStep: ProcessingStepId | null;
  activeStepElapsedTime: number;
}

/**
 * Component for displaying processing steps and their status
 */
function ProcessingStepsList({
  steps,
  activeStep,
  activeStepElapsedTime,
}: ProcessingStepsListProps) {
  return (
    <div className="flex flex-col space-y-1">
      {steps.map(step => {
        // Determine what time to display
        const displayTime =
          step.isActive && activeStep === step.id ? activeStepElapsedTime : step.time;

        // Determine styling and indicators based on step state
        let statusIndicator = null;
        let className = 'flex items-center';

        if (step.isComplete) {
          className += ' text-emerald-600 dark:text-emerald-400';
        } else if (step.isActive) {
          statusIndicator = <span className="text-primary ml-2 animate-pulse">⋯</span>;
          className += ' text-primary';
        } else if (step.isPending) {
          statusIndicator = <span className="text-muted-foreground ml-2 text-xs">pending</span>;
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
}

/**
 * Enhanced ProcessingSteps component that handles both generation and display of steps
 */
export function ProcessingSteps({
  isProcessing,
  activeStep,
  processingDurations,
  activeStepElapsedTime,
}: ProcessingStepsProps) {
  // Memoize the steps calculation to avoid unnecessary recalculations
  const steps = useMemo((): ProcessingStep[] => {
    const parsingCompleted = isDurationCompleted(processingDurations.parsing);
    const extractionCompleted = isDurationCompleted(processingDurations.extraction);
    const detectionCompleted = isDurationCompleted(processingDurations.detection);

    return [
      {
        id: 'parsing',
        name: 'Parsing',
        icon: <ServerIcon className="mr-1 h-3 w-3" />,
        isActive: isProcessing && activeStep === 'parsing',
        isComplete: parsingCompleted,
        isPending: isProcessing && !parsingCompleted,
        time: processingDurations.parsing,
      },
      {
        id: 'extraction',
        name: 'Extraction',
        icon: <DatabaseIcon className="mr-1 h-3 w-3" />,
        isActive: isProcessing && activeStep === 'extraction',
        isComplete: extractionCompleted,
        isPending: isProcessing && parsingCompleted && !extractionCompleted,
        time: processingDurations.extraction,
      },
      {
        id: 'detection',
        name: 'Detection',
        icon: <ActivityIcon className="mr-1 h-3 w-3" />,
        isActive: isProcessing && activeStep === 'detection',
        isComplete: detectionCompleted,
        isPending: isProcessing && extractionCompleted && !detectionCompleted,
        time: processingDurations.detection,
      },
    ];
  }, [isProcessing, activeStep, processingDurations]);

  return (
    <ProcessingStepsList
      steps={steps}
      activeStep={activeStep}
      activeStepElapsedTime={activeStepElapsedTime}
    />
  );
}
