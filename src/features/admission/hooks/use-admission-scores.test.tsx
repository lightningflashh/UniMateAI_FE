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

import { admissionScoreApi } from '@/features/admission/api/admission-score.api'
import {
  useAdmissionScores,
  useCreateAdmissionScore,
  useUpdateAdmissionScore,
  useDeleteAdmissionScore,
} from '@/features/admission/hooks/use-admission-scores'

jest.mock(
  '@/features/admission/api/admission-score.api',
  () => ({
    admissionScoreApi: {
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

const mockedAdmissionScoreApi =
  admissionScoreApi as jest.Mocked<
    typeof admissionScoreApi
  >

const mockedToast = toast as jest.Mocked<
  typeof toast
>

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

describe('useAdmissionScores', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch admission scores', async () => {
    const response = {
      items: [
        {
          id: 'score-1',
          majorId: 'major-1',
          admissionMethodId: 'method-1',
          year: 2025,
          score: 26.5,
          quota: 120,
          note: 'Test',
          createdAt:
            '2026-01-01T00:00:00.000Z',
          updatedAt:
            '2026-01-01T00:00:00.000Z',
          deletedAt: null,
        },
      ],
      meta: {
        page: 1,
        limit: 10,
        totalItems: 1,
        totalPages: 1,
      },
    }

    mockedAdmissionScoreApi.getAll.mockResolvedValue(
      {
        data: response,
      } as any,
    )

    const { result } = renderHook(
      () =>
        useAdmissionScores({
          page: 1,
          limit: 10,
        }),
      {
        wrapper: createWrapper(),
      },
    )

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(
        true,
      )
    })

    expect(
      mockedAdmissionScoreApi.getAll,
    ).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
    })

    expect(result.current.data).toEqual(
      response,
    )
  })

  it('should handle fetch error', async () => {
    mockedAdmissionScoreApi.getAll.mockRejectedValue(
      new Error('Fetch failed'),
    )

    const { result } = renderHook(
      () => useAdmissionScores(),
      {
        wrapper: createWrapper(),
      },
    )

    await waitFor(() => {
      expect(result.current.isError).toBe(
        true,
      )
    })

    expect(
      mockedAdmissionScoreApi.getAll,
    ).toHaveBeenCalledWith(undefined)
  })
})

describe('useCreateAdmissionScore', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create an admission score', async () => {
    const data = {
      majorId: 'major-1',
      admissionMethodId: 'method-1',
      year: 2025,
      score: 26.5,
      quota: 120,
      note: 'Test',
    }

    mockedAdmissionScoreApi.create.mockResolvedValue(
      {} as any,
    )

    const { result } = renderHook(
      () => useCreateAdmissionScore(),
      {
        wrapper: createWrapper(),
      },
    )

    await result.current.mutateAsync(data)

    expect(
      mockedAdmissionScoreApi.create,
    ).toHaveBeenCalledWith(data)

    expect(
      mockedToast.success,
    ).toHaveBeenCalledWith(
      'Admission score created successfully',
    )
  })

  it('should show error toast when create fails', async () => {
    mockedAdmissionScoreApi.create.mockRejectedValue(
      new Error('Create failed'),
    )

    const { result } = renderHook(
      () => useCreateAdmissionScore(),
      {
        wrapper: createWrapper(),
      },
    )

    await expect(
      result.current.mutateAsync({
        majorId: 'major-1',
        admissionMethodId: 'method-1',
        year: 2025,
        score: 26.5,
      }),
    ).rejects.toThrow('Create failed')

    expect(
      mockedToast.error,
    ).toHaveBeenCalledWith(
      'Failed to create admission score',
    )
  })
})

describe('useUpdateAdmissionScore', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should update an admission score', async () => {
    const id = 'score-1'

    const data = {
      score: 27,
      quota: 130,
    }

    mockedAdmissionScoreApi.update.mockResolvedValue(
      {} as any,
    )

    const { result } = renderHook(
      () => useUpdateAdmissionScore(),
      {
        wrapper: createWrapper(),
      },
    )

    await result.current.mutateAsync({
      id,
      data,
    })

    expect(
      mockedAdmissionScoreApi.update,
    ).toHaveBeenCalledWith(
      id,
      data,
    )

    expect(
      mockedToast.success,
    ).toHaveBeenCalledWith(
      'Admission score updated successfully',
    )
  })

  it('should show error toast when update fails', async () => {
    mockedAdmissionScoreApi.update.mockRejectedValue(
      new Error('Update failed'),
    )

    const { result } = renderHook(
      () => useUpdateAdmissionScore(),
      {
        wrapper: createWrapper(),
      },
    )

    await expect(
      result.current.mutateAsync({
        id: 'score-1',
        data: {
          score: 27,
        },
      }),
    ).rejects.toThrow('Update failed')

    expect(
      mockedToast.error,
    ).toHaveBeenCalledWith(
      'Failed to update admission score',
    )
  })
})

describe('useDeleteAdmissionScore', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should delete an admission score', async () => {
    const id = 'score-1'

    mockedAdmissionScoreApi.delete.mockResolvedValue(
      {} as any,
    )

    const { result } = renderHook(
      () => useDeleteAdmissionScore(),
      {
        wrapper: createWrapper(),
      },
    )

    await result.current.mutateAsync(id)

    expect(
      mockedAdmissionScoreApi.delete,
    ).toHaveBeenCalledWith(id)

    expect(
      mockedToast.success,
    ).toHaveBeenCalledWith(
      'Admission score deleted successfully',
    )
  })

  it('should show error toast when delete fails', async () => {
    mockedAdmissionScoreApi.delete.mockRejectedValue(
      new Error('Delete failed'),
    )

    const { result } = renderHook(
      () => useDeleteAdmissionScore(),
      {
        wrapper: createWrapper(),
      },
    )

    await expect(
      result.current.mutateAsync('score-1'),
    ).rejects.toThrow('Delete failed')

    expect(
      mockedToast.error,
    ).toHaveBeenCalledWith(
      'Failed to delete admission score',
    )
  })
})