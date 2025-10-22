'use client'

import React, { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PurchaseNFTModalProps {
  isOpen: boolean
  onClose: () => void
  comicTitle: string
  comicImage: string
  creatorName: string
  creatorAvatar: string
  price: number | string // HBAR amount (not wei)
  tokenId: bigint
  sellerAddress: string
  limitedEdition: string
  onPurchase: () => void
  onPurchaseSuccess?: () => void
  isPurchasing?: boolean
  purchaseError?: Error | null
}

const PurchaseNFTModal = ({
  isOpen,
  onClose,
  comicTitle,
  comicImage,
  creatorName,
  creatorAvatar,
  price,
  tokenId,
  sellerAddress,
  limitedEdition,
  onPurchase,
  onPurchaseSuccess,
  isPurchasing = false,
  purchaseError = null
}: PurchaseNFTModalProps) => {
  const quantity = 1;
  if (!isOpen) return null

  // Format price as HBAR (no conversion needed since price is already in HBAR)
  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numPrice.toFixed(2);
  }

  const totalPrice = typeof price === 'string' ? parseFloat(price) : price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative bg-gray-900 rounded-2xl max-w-md w-full border border-white/10 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isPurchasing}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 disabled:opacity-50"
        >
          <X size={24} />
        </button>

        {/* Comic Image */}
        <div className="relative h-48 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
          <img
            src={comicImage}
            alt={comicTitle}
            className="w-40 h-40 object-cover rounded-lg shadow-2xl"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Mint this comic</h2>
            <p className="text-sm text-white/60">
              You are about to mint: <span className="text-white font-medium">{comicTitle}</span>
            </p>
          </div>

          {/* Creator Info */}
          <div className="flex items-center gap-3 bg-gray-800/50 rounded-xl p-4">
            <img
              src={creatorAvatar}
              alt={creatorName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-xs text-white/60">Creators</p>
              <p className="text-white font-semibold">{sellerAddress}</p>
            </div>
          </div>

          {/* Limited Edition */}
          <div className="flex items-center gap-3 bg-gray-800/50 rounded-xl p-4">
            <div className="w-12 h-12 rounded-full bg-yellow-600 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <p className="text-xs text-white/60">Limited Edition</p>
              <p className="text-white font-semibold">{limitedEdition}</p>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 bg-gray-800/50 rounded-xl p-4">
            <div className="w-12 h-12 rounded-full bg-yellow-600 flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <p className="text-xs text-white/60">Price</p>
              <p className="text-white font-semibold">{formatPrice(totalPrice)} HBAR</p>
            </div>
          </div>

          {/* Error Message */}
          {purchaseError && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4">
              <p className="text-red-400 text-sm text-center">
                {purchaseError.message || 'Failed to purchase NFT. Please try again.'}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onPurchase}
              disabled={isPurchasing}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-6 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPurchasing ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </span>
              ) : (
                'Purchase NFT'
              )}
            </Button>

            <button
              onClick={onClose}
              disabled={isPurchasing}
              className="w-full bg-transparent border border-white/20 text-white font-medium py-3 rounded-full hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>

          {/* Helper Text */}
          <p className="text-xs text-white/40 text-center">
            By proceeding, you agree to purchase this NFT. The transaction will be processed on the blockchain.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PurchaseNFTModal