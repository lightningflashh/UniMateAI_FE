'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = [
  { year: '2022', admissions: 320 },
  { year: '2023', admissions: 480 },
  { year: '2024', admissions: 620 },
  { year: '2025', admissions: 790 },
]

export function AdmissionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Admission Overview
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="year" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="admissions"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}