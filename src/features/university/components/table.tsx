'use client'

import { useState } from 'react'

import { DataTable } from '@/components/common/data-table'
import { DataTablePagination } from '@/components/common/data-table-pagination'
import { EmptyState } from '@/components/common/empty-state'
import { ErrorState } from '@/components/common/error-state'
import { LoadingState } from '@/components/common/loading-state'
import { columns } from '@/features/university/components/columns'
import { UniversityDialog } from '@/features/university/components/dialog'
import { UniversityToolbar } from '@/features/university/components/toolbar'
import { useUniversities } from '@/features/university/hooks/use-universities'
import { useDebounce } from '@/hooks/use-debounce'


export function UniversityTable() {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')

  const debouncedKeyword = useDebounce(keyword)

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useUniversities({
    page,
    limit: 10,
    search: debouncedKeyword,
  })

  if (isLoading) {
    return (
      <LoadingState message="Loading universities..." />
    )
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load universities"
        description="Something went wrong while fetching universities."
        onRetry={refetch}
      />
    )
  }

  if (!data || data.items.length === 0) {
    return (
      <EmptyState
        title="No universities found"
        description="Create your first university to get started."
        actionLabel="Add University"
        onAction={() => setOpen(true)}
      />
    )
  }

  return (
    <>
      <div className="space-y-4">
        <UniversityToolbar
          keyword={keyword}
          onKeywordChange={value => {
            setKeyword(value)
            setPage(1)
          }}
          onCreate={() => setOpen(true)}
        />

        <DataTable
          columns={columns}
          data={data.items}
        />

        <DataTablePagination
          page={page}
          totalPages={data.meta.totalPages}
          onPageChange={setPage}
        />
      </div>

      <UniversityDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}