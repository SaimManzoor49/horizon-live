'use client'
import { Button } from "@/components/ui/button"
import { onFollow, onUnFollow } from "../../../../actions/follow"
import { useTransition } from "react"
import { toast } from "sonner"
import { onBlock } from "../../../../actions/block"

interface ActionsProps{
    isFollowing:boolean,
    userId:string
}

export const Actions = ({isFollowing,userId}:ActionsProps)=>{

const [isPending,startTransition] = useTransition()

    const handleFollow = ()=>{
        startTransition(()=>{
            onFollow(userId)
            .then((data)=>toast.success(`You are now Following ${data.following.username}`))
            .catch(()=>toast.error("Something went wrong"))
        })
    }

    const handleUnFollow = ()=>{
        startTransition(()=>{
            onUnFollow(userId)
            .then((data)=>toast.success(`You have Unfollowed user ${data.following.username}`))
            .catch(()=>toast.error("Something went wrong"))
        })
    }


    const onClick = ()=>{
        if(isFollowing){
            handleUnFollow()
        }else{
            handleFollow()
        }
    }


    const handleBlock = ()=>{
        startTransition(()=>{
            onBlock(userId)
            .then((data)=>toast.success(`Blocked the user ${data.blocked.username}`))
            .catch(()=>toast.error("Something went wrong"))
        })
    }

    return(
        <>
        <Button 
        variant={'primary'}
         onClick={onClick}
          disabled={isPending}
          >
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
        <Button onClick={handleBlock} disabled={isPending}>
            Block
        </Button>
        </>
    )
}   