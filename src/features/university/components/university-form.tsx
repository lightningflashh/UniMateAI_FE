'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { FormField } from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  universitySchema,
  type UniversityFormValues,
} from '@/features/university/schemas/university.schema'

interface Props {
  defaultValues?: Partial<UniversityFormValues>

  onSubmit: (
    values: UniversityFormValues,
  ) => void

  loading?: boolean
}

export function UniversityForm({
  defaultValues,
  onSubmit,
  loading,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UniversityFormValues>({
    resolver: zodResolver(
      universitySchema,
    ),

    defaultValues: {
      name: '',
      shortName: '',
      code: '',
      province: '',
      address: '',
      website: '',
      logo: '',
      description: '',
      ...defaultValues,
    },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <FormField
        label="Name"
        required
        error={errors.name?.message}
      >
        <Input
          {...register('name')}
          placeholder="University name"
        />
      </FormField>

      <FormField
        label="Short Name"
        required
        error={errors.shortName?.message}
      >
        <Input
          {...register('shortName')}
          placeholder="HCMUTE"
        />
      </FormField>

      <FormField
        label="Code"
        required
        error={errors.code?.message}
      >
        <Input
          {...register('code')}
          placeholder="SPK"
        />
      </FormField>

      <FormField
        label="Province"
        required
        error={errors.province?.message}
      >
        <Input
          {...register('province')}
          placeholder="Ho Chi Minh City"
        />
      </FormField>

      <FormField
        label="Address"
        required
        error={errors.address?.message}
      >
        <Input
          {...register('address')}
          placeholder="1 Vo Van Ngan..."
        />
      </FormField>

      <FormField
        label="Website"
        error={errors.website?.message}
      >
        <Input
          {...register('website')}
          placeholder="https://hcmute.edu.vn"
        />
      </FormField>

      <FormField
        label="Logo"
        error={errors.logo?.message}
      >
        <Input
          {...register('logo')}
          placeholder="Logo URL"
        />
      </FormField>

      <FormField
        label="Description"
        error={errors.description?.message}
      >
        <Input
          {...register('description')}
          placeholder="Description"
        />
      </FormField>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? 'Saving...'
            : 'Save'}
        </Button>
      </div>
    </form>
  )
}