import { type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type Props = InputHTMLAttributes<HTMLInputElement> & { error?: boolean }

export function Input({ className, error, ...props }: Props) {
  return (
    <input
      {...props}
      className={cn(
        'flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-colors outline-none placeholder:text-[rgb(var(--muted))] focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] disabled:cursor-not-allowed disabled:opacity-50',
        error ? 'border-red-500 focus-visible:ring-red-500/50' : 'border-[rgb(var(--border))]',
        className
      )}
    />
  )
}
