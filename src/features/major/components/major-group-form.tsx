'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  majorGroupSchema,
  type MajorGroupFormValues,
} from '@/features/major/schemas/major-group.schema'
import type { MajorGroup } from '@/types/major-group.type'

interface MajorGroupFormProps {
  majorGroup?: MajorGroup | null
  loading?: boolean
  onSubmit: (
    values: MajorGroupFormValues,
  ) => void | Promise<void>
  onCancel?: () => void
}

export function MajorGroupForm({
  majorGroup,
  loading = false,
  onSubmit,
  onCancel,
}: MajorGroupFormProps) {
  const form =
    useForm<MajorGroupFormValues>({
      resolver:
        zodResolver(majorGroupSchema),

      defaultValues: {
        code: '',
        name: '',
        description: '',
      },
    })

  useEffect(() => {
    if (majorGroup) {
      form.reset({
        code: majorGroup.code,
        name: majorGroup.name,
        description:
          majorGroup.description ?? '',
      })

      return
    }

    form.reset({
      code: '',
      name: '',
      description: '',
    })
  }, [majorGroup, form])

  const handleSubmit = async (
    values: MajorGroupFormValues,
  ) => {
    await onSubmit(values)
  }

  return (
    <form
      onSubmit={form.handleSubmit(
        handleSubmit,
      )}
      className="space-y-4"
    >
      {/* Code */}
      <div className="space-y-2">
        <label
          htmlFor="code"
          className="text-sm font-medium"
        >
          Code
          <span className="ml-1 text-destructive">
            *
          </span>
        </label>

        <Input
          id="code"
          placeholder="CNTT"
          disabled={loading}
          {...form.register('code')}
        />

        {form.formState.errors.code && (
          <p className="text-sm text-destructive">
            {
              form.formState.errors.code
                .message
            }
          </p>
        )}
      </div>

      {/* Name */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-medium"
        >
          Name
          <span className="ml-1 text-destructive">
            *
          </span>
        </label>

        <Input
          id="name"
          placeholder="Information Technology"
          disabled={loading}
          {...form.register('name')}
        />

        {form.formState.errors.name && (
          <p className="text-sm text-destructive">
            {
              form.formState.errors.name
                .message
            }
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="text-sm font-medium"
        >
          Description
        </label>

        <Textarea
          id="description"
          placeholder="Major group description"
          disabled={loading}
          {...form.register(
            'description',
          )}
        />

        {form.formState.errors
          .description && (
          <p className="text-sm text-destructive">
            {
              form.formState.errors
                .description.message
            }
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? 'Saving...'
            : majorGroup
              ? 'Save changes'
              : 'Create'}
        </Button>
      </div>
    </form>
  )
}