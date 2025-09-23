"use client";
import React from "react";
import Image from "next/image";

type Props = {
  onNext: () => void;
  onSkip?: () => void;
  totalSteps?: number;
  currentStep?: number;
};

const Step1WelcomeModal = ({ onNext, onSkip, totalSteps = 5, currentStep = 1 }: Props) => {
  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 pt-6 pb-10 text-white text-center">
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
      <h3 className="text-2xl sm:text-3xl font-bold mb-4">
        Welcome to <span className="text-yellow-500">Quiva</span>!
      </h3>

      {/* Description */}
      <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
        Let's create your profile so you can start exploring amazing comics and connect with creators. 
        This will only take a few moments.
      </p>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={onNext}
          className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-2xl shadow-lg transition min-w-[200px]"
        >
          Get Started
        </button>
        
        {onSkip && (
          <button
            onClick={onSkip}
            className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white/70 hover:text-white font-medium py-4 px-8 rounded-2xl border border-white/20 transition min-w-[200px]"
          >
            Skip Setup
          </button>
        )}
      </div>
    </div>
  );
};

export default Step1WelcomeModal;