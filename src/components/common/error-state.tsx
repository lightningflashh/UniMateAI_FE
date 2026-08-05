'use client'

import { AlertTriangle } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'Please try again later.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <div className="rounded-full bg-destructive/10 p-4">
        <AlertTriangle className="size-8 text-destructive" />
      </div>

      <div className="space-y-1 text-center">
        <h2 className="text-lg font-semibold">
          {title}
        </h2>

        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      {onRetry && (
        <Button onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  )
}