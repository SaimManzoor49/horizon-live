'use client'
import { User } from '@prisma/client'
import React from 'react'

interface FollowingProps{
    data:User[]
}

const Following = ({data}:FollowingProps) => {
  return (
    <div>Following</div>
  )
}

export default Following