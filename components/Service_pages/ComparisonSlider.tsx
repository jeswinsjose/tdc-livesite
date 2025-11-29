import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal, Scan, Box } from 'lucide-react';

export const ComparisonSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isDragging.current) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleUp = () => isDragging.current = false;
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    }
  }, []);

  return (
    <div className="w-full h-full relative group select-none rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
      <div 
        ref={containerRef}
        className="relative w-full h-full cursor-col-resize"
        onMouseDown={() => isDragging.current = true}
        onTouchStart={() => isDragging.current = true}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
      >
        {/* Right Side - Revit Model (Underneath) */}
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop')" }}
        >
             {/* Technical Overlay for Model */}
             <div className="absolute inset-0 bg-blue-900/10" />
             <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur text-blue-400 text-xs font-mono px-3 py-1 rounded border border-blue-500/30 flex items-center gap-2">
                <Box size={14} />
                LOD 400 REVIT MODEL
             </div>
        </div>

        {/* Left Side - Point Cloud (Overlay) */}
        <div 
          className="absolute inset-0 bg-cover bg-center border-r border-blue-400"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop')",
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` 
          }}
        >
             <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply" />
             <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur text-white text-xs font-mono px-3 py-1 rounded border border-white/20 flex items-center gap-2">
                <Scan size={14} />
                RAW POINT CLOUD
             </div>
        </div>

        {/* Handle */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-blue-400 cursor-col-resize z-20 shadow-[0_0_15px_rgba(96,165,250,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 p-2 rounded-full text-white shadow-lg border-2 border-slate-950">
            <MoveHorizontal size={16} />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
          <span className="bg-slate-950/80 px-4 py-1 rounded-full text-[10px] uppercase tracking-widest text-slate-400 backdrop-blur-sm border border-slate-800">
            Drag to Compare
          </span>
      </div>
    </div>
  );
};