import { z } from 'zod'

export const majorGroupSchema = z.object({
  code: z
    .string()
    .min(1, 'Code is required')
    .max(50, 'Code must be at most 50 characters'),

  name: z
    .string()
    .min(1, 'Name is required')
    .max(
      255,
      'Name must be at most 255 characters',
    ),

  description: z
    .string()
    .max(
      1000,
      'Description must be at most 1000 characters',
    )
    .optional(),
})

export type MajorGroupFormValues = z.infer<
  typeof majorGroupSchema
>