import React from 'react';
import { motion } from 'framer-motion';
import { LaserScanningComparisonSlider } from './LaserScanningComparisonSlider';

export const ValueProposition: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 border-b border-slate-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Don't Prefabricate on a <span className="text-cyan-400">Guess.</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-6">
                In modern construction, the cost of a single field clash often exceeds the cost of scanning the entire facility. We replace tape measures and assumptions with LiDAR precision.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                Whether retrofitting a semiconductor plant in Phoenix or renovating a hospital in Atlanta, we capture the "digital truth" of your site with ±0.005″ tolerance.
              </p>
              
              <div className="mt-8 p-6 bg-slate-900 rounded-lg border-l-4 border-cyan-500">
                <p className="text-2xl font-bold text-white mb-1">30% Reduction</p>
                <p className="text-sm text-slate-500 uppercase tracking-wide">Average decrease in field rework for our clients.</p>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <LaserScanningComparisonSlider />
          </div>
        </div>
      </div>
    </section>
  );
};
