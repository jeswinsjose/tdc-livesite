import React, { useContext } from "react";
import { EstimateContext } from "../context/EstimateContext";

export const Step6_EstimateSummary = () => {
  const { formData } = useContext(EstimateContext);

  const summaryItems = [
    { label: "Service", value: formData.service },
    { label: "Project Name", value: formData.projectName },
    { label: "Address", value: formData.address },
    {
      label: "Space Size",
      value: `${formData.totalArea.toLocaleString()} ft²`,
    },
    { label: "Floors", value: formData.floors },
    { label: "Space Type", value: formData.spaceType },
    { label: "Scopes", value: formData.scopes.join(", ") },
    { label: "Revit Version", value: formData.revitVersion },
    { label: "Unit", value: formData.preferredUnit },
    { label: "First Scan Date", value: formData.scanDate1 },
  ];

  if (formData.scanDate2) {
    summaryItems.push({ label: "Second Scan Date", value: formData.scanDate2 });
  }

  summaryItems.push({
    label: "COI Required",
    value: formData.coiRequired ? "Yes" : "No",
  });

  return (
    <div>
      <h2 className="text-3xl font-bold text-white font-display">Estimate Summary</h2>
      <p className="mt-1 text-gray-400">Review your project details below.</p>

      <div className="mt-8 space-y-2">
        {summaryItems.map((item) => (
          <div key={item.label} className="flex justify-between py-2 border-b border-white/10">
            <span className="font-medium text-gray-400">{item.label}</span>
            <span className="text-white text-right">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
