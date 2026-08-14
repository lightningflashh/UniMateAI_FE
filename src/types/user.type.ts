export const USER_ROLE = {
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT',
} as const

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE]

export interface User {
  id: string
  fullName: string
  email: string
  role: UserRole
}

export interface UserProfile {
  id: string
  fullName: string
  email: string
  avatar?: string | null
  role: UserRole
  createdAt: string
  updatedAt: string
}