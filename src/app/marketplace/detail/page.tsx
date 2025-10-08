'use client'

import ComicDetail from '@/features/comic-library/components/ComicDetail'
import { useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { getComicById, clearCurrentComic } from '@/redux/slices/comicSlice'
import { Loader2 } from 'lucide-react'

function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { currentComic, isLoading } = useAppSelector((state) => state.comic)
  
  // Get comic ID from URL query params
  const comicId = searchParams.get('id')

  // Fetch comic data on mount
  useEffect(() => {
    if (comicId) {
      dispatch(getComicById(comicId))
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearCurrentComic())
    }
  }, [comicId, dispatch])

  // Transform API data to match ComicDetail component interface
  const transformedComic = useMemo(() => {
    if (!currentComic) return null

    const comic = currentComic

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
      issueDetails: {
        creators: comic.creatorId?.username || "Unknown",
        pages: comic.totalPages || 0,
        publisher: "Independent", // Adjust if you have publisher data
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
  if (!comicId) {
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

  const handleReadIssue = () => {
    // Navigate to reader page with comic ID
    router.push(`/reader?id=${comicId}`)
  }

  const handlePreviewIssue = () => {
    // Navigate to preview page or open preview modal
    console.log('Preview issue:', comicId)
    // router.push(`/preview?id=${comicId}`)
  }

  const handleEnlargeCover = () => {
    // Open cover image in modal or new tab
    if (transformedComic.coverImage) {
      window.open(transformedComic.coverImage, '_blank')
    }
  }

  return (
    <ComicDetail
      {...transformedComic}
      onBack={handleBack}
      onReadIssue={handleReadIssue}
      onPreviewIssue={handlePreviewIssue}
      onEnlargeCover={handleEnlargeCover}
    />
  )
}

export default Page