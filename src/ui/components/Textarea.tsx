import { type TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }

export function Textarea({ className, error, ...props }: Props) {
  return (
    <textarea
      {...props}
      className={cn(
        'flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-colors outline-none placeholder:text-[rgb(var(--muted))] focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] disabled:cursor-not-allowed disabled:opacity-50 resize-y',
        error ? 'border-red-500 focus-visible:ring-red-500/50' : 'border-[rgb(var(--border))]',
        className
      )}
    />
  )
}
