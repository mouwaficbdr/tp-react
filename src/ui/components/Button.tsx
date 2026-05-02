import { type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import { Loader2 } from 'lucide-react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger'
  isLoading?: boolean
}

export function Button({ className, variant = 'primary', isLoading, children, disabled, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]',
        variant === 'primary' &&
          'bg-[rgb(var(--fg))] text-[rgb(var(--bg))] hover:opacity-90 shadow-sm',
        variant === 'ghost' &&
          'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[rgb(var(--fg))]',
        variant === 'danger' &&
          'bg-red-600 text-white hover:bg-red-700 shadow-sm',
        className
      )}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
}
