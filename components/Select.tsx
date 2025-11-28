import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder = "Select an option", 
  className 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`space-y-2 ${className}`} ref={dropdownRef}>
      <label className="text-xs font-mono uppercase text-gray-500 tracking-wider">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between bg-black/50 border border-white/10 rounded px-4 py-3 text-left transition-colors focus:outline-none focus:border-brand-accent ${
            isOpen ? 'border-brand-accent' : ''
          }`}
        >
          <span className={value ? 'text-white' : 'text-gray-500'}>
            {value || placeholder}
          </span>
          <ChevronDown 
            size={16} 
            className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-full max-h-60 overflow-y-auto bg-zinc-900 border border-white/10 rounded-lg shadow-xl z-50 custom-scrollbar">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors text-left group"
              >
                <span className={`text-sm ${value === option ? 'text-brand-accent font-medium' : 'text-gray-300 group-hover:text-white'}`}>
                  {option}
                </span>
                {value === option && <Check size={14} className="text-brand-accent" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
