import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/features/users/api/userApi";
import { queryClient } from "@/shared/api/queryClient";
import { QUERY_KEYS } from "@/shared/constants";
import type { CreateUserFormData } from "@/features/users/schemas";

export function useCreateUser() {
  return useMutation({
    mutationFn: (data: CreateUserFormData) => userApi.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...QUERY_KEYS.users] });
    },
  });
}
