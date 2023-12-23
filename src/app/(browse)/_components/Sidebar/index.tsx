import React from 'react'
import Wrapper from './Wrapper'
import Toggle, { ToggleSkeleton } from './Toggle'
import Recomanded, { RecomandedSkeleton } from './Recomanded'
import { getRecomanded } from '@/lib/recomanded-users'

const Sidebar = async() => {

    const recomanded = await getRecomanded()

    return (
        <Wrapper>
            <Toggle />
            <div className="space-y-4 pt-4 lg:pt-0">
                <Recomanded  data={recomanded}/>
            </div>
        </Wrapper>
    )
}

export default Sidebar

export const SidebarSkeleton = ()=>{
    return(
        <aside className='fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50'>
            <ToggleSkeleton />
            <RecomandedSkeleton />
        </aside>
    )
}