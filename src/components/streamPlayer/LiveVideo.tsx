'use client'

import { Participant, Track } from "livekit-client"
import { useEffect, useRef, useState } from "react"

import {
    useTracks
} from '@livekit/components-react'
import FullScreen from "./FullScreen"
import { useEventListener } from "usehooks-ts"
import VolumeControl from "./volumeControl"


interface LiveVideoProps {
    participant: Participant
}


const LiveVideo = ({ participant }: LiveVideoProps) => {
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [volume, setVolume] = useState(0)
    const videoRef = useRef<HTMLVideoElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)


    useTracks([Track.Source.Camera, Track.Source.Microphone]).filter((track) => track.participant.identity === participant.identity).forEach((track) => {
        if (videoRef.current) {
            track.publication.track?.attach(videoRef.current)
        }
    })


    const toggleFullScreen = () => {
        if (isFullScreen) {
            document.exitFullscreen()
        } else if (wrapperRef?.current) {
            wrapperRef.current.requestFullscreen()
        }
    }


    const handleFullScreenChange = () => {
        const isCurrentlyFullScreen = document.fullscreenElement !== null
        setIsFullScreen(isCurrentlyFullScreen)
    }

    useEventListener('fullscreenchange', handleFullScreenChange, wrapperRef)



    const onVolumeChange = (value: number) => {
        setVolume(+value)

        if (videoRef?.current) {
            videoRef.current.muted = value === 0;
            videoRef.current.volume = +value * 0.01;
        }
    }

    const toggleMuted = () => {
        const isMuted = volume === 0
        setVolume(isMuted ? 50 : 0)

        if (videoRef?.current) {
            videoRef.current.muted = !isMuted;
            videoRef.current.volume = isMuted ? 0.5 : 0;
        }
    }

    useEffect(()=>{
        onVolumeChange(0)
    },[])

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
                    <VolumeControl
                        onChange={onVolumeChange}
                        onToggle={toggleMuted}
                        value={volume}
                    />
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