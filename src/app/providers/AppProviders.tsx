import { type ReactNode } from "react";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { store } from "@/app/store";
import { queryClient } from "@/shared/api/queryClient";
import { router } from "@/app/router";

export function AppProviders({ children }: { children?: ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children ?? <RouterProvider router={router} />}
      </QueryClientProvider>
    </Provider>
  );
}
