'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { FormField } from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { useAdmissionMethods } from '@/features/admission/hooks/use-admission-methods'
import {
  admissionScoreSchema,
  type AdmissionScoreFormValues,
} from '@/features/admission/schemas/admission-score.schema'

import { useMajors } from '@/features/major/hooks/use-majors'

interface AdmissionScoreFormProps {
  defaultValues?: Partial<AdmissionScoreFormValues>

  onSubmit: (
    values: AdmissionScoreFormValues,
  ) => void | Promise<void>

  loading?: boolean
}

export function AdmissionScoreForm({
  defaultValues,
  onSubmit,
  loading = false,
}: AdmissionScoreFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdmissionScoreFormValues>({
    resolver: zodResolver(
      admissionScoreSchema,
    ),

    defaultValues: {
      majorId: '',
      admissionMethodId: '',
      year: new Date().getFullYear(),
      score: 0,
      quota: undefined,
      note: '',
    },
  })

  /*
   * Quan trọng:
   * Khi mở Edit hoặc đổi record đang edit,
   * reset lại toàn bộ form.
   */
  useEffect(() => {
    reset({
      majorId:
        defaultValues?.majorId ?? '',

      admissionMethodId:
        defaultValues?.admissionMethodId ?? '',

      year:
        defaultValues?.year ??
        new Date().getFullYear(),

      score:
        defaultValues?.score ?? 0,

      quota:
        defaultValues?.quota ??
        undefined,

      note:
        defaultValues?.note ?? '',
    })
  }, [defaultValues, reset])

  const {
    data: majors,
    isLoading: majorsLoading,
    isError: majorsError,
  } = useMajors({
    page: 1,
    limit: 100,
  })

  const {
    data: admissionMethods,
    isLoading:
      admissionMethodsLoading,
  } = useAdmissionMethods({
    page: 1,
    limit: 100,
  })

  const optionsLoading =
    majorsLoading ||
    admissionMethodsLoading

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {/* Major */}
      <FormField
        label="Major"
        htmlFor="majorId"
        required
        error={errors.majorId?.message}
      >
        <select
          id="majorId"
          {...register('majorId')}
          disabled={majorsLoading}
          className="h-9 w-full rounded-md border bg-background px-3 text-sm"
        >
          <option value="">
            {majorsLoading
              ? 'Loading majors...'
              : 'Select major'}
          </option>

          {majors?.items?.map(
            major => (
              <option
                key={major.id}
                value={major.id}
              >
                {major.code} - {major.name}
              </option>
            ),
          )}
        </select>

        {majorsError && (
          <p className="text-sm text-destructive">
            Failed to load majors.
          </p>
        )}
      </FormField>

      {/* Admission Method */}
      <FormField
        label="Admission Method"
        htmlFor="admissionMethodId"
        required
        error={
          errors.admissionMethodId
            ?.message
        }
      >
        <select
          id="admissionMethodId"
          {...register(
            'admissionMethodId',
          )}
          disabled={
            admissionMethodsLoading
          }
          className="h-9 w-full rounded-md border bg-background px-3 text-sm"
        >
          <option value="">
            {admissionMethodsLoading
              ? 'Loading admission methods...'
              : 'Select admission method'}
          </option>

          {admissionMethods?.items?.map(
            method => (
              <option
                key={method.id}
                value={method.id}
              >
                {method.code} - {method.name}
              </option>
            ),
          )}
        </select>
      </FormField>

      {/* Year */}
      <FormField
        label="Year"
        htmlFor="year"
        required
        error={errors.year?.message}
      >
        <Input
          id="year"
          type="number"
          {...register('year', {
            valueAsNumber: true,
          })}
        />
      </FormField>

      {/* Score */}
      <FormField
        label="Score"
        htmlFor="score"
        required
        error={errors.score?.message}
      >
        <Input
          id="score"
          type="number"
          step="0.01"
          min="0"
          max="30"
          {...register('score', {
            valueAsNumber: true,
          })}
          placeholder="26.5"
        />
      </FormField>

      {/* Quota */}
      <FormField
        label="Quota"
        htmlFor="quota"
        error={errors.quota?.message}
      >
        <Input
          id="quota"
          type="number"
          min="0"
          {...register('quota', {
            setValueAs: value =>
              value === ''
                ? undefined
                : Number(value),
          })}
          placeholder="120"
        />
      </FormField>

      {/* Note */}
      <FormField
        label="Note"
        htmlFor="note"
        error={errors.note?.message}
      >
        <Textarea
          id="note"
          {...register('note')}
          placeholder="Admission score note"
        />
      </FormField>

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={
            loading ||
            optionsLoading
          }
        >
          {loading
            ? 'Saving...'
            : 'Save'}
        </Button>
      </div>
    </form>
  )
}