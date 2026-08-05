import { universityApi } from './university.api'

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

describe('University API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getAll', () => {
    it('should get all universities', async () => {
      mockedApi.get.mockResolvedValue({
        data: {
          items: [],
          meta: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
          },
        },
      })

      const result = await universityApi.getAll()

      expect(mockedApi.get).toHaveBeenCalledWith(
        '/universities',
        {
          params: undefined,
        },
      )

      expect(result.data.items).toEqual([])
    })

    it('should pass query params', async () => {
      mockedApi.get.mockResolvedValue({
        data: {
          items: [],
          meta: {},
        },
      })

      const params = {
        page: 2,
        limit: 5,
        search: 'HCM',
      }

      await universityApi.getAll(params)

      expect(mockedApi.get).toHaveBeenCalledWith(
        '/universities',
        {
          params,
        },
      )
    })
  })

  describe('getById', () => {
    it('should get university by id', async () => {
      mockedApi.get.mockResolvedValue({
        data: {
          id: '1',
        },
      })

      await universityApi.getById('1')

      expect(mockedApi.get).toHaveBeenCalledWith(
        '/universities/1',
      )
    })
  })

  describe('create', () => {
    it('should create university', async () => {
      const payload = {
        name: 'HCMUTE',
        shortName: 'UTE',
        code: 'UTE',
        province: 'HCM',
        address: 'Vo Van Ngan',
      }

      mockedApi.post.mockResolvedValue({
        data: {
          id: '1',
          ...payload,
        },
      })

      await universityApi.create(payload)

      expect(mockedApi.post).toHaveBeenCalledWith(
        '/universities',
        payload,
      )
    })
  })

  describe('update', () => {
    it('should update university', async () => {
      const payload = {
        name: 'Updated HCMUTE',
      }

      mockedApi.patch.mockResolvedValue({
        data: {
          id: '1',
          ...payload,
        },
      })

      await universityApi.update(
        '1',
        payload,
      )

      expect(mockedApi.patch).toHaveBeenCalledWith(
        '/universities/1',
        payload,
      )
    })
  })

  describe('delete', () => {
    it('should delete university', async () => {
      mockedApi.delete.mockResolvedValue({
        data: undefined,
      })

      await universityApi.delete('1')

      expect(mockedApi.delete).toHaveBeenCalledWith(
        '/universities/1',
      )
    })
  })
})