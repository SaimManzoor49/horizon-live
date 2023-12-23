'use client'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useSidebar } from '../../../../../store/useSidebar'
import {Skeleton} from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import UserAvatar from '@/components/UserAvatar'
interface UserItemProps{
    username:string,
    imageUrl:string,
    isLive?:boolean
}

const UserItem = ({username,imageUrl,isLive}:UserItemProps) => {

    const pathname = usePathname()
    const {collapsed} = useSidebar(state=>state)
    const href = `/${pathname}`
    const isActive = pathname === href

  return (
    <Button 
    asChild
    variant={'ghost'}
    className={cn(
        "w-full g-12",
        collapsed ? 'justify-center':'justify-start',
        isActive && 'bg-accent'
    )}
    >
        <Link href={href}>
        <div className={cn(
            'flex items-center w-full gap-x-4',
            collapsed && 'justify-center'
        )}>
            <UserAvatar imageUrl={imageUrl} username={username} isLive={isLive} />
        </div>
        </Link>
    </Button>
    
  )
}

export default UserItem