'use client'

import { useChatSidebar } from "@/store/useChatSidebar"
import { useConnectionState, useRemoteParticipant } from "@livekit/components-react"
import { ConnectionState } from "livekit-client"
import { useMediaQuery } from "usehooks-ts"

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

    const matches = useMediaQuery('(max-width: 1024px)')

    const { variant, onExpand } = useChatSidebar((state) => state)
    const connectionState = useConnectionState()
    const participant = useRemoteParticipant(hostIdentity)

    const isOnline = participant && connectionState == ConnectionState.Connected
    
    const isHidden = !isChatEnabled || !isOnline

    return (
        <div>Chat</div>
    )
}

export default Chat