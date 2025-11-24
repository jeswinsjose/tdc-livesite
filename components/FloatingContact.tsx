import React, { useState } from 'react';
import { Phone, Mail, X } from 'lucide-react';

const FloatingContact: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Mobile Version - Expandable Sidebar */}
      <div className="lg:hidden fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">
        {/* Expanded Contact Info */}
        <div
          className={`bg-black/90 backdrop-blur-md border border-white/10 rounded-l-lg transition-all duration-300 overflow-hidden ${
            isExpanded ? 'w-64 opacity-100 mr-0' : 'w-0 opacity-0 mr-0'
          }`}
        >
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-display font-bold text-sm">Quick Contact</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            <a
              href="tel:+1234567890"
              className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center group-hover:bg-brand-accent/30 transition-colors">
                <Phone size={16} className="text-brand-accent" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Call Us</div>
                <div className="text-white text-sm font-mono">+1 (234) 567-890</div>
              </div>
            </a>

            <a
              href="mailto:info@tdc.com"
              className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center group-hover:bg-brand-accent/30 transition-colors">
                <Mail size={16} className="text-brand-accent" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Email Us</div>
                <div className="text-white text-sm font-mono">info@tdc.com</div>
              </div>
            </a>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`bg-brand-accent text-black p-3 shadow-lg transition-all duration-300 ${
            isExpanded ? 'rounded-r-lg' : 'rounded-l-lg'
          } hover:bg-white group`}
        >
          <div className="flex flex-col items-center gap-2">
            <Phone size={20} className="animate-pulse" />
            <div className="writing-mode-vertical text-[10px] font-bold uppercase tracking-widest">
              Contact
            </div>
          </div>
        </button>
      </div>

      {/* Desktop Version - Floating Icons */}
      <div className="hidden lg:flex fixed right-6 bottom-6 z-50 flex-col gap-3">
        {/* Phone Icon */}
        <div className="group relative">
          <a
            href="tel:+1234567890"
            className="w-14 h-14 rounded-full bg-brand-accent text-black flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 group"
          >
            <Phone size={24} className="animate-pulse group-hover:animate-none" />
          </a>
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg px-4 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 whitespace-nowrap">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Call Us</div>
            <div className="text-white text-sm font-mono">+1 (234) 567-890</div>
          </div>
        </div>

        {/* Email Icon */}
        <div className="group relative">
          <a
            href="mailto:info@tdc.com"
            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg hover:bg-brand-accent hover:text-black transition-all duration-300 hover:scale-110 group"
          >
            <Mail size={24} />
          </a>
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg px-4 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 whitespace-nowrap">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Email Us</div>
            <div className="text-white text-sm font-mono">info@tdc.com</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingContact;
