import React, { useRef } from 'react';
import gsap from 'gsap';
import { Box, ScanLine, PenTool, ArrowUpRight } from 'lucide-react';

const SERVICES = [
  {
    id: 'scan',
    title: 'Laser Scanning',
    description: 'Capture existing conditions with sub-millimeter accuracy. We deploy LiDAR technology nationwide to create precise point clouds.',
    icon: ScanLine,
    // Cyan Theme
    hoverText: 'group-hover:text-brand-accent',
    hoverBorder: 'group-hover:border-brand-accent/50',
    hoverShadow: 'group-hover:shadow-[0_10px_40px_-10px_rgba(0,240,255,0.2)]',
    hoverBgBullet: 'group-hover:bg-brand-accent',
    glowColor: 'bg-brand-accent/20',
    features: ['LiDAR Capture', 'As-Built Verification', 'Point Cloud to BIM']
  },
  {
    id: 'bim',
    title: 'BIM Coordination',
    description: 'Clash detection and resolution before ground is broken. We manage complex MEP coordination to ensure seamless construction.',
    icon: Box,
    // Purple Theme
    hoverText: 'group-hover:text-purple-400',
    hoverBorder: 'group-hover:border-purple-500/50',
    hoverShadow: 'group-hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.2)]',
    hoverBgBullet: 'group-hover:bg-purple-400',
    glowColor: 'bg-purple-500/20',
    features: ['LOD 300-400', 'Clash Detection', 'Revit Modeling']
  },
  {
    id: 'cad',
    title: 'CAD Drafting',
    description: 'Modernizing legacy data. We convert paper sketches, PDFs, and old DWGs into clean, layered, and compliant CAD files.',
    icon: PenTool,
    // Orange Theme
    hoverText: 'group-hover:text-orange-400',
    hoverBorder: 'group-hover:border-orange-500/50',
    hoverShadow: 'group-hover:shadow-[0_10px_40px_-10px_rgba(251,146,60,0.2)]',
    hoverBgBullet: 'group-hover:bg-orange-400',
    glowColor: 'bg-orange-500/20',
    features: ['Paper to CAD', 'Shop Drawings', 'Structural Detail']
  }
];

const ServiceCard: React.FC<{ service: typeof SERVICES[0]; index: number }> = ({ service, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Subtle 3D tilt
    const rotateX = ((y - centerY) / centerY) * -2; 
    const rotateY = ((x - centerX) / centerX) * 2;

    gsap.to(card, {
      duration: 0.4,
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      duration: 0.4,
      rotateX: 0,
      rotateY: 0,
      ease: 'power2.out'
    });
  };

  return (
    <div 
      className="perspective-1000 w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef}
        className={`
          relative p-10 h-full flex flex-col justify-between group rounded-xl 
          bg-zinc-900/40 backdrop-blur-md border border-white/5
          transition-all duration-500 ease-out
          hover:-translate-y-2 hover:bg-zinc-800/60
          ${service.hoverBorder} ${service.hoverShadow}
        `}
      >
        {/* Glow Effect Blob - Inactive by default (opacity-0), fades in on hover */}
        <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${service.glowColor}`} />
        
        <div>
          {/* Icon: Default White, Hover Color */}
          <service.icon className={`w-12 h-12 mb-8 transition-colors duration-500 text-white ${service.hoverText}`} />
          
          <h3 className="font-display text-2xl font-bold mb-4 text-white group-hover:text-white transition-colors duration-300">
            {service.title}
          </h3>
          
          <p className="text-gray-400 text-sm leading-relaxed mb-8 group-hover:text-gray-300 transition-colors duration-300">
            {service.description}
          </p>
        </div>

        <ul className="space-y-3 relative z-10">
            {service.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-xs md:text-sm text-gray-500 font-mono group-hover:text-gray-300 transition-colors duration-300">
                    {/* Bullet: Default Gray-600, Hover Color */}
                    <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 bg-gray-600 ${service.hoverBgBullet}`} />
                    {feature}
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-brand-dark relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">Precision Services</h2>
                <p className="text-gray-400 max-w-md">End-to-end digital solutions for architects, engineers, and construction managers.</p>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-brand-accent border-b border-brand-accent pb-1 hover:opacity-80 transition-opacity mt-6 md:mt-0 font-mono text-sm uppercase tracking-wider">
                View All Services <ArrowUpRight className="w-4 h-4" />
            </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;