'use client'

import { WanderingEyes } from '@/components/wandering-eyes'

interface LoadingStateProps {
  message?: string
}

export function LoadingState({
  message = 'Loading...',
}: LoadingStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <WanderingEyes className="h-20 w-[180px] [--eye-color:#e2e2e3] [--pupil-color:#0f172a]" />

      <p className="text-sm text-muted-foreground">
        {message}
      </p>
    </div>
  )
}