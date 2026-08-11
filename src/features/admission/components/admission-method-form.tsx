'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { FormField } from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  admissionMethodSchema,
  type AdmissionMethodFormValues,
} from '@/features/admission/schemas/admission-method.schema'

interface AdmissionMethodFormProps {
  defaultValues?: Partial<AdmissionMethodFormValues>

  onSubmit: (
    values: AdmissionMethodFormValues,
  ) => void | Promise<void>

  loading?: boolean
}

export function AdmissionMethodForm({
  defaultValues,
  onSubmit,
  loading = false,
}: AdmissionMethodFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdmissionMethodFormValues>({
    resolver: zodResolver(
      admissionMethodSchema,
    ),

    defaultValues: {
      code: '',
      name: '',
      description: '',
      ...defaultValues,
    },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {/* Code */}
      <FormField
        label="Code"
        htmlFor="code"
        required
        error={errors.code?.message}
      >
        <Input
          id="code"
          {...register('code')}
          placeholder="THPT"
        />
      </FormField>

      {/* Name */}
      <FormField
        label="Name"
        htmlFor="name"
        required
        error={errors.name?.message}
      >
        <Input
          id="name"
          {...register('name')}
          placeholder="Xét điểm thi tốt nghiệp THPT"
        />
      </FormField>

      {/* Description */}
      <FormField
        label="Description"
        htmlFor="description"
        error={errors.description?.message}
      >
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Admission method description"
        />
      </FormField>

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}