'use client'

import { useRouter } from 'next/navigation'
import {
  Brain,
  FileText,
  GraduationCap,
  MessageSquare,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Recommendation',
    desc: 'Gợi ý ngành học phù hợp với năng lực',
  },
  {
    icon: GraduationCap,
    title: 'University Matching',
    desc: 'Đánh giá chính xác tỷ lệ trúng tuyển',
  },
  {
    icon: FileText,
    title: 'PDF Analysis',
    desc: 'Trích xuất và phân tích học bạ tự động',
  },
  {
    icon: MessageSquare,
    title: 'AI Chat Assistant',
    desc: 'Tư vấn và giải đáp thắc mắc tuyển sinh',
  },
]

export function LoginBanner() {
  const router = useRouter()

  return (
    <aside className="relative hidden w-full flex-col justify-between bg-[#0B1528] p-12 text-white lg:flex xl:p-16">
      {/* Nút chuyển sang Register */}
      <div className="absolute -right-5 top-1/2 z-30 -translate-y-1/2">
        <button
          onClick={() => router.push('/register')}
          title="Chưa có tài khoản? Đăng ký ngay"
          type="button"
          className="group flex h-10 items-center gap-2 rounded-full border border-slate-700 bg-[#0B1528] px-3.5 py-2 text-xs font-medium text-slate-300 shadow-2xl transition-all duration-300 hover:scale-105 hover:border-emerald-500 hover:text-white"
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs">
            Đăng ký
          </span>
          <ArrowRight className="h-4 w-4 text-emerald-400 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Brand Header */}
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-[#0B1528] shadow-md shadow-emerald-500/20">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            UniMate AI
          </span>
        </div>

        {/* Hero Text */}
        <div className="mt-16 xl:mt-20">
          <h1 className="text-4xl font-semibold tracking-tight text-white xl:text-5xl xl:leading-tight">
            Tư vấn tuyển sinh <br />
            <span className="text-emerald-400">chính xác & tin cậy.</span>
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
            Hỗ trợ học sinh phân tích hồ sơ, chọn trường phù hợp và tối ưu hóa cơ hội trúng tuyển đại học.
          </p>
        </div>
      </div>

      {/* Feature List - Modern Clean Cards */}
      <div className="relative z-10 mt-12 space-y-3">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group flex items-start gap-4 rounded-xl border border-slate-800/80 bg-slate-900/50 p-4 transition-all duration-200 hover:border-slate-700 hover:bg-slate-900"
          >
            <div className="mt-0.5 rounded-lg bg-emerald-500/10 p-2 text-emerald-400 border border-emerald-500/20">
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-100">{title}</h3>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 transition-colors group-hover:text-emerald-400" />
              </div>
              <p className="mt-0.5 text-xs text-slate-400">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Simple Footer */}
      <div className="relative z-10 mt-12 border-t border-slate-800/80 pt-6">
        <p className="text-xs text-slate-500">
          © 2026 UniMate AI. Tất cả quyền được bảo lưu.
        </p>
      </div>
    </aside>
  )
}