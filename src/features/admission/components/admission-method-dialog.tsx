'use client'

import type { AdmissionMethod } from '@/types/admission-method.type'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AdmissionMethodForm } from '@/features/admission/components/admission-method-form'
import {
  useCreateAdmissionMethod,
  useUpdateAdmissionMethod,
} from '@/features/admission/hooks/use-admission-methods'
import type { AdmissionMethodFormValues } from '@/features/admission/schemas/admission-method.schema'

interface AdmissionMethodDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  admissionMethod?: AdmissionMethod | null
}

export function AdmissionMethodDialog({
  open,
  onOpenChange,
  admissionMethod,
}: AdmissionMethodDialogProps) {
  const createMutation =
    useCreateAdmissionMethod()

  const updateMutation =
    useUpdateAdmissionMethod()

  const isEditing = Boolean(admissionMethod)

  const loading =
    createMutation.isPending ||
    updateMutation.isPending

  const handleSubmit = async (
    values: AdmissionMethodFormValues,
  ) => {
    try {
      if (admissionMethod) {
        await updateMutation.mutateAsync({
          id: admissionMethod.id,
          data: values,
        })
      } else {
        await createMutation.mutateAsync(
          values,
        )
      }

      onOpenChange(false)
    } catch {
      // Error toast is handled by the mutation hook.
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing
              ? 'Edit Admission Method'
              : 'Create Admission Method'}
          </DialogTitle>
        </DialogHeader>

        <AdmissionMethodForm
          defaultValues={
            admissionMethod
              ? {
                  code: admissionMethod.code,
                  name: admissionMethod.name,
                  description:
                    admissionMethod.description ??
                    '',
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