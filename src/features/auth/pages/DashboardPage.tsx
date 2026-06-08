import { useAppSelector } from "@/shared/hooks";
import { useLogout } from "@/features/auth/hooks";
import { Button } from "@/shared/components";
import { useNavigate } from "react-router-dom";

export function DashboardPage() {
  const user = useAppSelector((state) => state.auth.user);
  const logoutMutation = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSettled: () => navigate("/login"),
    });
  };

  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Button variant="ghost" onClick={handleLogout}>
          Sign out
        </Button>
      </div>
      <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
        <p className="text-gray-600">
          Welcome back, <span className="font-semibold text-gray-900">{user?.name}</span>
        </p>
        <p className="mt-2 text-sm text-gray-500">Role: {user?.role}</p>
      </div>
    </div>
  );
}
