'use client'

import { MinusCircle } from "lucide-react"
import { useTransition } from "react"
import { toast } from "sonner"
import Hint from "../hint"
import { onBlock } from "@/actions/block"
import { cn, stringToColor } from "@/lib/utils"
import { Button } from "../ui/button"

interface CommunityItemProps {
    hostName: string
    viewerName: string
    participantName?: string /////////////// optional
    participantIdentity: string
}


const CommunityItem = ({ hostName, viewerName, participantIdentity, participantName }: CommunityItemProps) => {

    const color = stringToColor(participantName || "")
    const isSelf = participantName===viewerName
    const isHost = viewerName===hostName

    return (
        <div className="group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5">
            <p style={{ color: color }}>
                {participantName}
            </p>
        {isHost && !isSelf && (
            <Hint label="Block">
                <Button className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition">
                    <MinusCircle />
                </Button>
            </Hint>
        )}
        </div>
    )
}

export default CommunityItem