import React from 'react'
import BodyGallerySkeleton from './BodyGallerySkeleton'
import TopBodyGallerySkeleton from './TopBodyGallerySkeleton'

function MainGallerySkeleton() {
  return (
    <div>
      <TopBodyGallerySkeleton />
      <BodyGallerySkeleton />
    </div>
  )
}

export default MainGallerySkeleton
