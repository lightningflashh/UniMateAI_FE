'use client'

import {
  useCreateAdmissionScore,
  useUpdateAdmissionScore,
} from '@/features/admission/hooks/use-admission-scores'
import type { AdmissionScore } from '@/types/admission-score.type'

import { AdmissionScoreForm } from '@/features/admission/components/admission-score-form'

interface AdmissionScoreDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  admissionScore?: AdmissionScore | null
}

export function AdmissionScoreDialog({
  open,
  onOpenChange,
  admissionScore,
}: AdmissionScoreDialogProps) {
  const createMutation =
    useCreateAdmissionScore()

  const updateMutation =
    useUpdateAdmissionScore()

  const isEditing = Boolean(admissionScore)

  const handleSubmit = async (
    values: Parameters<typeof AdmissionScoreForm>[0]['onSubmit'] extends (
      values: infer T,
    ) => unknown
      ? T
      : never,
  ) => {
    if (admissionScore) {
      await updateMutation.mutateAsync({
        id: admissionScore.id,
        data: values,
      })
    } else {
      await createMutation.mutateAsync(values)
    }

    onOpenChange(false)
  }

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-lg bg-background p-6 shadow-lg">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            {isEditing
              ? 'Edit Admission Score'
              : 'Create Admission Score'}
          </h2>

          <p className="text-sm text-muted-foreground">
            {isEditing
              ? 'Update admission score information.'
              : 'Create a new admission score.'}
          </p>
        </div>

        <AdmissionScoreForm
          defaultValues={
            admissionScore
              ? {
                  majorId:
                    admissionScore.majorId,

                  admissionMethodId:
                    admissionScore.admissionMethodId,

                  year:
                    admissionScore.year,

                  score:
                    admissionScore.score,

                  quota:
                    admissionScore.quota ??
                    undefined,

                  note:
                    admissionScore.note ??
                    '',
                }
              : undefined
          }
          onSubmit={handleSubmit}
          loading={
            createMutation.isPending ||
            updateMutation.isPending
          }
        />

        <button
          type="button"
          onClick={() =>
            onOpenChange(false)
          }
          className="mt-4 w-full text-sm text-muted-foreground hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}