import { ExternalLink } from 'lucide-react'

export function AboutPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">À propos</h1>
        <p className="text-sm text-[rgb(var(--muted))]">
          Mini application React construite pour démontrer routing, data-fetching, gestion des états
          (loading/erreur/empty), composants réutilisables et CRUD simulé.
        </p>
      </div>

      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 shadow-soft">
        <div className="text-sm font-medium">API</div>
        <a
          className="mt-2 inline-flex items-center gap-2 text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]"
          href="https://jsonplaceholder.typicode.com"
          target="_blank"
          rel="noreferrer"
        >
          https://jsonplaceholder.typicode.com
          <ExternalLink className="size-4" />
        </a>
      </div>
    </div>
  )
}
