import { z } from 'zod'

export const recommendationSchema = z.object({
  score: z
    .number()
    .min(0, 'Score must be at least 0')
    .max(30, 'Score must not exceed 30'),

  year: z
    .number()
    .min(2020, 'Invalid admission year')
    .max(2100, 'Invalid admission year'),

  admissionMethodId: z
    .string()
    .min(
      1,
      'Please select an admission method',
    ),

  majorGroupId: z
    .string()
    .optional(),
})

export const recommendationResultSchema =
  z.object({
    university: z.object({
      id: z.string(),
      code: z.string(),
      name: z.string(),
      shortName: z.string().nullable(),
      logoUrl: z.string().nullable(),
    }),

    major: z.object({
      id: z.string(),
      code: z.string(),
      name: z.string(),
    }),

    majorGroup: z.object({
      id: z.string(),
      code: z.string(),
      name: z.string(),
    }),

    admissionMethod: z.object({
      id: z.string(),
      code: z.string(),
      name: z.string(),
    }),

    year: z.number(),
    requiredScore: z.number(),
    userScore: z.number(),
    difference: z.number(),

    chance: z.enum([
      'HIGH',
      'MEDIUM',
      'LOW',
    ]),
  })

export type RecommendationFormValues =
  z.infer<typeof recommendationSchema>

export type RecommendationResult =
  z.infer<
    typeof recommendationResultSchema
  >