'use client'
import {  User } from '@prisma/client'
import React from 'react'
import { useSidebar } from '../../../../../store/useSidebar'
import UserItem, { UserItemSkeleton } from './UserItem'


interface RecomandedProps{
    data:(User&{
        stream:{isLive:boolean}|null
    })[]
}

const Recomanded = ({data}:RecomandedProps) => {

    const {collapsed}= useSidebar(state=>state)

    const showLabel = !collapsed && data.length>0


  return (
    <div>
        {
            showLabel && (
                <div className="pl-5 mb-4">
                    <p className='text-sm text-muted-foreground'>Recomanded</p>
                </div>
            )}
            <ul className='space-y-2 px-2'>
                {data.map((user)=>(
                        <UserItem 
                        key={user.id}
                        username={user.username}
                        imageUrl={user.imageUrl}
                        isLive={user.stream?.isLive}
                        />
                ))}
            </ul>
    </div>
  )
}

export default Recomanded

export const RecomandedSkeleton =()=>{
   return(
     <ul className='px-2'>
    {[...Array(3)].map((_,i)=>(
        <UserItemSkeleton  key={i}/>
    ))}
    </ul>)
}