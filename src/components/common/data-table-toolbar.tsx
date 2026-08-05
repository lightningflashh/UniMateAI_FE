'use client'

import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

interface Props {
  keyword: string

  onKeywordChange: (value: string) => void

  children?: React.ReactNode
}

export function DataTableToolbar({
  keyword,
  onKeywordChange,
  children,
}: Props) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={keyword}
          placeholder="Search..."
          className="pl-9"
          onChange={e =>
            onKeywordChange(e.target.value)
          }
        />
      </div>

      {children}
    </div>
  )
}