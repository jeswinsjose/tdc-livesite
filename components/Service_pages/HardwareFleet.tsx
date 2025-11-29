import React from 'react';
import { motion } from 'framer-motion';
import { Scan, BoxSelect, Map } from 'lucide-react';

const equipment = [
  {
    id: 1,
    make: "Leica",
    model: "P-Series ScanStation",
    description: "Survey-grade structural integrity and exterior skins.",
    icon: <Scan size={32} />,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2940&auto=format&fit=crop",
    specs: ["1mm Accuracy @ 50m", "HDR Imaging", "Long Range"]
  },
  {
    id: 2,
    make: "Faro",
    model: "Focus Premium",
    description: "High-density MEP documentation and mechanical rooms.",
    icon: <BoxSelect size={32} />,
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2940&auto=format&fit=crop",
    specs: ["Full Color Colorization", "Compact Design", "On-site Registration"]
  },
  {
    id: 3,
    make: "NavVis",
    model: "VLX Wearable",
    description: "Rapid mobile mapping for large-scale assets and logistics.",
    icon: <Map size={32} />,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2940&auto=format&fit=crop",
    specs: ["10x Faster Speed", "SLAM Technology", "Walk-through Capable"]
  }
];

export const HardwareFleet: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">The Right Tool for the Tolerance.</h2>
          <p className="text-slate-400 text-lg">We deploy a hybrid fleet to balance speed, coverage, and precision. We don't just use one hammer for every nail.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {equipment.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -10 }}
              className="group relative h-[500px] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="mb-4 text-cyan-400 bg-slate-900/50 w-fit p-3 rounded-xl backdrop-blur-sm border border-slate-700 group-hover:border-cyan-400/50 transition-colors">
                  {item.icon}
                </div>
                
                <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-1">{item.make}</h3>
                <h4 className="text-2xl font-bold text-white mb-3">{item.model}</h4>
                <p className="text-slate-300 mb-6 border-l-2 border-slate-700 pl-4 group-hover:border-cyan-400 transition-colors">
                  {item.description}
                </p>

                {/* Specs */}
                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {item.specs.map((spec, i) => (
                    <span key={i} className="px-2 py-1 text-[10px] uppercase font-bold bg-white/10 rounded text-white backdrop-blur-md">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};