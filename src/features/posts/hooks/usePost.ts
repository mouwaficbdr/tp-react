import { useQuery, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '../../../api/jsonplaceholder';
import { type PostDto } from '../../../api/jsonplaceholder';

export function usePost(postId: number) {
  const qc = useQueryClient();

  const cachedById = qc.getQueryData<PostDto>(['posts', postId]);
  const cachedFromList = qc
    .getQueryData<PostDto[]>(['posts'])
    ?.find((p) => p.id === postId);
  const cached = cachedById ?? cachedFromList;

  const isRemoteId = postId > 0 && postId <= 100;

  return useQuery({
    queryKey: ['posts', postId],
    queryFn: () => postsApi.get(postId),
    initialData: cached,
    enabled: Number.isFinite(postId) && postId > 0 && isRemoteId && !cached,
  });
}
