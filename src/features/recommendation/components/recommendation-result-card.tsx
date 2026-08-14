import {
  CheckCircle2,
  GraduationCap,
  TrendingUp,
} from 'lucide-react'

import {
  Card,
  CardContent,
} from '@/components/ui/card'

import type { RecommendationItem } from '@/types/recommendation.type'

interface RecommendationResultCardProps {
  item: RecommendationItem
}

export function RecommendationResultCard({
  item,
}: RecommendationResultCardProps) {
  const chanceConfig = {
    HIGH: {
      label: 'High Chance',
      className:
        'bg-green-100 text-green-700',
    },

    MEDIUM: {
      label: 'Medium Chance',
      className:
        'bg-yellow-100 text-yellow-700',
    },

    LOW: {
      label: 'Low Chance',
      className:
        'bg-red-100 text-red-700',
    },
  }

  const chance =
    chanceConfig[item.chance]

  return (
    <Card className="border-0 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <GraduationCap className="size-6 text-primary" />
            </div>

            <div>
              <h3 className="font-semibold">
                {item.university.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                {item.university.shortName ??
                  item.university.code}
              </p>
            </div>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${chance.className}`}
          >
            {chance.label}
          </span>
        </div>

        <div className="mt-5 rounded-xl bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            Major
          </p>

          <p className="mt-1 font-medium">
            {item.major.name}
          </p>

          <p className="text-xs text-muted-foreground">
            {item.major.code}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">
              Your Score
            </p>

            <p className="mt-1 text-lg font-bold">
              {item.userScore}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Required
            </p>

            <p className="mt-1 text-lg font-bold">
              {item.requiredScore}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Difference
            </p>

            <p className="mt-1 flex items-center gap-1 text-lg font-bold">
              <TrendingUp className="size-4" />

              {item.difference.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 border-t pt-4 text-sm text-muted-foreground">
          <CheckCircle2 className="size-4 text-green-500" />

          {item.admissionMethod.name}
        </div>
      </CardContent>
    </Card>
  )
}