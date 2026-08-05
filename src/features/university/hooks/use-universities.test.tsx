import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {
  act,
  renderHook,
  waitFor,
} from '@testing-library/react'
import React from 'react'
import { toast } from 'sonner'

import { universityApi } from '@/features/university/api/university.api'
import {
  useCreateUniversity,
  useDeleteUniversity,
  useUniversities,
  useUpdateUniversity,
} from '@/features/university/hooks/use-universities'

jest.mock(
  '@/features/university/api/university.api',
  () => ({
    universityApi: {
      getAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  }),
)

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

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

  jest.spyOn(
    queryClient,
    'invalidateQueries',
  )

  return {
    queryClient,

    wrapper: ({
      children,
    }: {
      children: React.ReactNode
    }) => (
      <QueryClientProvider
        client= { queryClient }
      >
      { children }
      </QueryClientProvider>
    ),
  }
}

describe('useUniversities', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch universities', async () => {
    ; (
      universityApi.getAll as jest.Mock
    ).mockResolvedValue({
      data: {
        items: [
          {
            id: '1',
            name: 'HCMUTE',
          },
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
        },
      },
    })

    const { wrapper } =
      createWrapper()

    const { result } = renderHook(
      () =>
        useUniversities({
          page: 1,
          limit: 10,
        }),
      {
        wrapper,
      },
    )

    await waitFor(() =>
      expect(
        result.current.isSuccess,
      ).toBe(true),
    )

    expect(
      universityApi.getAll,
    ).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
    })

    expect(
      result.current.data?.items,
    ).toHaveLength(1)
  })
})

describe('useCreateUniversity', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create university', async () => {
    ; (
      universityApi.create as jest.Mock
    ).mockResolvedValue({})

    const {
      wrapper,
      queryClient,
    } = createWrapper()

    const { result } = renderHook(
      () => useCreateUniversity(),
      {
        wrapper,
      },
    )

    await act(async () => {
      await result.current.mutateAsync({
        name: 'HCMUTE',
        shortName: 'UTE',
        code: 'UTE',
        province: 'HCM',
        address: 'Vo Van Ngan',
      })
    })

    expect(
      universityApi.create,
    ).toHaveBeenCalled()

    expect(
      queryClient.invalidateQueries,
    ).toHaveBeenCalledWith({
      queryKey: ['universities'],
    })

    expect(
      toast.success,
    ).toHaveBeenCalledWith(
      'University created successfully',
    )
  })

  it('should show error toast', async () => {
    ; (
      universityApi.create as jest.Mock
    ).mockRejectedValue(
      new Error('Create failed'),
    )

    const { wrapper } =
      createWrapper()

    const { result } = renderHook(
      () => useCreateUniversity(),
      {
        wrapper,
      },
    )

    await expect(
      result.current.mutateAsync(
        {} as unknown as Parameters<typeof universityApi.create>[0],
      ),
    ).rejects.toThrow()

    expect(
      toast.error,
    ).toHaveBeenCalledWith(
      'Create failed',
    )
  })
})

describe('useUpdateUniversity', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should update university', async () => {
    ; (
      universityApi.update as jest.Mock
    ).mockResolvedValue({})

    const {
      wrapper,
      queryClient,
    } = createWrapper()

    const { result } = renderHook(
      () => useUpdateUniversity(),
      {
        wrapper,
      },
    )

    await act(async () => {
      await result.current.mutateAsync({
        id: '1',
        data: {
          name: 'Updated',
        },
      })
    })

    expect(
      universityApi.update,
    ).toHaveBeenCalled()

    expect(
      queryClient.invalidateQueries,
    ).toHaveBeenCalled()

    expect(
      toast.success,
    ).toHaveBeenCalled()
  })
})

it('should show error toast when update fails', async () => {
  ;(
    universityApi.update as jest.Mock
  ).mockRejectedValue(
    new Error('Update failed'),
  )

  const { wrapper } = createWrapper()

  const { result } = renderHook(
    () => useUpdateUniversity(),
    {
      wrapper,
    },
  )

  await expect(
    result.current.mutateAsync({
      id: '1',
      data: {
        name: 'Updated',
      },
    }),
  ).rejects.toThrow()

  expect(toast.error).toHaveBeenCalledWith(
    'Failed to update university',
  )
})

describe('useDeleteUniversity', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should delete university', async () => {
    ; (
      universityApi.delete as jest.Mock
    ).mockResolvedValue({})

    const {
      wrapper,
      queryClient,
    } = createWrapper()

    const { result } = renderHook(
      () => useDeleteUniversity(),
      {
        wrapper,
      },
    )

    await act(async () => {
      await result.current.mutateAsync(
        '1',
      )
    })

    expect((universityApi.delete as jest.Mock).mock.calls[0][0],).toBe('1')

    expect(
      queryClient.invalidateQueries,
    ).toHaveBeenCalled()

    expect(
      toast.success,
    ).toHaveBeenCalled()
  })
})

it('should show error toast when delete fails', async () => {
  ;(
    universityApi.delete as jest.Mock
  ).mockRejectedValue(
    new Error('Delete failed'),
  )

  const { wrapper } = createWrapper()

  const { result } = renderHook(
    () => useDeleteUniversity(),
    {
      wrapper,
    },
  )

  await expect(
    result.current.mutateAsync('1'),
  ).rejects.toThrow()

  expect(toast.error).toHaveBeenCalledWith(
    'Failed to delete university',
  )
})