'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { WanderingEyes } from '@/components/wandering-eyes'
import { useProfile } from '@/features/user/hooks/use-profile'

const readOnlyInputStyles =
  'h-10 rounded-2xl border-slate-200/80 bg-slate-50/50 pl-5 text-sm transition-all duration-200 cursor-default focus-visible:ring-0 focus-visible:border-slate-200/80'

export function ProfileForm() {
  const { data: profile, isLoading, isError } = useProfile()

  if (isLoading) {
    return (
      <Card className="w-full border border-slate-200/80 bg-slate-50/50 shadow-sm">
        <CardContent className="flex items-center justify-center p-12">
          <WanderingEyes className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  if (isError || !profile) {
    return (
      <Card className="w-full border border-destructive/20 bg-destructive/5">
        <CardContent className="p-6 text-sm font-medium text-destructive">
          Failed to load profile. Please refresh or try again later.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full border border-slate-200/80 bg-slate-50/50 shadow-sm transition-all duration-300 hover:border-emerald-500/50 hover:shadow-emerald-500/10 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-900">
          Account Information
        </CardTitle>
        <CardDescription className="text-sm text-emerald-600/70">
          View your account information.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-2 text-slate-800">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            value={profile.fullName ?? ''}
            className={readOnlyInputStyles}
            readOnly
          />
        </div>

        <div className="space-y-2 text-slate-800">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={profile.email ?? ''}
            className={readOnlyInputStyles}
            readOnly
          />
        </div>

        <div className="space-y-2 text-slate-800">
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            value={profile.role ?? ''}
            className={readOnlyInputStyles}
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  )
}