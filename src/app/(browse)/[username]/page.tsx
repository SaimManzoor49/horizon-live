import { db } from '@/lib/db'
import { isFollowingUser } from '@/lib/follow-service'
import { getUserByUserName } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import React from 'react'
import { Actions } from './_components/actions'
import { isBlockedByUser } from '@/lib/block-service'

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
    const isBlocked = await isBlockedByUser(user.id)
    // if(isBlocked) {
    //     notFound()
    // }
  return (
    <div >
        {user.username}
        isFollowing :{`${isFollowing}`}
        <Actions isFollowing={isFollowing} userId={user.id} />
        <p>is blocked by this user: {`${isBlocked}`}</p>
        </div>
  )
}

export default UserPage