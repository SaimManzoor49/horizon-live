import { useRef, useState, useTransition, ElementRef } from "react"
import { Button } from "../ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { updateStream } from "@/actions/stream"
import { toast } from "sonner"
import { UploadDropzone } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import Hint from "../hint"
import { Trash } from "lucide-react"
import Image from "next/image"



interface InfoModalProps {
    initialName: string
    initialThumbnailUrl: string | null
}

const InfoModal = ({ initialName, initialThumbnailUrl }: InfoModalProps) => {

    const [name, setName] = useState(initialName)
    const [thumbnail, setThumbnail] = useState(initialThumbnailUrl)
    const [pending, startTransition] = useTransition()
    const closeRef = useRef<ElementRef<"button">>(null)
    const router = useRouter();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        startTransition(() => {
            updateStream({ name: name })
                .then(() => {
                    toast.success("Stream updated")
                    closeRef?.current?.click();
                })
                .catch(() => toast.error("Something went wrong"))
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={'link'}
                    size={'sm'}
                    className="ml-auto"
                >
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit stream info
                    </DialogTitle>
                </DialogHeader>
                <form className="space-y-14" onSubmit={onSubmit}>
                    <div className="space-y-2">
                        <Label>
                            Name
                        </Label>
                        <Input
                            placeholder="Stream name"
                            onChange={onChange}
                            value={name}
                            disabled={pending}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>
                            Thumbanil
                        </Label>
                        {thumbnail ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                <div className="absolute top-2 right-2 z-10">
                                    <Hint label="Remove thumbnail" asChild side="left">
                                        <Button 
                                        type="button"
                                        disabled={pending}
                                        onClick={()=>{}}
                                        className="h-auto w-auto p-1.5"
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </Hint>
                                </div>
                                <Image
                                src={thumbnail}
                                alt="Thumbnail"
                                fill
                                className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="rounded-xl border outline-dashed outline-muted">
                                <UploadDropzone
                                    endpoint="thumbnailUploder"
                                    appearance={
                                        {
                                            label: {
                                                color: '#FFFFFF'
                                            },
                                            allowedContent: {
                                                color: '#FFFFFF'
                                            }
                                        }}
                                    onClientUploadComplete={(res) => {
                                        setThumbnail(res?.[0]?.url)
                                        router.refresh();
                                    }}

                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between">
                        <DialogClose asChild ref={closeRef}>
                            <Button
                                type="button"
                                variant={'ghost'}
                            >
                                Cencel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            variant={'primary'}
                            disabled={pending}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default InfoModal