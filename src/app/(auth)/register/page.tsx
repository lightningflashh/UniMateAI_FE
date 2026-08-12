import { RegisterBanner } from '@/features/auth/components/register-banner'
import { RegisterForm } from '@/features/auth/components/register-form'

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="flex items-center justify-center p-6">
        <RegisterForm />
      </section>
      <RegisterBanner />
    </main>
  )
}