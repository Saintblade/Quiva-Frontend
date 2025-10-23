'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'
import { MainButton } from '@/components/button'
import { coinIcon, creatorIcon } from '../../../../public/dev_images'
import Image from 'next/image'

interface PurchaseNFTModalProps {
  isOpen: boolean
  onClose: () => void
  comicTitle: string
  comicImage: string
  creatorName: string
  creatorAvatar: string
  price: number | string
  tokenId: bigint
  sellerAddress: string
  limitedEdition: string
  onPurchase: () => void
  onPurchaseSuccess?: () => void
  isPurchasing?: boolean
  purchaseError?: Error | null
  purchaseSuccess?: boolean
}

// Purchase Modal Component with all states
const PurchaseNFTModal: React.FC<PurchaseNFTModalProps> = ({
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
  purchaseError = null,
  purchaseSuccess = false
}) => {
  if (!isOpen) return null

  const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price
    return numPrice.toFixed(3)
  }

  // Success Modal
  if (purchaseSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
        <div className="relative bg-[#1A1A1A] rounded-3xl max-w-4xl w-full overflow-hidden shadow-xl shadow-secondary-200/10">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="p-8 text-center space-y-6">
            {/* Comic Image */}
            <div className="flex justify-center">
              <img
                src={comicImage}
                alt={comicTitle}
                className="w-32 h-32 object-cover rounded-2xl shadow-2xl"
              />
            </div>

            {/* Title */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Mint Successful!🎉
              </h2>
              <p className="text-white/70 text-sm">
                You now own <span className="text-white font-semibold">{comicTitle}</span>. 
                It's been added to your Library and your Wallet.
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-4">
              <button 
                onClick={onPurchaseSuccess}
                className="w-full bg-secondary-200 hover:bg-primary-400 text-black font-bold py-4 rounded-full transition-all"
              >
                Start Reading
              </button>
              <button 
                onClick={onClose}
                className="w-full bg-transparent border-2 border-white/80 text-white font-semibold py-4 rounded-full hover:bg-white/5 transition-all"
              >
                Go to My Library
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Loading Modal
  if (isPurchasing) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
        <div className="relative bg-[#1A1A1A] rounded-3xl max-w-4xl w-full overflow-hidden shadow-xl shadow-secondary-200/10">
          <button
            onClick={onClose}
            disabled
            className="absolute top-6 right-6 text-white/50 cursor-not-allowed transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="p-12 text-center space-y-6">
            {/* Hourglass Icon */}
            <div className="flex justify-center">
              <div className="text-6xl animate-pulse">⏳</div>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Minting in progress...
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                We're adding your copy of {comicTitle} to the blockchain. 
                This may take a few seconds. Please don't refresh the page.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error Modal
  if (purchaseError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
        <div className="relative bg-[#1A1A1A] rounded-3xl max-w-4xl w-full overflow-hidden shadow-xl shadow-secondary-200/10">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="p-8 text-center space-y-6">
            {/* Comic Image */}
            <div className="flex justify-center">
              <img
                src={comicImage}
                alt={comicTitle}
                className="w-32 h-32 object-cover rounded-2xl shadow-2xl"
              />
            </div>

            {/* Title with X */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Oops, something went wrong.
                <span className="text-red-500">✕</span>
              </h2>
              <p className="text-white/60 text-sm">
                We couldn't complete the mint. You can try again or use a different payment option.
              </p>
            </div>

            {/* Retry Button */}
            <div className="pt-4">
              <MainButton 
                onClick={() => {
                  onPurchase()
                }}
                className="w-full bg-secondary-200 hover:bg-primary-400 text-black font-bold py-4 rounded-full transition-all"
              >
                Retry Mint
              </MainButton>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default Purchase Modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="relative bg-[#1A1A1A] rounded-3xl max-w-4xl w-full overflow-hidden shadow-xl shadow-secondary-200/10">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Comic Image Header */}
        <div className="pt-12 pb-6 flex justify-center">
          <img
            src={comicImage}
            alt={comicTitle}
            className="w-32 h-32 object-cover rounded-2xl shadow-2xl"
          />
        </div>

        {/* Content */}
        <div className="px-8 pb-8 space-y-6">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Mint this comic</h2>
            <p className="text-sm text-white/60">
              You are about to mint: <span className="text-white font-medium">{comicTitle}</span>
            </p>
          </div>

          {/* Creator and Edition Info */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            {/* Creator Info */}
            <div className="flex items-center gap-4 bg-[#2A2A2A] rounded-2xl p-4">
              {/* <img
                src={creatorAvatar}
                alt={creatorName}
                className="w-14 h-14 rounded-full object-cover"
              /> */}

              <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">
                  <Image
                    src={creatorIcon}
                    alt="Coin Icon"
                    width={56}
                    height={56}
                    className=""
                  />
                </span>
              </div>

              <div className="flex-1">
                <p className="text-xs text-white/50 mb-1">Creators</p>
                <p className="text-white font-semibold">{creatorName}</p>
              </div>
            </div>

            {/* Limited Edition */}
            <div className="flex items-center gap-4 bg-[#2A2A2A] rounded-2xl p-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">
                  <Image
                    src={coinIcon}
                    alt="Coin Icon"
                    width={56}
                    height={56}
                    className=""
                  />
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-white/50 mb-1">Limited Edition</p>
                <p className="text-white font-semibold">{limitedEdition}</p>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 bg-[#2A2A2A] rounded-2xl p-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">
                  <Image
                    src={coinIcon}
                    alt="Coin Icon"
                    width={56}
                    height={56}
                    className=""
                  />
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-white/50 mb-1">Price</p>
                <p className="text-white font-semibold">{formatPrice(price)} HBAR</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <MainButton
              onClick={onPurchase}
              className="w-full bg-secondary-200 hover:bg-primary-400 text-black font-normal py-4 rounded-full transition-all"
            >
              Proceed to Mint
            </MainButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchaseNFTModal