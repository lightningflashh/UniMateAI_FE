import { majorGroupApi } from '@/features/major/api/major-group.api'
import { api } from '@/lib/axios'

jest.mock('@/lib/axios', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}))

const mockedApi = api as jest.Mocked<typeof api>

describe('majorGroupApi', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getAll', () => {
    it('should get all major groups', async () => {
      const params = {
        page: 1,
        limit: 10,
        search: 'Information',
      }

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

      mockedApi.get.mockResolvedValue(
        response as never,
      )

      const result =
        await majorGroupApi.getAll(params)

      expect(mockedApi.get).toHaveBeenCalledWith(
        '/major-groups',
        {
          params,
        },
      )

      expect(result).toBe(response)
    })

    it('should get all major groups without params', async () => {
      const response = {
        data: {
          items: [],
          meta: {
            page: 1,
            limit: 10,
            totalItems: 0,
            totalPages: 0,
          },
        },
      }

      mockedApi.get.mockResolvedValue(
        response as never,
      )

      const result =
        await majorGroupApi.getAll()

      expect(mockedApi.get).toHaveBeenCalledWith(
        '/major-groups',
        {
          params: undefined,
        },
      )

      expect(result).toBe(response)
    })
  })

  describe('create', () => {
    it('should create a major group', async () => {
      const data = {
        code: 'CNTT',
        name: 'Information Technology',
        description: 'IT major group',
      }

      const response = {
        data: {
          id: 'group-1',
          ...data,
        },
      }

      mockedApi.post.mockResolvedValue(
        response as never,
      )

      const result =
        await majorGroupApi.create(data)

      expect(mockedApi.post).toHaveBeenCalledWith(
        '/major-groups',
        data,
      )

      expect(result).toBe(response)
    })
  })

  describe('update', () => {
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

      mockedApi.patch.mockResolvedValue(
        response as never,
      )

      const result =
        await majorGroupApi.update(
          id,
          data,
        )

      expect(mockedApi.patch).toHaveBeenCalledWith(
        `/major-groups/${id}`,
        data,
      )

      expect(result).toBe(response)
    })
  })

  describe('delete', () => {
    it('should delete a major group', async () => {
      const id = 'group-1'

      const response = {
        data: {
          id,
        },
      }

      mockedApi.delete.mockResolvedValue(
        response as never,
      )

      const result =
        await majorGroupApi.delete(id)

      expect(mockedApi.delete).toHaveBeenCalledWith(
        `/major-groups/${id}`,
      )

      expect(result).toBe(response)
    })
  })
})