import React, { useState, useContext } from "react";
// @ts-ignore - Context will be resolved when files are moved/fixed
import { EstimateProvider, EstimateContext } from "./context/EstimateContext";
// @ts-ignore
import Header from "../Header";
// @ts-ignore
import { Stepper } from "./components/Stepper";
// @ts-ignore
import { ModelViewer } from "./components/ModelViewer";
// @ts-ignore
import { LocationMap } from "./components/LocationMap";
// @ts-ignore
import { EstimateCard } from "./components/EstimateCard";
// @ts-ignore
import { FormNavigation } from "./components/FormNavigation";
// @ts-ignore
import { Step1_ServiceSelection } from "./steps/Step1_ServiceSelection";
// @ts-ignore
import { Step2_LocationDetails } from "./steps/Step2_LocationDetails";
// @ts-ignore
import { Step3_ProjectDetails } from "./steps/Step3_ProjectDetails";
// @ts-ignore
import { Step4_ConfigureProject } from "./steps/Step4_ConfigureProject";
// @ts-ignore
import { Step5_ScanDates } from "./steps/Step5_ScanDates";
// @ts-ignore
import { Step6_EstimateSummary } from "./steps/Step6_EstimateSummary";
import { LoadScript } from "@react-google-maps/api";
// @ts-ignore
import { supabase } from "../../lib/supabaseClient";

const libraries: ("places")[] = ["places"];

