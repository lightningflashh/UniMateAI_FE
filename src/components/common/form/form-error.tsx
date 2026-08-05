import { cn } from '@/lib/utils'

interface FormErrorProps {
  children?: React.ReactNode

  className?: string
}

export function FormError({
  children,
  className,
}: FormErrorProps) {
  if (!children) {
    return null
  }

  return (
    <p
      className={cn(
        'text-sm text-destructive',
        className,
      )}
    >
      {children}
    </p>
  )
}