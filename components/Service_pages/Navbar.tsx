import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-950/90 backdrop-blur-md py-4 shadow-lg border-b border-blue-900/20' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                TDC
            </div>
            <span className={`font-bold text-xl tracking-tight text-white hidden sm:block`}>
                The Drafting Company
            </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Process', 'LOD Standards', 'Projects', 'Contact'].map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase().replace(' ', '-')}`} 
              className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors uppercase tracking-wide"
            >
              {link}
            </a>
          ))}
          <Button variant="primary" className="py-2 px-4 text-xs">Get a Quote</Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-slate-950 border-b border-slate-800 p-6 flex flex-col gap-4 md:hidden shadow-2xl">
          {['Process', 'LOD Standards', 'Projects', 'Contact'].map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase().replace(' ', '-')}`} 
              className="text-lg font-medium text-slate-300 hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <Button variant="primary" className="w-full">Get a Quote</Button>
        </div>
      )}
    </nav>
  );
};