import type { AdmissionMethod } from '@/types/admission-method.type'
import type { Major } from '@/types/major.type'

export interface AdmissionScore {
  id: string

  majorId: string
  admissionMethodId: string

  year: number
  score: number
  quota?: number | null
  note?: string | null

  createdAt: string
  updatedAt: string
  deletedAt?: string | null

  major?: Major
  admissionMethod?: AdmissionMethod
}

export interface AdmissionScoreQueryParams {
  page?: number
  limit?: number
  search?: string
  majorId?: string
  admissionMethodId?: string
  year?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}