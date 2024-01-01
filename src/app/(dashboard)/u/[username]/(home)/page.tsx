import { getUserByUserName } from '@/lib/user-service'
import { currentUser } from '@clerk/nextjs'
import React from 'react'

interface CreatorPageProps{
  params:{
    username:string
  }
}

const CreatorPage = async({params}:CreatorPageProps) => {
const externalUser = await currentUser()
const user = await getUserByUserName(params.username)

if(!user || user.externalUserId!==externalUser?.id|| !user.stream){
  throw new Error("Unauthorized")
}



  return (
    <div className='h-full'>

    </div>
  )
}

export default CreatorPage