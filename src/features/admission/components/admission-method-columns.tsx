'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { AdmissionMethod } from '@/types/admission-method.type'

interface AdmissionMethodColumnsProps {
  onEdit: (
    admissionMethod: AdmissionMethod,
  ) => void

  onDelete: (
    admissionMethod: AdmissionMethod,
  ) => void
}

export function createAdmissionMethodColumns({
  onEdit,
  onDelete,
}: AdmissionMethodColumnsProps): ColumnDef<AdmissionMethod>[] {
  return [
    {
      accessorKey: 'code',
      header: 'Code',
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.code}
        </span>
      ),
    },

    {
      accessorKey: 'name',
      header: 'Name',
    },

    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.description || '—'}
        </span>
      ),
    },

    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => {
        const date =
          new Date(row.original.createdAt)

        return date.toLocaleDateString()
      },
    },

    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const admissionMethod =
          row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              render = {
              <Button
                variant="ghost"
                size="icon"
                >
                  <MoreHorizontal className="h-4 w-4"/>
                  <span className="sr-only">
                  Open actions
                  </span>
                </Button>
                }
            />

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  onEdit(
                    admissionMethod,
                  )
                }
              >
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() =>
                  onDelete(
                    admissionMethod,
                  )
                }
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}