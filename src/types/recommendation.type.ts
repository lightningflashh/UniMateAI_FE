export interface RecommendationRequest {
  score: number
  year: number
  admissionMethodId: string
  majorGroupId?: string
}

export interface RecommendationItem {
  university: {
    id: string
    code: string
    name: string
    shortName?: string | null
    logoUrl?: string | null
  }

  major: {
    id: string
    code: string
    name: string
  }

  majorGroup: {
    id: string
    code: string
    name: string
  }

  admissionMethod: {
    id: string
    code: string
    name: string
  }

  year: number
  requiredScore: number
  userScore: number
  difference: number
  chance: 'HIGH' | 'MEDIUM' | 'LOW'
}

export interface RecommendationResponse {
  items: RecommendationItem[]
}
