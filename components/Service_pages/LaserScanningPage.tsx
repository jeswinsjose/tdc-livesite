import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import FAQ from '../FAQ';
import { LaserScanningHero } from './LaserScanningHero';
import { ValueProposition } from './ValueProposition';
import { RiskCalculator } from './RiskCalculator';
import { HardwareFleet } from './HardwareFleet';
import { WhyChoose } from './WhyChoose';

const laserScanningFAQs = [
  {
    q: "What is the typical accuracy of your laser scans?",
    a: "Our survey-grade scanners (Leica P-Series, Faro Focus) typically achieve accuracies between 2mm and 4mm, depending on the range and environmental conditions. This level of precision is ideal for as-built documentation and clash detection."
  },
  {
    q: "Can you scan active construction sites?",
    a: "Yes, our teams are experienced in working on active sites. We coordinate closely with site superintendents to minimize disruption and ensure safety while capturing the necessary data."
  },
  {
    q: "What deliverables do I get from a laser scan?",
    a: "The primary deliverable is a registered point cloud (in formats like .RCP, .E57, .PTS). We can also provide a Revit model (LOD 200-500), 2D CAD drawings, or a Navisworks file for coordination."
  },
  {
    q: "How long does it take to scan a facility?",
    a: "Scanning time varies based on size and complexity. A typical mechanical room might take half a day, while a 100,000 sq ft warehouse could take 2-3 days. We can provide a specific timeline with your quote."
  }
];

const LaserScanningPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-accent selection:text-brand-dark">
      <Header />
      
      <main>
        <LaserScanningHero />
        <ValueProposition />
        <RiskCalculator />
        <HardwareFleet />
        <WhyChoose />
        <FAQ items={laserScanningFAQs} title="Laser Scanning FAQs" />
      </main>

      <Footer />
    </div>
  );
};

export default LaserScanningPage;
