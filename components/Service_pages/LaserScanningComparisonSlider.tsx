import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';

export const LaserScanningComparisonSlider: React.FC = () => {
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

  // Add global mouse up listener to stop dragging even if mouse leaves component
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
    <div className="w-full max-w-5xl mx-auto my-12 relative group select-none">
      <div className="absolute -top-12 left-0 right-0 flex justify-between text-xs font-mono uppercase tracking-widest text-slate-500">
        <span>Raw Site Photo</span>
        <span>LOD 400 Point Cloud</span>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full aspect-video rounded-xl overflow-hidden cursor-ew-resize border border-slate-700 shadow-2xl"
        onMouseDown={() => isDragging.current = true}
        onTouchStart={() => isDragging.current = true}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
      >
        {/* Underneath Image (Right Side - Point Cloud) */}
        <div 
            className="absolute inset-0 bg-cover bg-center filter contrast-125 saturate-150"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop')" }}
        >
             <div className="absolute inset-0 bg-slate-900/30" />
        </div>

        {/* Overlay Image (Left Side - Reality) - Clipped */}
        <div 
          className="absolute inset-0 bg-cover bg-center border-r border-white/50"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop')",
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` 
          }}
        >
             <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-cyan-400 cursor-ew-resize shadow-[0_0_20px_rgba(34,211,238,0.8)] z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full text-cyan-900 shadow-lg">
            <MoveHorizontal size={20} />
          </div>
        </div>
      </div>
      <p className="text-center text-slate-500 text-sm mt-4">Drag slider to reveal the digital twin accuracy.</p>
    </div>
  );
};
