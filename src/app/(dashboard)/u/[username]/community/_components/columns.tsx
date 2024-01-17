"use client"

import UserAvatar from "@/components/UserAvatar"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BlockedUser = {
  id: string
  userId: string
  imageUrl: string
  username: string
  createdAt: string
}
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import UnblockButton from "./unblock-button"

export const columns: ColumnDef<BlockedUser>[] = [
  {
    accessorKey: "username",
 header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Username
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell:({row})=>(
        <div className="flex items-center gap-x-4">
            <UserAvatar
            username={row.original.username}
            imageUrl={row.original.imageUrl}
            />
            <span className="">
                {row.original.username}
            </span>
        </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date blocked
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "actions",
    cell:({row})=><UnblockButton userId={row.original.userId}/>
  },
]
