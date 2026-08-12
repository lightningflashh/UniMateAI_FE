import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {
  renderHook,
  waitFor,
} from '@testing-library/react'
import type { ReactNode } from 'react'

import { toast } from 'sonner'

import { authApi } from '@/features/auth/api/auth.api'
import { useRegister } from '@/features/auth/hooks/use-register'

jest.mock(
  '@/features/auth/api/auth.api',
  () => ({
    authApi: {
      register: jest.fn(),
    },
  }),
)

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

const mockedAuthApi =
  authApi as jest.Mocked<typeof authApi>

const mockedToast =
  toast as jest.Mocked<typeof toast>

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  })

  return function Wrapper({
    children,
  }: {
    children: ReactNode
  }) {
    return (
      <QueryClientProvider
        client={queryClient}
      >
        {children}
      </QueryClientProvider>
    )
  }
}

describe('useRegister', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should register successfully', async () => {
    const data = {
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    }

    mockedAuthApi.register.mockResolvedValue(
      {} as any,
    )

    const { result } = renderHook(
      () => useRegister(),
      {
        wrapper: createWrapper(),
      },
    )

    await result.current.mutateAsync(data)

    expect(
      mockedAuthApi.register,
    ).toHaveBeenCalledWith(data)

    expect(
      mockedToast.success,
    ).toHaveBeenCalledWith(
      'Account created successfully',
    )
  })

  it('should show error toast when register fails', async () => {
    mockedAuthApi.register.mockRejectedValue(
      new Error('Register failed'),
    )

    const { result } = renderHook(
      () => useRegister(),
      {
        wrapper: createWrapper(),
      },
    )

    await expect(
      result.current.mutateAsync({
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      }),
    ).rejects.toThrow('Register failed')

    await waitFor(() => {
      expect(
        mockedToast.error,
      ).toHaveBeenCalledWith(
        'Failed to create account',
      )
    })
  })
})