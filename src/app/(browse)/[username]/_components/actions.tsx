'use client'
import { Button } from "@/components/ui/button"
import { onFollow, onUnFollow } from "../../../../../actions/follow"
import { useTransition } from "react"
import { toast } from "sonner"

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


    return(
        <Button 
        variant={'primary'}
         onClick={onClick}
          disabled={isPending}
          >
            {isFollowing ? "Unfollow" : "Follow"}
            
        </Button>
    )
}