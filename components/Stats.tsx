import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.counter').forEach((counter) => {
        const target = parseInt(counter.dataset.target || '0', 10);
        gsap.to(counter, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: counter,
            start: 'top 85%',
            once: true
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 border-t border-white/5 bg-brand-dark">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
                <div className="font-display text-5xl font-bold text-white mb-2 counter" data-target="1500">0</div>
                <div className="text-gray-500 text-sm tracking-widest uppercase">Projects Completed</div>
            </div>
            <div>
                <div className="font-display text-5xl font-bold text-white mb-2 counter" data-target="25">0</div>
                <div className="text-gray-500 text-sm tracking-widest uppercase">States Covered</div>
            </div>
            <div>
                <div className="font-display text-5xl font-bold text-white mb-2 counter" data-target="40">0</div>
                <div className="text-gray-500 text-sm tracking-widest uppercase">Years Experience</div>
            </div>
            <div>
                <div className="font-display text-5xl font-bold text-white mb-2 counter" data-target="100">0</div>
                <div className="text-gray-500 text-sm tracking-widest uppercase">% Satisfaction</div>
            </div>
        </div>
    </section>
  );
};

export default Stats;