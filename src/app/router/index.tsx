import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "@/app/layouts/MainLayout";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { LoginPage, SignupPage } from "@/features/auth";
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

const ResumeUploadPage = lazy(() =>
  import("@/features/resume/pages/ResumeUploadPage").then((m) => ({
    default: m.ResumeUploadPage,
  })),
);

const CVBuilderPage = lazy(() =>
  import("@/features/cv/pages/CVBuilderPage").then((m) => ({
    default: m.CVBuilderPage,
  })),
);

export const router = createBrowserRouter([
  // Auth pages - full page, no header/footer
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  // Main app with header/footer
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
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
      {
        path: "/resume",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ResumeUploadPage />
          </Suspense>
        ),
      },
      {
        path: "/cv-builder",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CVBuilderPage />
          </Suspense>
        ),
      },
      { path: "/404", element: <NotFoundPage /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
]);
