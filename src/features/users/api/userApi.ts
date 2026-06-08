import api from "@/shared/api/axios";
import type { User } from "@/features/users/types";
import type { ApiResponse, PaginatedResponse } from "@/shared/types";
import { userSchema } from "@/features/users/schemas";
import type { CreateUserFormData } from "@/features/users/schemas";

export const userApi = {
  getUsers: async (params?: { page?: number; limit?: number }): Promise<PaginatedResponse<User>> => {
    const response = await api.get<ApiResponse<PaginatedResponse<User>>>("/users", { params });
    return response.data.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    return userSchema.parse(response.data.data);
  },

  createUser: async (data: CreateUserFormData): Promise<User> => {
    const response = await api.post<ApiResponse<User>>("/users", data);
    return userSchema.parse(response.data.data);
  },

  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
