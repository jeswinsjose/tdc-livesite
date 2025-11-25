
import React from 'react';
import { MapPin, Phone, Mail, CheckCircle, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-brand-dark border-t border-white/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Info */}
          <div>
             <div className="inline-flex items-center gap-2 text-brand-accent font-mono text-sm tracking-widest mb-6">
                <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse"></span>
                CONTACT US
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Let's Engineer Your <br/>
              <span className="text-gray-500">Digital Reality.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-lg">
              Ready to start your project? Reach out for a consultation or quote. 
              Our nationwide team is ready to deploy.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-brand-accent" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Headquarters</h4>
                  <p className="text-gray-400 text-sm">123 Innovation Drive,<br/>New York, NY 10001</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="text-brand-accent" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Phone</h4>
                  <p className="text-gray-400 text-sm">+12135719077</p>
                  <p className="text-xs text-gray-500 mt-1">Mon-Fri, 9am - 6pm EST</p>
                </div>
              </div>

               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="text-brand-accent" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Email</h4>
                  <p className="text-gray-400 text-sm">sales@thedraftingcompany.com</p>
                  <p className="text-xs text-gray-500 mt-1">24 Hour Response Time</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
               {['Nationwide Laser Scanning Deployment', 'LOD 400 BIM Modeling', 'ISO 19650 Compliant Workflows'].map((point, i) => (
                 <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckCircle size={14} className="text-brand-accent" />
                    <span>{point}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-2xl">
            <h3 className="font-display text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-gray-500 tracking-wider">First Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-brand-accent focus:outline-none transition-colors" placeholder="John" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-mono uppercase text-gray-500 tracking-wider">Last Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-brand-accent focus:outline-none transition-colors" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-gray-500 tracking-wider">Email Address</label>
                  <input type="email" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-brand-accent focus:outline-none transition-colors" placeholder="john@company.com" />
              </div>

               <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-gray-500 tracking-wider">Project Type</label>
                  <select className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-brand-accent focus:outline-none transition-colors appearance-none">
                    <option>Select a service...</option>
                    <option>Laser Scanning</option>
                    <option>BIM Coordination</option>
                    <option>CAD Drafting</option>
                    <option>Other</option>
                  </select>
              </div>

              <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-gray-500 tracking-wider">Message</label>
                  <textarea className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-brand-accent focus:outline-none transition-colors h-32 resize-none" placeholder="Tell us about your project requirements..." />
              </div>

              <button type="button" className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-brand-accent transition-colors flex items-center justify-center gap-2 group">
                Send Request
                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-xs text-center text-gray-600">
                By submitting this form, you agree to our privacy policy.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
