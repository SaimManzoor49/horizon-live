import { StreamPlayerSkeleton } from '@/components/streamPlayer'
import React from 'react'

const Loading = () => {
  return (
    <div className='h-full'>
        <StreamPlayerSkeleton />
    </div>
  )
}

export default Loading