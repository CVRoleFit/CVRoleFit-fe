import { Link } from "react-router-dom";
import { Button } from "@/shared/components";

export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        React Enterprise Boilerplate
      </h1>
      <p className="mt-4 max-w-xl text-lg text-gray-600">
        A production-ready React 19 + TypeScript + Vite boilerplate with feature-based
        architecture, Redux Toolkit, React Query, and Tailwind CSS.
      </p>
      <div className="mt-8 flex gap-4">
        <Link to="/login">
          <Button size="lg">Sign in</Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="secondary" size="lg">
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
