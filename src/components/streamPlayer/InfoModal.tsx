import { useRef, useState, useTransition,ElementRef } from "react"
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


interface InfoModalProps {
    initialName: string
    initialThumbnailUrl: string | null
}

const InfoModal = ({ initialName, initialThumbnailUrl }: InfoModalProps) => {

const [name,setName]= useState(initialName)
const [pending,startTransition]= useTransition()
const closeRef = useRef<ElementRef<"button">>(null)

const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setName(e.target.value)
}

const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    startTransition(()=>{
        updateStream({name:name})
        .then(()=>{
            toast.success("Stream updated")
            closeRef?.current?.click();
        })
        .catch(()=>toast.error("Something went wrong"))
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