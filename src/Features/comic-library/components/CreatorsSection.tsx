import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Creator {
  id: string
  name: string
  stories: number
  readers: string
  avatar: string
}

interface CreatorsSectionProps {
  creators: Creator[]
}

export function CreatorsSection({ creators }: CreatorsSectionProps) {
  return (
    <section className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-xl font-bold">Our Creators</h2>
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
      </div>

      {/* Creators Grid */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
        {creators.map((creator) => (
          <div 
            key={creator.id} 
            className="flex-shrink-0 w-48 bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors cursor-pointer"
          >
            {/* Avatar */}
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-3 mx-auto">
              <span className="text-white font-bold">
                {creator.name.charAt(0)}
              </span>
            </div>

            {/* Creator Info */}
            <div className="text-center">
              <h3 className="text-white font-semibold text-sm mb-1">
                {creator.name}
              </h3>
              <p className="text-gray-400 text-xs">
                {creator.stories} Stories | {creator.readers} Readers
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}