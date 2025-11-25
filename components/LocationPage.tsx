
import React, { useEffect, useRef } from 'react';
import { ArrowLeft, MapPin, Building2, HardHat, Users, CheckCircle, ArrowRight, Layers } from 'lucide-react';
import gsap from 'gsap';
import Header from './Header';
import FloatingContact from './FloatingContact';
import FAQ from './FAQ';
import { LOCATIONS_DATA } from '../App';
import cityData from '../data/city.json';

interface LocationPageProps {
  city: string;
  state: string;
  type: string;
  onBack: () => void;
  onGetQuote: () => void;
}

const LocationPage: React.FC<LocationPageProps> = ({ city, state, type, onBack, onGetQuote }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      gsap.from('.loc-anim', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [city]);

  // Dynamic content generator based on city type
  const getLocalDescription = () => {
    if (type === 'HQ' || city === 'New York') {
        return `As our headquarters since 1980, ${city} represents the pinnacle of our architectural technology. We have surveyed over 500+ commercial properties in the tri-state area, specializing in high-rise documentation and historic preservation.`;
    } else if (type === 'Tech Hub' || city === 'Seattle' || city === 'San Francisco') {
        return `Our ${city} team leads the nation in BIM innovation and VDC implementation. Serving the tech-forward construction market, we specialize in complex data center mapping and corporate campus digital twins.`;
    } else if (state === 'TX') {
        return `Everything is bigger in Texas, including our scanning capacity. Our ${city} division specializes in large-scale industrial retrofits, oil & gas facility mapping, and expansive commercial developments.`;
    } else {
        return `Serving the greater ${city} metropolitan area with rapid-response laser scanning and architectural drafting. Our local ${state} team understands the specific zoning and documentation requirements of the region.`;
    }
  };
  
  // Find dynamic city data
  const cityInfo = cityData.cities.find(c => c.city === city);
  const dynamicAddress = cityInfo?.Address || `<strong>${city} Office</strong><br/>Serving the greater ${city} area`;
  const dynamicPhone = cityInfo?.PresentedNumber || '(800) 504-2658';
  const dynamicPhoneLink = cityInfo?.presentedNumberNoSpace ? `tel:+1${cityInfo.presentedNumberNoSpace}` : 'tel:+18005042658';

  return (
    <div className="bg-brand-dark min-h-screen text-white selection:bg-brand-accent selection:text-black">
      <Header 
        locations={LOCATIONS_DATA} 
        onLocationSelect={(loc) => {
          const citySlug = loc.city.toLowerCase().replace(/\s+/g, '-');
          window.location.href = `/locations/${citySlug}`;
        }} 
      />
      
      <div ref={containerRef} className="min-h-screen bg-brand-dark text-white pt-24 pb-20">
        {/* Local Hero */}
        <div className="container mx-auto px-6 mb-24">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1 loc-anim">
                  <div className="inline-flex items-center gap-2 border border-brand-accent/30 bg-brand-accent/10 rounded-full px-4 py-1 mb-6">
                      <MapPin size={14} className="text-brand-accent" />
                      <span className="text-xs font-bold text-brand-accent uppercase tracking-widest">{city}, {state} Branch</span>
                  </div>
                  <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
                      Precision Drafting & <br/>
                      Scanning in <span className="text-brand-accent">{city}</span>
                  </h1>
                  <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-8">
                      {getLocalDescription()}
                  </p>
                  <div className="flex flex-wrap gap-4">
                      <button onClick={onGetQuote} className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors rounded-sm">
                          Get {city} Quote
                      </button>
                      <button className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors rounded-sm">
                          View Local Portfolio
                      </button>
                  </div>
              </div>
              
              {/* Abstract City Visual */}
              <div className="flex-1 w-full loc-anim">
                  <div className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden border border-white/10 bg-gray-900 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-purple-500/20 mix-blend-overlay z-10"></div>
                      {/* Placeholder for city skyline */}
                      <img 
                          src={`https://picsum.photos/seed/${city}/800/600?grayscale&blur=2`} 
                          alt={`${city} Architecture`} 
                          className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      <div className="absolute bottom-6 left-6 z-20">
                          <div className="text-4xl font-display font-bold text-white">{city}</div>
                          <div className="text-brand-accent font-mono text-sm uppercase">Active Projects: {Math.floor(Math.random() * 50) + 12}</div>
                      </div>
                  </div>
              </div>
          </div>
        </div>

        {/* Local Trust Indicators */}
        <div className="bg-white/5 border-y border-white/5 py-16 loc-anim">
          <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-dark border border-white/10 flex items-center justify-center">
                          <Users className="text-brand-accent" />
                      </div>
                      <div>
                          <div className="font-bold text-white">Local Team</div>
                          <div className="text-xs text-gray-500 uppercase">Boots on the ground</div>
                      </div>
                  </div>
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-dark border border-white/10 flex items-center justify-center">
                          <Building2 className="text-brand-accent" />
                      </div>
                      <div>
                          <div className="font-bold text-white">Code Compliant</div>
                          <div className="text-xs text-gray-500 uppercase">{state} Building Standards</div>
                      </div>
                  </div>
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-dark border border-white/10 flex items-center justify-center">
                          <HardHat className="text-brand-accent" />
                      </div>
                      <div>
                          <div className="font-bold text-white">Rapid Deploy</div>
                          <div className="text-xs text-gray-500 uppercase">24-48 Hour Response</div>
                      </div>
                  </div>
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-dark border border-white/10 flex items-center justify-center">
                          <CheckCircle className="text-brand-accent" />
                      </div>
                      <div>
                          <div className="font-bold text-white">LOD 400</div>
                          <div className="text-xs text-gray-500 uppercase">Fabrication Ready</div>
                      </div>
                  </div>
              </div>
              
              {/* Dynamic Contact Info Block */}
              <div className="mt-12 p-8 border border-white/10 bg-white/5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-start gap-4">
                      <div className="p-3 bg-brand-accent/10 rounded-lg">
                          <MapPin className="text-brand-accent" size={24} />
                      </div>
                      <div>
                          <h3 className="font-display font-bold text-lg mb-2">Local Office</h3>
                          <div 
                              className="text-gray-400 text-sm leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: dynamicAddress }}
                          />
                      </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                      <div className="h-12 w-[1px] bg-white/10 hidden md:block"></div>
                      <a 
                          href={dynamicPhoneLink}
                          className="flex items-center gap-3 group"
                      >
                          <div className="p-3 bg-brand-accent/10 rounded-lg group-hover:bg-brand-accent transition-colors">
                              <Users className="text-brand-accent group-hover:text-black transition-colors" size={24} />
                          </div>
                          <div>
                              <div className="text-xs text-gray-500 uppercase tracking-wider">Call Local Team</div>
                              <div className="font-mono text-xl font-bold text-white group-hover:text-brand-accent transition-colors">
                                  {dynamicPhone}
                              </div>
                          </div>
                      </a>
                  </div>
              </div>
          </div>
        </div>

        {/* Service Grid for Location */}
        <div className="container mx-auto px-6 py-24 loc-anim">
          <h2 className="font-display text-3xl font-bold mb-12">Services Available in {city}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['3D Laser Scanning', 'BIM Coordination', 'As-Built Documentation', 'Scan-to-Revit'].map((service, i) => (
                  <div key={i} className="group p-6 border border-white/10 bg-white/5 hover:border-brand-accent/50 transition-all flex justify-between items-center cursor-pointer">
                      <span className="font-display text-xl font-bold">{service}</span>
                      <ArrowRight className="text-gray-500 group-hover:text-brand-accent group-hover:translate-x-2 transition-all" />
                  </div>
              ))}
          </div>
        </div>

        {/* Local SEO Block (Text Heavy) */}
        <div className="container mx-auto px-6 pb-24 loc-anim">
          <div className="p-8 md:p-12 border border-white/10 bg-zinc-900/50 rounded-2xl">
              <h3 className="text-brand-accent font-mono text-sm uppercase tracking-widest mb-6">Why choose TDC in {city}?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-400 leading-relaxed text-sm md:text-base">
                  <p>
                      The Drafting Company brings world-class architectural technology to the {city} market. We understand that {city}'s construction environment requires speed, accuracy, and adherence to specific local codes. Whether you are retrofitting a historic property downtown or breaking ground on new construction, our digital twins reduce risk.
                  </p>
                  <p>
                      Unlike remote-only firms, we maintain a network of scanning technicians across {state}. This allows us to capture your site conditions without exorbitant travel fees. Our team processes data overnight, ensuring your engineers and architects have the point clouds and Revit models they need to keep the project moving.
                  </p>
              </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-6 py-24">
          <FAQ />
        </div>

        {/* Call to Action Section */}
        <div className="container mx-auto px-6 pb-24 loc-anim">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-accent/20 via-purple-500/20 to-brand-accent/20 border border-brand-accent/30 p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
            
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Ready to Start Your {city} Project?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Get an instant estimate for your laser scanning and BIM modeling needs. Our {city} team is ready to deliver precision documentation for your project.
              </p>
              <button 
                onClick={onGetQuote}
                className="px-10 py-5 bg-white text-black font-bold uppercase tracking-widest hover:bg-brand-accent hover:scale-105 transition-all rounded-sm shadow-lg inline-flex items-center gap-3"
              >
                Get Free Estimate
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-32">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-6">
                <Layers className="w-6 h-6 text-brand-accent" />
                <span className="font-display font-bold text-xl text-white">TDC</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                The Drafting Company Inc.<br/>
                Setting the standard for digital construction documentation since 1980.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-20 text-sm w-full lg:w-auto">
              <div>
                <h4 className="text-white font-bold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-500">
                  <li><a href="#" className="hover:text-brand-accent transition-colors">BIM Modeling</a></li>
                  <li><a href="#" className="hover:text-brand-accent transition-colors">Laser Scanning</a></li>
                  <li><a href="#" className="hover:text-brand-accent transition-colors">CAD Drafting</a></li>
                  <li><a href="#" className="hover:text-brand-accent transition-colors">3D Printing</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-500">
                  <li><a href="#" className="hover:text-brand-accent transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-brand-accent transition-colors">Portfolio</a></li>
                  <li><a href="/" className="hover:text-brand-accent transition-colors">Locations</a></li>
                  <li><a href="#contact" className="hover:text-brand-accent transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Social</h4>
                <ul className="space-y-2 text-gray-500">
                  <li><a href="#" className="hover:text-brand-accent transition-colors">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-brand-accent transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-brand-accent transition-colors">Twitter</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
            <p>&copy; 2025 The Drafting Company Inc. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <FloatingContact />
    </div>
  );
};

export default LocationPage;
