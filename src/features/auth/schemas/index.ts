import { z } from "zod/v4";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const userSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string(),
  role: z.enum(["admin", "user"]),
});

export const loginResponseSchema = z.object({
  user: userSchema,
  token: z.string(),
});
