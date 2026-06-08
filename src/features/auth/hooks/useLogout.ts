import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/features/auth/api/authApi";
import { useAppDispatch } from "@/shared/hooks";
import { logout } from "@/features/auth/store/authSlice";
import { queryClient } from "@/shared/api/queryClient";

export function useLogout() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      dispatch(logout());
      queryClient.clear();
    },
    onMutate: () => {
      dispatch(logout());
      queryClient.clear();
    },
  });
}
