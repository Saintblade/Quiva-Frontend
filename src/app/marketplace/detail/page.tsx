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
import {
  verifyNftPurchase,
  clearError as clearTransactionError,
  selectIsVerifying,
  selectTransactionError,
  clearCurrentTransaction
} from '@/redux/slices/transactionSlice'
import { Loader2 } from 'lucide-react'
import { useComicPurchase } from '../../../hook/usePurchaseComic'
import { parseEther } from 'viem'
import { toast } from 'react-toastify'

function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  
  // Comic state
  const { 
    currentComic, 
    previewComic, 
    isLoading, 
    isPreviewing 
  } = useAppSelector((state) => state.comic)
  
  // Transaction state
  const isVerifyingTransaction = useAppSelector(selectIsVerifying)
  const transactionError = useAppSelector(selectTransactionError)
  
  // Local state
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [hasNFTAccess, setHasNFTAccess] = useState<boolean | null>(null)
  const [accessCheckComplete, setAccessCheckComplete] = useState(false)
  
  // Get comic ID from URL query params
  const id = searchParams.get('id')
  
  // Initialize purchase hook
  const {
    purchaseComic,
    isPurchasing,
    isWritePending,
    isConfirming,
    isPurchaseComplete,
    purchaseSuccess,
    purchaseError,
    purchaseHash,
    reset: resetPurchase,
    walletStatus,
    setComicId // This will be used to pass comicId to the hook
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
      dispatch(clearCurrentTransaction())
    }
  }, [id, dispatch])

  // Set comicId in the purchase hook when comic loads
  useEffect(() => {
    if (id && currentComic) {
      setComicId(id)
    }
  }, [id, currentComic, setComicId])

  // Transform API data to match ComicDetail component interface
  const transformedComic = useMemo(() => {
    if (!currentComic) return null

    const comic = currentComic
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
      tokenId: tokenId,
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

  // Enhanced access verification using transaction slice
  useEffect(() => {
    const checkUserAccess = async () => {
      if (!transformedComic || !id) {
        setAccessCheckComplete(true)
        return
      }
      
      console.log('Checking user access for comic:', id, 'Type:', transformedComic.publishType)
      
      // If it's a free comic, grant access immediately
      if (transformedComic.publishType === 'free') {
        console.log('Free comic - granting access')
        setHasNFTAccess(true)
        setAccessCheckComplete(true)
        return
      }
      
      // If it's an NFT comic, verify purchase through transaction history
      if (transformedComic.publishType === 'nft') {
        try {
          console.log('NFT comic - checking transaction history')
          
          const verificationResult = await dispatch(verifyNftPurchase({ comicId: id } as any)).unwrap()
          
          console.log('Transaction verification result:', verificationResult)
          
          const hasSuccessfulPurchase = verificationResult?.data?.purchased === true
          
          setHasNFTAccess(hasSuccessfulPurchase)
          console.log(hasSuccessfulPurchase ? 'User has purchased this NFT' : 'User has not purchased this NFT')
          
        } catch (error) {
          console.error('Error verifying NFT purchase:', error)
          setHasNFTAccess(false)
          
          if (error?.includes?.('not found') || error?.includes?.('No transaction')) {
            dispatch(clearTransactionError())
          }
        } finally {
          setAccessCheckComplete(true)
        }
      } else {
        setAccessCheckComplete(true)
      }
    }

    checkUserAccess()
  }, [transformedComic, id, dispatch])

  // Handle purchase success - the hook already creates the transaction record
  useEffect(() => {
    if (purchaseSuccess) {
      console.log('Purchase successful - updating access status')
      setHasNFTAccess(true)
      setIsPurchaseModalOpen(false)
      resetPurchase()
      
      // Show success message and redirect to reader
      toast.success('Purchase successful! You now have access to this comic.')
      setTimeout(() => {
        router.push(`/reader?id=${id}`)
      }, 1500)
    }
  }, [purchaseSuccess, id, router, resetPurchase])

  // Handle purchase errors
  useEffect(() => {
    if (purchaseError) {
      console.error('Purchase error:', purchaseError)
      toast.error(`Purchase failed: Please try again.`)
    }
  }, [purchaseError])

  // Handle transaction errors
  useEffect(() => {
    if (transactionError) {
      console.error('Transaction verification error:', transactionError)
      if (!transactionError.includes('not found') && !transactionError.includes('No transaction')) {
        toast.error(`Access verification failed: Try logging out and back in.`)
      }
    }
  }, [transactionError])

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

  // Error states
  if (!id) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-center'>
          <div className='text-6xl mb-4'>❌</div>
          <h3 className='text-white text-xl font-bold mb-2'>Invalid Comic ID</h3>
          <p className='text-white/60 text-sm mb-6'>No comic ID provided in the URL.</p>
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
    console.log('Read Issue clicked - Access status:', {
      publishType: transformedComic.publishType,
      hasNFTAccess,
      accessCheckComplete,
      isVerifying: isVerifyingTransaction
    })
    
    if (transformedComic.publishType === 'free') {
      router.push(`/reader?id=${id}`)
      return
    }
    
    if (transformedComic.publishType === 'nft') {
      if (hasNFTAccess === true) {
        console.log('User has access - navigating to reader')
        router.push(`/reader?id=${id}`)
      } else {
        console.log('User needs to purchase - showing purchase modal')
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

  // This function will be called by the purchase modal
  // It returns the result that the hook will handle via updateBackendData
  const handlePurchaseNFT = async () => {
    console.log('Purchase NFT clicked');
    console.log('Wallet Status:', walletStatus);
    console.log('Token ID:', transformedComic.tokenId);
    console.log('Creator Wallet:', transformedComic.creatorWalletAddress);
    console.log('Price:', transformedComic.price);

    if (!walletStatus.isConnected) {
      toast.error('Please connect your wallet first')
      throw new Error('Wallet not connected')
    }

    // Validation checks
    if (!transformedComic.tokenId) {
      console.error('Missing tokenId - NFT not minted yet');
      toast.error('This NFT has not been minted yet. Please wait for the creator to complete minting.')
      throw new Error('NFT not minted')
    }

    if (!transformedComic.creatorWalletAddress) {
      console.error('Missing creator wallet address');
      toast.error('Creator wallet address is not available.')
      throw new Error('Creator wallet missing')
    }

    if (!transformedComic.price || transformedComic.price <= 0) {
      console.error('Invalid price');
      toast.error('Invalid NFT price.')
      throw new Error('Invalid price')
    }

    try {
      console.log('All checks passed, proceeding with purchase...');
      
      // Convert HBAR to wei for smart contract
      const priceInWei = parseEther(transformedComic.price.toString());
      console.log('Price conversion:', {
        hbarPrice: transformedComic.price,
        weiPrice: priceInWei.toString()
      });
      
      // The hook will handle the blockchain transaction and backend update
      const result = await purchaseComic({
        tokenId: transformedComic.tokenId,
        seller: transformedComic.creatorWalletAddress,
        amount: BigInt(1),
        pricePerToken: priceInWei,
      })
      
      console.log('Purchase initiated:', result);
      return result;
      
    } catch (error) {
      console.error('Purchase failed:', error)
      throw error;
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
                      transformedComic.creatorWalletAddress;

  // Determine verification status for UI
  const isVerifying = isVerifyingTransaction || !accessCheckComplete

  // Determine if purchase is in progress (includes all stages)
  const isPurchaseInProgress = isPurchasing || isWritePending || isConfirming

  return (
    <>
      <ComicDetail
        {...transformedComic}
        onBack={handleBack}
        onReadIssue={handleReadIssue}
        onPreviewIssue={handlePreviewIssue}
        onEnlargeCover={handleEnlargeCover}
        isVerifyingAccess={isVerifying}
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
          price={transformedComic.price}
          tokenId={transformedComic.tokenId}
          sellerAddress={transformedComic.creatorWalletAddress}
          limitedEdition={limitedEditionString}
          onPurchase={handlePurchaseNFT}
          onPurchaseSuccess={() => setIsPurchaseModalOpen(false)}
          isPurchasing={isPurchaseInProgress}
          purchaseError={purchaseError}
          purchaseSuccess={purchaseSuccess}
          comicId={id}
        />
      )}
    </>
  )
}

export default Page