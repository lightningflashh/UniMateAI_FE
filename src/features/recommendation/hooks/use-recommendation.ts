import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { type RecommendationRequest } from '@/types/recommendation.type'

import { recommendationApi } from '@/features/recommendation/api/recommendation.api'

export function useRecommendation() {
  return useMutation({
    mutationFn: (
      data: RecommendationRequest,
    ) => recommendationApi.recommend(data),

    onError: () => {
      toast.error(
        'Failed to get recommendations',
      )
    },
  })
}