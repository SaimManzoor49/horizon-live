'use client'

import { onUnBlock } from "@/actions/block"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner"


interface UnblockButtonProps{
    userId:string
}

const UnblockButton = ({userId}:UnblockButtonProps) => {

    const [pending,startTransition] = useTransition()
const onClick = ()=>{
startTransition(()=>{
    onUnBlock(userId)
    .then((res)=>{
        return toast.success(`User ${res.blocked.username} unblocked`)
    })
    .catch(()=>{
        return toast.error(`Something went wrong`)
    })
})
}

  return (
    <Button 
    disabled={pending}
    onClick={onClick}
    variant={'link'}
    className="text-blue-500 w-full"
    size={'sm'}
    >
        Unblock
    </Button>
  )
}

export default UnblockButton