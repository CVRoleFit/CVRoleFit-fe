import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/features/auth/api/authApi";
import { useAppDispatch } from "@/shared/hooks";
import { setCredentials } from "@/features/auth/store/authSlice";
import type { LoginRequest } from "@/features/auth/types";

export function useLogin() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      dispatch(setCredentials({ user: response.user, token: response.token }));
    },
  });
}
