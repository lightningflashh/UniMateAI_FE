import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  admissionMethodApi,
  type AdmissionMethodQueryParams,
} from '@/features/admission/api/admission-method.api'

export function useAdmissionMethods(
  params?: AdmissionMethodQueryParams,
) {
  return useQuery({
    queryKey: ['admission-methods', params],

    queryFn: async () => {
      const response =
        await admissionMethodApi.getAll(params)

      return response.data
    },
  })
}

export function useCreateAdmissionMethod() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: admissionMethodApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admission-methods'],
      })

      toast.success(
        'Admission method created successfully',
      )
    },

    onError: () => {
      toast.error(
        'Failed to create admission method',
      )
    },
  })
}

export function useUpdateAdmissionMethod() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: Parameters<
        typeof admissionMethodApi.update
      >[1]
    }) =>
      admissionMethodApi.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admission-methods'],
      })

      toast.success(
        'Admission method updated successfully',
      )
    },

    onError: () => {
      toast.error(
        'Failed to update admission method',
      )
    },
  })
}

export function useDeleteAdmissionMethod() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      admissionMethodApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admission-methods'],
      })

      toast.success(
        'Admission method deleted successfully',
      )
    },

    onError: () => {
      toast.error(
        'Failed to delete admission method',
      )
    },
  })
}