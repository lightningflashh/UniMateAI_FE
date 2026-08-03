import { AdmissionChart } from '@/components/dashboard/admission-chart'
import { RecentUniversities } from '@/components/dashboard/recent-universities'
import { RecentUsers } from '@/components/dashboard/recent-users'
import { StatsSection } from '@/components/dashboard/stats-section'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Welcome back to UniMateAI Admin.
        </p>
      </div>

      <StatsSection />

      <AdmissionChart />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentUniversities />

        <RecentUsers />
      </div>
    </div>
  )
}