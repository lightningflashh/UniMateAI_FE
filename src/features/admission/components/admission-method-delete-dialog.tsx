'use client'

import {
  AlertTriangle,
  Loader2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  useDeleteAdmissionMethod,
} from '@/features/admission/hooks/use-admission-methods'
import type { AdmissionMethod } from '@/types/admission-method.type'

interface AdmissionMethodDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  admissionMethod: AdmissionMethod | null
}

export function AdmissionMethodDeleteDialog({
  open,
  onOpenChange,
  admissionMethod,
}: AdmissionMethodDeleteDialogProps) {
  const deleteMutation =
    useDeleteAdmissionMethod()

  const handleDelete = async () => {
    if (!admissionMethod) {
      return
    }

    try {
      await deleteMutation.mutateAsync(
        admissionMethod.id,
      )

      onOpenChange(false)
    } catch {
      // Error toast is handled by the hook.
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>

          <DialogTitle>
            Delete Admission Method
          </DialogTitle>

          <DialogDescription>
            Are you sure you want to delete{' '}
            <span className="font-medium text-foreground">
              {admissionMethod?.name}
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={
              deleteMutation.isPending
            }
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={
              deleteMutation.isPending
            }
            onClick={handleDelete}
          >
            {deleteMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            {deleteMutation.isPending
              ? 'Deleting...'
              : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}