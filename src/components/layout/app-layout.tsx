import type { PropsWithChildren } from 'react'

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r">Sidebar</aside>

      <main className="flex flex-1 flex-col">
        <header className="h-16 border-b">Header</header>

        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  )
}