'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { MajorGroup } from '@/types/major-group.type'

interface MajorGroupColumnsProps {
  onEdit: (majorGroup: MajorGroup) => void
  onDelete: (majorGroup: MajorGroup) => void
}

export function createMajorGroupColumns({
  onEdit,
  onDelete,
}: MajorGroupColumnsProps): ColumnDef<MajorGroup>[] {
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
      cell: ({ row }) => (
        <span>
          {row.original.name}
        </span>
      ),
    },

    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => {
        const description =
          row.original.description

        return (
          <span className="line-clamp-2 max-w-md text-sm text-muted-foreground">
            {description || '—'}
          </span>
        )
      },
    },

    {
      id: 'actions',
      header: '',
      enableSorting: false,
      enableHiding: false,

      cell: ({ row }) => {
        const majorGroup =
          row.original

        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                  />
                }
              >
                <MoreHorizontal className="size-4" />

                <span className="sr-only">
                  Open actions
                </span>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
              >
                <DropdownMenuItem
                  onClick={() =>
                    onEdit(
                      majorGroup,
                    )
                  }
                >
                  <Pencil className="size-4" />

                  Edit
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  variant="destructive"
                  onClick={() =>
                    onDelete(
                      majorGroup,
                    )
                  }
                >
                  <Trash2 className="size-4" />

                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]
}