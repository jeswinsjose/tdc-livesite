import React, { useState } from 'react';
import { ChevronDown, ArrowRight, Building2, Plane, ShoppingBag, Factory, Home } from 'lucide-react';

const INDUSTRIES = [
  {
    id: 'residential',
    title: 'Residential Real Estate',
    icon: Home,
    description: 'Turn every property into a 24/7 open house. Reduce drive time, attract more qualified buyers, and accelerate your sales process with immersive 3D tours.',
    image: '/images/industry_residential.png'
  },
  {
    id: 'travel',
    title: 'Travel & Hospitality',
    icon: Plane,
    description: 'Showcase your amenities and rooms in stunning detail. Increase booking confidence and drive higher occupancy rates by letting guests explore before they arrive.',
    image: '/images/industry_travel.png'
  },
  {
    id: 'retail',
    title: 'Retail',
    icon: ShoppingBag,
    description: 'Reimagine the shopping experience. Create virtual showrooms, plan store layouts efficiently, and manage inventory with precise spatial data.',
    image: '/images/industry_retail.png'
  },
  {
    id: 'commercial',
    title: 'Commercial Real Estate',
    icon: Building2,
    description: 'Streamline leasing and facilities management. Provide remote tours to prospective tenants and maintain accurate digital records of your portfolio.',
    image: '/images/industry_commercial.png'
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    icon: Factory,
    description: 'Optimize your production floor. Plan equipment installations, conduct safety training remotely, and document facility conditions with millimeter accuracy.',
    image: '/images/industry_manufacturing.png'
  }
];

const IndustryTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(INDUSTRIES[0].id);

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center lg:text-left">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Explore the power of 3D <br/>
            <span className="text-brand-accent">across industries.</span>
          </h2>
        </div>

        {/* Mobile Layout: Stacked Cards */}
        <div className="flex flex-col gap-8 lg:hidden">
          {INDUSTRIES.map((industry) => (
            <div key={industry.id} className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden group">
              <div className="relative h-56">
                <img 
                  src={industry.image} 
                  alt={industry.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-0.5"></div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <industry.icon size={20} className="text-brand-accent" />
                  <h3 className="font-display text-xl font-bold text-white">{industry.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {industry.description}
                </p>
                <button className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2 hover:text-brand-accent transition-colors">
                  Learn More
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout: Split Screen Accordion */}
        <div className="hidden lg:flex flex-row gap-20">
          {/* Left Side: Dynamic Image */}
          <div className="flex-1 relative min-h-[600px] rounded-2xl overflow-hidden border border-white/10 group">
            {INDUSTRIES.map((industry) => (
              <div
                key={industry.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  activeTab === industry.id ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Floating Play Button Overlay (Decorative) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Accordion */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-4">
              {INDUSTRIES.map((industry) => (
                <div 
                  key={industry.id}
                  className={`border-b border-white/10 transition-all duration-300 ${
                    activeTab === industry.id ? 'pb-8' : 'pb-4'
                  }`}
                >
                  <button
                    onClick={() => setActiveTab(industry.id)}
                    className="w-full flex items-center justify-between py-4 group text-left"
                  >
                    <div className="flex items-center gap-4">
                      <industry.icon 
                        size={24} 
                        className={`transition-colors duration-300 ${
                          activeTab === industry.id ? 'text-brand-accent' : 'text-gray-500 group-hover:text-white'
                        }`}
                      />
                      <span className={`font-display text-xl font-bold transition-colors duration-300 ${
                        activeTab === industry.id ? 'text-white' : 'text-gray-400 group-hover:text-white'
                      }`}>
                        {industry.title}
                      </span>
                    </div>
                    <ChevronDown 
                      className={`text-gray-500 transition-transform duration-300 ${
                        activeTab === industry.id ? 'rotate-180 text-brand-accent' : ''
                      }`}
                    />
                  </button>

                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      activeTab === industry.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-gray-400 leading-relaxed mb-6 pl-10">
                      {industry.description}
                    </p>
                    <div className="pl-10">
                      <button className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2 hover:text-brand-accent transition-colors group/btn">
                        Learn More
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryTabs;
