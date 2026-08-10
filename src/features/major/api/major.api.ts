import type { AxiosResponse } from 'axios'

import { api } from '@/lib/axios'
import type { Major } from '@/types/major.type'

export interface MajorQueryParams {
  page?: number
  limit?: number
  search?: string
  universityId?: string
  majorGroupId?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface MajorListResponse {
  items: Major[]
  meta: {
    page: number
    limit: number
    totalItems: number
    totalPages: number
  }
}

export interface CreateMajorRequest {
  code: string
  name: string
  description?: string
  universityId: string
  majorGroupId: string
}

export interface UpdateMajorRequest {
  code?: string
  name?: string
  description?: string
  universityId?: string
  majorGroupId?: string
}

export const majorApi = {
  getAll(
    params?: MajorQueryParams,
  ): Promise<
    AxiosResponse<MajorListResponse>
  > {
    return api.get('/majors', {
      params,
    })
  },

  create(data: CreateMajorRequest) {
    return api.post('/majors', data)
  },

  update(
    id: string,
    data: UpdateMajorRequest,
  ) {
    return api.patch(
      `/majors/${id}`,
      data,
    )
  },

  delete(id: string) {
    return api.delete(`/majors/${id}`)
  },
}