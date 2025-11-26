import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Particle Animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const particleCount = width < 768 ? 40 : 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)'; // Electric blue lines

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.lineWidth = 1 - dist / 150;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animateParticles);
    };

    const animId = requestAnimationFrame(animateParticles);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    // GSAP Intro
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 100 }, 
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.2 }
    );

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-dark pt-20">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark pointer-events-none" />

      {/* Abstract Background Element from new design */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-2 mb-8 glass-panel">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-white">Architectural Intelligence</span>
        </div>

        <h1 ref={titleRef} className="font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-white leading-[0.95] z-20 relative">
          <span className="inline-block">CAPTURE</span> <span className="text-brand-accent drop-shadow-[0_0_30px_rgba(0,240,255,0.4)] inline-block">REALITY</span>
          <br />
          <span className="inline-block">BUILD</span> <span className="text-brand-accent drop-shadow-[0_0_30px_rgba(0,240,255,0.4)] inline-block">VIRTUALLY</span>
        </h1>
        
        <div className="mt-12 flex flex-col items-center w-full">
          <p className="text-gray-400 max-w-lg mx-auto mb-8 font-light tracking-wide uppercase text-xs md:text-sm">
            We transform physical spaces into precise digital twins. <br/>
            Nationwide Laser Scanning, BIM, and CAD solutions.
          </p>
          
          <div className="flex gap-6 mb-12">
            <button 
              onClick={() => navigate('/estimator')}
              className="group relative px-8 py-4 bg-white text-black font-bold tracking-wider uppercase overflow-hidden hover:scale-105 transition-transform duration-300"
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get a Quote <ArrowRight className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 h-full w-full bg-brand-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out z-0"></div>
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <span className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center">
                    <Play className="w-4 h-4 fill-current ml-1" />
                </span>
                <span className="font-mono text-sm uppercase tracking-widest">Watch Reel</span>
            </button>
          </div>

          {/* Vertical Ticker */}
          <div className="flex flex-col items-center gap-3 mt-4">
                <span className="text-[10px] font-mono text-brand-accent uppercase tracking-[0.2em]">Live Operations Across 25+ Cities</span>
                <div className="h-6 overflow-hidden relative w-full max-w-md">
                    <div className="flex flex-col animate-[slideUp_10s_infinite] text-sm text-gray-500 font-mono">
                        <span>New York • Los Angeles • Chicago</span>
                        <span>Houston • Phoenix • Philadelphia</span>
                        <span>San Antonio • San Diego • Dallas</span>
                        <span>San Jose • Austin • Seattle</span>
                        <span>Denver • Washington DC • Boston</span>
                    </div>
                </div>
            </div>
        </div>
      </div>




    </div>
  );
};

export default Hero;