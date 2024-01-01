'use client'
import { userViewerToken } from '@/hooks/userViewerToken'
import { User,Stream } from '@prisma/client'
import React from 'react'

interface StreamPlayerProps {
    user: User & { stream: Stream | null },
    stream: Stream,
    isFollowing: boolean,
}

const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {

    const {token,name,identity} = userViewerToken(user.id)

    if(!token || !name || !identity) {
        return (
            <div>Cannot watch the stream</div>
        )
    }

    return (
        <div>
            Allowed to watch stream
        </div>
    )
}

export default StreamPlayer