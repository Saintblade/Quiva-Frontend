import { Header } from '@/components/global/comic-library/Header'
import { Sidebar } from '@/components/global/comic-library/Sidebar'
import { Button } from '@/components/ui/button'
import { ComicSection } from '@/Features/comic-library/components/ComicSection'
import { CreatorsSection } from '@/Features/comic-library/components/CreatorsSection'
import { FeaturedComic } from '@/Features/comic-library/components/FeaturedComic'
import { TopComicsTable } from '@/Features/comic-library/components/TopComicsTable'

// Mock data
const trendingComics = [
  {
    id: '1',
    title: 'Rise of the Slayer',
    subtitle: '3 USDT',
    image: '/api/placeholder/200/250',
    premium: true
  },
  {
    id: '2',
    title: 'Goofy Friend',
    description: 'The Goofy Friend is an issue of the best comics containing goofy characters.',
    image: '/api/placeholder/200/250',
    buttonText: 'Explore Issue'
  },
  {
    id: '3',
    title: 'Kakashi',
    subtitle: '5 USDT',
    image: '/api/placeholder/200/250',
    premium: true
  }
]

const featuredComics = [
  {
    id: '1',
    title: 'Rise of the Slayer by Young Geek',
    price: 'Floor Price: 0.07 USDT',
    subtitle: '24h Vol: 15,694 USDT',
    image: '/api/placeholder/200/250',
    premium: true
  },
  {
    id: '2',
    title: 'Rise of the Slayer by Young Geek',
    price: 'Floor Price: 0.07 USDT', 
    subtitle: '24h Vol: 15,694 USDT',
    image: '/api/placeholder/200/250',
    premium: true
  },
  {
    id: '3',
    title: 'Rise of the Slayer by Young Geek',
    price: 'Floor Price: 0.07 USDT',
    subtitle: '24h Vol: 15,694 USDT', 
    image: '/api/placeholder/200/250',
    premium: true
  },
  {
    id: '4',
    title: 'Rise of the Slayer by Young Geek',
    price: 'Floor Price: 0.07 USDT',
    subtitle: '24h Vol: 15,694 USDT',
    image: '/api/placeholder/200/250',
    premium: true
  }
]

const upcomingComics = [
  {
    id: '1',
    title: 'By Young Geek',
    description: 'Rise of the Slayer - Issue #2',
    price: 'Mint Date: 20/10/25',
    subtitle: 'Mint Price: 10 USDT',
    image: '/api/placeholder/200/250',
    buttonText: 'Notify Me',
    buttonVariant: 'outline' as const
  },
  {
    id: '2', 
    title: 'Goofy Friend',
    description: 'The Goofy Friend is an issue of the best comics containing goofy characters.',
    image: '/api/placeholder/200/250',
    buttonText: 'Notify Me',
    buttonVariant: 'outline' as const
  },
  {
    id: '3',
    title: 'By Young Geek',
    description: 'Rise of the Slayer - Issue #3',
    price: 'Mint Date: 20/10/25',
    subtitle: 'Mint Price: 10 USDT', 
    image: '/api/placeholder/200/250',
    buttonText: 'Notify Me',
    buttonVariant: 'outline' as const
  }
]

const mintComics = [
  {
    id: '1',
    title: 'Rise of the Slayer',
    subtitle: '5 USDT',
    image: '/api/placeholder/200/250',
    premium: true
  },
  {
    id: '2',
    title: 'Goofy Friend',
    description: 'The Goofy Friend is an issue of the best comics containing goofy characters.',
    image: '/api/placeholder/200/250',
    buttonText: 'Explore Issue'
  },
  {
    id: '3',
    title: 'Kakashi',
    subtitle: '5 USDT',
    image: '/api/placeholder/200/250'
  }
]

const topComics = [
  {
    rank: 1,
    title: 'NaruHina',
    author: 'NaruHina',
    floorPrice: '8 USDT',
    priceChange: 5.65,
    copies: 500,
    sales: 30,
    volume: '300k USDT'
  },
  {
    rank: 2,
    title: 'NaruHina', 
    author: 'NaruHina',
    floorPrice: '8 USDT',
    priceChange: -4.65,
    copies: 500,
    sales: 30,
    volume: '300k USDT'
  },
  {
    rank: 3,
    title: 'NaruHina',
    author: 'NaruHina', 
    floorPrice: '8 USDT',
    priceChange: 5.65,
    copies: 500,
    sales: 30,
    volume: '300k USDT'
  },
  {
    rank: 4,
    title: 'NaruHina',
    author: 'NaruHina',
    floorPrice: '8 USDT', 
    priceChange: -4.65,
    copies: 500,
    sales: 30,
    volume: '300k USDT'
  },
  {
    rank: 5,
    title: 'NaruHina',
    author: 'NaruHina',
    floorPrice: '8 USDT',
    priceChange: 5.65,
    copies: 500,
    sales: 30, 
    volume: '300k USDT'
  }
]

const creators = [
  { id: '1', name: 'Auntmae', stories: 5, readers: '1.2k', avatar: '' },
  { id: '2', name: 'Auntmae', stories: 12, readers: '1.5k', avatar: '' },
  { id: '3', name: 'Auntmae', stories: 8, readers: '1.2k', avatar: '' },
  { id: '4', name: 'Auntmae', stories: 15, readers: '2.1k', avatar: '' }
]

export default function MainPage() {
  return (
    <div className="min-h-screen bg-black w-full">
      {/* Mobile Layout */}
      <div className="lg:hidden w-full">
        <Header />
        <Sidebar />
        
        <main className="p-4 overflow-y-auto bg-[#110C03]">
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
          <FeaturedComic 
            title="Hinata Story Releaved"
            author="Masashi Kishimoto"
            chapters={158}
            likes="4.9M"
            description=""
            tags={['Romance', 'Drama', 'Slice of Life']}
            image="/api/placeholder/300/400"
          />

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
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium">
              Explore More Comics
            </Button>
          </div>
        </main>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-[280px_1fr] min-h-screen w-full">
        <Sidebar />
        
        <div className="flex flex-col w-full">
          <Header />
          
          <main className="flex-1 p-6 overflow-y-auto bg-[#110C03] w-full">
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
          <FeaturedComic 
            title="Hinata Story Releaved"
            author="Masashi Kishimoto"
            chapters={158}
            likes="4.9M"
            description=""
            tags={['Romance', 'Drama', 'Slice of Life']}
            image="/api/placeholder/300/400"
          />

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
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium">
              Explore More Comics
            </Button>
          </div>

        </main>
      </div>
    </div>

    </div>
  )
}