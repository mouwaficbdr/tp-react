import { type ReactNode } from 'react'
import { FileQuestion } from 'lucide-react'

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[rgb(var(--border))] p-12 text-center animate-fade-in">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 mb-4">
        <FileQuestion className="h-6 w-6 text-[rgb(var(--muted))]" />
      </div>
      <h3 className="text-sm font-semibold">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-[rgb(var(--muted))] max-w-sm">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
