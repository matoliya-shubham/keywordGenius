import { useAuth } from "@/hooks/useAuth";
import { router } from "@/lib/tanstack-router";
import { RouterProvider } from "@tanstack/react-router";
import { Spinner } from "../Spinner";

export default function AppRouter() {
  const auth = useAuth();
  if (auth.loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return <RouterProvider router={router} context={{ auth }} />;
}
