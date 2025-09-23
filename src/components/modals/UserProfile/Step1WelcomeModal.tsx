"use client";
import React from "react";
import Image from "next/image";

type Props = {
  onNext: () => void;
  totalSteps?: number;
  currentStep?: number;
};

const Step1WelcomeModal = ({ onNext, totalSteps = 5, currentStep = 1 }: Props) => {
  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 pt-6 pb-10 text-white text-center">
      {/* Step Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition ${
              i + 1 === currentStep ? "bg-yellow-500" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>

      {/* Title */}
      <h3 className="text-2xl sm:text-3xl font-bold mb-6">
        Welcome to Quiva
      </h3>

      {/* Progress Image */}
      <div className="flex justify-center mb-6">
        <Image
          src="/dev_images/mobile-progress-1.png"
          alt="Welcome to Profile Creation"
          width={300}
          height={300}
          className="rounded-2xl w-full max-w-md h-auto"
        />
      </div>

      {/* Description */}
      <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
        Click through this quick Guide to get started
      </p>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={onNext}
          className="w-full sm:w-auto bg-orange-500 hover:bg-orange-400 text-black font-bold py-4 px-8 rounded-2xl shadow-lg transition min-w-[200px]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1WelcomeModal;