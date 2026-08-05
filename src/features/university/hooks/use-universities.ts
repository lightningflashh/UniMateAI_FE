import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { universityApi } from '@/features/university/api/university.api'
import type {
  UniversityQueryParams,
  UpdateUniversityRequest,
} from '@/types/university.type'

export function useUniversities(
  params?: UniversityQueryParams,
) {
  return useQuery({
    queryKey: ['universities', params],
    queryFn: async () => {
      const response =
        await universityApi.getAll(params)

      return response.data
    },
  })
}

export function useCreateUniversity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: universityApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['universities'],
      })

      toast.success(
        'University created successfully',
      )
    },

    onError: error => {
      toast.error(
        error.message ??
        'Failed to create university',
      )
    },
  })
}

export function useUpdateUniversity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: UpdateUniversityRequest
    }) => universityApi.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['universities'],
      })

      toast.success('University updated successfully')
    },

    onError: () => {
      toast.error('Failed to update university')
    },
  })
}

export function useDeleteUniversity() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: universityApi.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['universities'],
      })

      toast.success(
        'University deleted successfully',
      )
    },

    onError: () => {
      toast.error(
        'Failed to delete university',
      )
    },
  })
}