"use client";
import React, { useState } from "react";
import Image from "next/image";

type Props = {
  onNext?: () => void;
  onSkip?: () => void;
  totalSteps?: number;
};

const DashboardbModal = ({ onNext, onSkip, totalSteps = 6 }: Props) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
    if (onNext) onNext();
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 pt-6 pb-10 text-white text-center">
      {/* Image */}
      <div className="flex justify-center mb-6">
        <Image
          src="/mobile-progress-4.png"
          alt="Mobile Progress"
          width={300}
          height={300}
          className="rounded-2xl w-full max-w-md h-auto"
        />
      </div>

      {/* Step Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition ${
              i + 1 === currentStep ? "bg-white" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>

      {/* Title */}
      <h3 className="text-2xl sm:text-3xl font-bold mb-4">
        Craft and Publish Comics.
      </h3>

      {/* Description */}
      <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8">
        From markdown scripts to drag and drop and drop layout, speech bubbles. Our Comicpad provides everything you need to bring your stories to life.
      </p>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleNext}
          className="w-full sm:w- bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-2xl shadow-lg transition"
        >
          Next
        </button>
        <button
          onClick={onSkip}
          className="w-full sm:w- bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition"
        >
          Skip Tour
        </button>
      </div>
    </div>
  );
};

export default DashboardbModal;
