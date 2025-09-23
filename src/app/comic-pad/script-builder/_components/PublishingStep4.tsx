"use client";
import React from "react";
import Image from "next/image";

interface PublishingStep4Props {
  onPublish: () => void;
  onBack: () => void;
  formData: {
    title: string;
    episodeTitle: string;
    description: string;
    coverUrl: string;
    accessType: "Free" | "PayPerRead";
    price?: number;
    nftEnabled?: boolean;
    nftEditionSize?: number;
    nftPrice?: number;
  };
}

const PublishingStep4 = ({ onPublish, onBack, formData }: PublishingStep4Props) => {
  return (
    <div className="max-w-2xl w-full mx-auto px-6 pt-8 pb-12 text-white animate-fadeIn">
      {/* Heading */}
      <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        Almost there!
      </h3>
      <p className="text-white/60 text-center mb-8">
        Review your choices one last time. This is it! 🚀
      </p>

      {/* Preview Card */}
      <div className="bg-black/50 border border-white/20 rounded-2xl overflow-hidden shadow-lg mb-8">
        {/* Cover */}
        <div className="relative w-full h-48">
          <Image
            src={formData.coverUrl || "/dev_images/placeholder.png"}
            alt="Comic Cover"
            fill
            className="object-cover"
          />
          <span className="absolute top-3 left-3 bg-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">
            {formData.accessType === "Free" ? "FREE" : "PREMIUM"}
          </span>
        </div>

        {/* Details */}
        <div className="p-6 space-y-3">
          <h4 className="text-lg font-bold">
            {formData.title} – {formData.episodeTitle}
          </h4>

          <p className="text-sm text-white/70">{formData.description}</p>

          <div className="text-sm text-white/80 space-y-1 mt-4">
            <p>
              <strong>Visibility:</strong> Public
            </p>
            {formData.accessType === "PayPerRead" && (
              <p>
                <strong>Reading Access:</strong> Pay-Per-Read (
                {formData.price} USDT)
              </p>
            )}
            {formData.nftEnabled && (
              <p>
                <strong>NFT Edition:</strong> Yes · Size:{" "}
                {formData.nftEditionSize} · Mint Price: {formData.nftPrice} USDT
              </p>
            )}
            <p>
              <strong>Launch:</strong> Immediately
            </p>
          </div>
        </div>
      </div>

      {/* Warning */}
      <p className="text-xs text-white/60 mb-6 text-center">
        By clicking <span className="text-orange-400 font-semibold">PUBLISH COMIC</span>, 
        your comic will become live on the marketplace and cannot be easily undone.
      </p>

      {/* Buttons */}
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <button
          onClick={onPublish}
          className="w-full bg-orange-500 hover:bg-orange-400 text-black font-bold py-4 px-8 rounded-2xl shadow-lg transition text-lg"
        >
          Publish Comic 🚀
        </button>
        <button
          onClick={onBack}
          className="w-full bg-transparent hover:bg-white/10 text-white/70 hover:text-white py-4 px-8 rounded-2xl border border-white/20 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PublishingStep4;
