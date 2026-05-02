import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { Field } from '../../../ui/components/Field';
import { Input } from '../../../ui/components/Input';
import { Textarea } from '../../../ui/components/Textarea';
import { Button } from '../../../ui/components/Button';
import { EmptyState } from '../../../ui/components/EmptyState';
import { Skeleton } from '../../../ui/components/Skeleton';
import { usePost } from '../hooks/usePost';
import { useCreatePost, useUpdatePost } from '../hooks/usePostMutations';
import { type PostDto } from '../../../api/jsonplaceholder';

type Props = {
  mode: 'create' | 'edit';
};

function usePostIdParam() {
  const params = useParams();
  const id = Number(params.postId);
  return Number.isFinite(id) ? id : NaN;
}

export function PostUpsertPage({ mode }: Props) {
  const navigate = useNavigate();
  const postId = usePostIdParam();
  const qc = useQueryClient();

  const shouldLoad = mode === 'edit';

  const postQuery = usePost(postId);
  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost(postId);

  const cachedPost =
    qc.getQueryData<PostDto>(['posts', postId]) ??
    qc.getQueryData<PostDto[]>(['posts'])?.find((p) => p.id === postId);

  const loadedPost = postQuery.data ?? cachedPost;

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const didInitRef = useRef(false);

  useEffect(() => {
    if (!shouldLoad) return;
    if (!loadedPost) return;
    if (didInitRef.current) return;

    setTitle(loadedPost.title);
    setBody(loadedPost.body);
    didInitRef.current = true;
  }, [shouldLoad, loadedPost]);

  const canSubmit = useMemo(() => {
    return title.trim().length >= 3 && body.trim().length >= 10;
  }, [title, body]);

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) return;

    if (mode === 'create') {
      const created = await createMutation.mutateAsync({
        userId: 1,
        title: title.trim(),
        body: body.trim(),
      });

      navigate(`/posts/${created.id}`);
      return;
    }

    await updateMutation.mutateAsync({
      title: title.trim(),
      body: body.trim(),
    });

    navigate(`/posts/${postId}`);
  };

  if (mode === 'edit' && !Number.isFinite(postId)) {
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

  if (mode === 'edit' && postQuery.isLoading && !loadedPost) {
    return (
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-soft">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="mt-6 h-10 w-full" />
        <Skeleton className="mt-4 h-32 w-full" />
        <Skeleton className="mt-6 h-10 w-40" />
      </div>
    );
  }

  if (mode === 'edit' && postQuery.isError && !loadedPost) {
    return (
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
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
      <div className="flex items-center gap-3 border-b border-[rgb(var(--border))] pb-6">
        <Link to={mode === 'create' ? '/' : `/posts/${postId}`}>
          <Button variant="ghost" className="text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]">
            <ArrowLeft className="size-4" />
            Retour
          </Button>
        </Link>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {mode === 'create' ? 'Rédiger un article' : 'Modifier l\'article'}
        </h1>
        <p className="text-sm text-[rgb(var(--muted))]">
          {mode === 'create'
            ? 'Partagez vos réflexions avec la communauté.'
            : 'Mettez à jour le contenu de votre article.'}
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-8"
      >
        <div className="space-y-6">
          <Field label="Titre de l'article" hint="Le titre doit être clair et concis (min. 3 caractères).">
            <Input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Un titre accrocheur..."
              className="text-lg font-medium h-12"
            />
          </Field>

          <Field label="Contenu" hint="Développez votre idée ici (min. 10 caractères).">
            <Textarea 
              value={body} 
              onChange={(e) => setBody(e.target.value)} 
              placeholder="Il était une fois..."
              className="min-h-[250px] text-base leading-relaxed"
            />
          </Field>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-[rgb(var(--border))]">
          <div className="text-sm font-medium text-[rgb(var(--muted))]">
            {canSubmit
              ? 'Prêt à être publié.'
              : 'Complétez les champs requis pour publier.'}
          </div>
          <Button type="submit" isLoading={isPending} disabled={!canSubmit}>
            <Save className="size-4" />
            {mode === 'create' ? 'Publier' : 'Enregistrer'}
          </Button>
        </div>
      </form>
    </div>
  );
}
