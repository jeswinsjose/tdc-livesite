import React from "react";

// A simple info icon
const InfoIcon = () => (
  <svg
    className="w-4 h-4 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const ToggleSwitch = ({
  label,
  enabled,
  onChange,
  description,
  tooltipText,
}) => (
  <div className="flex items-center justify-between p-3 bg-black/40 border border-white/10 rounded-lg">
    <div className="flex items-center space-x-2">
      <div className="flex-grow">
        <span className="text-sm font-medium text-white">{label}</span>
        {description && <p className="text-xs text-gray-400">{description}</p>}
      </div>
      {/* If tooltipText is provided, show the icon and tooltip */}
      {tooltipText && (
        <div className="relative group flex items-center">
          <InfoIcon />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-black border border-white/20 text-white text-xs rounded-lg p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
            {tooltipText}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-white/20"></div>
          </div>
        </div>
      )}
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors flex-shrink-0 ${
        enabled ? "bg-brand-accent" : "bg-white/20"
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
