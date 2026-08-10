'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { MajorForm } from '@/features/major/components/major-form'
import {
  useCreateMajor,
  useUpdateMajor,
} from '@/features/major/hooks/use-majors'
import type { MajorFormValues } from '@/features/major/schemas/major.schema'
import type { Major } from '@/types/major.type'

interface MajorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void

  major?: Major | null
}

export function MajorDialog({
  open,
  onOpenChange,
  major,
}: MajorDialogProps) {
  const isEdit = Boolean(major)

  const createMutation = useCreateMajor()

  const updateMutation = useUpdateMajor()

  const loading = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (
    values: MajorFormValues,
  ) => {
    if (major) {
      await updateMutation.mutateAsync({
        id: major.id,
        data: values,
      })
    } else {
      await createMutation.mutateAsync(
        values,
      )
    }

    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? 'Edit Major'
              : 'Create Major'}
          </DialogTitle>
        </DialogHeader>

        <MajorForm
          key={major?.id ?? 'create'}
          defaultValues={
            major
              ? {
                  code: major.code,
                  name: major.name,
                  description:
                    major.description ?? '',
                  universityId:
                    major.universityId,
                  majorGroupId:
                    major.majorGroupId,
                }
              : undefined
          }
          onSubmit={handleSubmit}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  )
}