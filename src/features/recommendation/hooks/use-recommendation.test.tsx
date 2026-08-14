import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useRecommendation } from '@/features/recommendation/hooks/use-recommendation'
import { recommendationApi } from '@/features/recommendation/api/recommendation.api'

jest.mock(
  '@/features/recommendation/api/recommendation.api',
  () => ({
    recommendationApi: {
      recommend: jest.fn(),
    },
  }),
)

const mockRecommend =
  recommendationApi.recommend as jest.MockedFunction<
    typeof recommendationApi.recommend
  >

describe('useRecommendation', () => {
  const createWrapper = () => {
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
      children: React.ReactNode
    }) {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should recommend successfully', async () => {
    const request = {
      score: 26.5,
      year: 2026,
      admissionMethodId: 'method-1',
      majorGroupId: 'group-1',
    }

    const response = {
      data: {
        items: [
          {
            university: {
              id: 'university-1',
              code: 'HCMUT',
              name: 'University A',
              shortName: 'UA',
              logoUrl: null,
            },
            major: {
              id: 'major-1',
              code: 'SE',
              name: 'Software Engineering',
            },
            majorGroup: {
              id: 'group-1',
              code: 'CNTT',
              name: 'Information Technology',
            },
            admissionMethod: {
              id: 'method-1',
              code: 'THPT',
              name: 'High School Graduation Exam',
            },
            year: 2026,
            requiredScore: 26.2,
            userScore: 26.5,
            difference: 0.3,
            chance: 'LOW',
          },
        ],
      },
    }

    mockRecommend.mockResolvedValue(response as any)

    const { result } = renderHook(
      () => useRecommendation(),
      {
        wrapper: createWrapper(),
      },
    )

    result.current.mutate(request)

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(mockRecommend).toHaveBeenCalledWith(
      request,
    )

    expect(result.current.data).toEqual(
      response,
    )
  })

  it('should handle recommendation error', async () => {
    const request = {
      score: 26.5,
      year: 2026,
      admissionMethodId: 'method-1',
      majorGroupId: 'group-1',
    }

    const error = new Error(
      'Failed to recommend',
    )

    mockRecommend.mockRejectedValue(error)

    const { result } = renderHook(
      () => useRecommendation(),
      {
        wrapper: createWrapper(),
      },
    )

    result.current.mutate(request)

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(mockRecommend).toHaveBeenCalledWith(
      request,
    )

    expect(result.current.error).toBe(error)
  })

  it('should expose pending state while requesting', async () => {
    const request = {
      score: 26.5,
      year: 2026,
      admissionMethodId: 'method-1',
      majorGroupId: 'group-1',
    }

    let resolveRequest:
      | ((value: any) => void)
      | undefined

    mockRecommend.mockReturnValue(
      new Promise(resolve => {
        resolveRequest = resolve
      }) as any,
    )

    const { result } = renderHook(
      () => useRecommendation(),
      {
        wrapper: createWrapper(),
      },
    )

    result.current.mutate(request)

    await waitFor(() => {
      expect(result.current.isPending).toBe(true)
    })

    expect(
      mockRecommend,
    ).toHaveBeenCalledWith(request)

    resolveRequest?.({
      data: {
        items: [],
      },
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
  })
})