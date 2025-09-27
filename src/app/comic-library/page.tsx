import { Button } from '@/components/ui/button'
import { ComicSection } from '@/features/comic-library/components/ComicSection'
import { CreatorsSection } from '@/features/comic-library/components/CreatorsSection'
import { FeaturedComic } from '@/features/comic-library/components/FeaturedComic'
import { TopComicsTable } from '@/features/comic-library/components/TopComicsTable'
import { trendingComics, featuredComics, upcomingComics, creators, topComics, mintComics, FeaturesComics } from '@/features/comic-library/data/sampleData'



export default function MainPage() {
  return (
    <>

      {/* Trending Comics */}
      <ComicSection 
        title="Trending Comics"
        comics={trendingComics}
      />

      {/* Featured Comics */}
      <ComicSection 
        title="Featured Comics"
        comics={featuredComics}
        showNavigation={true}
      />

      {/* Upcoming Comics */}
      <ComicSection 
        title="Upcoming Comics" 
        comics={upcomingComics}
      />

      {/* Featured Comic Banner */}
      <FeaturedComic comics={FeaturesComics} />

      {/* Our Creators */}
      <CreatorsSection creators={creators} />

      {/* Top Comics Table */}
      <TopComicsTable comics={topComics} />

      {/* Mint These Comics */}
      <ComicSection 
        title="Mint These Comics"
        comics={mintComics}
      />

      {/* Explore More Button */}
      <div className="flex justify-center mt-12">
        <Button className="bg-secondary-200 hover:bg-secondary-200/80   text-white px-8 py-3 rounded-full font-medium">
          Explore More Comics
        </Button>
      </div>
    
    </>
  )
}