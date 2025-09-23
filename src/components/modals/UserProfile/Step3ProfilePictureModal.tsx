"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Camera, Upload, User } from "lucide-react";

interface ProfilePictureData {
  profileImage?: File;
  profilePreview?: string;
}

type Props = {
  onNext: (data: ProfilePictureData) => void;
  onBack: () => void;
  totalSteps?: number;
  currentStep?: number;
  initialData?: ProfilePictureData;
};

const Step3ProfilePictureModal = ({ 
  onNext, 
  onBack, 
  totalSteps = 5, 
  currentStep = 3,
  initialData = {}
}: Props) => {
  const [profilePreview, setProfilePreview] = useState<string | null>(initialData.profilePreview || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(initialData.profileImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("File size must be less than 5MB");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setProfilePreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNext = () => {
    onNext({
      profileImage: selectedFile || undefined,
      profilePreview: profilePreview || undefined,
    });
  };

  // Default avatar options
  const defaultAvatars = [
    "/dev_images/avatar.png",
    "/dev_images/mascot_three_quarter.png",
    "/dev_images/mascot-three-2.png",
  ];

  const handleDefaultAvatar = (avatarPath: string) => {
    setProfilePreview(avatarPath);
    setSelectedFile(null);
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 pt-6 pb-10 text-white">
      {/* Progress Image */}
      <div className="flex justify-center mb-6">
        <Image
          src="/dev_images/mobile-progress-3.png"
          alt="Profile Picture"
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
              i + 1 === currentStep ? "bg-yellow-500" : i + 1 < currentStep ? "bg-yellow-500/60" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>

      {/* Title */}
      <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
        Choose Your Avatar
      </h3>

      {/* Description */}
      <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 text-center max-w-2xl mx-auto">
        Add a profile picture to help others recognize you. You can upload your own image or choose from our defaults.
      </p>

      {/* Profile Picture Section */}
      <div className="flex flex-col items-center space-y-6 max-w-md mx-auto">
        {/* Current Profile Picture Display */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-500/20 to-purple-500/20 border-4 border-white/20 flex items-center justify-center overflow-hidden">
            {profilePreview ? (
              <Image
                src={profilePreview}
                alt="Profile preview"
                width={128}
                height={128}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <User size={48} className="text-white/50" />
            )}
          </div>
          
          {profilePreview && (
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition"
            >
              ×
            </button>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUploadClick}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition"
        >
          <Upload size={20} />
          Upload Photo
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Default Avatars */}
        <div className="w-full">
          <p className="text-sm text-white/70 mb-3 text-center">Or choose a default avatar:</p>
          <div className="flex justify-center gap-4">
            {defaultAvatars.map((avatar, index) => (
              <button
                key={index}
                onClick={() => handleDefaultAvatar(avatar)}
                className={`w-16 h-16 rounded-full border-2 transition overflow-hidden ${
                  profilePreview === avatar ? "border-yellow-500" : "border-white/20 hover:border-white/40"
                }`}
              >
                <Image
                  src={avatar}
                  alt={`Default avatar ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 pt-6 w-full">
          <button
            onClick={handleNext}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-2xl shadow-lg transition"
          >
            Continue
          </button>
          
          <button
            onClick={onBack}
            className="w-full bg-transparent hover:bg-white/10 text-white/70 hover:text-white font-medium py-4 px-8 rounded-2xl border border-white/20 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3ProfilePictureModal;