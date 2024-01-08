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


const CommunityItem = ({hostName,viewerName,participantIdentity,participantName}:CommunityItemProps) => {
    return (
        <>
        <div>{viewerName}</div>
        <div>{hostName}</div>
        <div>{participantIdentity}</div>
        <div>{hostName}</div>
        </>
    )
}

export default CommunityItem