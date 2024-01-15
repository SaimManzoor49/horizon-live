'use client'

import { useState } from "react"
import Hint from "../hint"
import { Button } from "../ui/button"
import {
     Dialog,
     DialogClose,
     DialogContent,
     DialogHeader,
     DialogTitle,
     DialogTrigger
 } from "../ui/dialog"
import { Textarea } from "../ui/textarea"


interface BioModalProps{
    initialValue:string | null
}


const BioModal = ({initialValue}:BioModalProps) => {
const [value, setValue] = useState(initialValue||"")

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant={'link'} size={'sm'} className="ml-auto">
                Edit
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Edit user bio
                </DialogTitle>
            </DialogHeader>
            <form onSubmit={()=>{}} className="space-y-4">
                <Textarea 
                placeholder="User bio"
                onChange={()=>{}}
                value={value}
                disabled={false}
                className="resize-none"
                />
                <div className="flex justify-between">
                    <DialogClose>
                        <Button type="button" variant={'ghost'}>
                            Cancle
                        </Button>
                    </DialogClose>
                    <Button 
                    disabled={false}
                    type="submit"
                    variant={'primary'}
                    >
                        Save
                    </Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default BioModal