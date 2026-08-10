import type { MajorGroup } from '@/types/major-group.type'

export interface Major {
  id: string
  code: string
  name: string
  description: string | null

  universityId: string
  majorGroupId: string

  majorGroup: MajorGroup

  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

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
  success: boolean
  message: string
  data: {
    items: Major[]
    meta: {
      page: number
      limit: number
      totalItems: number
      totalPages: number
    }
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