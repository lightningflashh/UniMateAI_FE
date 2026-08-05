'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { UniversityForm } from '@/features/university/components/university-form'
import { useCreateUniversity, useUpdateUniversity } from '@/features/university/hooks/use-universities'
import { toUniversityFormValues } from '@/features/university/mappers/university.mapper'
import type { UniversityFormValues } from '@/features/university/schemas/university.schema'
import type { University } from '@/types/university.type'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void

  university?: University
}

export function UniversityDialog({
  open,
  onOpenChange,
  university,
}: Props) {
  const createUniversity = useCreateUniversity()
  const updateUniversity = useUpdateUniversity()

  const isEditing = !!university

  async function handleSubmit(
    values: UniversityFormValues,
  ) {
    const payload = {
      ...values,
      website: values.website || undefined,
      description: values.description || undefined,
    }

    try {
      if (isEditing) {
        await updateUniversity.mutateAsync({
          id: university.id,
          data: payload,
        })
      } else {
        await createUniversity.mutateAsync(payload)
      }

      onOpenChange(false)
    } catch {}
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit University' : 'Create University'}
          </DialogTitle>
        </DialogHeader>

        <UniversityForm
          defaultValues={
            university
              ? toUniversityFormValues(
                  university,
                )
              : undefined
          }
          loading={
            createUniversity.isPending ||
            updateUniversity.isPending
          }
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}