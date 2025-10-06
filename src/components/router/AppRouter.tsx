import { useAuth } from "@/hooks/useAuth";
import { router } from "@/lib/tanstack-router";
import { RouterProvider } from "@tanstack/react-router";
import { useEffect } from "react";

export default function AppRouter() {
  const auth = useAuth();

  useEffect(() => {
    router.update({
      context: { auth },
    });
  }, [auth]);

  return <RouterProvider router={router} />;
}
