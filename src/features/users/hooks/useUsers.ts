import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/features/users/api/userApi";
import { QUERY_KEYS } from "@/shared/constants";

export function useUsers(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: [...QUERY_KEYS.users, params],
    queryFn: () => userApi.getUsers(params),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.users, id],
    queryFn: () => userApi.getUserById(id),
    enabled: !!id,
  });
}
