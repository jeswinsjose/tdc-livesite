import React from "react";

// Checkmark SVG for completed steps
const CheckIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M5 13l4 4L19 7"
    ></path>
  </svg>
);

export const Stepper = ({ currentStep }) => {
  const steps = [
    "Select Service",
    "Location Details",
    "Order Details",
    "Get an Estimate",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      {/* Mobile Progress Bar */}
      <div className="block md:hidden mb-8">
        <div className="flex justify-between items-end mb-2">
          <div>
            <span className="text-xs font-mono text-brand-accent uppercase tracking-widest">Step {currentStep} of {steps.length}</span>
            <h3 className="text-lg font-display font-bold text-white mt-1">{steps[currentStep - 1]}</h3>
          </div>
          <span className="text-xs text-gray-500 font-mono">{Math.round((currentStep / steps.length) * 100)}%</span>
        </div>
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-accent transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop Stepper */}
      <ol role="list" className="hidden md:flex items-center justify-between">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;
          const isLastStep = index === steps.length - 1;

          return (
            <li key={label} className="relative flex-1 flex justify-center">
              {!isLastStep && (
                <div
                  className="absolute top-4 w-full h-0.5"
                  style={{ left: "50%" }}
                  aria-hidden="true"
                >
                  <div
                    className={`h-full w-full ${
                      isCompleted ? "bg-brand-accent" : "bg-white/10"
                    }`}
                  />
                </div>
              )}

              <div className="relative flex flex-col items-center w-24">
                {/* --- THIS IS THE CORRECTED STYLING LOGIC --- */}
                <div
                  className={`
                    h-8 w-8 rounded-full flex items-center justify-center z-10
                    transition-all duration-300
                    ${
                      isCompleted
                        ? "border-2 border-brand-accent bg-brand-accent text-black"
                        : isActive
                        ? "border-2 border-brand-accent bg-black"
                        : "border-2 border-white/10 bg-black/40"
                    }
                  `}
                >
                  {isCompleted ? (
                    <CheckIcon />
                  ) : isActive ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-accent"></span>
                  ) : null}
                </div>

                <p
                  className={`
                    mt-2 text-xs font-semibold text-center uppercase tracking-wide
                    ${
                      isActive || isCompleted
                        ? "text-brand-accent"
                        : "text-gray-500"
                    }
                  `}
                >
                  {label}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
