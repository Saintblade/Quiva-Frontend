"use client";
import React from "react";
import Image from "next/image";

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

interface PublishingStep2Props {
  onNext: () => void;
  onBack: () => void;
  setFormData: (data: FormData | ((prev: FormData) => FormData)) => void;
  formData: FormData;
}

const PublishingStep2 = ({ onNext, onBack, setFormData, formData }: PublishingStep2Props) => {
  const handleNext = () => {
    console.log("Step 2 - Moving to next step");
    onNext();
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-6 pt-8 pb-12 text-white animate-fadeIn">
      {/* Step Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-none ${
              i + 1 === 2
                ? "bg-secondary-300 scale-110"
                : i + 1 < 2
                ? "bg-secondary-300/60"
                : "bg-white/30"
            }`}
          ></div>
        ))}
      </div>

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
          <label className="block text-sm font-medium mb-2 text-white">Comic Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter your comic title"
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-secondary-300 text-white placeholder:text-white/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white">Episode Title</label>
          <input
            type="text"
            value={formData.episodeTitle}
            onChange={(e) => setFormData(prev => ({ ...prev, episodeTitle: e.target.value }))}
            placeholder="Enter episode title"
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-secondary-300 text-white placeholder:text-white/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your comic..."
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-secondary-300 text-white placeholder:text-white/50 resize-none"
          />
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onBack}
          className="px-8 py-3 bg-transparent text-white/70 font-medium rounded-lg border border-white/20 transition-none"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-secondary-300 text-black font-bold rounded-lg transition-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PublishingStep2;
