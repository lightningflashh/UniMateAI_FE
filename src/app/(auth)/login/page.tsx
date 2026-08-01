import { LoginBanner } from '@/features/auth/components/login-banner'
import { LoginForm } from '@/features/auth/components/login-form'

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <LoginBanner />

      <div className="flex items-center justify-center p-6 lg:p-10">
        <LoginForm />
      </div>
    </div>
  )
}