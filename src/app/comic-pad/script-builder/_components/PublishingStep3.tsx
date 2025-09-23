"use client";
import React, { useState } from "react";

interface PublishingStep3Props {
  onNext: () => void;
  onBack: () => void;
}

const PublishingStep3 = ({ onNext, onBack }: PublishingStep3Props) => {
  const [readingAccess, setReadingAccess] = useState("free");
  const [usdtAmount, setUsdtAmount] = useState("");
  const [mintAsNFT, setMintAsNFT] = useState(false);
  const [copies, setCopies] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div className="max-w-2xl w-full mx-auto px-6 pt-8 pb-12 text-white animate-fadeIn">
      <div className="text-center mb-8">
        <h3 className="text-sm uppercase tracking-wider text-white/60 mb-2">
          Publish Your Comic: Step 3 of 4
        </h3>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Choose your path to prosperity
        </h2>
        <p className="text-white/60 text-sm sm:text-base">
          Decide how you want to share and potentially earn from your comic.
        </p>
      </div>

      {/* Reading Access */}
      <div className="mb-8">
        <h4 className="font-semibold mb-3">Reading Access</h4>
        <div className="flex items-center gap-6 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="access"
              value="free"
              checked={readingAccess === "free"}
              onChange={() => setReadingAccess("free")}
              className="accent-orange-500"
            />
            <span>Free to read</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="access"
              value="paid"
              checked={readingAccess === "paid"}
              onChange={() => setReadingAccess("paid")}
              className="accent-orange-500"
            />
            <span>Pay Per Read 💰</span>
          </label>
        </div>

        {readingAccess === "paid" && (
          <input
            type="number"
            placeholder="Enter USDT amount"
            value={usdtAmount}
            onChange={(e) => setUsdtAmount(e.target.value)}
            className="w-full p-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-orange-500 mb-4"
          />
        )}
      </div>

      {/* NFT Option */}
      <div className="mb-8">
        <h4 className="font-semibold mb-3">
          Turn Your Comic into a Collectible NFT!
        </h4>
        <label className="flex items-center gap-2 mb-4 cursor-pointer">
          <input
            type="checkbox"
            checked={mintAsNFT}
            onChange={() => setMintAsNFT(!mintAsNFT)}
            className="accent-orange-500"
          />
          <span>Mint this comic episode as a limited NFT Edition.</span>
        </label>

        {mintAsNFT && (
          <div className="space-y-4">
            <input
              type="number"
              placeholder="How many copies?"
              value={copies}
              onChange={(e) => setCopies(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-orange-500"
            />
            <input
              type="number"
              placeholder="Mint price (USDT per NFT)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-orange-500"
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4 max-w-sm mx-auto">
        <button
          onClick={onNext}
          className="w-full bg-orange-500 hover:bg-orange-400 text-black font-bold py-4 px-8 rounded-2xl shadow-lg transition text-lg"
        >
          Next
        </button>

        <button
          onClick={onBack}
          className="w-full bg-transparent hover:bg-white/10 text-white/70 hover:text-white font-medium py-4 px-8 rounded-2xl border border-white/20 transition"
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default PublishingStep3;
