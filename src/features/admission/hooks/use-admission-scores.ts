import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  admissionScoreApi,
  type AdmissionScoreQueryParams,
  type CreateAdmissionScoreRequest,
} from '@/features/admission/api/admission-score.api'

export function useAdmissionScores(
  params?: AdmissionScoreQueryParams,
) {
  return useQuery({
    queryKey: ['admission-scores', params],

    queryFn: async () => {
      const response =
        await admissionScoreApi.getAll(params)

      return response.data
    },
  })
}

export function useCreateAdmissionScore() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (
      data: CreateAdmissionScoreRequest,
    ) => admissionScoreApi.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admission-scores'],
      })

      toast.success(
        'Admission score created successfully',
      )
    },

    onError: () => {
      toast.error(
        'Failed to create admission score',
      )
    },
  })
}

export function useUpdateAdmissionScore() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: Parameters<
        typeof admissionScoreApi.update
      >[1]
    }) => admissionScoreApi.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admission-scores'],
      })

      toast.success(
        'Admission score updated successfully',
      )
    },

    onError: () => {
      toast.error(
        'Failed to update admission score',
      )
    },
  })
}

export function useDeleteAdmissionScore() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      admissionScoreApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admission-scores'],
      })

      toast.success(
        'Admission score deleted successfully',
      )
    },

    onError: () => {
      toast.error(
        'Failed to delete admission score',
      )
    },
  })
}