'use client'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Props {
  keyword: string
  onKeywordChange: (
    value: string,
  ) => void

  onCreate: () => void
}

export function UniversityToolbar({
  keyword,
  onKeywordChange,
  onCreate,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Input
        className="max-w-sm"
        placeholder="Search university..."
        value={keyword}
        onChange={e =>
          onKeywordChange(e.target.value)
        }
      />

      <Button onClick={onCreate}>
        <Plus className="mr-2 size-4" />
        Add University
      </Button>
    </div>
  )
}