import React, { useContext } from "react";
import { EstimateContext } from "../context/EstimateContext";

const ServiceOption = ({
  title,
  description,
  value,
  selectedValue,
  onSelect,
}) => (
  <div
    onClick={() => onSelect(value)}
    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200
      ${
        selectedValue === value
          ? "border-brand-accent bg-brand-accent/10"
          : "border-white/10 bg-black/20 hover:border-white/30 hover:bg-white/5"
      }`}
  >
    <div className="flex items-center justify-between">
      <span className={`font-semibold ${selectedValue === value ? 'text-brand-accent' : 'text-white'}`}>{title}</span>
      <div
        className={`w-5 h-5 rounded-full border flex items-center justify-center
        ${
          selectedValue === value
            ? "border-brand-accent bg-brand-accent"
            : "border-gray-600"
        }`}
      >
        {selectedValue === value && (
          <div className="w-2 h-2 bg-black rounded-full"></div>
        )}
      </div>
    </div>
    <p className="text-sm text-gray-400 mt-1">{description}</p>
  </div>
);

export const Step1_ServiceSelection = ({ onNext }) => {
  const { formData, updateFormData } = useContext(EstimateContext);

  return (
    <div>
      <h2 className="text-2xl font-bold text-white font-display">
        Let's get you an estimate
      </h2>
      <p className="mt-1 text-gray-400">
        How would you like us to bring your space online?
      </p>
      <div className="mt-6 space-y-4">
        <ServiceOption
          title="SCANIT"
          description="I need a 3D scan of my space"
          value="SCANIT"
          selectedValue={formData.service}
          onSelect={(val) => updateFormData({ service: val })}
        />
        <ServiceOption
          title="BIMIT"
          description="I have scan data and need BIM modeling"
          value="BIMIT"
          selectedValue={formData.service}
          onSelect={(val) => updateFormData({ service: val })}
        />
      </div>
      <button
        onClick={onNext}
        disabled={!formData.service}
        className="mt-8 w-full bg-brand-accent text-black font-bold py-3 px-4 rounded-lg hover:bg-white transition-colors disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
      >
        {formData.service
          ? `Continue with ${formData.service}`
          : "Select a service"}
      </button>
    </div>
  );
};
