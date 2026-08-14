import {
  SearchX,
  Sparkles,
} from 'lucide-react'

import { EmptyState } from '@/components/common/empty-state'

import { RecommendationResultCard } from '@/features/recommendation/components/recommendation-result-card'

import type { RecommendationItem } from '@/types/recommendation.type'

interface RecommendationResultsProps {
  items: RecommendationItem[]
}

export function RecommendationResults({
  items,
}: RecommendationResultsProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="No recommendations found"
        description="Try changing your score, admission method, or major group."
      />
    )
  }

  return (
    <section className="space-y-5">
      <div>
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />

          <h2 className="text-xl font-bold">
            Recommended for You
          </h2>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          {items.length} matching programs found
          based on your admission score.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {items.map(item => (
          <RecommendationResultCard
            key={`${item.major.id}-${item.year}`}
            item={item}
          />
        ))}
      </div>
    </section>
  )
}