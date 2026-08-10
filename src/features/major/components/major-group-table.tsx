'use client'

import { useMemo, useState } from 'react'

import { DataTable } from '@/components/common/data-table'
import { DataTablePagination } from '@/components/common/data-table-pagination'
import { EmptyState } from '@/components/common/empty-state'
import { ErrorState } from '@/components/common/error-state'
import { LoadingState } from '@/components/common/loading-state'
import { createMajorGroupColumns } from '@/features/major/components/major-group-columns'
import { MajorGroupDeleteDialog } from '@/features/major/components/major-group-delete-dialog'
import { MajorGroupDialog } from '@/features/major/components/major-group-dialog'
import { MajorGroupToolbar } from '@/features/major/components/major-group-toolbar'
import {
  useDeleteMajorGroup,
  useMajorGroups,
} from '@/features/major/hooks/use-major-groups'
import { useDebounce } from '@/hooks/use-debounce'
import type { MajorGroup } from '@/types/major-group.type'

export function MajorGroupTable() {
  const [open, setOpen] =
    useState(false)

  const [editingMajorGroup, setEditingMajorGroup] =
    useState<MajorGroup | null>(null)

  const [deletingMajorGroup, setDeletingMajorGroup] =
    useState<MajorGroup | null>(null)

  const [page, setPage] =
    useState(1)

  const [keyword, setKeyword] =
    useState('')

  const debouncedKeyword =
    useDebounce(keyword)

  /*
   * Get major groups
   */
  const {
    data,
    isLoading,
    isError,
    error,
  } = useMajorGroups({
    page,
    limit: 10,
    search: debouncedKeyword,
  })

  /*
   * Delete mutation
   */
  const deleteMutation =
    useDeleteMajorGroup()

  /*
   * Create
   */
  const handleCreate = () => {
    setEditingMajorGroup(null)
    setOpen(true)
  }

  /*
   * Edit
   */
  const handleEdit = (
    majorGroup: MajorGroup,
  ) => {
    setEditingMajorGroup(
      majorGroup,
    )

    setOpen(true)
  }

  /*
   * Delete
   */
  const handleDelete = (
    majorGroup: MajorGroup,
  ) => {
    setDeletingMajorGroup(
      majorGroup,
    )
  }

  /*
   * Confirm delete
   */
  const handleConfirmDelete =
    async () => {
      if (!deletingMajorGroup) {
        return
      }

      try {
        await deleteMutation.mutateAsync(
          deletingMajorGroup.id,
        )

        setDeletingMajorGroup(null)
      } catch {
        /*
         * Error toast is handled
         * by useDeleteMajorGroup.
         */
      }
    }

  /*
   * Search
   */
  const handleKeywordChange = (
    value: string,
  ) => {
    setKeyword(value)

    /*
     * Go back to first page
     * whenever search changes.
     */
    setPage(1)
  }

  /*
   * Columns
   */
  const columns = useMemo(
    () =>
      createMajorGroupColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [],
  )

  /*
   * Loading
   */
  if (isLoading) {
    return (
      <LoadingState />
    )
  }

  /*
   * Error
   */
  if (isError) {
    return (
      <ErrorState
        title="Failed to load major groups"
        description={
          error instanceof Error
            ? error.message
            : 'Something went wrong while loading major groups.'
        }
      />
    )
  }

  const items = data?.items ?? []

  /*
   * Empty
   */
  if (items.length === 0) {
    return (
      <>
        <EmptyState
          title={
            keyword
              ? 'No major groups found'
              : 'No major groups yet'
          }
          description={
            keyword
              ? 'Try changing your search keyword.'
              : 'Create your first major group to get started.'
          }
          actionLabel={
            keyword
              ? undefined
              : 'Add Major Group'
          }
          onAction={
            keyword
              ? undefined
              : handleCreate
          }
        />

        <MajorGroupDialog
          open={open}
          onOpenChange={setOpen}
          majorGroup={
            editingMajorGroup
          }
        />
      </>
    )
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <MajorGroupToolbar
        keyword={keyword}
        onKeywordChange={
          handleKeywordChange
        }
        onCreate={handleCreate}
      />

      {/* Table */}
      <DataTable
        columns={columns}
        data={items}
      />

      {/* Pagination */}
      <DataTablePagination
        page={page}
        totalPages={
          data?.meta.totalPages ?? 1
        }
        onPageChange={setPage}
      />

      {/* Create / Edit */}
      <MajorGroupDialog
        open={open}
        onOpenChange={setOpen}
        majorGroup={
          editingMajorGroup
        }
      />

      {/* Delete confirmation */}
      <MajorGroupDeleteDialog
        open={Boolean(
          deletingMajorGroup,
        )}
        onOpenChange={open => {
          if (
            !open &&
            !deleteMutation.isPending
          ) {
            setDeletingMajorGroup(
              null,
            )
          }
        }}
        majorGroupName={
          deletingMajorGroup?.name
        }
        loading={
          deleteMutation.isPending
        }
        onConfirm={
          handleConfirmDelete
        }
      />
    </div>
  )
}