import React from 'react';
import { ArrowRight, Scan, BrainCircuit } from 'lucide-react';

const FeatureSections: React.FC = () => {
  return (
    <div className="bg-brand-dark overflow-hidden">
      {/* Section 1: 3D Capture */}
      <section className="py-24 border-b border-white/5 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Image Side */}
            <div className="flex-1 w-full relative group">
              <div className="absolute -inset-4 bg-brand-accent/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50 aspect-square md:aspect-[4/3]">
                <img 
                  src="/images/lidar_scanner_dark.png" 
                  alt="Professional 3D Lidar Scanner" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
                
                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg flex items-center gap-3">
                  <Scan className="text-brand-accent animate-pulse" size={20} />
                  <span className="text-xs font-mono text-white uppercase tracking-widest">Active Scan Mode</span>
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="flex-1">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                It all starts with <br/>
                <span className="text-brand-accent">precision capture.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                With a variety of professional-grade lidar cameras and capture options, we make it easy to create digital twins of your properties. Ranging from rapid mobile mapping to our millimeter-accurate terrestrial laser scanners, we offer a full suite of capture options to meet your project's specific LOD requirements.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors rounded-sm flex items-center gap-2 group">
                  Explore Scanners
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors rounded-sm">
                  View Specs
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: AI Insights */}
      <section className="py-24 relative">
        {/* Background Glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-brand-accent/5 blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
            {/* Text Side */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-brand-accent font-mono text-sm tracking-widest mb-6">
                <BrainCircuit size={16} />
                <span>INTELLIGENT ANALYSIS</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Unlock valuable insights with <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-purple-500">TDC Intelligence.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Our digital twins go beyond 3D virtual tours by transforming your properties into valuable data. With features like automated defect detection, precise floor flatness analysis, and comprehensive BIM integration, our advanced AI engine provides instant access to powerful insights that revolutionize how you manage your assets.
              </p>
              
              <button className="px-8 py-4 bg-brand-accent text-black font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-sm flex items-center gap-2 group">
                Learn About AI
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Image Side */}
            <div className="flex-1 w-full relative group">
              <div className="absolute -inset-4 bg-purple-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50 aspect-square md:aspect-[4/3]">
                <img 
                  src="/images/digital_twin_hologram.png" 
                  alt="Digital Twin AI Analysis" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
                
                {/* Floating UI Elements */}
                <div className="absolute top-8 right-8 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-mono text-gray-400 uppercase">Analysis Complete</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 w-24 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-brand-accent"></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-gray-500">
                      <span>Accuracy</span>
                      <span className="text-white">99.8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureSections;
