import React, { useState, createContext, useEffect } from "react";

const initialState = {
  service: "",
  projectName: "New Project",
  address: "",
  mapLocation: null,
  totalArea: 1000,
  floors: "Floor 1",
  spaceType: "Data Center",
  scopes: ["Architecture"],
  complexMEPF: false,
  exteriorModelling: false,
  projectControls: false,
  revitVersion: "Revit 2023",
  preferredUnit: "Imperial",
  files: [],
  scanDate1: "",
  scanDate2: "",
  coiRequired: false,
};

export const EstimateContext = createContext();

export const EstimateProvider = ({ children }) => {
  const [formData, setFormData] = useState(initialState);
  const [estimate, setEstimate] = useState({ price: 0, delivery: "" });

  useEffect(() => {
    let basePrice = 4000;
    let areaCharge = formData.totalArea * 0.15;
    let scopeCharge = formData.scopes.length * 750;
    let complexCharge = formData.complexMEPF ? 1500 : 0;
    let exteriorCharge = formData.exteriorModelling ? 1000 : 0;
    const total =
      basePrice + areaCharge + scopeCharge + complexCharge + exteriorCharge;
    const deliveryDays =
      5 + Math.floor(formData.totalArea / 5000) + formData.scopes.length;
    setEstimate({
      price: total,
      delivery: `${deliveryDays}-${deliveryDays + 3} Business Days`,
    });
  }, [formData]);

  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const resetFormData = () => {
    setFormData(initialState);
  };

  const value = { formData, updateFormData, estimate, resetFormData };

  return (
    <EstimateContext.Provider value={value}>
      {children}
    </EstimateContext.Provider>
  );
};
