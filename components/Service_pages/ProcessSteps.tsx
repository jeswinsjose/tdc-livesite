import React from 'react';
import { ScanLine, MousePointerClick, CheckSquare, FileOutput } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    id: "01",
    title: "Ingest",
    subtitle: "Point Cloud Processing",
    icon: <ScanLine size={24} />,
    desc: "We align, clean, and register your raw scan data to create a unified reality capture base."
  },
  {
    id: "02",
    title: "Model",
    subtitle: "Revit / Fabrication CADmep",
    icon: <MousePointerClick size={24} />,
    desc: "Our teams convert point clouds into intelligent geometries at your specified LOD."
  },
  {
    id: "03",
    title: "Coordinate",
    subtitle: "Navisworks Clash Detection",
    icon: <CheckSquare size={24} />,
    desc: "We run interference checks against other trades to ensure zero field clashes."
  },
  {
    id: "04",
    title: "Deliver",
    subtitle: "Spool Sheets & Native Files",
    icon: <FileOutput size={24} />,
    desc: "You receive clean native files, PDFs, and shop drawings ready for fabrication."
  }
];

export const ProcessSteps: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900" id="process">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-2">Our Process</h2>
          <div className="w-20 h-1 bg-blue-500"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-6 border border-slate-800 bg-slate-950 hover:border-blue-500/50 transition-colors group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-black text-slate-700 font-sans group-hover:text-blue-900 transition-colors select-none">
                {step.id}
              </div>
              
              <div className="mb-6 text-blue-400 p-3 bg-blue-900/10 w-fit rounded-lg border border-blue-500/20">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
              <p className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-4">{step.subtitle}</p>
              
              <p className="text-slate-400 text-sm leading-relaxed border-t border-slate-900 pt-4">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};