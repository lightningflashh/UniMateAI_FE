'use client'

import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MajorDeleteDialog } from '@/features/major/components/major-delete-dialog'
import { MajorDialog } from '@/features/major/components/major-dialog'
import {
  useDeleteMajor,
  useMajors,
} from '@/features/major/hooks/use-majors'
import { useUniversities } from '@/features/university/hooks/use-universities'
import type { Major } from '@/types/major.type'

interface MajorGroupSection {
  id: string
  code: string
  name: string
  majors: Major[]
}

export function MajorManagement() {
  const [universityId, setUniversityId] = useState('')

  const [open, setOpen] = useState(false)

  const [editingMajor, setEditingMajor] = useState<Major | null>(null)

  const [deletingMajor, setDeletingMajor] = useState<Major | null>(null)

  /*
   * Universities
   */
  const {
    data: universities,
    isLoading: universitiesLoading,
  } = useUniversities({
    page: 1,
    limit: 100,
  })

  /*
   * Majors
   */
  const {
    data: majors,
    isLoading: majorsLoading,
    isError: majorsError,
  } = useMajors({
    universityId: universityId || undefined,
    page: 1,
    limit: 100,
  })

  /*
   * Delete mutation
   */
  const deleteMajorMutation =
    useDeleteMajor()

  /*
   * Group majors by MajorGroup
   */
  const groupedMajors =
    (majors?.items ?? []).reduce<Record<string, MajorGroupSection>>((groups, major) => {
      const group = major.majorGroup

      if (!group) {
        return groups
      }

      if (!groups[group.id]) {
        groups[group.id] = {
          id: group.id,
          code: group.code,
          name: group.name,
          majors: [],
        }
      }

      groups[group.id].majors.push(major)

      return groups
    }, {})

  const groupedMajorList = Object.values(groupedMajors)

  /*
   * Create
   */
  const handleCreate = () => {
    setEditingMajor(null)
    setOpen(true)
  }

  /*
   * Edit
   */
  const handleEdit = (major: Major) => {
    setEditingMajor(major)
    setOpen(true)
  }

  /*
   * Open delete confirmation
   */
  const handleDelete = (major: Major) => {
    setDeletingMajor(major)
  }

  /*
   * Confirm delete
   */
  const handleConfirmDelete =
    async () => {
      if (!deletingMajor) {
        return
      }

      try {
        await deleteMajorMutation.mutateAsync(
          deletingMajor.id,
        )

        setDeletingMajor(null)
      } catch {
        /*
         * Error toast is handled
         * inside useDeleteMajor.
         */
      }
    }

  /*
   * University change
   */
  const handleUniversityChange = (
    value: string,
  ) => {
    setUniversityId(value)

    setOpen(false)
    setEditingMajor(null)
  }

  return (
    <div className="space-y-6">
      {/* University selector */}
      <div className="space-y-2">
        <label
          htmlFor="university"
          className="text-sm font-medium"
        >
          University
        </label>

        <select
          id="university"
          value={universityId}
          onChange={event =>
            handleUniversityChange(
              event.target.value,
            )
          }
          disabled={universitiesLoading}
          className="h-9 w-full rounded-md border bg-background px-3 text-sm"
        >
          <option value="">
            {universitiesLoading
              ? 'Loading universities...'
              : 'Select university'}
          </option>

          {universities?.items.map(
            university => (
              <option
                key={university.id}
                value={university.id}
              >
                {university.shortName
                  ? `${university.shortName} - ${university.name}`
                  : university.name}
              </option>
            ),
          )}
        </select>
      </div>

      {/* No university selected */}
      {!universityId && (
        <Card>
          <CardContent className="flex min-h-40 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Select a university to view
              majors.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Loading */}
      {universityId &&
        majorsLoading && (
          <Card>
            <CardContent className="flex min-h-40 items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Loading majors...
              </p>
            </CardContent>
          </Card>
        )}

      {/* Error */}
      {universityId &&
        !majorsLoading &&
        majorsError && (
          <Card>
            <CardContent className="flex min-h-40 items-center justify-center">
              <p className="text-sm text-destructive">
                Failed to load majors.
              </p>
            </CardContent>
          </Card>
        )}

      {/* No majors */}
      {universityId &&
        !majorsLoading &&
        !majorsError &&
        (majors?.items.length ?? 0) ===
          0 && (
          <Card>
            <CardContent className="flex min-h-40 flex-col items-center justify-center gap-3">
              <p className="text-sm text-muted-foreground">
                No majors found for this
                university.
              </p>

              <Button
                type="button"
                onClick={handleCreate}
              >
                Add Major
              </Button>
            </CardContent>
          </Card>
        )}

      {/* Major Groups */}
      {universityId &&
        !majorsLoading &&
        !majorsError &&
        groupedMajorList.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {groupedMajorList.map(
              group => (
                <Card
                  key={group.id}
                  className="flex h-full flex-col"
                >
                  {/* Group header */}
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <CardTitle className="line-clamp-1">
                          {group.name}
                        </CardTitle>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {group.code}
                        </p>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={
                          handleCreate
                        }
                      >
                        Add Major
                      </Button>
                    </div>
                  </CardHeader>

                  {/* Majors */}
                  <CardContent className="flex-1">
                    <div className="divide-y rounded-md border">
                      {group.majors.map(
                        major => {
                          const isDeleting =
                            deleteMajorMutation.isPending &&
                            deletingMajor?.id ===
                              major.id

                          return (
                            <div
                              key={major.id}
                              className="flex items-center justify-between gap-3 p-3"
                            >
                              {/* Major info */}
                              <div className="min-w-0">
                                <p className="font-medium">
                                  {
                                    major.code
                                  }
                                </p>

                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                  {
                                    major.name
                                  }
                                </p>

                                {major.description && (
                                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                    {
                                      major.description
                                    }
                                  </p>
                                )}
                              </div>

                              {/* Actions */}
                              <div className="flex shrink-0 items-center gap-1">
                                {/* Edit */}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  disabled={
                                    deleteMajorMutation.isPending
                                  }
                                  onClick={() =>
                                    handleEdit(
                                      major,
                                    )
                                  }
                                >
                                  <Pencil className="size-4" />

                                  <span className="sr-only">
                                    Edit{' '}
                                    {
                                      major.name
                                    }
                                  </span>
                                </Button>

                                {/* Delete */}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  disabled={
                                    deleteMajorMutation.isPending
                                  }
                                  onClick={() =>
                                    handleDelete(
                                      major,
                                    )
                                  }
                                >
                                  <Trash2 className="size-4 text-destructive" />

                                  <span className="sr-only">
                                    Delete{' '}
                                    {
                                      major.name
                                    }
                                  </span>
                                </Button>
                              </div>
                            </div>
                          )
                        },
                      )}
                    </div>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        )}

      {/* Delete confirmation */}
      <MajorDeleteDialog
        open={Boolean(deletingMajor)}
        onOpenChange={open => {
          if (
            !open &&
            !deleteMajorMutation.isPending
          ) {
            setDeletingMajor(null)
          }
        }}
        majorName={
          deletingMajor?.name
        }
        loading={
          deleteMajorMutation.isPending
        }
        onConfirm={
          handleConfirmDelete
        }
      />

      {/* Create / Edit */}
      <MajorDialog
        open={open}
        onOpenChange={setOpen}
        major={editingMajor}
      />
    </div>
  )
}