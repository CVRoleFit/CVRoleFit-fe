import { Link } from "react-router-dom";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { useGoogleLogin } from "@/features/auth/hooks";
import { Button } from "@/shared/components";
import { ThemeToggle } from "@/shared/components";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: object) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export function LoginPage() {
  const googleLoginMutation = useGoogleLogin();

  const handleGoogleLogin = () => {
    // In production, initialize Google Identity Services
    // For now, simulate the flow
    googleLoginMutation.mutate("mock-google-credential");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image/Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Build Your AI-Powered Resume
            </h1>
            <p className="text-lg text-blue-100 max-w-md">
              Create professional resumes that stand out. Our AI helps you highlight your skills,
              projects, and achievements in the best possible way.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>AI-Assisted Writing</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Professional Templates</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>ATS Analysis</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Export to PDF</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-32 translate-y-32" />
        <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full -translate-x-24 -translate-y-24" />
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <span aria-hidden="true">←</span> Back to home
          </Link>
          <ThemeToggle />
        </div>

        {/* Form container */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to continue building your resume
              </p>
            </div>

            {/* Demo Credentials Info */}
            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Demo Credentials</p>
              <div className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
                <p><strong>User:</strong> username: <code className="bg-blue-100 dark:bg-blue-900/50 px-1 rounded">user</code> / password: <code className="bg-blue-100 dark:bg-blue-900/50 px-1 rounded">user</code></p>
                <p><strong>Admin:</strong> username: <code className="bg-blue-100 dark:bg-blue-900/50 px-1 rounded">admin</code> / password: <code className="bg-blue-100 dark:bg-blue-900/50 px-1 rounded">admin</code></p>
              </div>
            </div>

            {/* Google Sign In Button */}
            <Button
              type="button"
              variant="secondary"
              className="w-full mb-6 gap-3"
              onClick={handleGoogleLogin}
              disabled={googleLoginMutation.isPending}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.42.35-2.09V7.27H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.73l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.27l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {googleLoginMutation.isPending ? "Signing in..." : "Continue with Google"}
            </Button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-50 dark:bg-gray-950 px-4 text-gray-500 dark:text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Login Form */}
            <LoginForm />

            {/* Sign up link */}
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
