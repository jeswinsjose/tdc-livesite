import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-black relative">
         <div className="container mx-auto px-6">
            <h2 className="font-display text-4xl font-bold mb-12 text-center text-white">Client Intelligence</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Testimonial 1 */}
                <div className="glass-panel p-8 rounded-lg group hover:border-brand-accent/30 transition-all duration-500">
                    <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map(i => (
                            <Star key={i} className="w-4 h-4 text-brand-accent fill-current" />
                        ))}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">"TDC delivered a Level 400 BIM model for our hospital project in record time. Their ability to deploy scanners to three different states simultaneously saved us weeks of travel coordination."</p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center font-bold text-white font-mono">JD</div>
                        <div>
                            <div className="text-sm font-bold text-white">John Doe</div>
                            <div className="text-xs text-gray-500">Project Manager, Turner Construction</div>
                        </div>
                    </div>
                </div>

                {/* Testimonial 2 */}
                <div className="glass-panel p-8 rounded-lg border-t-2 border-brand-accent group hover:bg-white/5 transition-all duration-500">
                    <div className="flex gap-1 mb-4">
                         {[1, 2, 3, 4, 5].map(i => (
                            <Star key={i} className="w-4 h-4 text-brand-accent fill-current" />
                        ))}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">"The accuracy of their digital twins is unmatched. We used their laser scan data to fabricate off-site steel components that fit perfectly on the first try."</p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center font-bold text-white font-mono">AS</div>
                        <div>
                            <div className="text-sm font-bold text-white">Sarah Al-Fayed</div>
                            <div className="text-xs text-gray-500">Director of VDC, Skanska</div>
                        </div>
                    </div>
                </div>

                {/* Testimonial 3 */}
                <div className="glass-panel p-8 rounded-lg group hover:border-brand-accent/30 transition-all duration-500">
                    <div className="flex gap-1 mb-4">
                         {[1, 2, 3, 4, 5].map(i => (
                            <Star key={i} className="w-4 h-4 text-brand-accent fill-current" />
                        ))}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">"Finally, a drafting partner that understands complex MEP systems. Their coordination drawings helped us avoid thousands of dollars in field conflicts."</p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center font-bold text-white font-mono">MR</div>
                        <div>
                            <div className="text-sm font-bold text-white">Mike Ross</div>
                            <div className="text-xs text-gray-500">Lead Engineer, Jacobs</div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    </section>
  );
};

export default Testimonials;