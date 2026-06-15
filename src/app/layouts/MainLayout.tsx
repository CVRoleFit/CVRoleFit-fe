import { Outlet } from "react-router-dom";
import { Header, Footer } from "@/shared/components";

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
