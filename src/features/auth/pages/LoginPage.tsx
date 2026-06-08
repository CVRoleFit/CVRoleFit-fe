import { LoginForm } from "@/features/auth/components/LoginForm";

export function LoginPage() {
  return (
    <div className="rounded-lg border bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
        Sign in to your account
      </h1>
      <LoginForm />
    </div>
  );
}
