import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const universities = [
  {
    id: 1,
    name: 'HCMUTE',
    city: 'HCM',
  },
  {
    id: 2,
    name: 'VNU HCM',
    city: 'HCM',
  },
  {
    id: 3,
    name: 'Can Tho University',
    city: 'Can Tho',
  },
]

export function RecentUniversities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Recent Universities
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {universities.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <p className="font-medium">
                  {item.name}
                </p>

                <p className="text-muted-foreground text-sm">
                  {item.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}