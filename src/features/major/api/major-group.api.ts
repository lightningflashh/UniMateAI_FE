import type { AxiosResponse } from 'axios'

import { api } from '@/lib/axios'
import type { MajorGroup } from '@/types/major-group.type'

export interface MajorGroupQueryParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface MajorGroupListResponse {
  items: MajorGroup[]
  meta: {
    page: number
    limit: number
    totalItems: number
    totalPages: number
  }
}

export interface CreateMajorGroupRequest {
  code: string
  name: string
  description?: string
}

export interface UpdateMajorGroupRequest {
  code?: string
  name?: string
  description?: string
}

export const majorGroupApi = {
  getAll(
    params?: MajorGroupQueryParams,
  ): Promise<
    AxiosResponse<MajorGroupListResponse>
  > {
    return api.get('/major-groups', {
      params,
    })
  },

  create(
    data: CreateMajorGroupRequest,
  ) {
    return api.post('/major-groups', data)
  },

  update(
    id: string,
    data: UpdateMajorGroupRequest,
  ) {
    return api.patch(
      `/major-groups/${id}`,
      data,
    )
  },

  delete(id: string) {
    return api.delete(
      `/major-groups/${id}`,
    )
  },
}