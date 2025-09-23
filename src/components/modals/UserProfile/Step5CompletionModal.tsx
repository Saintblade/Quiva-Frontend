"use client";
import React from "react";
import Image from "next/image";
import { OrangeButton } from "@/components/button";
import { oneClick } from "../../../../public/dev_images";

interface UserProfileData {
  displayName?: string;
  username?: string;
  bio?: string;
  interests?: string[];
  profileImage?: File;
  profilePreview?: string;
}

type Props = {
  onComplete: () => void;
  totalSteps?: number;
  currentStep?: number;
  userData?: UserProfileData;
};

const Step5CompletionModal = ({ 
  onComplete, 
  totalSteps = 5, 
  currentStep = 5,
  userData = {}
}: Props) => {
  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 pt-6 pb-10 text-white text-center">
      {/* Step Dots - All completed */}
      <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-yellow-500 transition"
          ></div>
        ))}
      </div>

      {/* 1. Heading */}
      <h3 className="text-2xl sm:text-3xl font-bold mb-8">
        You're ready to go!
      </h3>

      {/* 2. Image Banner */}
      <div className="flex justify-center mb-8">
        <Image
          src={oneClick}
          alt="You're ready to go!"
          width={400}
          height={300}
          className="rounded-2xl w-full max-w-lg h-auto"
        />
      </div>

      {/* 3. Let's go Button */}
      <OrangeButton
        onClick={onComplete}
        className="w-full max-w-md mx-auto py-4 px-8 text-lg"
      >
        Let's go
      </OrangeButton>
    </div>
  );
};

export default Step5CompletionModal;