import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ComicCardProps {
  title: string
  price?: string
  subtitle?: string
  description?: string
  image: string
  premium?: boolean
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
  buttonText = "Explore Issue",
  buttonVariant = "default",
  size = "medium"
}: ComicCardProps) {
  const cardSizes = {
    small: "w-48 h-64",
    medium: "w-56 h-72", 
    large: "w-64 h-80"
  }

  return (
    <div className={`${cardSizes[size]} bg-gray-900 rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-200`}>
      {/* Comic Cover */}
      <div className="relative h-2/3 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {premium && (
          <Badge className="absolute top-2 right-2 bg-orange-500 text-white border-none">
            Premium
          </Badge>
        )}
      </div>

      {/* Comic Info */}
      <div className="p-4 h-1/3 flex flex-col justify-between">
        <div>
          <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">{title}</h3>
          {subtitle && (
            <p className="text-gray-400 text-xs mb-1">{subtitle}</p>
          )}
          {price && (
            <p className="text-gray-400 text-xs mb-2">{price}</p>
          )}
          {description && (
            <p className="text-gray-400 text-xs mb-2 line-clamp-2">{description}</p>
          )}
        </div>

        <Button 
          className={`w-full text-xs py-1 h-8 ${
            buttonVariant === 'default' 
              ? 'bg-orange-500 hover:bg-orange-600 text-white' 
              : 'bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white'
          }`}
          variant={buttonVariant}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}