export const API_URL = import.meta.env.VITE_API_URL as string;

export const AUTH_TOKEN_KEY = "auth_token";

export const QUERY_KEYS = {
  users: ["users"] as const,
  currentUser: ["currentUser"] as const,
} as const;
