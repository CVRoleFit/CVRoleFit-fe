import type { LoginRequest, LoginResponse, SignupRequest } from "@/features/auth/types";
import type { User } from "@/features/auth/types";

// Mock users database
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  user: {
    password: "user",
    user: {
      id: "1",
      email: "user@example.com",
      name: "Demo User",
      role: "user",
    },
  },
  admin: {
    password: "admin",
    user: {
      id: "2",
      email: "admin@example.com",
      name: "Admin User",
      role: "admin",
    },
  },
};

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function generateToken(): string {
  return `mock-token-${Date.now()}-${Math.random().toString(36).substring(2)}`;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    await delay(500); // Simulate network delay

    const username = data.email.toLowerCase().trim();
    const mockUser = MOCK_USERS[username];

    if (!mockUser) {
      throw new Error("User not found. Try 'user' or 'admin' as username.");
    }

    if (mockUser.password !== data.password) {
      throw new Error("Invalid password. Password matches username for demo accounts.");
    }

    return {
      user: mockUser.user,
      token: generateToken(),
    };
  },

  signup: async (data: SignupRequest): Promise<LoginResponse> => {
    await delay(500);

    // For demo, just create a regular user
    const newUser: User = {
      id: `${Date.now()}`,
      email: data.email,
      name: data.name,
      role: "user",
    };

    return {
      user: newUser,
      token: generateToken(),
    };
  },

  googleLogin: async (_credential: string): Promise<LoginResponse> => {
    await delay(500);

    // For demo, create a user from "Google login"
    const googleUser: User = {
      id: `${Date.now()}`,
      email: "google.user@example.com",
      name: "Google User",
      role: "user",
    };

    return {
      user: googleUser,
      token: generateToken(),
    };
  },

  logout: async (): Promise<void> => {
    await delay(200);
    // No server-side action needed for mock
  },

  getProfile: async (): Promise<User> => {
    await delay(200);
    // Return mock user profile
    return {
      id: "1",
      email: "user@example.com",
      name: "Demo User",
      role: "user",
    };
  },
};
