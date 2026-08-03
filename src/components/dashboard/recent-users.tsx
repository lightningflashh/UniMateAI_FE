import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const users = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Alice',
    role: 'Student',
  },
  {
    id: 3,
    name: 'Bob',
    role: 'Student',
  },
]

export function RecentUsers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Recent Users
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {users.map(user => (
            <div
              key={user.id}
              className="flex items-center gap-3"
            >
              <Avatar>
                <AvatarFallback>
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">
                  {user.name}
                </p>

                <p className="text-muted-foreground text-sm">
                  {user.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}