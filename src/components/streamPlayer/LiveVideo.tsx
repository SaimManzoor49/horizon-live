'use client'

import { Participant,Track } from "livekit-client"
import { useRef, useState } from "react"

import {
useTracks
} from '@livekit/components-react'
import FullScreen from "./FullScreen"
import { useEventListener } from "usehooks-ts"


interface LiveVideoProps {
    participant: Participant
}


const LiveVideo = ({ participant }: LiveVideoProps) => {
    const [isFullScreen,setIsFullScreen] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)


    useTracks([Track.Source.Camera,Track.Source.Microphone]).filter((track)=>track.participant.identity===participant.identity).forEach((track)=>{
        if(videoRef.current){
            track.publication.track?.attach(videoRef.current)
        }
    })


    const toggleFullScreen = ()=>{
        if(isFullScreen){
            document.exitFullscreen()
        }else if(wrapperRef?.current){
            wrapperRef.current.requestFullscreen()
        }
    }


    const handleFullScreenChange = ()=>{
        const isCurrentlyFullScreen = document.fullscreenElement !==null
        setIsFullScreen(isCurrentlyFullScreen)
    }

    useEventListener('fullscreenchange',handleFullScreenChange,wrapperRef)

    return (
        <div
            className="relative h-full flex"
            ref={wrapperRef}
        >
            <video
                width={'100%'}
                ref={videoRef}
            />
            <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
                <div className="absolute bottom-0 flex h-14 items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
                    <FullScreen
                    isFullScreen={isFullScreen}
                    onToggle={toggleFullScreen}
                    />
                </div>
            </div>
        </div>
    )
}

export default LiveVideo