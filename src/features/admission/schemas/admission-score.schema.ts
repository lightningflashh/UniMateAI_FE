import { z } from 'zod'

export const admissionScoreSchema = z.object({
  majorId: z
    .string()
    .min(1, 'Major is required'),

  admissionMethodId: z
    .string()
    .min(
      1,
      'Admission method is required',
    ),

  year: z
    .number({
      error: 'Year is required',
    })
    .int('Year must be an integer')
    .min(2000, 'Invalid year')
    .max(
      2100,
      'Invalid year',
    ),

  score: z
    .number({
      error: 'Score is required',
    })
    .min(
      0,
      'Score must be greater than or equal to 0',
    )
    .max(
      30,
      'Score must be less than or equal to 30',
    ),

  quota: z
    .number()
    .int('Quota must be an integer')
    .min(
      0,
      'Quota must be greater than or equal to 0',
    )
    .optional(),

  note: z
    .string()
    .optional(),
})

export type AdmissionScoreFormValues =
  z.infer<
    typeof admissionScoreSchema
  >