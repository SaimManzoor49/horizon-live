'use client'

import { ConnectionState, Track } from "livekit-client"
import {
useConnectionState,
useRemoteParticipant,
useTracks
} from '@livekit/components-react'
import OfflineVideo from "./OfflineVideo"
import LoadingVideo from "./LoadingVideo"
import LiveVideo from "./LiveVideo"

interface VideoProps{
  hostName:string,
  hostIdentity:string
}

const Video = ({hostIdentity,hostName}:VideoProps) => {

  const connectionState = useConnectionState()
  const participant = useRemoteParticipant(hostIdentity)
  const track = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track)=>track.participant.identity===hostIdentity)


  let content;

  if(!participant && connectionState === ConnectionState.Connected){
    content =<OfflineVideo username={hostName} />
  }else if(!participant || track.length===0){
    content =<LoadingVideo  label={connectionState} /> 
  }else{
    content =<LiveVideo participant={participant} /> 

  }



  return (
    <div className='aspect-video border-b group relative'>
      {content}
      </div>
  )
}

export default Video