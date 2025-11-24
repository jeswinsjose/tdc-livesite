import React from "react";

export const ScopeButton = ({ label, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-3 border rounded-lg transition-all text-sm font-medium ${
      selected
        ? "bg-brand-accent text-black border-brand-accent shadow-sm"
        : "bg-black/40 hover:bg-white/5 border-white/10 text-white"
    }`}
  >
    {label}
  </button>
);
