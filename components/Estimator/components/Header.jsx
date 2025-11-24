import React from "react";

// A simple SVG logo component
const Logo = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="28" height="28" rx="8" fill="#3B82F6" />
    <path
      d="M9 14H19"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 9V19"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Header = () => {
  return (
    <header className="bg-white p-4 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Logo />
          <span className="text-xl font-bold text-gray-800">IPX</span>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-gray-600 hover:text-blue-600 text-sm font-medium"
          >
            Log in
          </a>
          <a
            href="#"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Sign Up
          </a>
        </div>
      </div>
    </header>
  );
};
