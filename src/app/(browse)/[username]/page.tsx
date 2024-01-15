import { db } from '@/lib/db'
import { isFollowingUser } from '@/lib/follow-service'
import { getUserByUserName } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import React from 'react'
import { Actions } from './_components/actions'
import { isBlockedByUser } from '@/lib/block-service'
import StreamPlayer from '@/components/streamPlayer'

interface UserPageProps {
  params: { username: string }
}

const UserPage = async ({ params }: UserPageProps) => {
  const username = params.username
  const user = await getUserByUserName(username)

  if (!user || !user.stream) {
    notFound()
  }

  const isFollowing = await isFollowingUser(user.id)
  const isBlocked = await isBlockedByUser(user.id)

  if (isBlocked) {
    notFound()
  }

  return (
    <StreamPlayer
      user={user}
      stream={user.stream}
      isFollowing={isFollowing}

    />
  )
}

export default UserPage