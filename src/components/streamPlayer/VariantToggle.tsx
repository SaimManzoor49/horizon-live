'use client'

import { MessageSquare, Users } from "lucide-react"
import Hint from "../hint"
import { Button } from "../ui/button"
import { ChatVariants, useChatSidebar } from "@/store/useChatSidebar"


const VariantToggle = () => {
const {variant,onChangeVariant} = useChatSidebar((state)=>state)

const isChat = variant==ChatVariants.CHAT

const Icon = isChat ? Users : MessageSquare

const onToggle=()=>{
    const newVariant = isChat ?ChatVariants.COMMUNITY:ChatVariants.CHAT
    onChangeVariant(newVariant)
}

const label = isChat ?"Community":"Go back to chat"

  return (
    <Hint label={label} side="left" asChild>
        <Button
        variant={'ghost'}
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
        onClick={onToggle}
        >
            <Icon className="h-4 w-4" />
        </Button>
    </Hint>
  )
}

export default VariantToggle