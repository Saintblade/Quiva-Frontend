import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface FeaturedComicProps {
  title: string
  author: string
  chapters: number
  likes: string
  description: string
  tags: string[]
  image: string
}

export function FeaturedComic({
  title,
  author,
  chapters,
  likes,
  description,
  tags,
  image
}: FeaturedComicProps) {
  return (
    <section className="mb-8">
      <h2 className="text-white text-xl font-bold mb-4">Recommended for You</h2>
      
      <div className="bg-gradient-to-r from-purple-900 to-purple-600 rounded-lg overflow-hidden relative">
        <div className="flex">
          {/* Content */}
          <div className="flex-1 p-8 flex flex-col justify-center">
            <h3 className="text-white text-3xl font-bold mb-2">{title}</h3>
            <p className="text-purple-200 text-sm mb-4">By {author}</p>
            
            <div className="flex items-center space-x-6 text-white text-sm mb-4">
              <span>{chapters} Chapters</span>
              <span>{likes} Likes</span>
              <span>Romance</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="bg-white/20 text-white border-none text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            <p className="text-purple-100 text-sm mb-6 max-w-md">{description}</p>
            
            <Button className="bg-orange-500 hover:bg-orange-600 text-white w-fit">
              Read Now
            </Button>
          </div>
          
          {/* Character Image */}
          <div className="w-1/3 relative">
            <img 
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}