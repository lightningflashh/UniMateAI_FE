'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLogin } from '@/features/auth/hooks/use-login'
import type { LoginFormValues} from '@/features/auth/schemas/login.schema';
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
    <Card className="w-full max-w-md rounded-3xl border-0 shadow-xl">
      <CardHeader className="space-y-2 pb-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back 👋
        </h2>

        <p className="text-muted-foreground">
          Sign in to continue using UniMateAI.
        </p>
      </CardHeader>

      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
            />

            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Password
            </Label>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="pr-12"
                {...register('password')}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </Button>
            </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />

              <Label
                htmlFor="remember"
                className="font-normal"
              >
                Remember me
              </Label>
            </div>

            <Link
              href="#"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          
          <Button
            type="submit"
            className="h-11 w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending
              ? 'Signing in...'
              : 'Sign In'}
          </Button>

          <p className="text-muted-foreground text-center text-sm">
            Do not have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}