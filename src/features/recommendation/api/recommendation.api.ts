import { api } from '@/lib/axios'
import { RecommendationRequest, RecommendationResponse } from '@/types/recommendation.type'

export const recommendationApi = {
  recommend(data: RecommendationRequest) {
    return api.post<RecommendationResponse>(
      '/recommendations',
      data,
    )
  },
}