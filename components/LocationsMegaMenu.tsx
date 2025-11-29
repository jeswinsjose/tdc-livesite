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
      { city: 'Boston', state: 'MA', href: '#' },
      { city: 'Jersey City', state: 'NJ', href: '#' },
      { city: 'New York', state: 'NY', href: '#' },
      { city: 'Philadelphia', state: 'PA', href: '#' },
      { city: 'Washington DC', state: 'DC', href: '#' },
    ]
  },
  {
    title: 'Midwest',
    icon: <Compass className="w-5 h-5 text-brand-accent" />,
    items: [
      { city: 'Chicago', state: 'IL', href: '#' },
      { city: 'Fargo', state: 'ND', href: '#' },
      { city: 'Milwaukee', state: 'WI', href: '#' },
      { city: 'Minneapolis', state: 'MN', href: '#' },
      { city: 'Omaha', state: 'NE', href: '#' },
      { city: 'St. Louis', state: 'MO', href: '#' },
    ]
  },
  {
    title: 'South',
    icon: <Compass className="w-5 h-5 text-brand-accent" />,
    items: [
      { city: 'Atlanta', state: 'GA', href: '#' },
      { city: 'Dallas', state: 'TX', href: '#' },
      { city: 'Houston', state: 'TX', href: '#' },
      { city: 'Miami', state: 'FL', href: '#' },
      { city: 'Nashville', state: 'TN', href: '#' },
      { city: 'Orlando', state: 'FL', href: '#' },
      { city: 'Tampa', state: 'FL', href: '#' },
    ]
  },
  {
    title: 'West',
    icon: <Compass className="w-5 h-5 text-brand-accent" />,
    items: [
      { city: 'Denver', state: 'CO', href: '#' },
      { city: 'Honolulu', state: 'HI', href: '#' },
      { city: 'Las Vegas', state: 'NV', href: '#' },
      { city: 'Los Angeles', state: 'CA', href: '#' },
      { city: 'Phoenix', state: 'AZ', href: '#' },
      { city: 'San Diego', state: 'CA', href: '#' },
      { city: 'San Francisco', state: 'CA', href: '#' },
      { city: 'Seattle', state: 'WA', href: '#' },
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
