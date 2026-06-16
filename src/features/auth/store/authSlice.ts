import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "@/features/auth/types";
import { AUTH_TOKEN_KEY } from "@/shared/constants";

const USER_KEY = "auth_user";

function loadStoredAuth(): AuthState {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userJson = localStorage.getItem(USER_KEY);
    const user = userJson ? (JSON.parse(userJson) as User) : null;
    return {
      user,
      token,
      isAuthenticated: !!token && !!user,
    };
  } catch {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
    };
  }
}

const initialState: AuthState = loadStoredAuth();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem(AUTH_TOKEN_KEY, action.payload.token);
      localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
