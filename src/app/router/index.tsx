import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "@/app/layouts/MainLayout";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "@/shared/components";

const DashboardPage = lazy(() =>
  import("@/features/auth/pages/DashboardPage").then((m) => ({
    default: m.DashboardPage,
  })),
);

const UsersPage = lazy(() =>
  import("@/features/users/pages/UsersPage").then((m) => ({
    default: m.UsersPage,
  })),
);

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        element: <AuthLayout />,
        children: [{ path: "/login", element: <LoginPage /> }],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <DashboardPage />
              </Suspense>
            ),
          },
          {
            path: "/users",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <UsersPage />
              </Suspense>
            ),
          },
        ],
      },
      { path: "/404", element: <NotFoundPage /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
]);
