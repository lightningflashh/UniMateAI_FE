import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  majorApi,
  type MajorQueryParams,
} from '@/features/major/api/major.api'

export function useMajors(
  params?: MajorQueryParams,
) {
  return useQuery({
    queryKey: ['majors', params],

    queryFn: async () => {
      const response =
        await majorApi.getAll(params)

      return response.data
    },
  })
}

export function useCreateMajor() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: (
      data: Parameters<
        typeof majorApi.create
      >[0],
    ) => majorApi.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['majors'],
      })

      toast.success(
        'Major created successfully',
      )
    },

    onError: () => {
      toast.error(
        'Failed to create major',
      )
    },
  })
}

export function useUpdateMajor() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: Parameters<
        typeof majorApi.update
      >[1]
    }) =>
      majorApi.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['majors'],
      })

      toast.success(
        'Major updated successfully',
      )
    },

    onError: () => {
      toast.error(
        'Failed to update major',
      )
    },
  })
}

export function useDeleteMajor() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      majorApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['majors'],
      })

      toast.success(
        'Major deleted successfully',
      )
    },

    onError: () => {
      toast.error(
        'Failed to delete major',
      )
    },
  })
}