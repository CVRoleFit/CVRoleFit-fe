import { z } from "zod/v4";

export const loginSchema = z.object({
  email: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.enum(["admin", "user"]),
});

export const loginResponseSchema = z.object({
  user: userSchema,
  token: z.string(),
});
