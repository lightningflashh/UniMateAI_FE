export interface ApiError {
  message: string
  statusCode: number
  error?: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}