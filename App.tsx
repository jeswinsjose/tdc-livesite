
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
import Footer from './components/Footer';

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
      </>

      {/* Footer */}
      <Footer />


    </div>
  );
};

import ScanToBimPage from './components/Service_pages/ScanToBimPage';

import LaserScanningPage from './components/Service_pages/LaserScanningPage';



const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <FloatingContact />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/estimator" element={<EstimatorPage />} />
        <Route path="/locations/:citySlug" element={<LocationPageWrapper />} />
        <Route path="/services/scan-to-bim" element={<ScanToBimPage />} />
        <Route path="/services/laser-scanning" element={<LaserScanningPage />} />
      </Routes>
    </>
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
