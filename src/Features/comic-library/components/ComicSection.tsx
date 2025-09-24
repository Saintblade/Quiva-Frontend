import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ComicCard } from '@/components/cards/ComicCard'

interface Comic {
  id: string
  title: string
  price?: string
  subtitle?: string
  description?: string
  image: string
  premium?: boolean
  buttonText?: string
  buttonVariant?: 'default' | 'outline'
}

interface ComicSectionProps {
  title: string
  comics: Comic[]
  showNavigation?: boolean
  cardSize?: 'small' | 'medium' | 'large'
}

export function ComicSection({ 
  title, 
  comics, 
  showNavigation = false,
  cardSize = "medium"
}: ComicSectionProps) {
  return (
    <section className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-xl font-bold">{title}</h2>
        {showNavigation && (
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Comics Grid */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
        {comics.map((comic) => (
          <div key={comic.id} className="flex-shrink-0">
            <ComicCard 
              title={comic.title}
              price={comic.price}
              subtitle={comic.subtitle}
              description={comic.description}
              image={comic.image}
              premium={comic.premium}
              buttonText={comic.buttonText}
              buttonVariant={comic.buttonVariant}
              size={cardSize}
            />
          </div>
        ))}
      </div>
    </section>
  )
}