'use client'

import ComicDetail from '@/features/comic-library/components/ComicDetail'
import ComicPreviewModal from '@/features/comic-library/components/ComicPreviewModal'
import PurchaseNFTModal from '@/features/comic-library/components/PurchaseModal'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { 
  getComicById, 
  clearCurrentComic, 
  getComicPreview, 
  clearPreviewComic 
} from '@/redux/slices/comicSlice'
import { Loader2 } from 'lucide-react'
import { verifyNFTOwnership } from '../../../hook/useComicAccess'
import { useComicPurchase } from '../../../hook/usePurchaseComic'
import { parseEther } from 'viem'
import { toast } from 'react-toastify'

function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { 
    currentComic, 
    previewComic, 
    isLoading, 
    isPreviewing 
  } = useAppSelector((state) => state.comic)
  
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [isVerifyingNFT, setIsVerifyingNFT] = useState(false)
  const [hasNFTAccess, setHasNFTAccess] = useState<boolean | null>(null)
  
  // Get comic ID from URL query params
  const id = searchParams.get('id')
  
  // Initialize purchase hook
  const {
    purchaseComic,
    isPurchasing,
    purchaseSuccess,
    purchaseError,
    reset: resetPurchase,
    walletStatus
  } = useComicPurchase()
 
  // Fetch comic data on mount
  useEffect(() => {
    if (id) {
      dispatch(getComicById({id:id} as any));
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearCurrentComic())
      dispatch(clearPreviewComic())
    }
  }, [id, dispatch])

  // DEBUG: Log the currentComic data with correct structure
  useEffect(() => {
    if (currentComic) {
      console.log('🔍 DEBUG: Current Comic Data:', {
        publishType: currentComic.publishType,
        nftId: currentComic.nftId, // This is the NFT document reference
        nftData: currentComic.nftId, // Log the populated NFT data
        tokenId: currentComic.nftId?.tokenId, // Token ID is in the NFT document
        price: currentComic.nftId?.price, // Price is also in NFT document
        creatorId: currentComic.creatorId,
        creatorWallet: currentComic.creatorId?.walletAddress,
        fullComic: currentComic
      });
    }
  }, [currentComic]);

  // Transform API data to match ComicDetail component interface
  const transformedComic = useMemo(() => {
    if (!currentComic) return null

    const comic = currentComic
    
    // Extract NFT data from populated nftId
    const nftData = comic.nftId || {}
    const tokenId = nftData?.tokenId
    const price = nftData?.price || 0
    const maxSupply = nftData?.maxSupply || 100
    const currentSupply = nftData?.currentSupply || 0

    return {
      title: comic.title || "Untitled Comic",
      issueNumber: comic.chapters?.[0]?.chapterNumber || 1,
      author: {
        name: comic.creatorId?.username || comic.creatorId?.walletAddress?.slice(0, 8) || "Unknown Creator",
        avatar: comic.creatorId?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
      },
      coverImage: comic.coverImage || "https://via.placeholder.com/400x600?text=No+Cover",
      description: comic.description || "No description available.",
      tags: comic.genre || [],
      isFree: comic.publishType === "free",
      publishType: comic.publishType,
      price: price,
      nftDetails: {
        tokenId: tokenId,
        maxSupply: maxSupply,
        currentSupply: currentSupply,
        mintStatus: nftData?.mintStatus || 'pending'
      },
      tokenId: tokenId, // Extract from NFT document
      creatorWalletAddress: comic.creatorId?.walletAddress,
      issueDetails: {
        creators: comic.creatorId?.username || "Unknown",
        pages: comic.totalPages || 0,
        publisher: "Independent",
        publicationDate: new Date(comic.createdAt).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      },
      // Transform chapters to other issues format
      otherIssues: comic.chapters?.slice(0, 4).map((chapter: any, index: number) => ({
        id: chapter._id,
        title: `${comic.title} - ${chapter.title}`,
        image: chapter.pages?.[0]?.imageUrl || comic.coverImage,
        date: new Date(chapter.createdAt).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        isFree: comic.publishType === "free"
      })) || [],
      views: comic.views || 0,
      likes: comic.likes || 0,
      status: comic.status || "draft"
    }
  }, [currentComic])

  // Verify NFT ownership when comic loads (for NFT comics only)
  useEffect(() => {
    const checkNFTAccess = async () => {
      if (!transformedComic || !id) return
      
      // If it's a free comic, grant access immediately
      if (transformedComic.publishType === 'free') {
        setHasNFTAccess(true)
        return
      }
      
      // If it's an NFT comic, verify ownership
      if (transformedComic.publishType === 'nft') {
        setIsVerifyingNFT(true)
        try {
          // Get token from localStorage or your auth state
          const token = localStorage.getItem('authToken') || ''
          const hasAccess = await verifyNFTOwnership(id, token)
          setHasNFTAccess(hasAccess)
        } catch (error) {
          console.error('Error verifying NFT access:', error)
          setHasNFTAccess(false)
        } finally {
          setIsVerifyingNFT(false)
        }
      }
    }

    checkNFTAccess()
  }, [transformedComic, id])

  // Handle purchase success
  useEffect(() => {
    if (purchaseSuccess) {
      // Refresh NFT access status
      setHasNFTAccess(true)
      setIsPurchaseModalOpen(false)
      resetPurchase()
      
      // Show success message or redirect to reader
      setTimeout(() => {
        router.push(`/reader?id=${id}`)
      }, 1500)
    }
  }, [purchaseSuccess, id, router, resetPurchase])

  // Loading state
  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-center'>
          <Loader2 className='w-12 h-12 text-yellow-700 animate-spin mx-auto mb-4' />
          <p className='text-white/60 text-sm font-medium'>Loading comic details...</p>
        </div>
      </div>
    )
  }

  // Error state (comic not found)
  if (!id) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-center'>
          <div className='text-6xl mb-4'>❌</div>
          <h3 className='text-white text-xl font-bold mb-2'>Invalid Comic ID</h3>
          <p className='text-white/60 text-sm mb-6'>
            No comic ID provided in the URL.
          </p>
          <button
            onClick={() => router.push('/marketplace')}
            className='bg-yellow-600 hover:bg-yellow-700 text-black font-medium px-6 py-3 rounded-full transition-all'
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    )
  }

  if (!transformedComic) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-center'>
          <div className='text-6xl mb-4'>📚</div>
          <h3 className='text-white text-xl font-bold mb-2'>Comic Not Found</h3>
          <p className='text-white/60 text-sm mb-6'>
            The comic you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push('/marketplace')}
            className='bg-yellow-600 hover:bg-yellow-700 text-black font-medium px-6 py-3 rounded-full transition-all'
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    )
  }

  // Handle actions
  const handleBack = () => {
    router.back()
  }

  const handleReadIssue = async () => {
    // If free comic, allow immediate access
    if (transformedComic.publishType === 'free') {
      router.push(`/reader?id=${id}`)
      return
    }
    
    // If NFT comic, check ownership
    if (transformedComic.publishType === 'nft') {
      if (hasNFTAccess == true) {
        // User owns the NFT, grant access
        router.push(`/reader?id=${id}`)
      } else {
        // User doesn't own the NFT, show purchase modal
        setIsPurchaseModalOpen(true)
      }
    }
  }

  const handlePreviewIssue = async () => {
    console.log('Opening preview for comic:', id);
    await dispatch(getComicPreview({id} as any));
    setIsPreviewOpen(true)
  }

  const handleClosePreview = () => {
    setIsPreviewOpen(false)
    dispatch(clearPreviewComic())
  }

  const handleEnlargeCover = () => {
    if (transformedComic.coverImage) {
      window.open(transformedComic.coverImage, '_blank')
    }
  }

  const handlePurchaseNFT = async () => {
    console.log('🛒 Purchase NFT clicked');
    console.log('📦 Wallet Status:', walletStatus);
    console.log('📦 Token ID:', transformedComic.tokenId);
    console.log('📦 Creator Wallet:', transformedComic.creatorWalletAddress);
    console.log('📦 Price:', transformedComic.price);
    console.log('📦 NFT Mint Status:', transformedComic.nftDetails?.mintStatus);

    if (!walletStatus.isConnected) {
      alert('Please connect your wallet first')
      return
    }
    console.log('✅ Wallet is connected:', walletStatus.address);
    console.log('🔍 Performing pre-purchase checks...: ', transformedComic);;
    // Check if NFT has been minted
    if (!transformedComic.tokenId) {
      console.error('❌ Missing tokenId - NFT not minted yet');
      alert('This NFT has not been minted yet. Please wait for the creator to complete minting, or contact the creator.')
      return
    }

    // Check mint status
    // if (transformedComic.nftDetails?.mintStatus !== 'minted') {
    //   console.error('❌ NFT not fully minted. Status:', transformedComic.nftDetails?.mintStatus);
    //   alert(`This NFT is not ready for purchase yet. Current status: ${transformedComic.nftDetails?.mintStatus || 'pending'}`)
    //   return
    // }

    // Check if creator wallet address exists
    if (!transformedComic.creatorWalletAddress) {
      console.error('❌ Missing creator wallet address');
      alert('Creator wallet address is not available.')
      return
    }

    // Check if price is valid
    if (!transformedComic.price || transformedComic.price <= 0) {
      console.error('❌ Invalid price');
      alert('Invalid NFT price.')
      return
    }

    try {
      console.log('✅ All checks passed, proceeding with purchase...');
      
      // Convert HBAR to wei for smart contract
      const priceInWei = parseEther(transformedComic.price.toString());
      console.log('💰 Price conversion:', {
        hbarPrice: transformedComic.price,
        weiPrice: priceInWei.toString()
      });
      
      await purchaseComic({
        tokenId: BigInt(transformedComic.tokenId),
        seller: transformedComic.creatorWalletAddress,
        amount: BigInt(1), // Default to 1 copy
        pricePerToken: priceInWei,
      
      })
    } catch (error) {
      toast.error(`Purchase failed: ${error.message || error}`)
      console.error('❌ Purchase failed:', error)
    }
  }

  const handleClosePurchaseModal = () => {
    setIsPurchaseModalOpen(false)
    resetPurchase()
  }

  // Calculate limited edition string
  const limitedEditionString = transformedComic.nftDetails 
    ? `${transformedComic.nftDetails.currentSupply || 0}/${transformedComic.nftDetails.maxSupply || 100}`
    : '0/100';

  // Check if NFT is ready for purchase
  const isNFTReady = transformedComic.publishType === 'nft' && 
                      transformedComic.tokenId && 
                      transformedComic.creatorWalletAddress 
                      // transformedComic.nftDetails?.mintStatus === 'minted';

  return (
    <>
      <ComicDetail
        {...transformedComic}
        onBack={handleBack}
        onReadIssue={handleReadIssue}
        onPreviewIssue={handlePreviewIssue}
        onEnlargeCover={handleEnlargeCover}
        isVerifyingAccess={isVerifyingNFT}
        hasNFTAccess={hasNFTAccess}
      />
      
      <ComicPreviewModal
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        previewComic={previewComic}
        isLoading={isPreviewing}
      />

      {isNFTReady && (
        <PurchaseNFTModal
          isOpen={isPurchaseModalOpen}
          onClose={handleClosePurchaseModal}
          comicTitle={transformedComic.title}
          comicImage={transformedComic.coverImage}
          creatorName={transformedComic.author.name}
          creatorAvatar={transformedComic.author.avatar}
          price={transformedComic.price} // Pass as HBAR number
          tokenId={BigInt(transformedComic.tokenId)}
          sellerAddress={transformedComic.creatorWalletAddress}
          limitedEdition={limitedEditionString}
          onPurchase={handlePurchaseNFT}
          onPurchaseSuccess={() => setIsPurchaseModalOpen(false)}
          isPurchasing={isPurchasing}
          purchaseError={purchaseError}
        />
      )}
      
      
    </>
  )
}

export default Page