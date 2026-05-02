import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../ui/components/Button';
import { Skeleton } from '../../../ui/components/Skeleton';
import { EmptyState } from '../../../ui/components/EmptyState';
import { ConfirmDialog } from '../../../ui/components/ConfirmDialog';
import { usePost } from '../hooks/usePost';
import { usePostComments } from '../hooks/usePostComments';
import { useDeletePost } from '../hooks/usePostMutations';

function usePostIdParam() {
  const params = useParams();
  const id = Number(params.postId);
  return Number.isFinite(id) ? id : NaN;
}

export function PostDetailPage() {
  const navigate = useNavigate();
  const postId = usePostIdParam();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const postQuery = usePost(postId);
  const commentsQuery = usePostComments(postId);
  const deleteMutation = useDeletePost();

  const onDelete = async () => {
    if (!Number.isFinite(postId)) return;
    await deleteMutation.mutateAsync(postId);
    navigate('/');
  };

  if (!Number.isFinite(postId)) {
    return (
      <EmptyState
        title="Paramètre invalide"
        description="L'identifiant du post est incorrect."
        action={
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="size-4" />
              Retour
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-12 animate-fade-in mx-auto max-w-3xl">
      <ConfirmDialog
        open={deleteOpen}
        title="Supprimer ce post ?"
        description="La suppression est simulée. Le post sera masqué durant ta session."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        danger
        pending={deleteMutation.isPending}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={async () => {
          setDeleteOpen(false);
          await onDelete();
        }}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[rgb(var(--border))] pb-6">
        <Link to="/">
          <Button variant="ghost" className="text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]">
            <ArrowLeft className="size-4" />
            Retour aux posts
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Link to={`/posts/${postId}/edit`}>
            <Button variant="ghost">
              <Pencil className="size-4" />
              Modifier
            </Button>
          </Link>
          <Button
            variant="danger"
            onClick={() => setDeleteOpen(true)}
            isLoading={deleteMutation.isPending}
          >
            <Trash2 className="size-4" />
            Supprimer
          </Button>
        </div>
      </div>

      {postQuery.isError ? (
        <EmptyState
          title="Impossible de charger le post"
          description={
            postQuery.error instanceof Error
              ? postQuery.error.message
              : 'Erreur réseau'
          }
          action={
            <Button variant="ghost" onClick={() => postQuery.refetch()}>
              Réessayer
            </Button>
          }
        />
      ) : null}

      {postQuery.isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-10 w-4/5" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ) : postQuery.data ? (
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold tracking-tight text-[rgb(var(--fg))] mb-8">
            {postQuery.data.title}
          </h1>
          <p className="text-lg leading-relaxed text-[rgb(var(--muted))] whitespace-pre-wrap">
            {postQuery.data.body}
          </p>
        </article>
      ) : null}

      <div className="h-px w-full bg-[rgb(var(--border))] my-12" />

      <section className="space-y-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Commentaires</h2>
          <div className="text-sm font-medium text-[rgb(var(--muted))] bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full">
            {commentsQuery.isLoading
              ? '…'
              : `${commentsQuery.data?.length ?? 0}`}
          </div>
        </div>

        {commentsQuery.isError ? (
          <EmptyState
            title="Impossible de charger les commentaires"
            description={
              commentsQuery.error instanceof Error
                ? commentsQuery.error.message
                : 'Erreur réseau'
            }
            action={
              <Button variant="ghost" onClick={() => commentsQuery.refetch()}>
                Réessayer
              </Button>
            }
          />
        ) : commentsQuery.isLoading ? (
          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-[rgb(var(--border))] p-6">
                <Skeleton className="h-4 w-1/4 mb-4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : commentsQuery.data && commentsQuery.data.length > 0 ? (
          <div className="grid gap-4">
            {commentsQuery.data.map((c) => (
              <article
                key={c.id}
                className="rounded-2xl border border-[rgb(var(--border))] bg-transparent p-6 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="text-sm font-semibold text-[rgb(var(--fg))]">{c.name}</div>
                  <div className="text-xs text-[rgb(var(--muted))]">{c.email}</div>
                </div>
                <p className="whitespace-pre-line text-sm leading-relaxed text-[rgb(var(--muted))]">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Aucun commentaire"
            description="Soyez le premier à réagir à cet article."
          />
        )}
      </section>
    </div>
  );
}
