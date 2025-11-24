import React from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-24 border-t border-white/5 bg-brand-dark">
        <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="font-display text-4xl font-bold mb-12 text-center text-white">Technical Queries</h2>
            
            <div className="space-y-4">
                {[
                  {
                    q: "What file formats do you deliver?",
                    a: "We deliver in all major industry standards including Revit (.rvt), AutoCAD (.dwg), Navisworks (.nwd), Recap (.rcp), and IFC. We can also provide custom outputs for SolidWorks or Inventor upon request."
                  },
                  {
                    q: "How quickly can you deploy a scanning team?",
                    a: "With hubs in 25+ cities, we can typically have a scanning crew on-site within 48 to 72 hours anywhere in the contiguous United States. Expedited 24-hour deployment is available for urgent projects."
                  },
                  {
                    q: "Do you provide LOD 400 or 500 models?",
                    a: "Yes. We specialize in high-fidelity modeling. LOD 400 (Fabrication Ready) and LOD 500 (As-Built/Operations) are our standard for complex industrial and healthcare projects."
                  },
                  {
                    q: "How accurate are your laser scans?",
                    a: "We use survey-grade LiDAR scanners (Leica, Faro) that provide accuracy within +/- 2mm to 4mm depending on range and conditions. This ensures your digital twin matches reality perfectly."
                  }
                ].map((item, idx) => (
                  <details key={idx} className="group glass-panel rounded-lg open:bg-white/5 transition-all duration-300">
                      <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-white">
                          <span>{item.q}</span>
                          <span className="transition-transform duration-300 group-open:rotate-180">
                              <ChevronDown className="w-5 h-5 text-brand-accent" />
                          </span>
                      </summary>
                      <div className="text-gray-400 mt-0 px-6 pb-6 text-sm leading-relaxed animate-[sweep_0.5s_ease-in-out]">
                          {item.a}
                      </div>
                  </details>
                ))}
            </div>
        </div>

    </section>
  );
};

export default FAQ;