import React from 'react';
import { Globe, MapPin, Factory } from 'lucide-react';

const features = [
  {
    title: "Local Project Management",
    description: "Your lead is in the US, knows the codes, and answers your calls. No midnight meetings or lost-in-translation errors.",
    icon: <MapPin className="text-blue-400" size={28} />
  },
  {
    title: "Global Production Engine",
    description: "Massive capacity to process terabytes of data overnight. We leverage time zones to work while you sleep.",
    icon: <Globe className="text-blue-400" size={28} />
  },
  {
    title: "Specialized Expertise",
    description: "Deep experience in Semiconductor, Healthcare, and Industrial plant retrofits where precision is non-negotiable.",
    icon: <Factory className="text-blue-400" size={28} />
  }
];

export const WhyChoose: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">US-Led Accountability. Global Scale.</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">The best of both worlds: Local communication with scalable backend production.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-slate-900/50 p-8 rounded-none border-l-4 border-blue-500 hover:bg-slate-900 transition-colors duration-300">
              <div className="mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};