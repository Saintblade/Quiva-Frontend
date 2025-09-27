'use client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

interface ComicCardProps {
  title: string
  price?: string
  subtitle?: string
  description?: string
  image: string
  premium?: boolean
  free?: boolean
  buttonText?: string
  buttonVariant?: 'default' | 'outline'
  size?: 'small' | 'medium' | 'large'
}

export function ComicCard({ 
  title, 
  price, 
  subtitle, 
  description, 
  image, 
  premium = false,
  free = false,
  buttonText = "Explore Issue",
  buttonVariant = "default",
  size = "medium"
}: ComicCardProps) {
  const cardSizes = {
    small: "w-56 h-64",
    medium: "w-64 h-72", 
    large: "w-72 h-80"
  }

  // Truncate description to a reasonable length for hover overlay
  const truncatedDescription = description && description.length > 80 
    ? description.substring(0, 80) + '...' 
    : description

  return (
    <motion.div 
      className={`${cardSizes[size]} relative rounded-xl overflow-hidden group cursor-pointer`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2, ease: "easeInOut" }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        whileHover={{ 
          scale: 1.1,
          transition: { duration: 0.6, ease: "easeOut" }
        }}
      />
      
      {/* Dark gradient overlay on image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black-100/60 via-black-100/20 to-black-100/40" />
      
      {/* Dark overlay that's always present but gets darker on hover */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all duration-300" />

      {/* Premium/Free Badge */}
      {(premium || free) && (
        <div className="absolute top-3 left-3 z-10">
          <Badge 
            className={`text-xs font-medium border-none rounded-2xl ${
              premium 
                ? 'bg-gradient-to-r from-white/20 to-[#1E1E1E] text-white' 
                : 'bg-gray-600 text-white'
            }`}
          >
            {premium ? (
              <span className="flex items-center gap-1">
                Premium
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E57226">
                  <path d="M7 14l3-3 7 7-3 3-7-7z"/>
                  <path d="M5.5 7.5l3-3L17 13l-3 3L5.5 7.5z"/>
                </svg>
              </span>
            ) : (
              'Free'
            )}
          </Badge>
        </div>
      )}

      {/* Default content - always visible at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 group-hover:opacity-0 transition-opacity duration-300 z-10">
        <div className="bg-gradient-to-t from-black/80 to-transparent absolute inset-0 -m-4 h-24" />
        <div className="relative">
          <h3 className="text-white font-bold text-lg leading-tight mb-1">
            {title}
          </h3>
          {price && (
            <p className="text-white/90 text-sm font-medium">{price}</p>
          )}
        </div>
      </div>

      {/* Hover content - full overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-white font-bold text-lg leading-tight">
            {title}
          </h3>
          
          {/* Price */}
          {price && (
            <p className="text-white/90 text-sm font-medium">{price}</p>
          )}
          
          {/* Description */}
          {truncatedDescription && (
            <p className="text-white/80 text-sm leading-relaxed">
              {truncatedDescription}
            </p>
          )}
          
          {/* Explore Button */}
          <Button 
            className={`w-full font-semibold transition-all duration-200 bg-secondary-200 hover:bg-secondary-200/80 text-black-500 rounded-full focus:ring-none`}
            variant={buttonVariant}
          >
            {buttonText}
          </Button>
        </div>
      </div>


    </motion.div>
  )
}