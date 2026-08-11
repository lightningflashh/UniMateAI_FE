'use client'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AdmissionMethodToolbarProps {
  keyword: string
  onKeywordChange: (value: string) => void
  onCreate: () => void
}

export function AdmissionMethodToolbar({
  keyword,
  onKeywordChange,
  onCreate,
}: AdmissionMethodToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Input
        value={keyword}
        onChange={event =>
          onKeywordChange(
            event.target.value,
          )
        }
        placeholder="Search admission methods..."
        className="max-w-sm"
      />

      <Button
        type="button"
        onClick={onCreate}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Admission Method
      </Button>
    </div>
  )
}