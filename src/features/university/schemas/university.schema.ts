import { z } from 'zod'

export const universitySchema = z.object({
  name: z.string().min(1, 'Name is required'),

  shortName: z
    .string()
    .min(1, 'Short name is required'),

  code: z.string().min(1, 'Code is required'),

  province: z
    .string()
    .min(1, 'Province is required'),

  address: z
    .string()
    .min(1, 'Address is required'),

  website: z.string().optional(),

  logo: z.string().optional(),

  description: z.string().optional(),
})

export type UniversityFormValues =
  z.infer<typeof universitySchema>