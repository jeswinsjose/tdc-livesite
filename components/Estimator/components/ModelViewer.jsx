import React from "react";

export const ModelViewer = ({
  title = "BIMIT Model",
  subtitle = "RVT Format",
}) => {
  return (
    <div className="bg-white p-2 rounded-lg border border-gray-200 h-full flex flex-col">
      {/* Placeholder for a 3D model viewer library like Three.js or Sketchfab */}
      <div className="flex-grow bg-gray-50 rounded-md flex items-center justify-center overflow-hidden">
        <img 
          src="/img/3d-animation.gif" 
          alt="3D BIM Model Animation" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
