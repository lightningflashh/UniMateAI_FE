import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {
  renderHook,
  waitFor,
} from '@testing-library/react'
import { toast } from 'sonner'

import { majorApi } from '@/features/major/api/major.api'
import {
  useCreateMajor,
  useDeleteMajor,
  useMajors,
  useUpdateMajor,
} from '@/features/major/hooks/use-majors'

jest.mock(
  '@/features/major/api/major.api',
  () => ({
    majorApi: {
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

const mockedMajorApi =
  majorApi as jest.Mocked<typeof majorApi>

const mockedToast =
  toast as jest.Mocked<typeof toast>

function createWrapper() {
  const queryClient =
    new QueryClient({
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
      <QueryClientProvider
        client={queryClient}
      >
        {children}
      </QueryClientProvider>
    )
  }
}

describe('useMajors', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should get majors when universityId is provided', async () => {
    const params = {
      page: 1,
      limit: 100,
      universityId:
        'e49da10a-9719-4805-a8cb-2efaaa3d7a10',
    }

    const response = {
      data: {
        items: [
          {
            id: 'major-1',
            code: 'SPK159',
            name: 'Teacher',
            universityId:
              'e49da10a-9719-4805-a8cb-2efaaa3d7a10',
            majorGroupId:
              'fa52c5ca-b6b3-4284-993f-bff2842afb2a',
          },
        ],
        meta: {
          page: 1,
          limit: 100,
          totalItems: 1,
          totalPages: 1,
        },
      },
    }

    mockedMajorApi.getAll.mockResolvedValue(
      response as never,
    )

    const { result } = renderHook(
      () => useMajors(params),
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
      mockedMajorApi.getAll,
    ).toHaveBeenCalledWith(params)

    expect(result.current.data).toEqual(
      response.data,
    )
  })

  it('should not get majors when universityId is empty', async () => {
    const params = {
      page: 1,
      limit: 100,
      universityId: '',
    }

    const { result } = renderHook(
      () => useMajors(params),
      {
        wrapper: createWrapper(),
      },
    )

    expect(result.current.fetchStatus).toBe(
      'idle',
    )

    expect(
      mockedMajorApi.getAll,
    ).not.toHaveBeenCalled()
  })

  it('should handle get majors error', async () => {
    const error = new Error(
      'Failed to load majors',
    )

    mockedMajorApi.getAll.mockRejectedValue(
      error,
    )

    const params = {
      universityId:
        'e49da10a-9719-4805-a8cb-2efaaa3d7a10',
    }

    const { result } = renderHook(
      () => useMajors(params),
      {
        wrapper: createWrapper(),
      },
    )

    await waitFor(() => {
      expect(result.current.isError).toBe(
        true,
      )
    })

    expect(result.current.error).toBe(error)
  })
})

describe('useCreateMajor', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create a major', async () => {
    const data = {
      code: '7480201',
      name: 'Information Technology',
      description: 'IT major',
      universityId:
        'e49da10a-9719-4805-a8cb-2efaaa3d7a10',
      majorGroupId:
        'bd156176-b46b-43fc-9a65-c238285ad52e',
    }

    const response = {
      data: {
        id: 'major-1',
        ...data,
      },
    }

    mockedMajorApi.create.mockResolvedValue(
      response as never,
    )

    const { result } = renderHook(
      () => useCreateMajor(),
      {
        wrapper: createWrapper(),
      },
    )

    result.current.mutate(data)

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(
        true,
      )
    })

    expect(
      mockedMajorApi.create,
    ).toHaveBeenCalledWith(data)

    expect(
      mockedToast.success,
    ).toHaveBeenCalledWith(
      'Major created successfully',
    )
  })

  it('should show error toast when create fails', async () => {
    mockedMajorApi.create.mockRejectedValue(
      new Error('Create failed'),
    )

    const { result } = renderHook(
      () => useCreateMajor(),
      {
        wrapper: createWrapper(),
      },
    )

    result.current.mutate({
      code: '7480201',
      name: 'Information Technology',
      universityId:
        'e49da10a-9719-4805-a8cb-2efaaa3d7a10',
      majorGroupId:
        'bd156176-b46b-43fc-9a65-c238285ad52e',
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(
        true,
      )
    })

    expect(
      mockedToast.error,
    ).toHaveBeenCalledWith(
      'Failed to create major',
    )
  })
})

describe('useUpdateMajor', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should update a major', async () => {
    const id = 'major-1'

    const data = {
      name: 'Computer Science',
      majorGroupId:
        'fa52c5ca-b6b3-4284-993f-bff2842afb2a',
    }

    const response = {
      data: {
        id,
        name: 'Computer Science',
        majorGroupId:
          'fa52c5ca-b6b3-4284-993f-bff2842afb2a',
      },
    }

    mockedMajorApi.update.mockResolvedValue(
      response as never,
    )

    const { result } = renderHook(
      () => useUpdateMajor(),
      {
        wrapper: createWrapper(),
      },
    )

    result.current.mutate({
      id,
      data,
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(
        true,
      )
    })

    expect(
      mockedMajorApi.update,
    ).toHaveBeenCalledWith(id, data)

    expect(
      mockedToast.success,
    ).toHaveBeenCalledWith(
      'Major updated successfully',
    )
  })

  it('should show error toast when update fails', async () => {
    mockedMajorApi.update.mockRejectedValue(
      new Error('Update failed'),
    )

    const { result } = renderHook(
      () => useUpdateMajor(),
      {
        wrapper: createWrapper(),
      },
    )

    result.current.mutate({
      id: 'major-1',
      data: {
        name: 'Updated Major',
      },
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(
        true,
      )
    })

    expect(
      mockedToast.error,
    ).toHaveBeenCalledWith(
      'Failed to update major',
    )
  })
})

describe('useDeleteMajor', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should delete a major', async () => {
    const id = 'major-1'

    const response = {
      data: {
        id,
      },
    }

    mockedMajorApi.delete.mockResolvedValue(
      response as never,
    )

    const { result } = renderHook(
      () => useDeleteMajor(),
      {
        wrapper: createWrapper(),
      },
    )

    result.current.mutate(id)

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(
        true,
      )
    })

    expect(
      mockedMajorApi.delete,
    ).toHaveBeenCalledWith(id)

    expect(
      mockedToast.success,
    ).toHaveBeenCalledWith(
      'Major deleted successfully',
    )
  })

  it('should show error toast when delete fails', async () => {
    mockedMajorApi.delete.mockRejectedValue(
      new Error('Delete failed'),
    )

    const { result } = renderHook(
      () => useDeleteMajor(),
      {
        wrapper: createWrapper(),
      },
    )

    result.current.mutate('major-1')

    await waitFor(() => {
      expect(result.current.isError).toBe(
        true,
      )
    })

    expect(
      mockedToast.error,
    ).toHaveBeenCalledWith(
      'Failed to delete major',
    )
  })
})