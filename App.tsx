
import React, { useState } from 'react';
import { Star, Layers } from 'lucide-react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import MapSection from './components/MapSection';
import Services from './components/Services';
import Navigation from './components/Navigation';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Stats from './components/Stats';
import LocationPage from './components/LocationPage';
import ContactSection from './components/ContactSection';
import EstimatorPage from './components/Estimator/EstimatorPage';
import FloatingContact from './components/FloatingContact';
import ClientLogos from './components/ClientLogos';
import FeatureSections from './components/FeatureSections';
import IndustryTabs from './components/IndustryTabs';

// Shared Location Data
export const LOCATIONS_DATA = [
  { city: 'Atlanta', state: 'GA', type: 'Hub', image: '/locations/atlanta.webp' },
  { city: 'Austin', state: 'TX', type: 'Branch', image: '/locations/dallas.webp' },
  { city: 'Boston', state: 'MA', type: 'Branch', image: '/locations/boston.webp' },
  { city: 'Chicago', state: 'IL', type: 'Hub', image: '/locations/chicago.webp' },
  { city: 'Dallas', state: 'TX', type: 'Hub', image: '/locations/dallas.webp' },
  { city: 'Denver', state: 'CO', type: 'Branch', image: '/locations/denver.webp' },
  { city: 'Fargo', state: 'ND', type: 'Branch', image: '/locations/chicago.webp' },
  { city: 'Honolulu', state: 'HI', type: 'Branch', image: '/locations/los-angeles.webp' },
  { city: 'Houston', state: 'TX', type: 'Hub', image: '/locations/houston.webp' },
  { city: 'Jersey City', state: 'NJ', type: 'Branch', image: '/locations/new-York.webp' },
  { city: 'Las Vegas', state: 'NV', type: 'Branch', image: '/locations/los-angeles.webp' },
  { city: 'Los Angeles', state: 'CA', type: 'Hub', image: '/locations/los-angeles.webp' },
  { city: 'Miami', state: 'FL', type: 'Hub', image: '/locations/miami.webp' },
  { city: 'Milwaukee', state: 'WI', type: 'Branch', image: '/locations/chicago.webp' },
  { city: 'Minneapolis', state: 'MN', type: 'Branch', image: '/locations/chicago.webp' },
  { city: 'Nashville', state: 'TN', type: 'Branch', image: '/locations/atlanta.webp' },
  { city: 'New York', state: 'NY', type: 'HQ', image: '/locations/new-York.webp' },
  { city: 'Omaha', state: 'NE', type: 'Branch', image: '/locations/chicago.webp' },
  { city: 'Orlando', state: 'FL', type: 'Branch', image: '/locations/miami.webp' },
  { city: 'Philadelphia', state: 'PA', type: 'Branch', image: '/locations/philadelphia.webp' },
  { city: 'Phoenix', state: 'AZ', type: 'Branch', image: '/locations/phoenix.webp' },
  { city: 'San Antonio', state: 'TX', type: 'Branch', image: '/locations/dallas.webp' },
  { city: 'San Diego', state: 'CA', type: 'Branch', image: '/locations/san-diego.webp' },
  { city: 'San Francisco', state: 'CA', type: 'Innovation', image: '/locations/san-Francisco.webp' },
  { city: 'San Jose', state: 'CA', type: 'Branch', image: '/locations/san-Francisco.webp' },
  { city: 'Seattle', state: 'WA', type: 'Tech Hub', image: '/locations/seattle.webp' },
  { city: 'St. Louis', state: 'MO', type: 'Branch', image: '/locations/chicago.webp' },
  { city: 'Tampa Bay', state: 'FL', type: 'Branch', image: '/locations/miami.webp' },
  { city: 'Washington', state: 'DC', type: 'Gov', image: '/locations/washington-dc.webp' },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Navigate to location page with SEO-friendly URL
  const handleLocationSelect = (loc: {city: string, state: string, type: string}) => {
    const citySlug = loc.city.toLowerCase().replace(/\s+/g, '-');
    navigate(`/locations/${citySlug}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-brand-dark min-h-screen text-white selection:bg-brand-accent selection:text-black">
      <Header 
        locations={LOCATIONS_DATA} 
        onLocationSelect={handleLocationSelect} 
      />
      
      <>
          <Hero />
          
          <div className="relative z-10 bg-brand-dark shadow-[0_-50px_100px_rgba(10,10,10,1)]">
                {/* Marquee */}
                <div className="py-12 border-y border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden whitespace-nowrap">
                    <div className="inline-flex animate-[marquee_20s_linear_infinite] items-center">
                        {[...Array(2)].map((_, i) => (
                            <React.Fragment key={i}>
                                <span className="text-4xl font-display font-bold text-transparent px-8" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>NATIONWIDE COVERAGE</span>
                                <Star className="w-6 h-6 text-white/30" />
                                <span className="text-4xl font-display font-bold text-transparent px-8" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>LOD 400 ACCURACY</span>
                                <Star className="w-6 h-6 text-white/30" />
                                <span className="text-4xl font-display font-bold text-transparent px-8" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>DIGITAL TWINS</span>
                                <Star className="w-6 h-6 text-white/30" />
                                <span className="text-4xl font-display font-bold text-transparent px-8" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>LASER SCANNING</span>
                                <Star className="w-6 h-6 text-white/30" />
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <Services />
                <ClientLogos />
                <FeatureSections />
                <IndustryTabs />
                <MapSection onLocationSelect={(cityName) => {
                    const loc = LOCATIONS_DATA.find(l => l.city === cityName);
                    if (loc) handleLocationSelect(loc);
                }} />
                <Testimonials />
                <FAQ />
                <Stats />
                
            <ContactSection />
        </div>
        <Navigation />
        <FloatingContact />
      </>

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
                                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); document.getElementById('map')?.scrollIntoView(); }} className="hover:text-brand-accent transition-colors">Locations</a></li>
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


    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/estimator" element={<EstimatorPage />} />
      <Route path="/locations/:citySlug" element={<LocationPageWrapper />} />
    </Routes>
  );
};

// Wrapper component to handle URL params
const LocationPageWrapper: React.FC = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const navigate = useNavigate();

  // Find the location data from the slug
  const location = LOCATIONS_DATA.find(
    loc => loc.city.toLowerCase().replace(/\s+/g, '-') === citySlug
  );

  if (!location) {
    // Redirect to home if location not found
    navigate('/');
    return null;
  }

  return (
    <LocationPage
      city={location.city}
      state={location.state}
      type={location.type}
      image={location.image}
      onBack={() => navigate('/')}
      onGetQuote={() => navigate('/estimator')}
    />
  );
};

export default App;
