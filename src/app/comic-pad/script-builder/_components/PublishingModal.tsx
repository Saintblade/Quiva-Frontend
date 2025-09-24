"use client";
import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface FormData {
  title: string;
  episodeTitle: string;
  description: string;
  coverUrl: string;
  accessType: "Free" | "PayPerRead";
  price: number;
  nftEnabled: boolean;
  nftEditionSize: number;
  nftPrice: number;
}

interface PublishingModalProps {
  onClose: () => void;
}

const PublishingModal = ({ onClose }: PublishingModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    episodeTitle: "",
    description: "",
    coverUrl: "",
    accessType: "Free",
    price: 0,
    nftEnabled: false,
    nftEditionSize: 0,
    nftPrice: 0,
  });
  const totalSteps = 4;

  // Step navigation handlers - same pattern as UserProfileFlowModal
  const handleStep1Next = () => {
    console.log("Moving to Step 2");
    setCurrentStep(2);
  };

  const handleStep2Next = (data: Partial<FormData>) => {
    console.log("Moving to Step 3 with data:", data);
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  const handleStep3Next = (data: Partial<FormData>) => {
    console.log("Moving to Step 4 with data:", data);
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(4);
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      console.log(
        `Moving back from Step ${currentStep} to Step ${currentStep - 1}`
      );
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalPublish = async () => {
    console.log("Publishing comic with final data:", formData);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onClose();
  };

  // Progress dots component
  const StepDots = ({ current }: { current: number }) => (
    <div className="flex justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full transition-none ${
            i + 1 === current
              ? "bg-secondary-300 scale-110"
              : i + 1 < current
              ? "bg-secondary-300/60"
              : "bg-white/30"
          }`}
        ></div>
      ))}
    </div>
  );

  // Step 1 Component
  const Step1Review = () => (
    <div className="max-w-3xl w-full mx-auto px-6 pt-8 pb-12 text-white text-center animate-fadeIn">
      <StepDots current={1} />

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
          onClick={handleStep1Next}
          className="w-full bg-secondary-300 text-black font-bold py-4 px-8 rounded-2xl shadow-lg transition-none text-lg"
        >
          Next
        </button>

        <button
          onClick={onClose}
          className="w-full bg-transparent text-white/70 font-medium py-4 px-8 rounded-2xl border border-white/20 transition-none"
        >
          Back to Editor
        </button>
      </div>
    </div>
  );

  // Step 2 Component
  const Step2Details = () => (
    <div className="max-w-3xl w-full mx-auto px-6 pt-8 pb-12 text-white animate-fadeIn">
      <StepDots current={2} />

      <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Comic Details
      </h3>

      <div className="flex justify-center mb-8">
        <Image
          src="/dev_images/mobile-progress-2.png"
          alt="Comic Details"
          width={400}
          height={300}
          className="rounded-2xl w-full max-w-lg h-auto border border-white/20 shadow-lg"
        />
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Comic Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Enter your comic title"
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-secondary-300 text-white placeholder:text-white/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Episode Title
          </label>
          <input
            type="text"
            value={formData.episodeTitle}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, episodeTitle: e.target.value }))
            }
            placeholder="Enter episode title"
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-secondary-300 text-white placeholder:text-white/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Describe your comic..."
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-secondary-300 text-white placeholder:text-white/50 resize-none"
          />
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleStepBack}
          className="px-8 py-3 bg-transparent text-white/70 font-medium rounded-lg border border-white/20 transition-none"
        >
          Back
        </button>
        <button
          onClick={() =>
            handleStep2Next({
              title: formData.title,
              episodeTitle: formData.episodeTitle,
              description: formData.description,
            })
          }
          className="px-8 py-3 bg-secondary-300 text-black font-bold rounded-lg transition-none"
        >
          Next
        </button>
      </div>
    </div>
  );

  // Step 3 Component
  const Step3Pricing = () => (
    <div className="max-w-3xl w-full mx-auto px-6 pt-8 pb-12 text-white animate-fadeIn">
      <StepDots current={3} />

      <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Pricing & Access
      </h3>

      <div className="flex justify-center mb-8">
        <Image
          src="/dev_images/mobile-progress-3.png"
          alt="Pricing & Access"
          width={400}
          height={300}
          className="rounded-2xl w-full max-w-lg h-auto border border-white/20 shadow-lg"
        />
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium mb-4 text-white">
            Access Type
          </label>
          <div className="flex gap-4">
            <button
              onClick={() =>
                setFormData((prev) => ({ ...prev, accessType: "Free" }))
              }
              className={`flex-1 py-3 px-4 rounded-lg border transition-none ${
                formData.accessType === "Free"
                  ? "bg-secondary-300 text-black border-secondary-300"
                  : "bg-white/5 text-white border-white/20"
              }`}
            >
              Free
            </button>
            <button
              onClick={() =>
                setFormData((prev) => ({ ...prev, accessType: "PayPerRead" }))
              }
              className={`flex-1 py-3 px-4 rounded-lg border transition-none ${
                formData.accessType === "PayPerRead"
                  ? "bg-secondary-300 text-black border-secondary-300"
                  : "bg-white/5 text-white border-white/20"
              }`}
            >
              Pay Per Read
            </button>
          </div>
        </div>

        {formData.accessType === "PayPerRead" && (
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Price (QUIV)
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))
              }
              placeholder="Enter price"
              min="0"
              step="0.01"
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-secondary-300 text-white placeholder:text-white/50"
            />
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleStepBack}
          className="px-8 py-3 bg-transparent text-white/70 font-medium rounded-lg border border-white/20 transition-none"
        >
          Back
        </button>
        <button
          onClick={() =>
            handleStep3Next({
              accessType: formData.accessType,
              price: formData.price,
            })
          }
          className="px-8 py-3 bg-secondary-300 text-black font-bold rounded-lg transition-none"
        >
          Next
        </button>
      </div>
    </div>
  );

  // Step 4 Component
  const Step4Publish = () => (
    <div className="max-w-3xl w-full mx-auto px-6 pt-8 pb-12 text-white animate-fadeIn">
      <StepDots current={4} />

      <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Review & Publish
      </h3>

      <div className="flex justify-center mb-8">
        <Image
          src="/dev_images/mobile-progress-4.png"
          alt="Review & Publish"
          width={400}
          height={300}
          className="rounded-2xl w-full max-w-lg h-auto border border-white/20 shadow-lg"
        />
      </div>

      <div className="bg-white/5 border border-white/20 rounded-lg p-6 mb-8">
        <h4 className="text-lg font-semibold mb-4">Comic Summary</h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-white/70">Title:</span>
            <span>{formData.title || "Untitled Comic"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Episode:</span>
            <span>{formData.episodeTitle || "Episode 1"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Access:</span>
            <span>{formData.accessType}</span>
          </div>
          {formData.accessType === "PayPerRead" && (
            <div className="flex justify-between">
              <span className="text-white/70">Price:</span>
              <span>{formData.price} QUIV</span>
            </div>
          )}
          <div className="pt-2 border-t border-white/10">
            <span className="text-white/70">Description:</span>
            <p className="mt-1">
              {formData.description || "No description provided"}
            </p>
          </div>
        </div>
      </div>

      <p className="text-white/70 text-center mb-8">
        Ready to share your comic with the world? Once published, it will be
        available on the marketplace for readers to discover and enjoy.
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleStepBack}
          className="px-8 py-3 bg-transparent text-white/70 font-medium rounded-lg border border-white/20 transition-none"
        >
          Back
        </button>
        <button
          onClick={handleFinalPublish}
          className="px-8 py-3 bg-secondary-300 text-black font-bold rounded-lg transition-none"
        >
          Publish Comic
        </button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Review />;
      case 2:
        return <Step2Details />;
      case 3:
        return <Step3Pricing />;
      case 4:
        return <Step4Publish />;
      default:
        return <Step1Review />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-zinc-950 to-black border border-white/20 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center transition-none"
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
