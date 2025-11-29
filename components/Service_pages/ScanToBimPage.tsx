import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import FAQ from '../FAQ';
import { Hero } from './Hero';
import { ScanToBimSliderSection } from './ScanToBimSliderSection';
import { FlatPackComparison } from './FlatPackComparison';
import { LODToggle } from './LODToggle';
import { HardwareFleet } from './HardwareFleet';
import { WhyChoose } from './WhyChoose';

const scanToBimFAQs = [
  {
    q: "What is the difference between LOD 300 and LOD 400?",
    a: "LOD 300 is a design-intent model, accurate in terms of quantity, size, shape, and location. LOD 400 adds fabrication-level detail, including assembly information, precise connections, and installation data, making it ready for prefabrication."
  },
  {
    q: "Can you model from existing 2D drawings instead of scans?",
    a: "Yes, we can create BIM models from 2D CAD or PDF drawings (Scan-to-CAD/BIM conversion). However, laser scanning provides a much higher level of accuracy and captures current as-built conditions that drawings may miss."
  },
  {
    q: "What software do you use for modeling?",
    a: "We primarily use Autodesk Revit for BIM modeling. We also utilize Navisworks for clash detection and coordination, and can export to various formats compatible with other software suites."
  },
  {
    q: "How do you handle large file sizes?",
    a: "We use advanced data management techniques to handle large point cloud and model files. We can deliver files via secure cloud links, physical hard drives, or integrate directly into your CDE (Common Data Environment)."
  }
];

const ScanToBimPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-accent selection:text-brand-dark">
      <Header />
      
      <main>
        <Hero />
        <ScanToBimSliderSection />
        <FlatPackComparison />
        <LODToggle />
        <HardwareFleet />
        <WhyChoose />
        <FAQ items={scanToBimFAQs} title="Scan to BIM FAQs" />
      </main>

      <Footer />
    </div>
  );
};

export default ScanToBimPage;
