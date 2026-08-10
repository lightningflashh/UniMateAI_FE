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

interface MajorDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void

  majorName?: string

  loading?: boolean

  onConfirm: () => void
}

export function MajorDeleteDialog({
  open,
  onOpenChange,
  majorName,
  loading = false,
  onConfirm,
}: MajorDeleteDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={value => {
        if (loading) {
          return
        }

        onOpenChange(value)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="size-5 text-destructive" />
          </div>

          <DialogTitle>
            Delete major?
          </DialogTitle>

          <DialogDescription>
            Are you sure you want to delete{' '}
            <span className="font-medium text-foreground">
              {majorName}
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={loading}
            onClick={onConfirm}
          >
            {loading && (
              <Loader2 className="size-4 animate-spin" />
            )}

            {loading
              ? 'Deleting...'
              : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}