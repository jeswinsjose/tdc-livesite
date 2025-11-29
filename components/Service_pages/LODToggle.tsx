import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Cuboid } from 'lucide-react';

export const LODToggle: React.FC = () => {
  const [lod, setLod] = useState<'200' | '400'>('400');

  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why Level of Detail Matters.</h2>
          
          {/* Custom Toggle Switch */}
          <div className="bg-slate-900 p-1 rounded-full border border-slate-800 flex relative">
            <motion.div 
              className="absolute top-1 bottom-1 bg-blue-600 rounded-full z-0"
              initial={false}
              animate={{ 
                left: lod === '200' ? '4px' : '50%', 
                width: 'calc(50% - 4px)',
                x: lod === '400' ? '0%' : '0%'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            
            <button 
              onClick={() => setLod('200')}
              className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-colors ${lod === '200' ? 'text-white' : 'text-slate-400'}`}
            >
              LOD 200
            </button>
            <button 
              onClick={() => setLod('400')}
              className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-colors ${lod === '400' ? 'text-white' : 'text-slate-400'}`}
            >
              LOD 400
            </button>
          </div>
        </div>

        {/* Content Display */}
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Visual Side */}
            <div className="h-[400px] md:h-auto bg-slate-950 relative overflow-hidden flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                
                <AnimatePresence mode='wait'>
                    <motion.div 
                        key={lod}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        {lod === '200' ? (
                             // LOD 200 Abstract Representation (Simple Box)
                             <div className="w-48 h-48 border-4 border-slate-600 bg-slate-800/50 flex items-center justify-center">
                                 <Cuboid size={64} className="text-slate-600" />
                             </div>
                        ) : (
                             // LOD 400 Abstract Representation (Detailed Structure)
                             <div className="relative w-64 h-64">
                                <div className="absolute inset-0 border-2 border-blue-400 bg-blue-900/10"></div>
                                <div className="absolute top-0 left-0 w-full h-full grid grid-cols-2 grid-rows-2">
                                    <div className="border border-blue-500/30 flex items-center justify-center text-[10px] text-blue-400 font-mono">FLANGE-01</div>
                                    <div className="border border-blue-500/30 flex items-center justify-center text-[10px] text-blue-400 font-mono">VALVE-A</div>
                                    <div className="border border-blue-500/30 flex items-center justify-center text-[10px] text-blue-400 font-mono">PIPE-04</div>
                                    <div className="border border-blue-500/30 flex items-center justify-center text-[10px] text-blue-400 font-mono">SUPT-02</div>
                                </div>
                                {/* Dimensions Lines */}
                                <div className="absolute -left-4 top-0 bottom-0 w-px bg-slate-600"></div>
                                <div className="absolute -left-8 top-1/2 -rotate-90 text-[10px] text-slate-500">2400mm</div>
                             </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Info Side */}
            <div className="p-12 flex flex-col justify-center">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={lod}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                    <div className="mb-6 inline-block">
                        {lod === '200' ? (
                            <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border border-slate-700">Concept Design</span>
                        ) : (
                            <span className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border border-blue-500/30">Fabrication Ready</span>
                        )}
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-4 text-white">
                        {lod === '200' ? "Good for permits, useless for builders." : "Hangers, flanges, and tolerances included."}
                    </h3>
                    
                    <p className="text-slate-400 text-lg leading-relaxed">
                        {lod === '200' 
                            ? "LOD 200 represents generic placeholders. It shows approximate size and shape, but lacks the detail required for pre-fabrication or accurate clash detection."
                            : "LOD 400 is ready for the shop floor. We model every nut, bolt, and hanger to exact manufacturer specifications, ensuring what we model fits in the field."
                        }
                    </p>

                    <div className="mt-8 border-t border-slate-800 pt-6">
                        <ul className="space-y-3">
                            {lod === '200' ? (
                                <>
                                    <li className="text-slate-500 flex items-center gap-2">Generic Geometries</li>
                                    <li className="text-slate-500 flex items-center gap-2">Approximate Quantities</li>
                                </>
                            ) : (
                                <>
                                    <li className="text-blue-200 flex items-center gap-2"><Layers size={16} className="text-blue-400"/> Spool Sheets Included</li>
                                    <li className="text-blue-200 flex items-center gap-2"><Layers size={16} className="text-blue-400"/> Manufacturer Specific Parts</li>
                                </>
                            )}
                        </ul>
                    </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};