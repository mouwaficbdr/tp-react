import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Page introuvable</h1>
      <p className="text-sm text-[rgb(var(--muted))]">La page demandée n’existe pas.</p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 py-2 text-sm font-medium shadow-soft"
      >
        Retour aux posts
      </Link>
    </div>
  )
}
