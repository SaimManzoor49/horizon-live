'use client'

import { VerifiedIcon } from "lucide-react"
import BioModal from "./BioModal"


interface AboutCardProps {
    hostName: string
    hostIdentity: string
    viewerIdentity: string
    bio: string | null
    followedByCount: number
}

const AboutCard = ({
    hostName,
    hostIdentity,
    viewerIdentity,
    bio,
    followedByCount
}:AboutCardProps) => {

    const hostAsViewer = `host-${hostIdentity}`

    const isHost = viewerIdentity === hostAsViewer

    const followedByLabel = followedByCount === 1? "follower":"followers"

    return (
        <div className="px-4">
            <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
                        {hostName}
                        <VerifiedIcon />
                    </div>
                    {isHost && (
                      <BioModal 
                      initialValue={bio}
                      />
                    )}
                </div>
                <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">{followedByCount}</span> {followedByLabel}
                </div>
                <p className="text-sm">
                    {bio || "This user prefers to keep an air of mystery about him."}
                </p>
            </div>
            </div>
    )
}

export default AboutCard