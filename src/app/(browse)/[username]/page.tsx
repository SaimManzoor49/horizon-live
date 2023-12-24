import { db } from '@/lib/db'
import { getUserByUserName } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import React from 'react'

interface UserPageProps{
    params:{username:string}
}

const UserPage = async({params}:UserPageProps) => {
    const username = params.username
    const user = await getUserByUserName(username)

    if(!user) {
        notFound()
    }

  return (
    <div >
        {user.username}
        </div>
  )
}

export default UserPage