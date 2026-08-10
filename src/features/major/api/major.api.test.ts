import { majorApi } from '@/features/major/api/major.api'
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

describe('majorApi', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getAll', () => {
    it('should get all majors', async () => {
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
              code: '7480201',
              name: 'Information Technology',
              universityId:
                'e49da10a-9719-4805-a8cb-2efaaa3d7a10',
              majorGroupId:
                'bd156176-b46b-43fc-9a65-c238285ad52e',
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

      mockedApi.get.mockResolvedValue(
        response as never,
      )

      const result =
        await majorApi.getAll(params)

      expect(mockedApi.get).toHaveBeenCalledWith(
        '/majors',
        {
          params,
        },
      )

      expect(result).toBe(response)
    })

    it('should get majors with all filters', async () => {
      const params = {
        page: 2,
        limit: 10,
        search: 'Information',
        universityId:
          'e49da10a-9719-4805-a8cb-2efaaa3d7a10',
        majorGroupId:
          'bd156176-b46b-43fc-9a65-c238285ad52e',
        sortBy: 'name',
        sortOrder: 'asc' as const,
      }

      const response = {
        data: {
          items: [],
          meta: {
            page: 2,
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
        await majorApi.getAll(params)

      expect(mockedApi.get).toHaveBeenCalledWith(
        '/majors',
        {
          params,
        },
      )

      expect(result).toBe(response)
    })

    it('should get majors without params', async () => {
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
        await majorApi.getAll()

      expect(mockedApi.get).toHaveBeenCalledWith(
        '/majors',
        {
          params: undefined,
        },
      )

      expect(result).toBe(response)
    })
  })

  describe('create', () => {
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

      mockedApi.post.mockResolvedValue(
        response as never,
      )

      const result =
        await majorApi.create(data)

      expect(mockedApi.post).toHaveBeenCalledWith(
        '/majors',
        data,
      )

      expect(result).toBe(response)
    })
  })

  describe('update', () => {
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
          code: '7480201',
          name: 'Computer Science',
          majorGroupId:
            'fa52c5ca-b6b3-4284-993f-bff2842afb2a',
        },
      }

      mockedApi.patch.mockResolvedValue(
        response as never,
      )

      const result =
        await majorApi.update(id, data)

      expect(mockedApi.patch).toHaveBeenCalledWith(
        `/majors/${id}`,
        data,
      )

      expect(result).toBe(response)
    })
  })

  describe('delete', () => {
    it('should delete a major', async () => {
      const id = 'major-1'

      const response = {
        data: {
          id,
        },
      }

      mockedApi.delete.mockResolvedValue(
        response as never,
      )

      const result =
        await majorApi.delete(id)

      expect(mockedApi.delete).toHaveBeenCalledWith(
        `/majors/${id}`,
      )

      expect(result).toBe(response)
    })
  })
})