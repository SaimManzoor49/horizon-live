import React from 'react'
import Wrapper from './Wrapper'
import Toggle from './Toggle'
import Recomanded from './Recomanded'
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