import { ChangePasswordForm } from '@/features/user/components/change-password-form'
import { ProfileForm } from '@/features/user/components/profile-form'

export default function ProfilePage() {
  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Profile
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your account information.
        </p>
      </div>

      <div className="space-y-6">
        <ProfileForm />

        <ChangePasswordForm />
      </div>
    </main>
  )
}