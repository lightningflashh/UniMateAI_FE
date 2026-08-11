'use client'

import { useState } from 'react'

import { AdmissionMethodManagement } from '@/features/admission/components/admission-method-management'
import { AdmissionScoreManagement } from '@/features/admission/components/admission-score-management'
import { cn } from '@/lib/utils'

type Tab = 'methods' | 'scores'

export function AdmissionManagementPage() {
  const [tab, setTab] =
    useState<Tab>('methods')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          Admission
        </h1>

        <p className="text-muted-foreground">
          Manage admission methods and admission
          scores.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-6">
          <button
            type="button"
            onClick={() =>
              setTab('methods')
            }
            className={cn(
              'border-b-2 px-1 pb-3 text-sm font-medium transition-colors',
              tab === 'methods'
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            Admission Methods
          </button>

          <button
            type="button"
            onClick={() =>
              setTab('scores')
            }
            className={cn(
              'border-b-2 px-1 pb-3 text-sm font-medium transition-colors',
              tab === 'scores'
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            Admission Scores
          </button>
        </div>
      </div>

      {/* Content */}
      {tab === 'methods' && (
        <AdmissionMethodManagement />
      )}

      {tab === 'scores' && (
        <AdmissionScoreManagement />
      )}
    </div>
  )
}