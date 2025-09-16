"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

type Props = {
  onBack?: () => void;
  onGetExtension?: () => void;
};

const WalletConnectModal = ({ onBack, onGetExtension }: Props) => {
  return (
    <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 pt-6 pb-10 text-white">
      {/* Header */}
      <div className="flex items-center justify-center relative mb-6">
        {/* Back Arrow */}
        <button
          onClick={onBack}
          className="absolute left-0 p-2 text-white hover:text-gray-300"
        >
          <ArrowLeft size={22} />
        </button>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold">Connect</h3>
      </div>

      {/* QR Code */}
      <div className="flex justify-center mb-6">
        <Image
          src="/qrcode.png" // Place your QR code image in /public/qrcode.png
          alt="QR Code"
          width={200}
          height={200}
          className="rounded-xl border border-white/20"
        />
      </div>

      {/* Get Extension Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={onGetExtension}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-xl shadow-md transition"
        >
          Get Extension
        </button>
      </div>

      {/* Description */}
      <p className="text-center text-white/70 text-sm sm:text-base leading-relaxed">
        Scan this QR code from your mobile wallet or phone&apos;s camera to connect.
      </p>
    </div>
  );
};

export default WalletConnectModal;
