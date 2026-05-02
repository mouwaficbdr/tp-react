import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../../../api/jsonplaceholder';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => usersApi.list(),
    staleTime: 1000 * 60 * 60, // 1 heure car les utilisateurs ne changent pas
  });
}
