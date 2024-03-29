'use client'

import { ChatVariants, useChatSidebar } from "@/store/useChatSidebar"
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react"
import { ConnectionState } from "livekit-client"
import { useEffect, useMemo, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import ChatHeader, { ChatHeaderSkeleton } from "./ChatHeader"
import ChatForm, { ChatFormSkeleton } from "./ChatForm"
import { ChatList, ChatListSkeleton } from "./ChatList"
import Community from "./Community"

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
                <ChatList
                messages={reversedMessages}
                isHidden={isHidden}
                />
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
                <Community
                viewerName={viewerName}
                hostName={hostName}
                isHidden={isHidden}
                />
                </>
            )}
        </div>
    )
}

export default Chat
export const ChatSkeleton = ()=>{
    return(
        <div className="flex flex-col border-l border-b py-0 h-[calc(100vh-80px)]  border-2">
            <ChatHeaderSkeleton />
            <ChatListSkeleton />
            <ChatFormSkeleton />
        </div>
    )
}