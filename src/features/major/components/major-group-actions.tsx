'use client'

import {
  Pencil,
  Trash2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useDeleteMajorGroup } from '@/features/major/hooks/use-major-groups'
import type { MajorGroup } from '@/types/major-group.type'

interface MajorGroupActionsProps {
  majorGroup: MajorGroup
  onEdit: (group: MajorGroup) => void
}

export function MajorGroupActions({
  majorGroup,
  onEdit,
}: MajorGroupActionsProps) {
  const deleteMutation =
    useDeleteMajorGroup()

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete "${majorGroup.name}"?`,
    )

    if (!confirmed) {
      return
    }

    await deleteMutation.mutateAsync(
      majorGroup.id,
    )
  }

  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onEdit(majorGroup)}
        disabled={deleteMutation.isPending}
      >
        <Pencil />
        <span className="sr-only">
          Edit
        </span>
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        disabled={deleteMutation.isPending}
      >
        <Trash2 />
        <span className="sr-only">
          Delete
        </span>
      </Button>
    </div>
  )
}