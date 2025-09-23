"use client";
import React from "react";
import Image from "next/image";
import { CheckCircle, User } from "lucide-react";

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
      {/* Progress Image */}
      <div className="flex justify-center mb-6">
        <Image
          src="/dev_images/mobile-progress-5.png"
          alt="Profile Complete"
          width={300}
          height={300}
          className="rounded-2xl w-full max-w-md h-auto"
        />
      </div>

      {/* Step Dots - All completed */}
      <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-yellow-500 transition"
          ></div>
        ))}
      </div>

      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
          <CheckCircle size={40} className="text-white" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl sm:text-3xl font-bold mb-4">
        Welcome to Quiva, <span className="text-yellow-500">{userData.displayName || 'Creator'}</span>!
      </h3>

      {/* Description */}
      <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
        Your profile has been created successfully! You're now ready to explore amazing comics, 
        connect with creators, and start your journey in the Quiva community.
      </p>

      {/* Profile Summary */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500/20 to-purple-500/20 border-2 border-white/20 flex items-center justify-center overflow-hidden">
            {userData.profilePreview ? (
              <Image
                src={userData.profilePreview}
                alt="Profile"
                width={64}
                height={64}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <User size={24} className="text-white/50" />
            )}
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-lg">{userData.displayName || 'User'}</h4>
            <p className="text-white/70 text-sm">@{userData.username || 'username'}</p>
          </div>
        </div>

        {userData.bio && (
          <p className="text-white/80 text-sm mb-4 text-left">
            "{userData.bio}"
          </p>
        )}

        {userData.interests && userData.interests.length > 0 && (
          <div className="text-left">
            <p className="text-white/70 text-sm mb-2">Interests:</p>
            <div className="flex flex-wrap gap-2">
              {userData.interests.slice(0, 6).map((interest, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-lg"
                >
                  {interest}
                </span>
              ))}
              {userData.interests.length > 6 && (
                <span className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-lg">
                  +{userData.interests.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* What's Next */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
        <h4 className="font-semibold text-lg mb-4">What's Next?</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              📚
            </div>
            <p className="font-medium">Explore Comics</p>
            <p className="text-white/70">Discover amazing stories</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              👥
            </div>
            <p className="font-medium">Follow Creators</p>
            <p className="text-white/70">Connect with artists</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              ✨
            </div>
            <p className="font-medium">Create Comics</p>
            <p className="text-white/70">Share your stories</p>
          </div>
        </div>
      </div>

      {/* Complete Button */}
      <button
        onClick={onComplete}
        className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-4 px-12 rounded-2xl shadow-lg transition min-w-[250px]"
      >
        Enter Quiva Marketplace
      </button>
    </div>
  );
};

export default Step5CompletionModal;