import React from 'react';
import { Button } from './ui/Button';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 pt-24 pb-12 border-t border-slate-900" id="contact">
      {/* CTA Section */}
      <div className="container mx-auto px-6 mb-20">
        <div className="bg-gradient-to-br from-blue-900/20 to-slate-900 p-12 text-center border border-blue-500/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Build It Twice. Build It Right.</h2>
          <p className="text-blue-200/80 mb-10 max-w-xl mx-auto text-lg">
            First in the model. Then in the field. Zero errors.
          </p>
          <div className="flex justify-center">
            <Button variant="primary" className="text-lg px-12 py-5 shadow-xl shadow-blue-900/20" icon={<ArrowUpRight />}>
                Start Your Project
            </Button>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="container mx-auto px-6 border-t border-slate-900 pt-12 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm font-mono">
        <p>&copy; 2024 The Drafting Company. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};