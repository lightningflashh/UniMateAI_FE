import { FormError } from '@/components/common/form/form-error'
import { FormLabel } from '@/components/common/form/form-label'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  label: string

  htmlFor?: string

  error?: string

  required?: boolean

  className?: string

  children: React.ReactNode
}

export function FormField({
  label,
  htmlFor,
  error,
  required,
  className,
  children,
}: FormFieldProps) {
  return (
    <div
      className={cn(
        'space-y-2',
        className,
      )}
    >
      <FormLabel htmlFor={htmlFor}>
        {label}

        {required && (
          <span className="ml-1 text-destructive">
            *
          </span>
        )}
      </FormLabel>

      {children}

      <FormError>{error}</FormError>
    </div>
  )
}