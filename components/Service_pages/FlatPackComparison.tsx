import React from 'react';
import { motion } from 'framer-motion';
import { Package, HelpCircle, XCircle, CheckCircle } from 'lucide-react';

export const FlatPackComparison: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">The Flat-Pack Promise.</h2>
          <p className="text-xl text-blue-400 font-medium">"We don't just model shapes. We model components that fit."</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Generic BIM Card */}
          <motion.div 
            whileHover={{ scale: 0.99 }}
            className="bg-slate-950 p-8 rounded-xl border border-red-900/30 relative overflow-hidden group"
          >
            <div className="absolute top-4 right-4 text-red-900 opacity-20">
              <HelpCircle size={100} />
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-900/20 rounded-lg text-red-500">
                <XCircle size={24} />
              </div>
              <h3 className="text-xl font-bold text-red-200">Generic BIM</h3>
            </div>

            <div className="h-48 bg-slate-900 rounded-lg mb-6 border border-slate-800 p-4 flex items-center justify-center opacity-50 relative">
               {/* Visual Chaos Representation */}
               <div className="absolute w-20 h-2 bg-slate-700 rotate-12 top-10 left-10"></div>
               <div className="absolute w-16 h-2 bg-slate-700 -rotate-45 top-20 right-10"></div>
               <div className="absolute w-24 h-2 bg-slate-700 rotate-6 bottom-10 left-20"></div>
               <div className="absolute w-10 h-10 border-2 border-slate-700 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
               <p className="text-sm font-mono text-slate-500 z-10 bg-slate-900 px-2">UNSORTED DATA</p>
            </div>

            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center gap-2"><span className="text-red-500 text-lg">×</span> No component labels</li>
              <li className="flex items-center gap-2"><span className="text-red-500 text-lg">×</span> Unverified dimensions</li>
              <li className="flex items-center gap-2"><span className="text-red-500 text-lg">×</span> "Looks good in 3D" only</li>
            </ul>
          </motion.div>

          {/* TDC Flat-Pack Card */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-slate-950 p-8 rounded-xl border border-blue-500/30 relative overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.1)]"
          >
            <div className="absolute top-4 right-4 text-blue-900 opacity-20">
              <Package size={100} />
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-900/20 rounded-lg text-blue-400">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold text-blue-100">TDC Flat-Pack BIM</h3>
            </div>

            <div className="h-48 bg-slate-900 rounded-lg mb-6 border border-blue-900/30 p-4 grid grid-cols-4 gap-2 relative overflow-hidden">
               {/* Visual Order Representation */}
               {[...Array(8)].map((_, i) => (
                 <div key={i} className="bg-blue-900/20 border border-blue-500/20 rounded h-full flex items-center justify-center">
                    <span className="text-[8px] font-mono text-blue-400">PART-{i+1}</span>
                 </div>
               ))}
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-50"></div>
            </div>

            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center gap-2"><span className="text-blue-400 text-lg">✓</span> Precision IKEA-style kits</li>
              <li className="flex items-center gap-2"><span className="text-blue-400 text-lg">✓</span> Pre-cut & labeled spools</li>
              <li className="flex items-center gap-2"><span className="text-blue-400 text-lg">✓</span> Verified fit tolerances</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};