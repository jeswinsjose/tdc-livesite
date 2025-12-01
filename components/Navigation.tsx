
import React, { useState } from 'react';
import { Menu, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { categories } from './MegaMenu';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<'main' | 'services'>('main');
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Services', img: 'https://picsum.photos/1920/1080?grayscale&blur=2', hasSubmenu: true },
    { label: 'Blog', img: 'https://picsum.photos/1920/1080?grayscale&blur=4' },
    { label: 'Projects', img: 'https://picsum.photos/1920/1080?grayscale&blur=3' },
    { label: 'Technology', img: 'https://picsum.photos/1920/1080?grayscale&blur=4' },
    { label: 'About', img: 'https://picsum.photos/1920/1080?grayscale&blur=5' },
    { label: 'Careers', img: 'https://picsum.photos/1920/1080?grayscale&blur=6' },
  ];

  const handleMenuClick = (item: any) => {
    if (item.label === 'Services') {
      setActiveSubmenu('services');
    } else if (item.label === 'Blog') {
      navigate('/blog');
      setIsOpen(false);
    } else {
      // Handle other links
      setIsOpen(false);
    }
  };

  const handleBack = () => {
    setActiveSubmenu('main');
  };

  return (
    <>
      {/* Floating Dock */}
      <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none transform-gpu translate-z-0">
        <div className="pointer-events-auto glass-panel rounded-full px-5 py-3 flex items-center gap-4 md:gap-6 shadow-2xl backdrop-blur-xl bg-black/40 border border-white/10">
          <button 
            onClick={() => {
              setIsOpen(true);
              setActiveSubmenu('main');
            }}
            className="flex items-center gap-2 text-xs md:text-sm font-medium hover:text-brand-accent transition-colors lg:hidden"
          >
            <Menu size={18} />
            <span className="uppercase tracking-widest">Menu</span>
          </button>
          
          <div className="w-[1px] h-4 bg-white/20 lg:hidden" />

          <button 
            onClick={() => navigate('/estimator')}
            className="flex items-center gap-2 text-xs md:text-sm font-medium text-brand-accent hover:text-white transition-colors cursor-pointer"
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

          <div className="flex-1 flex items-center justify-center relative z-10 w-full max-w-7xl mx-auto px-6">
            {activeSubmenu === 'main' ? (
              <nav className="flex flex-col gap-4 text-left w-full max-w-4xl">
                {menuItems.map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleMenuClick(item)}
                    onMouseEnter={() => setActiveImage(item.img)}
                    onMouseLeave={() => setActiveImage(null)}
                    className="font-display text-5xl md:text-8xl font-bold text-transparent text-outline hover:text-white transition-colors duration-300 uppercase tracking-tighter peer flex items-center justify-start gap-2 group"
                  >
                    {item.label}
                    {item.hasSubmenu && (
                      <ChevronRight className="w-8 h-8 md:w-16 md:h-16 text-white opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    )}
                  </button>
                ))}
              </nav>
            ) : (
              <div className="w-full max-w-4xl animate-in fade-in slide-in-from-right duration-300">
                <button 
                  onClick={handleBack}
                  className="flex items-center gap-2 text-brand-accent mb-8 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold"
                >
                  <ChevronLeft size={20} />
                  Back to Menu
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar pr-4">
                  {categories.map((category, idx) => (
                    <div key={idx} className="space-y-4">
                      <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                          {category.icon}
                        </div>
                        <h3 className="font-display font-bold text-white text-xl tracking-wide">
                          {category.title}
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {category.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <a
                              href={item.href}
                              className="group flex items-center justify-between py-2 text-lg text-gray-400 hover:text-white transition-colors"
                            >
                              <span>{item.label}</span>
                              <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-accent" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
