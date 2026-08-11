'use client'

import { useMemo, useState } from 'react'

import { DataTable } from '@/components/common/data-table'
import { DataTablePagination } from '@/components/common/data-table-pagination'
import { EmptyState } from '@/components/common/empty-state'
import { ErrorState } from '@/components/common/error-state'
import { LoadingState } from '@/components/common/loading-state'

import { AdmissionScoreDeleteDialog } from '@/features/admission/components/admission-score-delete-dialog'
import { AdmissionScoreDialog } from '@/features/admission/components/admission-score-dialog'
import { createAdmissionScoreColumns } from '@/features/admission/components/admission-score-columns'
import { AdmissionScoreToolbar } from '@/features/admission/components/admission-score-toolbar'
import { useAdmissionScores } from '@/features/admission/hooks/use-admission-scores'

import { useDebounce } from '@/hooks/use-debounce'

import type { AdmissionScore } from '@/types/admission-score.type'

const LIMIT = 10

export function AdmissionScoreManagement() {
  const [open, setOpen] = useState(false)

  const [deleteOpen, setDeleteOpen] =
    useState(false)

  const [
    editingScore,
    setEditingScore,
  ] = useState<AdmissionScore | null>(
    null,
  )

  const [
    deletingScore,
    setDeletingScore,
  ] = useState<AdmissionScore | null>(
    null,
  )

  const [page, setPage] =
    useState(1)

  const [keyword, setKeyword] =
    useState('')

  const [majorId, setMajorId] =
    useState('')

  const [
    admissionMethodId,
    setAdmissionMethodId,
  ] = useState('')

  const [year, setYear] =
    useState('')

  const debouncedKeyword =
    useDebounce(keyword)

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useAdmissionScores({
    page,
    limit: LIMIT,
    search:
      debouncedKeyword || undefined,
    majorId:
      majorId || undefined,
    admissionMethodId:
      admissionMethodId || undefined,
    year: year
      ? Number(year)
      : undefined,
  })

  const handleCreate = () => {
    setEditingScore(null)
    setOpen(true)
  }

  const handleEdit = (
    score: AdmissionScore,
  ) => {
    setEditingScore(score)
    setOpen(true)
  }

  const handleDelete = (
    score: AdmissionScore,
  ) => {
    setDeletingScore(score)
    setDeleteOpen(true)
  }

  const handleKeywordChange = (
    value: string,
  ) => {
    setKeyword(value)
    setPage(1)
  }

  const handleMajorChange = (
    value: string,
  ) => {
    setMajorId(value)
    setPage(1)
  }

  const handleAdmissionMethodChange = (
    value: string,
  ) => {
    setAdmissionMethodId(value)
    setPage(1)
  }

  const handleYearChange = (
    value: string,
  ) => {
    setYear(value)
    setPage(1)
  }

  const columns = useMemo(
    () =>
      createAdmissionScoreColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [],
  )

  if (isLoading) {
    return <LoadingState />
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to load admission scores"
        description="Something went wrong while loading admission scores."
        onRetry={refetch}
      />
    )
  }

  const items = data?.items ?? []

  const hasFilter =
    Boolean(keyword) ||
    Boolean(majorId) ||
    Boolean(admissionMethodId) ||
    Boolean(year)

  /*
   * Empty database
   */
  if (
    items.length === 0 &&
    !hasFilter
  ) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Admission Scores
          </h1>

          <p className="text-muted-foreground">
            Manage admission scores for
            majors and admission methods.
          </p>
        </div>

        {/* Toolbar */}
        <AdmissionScoreToolbar
          keyword={keyword}
          onKeywordChange={
            handleKeywordChange
          }
          majorId={majorId}
          onMajorChange={
            handleMajorChange
          }
          admissionMethodId={
            admissionMethodId
          }
          onAdmissionMethodChange={
            handleAdmissionMethodChange
          }
          year={year}
          onYearChange={
            handleYearChange
          }
          onCreate={handleCreate}
        />

        <EmptyState
          title="No admission scores"
          description="Create your first admission score."
        />

        {/* Create / Edit */}
        <AdmissionScoreDialog
          open={open}
          onOpenChange={setOpen}
          admissionScore={editingScore}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Admission Scores
        </h1>

        <p className="text-muted-foreground">
          Manage admission scores for
          majors and admission methods.
        </p>
      </div>

      {/* Toolbar */}
      <AdmissionScoreToolbar
        keyword={keyword}
        onKeywordChange={
          handleKeywordChange
        }
        majorId={majorId}
        onMajorChange={
          handleMajorChange
        }
        admissionMethodId={
          admissionMethodId
        }
        onAdmissionMethodChange={
          handleAdmissionMethodChange
        }
        year={year}
        onYearChange={
          handleYearChange
        }
        onCreate={handleCreate}
      />

      {/* Table */}
      {items.length === 0 ? (
        <EmptyState
          title="No admission scores found"
          description={
            keyword
              ? `No admission scores match "${keyword}".`
              : 'No admission scores match the selected filters.'
          }
        />
      ) : (
        <DataTable
          columns={columns}
          data={items}
        />
      )}

      {/* Pagination */}
      {items.length > 0 && (
        <DataTablePagination
          page={page}
          totalPages={
            data?.meta.totalPages ?? 1
          }
          onPageChange={setPage}
        />
      )}

      {/* Create / Edit */}
      <AdmissionScoreDialog
        open={open}
        onOpenChange={setOpen}
        admissionScore={editingScore}
      />

      {/* Delete */}
      <AdmissionScoreDeleteDialog
        open={deleteOpen}
        onOpenChange={open => {
          setDeleteOpen(open)

          if (!open) {
            setDeletingScore(null)
          }
        }}
        admissionScore={deletingScore}
      />
    </div>
  )
}