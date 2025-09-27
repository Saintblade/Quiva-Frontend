"use client";
import React, { useState } from "react";
import { X, Upload } from "lucide-react";
import { ComicUploadModal } from "./ComicUploadModal";
import { ComicPreviewModal } from "./ComicPreviewModal";


interface UploadModalProps {
  onClose: () => void;
}

const UploadModal = ({ onClose }: UploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [step, setStep] = useState<"upload" | "progress" | "preview">("upload");

  // File selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      if (selected.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(selected));
      }
    }
  };

  return (
    <>
      {/* Step 1: Upload */}
      {step === "upload" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-6">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/60 transition"
            >
              <X className="text-white w-5 h-5" />
            </button>

            {/* Title */}
            <h2 className="text-white text-lg font-semibold mb-6">Comic Upload</h2>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-3">
              {!preview ? (
                <>
                  <Upload className="w-10 h-10 text-orange-400" />
                  <p className="text-white/70">Drag or select your file</p>
                  <label className="px-4 py-2 rounded-lg bg-orange-500 text-black font-medium hover:bg-orange-400 cursor-pointer">
                    Browse File
                    <input
                      type="file"
                      accept=".jpg,.png,.zip"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </>
              ) : (
                <img src={preview} className="rounded-lg max-h-48 mx-auto object-contain" />
              )}
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3">
              <button
                disabled={!file}
                onClick={() => setStep("progress")}
                className="w-full bg-orange-500 hover:bg-orange-400 text-black font-semibold py-3 rounded-xl transition disabled:opacity-50"
              >
                Next
              </button>
              <button
                onClick={onClose}
                className="w-full border border-white/20 text-white/70 hover:text-white hover:bg-white/5 py-3 rounded-xl transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Upload progress */}
      {step === "progress" && file && (
        <ComicUploadModal
          isOpen={true}
          file={file}
          preview={preview}
          onClose={() => setStep("upload")}
          onNext={() => setStep("preview")}   // 👈 goes to preview
        />
      )}

      {/* Step 3: Preview */}
      {step === "preview" && (
        <ComicPreviewModal
          isOpen={true}
          onClose={onClose}
          onNext={() => alert("✅ Published!")} // handle publish
          onBackToEditor={() => setStep("upload")}
        />
      )}
    </>
  );
};

export default UploadModal;
