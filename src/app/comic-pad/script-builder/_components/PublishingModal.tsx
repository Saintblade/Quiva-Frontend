"use client";
import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import PublishingStep2 from "./PublishingStep2";
import PublishingStep3 from "./PublishingStep3";
import PublishingStep4 from "./PublishingStep4";

interface PublishingModalProps {
  onClose: () => void;
}

const PublishingModal = ({ onClose }: PublishingModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // ✅ collect form data here
  const [formData, setFormData] = useState({
    title: "",
    episodeTitle: "",
    description: "",
    coverUrl: "",
    accessType: "Free" as "Free" | "PayPerRead",
    price: 0,
    nftEnabled: false,
    nftEditionSize: 0,
    nftPrice: 0,
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("✅ Comic published successfully!", formData);
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBackToEditor = () => {
    onClose();
  };

<<<<<<< HEAD
  // Progress dots
  const StepDots = () => (
    <div className="flex justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            i + 1 === currentStep
              ? "bg-orange-500 scale-110"
              : i + 1 < currentStep
              ? "bg-orange-500/60"
              : "bg-white/30"
          }`}
        ></div>
      ))}
    </div>
  );
=======
  const renderStep1 = () => (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 pt-6 pb-10 text-white text-center">
      {/* Step Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition ${
              i + 1 === currentStep ? "bg-secondary-300" : i + 1 < currentStep ? "bg-secondary-300/60" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>
>>>>>>> d3c799bb12e64ee44cbdb21913956319d49d369c

  // Step 1 - Review
  const renderStep1 = () => (
    <div className="max-w-3xl w-full mx-auto px-6 pt-8 pb-12 text-white text-center animate-fadeIn">
      <StepDots />

      <h3 className="text-2xl sm:text-3xl font-bold mb-6">
        Give your masterpiece one more look ✨
      </h3>

      <div className="flex justify-center mb-8">
        <Image
          src="/dev_images/mobile-progress-1.png"
          alt="Publishing Preview"
          width={400}
          height={300}
          className="rounded-2xl w-full max-w-lg h-auto border border-white/20 shadow-lg"
        />
      </div>

      <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
        Before we publish your amazing comic to the marketplace, take a moment to
        review your work. Make sure your story, artwork, dialogue, and layout are
        exactly how you want them. Once published, your comic will be available
        for readers to discover and enjoy!
      </p>

      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <button
          onClick={handleNext}
          className="w-full bg-secondary-300 text-black font-bold py-4 px-8 rounded-2xl shadow-lg transition-none text-lg"
        >
          Next
        </button>

        <button
          onClick={handleBackToEditor}
          className="w-full bg-transparent hover:bg-white/10 text-white/70 hover:text-white font-medium py-4 px-8 rounded-2xl border border-white/20 transition"
        >
          Back to Editor
        </button>
      </div>
    </div>
  );

<<<<<<< HEAD
  // Step Renderer
=======
  const renderStepPlaceholder = (stepNumber: number) => (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 pt-6 pb-10 text-white text-center">
      {/* Step Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition ${
              i + 1 === currentStep ? "bg-secondary-300" : i + 1 < currentStep ? "bg-secondary-300/60" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>

      <h3 className="text-2xl sm:text-3xl font-bold mb-8">
        Step {stepNumber} - Coming Soon
      </h3>

      <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
        This step will be implemented next. For now, you can navigate between steps to see the flow.
      </p>

      <div className="flex flex-col gap-4 max-w-md mx-auto">
        {stepNumber < totalSteps ? (
          <button
            onClick={handleNext}
            className="w-full bg-secondary-300 text-black font-bold py-4 px-8 rounded-2xl shadow-lg transition-none text-lg"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-8 rounded-2xl shadow-lg transition text-lg"
          >
            Publish Comic
          </button>
        )}
        
        <button
          onClick={handleBack}
          className="w-full bg-transparent hover:bg-white/10 text-white/70 hover:text-white font-medium py-4 px-8 rounded-2xl border border-white/20 transition"
        >
          Back
        </button>
      </div>
    </div>
  );

>>>>>>> d3c799bb12e64ee44cbdb21913956319d49d369c
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return (
          <PublishingStep2
            onNext={handleNext}
            onBack={handleBack}
            setFormData={setFormData}
            formData={formData}
          />
        );
      case 3:
        return (
          <PublishingStep3
            onNext={handleNext}
            onBack={handleBack}
            setFormData={setFormData}
            formData={formData}
          />
        );
      case 4:
        return (
          <PublishingStep4
            onPublish={() => {
              console.log("✅ Comic published!", formData);
              onClose();
            }}
            onBack={handleBack}
            formData={formData} // ✅ pass data here
          />
        );
      default:
        return renderStep1();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-zinc-950 to-black border border-white/20 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition"
        >
          <X size={22} className="text-white" />
        </button>

        {/* Render current step */}
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default PublishingModal;
