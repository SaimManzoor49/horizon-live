'use client'
import { Button } from "@/components/ui/button"
import { onFollow } from "../../../../../actions/follow"
import { useTransition } from "react"


export const Actions = ()=>{
const [isPending,startTransition] = useTransition()
    const onClick = ()=>{
        startTransition(()=>{
            onFollow('jas')
        })
    }

    return(
        <Button variant={'primary'} onClick={onClick} disabled={isPending}>
            Follow
        </Button>
    )
}