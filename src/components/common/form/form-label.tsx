import type { LabelHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement>

export function FormLabel({
  className,
  ...props
}: FormLabelProps) {
  return (
    <label
      className={cn(
        'text-sm font-medium',
        className,
      )}
      {...props}
    />
  )
}