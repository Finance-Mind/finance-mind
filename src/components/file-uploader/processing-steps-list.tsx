'use client';

import { formatDuration } from './utils';

import type { ProcessingStepsListProps } from './types';

/**
 * Component for displaying processing steps and their status
 */
export function ProcessingStepsList({
  steps,
  activeStep,
  activeStepElapsedTime,
}: ProcessingStepsListProps) {
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
}
