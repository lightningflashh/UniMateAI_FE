import {
  Brain,
  FileText,
  GraduationCap,
  MessageSquare,
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Recommendation',
  },
  {
    icon: GraduationCap,
    title: 'University Matching',
  },
  {
    icon: FileText,
    title: 'PDF Analysis',
  },
  {
    icon: MessageSquare,
    title: 'AI Chat Assistant',
  },
]

export function LoginBanner() {
  return (
    <aside className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 lg:flex">
      <div className="relative z-10 flex w-full flex-col justify-between p-16 text-white">
        <div>
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <GraduationCap className="h-8 w-8" />
          </div>

          <h1 className="text-5xl font-bold">
            UniMateAI
          </h1>

          <p className="mt-4 max-w-md text-lg text-blue-100">
            AI-powered University Admission Advisor that helps students choose the right university with confidence.
          </p>
        </div>

        <div className="space-y-5">
          {features.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="flex items-center gap-4"
            >
              <div className="rounded-xl bg-white/10 p-3">
                <Icon className="size-5" />
              </div>

              <span className="text-lg">{title}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}