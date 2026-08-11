import type { AxiosResponse } from 'axios'

import { api } from '@/lib/axios'
import type { AdmissionScore } from '@/types/admission-score.type'

export interface AdmissionScoreQueryParams {
  page?: number
  limit?: number
  majorId?: string
  admissionMethodId?: string
  search?: string
  year?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface AdmissionScoreListResponse {
  items: AdmissionScore[]
  meta: {
    page: number
    limit: number
    totalItems: number
    totalPages: number
  }
}

export interface CreateAdmissionScoreRequest {
  majorId: string
  admissionMethodId: string
  year: number
  score: number
  quota?: number
  note?: string
}

export interface UpdateAdmissionScoreRequest {
  majorId?: string
  admissionMethodId?: string
  year?: number
  score?: number
  quota?: number
  note?: string
}

export const admissionScoreApi = {
  getAll(
    params?: AdmissionScoreQueryParams,
  ): Promise<
    AxiosResponse<AdmissionScoreListResponse>
  > {
    return api.get('/admission-scores', {
      params,
    })
  },

  create(
    data: CreateAdmissionScoreRequest,
  ) {
    return api.post(
      '/admission-scores',
      data,
    )
  },

  update(
    id: string,
    data: UpdateAdmissionScoreRequest,
  ) {
    return api.patch(
      `/admission-scores/${id}`,
      data,
    )
  },

  delete(id: string) {
    return api.delete(
      `/admission-scores/${id}`,
    )
  },
}