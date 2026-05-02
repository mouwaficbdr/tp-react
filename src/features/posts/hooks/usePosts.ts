import { useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { postsApi, type PostDto } from '../../../api/jsonplaceholder';

export type PostsFilters = {
  q: string;
};

export function usePosts(filters: PostsFilters) {
  const qc = useQueryClient();
  const [shuffleMap] = useState(() => new Map<number, number>());

  const query = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const remote = await postsApi.list();
      const local = qc.getQueryData<PostDto[]>(['localPosts']) ?? [];
      const deletedIds = new Set(
        qc.getQueryData<number[]>(['deletedPostIds']) ?? [],
      );

      const seen = new Set<number>();
      const merged: PostDto[] = [];

      for (const p of [...local, ...remote]) {
        if (deletedIds.has(p.id)) continue;
        if (seen.has(p.id)) continue;
        seen.add(p.id);
        merged.push(p);
      }

      return merged;
    },
    initialData: () => {
      const local = qc.getQueryData<PostDto[]>(['localPosts']);
      return local?.length ? local : undefined;
    },
    refetchOnWindowFocus: false, // Évite de re-mélanger juste en changeant d'onglet
  });

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    const list = query.data ?? [];

    let result = list;
    if (q) {
      result = list.filter((p) => {
        return (
          p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q)
        );
      });
    }

    const getSortVal = (id: number) => {
      // Les posts locaux fraîchement créés (id massif) restent tout en haut
      if (id > 1000) return -id; 
      
      if (!shuffleMap.has(id)) {
        shuffleMap.set(id, Math.random());
      }
      return shuffleMap.get(id)!;
    };

    return [...result].sort((a, b) => getSortVal(a.id) - getSortVal(b.id));
  }, [filters.q, query.data, shuffleMap]);

  return {
    ...query,
    posts: filtered satisfies PostDto[],
  };
}
