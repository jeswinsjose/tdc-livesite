import React, { useContext } from "react";
import { EstimateContext } from "../context/EstimateContext";
import { ScopeButton } from "../components/ScopeButton";
import { ToggleSwitch } from "../components/ToggleSwitch";

export const Step3_ProjectDetails = ({ onNext }) => {
  const { formData, updateFormData } = useContext(EstimateContext);

  const handleScopeToggle = (scope) => {
    const newScopes = formData.scopes.includes(scope)
      ? formData.scopes.filter((s) => s !== scope)
      : [...formData.scopes, scope];
    updateFormData({ scopes: newScopes });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white font-display">
        {formData.service} Service
      </h2>
      <p className="mt-1 text-gray-400">Professional 3D scanning services</p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-300">
            Project Name
          </label>
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) => updateFormData({ projectName: e.target.value })}
            className="mt-1 w-full p-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-brand-accent focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300">
            Space Size (Sq.ft)
          </label>
          <input
            type="number"
            value={formData.totalArea}
            onChange={(e) =>
              updateFormData({ totalArea: parseInt(e.target.value) || 0 })
            }
            className="mt-1 w-full p-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-brand-accent focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300">
            Floors To Scan
          </label>
          <input
            type="text"
            value={formData.floors}
            onChange={(e) => updateFormData({ floors: e.target.value })}
            className="mt-1 w-full p-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-brand-accent focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300">
            Space Type
          </label>
          <select
            value={formData.spaceType}
            onChange={(e) => updateFormData({ spaceType: e.target.value })}
            className="mt-1 w-full p-3 bg-black/40 border border-white/10 rounded-lg text-white focus:border-brand-accent focus:outline-none transition-colors"
          >
            <option>Data Center</option>
            <option>Office</option>
            <option>Residential</option>
            <option>Industrial</option>
            <option>Retail</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300">
            Interior Scopes
          </label>
          <div className="mt-2 space-y-2">
            <ScopeButton
              label="Architecture"
              selected={formData.scopes.includes("Architecture")}
              onClick={() => handleScopeToggle("Architecture")}
            />
            <ScopeButton
              label="Furniture"
              selected={formData.scopes.includes("Furniture")}
              onClick={() => handleScopeToggle("Furniture")}
            />
            <ScopeButton
              label="MEPF"
              selected={formData.scopes.includes("MEPF")}
              onClick={() => handleScopeToggle("MEPF")}
            />
          </div>
        </div>
        <div className="space-y-2">
          {/* --- PASS THE TOOLTIP TEXT AS A PROP HERE --- */}
          <ToggleSwitch
            label="Complex MEPF Project?"
            enabled={formData.complexMEPF}
            onChange={(val) => updateFormData({ complexMEPF: val })}
            tooltipText="MEPF stands for Mechanical, Electrical, Plumbing, and Fire Protection. Select this for spaces with dense and intricate systems."
          />
          <ToggleSwitch
            label="Exterior Modeling Required?"
            enabled={formData.exteriorModelling}
            onChange={(val) => updateFormData({ exteriorModelling: val })}
            tooltipText="Select this if you need the building's facade and outer structure to be modeled in addition to the interior."
          />
        </div>
      </div>

      <button
        onClick={onNext}
        className="mt-8 w-full bg-brand-accent text-black font-bold py-3 px-4 rounded-lg hover:bg-white transition-colors uppercase tracking-widest text-sm"
      >
        Go to order details
      </button>
    </div>
  );
};
