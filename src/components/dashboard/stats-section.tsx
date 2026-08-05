import {
  BookOpen,
  GraduationCap,
  School,
  Users,
} from 'lucide-react'

import { StatCard } from '@/components/dashboard/stat-card'

export function StatsSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Universities"
        value={25}
        icon={School}
      />

      <StatCard
        title="Majors"
        value={130}
        icon={GraduationCap}
      />

      <StatCard
        title="Admissions"
        value={840}
        icon={BookOpen}
      />

      <StatCard
        title="Users"
        value={1200}
        icon={Users}
      />
    </div>
  )
}