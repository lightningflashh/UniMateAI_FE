'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Lock, Mail, Loader2, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLogin } from '@/features/auth/hooks/use-login'
import type { LoginFormValues } from '@/features/auth/schemas/login.schema'
import { loginSchema } from '@/features/auth/schemas/login.schema'

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useLogin()
  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data)
  }

  return (
    <div className="w-full max-w-[420px] px-6 sm:px-0">
      {/* Header Section */}
      <div className="mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50/50 px-3 py-1 text-xs font-semibold text-emerald-600 backdrop-blur-sm">
          <Sparkles className="size-3.5 text-emerald-500" />
          <span>Chào mừng bạn quay lại</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Đăng nhập
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          Nhập thông tin tài khoản của bạn để tiếp tục sử dụng dịch vụ của <span className="font-semibold text-slate-700">UniMate AI</span>.
        </p>
      </div>

      {/* Form Content */}
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
            <p className="text-xs font-medium text-rose-500 pl-1 pt-0.5">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Mật khẩu
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Quên mật khẩu?
            </Link>
          </div>
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
            <p className="text-xs font-medium text-rose-500 pl-1 pt-0.5">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2 pt-1">
          <Checkbox 
            id="remember" 
            className="rounded-md border-slate-300 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500" 
          />
          <Label
            htmlFor="remember"
            className="text-xs font-medium text-slate-600 cursor-pointer select-none"
          >
            Duy trì đăng nhập trong 30 ngày
          </Label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="h-12 w-full rounded-2xl bg-gradient-to-r from-slate-900 to-[#0B1528] font-semibold text-white shadow-lg shadow-slate-900/10 hover:shadow-xl hover:shadow-slate-900/20 active:scale-[0.99] transition-all duration-200 disabled:opacity-70"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <div className="flex items-center gap-2">
              <Loader2 className="size-4 animate-spin text-emerald-400" />
              <span>Đang xác thực...</span>
            </div>
          ) : (
            'Đăng nhập ngay'
          )}
        </Button>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200/70" />
          </div>
          <span className="relative bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Chưa có tài khoản?
          </span>
        </div>

        <Link
          href="/register"
          className="flex h-12 w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50/50 text-xs font-bold text-slate-700 transition-all hover:bg-slate-100/80 hover:text-slate-900"
        >
          Tạo tài khoản UniMate AI mới
        </Link>
      </form>
    </div>
  )
}