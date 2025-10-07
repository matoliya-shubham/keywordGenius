import { createRouter } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import type { Session, User } from "@supabase/supabase-js";

export type AuthContextType = {
  session: Session | null;
  user: User | null;
  isAuthenticated: boolean;
};
export const router = createRouter({
  routeTree,
  scrollRestoration: true,
  context: { auth: undefined as unknown as AuthContextType },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
