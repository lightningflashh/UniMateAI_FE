'use client'

import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DeleteUniversityDialog } from '@/features/university/components/delete-university-dialog'
import { UniversityDialog } from '@/features/university/components/dialog'
import type { University } from '@/types/university.type'

interface Props {
  university: University
}

export function UniversityActions({
  university,
}: Props) {
  const [open, setOpen] = useState(false)

const [deleteOpen, setDeleteOpen] =
  useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setOpen(true)}
          >
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-500"
            onClick={() => setDeleteOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UniversityDialog
        open={open}
        onOpenChange={setOpen}
        university={university}
      />

      <DeleteUniversityDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        id={university.id}
      />
    </>
  )
}