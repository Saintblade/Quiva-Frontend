import ComicsLibrary from '@/features_temp/comic-library/components/ComicsLibrary'
import { trendingComics } from '@/features_temp/comic-library/data/sampleData'
import React from 'react'

function page() {
  return (
    <>
        <ComicsLibrary comics={trendingComics}/>
    </>
  )
}

export default page