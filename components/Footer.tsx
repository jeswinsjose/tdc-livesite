import React from 'react';
import { Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-32">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-6">
              <Layers className="w-6 h-6 text-brand-accent" />
              <span className="font-display font-bold text-xl text-white">TDC</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              The Drafting Company Inc.<br/>
              Setting the standard for digital construction documentation since 1980.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-20 text-sm w-full lg:w-auto">
            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#" className="hover:text-brand-accent transition-colors">BIM Modeling</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Laser Scanning</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">CAD Drafting</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">3D Printing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#" className="hover:text-brand-accent transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Portfolio</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); setTimeout(() => document.getElementById('map')?.scrollIntoView(), 100); }} className="hover:text-brand-accent transition-colors">Locations</a></li>
                <li><a href="#contact" className="hover:text-brand-accent transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Social</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#" className="hover:text-brand-accent transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>&copy; 2025 The Drafting Company Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
