import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'

import { authApi } from '@/features/auth/api/auth.api'
import { useRefresh } from '@/features/auth/hooks/use-refresh'

// 1. Mock Auth API
jest.mock('@/features/auth/api/auth.api', () => ({
  authApi: {
    refresh: jest.fn(),
  },
}))

// 2. Mock Auth Store
const mockSetAuth = jest.fn()
jest.mock('@/stores/auth.store', () => ({
  useAuthStore: (selector: (state: any) => any) =>
    selector({
      setAuth: mockSetAuth,
    }),
}))

const mockedAuthApi = authApi as jest.Mocked<typeof authApi>

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

describe('useRefresh', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should refresh token and update auth store successfully', async () => {
    const mockData = {
      accessToken: 'new-access-token',
      user: { id: '1', email: 'john@example.com' },
    }

    mockedAuthApi.refresh.mockResolvedValueOnce({
      data: mockData,
    } as any)

    const { result } = renderHook(() => useRefresh(), {
      wrapper: createWrapper(),
    })

    result.current.mutate()

    await waitFor(() => {
      expect(mockedAuthApi.refresh).toHaveBeenCalledTimes(1)
      expect(mockSetAuth).toHaveBeenCalledWith(
        'new-access-token',
        mockData.user,
      )
    })
  })

  it('should handle refresh failure without calling setAuth', async () => {
    mockedAuthApi.refresh.mockRejectedValueOnce(new Error('Refresh failed'))

    const { result } = renderHook(() => useRefresh(), {
      wrapper: createWrapper(),
    })

    result.current.mutate()

    await waitFor(() => {
      expect(mockedAuthApi.refresh).toHaveBeenCalledTimes(1)
      expect(result.current.isError).toBe(true)
      expect(mockSetAuth).not.toHaveBeenCalled()
    })
  })
})