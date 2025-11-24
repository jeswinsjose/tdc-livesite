import React, { useContext } from "react";
import { EstimateContext } from "../context/EstimateContext";

// Reusable Toggle Switch Component
const ToggleSwitch = ({ label, enabled, onChange }) => (
  <div className="flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
        enabled ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  </div>
);

export const Step5_ScanDates = ({ onNext }) => {
  const { formData, updateFormData } = useContext(EstimateContext);

  return (
    <div>
      <h2 className="text-2xl font-bold text-white font-display">
        Select your scan dates
      </h2>
      <p className="mt-1 text-gray-400">
        Let's get some additional information to mobilize.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-300">
            1st Preferred Scan Date
          </label>
          <input
            type="date"
            value={formData.scanDate1}
            onChange={(e) => updateFormData({ scanDate1: e.target.value })}
            className="mt-1 w-full p-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-brand-accent focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300">
            2nd Preferred Scan Date (optional)
          </label>
          <input
            type="date"
            value={formData.scanDate2}
            onChange={(e) => updateFormData({ scanDate2: e.target.value })}
            className="mt-1 w-full p-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-brand-accent focus:outline-none transition-colors"
          />
        </div>
        <ToggleSwitch
          label="Certificate of Insurance Required?"
          enabled={formData.coiRequired}
          onChange={(val) => updateFormData({ coiRequired: val })}
        />
      </div>

      <button
        onClick={onNext}
        disabled={!formData.scanDate1}
        className="mt-8 w-full bg-brand-accent text-black font-bold py-3 px-4 rounded-lg hover:bg-white transition-colors disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
      >
        Select Dates
      </button>
    </div>
  );
};
