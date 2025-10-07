'use client';

import { MainButton } from '@/components/button'
import { ComicSection } from '@/features/comic-library/components/ComicSection'
import { CreatorsSection } from '@/features/comic-library/components/CreatorsSection'
import { FeaturedComic } from '@/features/comic-library/components/FeaturedComic'
import { HeroComicSlider } from '@/features/comic-library/components/HeroComicSlider'
import { TopComicsTable } from '@/features/comic-library/components/TopComicsTable'
import { 
  trendingComics, 
  featuredComics, 
  upcomingComics, 
  creators, 
  topComics, 
  mintComics, 
  FeaturesComics, 
  heroComics 
} from '@/features/comic-library/data/sampleData'

import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { getAllComics } from "@/redux/slices/comicSlice"
import { useEffect, useMemo } from "react"
import { transformApiComicsToComics } from '@/features/comic-library/utils/transformComicData'

export default function MainPage() {
  const { comics, isLoading } = useAppSelector((state) => state.comic)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(getAllComics())
  }, [dispatch])

  // Transform API comics to match Comic interface
  const transformedComics = useMemo(() => {
    if (!comics?.data?.comics) return []
    return transformApiComicsToComics(comics.data.comics)
  }, [comics])

  const freeComics = useMemo(() => 
    transformedComics.filter(comic => !comic.premium),
    [transformedComics]
  )

  const nftComics = useMemo(() => 
    transformedComics.filter(comic => comic.premium),
    [transformedComics]
  )

  return (
    <>
      <HeroComicSlider comics={heroComics} />

      {/* Trending Comics - Use API data or fallback */}
      <ComicSection 
        title="Trending Comics"
        comics={transformedComics.length > 0 ? transformedComics.slice(0, 4) : trendingComics} 
        isLoading={isLoading}
      />

      {/* Featured Comics - Use NFT comics from API */}
      <ComicSection 
        title="Featured Comics"
        comics={nftComics.length > 0 ? nftComics : featuredComics}
        showNavigation={true} 
        isLoading={isLoading}
      />

      {/* Upcoming Comics - Use free comics from API */}
      <ComicSection 
        title="Upcoming Comics" 
        comics={freeComics.length > 0 ? freeComics : upcomingComics} 
        isLoading={isLoading}
      />

      {/* Featured Comic Banner */}
      <FeaturedComic comics={FeaturesComics} />

      {/* Our Creators */}
      <CreatorsSection creators={creators} />

      {/* Top Comics Table */}
      <TopComicsTable comics={topComics} />

      {/* Mint These Comics - Use NFT comics */}
      <ComicSection 
        title="Mint These Comics"
        comics={nftComics.length > 0 ? nftComics : mintComics} 
        isLoading={isLoading}
      />

      {/* Explore More Button */}
      <div className="flex justify-center mt-12">
        <MainButton>
          Explore More Comics
        </MainButton>
      </div>
    </>
  )
}