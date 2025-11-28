
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, CheckCircle, Send, Loader2 } from 'lucide-react';
import { getUserLocation, getNearestCity } from '../utils/location';
import PhoneInput from './PhoneInput';
import Select from './Select';
import { supabase } from '../lib/supabaseClient';
import gsap from 'gsap';

const FIRM_TYPES = [
  "Administration", "Architect", "BIM Manager", "Builder", "Business", "C-Level", 
  "CAD Manager", "CAE Analyst", "Civil Engineer", "Construction Manager", "Contractor", 
  "Designer", "Developer", "Director", "Drafter", "Electrical Contractor", 
  "Electrical Engineer", "Electrical Subcontractors", "Engineer", "Estimator", 
  "Fabricator", "Facility Maintenance", "Facilities Manager", "Fire Protection Contractor", 
  "Fire Protection Designer", "Fire Protection Engineer", "Fire Protection Subcontractors", 
  "General Contractor", "Industrial Designer", "Installer", "Interior Designer", 
  "IT Manager", "Landscape Architect", "Machinist", "Manager", "Manufacturer", 
  "Mechanical Contractor", "Mechanical Engineer", "Mechanical, Electrical & Plumbing Contractors", 
  "Mechanical, Electrical & Plumbing Designers", "Mechanical, Electrical & Plumbing Trades", 
  "Mechanical, Electrical & Plumbing Subcontractors", "Mechanical Subcontractor", 
  "Modeler", "Non-Manager", "Owner", "Plumbing Contractor", "Plumbing Engineer", 
  "Plumbing Subcontractors", "President", "Project Manager", "Research & Development", 
  "Sales Manager", "Structural Engineer", "Subcontractors", "VDC Manager", "VP-Level", "Other"
];

const DISCIPLINES = [
  "Architectural", "Civil", "Electrical", "Electrical High Voltage", "Electrical Low Voltage", 
  "Electrical Low & High Voltage", "Fire Protection", "Glazing", "Landscaping", "Mechanical", 
  "Mechanical Ducting", "Mechanical Piping", "Piping", "Plumbing", "Process Piping", 
  "Structural", "Other"
];

const INDUSTRIES = [
  "Airport", "Advertising, Publishing and Graphic Design", "Aerospace and Defense Equipment", 
  "Architecture Services", "Assisted Living", "Building Products and Fabrication", 
  "Building Construction", "Casino", "Civil Infrastructure", "Commercial", "Construction Services", 
  "Consumer Products", "Creators", "Education", "Engineering Service Providers", "Entertainment", 
  "Fabrication", "Family", "Film and TV", "Games", "Governmental", "Healthcare", "Hospital", 
  "Industrial", "Industrial Machinery", "Manufacturer", "Military", "Mining", "Municipality", 
  "Multi-family", "Oil and Gas", "Process Manufacturing", "Product Development", 
  "Research & Development", "Residential", "Single Family", "Utilities and Telecom", "Other"
];

const SERVICES = [
  "Laser Scanning", "BIM Modeling", "CAD Drafting", "3D Modeling"
];

const BIM_SERVICES = [
  "BIM Modeling, Coordination, Shop Drawing & As-Built", "Laser Scanning to BIM", 
  "BIM Custom Family Modeling", "BIM Foodservice", "BIM Revit Building Information Modeling", 
  "Revit As-Built", "Revit Coordination", "Revit Custom Family Modeling", 
  "Scan to BIM Modeling", "BIM Modeling", "BIM Coordination", "BIM Shop Drawings", "BIM As-Built"
];

const CAD_SERVICES = [
  "AutoCAD Detailing", "AutoCAD Drafting", "CAD Conversion", "CAD Detailing", 
  "CAD Drafting", "CAD Foodservice", "CAD Remastering", "Paper to CAD Conversion", 
  "Laser Scanning to CAD"
];

const THREE_D_MODELING_SERVICES = [
  "3D Printing", "Carbon DLS", "Metal 3D Printing", "Multi-Jet Fusion", "PolyJet", 
  "Selective Laser Sintering", "Stereolithography", "3D Inventor, Modeling, Drafting, Detailing and Design", 
  "3D SolidWorks Modeling, Drafting, Detailing & Design", "3D Revit BIM Modeling, Coordination, Shop Drawings & As-Builts", 
  "Laser Scanning to 3D", "CREO", "CATIA"
];

