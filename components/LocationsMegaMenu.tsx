import React from 'react';
import { MapPin, Building2, Globe2, Laptop, ChevronRight, Compass } from 'lucide-react';

interface LocationItem {
  city: string;
  state: string;
  href: string;
}

interface LocationCategory {
  title: string;
  icon: React.ReactNode;
  items: LocationItem[];
}

const categories: LocationCategory[] = [
  {
    title: 'Northeast',
    icon: <Compass className="w-5 h-5 text-brand-accent" />,
    items: [
      { city: 'Boston', state: 'MA', href: '/locations/boston' },
      { city: 'Jersey City', state: 'NJ', href: '/locations/jersey-city' },
      { city: 'New York', state: 'NY', href: '/locations/new-york' },
      { city: 'Philadelphia', state: 'PA', href: '/locations/philadelphia' },
      { city: 'Washington DC', state: 'DC', href: '/locations/washington' },
    ]
  },
  {
    title: 'Midwest',
    icon: <Compass className="w-5 h-5 text-brand-accent" />,
    items: [
      { city: 'Chicago', state: 'IL', href: '/locations/chicago' },
      { city: 'Fargo', state: 'ND', href: '/locations/fargo' },
      { city: 'Milwaukee', state: 'WI', href: '/locations/milwaukee' },
      { city: 'Minneapolis', state: 'MN', href: '/locations/minneapolis' },
      { city: 'Omaha', state: 'NE', href: '/locations/omaha' },
      { city: 'St. Louis', state: 'MO', href: '/locations/st.-louis' },
    ]
  },
  {
    title: 'South',
    icon: <Compass className="w-5 h-5 text-brand-accent" />,
    items: [
      { city: 'Atlanta', state: 'GA', href: '/locations/atlanta' },
      { city: 'Dallas', state: 'TX', href: '/locations/dallas' },
      { city: 'Houston', state: 'TX', href: '/locations/houston' },
      { city: 'Miami', state: 'FL', href: '/locations/miami' },
      { city: 'Nashville', state: 'TN', href: '/locations/nashville' },
      { city: 'Orlando', state: 'FL', href: '/locations/orlando' },
      { city: 'Tampa', state: 'FL', href: '/locations/tampa-bay' },
    ]
  },
  {
    title: 'West',
    icon: <Compass className="w-5 h-5 text-brand-accent" />,
    items: [
      { city: 'Denver', state: 'CO', href: '/locations/denver' },
      { city: 'Honolulu', state: 'HI', href: '/locations/honolulu' },
      { city: 'Las Vegas', state: 'NV', href: '/locations/las-vegas' },
      { city: 'Los Angeles', state: 'CA', href: '/locations/los-angeles' },
      { city: 'Phoenix', state: 'AZ', href: '/locations/phoenix' },
      { city: 'San Diego', state: 'CA', href: '/locations/san-diego' },
      { city: 'San Francisco', state: 'CA', href: '/locations/san-francisco' },
      { city: 'Seattle', state: 'WA', href: '/locations/seattle' },
    ]
  }
];

interface LocationsMegaMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const LocationsMegaMenu: React.FC<LocationsMegaMenuProps> = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className={`absolute top-full left-0 w-full z-30 pt-4 transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mx-6 bg-brand-charcoal/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-4 gap-8 p-8">
          {categories.map((category, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                  {category.icon}
                </div>
                <h3 className="font-display font-bold text-white text-sm tracking-wide">
                  {category.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {category.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a
                      href={item.href}
                      className="group flex items-center justify-start gap-2 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <span>{item.city}, {item.state}</span>
                      <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-accent" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA Bar */}
        <div className="bg-black/40 p-4 border-t border-white/5 flex justify-between items-center px-8">
            <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                Serving Clients Nationwide
            </p>
            <a href="/locations" className="text-xs font-bold text-brand-accent hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
                View All Locations
                <ChevronRight className="w-3 h-3" />
            </a>
        </div>
      </div>
    </div>
  );
};

export default LocationsMegaMenu;
