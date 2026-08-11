import type { AxiosResponse } from 'axios'

import { api } from '@/lib/axios'
import type { AdmissionMethod } from '@/types/admission-method.type'

export interface AdmissionMethodQueryParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface AdmissionMethodListResponse {
  items: AdmissionMethod[]
  meta: {
    page: number
    limit: number
    totalItems: number
    totalPages: number
  }
}

export interface CreateAdmissionMethodRequest {
  code: string
  name: string
  description?: string
}

export interface UpdateAdmissionMethodRequest {
  code?: string
  name?: string
  description?: string
}

export const admissionMethodApi = {
  getAll(
    params?: AdmissionMethodQueryParams,
  ): Promise<
    AxiosResponse<AdmissionMethodListResponse>
  > {
    return api.get('/admission', {
      params,
    })
  },

  create(
    data: CreateAdmissionMethodRequest,
  ) {
    return api.post(
      '/admission',
      data,
    )
  },

  update(
    id: string,
    data: UpdateAdmissionMethodRequest,
  ) {
    return api.patch(
      `/admission/${id}`,
      data,
    )
  },

  delete(id: string) {
    return api.delete(
      `/admission/${id}`,
    )
  },
}