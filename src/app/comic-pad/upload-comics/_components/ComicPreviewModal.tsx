"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { ComicCreationForm } from "./ComicCreationForm";

interface ComicPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onBackToEditor: () => void;
}

export function ComicPreviewModal({
  isOpen,
  onClose,
  onNext,
  onBackToEditor,
}: ComicPreviewModalProps) {
  const [showForm, setShowForm] = useState(false);
  if (!isOpen) return null;
  
  return (
    <>
      {/* If not showing form, show preview */}
      {!showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-xl max-w-md w-full p-6">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Comic Preview Image */}
            <div className="mb-6 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1620336655052-b57986f5a26a?w=500&auto=format&fit=crop&q=60"
                alt="Comic preview"
                width={400}
                height={200}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Content */}
            <div className="text-center mb-8">
                <p className="text-white text-sm font-medium tracking-wide mb-2">
            PUBLISH YOUR COMIC | STEP 1 OF 4
          </p>
              <h2 className="text-white text-xl font-semibold mb-3">
                Give your masterpiece one last look
              </h2>
              <p className="text-gray-200 text-sm leading-relaxed">
                Great things take time! Here&apos;s your final. This is exactly how it
                will look when published to your blog and shared with the world.
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors"
              >
                Continue
              </button>
              <button
                onClick={onBackToEditor}
                className="w-full border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white font-medium py-3 rounded-lg transition-colors"
              >
                Back to Editor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* If "Continue" clicked, show form instead */}
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

            {/* The form */}
            <ComicCreationForm />
          </div>
        </div>
      )}
    </>
  );
}
