import React, { useContext } from "react";
import { EstimateContext } from "../context/EstimateContext";

export const EstimateCard = () => {
  const { estimate } = useContext(EstimateContext);

  return (
    <div className="glass-panel p-6 rounded-lg border border-white/10 sticky top-8 bg-white/5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Estimated Pricing</p>
          <p className="text-2xl font-bold text-brand-accent font-display">
            ${estimate.price.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Due now: ${(estimate.price / 2).toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Estimated Delivery</p>
          <p className="font-semibold text-white">{estimate.delivery}</p>
          <p className="text-xs text-gray-500 mt-1">After scan completed</p>
        </div>
      </div>
    </div>
  );
};
