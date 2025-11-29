import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, Box, PlayCircle } from 'lucide-react';
import { Button } from './ui/Button';

export const LaserScanningHero: React.FC = () => {
  const [viewMode, setViewMode] = useState<'reality' | 'pointcloud'>('pointcloud');

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode='wait'>
          {viewMode === 'reality' ? (
            <motion.div
              key="reality"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop')` }}
            >
               <div className="absolute inset-0 bg-slate-950/60" />
            </motion.div>
          ) : (
            <motion.div
              key="pointcloud"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-cover bg-center filter hue-rotate-15 contrast-125"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop')` }}
            >
               <div className="absolute inset-0 bg-slate-950/80 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_100%)]" />
               {/* Animated grid overlay to simulate scanning */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle Switch */}
      <div className="absolute top-24 md:top-32 right-6 md:right-12 z-20 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">View Mode</span>
        <div className="bg-slate-900/80 backdrop-blur-md p-1 rounded-full border border-slate-700 flex flex-col gap-1">
          <button 
            onClick={() => setViewMode('reality')}
            className={`p-3 rounded-full transition-all ${viewMode === 'reality' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            <Eye size={20} />
          </button>
          <button 
            onClick={() => setViewMode('pointcloud')}
            className={`p-3 rounded-full transition-all ${viewMode === 'pointcloud' ? 'bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'text-slate-400 hover:text-white'}`}
          >
            <Box size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center md:text-left">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
             <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                Laser Scanning Services
             </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              The Foundation <br/>
              <span className="text-white">of Fabrication.</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed"
          >
            Eliminate field clashes, reduce change orders, and verify existing conditions before you mobilize. Nationwide deployment with survey-grade precision.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <Button variant="primary" icon={<ArrowRight size={18} />}>
              Get a Quote
            </Button>
            <Button variant="outline" icon={<PlayCircle size={18} />}>
              View Sample Data
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400/0 via-cyan-400/50 to-cyan-400/0" />
      </motion.div>
    </section>
  );
};
