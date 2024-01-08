'use client'

import { useParticipants } from "@livekit/components-react";


interface ChatCommunityProps{
    hostName:string;
    viewerName:string;
    isHidden:boolean
}

const Community = ({hostName,viewerName,isHidden}:ChatCommunityProps) => {
    const participants = useParticipants()
  return (
    <div>
        {participants.map((participant)=>(
            <div className="" key={Math.random()}>
                {JSON.stringify(participant)}
            </div>
        ))}
    </div>
  )
}

export default Community