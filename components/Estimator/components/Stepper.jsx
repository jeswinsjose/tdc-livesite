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
      <ol role="list" className="flex items-center justify-between">
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
