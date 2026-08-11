import { z } from 'zod'

export const admissionMethodSchema =
  z.object({
    code: z
      .string()
      .min(1, 'Code is required')
      .max(
        50,
        'Code must not exceed 50 characters',
      ),

    name: z
      .string()
      .min(1, 'Name is required')
      .max(
        255,
        'Name must not exceed 255 characters',
      ),

    description: z
      .string()
      .optional(),
  })

export type AdmissionMethodFormValues = z.infer<typeof admissionMethodSchema>