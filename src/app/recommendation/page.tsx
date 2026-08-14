'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'

import {
  Card,
  CardContent,
} from '@/components/ui/card'

import { RecommendationForm } from '@/features/recommendation/components/recommendation-form'
import { RecommendationResults } from '@/features/recommendation/components/recommendation-results'
import { useRecommendation } from '@/features/recommendation/hooks/use-recommendation'

import type { RecommendationRequest } from '@/types/recommendation.type'

export default function RecommendationPage() {
  const recommendationMutation =
    useRecommendation()

  const [items, setItems] = useState<
    RecommendationRequest extends never
      ? never
      : Awaited<
          ReturnType<
            typeof recommendationMutation.mutateAsync
          >
        >['data']['items']
  >([])

  const handleSubmit = (
    data: RecommendationRequest,
  ) => {
    recommendationMutation.mutate(
      {
        ...data,
        majorGroupId:
          data.majorGroupId || undefined,
      },
      {
        onSuccess: response => {
          setItems(response.data.items)
        },
      },
    )
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-6xl space-y-8 p-6 lg:p-10">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="size-5" />

            <span className="text-sm font-medium">
              AI-Powered Recommendation
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
            Find the Right University
            <br />
            for You
          </h1>

          <p className="max-w-2xl text-muted-foreground">
            Tell us your admission score and
            preferences. UniMateAI will help you
            discover universities and majors that
            match your chances.
          </p>
        </div>

        {/* Form */}
        <RecommendationForm
          onSubmit={handleSubmit}
          isPending={
            recommendationMutation.isPending
          }
        />

        {/* Result summary */}
        {recommendationMutation.isSuccess &&
          items.length > 0 && (
            <Card className="border-0 bg-primary text-primary-foreground shadow-sm">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex size-12 items-center justify-center rounded-xl bg-white/15">
                  <Sparkles className="size-6" />
                </div>

                <div>
                  <p className="font-semibold">
                    We found {items.length}{' '}
                    recommendations for you
                  </p>

                  <p className="text-sm opacity-80">
                    These results are based on
                    your score and admission
                    preferences.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

        {/* Results */}
        {recommendationMutation.isSuccess && (
          <RecommendationResults
            items={items}
          />
        )}
      </div>
    </main>
  )
}