'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Sparkles } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useAdmissionMethods } from '@/features/admission/hooks/use-admission-methods'
import { useMajorGroups } from '@/features/major/hooks/use-major-groups'

import {
  recommendationSchema,
  type RecommendationFormValues,
} from '@/features/recommendation/schemas/recommendation.schema'

interface RecommendationFormProps {
  onSubmit: (
    data: RecommendationFormValues,
  ) => void
  isPending: boolean
}

export function RecommendationForm({
  onSubmit,
  isPending,
}: RecommendationFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      score: 0,
      year: 2026,
      admissionMethodId: '',
      majorGroupId: '',
    },
  })

  const admissionMethodId = watch('admissionMethodId')

  const majorGroupId = watch('majorGroupId')

  const {
    data: admissionData,
    isLoading: isLoadingAdmissionMethods,
  } = useAdmissionMethods()

  const admissionMethods = admissionData?.items ?? []

  const {
    data: majorGroupsData,
    isLoading: isLoadingMajorGroups,
  } = useMajorGroups()

  const majorGroups = majorGroupsData?.items ?? []

  return (
    <Card className="w-full border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />

          Find Your Best Matches
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          Enter your admission information to
          discover universities and majors that
          match your score.
        </p>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(data => onSubmit(data))}
          className="grid gap-5 md:grid-cols-2"
        >
          {/* Score */}
          <div className="space-y-2">
            <Label htmlFor="score">
              Your Score
            </Label>

            <Input
              id="score"
              type="number"
              step="0.01"
              min="0"
              max="30"
              placeholder="Example: 26.5"
              {...register('score', {
                valueAsNumber: true,
              })}
            />

            {errors.score && (
              <p className="text-sm text-red-500">
                {errors.score.message}
              </p>
            )}
          </div>

          {/* Year */}
          <div className="space-y-2">
            <Label htmlFor="year">
              Admission Year
            </Label>

            <Input
              id="year"
              type="number"
              min="2020"
              max="2100"
              {...register('year', {
                valueAsNumber: true,
              })}
            />

            {errors.year && (
              <p className="text-sm text-red-500">
                {errors.year.message}
              </p>
            )}
          </div>

          {/* Admission Method */}
          <div className="space-y-2">
            <Label htmlFor="admissionMethodId">
              Admission Method
            </Label>

            <Select
              value={admissionMethodId}
              onValueChange={value => {
                setValue(
                  'admissionMethodId',
                  value ?? '',
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                  },
                )
              }}
            >
              <SelectTrigger
                id="admissionMethodId"
                className="w-full"
                disabled={
                  isLoadingAdmissionMethods
                }
              >
                <SelectValue
                  placeholder={
                    isLoadingAdmissionMethods
                      ? 'Loading...'
                      : 'Select admission method'
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {admissionMethods.map(
                  method => (
                    <SelectItem
                      key={method.id}
                      value={method.id}
                    >
                      {method.name}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>

            {errors.admissionMethodId && (
              <p className="text-sm text-red-500">
                {
                  errors.admissionMethodId
                    .message
                }
              </p>
            )}
          </div>

          {/* Major Group */}
          <div className="space-y-2">
            <Label htmlFor="majorGroupId">
              Major Group
            </Label>

            <Select
              value={majorGroupId || 'all'}
              onValueChange={value => {
                setValue(
                  'majorGroupId',
                  value === null ||
                    value === 'all'
                    ? ''
                    : value,
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                  },
                )
              }}
            >
              <SelectTrigger
                id="majorGroupId"
                className="w-full"
                disabled={
                  isLoadingMajorGroups
                }
              >
                <SelectValue
                  placeholder={
                    isLoadingMajorGroups
                      ? 'Loading...'
                      : 'All major groups'
                  }
                />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All Major Groups
                </SelectItem>

                {majorGroups.map(group => (
                  <SelectItem
                    key={group.id}
                    value={group.id}
                  >
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.majorGroupId && (
              <p className="text-sm text-red-500">
                {errors.majorGroupId.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <Button
              type="submit"
              className="h-11 w-full"
              disabled={isPending}
            >
              <Sparkles className="mr-2 size-4" />

              {isPending
                ? 'Finding recommendations...'
                : 'Get Recommendations'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}