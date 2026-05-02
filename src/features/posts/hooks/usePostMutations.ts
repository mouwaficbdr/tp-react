import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  postsApi,
  type CreatePostDto,
  type PostDto,
  type UpdatePostDto,
} from '../../../api/jsonplaceholder';

function nowId() {
  return Math.floor(Date.now() / 1000);
}

export function useCreatePost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePostDto) => {
      const created = await postsApi.create(data);
      const local: PostDto = { ...created, id: nowId() };
      return local;
    },
    onSuccess: (created) => {
      qc.setQueryData<PostDto[]>(['localPosts'], (prev) => {
        const list = prev ?? [];
        return [created, ...list];
      });

      qc.setQueryData<PostDto[]>(['posts'], (prev) => {
        const list = prev ?? [];
        return [created, ...list];
      });

      qc.setQueryData<PostDto>(['posts', created.id], created);
      toast.success('Article créé avec succès');
    },
    onError: () => {
      toast.error('Erreur lors de la création de l\'article');
    }
  });
}

export function useUpdatePost(postId: number) {
  const qc = useQueryClient();
  const isRemoteId = postId > 0 && postId <= 100;

  return useMutation({
    mutationFn: async (data: UpdatePostDto) => {
      if (!isRemoteId) {
        const existing =
          qc.getQueryData<PostDto>(['posts', postId]) ??
          qc.getQueryData<PostDto[]>(['posts'])?.find((p) => p.id === postId);

        if (!existing) throw new Error('Post introuvable');
        return { ...existing, ...data } as PostDto;
      }

      return postsApi.update(postId, data);
    },
    onSuccess: (updated) => {
      qc.setQueryData<PostDto>(['posts', postId], updated);

      qc.setQueryData<PostDto[]>(['localPosts'], (prev) => {
        const list = prev ?? [];
        return list.map((p) => (p.id === postId ? { ...p, ...updated } : p));
      });

      qc.setQueryData<PostDto[]>(['posts'], (prev) => {
        const list = prev ?? [];
        return list.map((p) => (p.id === postId ? { ...p, ...updated } : p));
      });
      
      toast.success('Article mis à jour avec succès');
    },
    onError: () => {
      toast.error('Erreur lors de la mise à jour de l\'article');
    }
  });
}

export function useDeletePost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (postId: number) => {
      const isRemoteId = postId > 0 && postId <= 100;
      if (!isRemoteId) return {};
      return postsApi.remove(postId);
    },
    onMutate: async (postId) => {
      await qc.cancelQueries({ queryKey: ['posts'] });

      const prev = qc.getQueryData<PostDto[]>(['posts']);

      qc.setQueryData<number[]>(['deletedPostIds'], (ids) => {
        const prevIds = ids ?? [];
        if (prevIds.includes(postId)) return prevIds;
        return [postId, ...prevIds];
      });

      qc.setQueryData<PostDto[]>(['localPosts'], (list) =>
        (list ?? []).filter((p) => p.id !== postId),
      );

      qc.setQueryData<PostDto[]>(['posts'], (list) =>
        (list ?? []).filter((p) => p.id !== postId),
      );
      qc.removeQueries({ queryKey: ['posts', postId], exact: true });

      return { prev };
    },
    onSuccess: () => {
      toast.success('Article supprimé avec succès');
    },
    onError: (_err, _postId, ctx) => {
      if (ctx?.prev) qc.setQueryData(['posts'], ctx.prev);
      toast.error('Erreur lors de la suppression de l\'article');
    },
  });
}
