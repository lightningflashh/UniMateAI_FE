import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { toast } from 'sonner'

import { authApi } from '@/features/auth/api/auth.api'
import { useLogout } from '@/features/auth/hooks/use-logout'

// 1. Mock Auth API
jest.mock('@/features/auth/api/auth.api', () => ({
  authApi: {
    logout: jest.fn(),
  },
}))

// 2. Mock Sonner Toast (Khai báo trực tiếp bên trong jest.mock để tránh lỗi Hoisting)
jest.mock('sonner', () => {
  const mockToastObj = {
    success: jest.fn(),
    error: jest.fn(),
  }
  return {
    __esModule: true,
    default: mockToastObj,
    toast: mockToastObj,
  }
})

// 3. Mock Auth Store
const mockClearAuth = jest.fn()
jest.mock('@/stores/auth.store', () => ({
  useAuthStore: (selector: (state: any) => any) =>
    selector({
      clearAuth: mockClearAuth,
    }),
}))

const mockedAuthApi = authApi as jest.Mocked<typeof authApi>
const mockedToast = toast as jest.Mocked<typeof toast>

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  }
}

describe('useLogout', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should logout, clear auth store, and show success toast on success', async () => {
    mockedAuthApi.logout.mockResolvedValueOnce({} as any)

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    })

    result.current.mutate()

    await waitFor(() => {
      expect(mockedAuthApi.logout).toHaveBeenCalledTimes(1)
      expect(mockClearAuth).toHaveBeenCalledTimes(1)
      expect(mockedToast.success).toHaveBeenCalledWith('Logged out successfully')
    })
  })

  it('should show error toast when logout fails', async () => {
    mockedAuthApi.logout.mockRejectedValueOnce(new Error('API error'))

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    })

    result.current.mutate()

    await waitFor(() => {
      expect(mockedToast.error).toHaveBeenCalledWith('Failed to logout')
      expect(mockClearAuth).not.toHaveBeenCalled()
    })
  })
})