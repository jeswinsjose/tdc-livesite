import { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'future-of-scan-to-bim',
    title: 'The Future of Scan-to-BIM: Automating Reality Capture',
    excerpt: 'How AI and machine learning are revolutionizing the conversion of point clouds into LOD 400 Revit models, reducing manual drafting time by 40%.',
    content: `
      <h2 class="text-2xl font-bold mb-4 text-white">The Evolution of Point Clouds</h2>
      <p class="mb-6 text-gray-300 leading-relaxed">
        Laser scanning has long been the gold standard for capturing existing conditions. However, the bottleneck has always been the "Scan-to-BIM" process—manually tracing millions of points into intelligent geometry. Today, we stand on the precipice of a new era where automated feature extraction is reshaping our workflows.
      </p>
      
      <h3 class="text-xl font-semibold mb-3 text-white">Why AI Matters in Drafting</h3>
      <p class="mb-6 text-gray-300 leading-relaxed">
        By leveraging computer vision algorithms, we can now classify structural elements from raw point cloud data with unprecedented accuracy. This isn't just about speed; it's about eliminating human error in complex MEP coordination.
      </p>

      <blockquote class="border-l-4 border-tdc-cyan pl-4 italic text-gray-400 my-8">
        "The shift from manual tracing to algorithmic interpretation allows architects to focus on design intent rather than geometric reconstruction."
      </blockquote>

      <h3 class="text-xl font-semibold mb-3 text-white">Level of Development (LOD) Implications</h3>
      <p class="mb-6 text-gray-300 leading-relaxed">
        Achieving LOD 400 requires a granularity that manual modeling struggles to maintain consistently. Automated tools ensure that every flange, hanger, and conduit is modeled to exact specifications derived directly from the physical reality.
      </p>
    `,
    date: 'Dec 01, 2025',
    readTime: '5 min read',
    category: 'Technology',
    tags: ['BIM', '3D Scanning', 'AI'],
    image: 'https://picsum.photos/id/48/800/600',
    author: {
      name: 'Sarah Al-Fayed',
      role: 'Director of VDC',
      avatar: 'https://picsum.photos/id/64/100/100'
    }
  },
  {
    id: '2',
    slug: 'optimizing-mep-coordination',
    title: 'Optimizing MEP Coordination in High-Rise Retrofits',
    excerpt: 'Navigating the complexities of mechanical systems in historic buildings using advanced clash detection strategies.',
    content: `
      <h2 class="text-2xl font-bold mb-4 text-white">The Challenge of Historic Structures</h2>
      <p class="mb-6 text-gray-300 leading-relaxed">
        Retrofitting high-rise buildings with modern mechanical, electrical, and plumbing (MEP) systems presents a unique set of challenges. Unlike new construction, where shafts and plenums are designed around the systems, historic structures often have limited ceiling heights and irregular structural bays.
      </p>

      <h3 class="text-xl font-semibold mb-3 text-white">Laser Scanning as a Foundation</h3>
      <p class="mb-6 text-gray-300 leading-relaxed">
        The first step in any successful retrofit is accurate reality capture. By deploying terrestrial laser scanners, we create a millimeter-accurate point cloud of the existing shell. This allows our coordination team to visualize tight squeezes and identify potential clashes before a single duct is fabricated.
      </p>

      <blockquote class="border-l-4 border-tdc-cyan pl-4 italic text-gray-400 my-8">
        "Clash detection isn't just about finding collisions; it's about optimizing the route for constructability and future maintenance."
      </blockquote>

      <h3 class="text-xl font-semibold mb-3 text-white">Advanced Clash Detection Strategies</h3>
      <p class="mb-6 text-gray-300 leading-relaxed">
        Using Navisworks and automated clash grouping scripts, we can filter out "soft clashes" (like insulation touching) from "hard clashes" (ducts hitting beams). This prioritization is critical in high-rise retrofits where every inch of vertical space is valuable real estate.
      </p>
    `,
    date: 'Nov 28, 2025',
    readTime: '8 min read',
    category: 'BIM',
    tags: ['Revit', 'MEP', 'Construction'],
    image: 'https://picsum.photos/id/201/800/600',
    author: {
      name: 'Mike Ross',
      role: 'Lead Engineer',
      avatar: 'https://picsum.photos/id/91/100/100'
    }
  },
  {
    id: '3',
    slug: 'generative-design-residential',
    title: 'Generative Design Patterns in Residential Real Estate',
    excerpt: 'Using algorithmic design to maximize floor area ratios and sunlight exposure in dense urban environments.',
    content: `
      <h2 class="text-2xl font-bold mb-4 text-white">Beyond Parametricism</h2>
      <p class="mb-6 text-gray-300 leading-relaxed">
        Generative design is moving beyond simple parametric shapes into solving complex multi-objective optimization problems. In residential real estate, this means balancing density, sunlight access, and unit mix to maximize both ROI and livability.
      </p>

      <h3 class="text-xl font-semibold mb-3 text-white">Optimizing for Sunlight and Views</h3>
      <p class="mb-6 text-gray-300 leading-relaxed">
        By setting up algorithms that test thousands of massing iterations, we can find the "Pareto frontier" of design options. For a recent project in a dense urban core, our scripts identified a stepped-massing strategy that increased the number of units with direct sunlight by 30% compared to the traditional extrusion model.
      </p>

      <blockquote class="border-l-4 border-tdc-cyan pl-4 italic text-gray-400 my-8">
        "The computer doesn't replace the designer; it acts as a tireless apprentice, testing thousands of options to find the hidden gems."
      </blockquote>

      <h3 class="text-xl font-semibold mb-3 text-white">Automated Floor Plan Layouts</h3>
      <p class="mb-6 text-gray-300 leading-relaxed">
        Once the massing is set, generative scripts can subdivide floor plates into compliant unit mixes. This allows developers to quickly test different scenarios—more studios vs. more two-bedrooms—and instantly see the impact on the pro forma.
      </p>
    `,
    date: 'Nov 15, 2025',
    readTime: '6 min read',
    category: 'Technology',
    tags: ['Generative Design', 'Residential', 'Architecture'],
    image: 'https://picsum.photos/id/227/800/600',
    author: {
      name: 'Aria Chen',
      role: 'Design Lead',
      avatar: 'https://picsum.photos/id/41/100/100'
    }
  },
  {
    id: '4',
    slug: 'sustainable-materials-database',
    title: 'Building a Data-Driven Material Passport',
    excerpt: 'How BIM integration tracks embodied carbon from cradle to gate, enabling truly sustainable architectural decisions.',
    content: `
      <h2 class="text-2xl font-bold mb-4 text-white">The Carbon Impact of Construction</h2>
      <p class="mb-6 text-gray-300 leading-relaxed">
        The built environment is responsible for nearly 40% of global carbon emissions. While operational carbon (energy used to run buildings) has decreased, embodied carbon (emissions from materials) remains a critical blind spot. To tackle this, we need granular data.
      </p>

      <h3 class="text-xl font-semibold mb-3 text-white">Material Passports Explained</h3>
      <p class="mb-6 text-gray-300 leading-relaxed">
        A Material Passport is a digital dataset describing characteristics of materials in a product that give them value for recovery and reuse. By integrating this into our BIM workflows, we create a "nutrition label" for every beam, column, and finish in the building.
      </p>

      <blockquote class="border-l-4 border-tdc-cyan pl-4 italic text-gray-400 my-8">
        "We can't manage what we don't measure. BIM gives us the framework to track every kilogram of CO2 from the quarry to the job site."
      </blockquote>

      <h3 class="text-xl font-semibold mb-3 text-white">Cradle-to-Gate Tracking</h3>
      <p class="mb-6 text-gray-300 leading-relaxed">
        Using API connections to databases like EC3 (Embodied Carbon in Construction Calculator), our Revit models now pull live Environmental Product Declaration (EPD) data. This allows architects to swap out concrete mixes or steel suppliers in real-time to see the immediate impact on the project's carbon footprint.
      </p>
    `,
    date: 'Nov 10, 2025',
    readTime: '4 min read',
    category: 'Sustainability',
    tags: ['Green Building', 'Data', 'Materials'],
    image: 'https://picsum.photos/id/180/800/600',
    author: {
      name: 'John Doe',
      role: 'Sustainability Consultant',
      avatar: 'https://picsum.photos/id/55/100/100'
    }
  },
  {
    id: '5',
    slug: 'digital-twins-facility-management',
    title: 'From Handover to Operations: The Digital Twin Lifecycle',
    excerpt: 'Why the model shouldn\'t die at construction completion. Strategies for maintaining a living digital asset.',
    content: `
      <h2 class="text-2xl font-bold mb-4 text-white">The Information Gap</h2>
      <p class="mb-6 text-gray-300 leading-relaxed">
        Traditionally, the rich data developed during the BIM process is lost at handover. The "as-built" model is often archived, and facility managers are handed a stack of PDFs. This is a massive waste of intelligence.
      </p>

      <h3 class="text-xl font-semibold mb-3 text-white">Connecting BIM to CAFM</h3>
      <p class="mb-6 text-gray-300 leading-relaxed">
        A Digital Twin bridges this gap by connecting the 3D geometry of the BIM to the live data of Computer-Aided Facility Management (CAFM) systems. Instead of searching through binders for an equipment manual, a technician can click on a pump in the 3D viewer and see its maintenance history, warranty info, and live sensor readings.
      </p>

      <blockquote class="border-l-4 border-tdc-cyan pl-4 italic text-gray-400 my-8">
        "A building is a living organism. Its digital twin should breathe with it, reflecting real-time performance and condition."
      </blockquote>

      <h3 class="text-xl font-semibold mb-3 text-white">Predictive Maintenance</h3>
      <p class="mb-6 text-gray-300 leading-relaxed">
        With IoT sensors feeding data back into the Digital Twin, we can move from reactive to predictive maintenance. Anomalies in vibration or temperature can trigger work orders automatically, preventing catastrophic failures and extending the lifespan of building assets.
      </p>
    `,
    date: 'Oct 22, 2025',
    readTime: '7 min read',
    category: 'Case Studies',
    tags: ['Digital Twins', 'Facility Management', 'IoT'],
    image: 'https://picsum.photos/id/250/800/600',
    author: {
      name: 'Sarah Al-Fayed',
      role: 'Director of VDC',
      avatar: 'https://picsum.photos/id/64/100/100'
    }
  }
];