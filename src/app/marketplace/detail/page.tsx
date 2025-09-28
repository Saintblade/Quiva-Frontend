'use client'

import ComicDetail from '@/features/comic-library/components/ComicDetail'

function page() {
   const sampleComic = {
    title: "Into the Fold",
    issueNumber: 2,
    author: {
      name: "Maya Lee",
      avatar: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80"
    },
    coverImage: "https://cdn.marvel.com/content/1x/asm2025001_dimeo.jpg",
    description: "Toosnight Two meals are better than one, but two hundred thousand means trembling from space when enchanted champions aiming to take over our planet and turn us into ToshEs are definitely worse. This horror-comedy series follows toeless Chuck as he stumbles his way through a dangerous journey with mutants on every face, toothless terror and a professor so ugly, even his mother couldn't love him.",
    tags: ["Sci-Fi", "Adventure"],
    isFree: true,
    issueDetails: {
      creators: "May Lee",
      pages: 24,
      publisher: "TOSHES",
      publicationDate: "18 December 2023"
    },
    otherIssues: [
      {
        id: "1",
        title: "Guardian of the Forgotten Temple #3",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=300&fit=crop",
        date: "15 June 2023",
        isFree: true
      },
      {
        id: "2",
        title: "Guardian of the Forgotten Temple #3",
        image: "https://images.unsplash.com/photo-1551263640-1c007852f616?w=200&h=300&fit=crop",
        date: "15 June 2023",
        isFree: true
      },
      {
        id: "3",
        title: "Guardian of the Forgotten Temple #4",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=300&fit=crop",
        date: "22 June 2023"
      },
      {
        id: "4",
        title: "Guardian of the Forgotten Temple #5",
        image: "https://cdn.marvel.com/content/1x/asm2025001_dimeo.jpg",
        date: "29 June 2023"
      }
    ]
  }

  return (
    <ComicDetail
      {...sampleComic}
      onBack={() => console.log('Back clicked')}
      onReadIssue={() => console.log('Read issue clicked')}
      onPreviewIssue={() => console.log('Preview issue clicked')}
      onEnlargeCover={() => console.log('Enlarge cover clicked')}
    />
  )
}

export default page