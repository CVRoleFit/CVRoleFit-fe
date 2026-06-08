import { Link } from "react-router-dom";
import { Button } from "@/shared/components";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-lg text-gray-600">Page not found.</p>
      <Link to="/" className="mt-8">
        <Button variant="secondary">Back to home</Button>
      </Link>
    </div>
  );
}
