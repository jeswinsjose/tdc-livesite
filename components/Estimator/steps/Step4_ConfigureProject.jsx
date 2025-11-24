import React, { useContext } from "react";
import { EstimateContext } from "../context/EstimateContext";

// A simple toggle switch component
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

export const Step4_ConfigureProject = ({ onNext }) => {
  const { formData, updateFormData } = useContext(EstimateContext);

  // Simulate file drop. We'll just store the file names for now.
  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map(
        (file) => file.name
      );
      updateFormData({ files: [...formData.files, ...newFiles] });
      // Clean up
      e.dataTransfer.clearData();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white font-display">
        Configure your project
      </h2>
      <p className="mt-1 text-gray-400">
        Let's set up your project specifications.
      </p>

      <div className="mt-6 space-y-4">
        <ToggleSwitch
          label="Project Controls"
          enabled={formData.projectControls}
          onChange={(val) => updateFormData({ projectControls: val })}
        />

        <div>
          <label className="text-sm font-medium text-gray-300">
            Revit Version
          </label>
          <select
            value={formData.revitVersion}
            onChange={(e) => updateFormData({ revitVersion: e.target.value })}
            className="mt-1 w-full p-3 bg-black/40 border border-white/10 rounded-lg text-white focus:border-brand-accent focus:outline-none transition-colors"
          >
            <option>Revit 2023</option>
            <option>Revit 2022</option>
            <option>Revit 2021</option>
            <option>Revit 2020</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300">
            Preferred Unit
          </label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => updateFormData({ preferredUnit: "Imperial" })}
              className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                formData.preferredUnit === "Imperial"
                  ? "bg-brand-accent text-black border-brand-accent"
                  : "bg-black/40 border-white/10 text-white hover:bg-white/5"
              }`}
            >
              Imperial
            </button>
            <button
              onClick={() => updateFormData({ preferredUnit: "Metric" })}
              className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                formData.preferredUnit === "Metric"
                  ? "bg-brand-accent text-black border-brand-accent"
                  : "bg-black/40 border-white/10 text-white hover:bg-white/5"
              }`}
            >
              Metric
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300">
            Attachments/References
          </label>
          <div
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            className="mt-2 flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/10 rounded-lg bg-black/20 text-center cursor-pointer hover:border-brand-accent transition-colors"
          >
            <p className="text-sm text-gray-400">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">PDF, DWG, or RVT files</p>
          </div>
          {formData.files.length > 0 && (
            <div className="mt-2 text-sm text-gray-400">
              <strong>Files:</strong> {formData.files.join(", ")}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onNext}
        className="mt-8 w-full bg-brand-accent text-black font-bold py-3 px-4 rounded-lg hover:bg-white transition-colors uppercase tracking-widest text-sm"
      >
        Next
      </button>
    </div>
  );
};
