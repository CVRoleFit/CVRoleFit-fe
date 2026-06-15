import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormData } from "@/features/auth/schemas";
import { useSignup } from "@/features/auth/hooks";
import { Button, Input } from "@/shared/components";

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const signupMutation = useSignup();

  const onSubmit = (data: SignupFormData) => {
    signupMutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        id="name"
        type="text"
        label="Full Name"
        placeholder="John Doe"
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        id="email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="Create a strong password"
        error={errors.password?.message}
        {...register("password")}
      />

      <Input
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Confirm your password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      {signupMutation.error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {signupMutation.error.message || "Signup failed. Please try again."}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={signupMutation.isPending}>
        {signupMutation.isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
