'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useDeleteUniversity } from '@/features/university/hooks/use-universities'


interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  id: string
}

export function DeleteUniversityDialog({
  open,
  onOpenChange,
  id,
}: Props) {
  const deleteUniversity =
    useDeleteUniversity()

  async function handleDelete() {
    await deleteUniversity.mutateAsync(id)

    onOpenChange(false)
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete University
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}