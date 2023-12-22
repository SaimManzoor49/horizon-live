'use client'
import React from 'react'
import { useSidebar } from '../../../../../store/useSidebar'
import { Button } from '@/components/ui/button'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'

const Toggle = () => {

    const { collapsed, onCollapse, onExpand } = useSidebar(state => state)

    const label = collapsed ? 'Expand' : 'Collapse';

    return (
        <>
        
            {!collapsed ? (
                <div className="p-3 pl-6 mb-2 flex items-center w-full">
                    <p
                        className='font-semibold text-primary'
                    >
                        For you
                    </p>
                    <Button
                     className='h-auto p-2 ml-auto'
                     variant={'ghost'}
                     onClick={onCollapse}
                    >
                        <ArrowLeftFromLine  className='h-4 w-4 '/>
                    </Button>
                </div>
            ):(
                <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
                    <Button 
                    variant={'ghost'}
                     className='h-auto p-2'
                     onClick={onExpand}
                     >
                        <ArrowRightFromLine className='w-4 h-4' />
                    </Button>
                </div>
            )}
        </>
    )
}

export default Toggle