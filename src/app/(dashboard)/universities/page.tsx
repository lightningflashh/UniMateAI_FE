import { UniversityTable } from '@/features/university/components/table'

export default function UniversitiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Universities
          </h1>

          <p className="text-muted-foreground">
            Manage universities.
          </p>
        </div>
      </div>

      <UniversityTable />
    </div>
  )
}