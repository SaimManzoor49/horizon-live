'use client'

import { ChatVariants, useChatSidebar } from "@/store/useChatSidebar"
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react"
import { ConnectionState } from "livekit-client"
import { useEffect, useMemo, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import ChatHeader from "./ChatHeader"
import ChatForm from "./ChatForm"

interface ChatProps {
    hostName: string,
    hostIdentity: string
    viewerName: string
    isFollowing: boolean
    isChatDelayed: boolean
    isChatEnabled: boolean
    isChatFollowersOnly: boolean
}

const Chat = ({ hostIdentity, hostName, isChatDelayed, isChatEnabled, isChatFollowersOnly, isFollowing, viewerName }: ChatProps) => {
    const [value, setValue] = useState("")
    const matches = useMediaQuery('(max-width: 1024px)')

    const { variant, onExpand } = useChatSidebar((state) => state)
    const connectionState = useConnectionState()
    const participant = useRemoteParticipant(hostIdentity)

    const isOnline = participant && connectionState == ConnectionState.Connected
    
    const isHidden = !isChatEnabled || !isOnline

    const {chatMessages:messages,send} = useChat();

    useEffect(()=>{
        if(matches) onExpand();
    },[matches,onExpand])

    const reversedMessages = useMemo(()=>{
        return messages.sort((a,b)=>b.timestamp - a.timestamp)
    },[messages])

    const onSubmit = ()=>{

        if(!send) return;
        send(value)
        setValue("")
    }

    const onChange = (value:string)=>{
        setValue(value)
    }

    return (
        <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
            <ChatHeader />
            {variant===ChatVariants.CHAT && (
                <>
                <ChatForm 
                onSubmit={onSubmit}
                value={value}
                onChange={onChange}
                isHidden={isHidden}
                isChatFollowersOnly={isChatFollowersOnly}
                isDelayed={isChatDelayed}
                isFollowing={isFollowing}
                />
                </>
            )}
            {variant===ChatVariants.COMMUNITY && (
                <>
                <p>chat Community</p>                
                </>
            )}
        </div>
    )
}

export default Chat