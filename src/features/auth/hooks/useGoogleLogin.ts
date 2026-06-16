import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/features/auth/api/authApi";
import { useAppDispatch } from "@/shared/hooks";
import { setCredentials } from "@/features/auth/store/authSlice";

export function useGoogleLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credential: string) => authApi.googleLogin(credential),
    onSuccess: (response) => {
      dispatch(setCredentials({ user: response.user, token: response.token }));
      // Google login always creates a regular user, redirect to resume
      navigate("/resume", { replace: true });
    },
  });
}
