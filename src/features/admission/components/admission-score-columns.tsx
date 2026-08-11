'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'

import type { AdmissionScore } from '@/types/admission-score.type'

interface Props {
  onEdit: (
    score: AdmissionScore,
  ) => void

  onDelete: (
    score: AdmissionScore,
  ) => void
}

export function createAdmissionScoreColumns({
  onEdit,
  onDelete,
}: Props): ColumnDef<AdmissionScore>[] {
  return [
    {
      accessorKey: 'major',
      header: 'Major',
      cell: ({ row }) => {
        const major =
          row.original.major

        return (
          <div>
            <div className="font-medium">
              {major?.name ??
                row.original.majorId}
            </div>

            {major?.code && (
              <div className="text-xs text-muted-foreground">
                {major.code}
              </div>
            )}
          </div>
        )
      },
    },

    {
      accessorKey: 'admissionMethod',
      header: 'Admission Method',
      cell: ({ row }) => {
        const method =
          row.original
            .admissionMethod

        return (
          <div>
            <div className="font-medium">
              {method?.name ??
                row.original
                  .admissionMethodId}
            </div>

            {method?.code && (
              <div className="text-xs text-muted-foreground">
                {method.code}
              </div>
            )}
          </div>
        )
      },
    },

    {
      accessorKey: 'year',
      header: 'Year',
    },

    {
      accessorKey: 'score',
      header: 'Score',
      cell: ({ row }) =>
        row.original.score.toFixed(
          2,
        ),
    },

    {
      accessorKey: 'quota',
      header: 'Quota',
      cell: ({ row }) =>
        row.original.quota ??
        '-',
    },

    {
      accessorKey: 'note',
      header: 'Note',
      cell: ({ row }) =>
        row.original.note || '-',
    },

    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              onEdit(
                row.original,
              )
            }
          >
            Edit
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-destructive"
            onClick={() =>
              onDelete(
                row.original,
              )
            }
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]
}