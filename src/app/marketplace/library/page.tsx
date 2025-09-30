import ComicsLibrary from '@/features/comic-library/components/ComicsLibrary'
import { trendingComics } from '@/features/comic-library/data/sampleData'
import React from 'react'

function page() {
  return (
    <>
        <ComicsLibrary comics={trendingComics}/>
    </>
  )
}

export default page