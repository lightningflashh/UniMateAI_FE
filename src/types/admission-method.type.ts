export interface AdmissionMethod {
  id: string
  code: string
  name: string
  description?: string | null
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
}