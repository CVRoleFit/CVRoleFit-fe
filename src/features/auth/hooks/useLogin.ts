import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/features/auth/api/authApi";
import { useAppDispatch } from "@/shared/hooks";
import { setCredentials } from "@/features/auth/store/authSlice";
import type { LoginRequest } from "@/features/auth/types";

export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      dispatch(setCredentials({ user: response.user, token: response.token }));

      // Redirect based on role
      if (response.user.role === "admin") {
        navigate("/users", { replace: true });
      } else {
        navigate("/resume", { replace: true });
      }
    },
  });
}
