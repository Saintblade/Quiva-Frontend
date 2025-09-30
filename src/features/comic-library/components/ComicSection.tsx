'use client'

import React, { useRef } from 'react'
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
  showNavigation = true,
  cardSize = "medium"
}: ComicSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = cardSize === 'small' ? 200 : cardSize === 'medium' ? 280 : 320
      scrollContainerRef.current.scrollBy({
        left: -cardWidth * 2, // Scroll by 2 card widths
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = cardSize === 'small' ? 200 : cardSize === 'medium' ? 280 : 320
      scrollContainerRef.current.scrollBy({
        left: cardWidth * 2, // Scroll by 2 card widths
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="my-8 mt-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-xl font-bold">{title}</h2>
        {showNavigation && comics.length > 0 && (
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:text-white hover:bg-gray-800"
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:text-white hover:bg-gray-800"
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Comics Grid */}
      <div className='overflow-hidden max-w-6xl'>
        <div 
          ref={scrollContainerRef}
          className="flex w-full space-x-4 overflow-x-scroll scrollbar-hide pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
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
      </div>
    </section>
  )
}