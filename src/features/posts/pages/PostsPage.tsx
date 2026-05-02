import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { useDebouncedValue } from '../../../lib/useDebouncedValue';
import { usePosts } from '../hooks/usePosts';
import { Input } from '../../../ui/components/Input';
import { Skeleton } from '../../../ui/components/Skeleton';
import { EmptyState } from '../../../ui/components/EmptyState';
import { PostCard } from '../components/PostCard';
import { Button } from '../../../ui/components/Button';

export function PostsPage() {
  const [q, setQ] = useState('');
  const debounced = useDebouncedValue(q, 200);

  const { posts, isLoading, isError, error, refetch } = usePosts({
    q: debounced,
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight">Articles récents</h1>
          <p className="text-sm text-[rgb(var(--muted))]">
            Explorez les pensées et les histoires de notre communauté.
          </p>
        </div>

        <Link to="/posts/new">
          <Button>
            <Plus className="size-4" />
            Nouveau post
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[rgb(var(--muted))]" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher par titre ou contenu…"
            className="pl-9 h-11 bg-neutral-50/50 dark:bg-neutral-900/50"
          />
        </div>
        <div className="shrink-0 text-sm font-medium text-[rgb(var(--muted))]">
          {isLoading ? 'Recherche…' : `${posts.length} post${posts.length > 1 ? 's' : ''}`}
        </div>
      </div>

      {isError ? (
        <EmptyState
          title="Impossible de charger les posts"
          description={error instanceof Error ? error.message : 'Erreur réseau'}
          action={
            <Button variant="ghost" onClick={() => refetch()}>
              Réessayer
            </Button>
          }
        />
      ) : null}

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-2xl border border-[rgb(var(--border))] p-6"
            >
              <div>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="mt-4 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-5/6" />
              </div>
              <Skeleton className="mt-6 h-4 w-24" />
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <EmptyState
          title="Aucun article trouvé"
          description={
            q ? 'Essayez des termes de recherche différents.' : 'Soyez le premier à partager une histoire !'
          }
          action={
            <Link to="/posts/new">
              <Button>
                <Plus className="size-4" />
                Créer le premier
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
