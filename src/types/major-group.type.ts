export interface MajorGroup {
  id: string
  code: string
  name: string
  description: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface MajorGroupQueryParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface MajorGroupListResponse {
  success: boolean
  message: string
  data: {
    items: MajorGroup[]
    meta: {
      page: number
      limit: number
      totalItems: number
      totalPages: number
    }
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