import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const COUNTRY_CODES = [
  { code: 'US', dial_code: '+1', name: 'United States' },
  { code: 'CA', dial_code: '+1', name: 'Canada' },
  { code: 'GB', dial_code: '+44', name: 'United Kingdom' },
  { code: 'AU', dial_code: '+61', name: 'Australia' },
  { code: 'DE', dial_code: '+49', name: 'Germany' },
  { code: 'FR', dial_code: '+33', name: 'France' },
  { code: 'IN', dial_code: '+91', name: 'India' },
  { code: 'CN', dial_code: '+86', name: 'China' },
  { code: 'JP', dial_code: '+81', name: 'Japan' },
  { code: 'AE', dial_code: '+971', name: 'UAE' },
  { code: 'SA', dial_code: '+966', name: 'Saudi Arabia' },
  { code: 'BR', dial_code: '+55', name: 'Brazil' },
  { code: 'MX', dial_code: '+52', name: 'Mexico' },
  { code: 'IT', dial_code: '+39', name: 'Italy' },
  { code: 'ES', dial_code: '+34', name: 'Spain' },
  { code: 'RU', dial_code: '+7', name: 'Russia' },
  { code: 'ZA', dial_code: '+27', name: 'South Africa' },
  { code: 'KR', dial_code: '+82', name: 'South Korea' },
  { code: 'SG', dial_code: '+65', name: 'Singapore' },
  { code: 'NZ', dial_code: '+64', name: 'New Zealand' },
];

interface PhoneInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ label, value, onChange, placeholder = "Phone number", className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
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

  const formatPhoneNumber = (input: string, countryCode: string) => {
    // Strip all non-numeric characters
    const numbers = input.replace(/\D/g, '');
    
    // Formatting for US/Canada (+1)
    if (countryCode === '+1') {
      if (numbers.length === 0) return '';
      if (numbers.length <= 3) return `(${numbers}`;
      if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    }

    // Generic formatting for other countries (groups of 4 for readability, or just raw)
    // For now, let's just return the numbers with simple spacing if needed, 
    // but usually raw or simple spacing is safer if we don't have specific rules.
    // Let's just allow raw input for others to avoid blocking valid formats.
    return input; 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value, selectedCountry.dial_code);
    // Limit length for US/Canada to standard 10 digits formatted
    if (selectedCountry.dial_code === '+1' && formatted.length > 14) return;
    
    onChange(formatted);
  };

  const handleCountrySelect = (country: typeof COUNTRY_CODES[0]) => {
    setSelectedCountry(country);
    setIsOpen(false);
    // Clear value when switching countries to avoid format confusion? 
    // Or try to reformat? For now, let's keep it simple.
    onChange(''); 
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-xs font-mono uppercase text-gray-500 tracking-wider">{label}</label>
      <div className="relative flex" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-black/50 border border-white/10 border-r-0 rounded-l px-3 py-3 text-white hover:bg-white/5 transition-colors min-w-[100px]"
        >
          <img 
            src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w80/${selectedCountry.code.toLowerCase()}.png 2x`}
            width="24"
            height="16"
            alt={selectedCountry.name}
            className="rounded-sm object-cover"
          />
          <span className="text-gray-400 text-sm">{selectedCountry.dial_code}</span>
          <ChevronDown size={14} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-72 max-h-60 overflow-y-auto bg-zinc-900 border border-white/10 rounded-lg shadow-xl z-50 custom-scrollbar">
            {COUNTRY_CODES.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleCountrySelect(country)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png 2x`}
                    width="24"
                    height="16"
                    alt={country.name}
                    className="rounded-sm object-cover"
                  />
                  <span className="text-white font-medium">{country.name}</span>
                </div>
                <span className="text-brand-accent text-sm">{country.dial_code}</span>
              </button>
            ))}
          </div>
        )}

        <input
          type="tel"
          className="w-full bg-black/50 border border-white/10 rounded-r px-4 py-3 text-white focus:border-brand-accent focus:outline-none transition-colors"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
