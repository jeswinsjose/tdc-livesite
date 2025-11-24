

import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { City } from '../types';

const CITIES: City[] = [
  { id: 'atl', name: 'Atlanta', x: 76, y: 68 },
  { id: 'bos', name: 'Boston', x: 90, y: 28 },
  { id: 'chi', name: 'Chicago', x: 70, y: 38 },
  { id: 'dal', name: 'Dallas', x: 54, y: 70 },
  { id: 'den', name: 'Denver', x: 38, y: 50 },
  { id: 'far', name: 'Fargo', x: 55, y: 22 },
  { id: 'hon', name: 'Honolulu', x: 18, y: 95 },
  { id: 'hou', name: 'Houston', x: 56, y: 78 },
  { id: 'jc', name: 'Jersey City', x: 88, y: 34 },
  { id: 'lv', name: 'Las Vegas', x: 24, y: 54 },
  { id: 'la', name: 'Los Angeles', x: 18, y: 60 },
  { id: 'mia', name: 'Miami', x: 84, y: 88 },
  { id: 'mil', name: 'Milwaukee', x: 70, y: 35 },
  { id: 'min', name: 'Minneapolis', x: 62, y: 28 },
  { id: 'nash', name: 'Nashville', x: 72, y: 58 },
  { id: 'ny', name: 'New York', x: 88, y: 32 },
  { id: 'oma', name: 'Omaha', x: 56, y: 40 },
  { id: 'orl', name: 'Orlando', x: 82, y: 80 },
  { id: 'phi', name: 'Philadelphia', x: 87, y: 35 },
  { id: 'phx', name: 'Phoenix', x: 28, y: 64 },
  { id: 'sd', name: 'San Diego', x: 20, y: 64 },
  { id: 'sf', name: 'San Francisco', x: 14, y: 50 },
  { id: 'sea', name: 'Seattle', x: 16, y: 20 },
  { id: 'stl', name: 'St. Louis', x: 66, y: 52 },
  { id: 'tb', name: 'Tampa Bay', x: 80, y: 82 },
  { id: 'dc', name: 'Washington DC', x: 86, y: 40 },
];

interface MapSectionProps {
  onLocationSelect?: (city: string) => void;
}

const MapSection: React.FC<MapSectionProps> = ({ onLocationSelect }) => {
  const [activeCity, setActiveCity] = useState<City | null>(null);

  const handleCityClick = (cityName: string) => {
    if (onLocationSelect) {
        onLocationSelect(cityName);
    }
  };

  return (
    <section id="map" className="relative py-24 md:py-32 bg-brand-dark overflow-hidden min-h-[100vh] flex flex-col justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-brand-dark to-brand-dark opacity-80" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Map Side */}
          <div className="order-2 lg:order-1 sticky top-32">
            <div className="relative aspect-[1.6] w-full bg-gray-900/40 rounded-2xl border border-gray-800/50 backdrop-blur-sm p-4 md:p-8 overflow-hidden group shadow-2xl">
              
              {/* System Live Badge */}
              <div className="absolute top-6 left-6 z-20 flex gap-2 items-center bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                   <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                   <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">System Live</span>
              </div>

              
              {/* US Map Background */}
              <img 
                src="/img/usa.svg"
                alt="US Map"
                className="absolute inset-0 w-full h-full object-contain opacity-20 pointer-events-none"
                style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(160deg) brightness(0.6)' }}
              />

              {/* Render Cities with Pin Icons */}
              {CITIES.map((city) => (
                <div
                  key={city.id}
                  className="absolute transition-all duration-300 cursor-pointer pointer-events-auto z-20"
                  style={{ left: `${city.x}%`, top: `${city.y}%`, transform: 'translate(-50%, -100%)' }}
                  onMouseEnter={() => setActiveCity(city)}
                  onMouseLeave={() => setActiveCity(null)}
                  onClick={() => handleCityClick(city.name)}
                >
                  {/* Pulsing Ring Animation */}
                  <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ${
                    activeCity?.id === city.id 
                      ? 'w-10 h-10 bg-brand-accent/20 animate-ping' 
                      : 'w-0 h-0'
                  }`} />
                  
                  {/* Location Pin Icon */}
                  <MapPin 
                    className={`transition-all duration-300 ${
                      activeCity?.id === city.id 
                        ? 'text-brand-accent scale-125 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]' 
                        : 'text-gray-400 animate-pulse'
                    }`}
                    size={24}
                    fill={activeCity?.id === city.id ? '#00f0ff' : 'none'}
                  />
                  
                  {/* Label */}
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-[10px] uppercase tracking-widest bg-black/80 px-2 py-1 rounded backdrop-blur-md border border-gray-800 transition-all duration-300 ${
                     activeCity?.id === city.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                  }`}>
                    {city.name}
                  </div>
                </div>
              ))}
              
               {/* Overlay Stats */}
                <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur border border-white/10 p-4 rounded-lg pointer-events-none">
                    <div className="text-brand-accent font-mono text-2xl font-bold">26</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Service Locations</div>
                </div>
            </div>
          </div>

          {/* List View */}
          <div className="order-1 lg:order-2">
             <div className="inline-flex items-center gap-2 text-brand-accent font-mono text-sm tracking-widest mb-6">
                <span className="w-2 h-2 bg-brand-accent rounded-full"></span>
                NATIONWIDE NETWORK
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-white">
              Local Presence.<br />
              <span className="text-gray-500">National Scale.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
               We aren't just a remote team. We have boots on the ground in every major US market. Select a location to view local team details.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {CITIES.map((city) => (
                <div 
                  key={city.id}
                  onMouseEnter={() => setActiveCity(city)}
                  onMouseLeave={() => setActiveCity(null)}
                  onClick={() => handleCityClick(city.name)}
                  className={`p-4 border-l-2 transition-all duration-300 cursor-pointer ${
                    activeCity?.id === city.id 
                      ? 'border-brand-accent bg-white/5 pl-6' 
                      : 'border-white/10 hover:border-white/30 pl-4'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className={`font-bold text-white mb-1`}>
                      {city.name}
                    </span>
                    <span className="text-xs text-gray-500 font-mono uppercase">Online • Ready</span>
                  </div>
                </div>
              ))}
            </div>
             <button className="mt-8 border border-white/30 px-8 py-3 hover:bg-white hover:text-black transition-all rounded-sm font-mono text-sm w-full md:w-auto uppercase tracking-widest text-white">
                Download Full Coverage Map
            </button>
          </div>
        </div>
      </div>
      

    </section>
  );
};

export default MapSection;
