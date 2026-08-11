'use client'

import { useDeleteAdmissionScore } from '@/features/admission/hooks/use-admission-scores'
import type { AdmissionScore } from '@/types/admission-score.type'

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

interface AdmissionScoreDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  admissionScore: AdmissionScore | null
}

export function AdmissionScoreDeleteDialog({
  open,
  onOpenChange,
  admissionScore,
}: AdmissionScoreDeleteDialogProps) {
  const deleteMutation =
    useDeleteAdmissionScore()

  const handleDelete = () => {
    if (!admissionScore) {
      return
    }

    deleteMutation.mutate(
      admissionScore.id,
      {
        onSuccess: () => {
          onOpenChange(false)
        },
      },
    )
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete admission score?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete this
            admission score?

            {admissionScore && (
              <span className="mt-2 block">
                <span className="font-medium text-foreground">
                  {admissionScore.major?.name ??
                    'Unknown major'}
                </span>{' '}
                - {admissionScore.year} -{' '}
                {admissionScore.score}
              </span>
            )}

            <span className="mt-2 block">
              This action cannot be undone.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={deleteMutation.isPending}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={deleteMutation.isPending}
            onClick={event => {
              event.preventDefault()
              handleDelete()
            }}
          >
            {deleteMutation.isPending
              ? 'Deleting...'
              : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}