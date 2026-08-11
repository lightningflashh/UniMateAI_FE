import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {
  renderHook,
  waitFor,
} from '@testing-library/react'

import { toast } from 'sonner'

import { admissionMethodApi } from '@/features/admission/api/admission-method.api'
import {
  useAdmissionMethods,
  useCreateAdmissionMethod,
  useDeleteAdmissionMethod,
  useUpdateAdmissionMethod,
} from '@/features/admission/hooks/use-admission-methods'

jest.mock(
  '@/features/admission/api/admission-method.api',
  () => ({
    admissionMethodApi: {
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

const mockedAdmissionMethodApi =
  admissionMethodApi as jest.Mocked<
    typeof admissionMethodApi
  >

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

describe('useAdmissionMethods', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should get admission methods', async () => {
    const params = {
      page: 1,
      limit: 10,
    }

    const response = {
        data: {
          items: [
            {
              id: 'method-1',
              code: 'THPT',
              name: 'Xét điểm thi THPT',
              description: null,
              createdAt: '2026-01-01',
              updatedAt: '2026-01-01',
              deletedAt: null,
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

    mockedAdmissionMethodApi.getAll.mockResolvedValue(
      response as never,
    )

    const { result } = renderHook(
      () => useAdmissionMethods(params),
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
      mockedAdmissionMethodApi.getAll,
    ).toHaveBeenCalledWith(params)

    expect(result.current.data).toEqual(
      response.data,
    )
  })

  it('should handle get error', async () => {
    const error = new Error(
      'Failed to load admission methods',
    )

    mockedAdmissionMethodApi.getAll.mockRejectedValue(
      error,
    )

    const { result } = renderHook(
      () => useAdmissionMethods(),
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

describe('useCreateAdmissionMethod', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create admission method', async () => {
    const data = {
      code: 'THPT',
      name: 'Xét điểm thi THPT',
      description:
        'Xét tuyển bằng điểm thi THPT',
    }

    const response = {
      data: {
        id: 'method-1',
        ...data,
      },
    }

    mockedAdmissionMethodApi.create.mockResolvedValue(
      response as never,
    )

    const { result } = renderHook(
      () => useCreateAdmissionMethod(),
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
      mockedAdmissionMethodApi.create,
    ).toHaveBeenCalledWith(data)

    expect(
      mockedToast.success,
    ).toHaveBeenCalledWith(
      'Admission method created successfully',
    )
  })

  it('should show error toast when create fails', async () => {
    mockedAdmissionMethodApi.create.mockRejectedValue(
      new Error('Create failed'),
    )

    const { result } = renderHook(
      () => useCreateAdmissionMethod(),
      {
        wrapper: createWrapper(),
      },
    )

    result.current.mutate({
      code: 'THPT',
      name: 'Xét điểm thi THPT',
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(
        true,
      )
    })

    expect(
      mockedToast.error,
    ).toHaveBeenCalledWith(
      'Failed to create admission method',
    )
  })
})

describe('useUpdateAdmissionMethod', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should update admission method', async () => {
    const id = 'method-1'

    const data = {
      name: 'Xét điểm thi tốt nghiệp THPT',
    }

    const response = {
      data: {
        id,
        code: 'THPT',
        ...data,
      },
    }

    mockedAdmissionMethodApi.update.mockResolvedValue(
      response as never,
    )

    const { result } = renderHook(
      () => useUpdateAdmissionMethod(),
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
      mockedAdmissionMethodApi.update,
    ).toHaveBeenCalledWith(id, data)

    expect(
      mockedToast.success,
    ).toHaveBeenCalledWith(
      'Admission method updated successfully',
    )
  })

  it('should show error toast when update fails', async () => {
    mockedAdmissionMethodApi.update.mockRejectedValue(
      new Error('Update failed'),
    )

    const { result } = renderHook(
      () => useUpdateAdmissionMethod(),
      {
        wrapper: createWrapper(),
      },
    )

    result.current.mutate({
      id: 'method-1',
      data: {
        name: 'Updated',
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
      'Failed to update admission method',
    )
  })
})

describe('useDeleteAdmissionMethod', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should delete admission method', async () => {
    const id = 'method-1'

    const response = {
      data: {
        id,
      },
    }

    mockedAdmissionMethodApi.delete.mockResolvedValue(
      response as never,
    )

    const { result } = renderHook(
      () => useDeleteAdmissionMethod(),
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
      mockedAdmissionMethodApi.delete,
    ).toHaveBeenCalledWith(id)

    expect(
      mockedToast.success,
    ).toHaveBeenCalledWith(
      'Admission method deleted successfully',
    )
  })

  it('should show error toast when delete fails', async () => {
    mockedAdmissionMethodApi.delete.mockRejectedValue(
      new Error('Delete failed'),
    )

    const { result } = renderHook(
      () => useDeleteAdmissionMethod(),
      {
        wrapper: createWrapper(),
      },
    )

    result.current.mutate('method-1')

    await waitFor(() => {
      expect(result.current.isError).toBe(
        true,
      )
    })

    expect(
      mockedToast.error,
    ).toHaveBeenCalledWith(
      'Failed to delete admission method',
    )
  })
})