const AppContent = () => {
  const [step, setStep] = useState(1);
  // @ts-ignore
  const { formData, estimate, resetFormData } = useContext(EstimateContext);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const submissionData = {
        service: formData.service,
        address: formData.address,
        total_area: formData.totalArea,
        floors: formData.floors,
        space_type: formData.spaceType,
        scopes: formData.scopes,
        complex_mepf: formData.complexMEPF,
        exterior_modelling: formData.exteriorModelling,
        project_controls: formData.projectControls,
        revit_version: formData.revitVersion,
        preferred_unit: formData.preferredUnit,
        scan_date_1: formData.scanDate1,
        scan_date_2: formData.scanDate2 || null,
        coi_required: formData.coiRequired,
        user_email: email,
        estimate_price: estimate.price,
        estimate_delivery: estimate.delivery,
        project_name: formData.projectName,
      };
      
      // Supabase integration
      const { error: dbError } = await supabase
        .from("estimates")
        .insert([submissionData]);
      
      if (dbError) throw dbError;
      
      const { error: functionError } = await supabase.functions.invoke(
        "send-estimate-email",
        { body: { user_email: email, formData: formData, estimate: estimate } }
      );
      
      if (functionError) {
        console.warn("Email function error:", functionError);
        // Don't throw - we still want to show success if data was saved
      }
      
      console.log("Submission successful:", submissionData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting estimate:", error);
      // @ts-ignore
      alert(`There was a problem submitting your estimate: ${error.message || JSON.stringify(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleExit = () => {
    resetFormData();
    setStep(1);
    setIsSubmitted(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1_ServiceSelection onNext={handleNext} />;
      case 2:
        return <Step2_LocationDetails onNext={handleNext} />;
      case 3:
        return <Step3_ProjectDetails onNext={handleNext} />;
      case 4:
        return <Step4_ConfigureProject onNext={handleNext} />;
      case 5:
        return <Step5_ScanDates onNext={handleNext} />;
      case 6:
        return <Step6_EstimateSummary />;
      default:
        return <p>Step not found</p>;
    }
  };

  // --- THIS FUNCTION CONTAINS THE UPDATED LOGIC ---
  const renderRightColumn = () => {
    if (step === 2) {
      return <LocationMap />;
    }
    if (step === 6) {
      return (
        <div className="flex flex-col gap-6 h-full">
          <div className="h-64 lg:h-auto lg:flex-grow lg:min-h-0">
            <LocationMap />
          </div>
          <DeliverablesCard />
          <SubmissionCard
            estimate={estimate}
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            isLoading={isLoading}
            isSubmitted={isSubmitted}
          />
        </div>
      );
    }
    // For steps 3, 4, 5, show both the model and the estimate card
    if (step >= 3) {
      return (
        <div className="space-y-6">
          <ModelViewer />
          <EstimateCard />
        </div>
      );
    }
    // For step 1, only show the model viewer
    return <ModelViewer />;
  };

  const getActiveStepperStep = () => {
    if (isSubmitted) return 5;
    if (step <= 2) return step;
    if (step >= 3 && step <= 5) return 3;
    if (step === 6) return 4;
    return 5;
  };

  return (
    <div className="flex flex-col h-screen bg-brand-dark font-sans text-white overflow-hidden">
      <Header />
      <main className="flex-1 flex flex-col items-center w-full pt-32 pb-8 overflow-y-auto custom-scrollbar">
        <div className="w-full mb-8 px-4">
          <Stepper currentStep={getActiveStepperStep()} />
        </div>
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 pb-12">
          <div className="glass-panel p-8 rounded-lg shadow-2xl h-min backdrop-blur-xl bg-white/5 border border-white/10">
            {step > 1 && (
              <FormNavigation
                currentStep={step}
                onBack={handleBack}
                onExit={handleExit}
              />
            )}
            {renderStep()}
          </div>
          <div className="h-96 lg:h-auto">{renderRightColumn()}</div>
        </div>
      </main>
    </div>
  );
};

const DeliverablesCard = () => {
  const deliverables = [
    ".RVT Model",
    ".RCS Point Cloud",
    ".XLS Take Offs",
    "DWG Floor Plans",
    "Virtual Tours",
    "Free Web Viewer",
  ];
  return (
    <div className="glass-panel p-6 rounded-lg border border-white/10 shadow-lg bg-white/5">
      <h3 className="font-display font-semibold text-white mb-4 tracking-wide">Deliverables</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-400">
        {deliverables.map((item) => (
          <li key={item} className="list-disc list-inside marker:text-brand-accent">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
// @ts-ignore
const SubmissionCard = ({
  estimate,
  handleSubmit,
  email,
  setEmail,
  isLoading,
  isSubmitted,
}: any) => (
  <div className="glass-panel p-6 rounded-lg border border-white/10 shadow-lg bg-white/5">
    <div className="bg-black/40 border border-white/10 p-4 rounded-lg flex justify-between items-center mb-6">
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider">Estimated Pricing</p>
        <p className="text-3xl font-bold text-brand-accent font-display">
          ${estimate.price.toLocaleString()}
        </p>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-500 uppercase tracking-wider">Estimated Delivery</p>
        <p className="font-semibold text-white text-lg">
          {estimate.delivery}
        </p>
      </div>
    </div>
    {isSubmitted ? (
      <div className="text-center p-4 bg-brand-accent/10 border border-brand-accent/20 text-brand-accent rounded-lg">
        Thank you! Your estimate has been submitted.
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email to place the order"
          className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-brand-accent focus:outline-none transition-colors"
        />
        <button
          onClick={handleSubmit}
          disabled={!email || isLoading}
          className="w-full bg-brand-accent text-black font-bold py-3 px-4 rounded-lg hover:bg-white transition-colors disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
        >
          {isLoading ? "Submitting..." : "Get your free estimate"}
        </button>
      </div>
    )}
  </div>
);

const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-brand-dark text-white">
    <div className="relative w-16 h-16 mb-4">
      <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-brand-accent rounded-full border-t-transparent animate-spin"></div>
    </div>
    <p className="font-display text-lg tracking-widest animate-pulse">LOADING ESTIMATOR</p>
  </div>
);

export default function EstimatorPage() {
  const [mapsLoaded, setMapsLoaded] = React.useState(false);
  const [mapsError, setMapsError] = React.useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  // If maps fails to load, show content anyway after 500ms
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (!mapsLoaded) {
        setMapsError(true);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [mapsLoaded]);

  // If no API key, render without Maps
  if (!apiKey) {
    return (
      <EstimateProvider>
        <AppContent />
      </EstimateProvider>
    );
  }

  // Always render content immediately, let Maps load in background
  return (
    <EstimateProvider>
      <LoadScript
        googleMapsApiKey={apiKey}
        libraries={libraries}
        onLoad={() => setMapsLoaded(true)}
        onError={() => setMapsError(true)}
      >
        <AppContent />
      </LoadScript>
    </EstimateProvider>
  );
}
