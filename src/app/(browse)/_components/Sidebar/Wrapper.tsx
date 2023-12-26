'use client'
import React, { useEffect, useState } from 'react'
import { useSidebar } from '../../../../../store/useSidebar'
import { cn } from '@/lib/utils'
import { ToggleSkeleton } from './Toggle'
import { RecomandedSkeleton } from './Recomanded'
import { FollowingSkeleton } from './Following'

interface WrapperProps {
    children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const { collapsed } = useSidebar((state) => state)


    return (
        <>
            {mounted ? (
                <aside className={cn(
                    'fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50',
                    collapsed && "w-[70px]"
                )}>
                    {children}
                </aside>
            ) :(
                <aside className='fixed left-0 flex flex-colw-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50'>
                    <ToggleSkeleton />
                    <FollowingSkeleton />
                    <RecomandedSkeleton />
                </aside>
            )
            }
        </>
    )
}

export default Wrapper