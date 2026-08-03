import Link from 'next/link'

export function AppLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 px-2"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        U
      </div>

      <div>
        <p className="font-semibold">
          UniMateAI
        </p>

        <p className="text-muted-foreground text-xs">
          Admin Panel
        </p>
      </div>
    </Link>
  )
}