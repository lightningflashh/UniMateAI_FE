export interface University {
  id: string

  name: string

  shortName: string

  code: string

  website: string | null

  logo: string | null

  province: string

  address: string

  description: string | null

  createdAt: string

  updatedAt: string
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface UniversityListResponse {
  items: University[]
  meta: PaginationMeta
}

export interface UniversityQueryParams {
  page?: number
  limit?: number
  search?: string
  province?: string
}

export interface CreateUniversityRequest {
  name: string

  shortName: string

  code: string

  website?: string

  logo?: string

  province: string

  address: string

  description?: string
}

export type UpdateUniversityRequest = Partial<CreateUniversityRequest>

export interface DeleteUniversityResponse {
  message: string
}