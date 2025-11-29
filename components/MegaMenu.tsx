import React from 'react';
import { Box, Layers, Cpu, FileDigit, ChevronRight } from 'lucide-react';

export interface ServiceItem {
  label: string;
  href: string;
}

export interface ServiceCategory {
  title: string;
  icon: React.ReactNode;
  items: ServiceItem[];
}

export const categories: ServiceCategory[] = [
  {
    title: 'Reality Capture & Scanning',
    icon: <Layers className="w-5 h-5 text-brand-accent" />,
    items: [
      { label: 'Laser Scanning Services', href: '/services/laser-scanning' },
      { label: 'Scan-to-BIM', href: '/services/scan-to-bim' },
      { label: 'Scan-to-CAD', href: '#' },
      { label: 'Scan-to-3D Mesh', href: '#' },
    ]
  },
  {
    title: 'BIM & Coordination',
    icon: <Box className="w-5 h-5 text-brand-accent" />,
    items: [
      { label: 'Revit BIM Modeling', href: '#' },
      { label: 'MEP Coordination', href: '#' },
      { label: 'Revit As-Builts', href: '#' },
      { label: 'BIM Content Creation', href: '#' },
      { label: 'Foodservice BIM', href: '#' },
    ]
  },
  {
    title: 'Manufacturing & Product Design',
    icon: <Cpu className="w-5 h-5 text-brand-accent" />,
    items: [
      { label: '3D Solid Modeling & Design', href: '#' },
      { label: 'SolidWorks Modeling', href: '#' },
      { label: 'Inventor Modeling', href: '#' },
      { label: 'CATIA Modeling', href: '#' },
      { label: 'CREO Modeling', href: '#' },
      { label: '3D Printing & Prototyping', href: '#' },
    ]
  },
  {
    title: 'CAD Drafting & Digitization',
    icon: <FileDigit className="w-5 h-5 text-brand-accent" />,
    items: [
      { label: '2D CAD Drafting & Detailing', href: '#' },
      { label: 'Paper & PDF to CAD Conversion', href: '#' },
      { label: 'CAD Remastering', href: '#' },
      { label: 'Foodservice CAD', href: '#' },
    ]
  }
];

interface MegaMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onMouseEnter, onMouseLeave }) => {
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
                      <span>{item.label}</span>
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
                Comprehensive AEC & Manufacturing Solutions
            </p>
            <a href="/services" className="text-xs font-bold text-brand-accent hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
                View All Services
                <ChevronRight className="w-3 h-3" />
            </a>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
