import React from 'react';

interface OnboardingStepperProps {
  currentStep: number;
  totalSteps: number;
}

export const OnboardingStepper: React.FC<OnboardingStepperProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full max-w-xl mx-auto mb-10">
      <div className="flex items-center justify-between relative">
        {/* Connection Track */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 -translate-y-1/2 z-0 transition-all duration-500 ease-out" 
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />

        {/* Node Indicators */}
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={stepNumber} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-500 border ${
                  isCurrent 
                    ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(147,51,234,0.5)]' 
                    : isActive 
                    ? 'bg-blue-600 text-white border-blue-400' 
                    : 'bg-zinc-900 text-gray-500 border-white/10'
                }`}
              >
                {stepNumber}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};