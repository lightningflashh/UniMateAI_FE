'use client'

import { useEffect } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { MajorGroupForm } from '@/features/major/components/major-group-form'
import {
  useCreateMajorGroup,
  useUpdateMajorGroup,
} from '@/features/major/hooks/use-major-groups'
import type { MajorGroupFormValues } from '@/features/major/schemas/major-group.schema'
import type { MajorGroup } from '@/types/major-group.type'


interface MajorGroupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  majorGroup?: MajorGroup | null
}

export function MajorGroupDialog({
  open,
  onOpenChange,
  majorGroup = null,
}: MajorGroupDialogProps) {
  const createMutation =
    useCreateMajorGroup()

  const updateMutation =
    useUpdateMajorGroup()

  const isEditing =
    Boolean(majorGroup)

  const isLoading =
    createMutation.isPending ||
    updateMutation.isPending

  /*
   * Close dialog after successful mutation.
   */
  useEffect(() => {
    if (
      createMutation.isSuccess ||
      updateMutation.isSuccess
    ) {
      onOpenChange(false)
    }
  }, [
    createMutation.isSuccess,
    updateMutation.isSuccess,
    onOpenChange,
  ])

  const handleSubmit = async (
    values: MajorGroupFormValues,
  ) => {
    if (majorGroup) {
      await updateMutation.mutateAsync({
        id: majorGroup.id,
        data: values,
      })

      return
    }

    await createMutation.mutateAsync(
      values,
    )
  }

  const handleOpenChange = (
    value: boolean,
  ) => {
    if (isLoading) {
      return
    }

    onOpenChange(value)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={
        handleOpenChange
      }
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing
              ? 'Edit Major Group'
              : 'Create Major Group'}
          </DialogTitle>

          <DialogDescription>
            {isEditing
              ? 'Update the major group information.'
              : 'Create a new major group.'}
          </DialogDescription>
        </DialogHeader>

        <MajorGroupForm
          majorGroup={majorGroup}
          loading={isLoading}
          onSubmit={handleSubmit}
          onCancel={() =>
            onOpenChange(false)
          }
        />
      </DialogContent>
    </Dialog>
  )
}