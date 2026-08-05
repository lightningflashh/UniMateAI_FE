'use client'

import { Inbox } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  title = 'No data',
  description = 'There is nothing here yet.',
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <div className="rounded-full bg-muted p-4">
        <Inbox className="size-8 text-muted-foreground" />
      </div>

      <div className="space-y-1 text-center">
        <h2 className="text-lg font-semibold">
          {title}
        </h2>

        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <Button onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}