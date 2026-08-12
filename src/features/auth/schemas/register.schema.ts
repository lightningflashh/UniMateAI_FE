import { z } from 'zod'

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Full name must be at least 2 characters'),

    email: z
      .string()
      .email('Invalid email address'),

    password: z
      .string()
      .min(
        8,
        'Password must be at least 8 characters',
      ),

    confirmPassword: z
      .string()
      .min(
        8,
        'Please confirm your password',
      ),
  })
  .refine(
    data =>
      data.password ===
      data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    },
  )

export type RegisterFormValues =
  z.infer<typeof registerSchema>