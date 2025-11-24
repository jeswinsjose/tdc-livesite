import React from "react";

export const FormNavigation = ({ currentStep, onBack, onExit }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={onBack}
        disabled={currentStep === 1}
        className="bg-transparent border border-white/20 text-white font-semibold py-1 px-3 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center uppercase text-xs tracking-wider"
      >
        <span className="mr-2">&larr;</span> Back
      </button>
      <button
        onClick={onExit}
        className="bg-transparent border border-white/20 text-white font-semibold py-1 px-3 rounded-lg hover:bg-white/10 transition-colors flex items-center uppercase text-xs tracking-wider"
      >
        <span className="mr-2">&times;</span> Exit
      </button>
    </div>
  );
};
