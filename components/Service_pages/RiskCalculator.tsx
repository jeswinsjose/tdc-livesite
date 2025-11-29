import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, DollarSign, CheckCircle2 } from 'lucide-react';

export const RiskCalculator: React.FC = () => {
  const [projectValue, setProjectValue] = useState(5); // In millions
  const [clashCount, setClashCount] = useState(12);

  // Assumptions
  const AVG_CLASH_COST = 6500; // Cost to fix a field clash
  const SCAN_BASE_COST = 2500;
  const SCAN_VAR_COST = 800; // Per million of project value (simplified logic)

  const reworkCost = clashCount * AVG_CLASH_COST;
  const scanCost = SCAN_BASE_COST + (projectValue * SCAN_VAR_COST);
  const roi = reworkCost - scanCost;
  const isPositive = roi > 0;

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Calculate Your Risk.</h2>
            <p className="text-slate-400 text-lg">See how much "guessing" is costing you compared to a TDC scan.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Controls */}
          <div className="space-y-10 bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-2xl">
            {/* Input 1 */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-slate-300 font-semibold uppercase tracking-wider text-sm">Project Value</label>
                <span className="text-2xl font-mono text-cyan-400">${projectValue}M</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                step="1"
                value={projectValue}
                onChange={(e) => setProjectValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                <span>$1M</span>
                <span>$50M+</span>
              </div>
            </div>

            {/* Input 2 */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-slate-300 font-semibold uppercase tracking-wider text-sm">Est. Field Clashes</label>
                <span className="text-2xl font-mono text-amber-400">{clashCount}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="50" 
                step="1"
                value={clashCount}
                onChange={(e) => setClashCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <p className="text-xs text-slate-500 mt-3">
                *Industry average: 3 clashes per $1M without BIM coordination.
              </p>
            </div>

            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800 text-sm text-slate-400">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="text-amber-500 shrink-0" size={20} />
                    <p>A single clash in the field (e.g., HVAC duct hitting a beam) costs avg. <span className="text-white font-semibold">$6,500</span> in delays and material rework.</p>
                </div>
            </div>
          </div>

          {/* Results */}
          <div className="relative">
            <div className="grid grid-cols-1 gap-6">
                
                {/* Rework Cost Card */}
                <motion.div 
                    layout
                    className="bg-slate-800/50 p-6 rounded-xl border border-red-500/20 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-opacity group-hover:opacity-100 opacity-50" />
                    <h3 className="text-slate-400 text-sm uppercase tracking-widest font-semibold mb-2">Potential Rework Cost</h3>
                    <div className="text-4xl md:text-5xl font-mono text-white flex items-center gap-2">
                        <span className="text-red-500"><TrendingDown size={36}/></span>
                        ${reworkCost.toLocaleString()}
                    </div>
                </motion.div>

                {/* Scan Cost Card */}
                <motion.div 
                     layout
                     className="bg-slate-800/50 p-6 rounded-xl border border-cyan-500/20 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-opacity group-hover:opacity-100 opacity-50" />
                    <h3 className="text-slate-400 text-sm uppercase tracking-widest font-semibold mb-2">Cost of TDC Scan</h3>
                    <div className="text-4xl md:text-5xl font-mono text-white flex items-center gap-2">
                        <span className="text-cyan-500"><DollarSign size={36}/></span>
                        ${scanCost.toLocaleString()}
                    </div>
                </motion.div>

                {/* Savings Summary */}
                <motion.div 
                     layout
                     className={`p-8 rounded-xl border-2 relative overflow-hidden ${isPositive ? 'border-green-500/30 bg-green-900/10' : 'border-slate-700 bg-slate-900'}`}
                >
                    <h3 className="text-slate-100 text-lg font-bold mb-4 flex items-center gap-2">
                        {isPositive ? <CheckCircle2 className="text-green-400" /> : null}
                        Net Project Savings
                    </h3>
                    <div className={`text-5xl md:text-6xl font-bold font-mono ${isPositive ? 'text-green-400' : 'text-slate-500'}`}>
                        ${roi.toLocaleString()}
                    </div>
                    {isPositive && (
                         <p className="mt-4 text-green-200/70 text-sm font-medium">
                            ROI: {Math.round((roi / scanCost) * 100)}% return on scanning investment.
                         </p>
                    )}
                </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};