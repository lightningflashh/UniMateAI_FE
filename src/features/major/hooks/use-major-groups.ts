import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  majorGroupApi,
  type MajorGroupQueryParams,
} from '@/features/major/api/major-group.api'

export function useMajorGroups(
  params?: MajorGroupQueryParams,
) {
  return useQuery({
    queryKey: ['major-groups', params],

    queryFn: async () => {
      const response =
        await majorGroupApi.getAll(params)

      return response.data
    },
  })
}

export function useCreateMajorGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (
      data: Parameters<
        typeof majorGroupApi.create
      >[0],
    ) => majorGroupApi.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['major-groups'],
      })

      toast.success(
        'Major group created successfully',
      )
    },

    onError: () => {
      toast.error(
        'Failed to create major group',
      )
    },
  })
}

export function useUpdateMajorGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: Parameters<
        typeof majorGroupApi.update
      >[1]
    }) =>
      majorGroupApi.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['major-groups'],
      })

      toast.success(
        'Major group updated successfully',
      )
    },

    onError: () => {
      toast.error(
        'Failed to update major group',
      )
    },
  })
}

export function useDeleteMajorGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      majorGroupApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['major-groups'],
      })

      toast.success(
        'Major group deleted successfully',
      )
    },

    onError: () => {
      toast.error(
        'Failed to delete major group',
      )
    },
  })
}