import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {
  renderHook,
  waitFor,
} from '@testing-library/react'
import { toast } from 'sonner'

import {
  majorGroupApi,
} from '@/features/major/api/major-group.api'
import {
  useCreateMajorGroup,
  useDeleteMajorGroup,
  useMajorGroups,
  useUpdateMajorGroup,
} from '@/features/major/hooks/use-major-groups'

jest.mock(
  '@/features/major/api/major-group.api',
  () => ({
    majorGroupApi: {
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

const mockedMajorGroupApi =
  majorGroupApi as jest.Mocked<
    typeof majorGroupApi
  >

const mockedToast = toast as jest.Mocked<
  typeof toast
>

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

describe('useMajorGroups', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return major groups', async () => {
    const response = {
      data: {
        items: [
          {
            id: 'group-1',
            code: 'CNTT',
            name: 'Information Technology',
          },
        ],
        meta: {
          page: 1,
          limit: 10,
          totalItems: 1,
          totalPages: 1,
        },
      },
    }

    mockedMajorGroupApi.getAll.mockResolvedValue(
      response as never,
    )

    const { result } =
      renderHook(
        () =>
          useMajorGroups({
            page: 1,
            limit: 10,
          }),
        {
          wrapper: createWrapper(),
        },
      )

    await waitFor(() => {
      expect(
        result.current.isSuccess,
      ).toBe(true)
    })

    expect(
      result.current.data,
    ).toEqual(response.data)

    expect(
      mockedMajorGroupApi.getAll,
    ).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
    })
  })

  it('should handle error', async () => {
    const error =
      new Error('Failed to load')

    mockedMajorGroupApi.getAll.mockRejectedValue(
      error,
    )

    const { result } =
      renderHook(
        () => useMajorGroups(),
        {
          wrapper: createWrapper(),
        },
      )

    await waitFor(() => {
      expect(
        result.current.isError,
      ).toBe(true)
    })

    expect(
      result.current.error,
    ).toBe(error)
  })
})

describe('useCreateMajorGroup', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create a major group', async () => {
    const data = {
      code: 'CNTT',
      name: 'Information Technology',
      description: 'IT group',
    }

    const response = {
      data: {
        id: 'group-1',
        ...data,
      },
    }

    mockedMajorGroupApi.create.mockResolvedValue(
      response as never,
    )

    const { result } =
      renderHook(
        () => useCreateMajorGroup(),
        {
          wrapper: createWrapper(),
        },
      )

    result.current.mutate(data)

    await waitFor(() => {
      expect(
        result.current.isSuccess,
      ).toBe(true)
    })

    expect(
      mockedMajorGroupApi.create,
    ).toHaveBeenCalledWith(data)

    expect(
      mockedToast.success,
    ).toHaveBeenCalledWith(
      'Major group created successfully',
    )
  })

  it('should show error toast when create fails', async () => {
    mockedMajorGroupApi.create.mockRejectedValue(
      new Error('Create failed'),
    )

    const { result } =
      renderHook(
        () => useCreateMajorGroup(),
        {
          wrapper: createWrapper(),
        },
      )

    result.current.mutate({
      code: 'CNTT',
      name: 'Information Technology',
    })

    await waitFor(() => {
      expect(
        result.current.isError,
      ).toBe(true)
    })

    expect(
      mockedToast.error,
    ).toHaveBeenCalledWith(
      'Failed to create major group',
    )
  })
})

describe('useUpdateMajorGroup', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should update a major group', async () => {
    const id = 'group-1'

    const data = {
      name: 'Information Technology Updated',
    }

    const response = {
      data: {
        id,
        code: 'CNTT',
        name: data.name,
      },
    }

    mockedMajorGroupApi.update.mockResolvedValue(
      response as never,
    )

    const { result } =
      renderHook(
        () => useUpdateMajorGroup(),
        {
          wrapper: createWrapper(),
        },
      )

    result.current.mutate({
      id,
      data,
    })

    await waitFor(() => {
      expect(
        result.current.isSuccess,
      ).toBe(true)
    })

    expect(
      mockedMajorGroupApi.update,
    ).toHaveBeenCalledWith(
      id,
      data,
    )

    expect(
      mockedToast.success,
    ).toHaveBeenCalledWith(
      'Major group updated successfully',
    )
  })

  it('should show error toast when update fails', async () => {
    mockedMajorGroupApi.update.mockRejectedValue(
      new Error('Update failed'),
    )

    const { result } =
      renderHook(
        () => useUpdateMajorGroup(),
        {
          wrapper: createWrapper(),
        },
      )

    result.current.mutate({
      id: 'group-1',
      data: {
        name: 'Updated',
      },
    })

    await waitFor(() => {
      expect(
        result.current.isError,
      ).toBe(true)
    })

    expect(
      mockedToast.error,
    ).toHaveBeenCalledWith(
      'Failed to update major group',
    )
  })
})

describe('useDeleteMajorGroup', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should delete a major group', async () => {
    const id = 'group-1'

    const response = {
      data: {
        id,
      },
    }

    mockedMajorGroupApi.delete.mockResolvedValue(
      response as never,
    )

    const { result } =
      renderHook(
        () => useDeleteMajorGroup(),
        {
          wrapper: createWrapper(),
        },
      )

    result.current.mutate(id)

    await waitFor(() => {
      expect(
        result.current.isSuccess,
      ).toBe(true)
    })

    expect(
      mockedMajorGroupApi.delete,
    ).toHaveBeenCalledWith(id)

    expect(
      mockedToast.success,
    ).toHaveBeenCalledWith(
      'Major group deleted successfully',
    )
  })

  it('should show error toast when delete fails', async () => {
    mockedMajorGroupApi.delete.mockRejectedValue(
      new Error('Delete failed'),
    )

    const { result } =
      renderHook(
        () => useDeleteMajorGroup(),
        {
          wrapper: createWrapper(),
        },
      )

    result.current.mutate('group-1')

    await waitFor(() => {
      expect(
        result.current.isError,
      ).toBe(true)
    })

    expect(
      mockedToast.error,
    ).toHaveBeenCalledWith(
      'Failed to delete major group',
    )
  })
})