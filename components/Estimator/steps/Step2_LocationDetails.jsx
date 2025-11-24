import React, { useContext, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { EstimateContext } from "../context/EstimateContext";

export const Step2_LocationDetails = ({ onNext }) => {
  const { formData, updateFormData } = useContext(EstimateContext);

  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const address = place.formatted_address;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      updateFormData({ address: address, mapLocation: { lat, lng } });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-white font-display">
        Where is this project located?
      </h2>
      <p className="mt-1 text-gray-400">Let's get your project onboarded.</p>
      <div className="mt-6">
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Start typing your address..."
            className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-brand-accent focus:outline-none transition-colors"
            autoComplete="off" // This is the new attribute that fixes the issue
          />
        </Autocomplete>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Select an address from the dropdown and click confirm to proceed.
      </p>
      <button
        onClick={onNext}
        disabled={!formData.address}
        className="mt-8 w-full bg-brand-accent text-black font-bold py-3 px-4 rounded-lg hover:bg-white transition-colors disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
      >
        Confirm Address
      </button>
    </div>
  );
};
