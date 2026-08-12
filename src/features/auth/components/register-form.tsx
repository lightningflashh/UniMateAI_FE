'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Lock, Mail, User, Loader2, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRegister } from '@/features/auth/hooks/use-register'
import {
  registerSchema,
  type RegisterFormValues,
} from '@/features/auth/schemas/register.schema'

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const registerMutation = useRegister()

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    })
  }

  return (
    <div className="w-full max-w-[420px] px-6 sm:px-0">
      {/* Header Section */}
      <div className="mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50/50 px-3 py-1 text-xs font-semibold text-emerald-600 backdrop-blur-sm">
          <Sparkles className="size-3.5 text-emerald-500" />
          <span>Khởi tạo hành trình mới</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Tạo tài khoản
        </h1>
        <p className="text-sm leading-relaxed text-slate-500">
          Đăng ký ngay để mở khóa toàn bộ tính năng phân tích và tư vấn của <span className="font-semibold text-slate-700">UniMate AI</span>.
        </p>
      </div>

      {/* Form Content */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name Field */}
        <div className="space-y-1.5">
          <Label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Họ và tên
          </Label>
          <div className="group relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 transition-colors group-focus-within:text-emerald-500" />
            <Input
              id="fullName"
              type="text"
              placeholder="Nguyễn Văn A"
              className="h-12 rounded-2xl border-slate-200/80 bg-slate-50/50 pl-10 text-sm transition-all duration-200 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/10"
              {...register('fullName')}
            />
          </div>
          {errors.fullName && (
            <p className="pl-1 pt-0.5 text-xs font-medium text-rose-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Địa chỉ Email
          </Label>
          <div className="group relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 transition-colors group-focus-within:text-emerald-500" />
            <Input
              id="email"
              type="email"
              placeholder="tenban@example.com"
              className="h-12 rounded-2xl border-slate-200/80 bg-slate-50/50 pl-10 text-sm transition-all duration-200 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/10"
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p className="pl-1 pt-0.5 text-xs font-medium text-rose-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Mật khẩu
          </Label>
          <div className="group relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 transition-colors group-focus-within:text-emerald-500" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="h-12 rounded-2xl border-slate-200/80 bg-slate-50/50 pl-10 pr-10 text-sm transition-all duration-200 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/10"
              {...register('password')}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 size-9 text-slate-400 hover:bg-transparent hover:text-slate-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </Button>
          </div>
          {errors.password && (
            <p className="pl-1 pt-0.5 text-xs font-medium text-rose-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Xác nhận mật khẩu
          </Label>
          <div className="group relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 transition-colors group-focus-within:text-emerald-500" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="h-12 rounded-2xl border-slate-200/80 bg-slate-50/50 pl-10 pr-10 text-sm transition-all duration-200 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/10"
              {...register('confirmPassword')}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 size-9 text-slate-400 hover:bg-transparent hover:text-slate-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </Button>
          </div>
          {errors.confirmPassword && (
            <p className="pl-1 pt-0.5 text-xs font-medium text-rose-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-2 h-12 w-full rounded-2xl bg-gradient-to-r from-slate-900 to-[#0B1528] font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:shadow-xl hover:shadow-slate-900/20 active:scale-[0.99] disabled:opacity-70"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? (
            <div className="flex items-center gap-2">
              <Loader2 className="size-4 animate-spin text-emerald-400" />
              <span>Đang khởi tạo tài khoản...</span>
            </div>
          ) : (
            'Đăng ký tài khoản'
          )}
        </Button>

        {/* Divider */}
        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200/70" />
          </div>
          <span className="relative bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Đã có tài khoản?
          </span>
        </div>

        {/* Login CTA Link */}
        <Link
          href="/login"
          className="flex h-12 w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50/50 text-xs font-bold text-slate-700 transition-all hover:bg-slate-100/80 hover:text-slate-900"
        >
          Đăng nhập ngay
        </Link>
      </form>
    </div>
  )
}