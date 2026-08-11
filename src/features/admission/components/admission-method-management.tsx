'use client'

import { useMemo, useState } from 'react'

import { DataTable } from '@/components/common/data-table'
import { DataTablePagination } from '@/components/common/data-table-pagination'
import { EmptyState } from '@/components/common/empty-state'
import { ErrorState } from '@/components/common/error-state'
import { LoadingState } from '@/components/common/loading-state'
import { AdmissionMethodDeleteDialog } from '@/features/admission/components/admission-method-delete-dialog'
import { AdmissionMethodDialog } from '@/features/admission/components/admission-method-dialog'
import { createAdmissionMethodColumns } from '@/features/admission/components/admission-method-columns'
import { AdmissionMethodToolbar } from '@/features/admission/components/admission-method-toolbar'
import { useAdmissionMethods } from '@/features/admission/hooks/use-admission-methods'
import { useDebounce } from '@/hooks/use-debounce'
import type { AdmissionMethod } from '@/types/admission-method.type'

const LIMIT = 10

export function AdmissionMethodManagement() {
  const [open, setOpen] = useState(false)

  const [deleteOpen, setDeleteOpen] =
    useState(false)

  const [editingMethod, setEditingMethod] =
    useState<AdmissionMethod | null>(null)

  const [deletingMethod, setDeletingMethod] =
    useState<AdmissionMethod | null>(null)

  const [page, setPage] = useState(1)

  const [keyword, setKeyword] =
    useState('')

  const debouncedKeyword =
    useDebounce(keyword)

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useAdmissionMethods({
    page,
    limit: LIMIT,
    search: debouncedKeyword,
  })

  const handleCreate = () => {
    setEditingMethod(null)
    setOpen(true)
  }

  const handleEdit = (
    admissionMethod: AdmissionMethod,
  ) => {
    setEditingMethod(admissionMethod)
    setOpen(true)
  }

  const handleDelete = (
    admissionMethod: AdmissionMethod,
  ) => {
    setDeletingMethod(admissionMethod)
    setDeleteOpen(true)
  }

  const columns = useMemo(
    () =>
      createAdmissionMethodColumns({
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
        title="Failed to load admission methods"
        description="Something went wrong while loading admission methods."
        onRetry={refetch}
      />
    )
  }

  const items = data?.items ?? []

  if (items.length === 0 && !keyword) {
    return (
      <>
        <EmptyState
          title="No admission methods found"
          description="Create your first admission method to get started."
          actionLabel="Add Admission Method"
          onAction={handleCreate}
        />

        <AdmissionMethodDialog
          open={open}
          onOpenChange={setOpen}
          admissionMethod={editingMethod}
        />
      </>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Admission Methods
        </h1>

        <p className="text-muted-foreground">
          Manage admission methods used for
          university admission.
        </p>
      </div>

      {/* Toolbar */}
      <AdmissionMethodToolbar
        keyword={keyword}
        onKeywordChange={value => {
          setKeyword(value)
          setPage(1)
        }}
        onCreate={handleCreate}
      />

      {/* Table */}
      {items.length === 0 ? (
        <EmptyState
          title="No admission methods found"
          description={`No admission methods match "${keyword}".`}
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
      <AdmissionMethodDialog
        open={open}
        onOpenChange={setOpen}
        admissionMethod={editingMethod}
      />

      {/* Delete */}
      <AdmissionMethodDeleteDialog
        open={deleteOpen}
        onOpenChange={open => {
          setDeleteOpen(open)

          if (!open) {
            setDeletingMethod(null)
          }
        }}
        admissionMethod={deletingMethod}
      />
    </div>
  )
}