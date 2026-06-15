import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/features/auth/api/authApi";
import { useAppDispatch } from "@/shared/hooks";
import { setCredentials } from "@/features/auth/store/authSlice";

export function useGoogleLogin() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (credential: string) => authApi.googleLogin(credential),
    onSuccess: (response) => {
      dispatch(setCredentials({ user: response.user, token: response.token }));
    },
  });
}
