'use client'

import { useRouter } from 'next/navigation'
import {
  Brain,
  FileText,
  GraduationCap,
  MessageSquare,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react'

const registerBenefits = [
  {
    icon: FileText,
    title: 'Phân tích hồ sơ tự động',
    desc: 'Tải lên học bạ & chứng chỉ để nhận đánh giá chi tiết',
  },
  {
    icon: GraduationCap,
    title: 'Dự đoán tỷ lệ trúng tuyển',
    desc: 'So sánh điểm số với điểm chuẩn 200+ trường Đại học',
  },
  {
    icon: Brain,
    title: 'Lộ trình tối ưu cá nhân',
    desc: 'Gợi ý các nguyện vọng an toàn & phù hợp nhất',
  },
  {
    icon: MessageSquare,
    title: 'Trợ lý AI đồng hành 24/7',
    desc: 'Giải đáp quy chế tuyển sinh & thắc mắc học phí',
  },
]

export function RegisterBanner() {
  const router = useRouter()

  return (
    <aside className="relative hidden w-full flex-col justify-between bg-[#0B1528] p-12 text-white lg:flex xl:p-16">
      {/* Nút chuyển sang Login */}
      <div className="absolute -left-5 top-1/2 z-30 -translate-y-1/2">
        <button
          onClick={() => router.push('/login')}
          title="Đã có tài khoản? Chuyển sang Đăng nhập"
          type="button"
          className="group flex h-10 items-center gap-2 rounded-full border border-slate-800 bg-[#0B1528] px-3.5 py-2 text-xs font-medium text-slate-300 shadow-2xl transition-all duration-300 hover:scale-105 hover:border-emerald-500 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 text-emerald-400 transition-transform group-hover:-translate-x-1" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs">
            Đăng nhập
          </span>
        </button>
      </div>

      {/* Brand Header & Free Tag */}
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-[#0B1528] shadow-md shadow-emerald-500/20">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              UniMate AI
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Tạo tài khoản miễn phí</span>
          </div>
        </div>

        {/* Hero Text */}
        <div className="mt-14 xl:mt-16">
          <h1 className="text-4xl font-semibold tracking-tight text-white xl:text-5xl xl:leading-tight">
            Bắt đầu hành trình <br />
            <span className="text-emerald-400">chinh phục đại học mơ ước.</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">
            Đăng ký ngay hôm nay để trải nghiệm công nghệ AI hỗ trợ chọn trường, phân tích học bạ và tối ưu cơ hội trúng tuyển.
          </p>
        </div>
      </div>

      {/* Benefits List */}
      <div className="relative z-10 mt-10 space-y-3">
        {registerBenefits.map(({ icon: Icon, title, desc }) => (
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

      {/* Social Proof / Footer */}
      <div className="relative z-10 mt-10 border-t border-slate-800/80 pt-6">
        <div className="flex items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Không cần thẻ tín dụng</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Thiết lập trong 1 phút</span>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          © 2026 UniMate AI. Tất cả quyền được bảo lưu.
        </p>
      </div>
    </aside>
  )
}