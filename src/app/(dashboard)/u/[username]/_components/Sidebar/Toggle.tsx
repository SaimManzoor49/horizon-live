'use client'

import React from 'react'
import { useCreatorSidebar } from '../../../../../../store/useCreatorSidebar'
import Hint from '@/components/hint'
import { Button } from '@/components/ui/button'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'

const Toggle = () => {

    const { collapsed, onCollapse, onExpand } = useCreatorSidebar(state => state)

    const label = collapsed ? "Expand" : "Collapse"

    return (
        <>
            {collapsed && (
                <div className="w-full hidden lg:flex items-center justify-center pt-4 mb-4">
                    <Hint
                        label={label}
                        side='right'
                        asChild
                    >
                        <Button
                            variant={'ghost'}
                            className='h-auto p-2'
                            onClick={onExpand}
                        >
                            <ArrowRightFromLine className='h-4 w-4' />
                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsed && (
                <div className="w-full hidden lg:flex items-center justify-center p-3 pl-6 mb-2 ">
                    <p className='font-semibold text-primary'>
                        Dashboard
                    </p>
                    <Hint
                        label={label}
                        side='right'
                        asChild
                    >
                        <Button
                            variant={'ghost'}
                            className='h-auto p-2 ml-auto'
                            onClick={onCollapse}
                        >
                            <ArrowLeftFromLine className='h-4 w-4' />
                        </Button>
                    </Hint>
                </div>
            )}

        </>
    )
}

export default Toggle