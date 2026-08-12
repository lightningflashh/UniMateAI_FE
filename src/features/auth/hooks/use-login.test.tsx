import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { toast } from 'sonner'

import { authApi } from '@/features/auth/api/auth.api'
import { useLogin } from '@/features/auth/hooks/use-login'

// 1. Mock Next.js Router
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// 2. Mock Auth API
jest.mock('@/features/auth/api/auth.api', () => ({
  authApi: {
    login: jest.fn(),
  },
}))

// 3. Mock Sonner Toast
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

// 4. Mock Auth Store
const mockSetAuth = jest.fn()
jest.mock('@/stores/auth.store', () => ({
  useAuthStore: (selector: (state: any) => any) =>
    selector({
      setAuth: mockSetAuth,
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

describe('useLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should login successfully and redirect to /dashboard when user is ADMIN', async () => {
    const loginPayload = {
      email: 'admin@example.com',
      password: 'password123',
    }

    const mockAuthData = {
      accessToken: 'fake-admin-token',
      user: {
        id: '1',
        email: 'admin@example.com',
        role: 'ADMIN', // Giả lập Admin Role
      },
    }

    mockedAuthApi.login.mockResolvedValueOnce({
      data: mockAuthData,
    } as any)

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    })

    await result.current.mutateAsync(loginPayload)

    expect(mockedAuthApi.login).toHaveBeenCalledWith(loginPayload)
    expect(mockSetAuth).toHaveBeenCalledWith(
      mockAuthData.accessToken,
      mockAuthData.user,
    )
    expect(mockedToast.success).toHaveBeenCalledWith('Login successfully')
    // Kiểm tra chuyển hướng về /dashboard
    expect(mockPush).toHaveBeenCalledWith('/dashboard')
  })

  it('should login successfully and redirect to / when user is NOT ADMIN', async () => {
    const loginPayload = {
      email: 'user@example.com',
      password: 'password123',
    }

    const mockAuthData = {
      accessToken: 'fake-user-token',
      user: {
        id: '2',
        email: 'user@example.com',
        role: 'USER', // Giả lập User Role
      },
    }

    mockedAuthApi.login.mockResolvedValueOnce({
      data: mockAuthData,
    } as any)

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    })

    await result.current.mutateAsync(loginPayload)

    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('should show error toast when login fails', async () => {
    mockedAuthApi.login.mockRejectedValueOnce(new Error('Login failed'))

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    })

    await expect(
      result.current.mutateAsync({
        email: 'john@example.com',
        password: 'password123',
      }),
    ).rejects.toThrow('Login failed')

    await waitFor(() => {
      expect(mockedToast.error).toHaveBeenCalledWith('Login failed')
      expect(mockPush).not.toHaveBeenCalled()
    })
  })
})