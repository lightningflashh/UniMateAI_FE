'use client'

import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAdmissionMethods } from '@/features/admission/hooks/use-admission-methods'
import { useMajors } from '@/features/major/hooks/use-majors'

interface AdmissionScoreToolbarProps {
  keyword: string
  onKeywordChange: (value: string) => void

  majorId: string
  onMajorChange: (value: string) => void

  admissionMethodId: string
  onAdmissionMethodChange: (
    value: string,
  ) => void

  year: string
  onYearChange: (value: string) => void

  onCreate: () => void
}

export function AdmissionScoreToolbar({
  keyword,
  onKeywordChange,
  majorId,
  onMajorChange,
  admissionMethodId,
  onAdmissionMethodChange,
  year,
  onYearChange,
  onCreate,
}: AdmissionScoreToolbarProps) {
  const {
    data: majors,
    isLoading: majorsLoading,
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

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={keyword}
            onChange={event =>
              onKeywordChange(
                event.target.value,
              )
            }
            placeholder="Search major or admission method..."
            className="pl-9"
          />
        </div>

        {/* Major */}
        <select
          value={majorId}
          onChange={event =>
            onMajorChange(
              event.target.value,
            )
          }
          disabled={majorsLoading}
          className="h-9 w-full rounded-md border bg-background px-3 text-sm lg:w-56"
        >
          <option value="">
            {majorsLoading
              ? 'Loading majors...'
              : 'All majors'}
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

        {/* Admission Method */}
        <select
          value={admissionMethodId}
          onChange={event =>
            onAdmissionMethodChange(
              event.target.value,
            )
          }
          disabled={
            admissionMethodsLoading
          }
          className="h-9 w-full rounded-md border bg-background px-3 text-sm lg:w-56"
        >
          <option value="">
            {admissionMethodsLoading
              ? 'Loading methods...'
              : 'All methods'}
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

        {/* Year */}
        <Input
          type="number"
          value={year}
          onChange={event =>
            onYearChange(
              event.target.value,
            )
          }
          placeholder="Year"
          className="w-full lg:w-28"
        />

        {/* Create */}
        <Button onClick={onCreate}>
          Create
        </Button>
      </div>
    </div>
  )
}