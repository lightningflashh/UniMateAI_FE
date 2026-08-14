'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useChangePassword } from '@/features/user/hooks/use-change-password'
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from '@/features/user/schemas/change-password.schema'

// Input style tái sử dụng
const inputStyles =
  'h-10 rounded-2xl border-slate-200/80 bg-slate-50/50 pl-5 pr-10 text-sm transition-all duration-200 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/10'

export function ChangePasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const mutation = useChangePassword()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: ChangePasswordFormValues) => {
    mutation.mutate(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          reset()
        },
      },
    )
  }

  return (
    <Card className="w-full border border-slate-200/80 bg-slate-50/50 shadow-sm transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-900">
          Change Password
        </CardTitle>

        <CardDescription className="text-sm text-emerald-600/70">
          Update your password to keep your account secure.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Current password */}
          <div className="space-y-2 text-slate-800">
            <Label htmlFor="currentPassword">Current password</Label>

            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrent ? 'text' : 'password'}
                className={inputStyles}
                {...register('currentPassword')}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={showCurrent ? 'Hide current password' : 'Show current password'}
                className="absolute right-1 top-1 h-8 w-8 text-slate-500 hover:text-slate-800"
                onClick={() => setShowCurrent(v => !v)}
              >
                {showCurrent ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </Button>
            </div>

            {errors.currentPassword && (
              <p className="text-sm text-red-500">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New password */}
          <div className="space-y-2 text-slate-800">
            <Label htmlFor="newPassword">New password</Label>

            <div className="relative">
              <Input
                id="newPassword"
                type={showNew ? 'text' : 'password'}
                className={inputStyles}
                {...register('newPassword')}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={showNew ? 'Hide new password' : 'Show new password'}
                className="absolute right-1 top-1 h-8 w-8 text-slate-500 hover:text-slate-800"
                onClick={() => setShowNew(v => !v)}
              >
                {showNew ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </Button>
            </div>

            {errors.newPassword && (
              <p className="text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm password */}
          <div className="space-y-2 text-slate-800">
            <Label htmlFor="confirmPassword">Confirm new password</Label>

            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                className={inputStyles}
                {...register('confirmPassword')}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                className="absolute right-1 top-1 h-8 w-8 text-slate-500 hover:text-slate-800"
                onClick={() => setShowConfirm(v => !v)}
              >
                {showConfirm ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </Button>
            </div>

            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="h-10 bg-gradient-to-r from-slate-900 to-[#0B1528] font-semibold text-white shadow-sm shadow-slate-400/10 transition-all duration-200 hover:shadow-xl hover:shadow-slate-400/20 active:scale-[0.99] disabled:opacity-70"
            >
              {mutation.isPending ? 'Changing...' : 'Change Password'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}