import React, { useState } from 'react';
import { X, Cpu, Check, AlertCircle, Loader2 } from 'lucide-react';
import { analyzeProjectScope } from '../services/geminiService';
import { ProjectEstimate, AiStatus } from '../types';

interface QuoteModalProps {
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<AiStatus>(AiStatus.IDLE);
  const [estimate, setEstimate] = useState<ProjectEstimate | null>(null);

  const handleAnalyze = async () => {
    if (!prompt.trim()) return;
    setStatus(AiStatus.THINKING);
    try {
      const result = await analyzeProjectScope(prompt);
      setEstimate(result);
      setStatus(AiStatus.SUCCESS);
    } catch (e) {
      setStatus(AiStatus.ERROR);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-brand-charcoal border border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
              <Cpu size={20} />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl">AI Project Estimator</h3>
              <p className="text-xs text-gray-400">Powered by Gemini 2.5</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {status === AiStatus.IDLE && (
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Describe your project in plain English. Our AI will analyze requirements and suggest the optimal service path.
              </p>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. I need a point cloud scan of a 50,000 sqft warehouse in Dallas converted to a Revit LOD 300 model."
                className="w-full h-32 bg-black/30 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-600 focus:border-brand-accent focus:outline-none transition-colors resize-none"
              />
              <button 
                onClick={handleAnalyze}
                disabled={!prompt.trim()}
                className="w-full py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Analyze Scope
              </button>
            </div>
          )}

          {status === AiStatus.THINKING && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-12 h-12 text-brand-accent animate-spin" />
              <p className="text-sm text-brand-accent animate-pulse">Analyzing structural parameters...</p>
            </div>
          )}

          {status === AiStatus.SUCCESS && estimate && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-lg p-4">
                <h4 className="text-brand-accent text-sm font-bold uppercase tracking-widest mb-4">Recommended Strategy</h4>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-gray-500 text-xs uppercase block mb-1">Service</span>
                    <span className="text-white font-medium">{estimate.serviceRecommended}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs uppercase block mb-1">Est. Turnaround</span>
                    <span className="text-white font-medium">{estimate.estimatedDuration}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs uppercase block mb-1">Complexity</span>
                    <span className={`font-medium ${
                      estimate.complexityLevel.toLowerCase().includes('high') ? 'text-red-400' : 'text-green-400'
                    }`}>{estimate.complexityLevel}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-gray-500 text-xs uppercase block">Technical Considerations</span>
                  <ul className="space-y-2">
                    {estimate.keyConsiderations.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <Check size={14} className="mt-1 text-brand-accent shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button className="w-full py-3 bg-brand-accent text-black font-bold uppercase tracking-widest hover:bg-white transition-colors">
                Proceed with Quote
              </button>
              
              <button 
                onClick={() => setStatus(AiStatus.IDLE)}
                className="w-full text-xs text-gray-500 hover:text-white underline"
              >
                Run another estimation
              </button>
            </div>
          )}
          
          {status === AiStatus.ERROR && (
             <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-400 mb-4">Analysis Failed. Please try again.</p>
                <button onClick={() => setStatus(AiStatus.IDLE)} className="text-white underline">Retry</button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
