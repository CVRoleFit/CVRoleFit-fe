import api from "@/shared/api/axios";
import type { LoginRequest, LoginResponse } from "@/features/auth/types";
import { loginResponseSchema } from "@/features/auth/schemas";
import type { ApiResponse } from "@/shared/types";

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<ApiResponse<LoginResponse>>("/auth/login", data);
    return loginResponseSchema.parse(response.data.data);
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  getProfile: async (): Promise<LoginResponse["user"]> => {
    const response = await api.get<ApiResponse<LoginResponse["user"]>>("/auth/profile");
    return response.data.data;
  },
};
