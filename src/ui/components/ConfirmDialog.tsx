import { type ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'

type Props = {
  open: boolean
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
  children?: ReactNode
  pending?: boolean
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  danger = false,
  onConfirm,
  onCancel,
  pending = false,
}: Props) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-5"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel()
      }}
    >
      <div className="w-full max-w-lg rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-soft">
        <div className="flex items-start justify-between gap-3 border-b border-[rgb(var(--border))] px-5 py-4">
          <div className="space-y-1">
            <div className="text-sm font-semibold">{title}</div>
            {description ? (
              <div className="text-sm text-[rgb(var(--muted))]">{description}</div>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="grid size-9 place-items-center rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--card))]"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-4">
          <Button variant="ghost" type="button" onClick={onCancel} disabled={pending}>
            {cancelLabel}
          </Button>
          <Button
            variant={danger ? 'danger' : 'primary'}
            type="button"
            onClick={onConfirm}
            disabled={pending}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
