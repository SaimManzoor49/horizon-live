'use client'

import { useParticipants } from "@livekit/components-react";
import { useState } from "react";
import { useDebounce } from "usehooks-ts";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import CommunityItem from "./CommunityItem";


interface ChatCommunityProps {
    hostName: string;
    viewerName: string;
    isHidden: boolean
}

const Community = ({ hostName, viewerName, isHidden }: ChatCommunityProps) => {

    const [value, setValue] = useState("")
    const debouncedValue = useDebounce<string>(value, 500)

    const participants = useParticipants()

    const onChange = (newValue: string) => {
        setValue(newValue)
    }

    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">Community is desabled</p>
            </div>
        )
    }

    return (
        <div className="p-4">
            <Input
             onChange={(e)=>onChange(e.target.value)}
             placeholder="Search Community"
             className="border-white/10"
             />
             <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
        No results
        </p>
        { participants.map((participant)=>(
            <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
            />
        ))}
             </ScrollArea>
        </div>
    )
}

export default Community