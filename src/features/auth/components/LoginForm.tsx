import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/features/auth/schemas";
import { useLogin } from "@/features/auth/hooks";
import { Button, Input } from "@/shared/components";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        id="email"
        type="text"
        label="Username"
        placeholder="user or admin"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
        </label>
        <button type="button" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
          Forgot password?
        </button>
      </div>

      {loginMutation.error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {loginMutation.error.message || "Login failed. Please try again."}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
