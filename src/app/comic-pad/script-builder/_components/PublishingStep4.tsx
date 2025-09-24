"use client";
import React from "react";
import Image from "next/image";

interface FormData {
  title: string;
  episodeTitle: string;
  description: string;
  coverUrl: string;
  accessType: "Free" | "PayPerRead";
  price: number;
  nftEnabled: boolean;
  nftEditionSize: number;
  nftPrice: number;
}

interface PublishingStep4Props {
  onPublish: () => void;
  onBack: () => void;
  formData: FormData;
}

const PublishingStep4 = ({ onPublish, onBack, formData }: PublishingStep4Props) => {
  const handlePublish = () => {
    console.log("Publishing comic with data:", formData);
    onPublish();
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-6 pt-8 pb-12 text-white animate-fadeIn">
      {/* Step Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-none ${
              i + 1 === 4
                ? "bg-secondary-300 scale-110"
                : i + 1 < 4
                ? "bg-secondary-300/60"
                : "bg-white/30"
            }`}
          ></div>
        ))}
      </div>

      <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Review & Publish
      </h3>

      <p className="text-white/60 text-center mb-8">
        Review your choices one last time. This is it! 🚀
      </p>

      {/* Comic Preview Card */}
      <div className="bg-white/5 border border-white/20 rounded-2xl overflow-hidden shadow-lg mb-8">
        <div className="relative w-full h-48">
          <Image
            src={formData.coverUrl || "/dev_images/placeholder.png"}
            alt="Comic Cover"
            fill
            className="object-cover"
          />
          <div className="absolute top-3 left-3 bg-secondary-300 text-black text-xs font-bold px-3 py-1 rounded-full">
            {formData.accessType === "Free" ? "FREE" : "PREMIUM"}
          </div>
        </div>

        <div className="p-6 space-y-3">
          <h4 className="text-lg font-bold">
            {formData.title || "Untitled Comic"}
          </h4>
          <p className="text-sm text-white/70">{formData.description}</p>

          <div className="text-sm text-white/80 space-y-1 mt-4">
            <p>
              <strong>Episode:</strong> {formData.episodeTitle || "Episode 1"}
            </p>
            <p>
              <strong>Visibility:</strong> Public
            </p>
            {formData.accessType === "PayPerRead" && (
              <p>
                <strong>Price:</strong> Pay-Per-Read ({formData.price} QUIV)
              </p>
            )}
            {formData.nftEnabled && (
              <p>
                <strong>NFT Edition:</strong> Yes · Size:{" "}
                {formData.nftEditionSize} · Mint Price: {formData.nftPrice} QUIV
              </p>
            )}
          </div>
        </div>
      </div>

      <p className="text-white/70 text-sm mb-6 text-center">
        By clicking{" "}
        <span className="text-secondary-300 font-semibold">PUBLISH COMIC</span>,
        your comic will go live. This action cannot be easily undone.
      </p>

      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <button
          onClick={handlePublish}
          className="w-full bg-secondary-300 text-black font-bold py-4 px-8 rounded-2xl shadow-lg transition-none text-lg"
        >
          Publish Comic
        </button>

        <button
          onClick={onBack}
          className="w-full bg-transparent text-white/70 font-medium py-4 px-8 rounded-2xl border border-white/20 transition-none"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default PublishingStep4;