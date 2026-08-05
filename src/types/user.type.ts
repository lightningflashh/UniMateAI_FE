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