'use client'

import { useState } from 'react'

import { MajorGroupTable } from '@/features/major/components/major-group-table'
import { MajorManagement } from '@/features/major/components/major-management'
import { cn } from '@/lib/utils'

type Tab = 'majors' | 'groups'

export function MajorManagementPage() {
  const [tab, setTab] =
    useState<Tab>('majors')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          Majors
        </h1>

        <p className="text-muted-foreground">
          Manage majors and major groups.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-6">
          <button
            type="button"
            onClick={() =>
              setTab('majors')
            }
            className={cn(
              'border-b-2 px-1 pb-3 text-sm font-medium transition-colors',
              tab === 'majors'
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            Majors
          </button>

          <button
            type="button"
            onClick={() =>
              setTab('groups')
            }
            className={cn(
              'border-b-2 px-1 pb-3 text-sm font-medium transition-colors',
              tab === 'groups'
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            Major Groups
          </button>
        </div>
      </div>

      {/* Content */}
      {tab === 'majors' && (
        <MajorManagement />
      )}

      {tab === 'groups' && (
        <MajorGroupTable />
      )}
    </div>
  )
}