import React from 'react';

const LOGOS = [
  { name: 'Faro', url: '/logos/Faro_logo.svg' },
  { name: 'Leica Geosystems', url: '/logos/Leica_Geosystems_logo.svg' },
  { name: 'Navvis', url: '/logos/Navvis_logo.svg' },
  { name: 'Procore', url: '/logos/Procore_logo.svg' },
  // Duplicate for length
  { name: 'Faro', url: '/logos/Faro_logo.svg' },
  { name: 'Leica Geosystems', url: '/logos/Leica_Geosystems_logo.svg' },
  { name: 'Navvis', url: '/logos/Navvis_logo.svg' },
  { name: 'Procore', url: '/logos/Procore_logo.svg' },
];

const ClientLogos: React.FC = () => {
  return (
    <div className="py-16 bg-brand-dark border-y border-white/5 relative overflow-hidden">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logo-scroll {
          display: flex;
          width: max-content;
          animation: scroll 40s linear infinite;
        }
        .logo-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="container mx-auto px-6 mb-10 text-center">
        <p className="text-sm font-mono text-brand-accent uppercase tracking-[0.2em]">Trusted Technology Partners</p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        {/* Gradient Masks - Enhanced Fading */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-dark via-brand-dark/80 to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Track */}
        <div className="logo-scroll">
          {/* First Set */}
          <div className="flex items-center gap-20 mx-10">
            {LOGOS.map((logo, i) => (
              <div key={i} className="w-48 h-20 flex items-center justify-center opacity-40 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0 group/logo">
                <img 
                  src={logo.url} 
                  alt={logo.name} 
                  className="max-w-full max-h-full object-contain brightness-0 invert group-hover:brightness-0 group-hover:invert"
                />
              </div>
            ))}
          </div>

          {/* Duplicate Set for Loop */}
          <div className="flex items-center gap-20 mx-10">
            {LOGOS.map((logo, i) => (
              <div key={`dup-${i}`} className="w-48 h-20 flex items-center justify-center opacity-40 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0 group/logo">
                <img 
                  src={logo.url} 
                  alt={logo.name} 
                  className="max-w-full max-h-full object-contain brightness-0 invert group-hover:brightness-0 group-hover:invert"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;
