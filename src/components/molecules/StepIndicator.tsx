import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  steps: Array<{
    id: string;
    title: string;
    description?: string;
  }>;
  currentStep: string;
  completedSteps?: string[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  completedSteps = [],
  orientation = 'horizontal',
  className,
}) => {
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col',
        className
      )}
    >
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.id);
        const isCurrent = step.id === currentStep;
        const isPast = index < currentIndex;
        const isActive = isCurrent || isCompleted;

        return (
          <React.Fragment key={step.id}>
            <div
              className={cn(
                'flex items-center',
                orientation === 'vertical' ? 'flex-row' : 'flex-col'
              )}
            >
              {/* Step Circle */}
              <div
                className={cn(
                  'relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors',
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground bg-background text-muted-foreground',
                  isCompleted && 'bg-green-500 border-green-500'
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4 text-white" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>

              {/* Step Content */}
              <div
                className={cn(
                  'text-center',
                  orientation === 'vertical' ? 'ml-3 text-left' : 'mt-2'
                )}
              >
                <div
                  className={cn(
                    'text-sm font-medium',
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </div>
                {step.description && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {step.description}
                  </div>
                )}
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'bg-border',
                  orientation === 'horizontal'
                    ? 'h-0.5 flex-1 mx-4'
                    : 'w-0.5 h-8 ml-4 my-2',
                  (isPast || isCompleted) && 'bg-primary'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
