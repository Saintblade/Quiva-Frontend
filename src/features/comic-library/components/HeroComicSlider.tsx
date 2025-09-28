'use client'

import React, { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { MainButton } from '@/components/button'

export interface HeroComicData {
  id: string
  title: string
  description: string
  tags: string[]
  image: string
  buttonText?: string
}

interface HeroComicSliderProps {
  comics: HeroComicData[]
  autoplayDelay?: number
}

export function HeroComicSlider({ 
  comics, 
  autoplayDelay = 5000 
}: HeroComicSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance slides
  
  useEffect(() => {
    if (!isAutoPlaying || comics.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % comics.length)
    }, autoplayDelay)

    return () => clearInterval(interval)
  }, [comics.length, autoplayDelay, isAutoPlaying])

  // Handle mouse enter/leave for autoplay pause
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  // Handle dot click
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  if (comics.length === 0) return null

  const currentComic = comics[currentSlide]

  return (
    <section 
      className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={currentComic.image}
          alt={currentComic.title}
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black-400/90 via-black-400/60 to-black-400/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black-400/80 via-transparent to-black-400/40" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-start p-8 md:p-12 lg:p-16 z-10">
        <div className="max-w-2xl animate-fade-in">
          {/* Tags */}
          {currentComic.tags && currentComic.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {currentComic.tags.map((tag, tagIndex) => (
                <Badge 
                  key={tagIndex}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-light transition-colors text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight line-clamp-3">
            {currentComic.title}
          </h1>

          {/* Description */}
          <p className="text-white/90 text-sm md:text-lg lg:text-xl mb-8 max-w-3xl leading-relaxed line-clamp-3">
            {currentComic.description}
          </p>

          {/* Action Button */}
          <MainButton>
            {currentComic.buttonText || 'View'}
          </MainButton>
          {/* <Button 
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-8 py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
          >
            {currentComic.buttonText || 'View'}
          </Button> */}
        </div>
      </div>

      {/* Pagination Dots */}
      {comics.length > 1 && (
        <div className="absolute bottom-6 right-4 transform -translate-x-1/2 flex items-center space-x-2 z-20 bg-white/10 py-2 px-4 rounded-full">
          {comics.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-4 md:w-8 h-2 md:h-4 bg-white rounded-full' 
                  : 'w-2 md:w-4 h-2 md:h-4 bg-white/40 hover:bg-white/60 rounded-full'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Navigation Arrows (appear on hover) */}
      {comics.length > 1 && (
        <>
          <button
            onClick={() => setCurrentSlide((prev) => prev === 0 ? comics.length - 1 : prev - 1)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % comics.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </>
      )}
    </section>
  )
}