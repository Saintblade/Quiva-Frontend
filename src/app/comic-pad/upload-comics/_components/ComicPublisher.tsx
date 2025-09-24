"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react";
import { ComicNotification } from "./ComicNotification";

export default function ComicPublisher() {
  const [isOpen, setIsOpen] = useState(true)
  const [showForm, setShowForm] = useState(false);

  const handlePublish = () => {
    console.log("Publishing comic...")
    setIsOpen(false)
  }

  return (
    <>
    {!showForm && (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg transition"
      >
        Open Comic Publisher
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative max-w-md w-full bg-gray-800 border border-gray-700 text-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="px-6 pt-6 pb-4">
              <p className="text-xs text-white uppercase tracking-wide mb-2">
                PUBLISH YOUR COMIC · STEP 4 OF 4
              </p>
              <h2 className="text-xl font-semibold text-white">Almost there!</h2>
            </div>

            {/* Comic Preview */}
            <div className="px-6 mb-4">
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ni0qWkVruUmu4S5lnGMYklXHhVPLqO.png"
                  alt="Comic preview"
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover"
                />
              </div>
            </div>

            {/* Comic Details */}
            <div className="px-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">
                Degen&apos;s Dilemmas – Just One More Pump
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white">Visibility:</span>
                  <span>Public</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white">Reader Access:</span>
                  <span>Pay-Per-View (USD)</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white">NFT Edition:</span>
                  <span>Yes · Edition Size: 100 · Mint Price: 0.05 ETH</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white">Launch:</span>
                  <span>Immediately</span>
                </div>
              </div>

              <p className="mt-3 text-xs text-white leading-relaxed">
                Follow the adventures of Degen as he navigates the volatile world of
                crypto trading. From diamond hands to paper hands, from FOMO to HODL —
                witness the rollercoaster of a crypto trader trying to make it in the
                digital asset space.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6 space-y-3">
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition"
              >
                Publish Comic
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full border border-gray-600 text-white hover:bg-gray-700 hover:text-white font-medium py-3 rounded-lg transition bg-transparent"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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
                    <ComicNotification />
                  </div>
                </div>
              )}
    </>
  )
}
