'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { FormField } from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useMajorGroups } from '@/features/major/hooks/use-major-groups'
import {
  majorSchema,
  type MajorFormValues,
} from '@/features/major/schemas/major.schema'
import { useUniversities } from '@/features/university/hooks/use-universities'

interface MajorFormProps {
  defaultValues?: Partial<MajorFormValues>

  onSubmit: (
    values: MajorFormValues,
  ) => void | Promise<void>

  loading?: boolean
}

export function MajorForm({
  defaultValues,
  onSubmit,
  loading = false,
}: MajorFormProps) {
    const formValues: MajorFormValues = {
    code: defaultValues?.code ?? '',
    name: defaultValues?.name ?? '',
    description:
      defaultValues?.description ?? '',
    universityId:
      defaultValues?.universityId ?? '',
    majorGroupId:
      defaultValues?.majorGroupId ?? '',
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MajorFormValues>({
    resolver: zodResolver(majorSchema),
    values: formValues
  })

  const {
    data: universities,
    isLoading: universitiesLoading,
  } = useUniversities({
    page: 1,
    limit: 100,
  })

  const {
    data: groups,
    isLoading: groupsLoading,
  } = useMajorGroups({
    page: 1,
    limit: 100,
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
          placeholder="7480201"
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
          placeholder="Information Technology"
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
          placeholder="Major description"
        />
      </FormField>

      {/* University */}
      <FormField
        label="University"
        htmlFor="universityId"
        required
        error={errors.universityId?.message}
      >
        <select
          id="universityId"
          {...register('universityId')}
          disabled={universitiesLoading}
          className="h-9 w-full rounded-md border bg-background px-3 text-sm"
        >
          <option value="">
            {universitiesLoading
              ? 'Loading universities...'
              : 'Select university'}
          </option>

          {universities?.items.map(
            university => (
              <option
                key={university.id}
                value={university.id}
              >
                {university.shortName
                  ? `${university.shortName} - ${university.name}`
                  : university.name}
              </option>
            ),
          )}
        </select>
      </FormField>

      {/* Major Group */}
      <FormField
        label="Major Group"
        htmlFor="majorGroupId"
        required
        error={errors.majorGroupId?.message}
      >
        <select
          id="majorGroupId"
          {...register('majorGroupId')}
          disabled={groupsLoading}
          className="h-9 w-full rounded-md border bg-background px-3 text-sm"
        >
          <option value="">
            {groupsLoading
              ? 'Loading major groups...'
              : 'Select major group'}
          </option>

          {groups?.items.map(group => (
            <option
              key={group.id}
              value={group.id}
            >
              {group.code} - {group.name}
            </option>
          ))}
        </select>
      </FormField>

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={
            loading ||
            universitiesLoading ||
            groupsLoading
          }
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}