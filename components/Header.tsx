
import React, { useState } from 'react';
import { Layers, Globe, X, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MegaMenu from './MegaMenu';
import LocationsMegaMenu from './LocationsMegaMenu';

interface HeaderProps {
  locations?: { city: string; state: string; type: string }[];
  onLocationSelect?: (loc: { city: string; state: string; type: string }) => void;
}

// Fallback if not provided (though App.tsx now provides it)
const DEFAULT_LOCATIONS = [
  { city: 'Chicago', state: 'IL', type: 'Hub' },
  { city: 'Dallas', state: 'TX', type: 'Hub' },
  { city: 'Houston', state: 'TX', type: 'Hub' },
  { city: 'Los Angeles', state: 'CA', type: 'Hub' },
  { city: 'New York', state: 'NY', type: 'HQ' },
  { city: 'Philadelphia', state: 'PA', type: 'Branch' },
  { city: 'Phoenix', state: 'AZ', type: 'Branch' },
  { city: 'Seattle', state: 'WA', type: 'Tech Hub' },
];

const Header: React.FC<HeaderProps> = ({ locations = DEFAULT_LOCATIONS, onLocationSelect }) => {
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLocationsMenuOpen, setIsLocationsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const servicesTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const locationsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    setIsServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  const handleLocationsMouseEnter = () => {
    if (locationsTimeoutRef.current) {
      clearTimeout(locationsTimeoutRef.current);
    }
    setIsLocationsMenuOpen(true);
  };

  const handleLocationsMouseLeave = () => {
    locationsTimeoutRef.current = setTimeout(() => {
      setIsLocationsMenuOpen(false);
    }, 150);
  };

  const handleSelect = (loc: { city: string; state: string; type: string }) => {
    if (onLocationSelect) {
        onLocationSelect(loc);
        setIsLocationsOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full z-50 px-6 py-6 flex items-center justify-between pointer-events-none transition-all duration-300">
        {/* Logo - Pointer events auto to allow clicking */}
        <div 
            onClick={() => {
              navigate('/');
              window.scrollTo(0,0);
            }}
            className="flex items-center gap-2 group cursor-pointer pointer-events-auto"
        >
          <div className="w-10 h-10 border border-white/20 flex items-center justify-center rounded-sm group-hover:border-brand-accent transition-colors bg-black/50 backdrop-blur-sm">
            <Layers className="w-6 h-6 group-hover:text-brand-accent transition-colors" />
          </div>
          <div className="flex flex-col bg-black/50 backdrop-blur-sm p-1 rounded">
            <span className="font-display font-bold text-lg leading-none tracking-tight text-white">TDC</span>
            <span className="text-[10px] tracking-[0.2em] text-gray-400 group-hover:text-brand-accent transition-colors">EST 1980</span>
          </div>
        </div>

        {/* Center Menu Container - Absolute positioning with flex centering */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="hidden lg:flex items-center gap-1 p-1.5 rounded-full border border-white/10 bg-zinc-900/80 backdrop-blur-md shadow-lg pointer-events-auto relative">
              <div 
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <a 
                  href="#services" 
                  className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${isServicesOpen ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                >
                  Services
                </a>
              </div>
              
              <div 
                onMouseEnter={handleLocationsMouseEnter}
                onMouseLeave={handleLocationsMouseLeave}
              >
                <a 
                  href="#map" 
                  className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${isLocationsMenuOpen ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                >
                  Locations
                </a>
              </div>

              <a 
                href="/#/blog" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/blog');
                }}
                className="px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                Blog
              </a>

              <a href="#portfolio" className="px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider text-gray-400 hover:text-white hover:bg-white/10 transition-all">Portfolio</a>
              <a href="#faq" className="px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider text-gray-400 hover:text-white hover:bg-white/10 transition-all">FAQ</a>
            </div>
        </div>

        {/* Mega Menu - Positioned relative to nav */}
        <MegaMenu 
          isOpen={isServicesOpen} 
          onMouseEnter={handleServicesMouseEnter}
          onMouseLeave={handleServicesMouseLeave}
        />

        <LocationsMegaMenu 
          isOpen={isLocationsMenuOpen} 
          onMouseEnter={handleLocationsMouseEnter}
          onMouseLeave={handleLocationsMouseLeave}
        />

        {/* Location Trigger */}
        <button 
          onClick={() => setIsLocationsOpen(true)}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full hover:border-brand-accent/50 hover:bg-white/5 transition-all group"
        >
          <div className="relative">
             <Globe className="w-4 h-4 text-gray-400 group-hover:text-brand-accent transition-colors" />
             <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-accent rounded-full animate-pulse"></span>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-gray-300 group-hover:text-white hidden sm:inline-block">
             {locations.length > 0 ? locations.length + '+' : '25+'} Hubs
          </span>
        </button>
      </nav>

      {/* Locations Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-500 ${
          isLocationsOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsLocationsOpen(false)}
      />

      {/* Locations Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-brand-charcoal border-l border-white/10 z-[51] shadow-2xl transform transition-transform duration-500 ease-out ${
        isLocationsOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/20">
                <div>
                    <h2 className="font-display text-2xl font-bold text-white mb-1">Active Hubs</h2>
                    <p className="text-xs text-brand-accent font-mono uppercase tracking-widest">Nationwide Network</p>
                </div>
                <button 
                    onClick={() => setIsLocationsOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <div className="grid gap-3">
                    {locations.map((loc, idx) => (
                        <div 
                            key={idx}
                            onClick={() => handleSelect(loc)}
                            className="group flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:border-brand-accent/30 hover:bg-white/10 transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center border border-white/10 group-hover:border-brand-accent/50 transition-colors">
                                    <MapPin className="w-4 h-4 text-gray-500 group-hover:text-brand-accent transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white group-hover:text-brand-accent transition-colors">{loc.city}, {loc.state}</h3>
                                    <span className="text-xs text-gray-500 font-mono uppercase">{loc.type}</span>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Footer */}
             <div className="p-6 border-t border-white/5 bg-black/40">
                <button 
                onClick={() => {
                    setIsLocationsOpen(false);
                    navigate('/estimator');
                }}
                className="w-full py-3 bg-brand-accent text-black font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-sm"
            >
                Get a Quote
            </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default Header;
