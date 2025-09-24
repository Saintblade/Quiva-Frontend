"use client"

import { X } from "lucide-react";
import { useState } from "react"
import ComicPublisher from "./ComicPublisher";

export default function OnboardingPage() {
  const [selectedOption, setSelectedOption] = useState("free");
  const [showForm, setShowForm] = useState(false);

  return (
    <>
    {!showForm && (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative">
      {/* Blurred background overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url(/images/background-blur.png)",
          filter: "blur(8px)",
        }}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-md bg-gray-800 rounded-2xl p-8 shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-white text-sm font-medium tracking-wide mb-2">
            PLAN FOR YOUR CAREER | STEP 3 OF 4
          </p>
          <h1 className="text-white text-2xl font-semibold mb-3">
            Choose your path to prosperity
          </h1>
          <p className="text-gray-100 text-sm">
            Select from one of the options below to get started
          </p>
        </div>

        {/* Reading Access Section */}
        <div className="mb-8">
          <h2 className="text-white text-lg font-medium mb-4">Reading Access</h2>

          <div className="space-y-3">
            <label
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                selectedOption === "free"
                  ? "bg-gray-700 ring-2 ring-orange-500"
                  : "hover:bg-gray-700"
              }`}
            >
              <input
                type="radio"
                name="reading-access"
                value="free"
                checked={selectedOption === "free"}
                onChange={() => setSelectedOption("free")}
                className="accent-orange-500"
              />
              <span className="text-white">Free to read</span>
            </label>

            <label
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                selectedOption === "pay-per-read"
                  ? "bg-gray-700 ring-2 ring-orange-500"
                  : "hover:bg-gray-700"
              }`}
            >
              <input
                type="radio"
                name="reading-access"
                value="pay-per-read"
                checked={selectedOption === "pay-per-read"}
                onChange={() => setSelectedOption("pay-per-read")}
                className="accent-orange-500"
              />
              <span className="text-white">Pay Per Read</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
          onClick={() => setShowForm(true)}
           className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition">
            Next
          </button>

          <button className="w-full text-white hover:bg-gray-700 font-medium py-3 rounded-lg transition">
            Go back
          </button>
        </div>
      </div>
    </div>)}

    {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto">
                  <div className="relative bg-gray-950 rounded-2xl max-w-2xl w-full mx-4 my-8 p-6">
                    {/* Close button */}
                    <button
                      onClick={() => setShowForm(false)}
                      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
        
                    {/* The page */}
                    <ComicPublisher />
                  </div>
                </div>
              )}
    </>
  )
}
