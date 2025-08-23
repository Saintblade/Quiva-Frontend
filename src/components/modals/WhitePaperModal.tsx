"use client";
import React, { useState } from "react";
import { MainButton2 } from "../button";
import { FiArrowRight } from "react-icons/fi";

// ✅ Use the interface for props
interface WhitePaperModalProps {
  onNext: () => void;
}

const WhitePaperModal: React.FC<WhitePaperModalProps> = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // simple email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleNext = () => {
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email (example@domain.com).");
      return;
    }
    setError(""); // clear error
    onNext(); // ✅ this will now always be a valid function
  };

  return (
    <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 text-white">
      {/* Header */}
      <div className="space-y-2 text-center w-full sm:w-[80%] mx-auto">
        <h3 className="text-xl sm:text-2xl font-bold">Login or Sign up</h3>
      </div>

      {/* Email Input + Next Button */}
      <div className="relative mt-6 mb-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={`w-full bg-transparent border ${
            error ? "border-red-500" : "border-black/70"
          } rounded-md font-semibold py-3 sm:py-2.5 text-sm sm:text-base px-4 text-white placeholder-white/60 outline-none`}
        />
        {/* Arrow Button */}
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
        >
          <FiArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <div className="text-center text-white/70 my-2">Or</div>

      {/* Wallet Button */}
      <MainButton2 className="w-full bg-transparent border border-black/70 rounded-md font-semibold py-3 sm:py-2.5 text-sm sm:text-base px-4 text-white">
        Connect Wallet
      </MainButton2>

      {/* Terms */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-2 text-xs sm:text-sm text-white/60 mt-5 sm:mt-6">
        <div className="text-left">
          If you know you have not logged in before, you will create a new Quiva account. By proceeding you agree to our{" "}
          <span className="font-bold">Terms of Service & Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default WhitePaperModal;
