import React from "react";

export const ModelViewer = ({
  title = "BIMIT Model",
  subtitle = "RVT Format",
}) => {
  return (
    <div className="bg-white p-2 rounded-lg border border-gray-200 h-full flex flex-col">
      {/* Placeholder for a 3D model viewer library like Three.js or Sketchfab */}
      <div className="flex-grow bg-gray-50 rounded-md flex items-center justify-center">
        <svg viewBox="0 0 200 100" className="w-4/5 h-auto text-gray-300">
          <path
            d="M 20 50 L 80 20 L 180 20 L 120 50 Z"
            fill="currentColor"
            stroke="#e0e0e0"
            strokeWidth="0.5"
          />
          <path
            d="M 20 50 L 20 90 L 120 90 L 120 50 Z"
            fill="currentColor"
            stroke="#e0e0e0"
            strokeWidth="0.5"
          />
          <path
            d="M 120 50 L 180 20 L 180 60 L 120 90 Z"
            fill="currentColor"
            stroke="#e0e0e0"
            strokeWidth="0.5"
          />
          <path
            d="M 40 55 L 40 75 L 100 75 L 100 55 Z"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1"
          />
          <path
            d="M 40 55 L 60 45 M 100 55 L 120 45 M 100 75 L 120 65 M 40 75 L 60 65"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1"
          />
          <path
            d="M 60 45 L 60 65 L 120 65 L 120 45 Z"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="text-center p-2">
        <p className="font-semibold text-sm text-gray-700">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};
