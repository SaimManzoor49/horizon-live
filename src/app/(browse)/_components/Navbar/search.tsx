'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import React, { useState } from 'react'

const Search = () => {
const [value, setValue] = useState("")
    const router = useRouter()

    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(!value) return

        const url = qs.stringifyUrl({
            url:"/search",
            query:{term:value}
        }, {skipEmptyString:true})
        router.push(url)
    }

    const onClear = ()=>{
        setValue("")
    }


    return (
        <form
            className='relative w-full lg:w-[400px] flex items-center'
            onSubmit={onSubmit}
        >
            <Input
                placeholder='Serach'
                className='rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
                value={value}
                onChange={(e)=>setValue(e.target.value)}
            />
            {value && (
                <X
                 className='absolute top-3 right-14 h-4 w-4 text-muted-foreground cursor-pointer hover:opacity-75 trasnition'
                 onClick={onClear}
                 />
            )}
            <Button
                type='submit'
                size={'sm'}
                variant={'secondary'}
                className='rounded-l-none'
            >
                <SearchIcon className='h-5 w-5 text-muted-foreground' />
            </Button>
        </form>
    )
}

export default Search