const ContactSection: React.FC = () => {
  const [contactInfo, setContactInfo] = useState({
    address: '123 Innovation Drive,<br/>New York, NY 10001',
    phone: '(213) 571-9077'
  });

  const [formData, setFormData] = useState({
    firstNameLastName: '',
    email: '',
    landline: '',
    ext: '',
    cell: '',
    companyName: '',
    firmType: '',
    discipline: '',
    industry: '',
    service: '',
    subService: '',
    scopeOfWork: '',
    inputs: '',
    botField: '' // Honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mountTime, setMountTime] = useState(0);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMountTime(Date.now());
    const initLocation = async () => {
      const location = await getUserLocation();
      if (location) {
        const nearestCity = getNearestCity(location.latitude, location.longitude);
        if (nearestCity) {
          setContactInfo({
            address: nearestCity.Address || '123 Innovation Drive,<br/>New York, NY 10001',
            phone: nearestCity.PresentedNumber || '(213) 571-9077'
          });
        }
      }
    };

    initLocation();
  }, []);

  useEffect(() => {
    if (isSubmitted && successRef.current) {
      gsap.fromTo(successRef.current, 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [isSubmitted]);

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      service: e.target.value,
      subService: '' // Reset sub-service when service changes
    });
  };

  const getSubServices = () => {
    switch (formData.service) {
      case "BIM Modeling": return BIM_SERVICES;
      case "CAD Drafting": return CAD_SERVICES;
      case "3D Modeling": return THREE_D_MODELING_SERVICES;
      default: return [];
    }
  };

  const subServices = getSubServices();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Spam Protection Checks
    
    // 1. Honeypot check: If botField has a value, it's a bot.
    if (formData.botField) {
      console.log('Bot detected: Honeypot filled');
      return; // Silent rejection
    }

    // 2. Time-based check: If submitted too quickly (< 3 seconds), it's likely a bot.
    if (Date.now() - mountTime < 3000) {
      console.log('Bot detected: Submission too fast');
      return; // Silent rejection
    }

    // 3. Rate Limiting (Client-side): 10 submissions per hour
    const HOURLY_LIMIT = 10;
    const ONE_HOUR = 60 * 60 * 1000;
    const now = Date.now();

    let start = parseInt(localStorage.getItem('submissionStart') || '0');
    let count = parseInt(localStorage.getItem('submissionCount') || '0');

    // Reset if window expired or invalid
    if (start === 0 || (now - start > ONE_HOUR)) {
      start = now;
      count = 0;
      localStorage.setItem('submissionStart', start.toString());
      localStorage.setItem('submissionCount', '0');
    }

    // Check limit
    if (count >= HOURLY_LIMIT) {
      alert('You have reached the maximum number of submissions (10) for this hour. Please try again later.');
      return;
    }

    // Confirmation for subsequent submissions
    if (count > 0) {
      if (!window.confirm('You have already submitted a request. Do you want to submit another?')) {
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            first_name_last_name: formData.firstNameLastName,
            email: formData.email,
            mobile_phone: formData.cell,
            office_phone: formData.landline,
            extension: formData.ext,
            company_name: formData.companyName,
            firm_type: formData.firmType,
            discipline: formData.discipline,
            industry: formData.industry,
            service: formData.service,
            sub_service: formData.subService,
            scope_of_work: formData.scopeOfWork,
            inputs: formData.inputs
          }
        ]);

      if (error) throw error;

      // Increment count on success
      localStorage.setItem('submissionCount', (count + 1).toString());

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  <p 
                    className="text-gray-400 text-sm"
                    dangerouslySetInnerHTML={{ __html: contactInfo.address }}
                  />
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="text-brand-accent" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Phone</h4>
                  <p className="text-gray-400 text-sm">{contactInfo.phone}</p>
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
          <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-2xl min-h-[600px] flex flex-col justify-center">
            {isSubmitted ? (
              <div ref={successRef} className="text-center space-y-6">
                <div className="w-20 h-20 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-brand-accent" />
                </div>
                <h3 className="font-display text-3xl font-bold text-white">Message Sent!</h3>
                <p className="text-gray-400 text-lg max-w-sm mx-auto">
                  Thank you for reaching out. Our team will review your project details and get back to you within 24 hours.
                </p>
                <button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      firstNameLastName: '',
                      email: '',
                      landline: '',
                      ext: '',
                      cell: '',
                      companyName: '',
                      firmType: '',
                      discipline: '',
                      industry: '',
                      service: '',
                      subService: '',
                      scopeOfWork: '',
                      inputs: ''
                    });
                  }}
                  className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl font-bold text-white mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Honeypot Field - Hidden from real users */}
                  <div className="opacity-0 absolute top-0 left-0 h-0 w-0 overflow-hidden z-[-1]">
                    <input
                      type="text"
                      name="website_url" // Innocuous name
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.botField}
                      onChange={(e) => setFormData({...formData, botField: e.target.value})}
                    />
                  </div>

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-gray-500 tracking-wider">First Name & Last Name *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-brand-accent focus:outline-none transition-colors" 
                        placeholder="First Name & Last Name"
                        value={formData.firstNameLastName}
                        onChange={(e) => setFormData({...formData, firstNameLastName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-mono uppercase text-gray-500 tracking-wider">Email Address *</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-brand-accent focus:outline-none transition-colors" 
                        placeholder="Email Address" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Contact Numbers Section */}
                  <div className="space-y-6">
                    
                    {/* Mobile Phone */}
                    <PhoneInput 
                      label="Mobile Phone *"
                      value={formData.cell}
                      onChange={(val) => setFormData({...formData, cell: val})}
                      placeholder="(555) 000-0000"
                    />

                    {/* Office Phone & Extension */}
                    <div className="flex gap-4">
                      <div className="flex-grow">
                        <PhoneInput 
                          label="Office Phone & Extension"
                          value={formData.landline}
                          onChange={(val) => setFormData({...formData, landline: val})}
                          placeholder="(555) 000-0000"
                        />
                      </div>
                      <div className="w-24 space-y-2">
                        <label className="text-xs font-mono uppercase text-gray-500 tracking-wider">Ext.</label>
                        <input 
                          type="text" 
                          className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-brand-accent focus:outline-none transition-colors" 
                          placeholder="123"
                          value={formData.ext}
                          onChange={(e) => setFormData({...formData, ext: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Company Name & Firm Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-gray-500 tracking-wider">Company Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-brand-accent focus:outline-none transition-colors" 
                        placeholder="Company Name"
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                       <Select 
                        label="Firm Type(s)"
                        value={formData.firmType}
                        onChange={(val) => setFormData({...formData, firmType: val})}
                        options={FIRM_TYPES}
                        placeholder="Select Firm Type"
                       />
                    </div>
                  </div>

                  {/* Row 4: Discipline & Industry */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Select 
                        label="Discipline(s)"
                        value={formData.discipline}
                        onChange={(val) => setFormData({...formData, discipline: val})}
                        options={DISCIPLINES}
                        placeholder="Select Discipline"
                      />
                    </div>
                    <div className="space-y-2">
                       <Select 
                        label="Industry(s)"
                        value={formData.industry}
                        onChange={(val) => setFormData({...formData, industry: val})}
                        options={INDUSTRIES}
                        placeholder="Select Industry"
                       />
                    </div>
                  </div>

                  {/* Row 5: Service */}
                  <div className="space-y-2">
                      <Select 
                        label="Service(s)"
                        value={formData.service}
                        onChange={(val) => {
                          setFormData({
                            ...formData,
                            service: val,
                            subService: '' // Reset sub-service when service changes
                          });
                        }}
                        options={SERVICES}
                        placeholder="Select Service"
                      />
                  </div>

                  {/* Row 6: Sub-Service (Conditional) */}
                  {subServices.length > 0 && (
                    <div className="space-y-2">
                        <Select 
                          label={`${formData.service} Service(s)`}
                          value={formData.subService}
                          onChange={(val) => setFormData({...formData, subService: val})}
                          options={subServices}
                          placeholder={`Select ${formData.service} Service`}
                        />
                    </div>
                  )}

                  {/* Row 7: Scope & Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-gray-500 tracking-wider">Scope of work</label>
                        <textarea 
                          className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-brand-accent focus:outline-none transition-colors h-32 resize-none" 
                          placeholder="Scope of work"
                          value={formData.scopeOfWork}
                          onChange={(e) => setFormData({...formData, scopeOfWork: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-gray-500 tracking-wider">Input(s)</label>
                        <textarea 
                          className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-brand-accent focus:outline-none transition-colors h-32 resize-none" 
                          placeholder="Input(s)"
                          value={formData.inputs}
                          onChange={(e) => setFormData({...formData, inputs: e.target.value})}
                        />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-brand-accent transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        Send Request
                        <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  
                  <p className="text-xs text-center text-gray-600">
                    By submitting this form, you agree to our privacy policy.
                  </p>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;

