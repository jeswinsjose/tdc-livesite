
import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Services', img: 'https://picsum.photos/1920/1080?grayscale&blur=2' },
    { label: 'Projects', img: 'https://picsum.photos/1920/1080?grayscale&blur=3' },
    { label: 'Technology', img: 'https://picsum.photos/1920/1080?grayscale&blur=4' },
    { label: 'About', img: 'https://picsum.photos/1920/1080?grayscale&blur=5' },
    { label: 'Careers', img: 'https://picsum.photos/1920/1080?grayscale&blur=6' },
  ];

  return (
    <>
      {/* Floating Dock */}
      <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none transform-gpu translate-z-0">
        <div className="pointer-events-auto glass-panel rounded-full px-5 py-3 flex items-center gap-4 md:gap-6 shadow-2xl backdrop-blur-xl bg-black/40 border border-white/10">
          <button 
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 text-xs md:text-sm font-medium hover:text-brand-accent transition-colors"
          >
            <Menu size={18} />
            <span className="uppercase tracking-widest">Menu</span>
          </button>
          
          <div className="w-[1px] h-4 bg-white/20" />

          <button 
            onClick={() => navigate('/estimator')}
            className="flex items-center gap-2 text-xs md:text-sm font-medium text-brand-accent hover:text-white transition-colors"
          >
            <span className="uppercase tracking-widest whitespace-nowrap">Get Quote</span>
            <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse shadow-[0_0_10px_#00f0ff]" />
          </button>
        </div>
      </div>

      {/* Fullscreen Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-brand-dark flex flex-col">
          {/* Background Image Changer */}
          <div className="absolute inset-0 z-0 opacity-20 transition-opacity duration-700 ease-in-out">
            {activeImage && <img src={activeImage} alt="" className="w-full h-full object-cover" />}
            <div className="absolute inset-0 bg-brand-dark/50" />
          </div>

          <div className="relative z-10 p-8 flex justify-between items-center">
            <span className="font-display font-bold text-2xl">THE DRAFTING COMPANY</span>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={32} />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center relative z-10">
            <nav className="flex flex-col gap-4 text-center">
              {menuItems.map((item, idx) => (
                <a 
                  key={idx}
                  href="#"
                  onMouseEnter={() => setActiveImage(item.img)}
                  onMouseLeave={() => setActiveImage(null)}
                  className="font-display text-5xl md:text-8xl font-bold text-transparent text-outline hover:text-white transition-colors duration-300 uppercase tracking-tighter peer"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          
          <div className="relative z-10 p-8 flex justify-between text-xs text-gray-500 uppercase tracking-widest">
            <span>Est. 2024</span>
            <span>Nationwide</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
