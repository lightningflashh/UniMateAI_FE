'use client'

import { Plus, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface MajorGroupToolbarProps {
  keyword: string
  onKeywordChange: (value: string) => void
  onCreate: () => void
}

export function MajorGroupToolbar({
  keyword,
  onKeywordChange,
  onCreate,
}: MajorGroupToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={keyword}
          onChange={event =>
            onKeywordChange(
              event.target.value,
            )
          }
          placeholder="Search major groups..."
          className="pl-9"
        />
      </div>

      <Button
        type="button"
        onClick={onCreate}
      >
        <Plus className="size-4" />

        Add Major Group
      </Button>
    </div>
  )
}