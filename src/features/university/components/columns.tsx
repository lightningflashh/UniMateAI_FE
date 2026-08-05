'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { ExternalLink } from 'lucide-react'

import { UniversityActions } from '@/features/university/components/action'
import type { University } from '@/types/university.type'

export const columns: ColumnDef<University>[] = [
  {
    accessorKey: 'name',
    header: 'University',
  },
  {
    accessorKey: 'shortName',
    header: 'Short Name',
  },
  {
    accessorKey: 'province',
    header: 'Province',
  },
  {
    accessorKey: 'website',
    header: 'Website',
    cell: ({ row }) => {
      const website = row.original.website

      if (!website) {
        return '-'
      }

      return (
        <a
          href={website}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-primary hover:underline"
        >
          Visit
          <ExternalLink className="size-3" />
        </a>
      )
    },
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <UniversityActions
        university={row.original}
      />
    ),
  },
]