import { type ReactNode } from 'react'

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block space-y-2">
      <div className="space-y-1">
        <div className="text-sm font-medium">{label}</div>
        {hint ? <div className="text-xs text-[rgb(var(--muted))]">{hint}</div> : null}
      </div>
      {children}
    </label>
  )
}
