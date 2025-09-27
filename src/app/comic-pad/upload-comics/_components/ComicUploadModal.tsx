"use client";
import { useState, useEffect } from "react";
import { X, FileText } from "lucide-react";

interface ComicUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;   // 👈 add this prop
  file?: File;
  preview?: string | null;
}

export function ComicUploadModal({ isOpen, onClose, onNext, file, preview }: ComicUploadModalProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-lg font-medium">Comic Upload - Step 2</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* File preview */}
        <div className="mb-4 text-center">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 mx-auto rounded-lg object-contain"
            />
          ) : (
            <FileText className="w-12 h-12 text-gray-400 mx-auto" />
          )}
          <p className="text-sm text-gray-300 mt-2">{file.name}</p>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-orange-500 h-2 transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        {/* Footer Buttons */}
        <div className="flex space-x-3 mt-6">
          <button
            disabled={isUploading}
            onClick={onNext}   // 👈 trigger Preview modal
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition disabled:opacity-50"
          >
            Continue
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-600 text-gray-300 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
