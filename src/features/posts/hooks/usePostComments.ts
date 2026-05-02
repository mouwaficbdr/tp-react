import { useQuery } from '@tanstack/react-query';
import { commentsApi } from '../../../api/jsonplaceholder';

export function usePostComments(postId: number) {
  const isRemoteId = postId > 0 && postId <= 100;

  return useQuery({
    queryKey: ['posts', postId, 'comments'],
    queryFn: () => commentsApi.listByPost(postId),
    initialData: [],
    enabled: Number.isFinite(postId) && postId > 0 && isRemoteId,
  });
}
