import type { Metadata } from 'next'
import {
  Geist,
  Geist_Mono,
  Roboto,
} from 'next/font/google'

import '@/app/globals.css'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { AuthProvider } from '@/providers/auth-provider'
import { QueryProvider } from '@/providers/query-provider'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'UniMateAI',
  description: 'University Admission Advisor',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        roboto.variable,
        geistSans.variable,
        geistMono.variable,
      )}
    >
      <body className="min-h-screen font-sans"> {/* Thêm font-sans ở đây */}
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster richColors />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}