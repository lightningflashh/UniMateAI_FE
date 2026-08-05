import { api } from '@/lib/axios'
import type {
  CreateUniversityRequest,
  University,
  UniversityListResponse,
  UniversityQueryParams,
  UpdateUniversityRequest,
} from '@/types/university.type'



export const universityApi = {
  getAll(params?: UniversityQueryParams) {
    return api.get<UniversityListResponse>(
      '/universities',
      {
        params,
      },
    )
  },

  getById(id: string) {
    return api.get<University>(
      `/universities/${id}`,
    )
  },

  create(
    data: CreateUniversityRequest,
  ) {
    return api.post<University>(
      '/universities',
      data,
    )
  },

  update(
    id: string,
    data: UpdateUniversityRequest,
  ) {
    return api.patch<University>(
      `/universities/${id}`,
      data,
    )
  },

  delete(id: string) {
    return api.delete<void>(
      `/universities/${id}`,
    )
  },
}