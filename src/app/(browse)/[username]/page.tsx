import { db } from '@/lib/db'
import { isFollowingUser } from '@/lib/follow-service'
import { getUserByUserName } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import React from 'react'
import { Actions } from './_components/actions'

interface UserPageProps{
    params:{username:string}
}

const UserPage = async({params}:UserPageProps) => {
    const username = params.username
    const user = await getUserByUserName(username)

    if(!user) {
        notFound()
    }

const isFollowing = await isFollowingUser(user.id)

  return (
    <div >
        {user.username}
        isFollowing :{`${isFollowing}`}
        <Actions />
        </div>
  )
}

export default UserPage