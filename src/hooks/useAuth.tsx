import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  authApi,
  type SignUpCredentials,
  type SignInCredentials,
} from "@/api/auth";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import { CheckCircle2, CircleX } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  // Set up auth state listener
  useEffect(() => {
    // Subscribe to auth changes
    const subscription = authApi.onAuthStateChange((session) => {
      setSession(session);
    });

    // Get initial session
    authApi.getSession().then(({ session }) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    userId: session?.user?.id,
    session,
    user: session?.user ?? null,
    isAuthenticated: !!session,
  };
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials: SignUpCredentials) => authApi.signUp(credentials),
    onSuccess: (data) => {
      if (data.error) {
        toast.error(
          <p className="text-gray-700 text-md font-semibold">Sign up failed</p>,
          {
            icon: <CircleX className="size-5" stroke="red" strokeWidth={2} />,
            description: <p className="text-gray-600 ">{data.error.message}</p>,
          }
        );
      } else {
        toast.success(
          <p className="text-gray-700 text-md font-semibold">
            Sign in successful
          </p>,
          {
            icon: (
              <CheckCircle2 className="size-5" stroke="green" strokeWidth={2} />
            ),
            description: (
              <p className="text-gray-600 ">You have successfully signed in.</p>
            ),
          }
        );
        queryClient.invalidateQueries({ queryKey: ["auth"] });
      }
    },
    onError: (error: Error) => {
      toast.error(
        <p className="text-gray-700 text-md font-semibold">Sign up failed</p>,
        {
          icon: <CircleX className="size-5" stroke="red" strokeWidth={2} />,
          description: <p className="text-gray-600 ">{error.message}</p>,
        }
      );
    },
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: SignInCredentials) => authApi.signIn(credentials),
    onSuccess: (data) => {
      if (data.error) {
        toast.error(
          <p className="text-gray-700 text-md font-semibold">Sign in failed</p>,
          {
            icon: <CircleX className="size-5" stroke="red" strokeWidth={2} />,
            description: <p className="text-gray-600 ">{data.error.message}</p>,
          }
        );
      } else {
        toast.success(
          <p className="text-gray-700 text-md font-semibold">
            Sign in successful
          </p>,
          {
            icon: (
              <CheckCircle2 className="size-5" stroke="green" strokeWidth={2} />
            ),
            description: (
              <p className="text-gray-600 ">You have successfully signed in.</p>
            ),
          }
        );
        queryClient.invalidateQueries({ queryKey: ["auth"] });
      }
    },
    onError: (error: Error) => {
      toast.error("Sign in failed", {
        icon: <CircleX />,
        description: <p className="text-gray-600">{error.message}</p>,
        className: "flex gap-3",
      });
    },
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authApi.signOut(),
    onSuccess: (data) => {
      if (data.error) {
        toast.error(
          <p className="text-gray-700 text-md font-semibold">
            Sign out failed
          </p>,
          {
            icon: <CircleX className="size-5" stroke="red" strokeWidth={2} />,
            description: <p className="text-gray-600 ">{data.error.message}</p>,
          }
        );
      } else {
        toast.success(
          <p className="text-gray-700 text-md font-semibold">
            Sign out successful
          </p>,
          {
            icon: (
              <CheckCircle2 className="size-5" stroke="green" strokeWidth={2} />
            ),
            description: (
              <p className="text-gray-600 ">
                You have successfully signed out.
              </p>
            ),
          }
        );
        queryClient.invalidateQueries({ queryKey: ["auth"] });
        navigate({ to: "/" });
      }
    },
    onError: (error: Error) => {
      toast.error("Sign out failed", {
        icon: <CircleX />,
        description: error.message,
      });
    },
  });
};

// Query hook for getting current user
export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      const { user, error } = await authApi.getUser();
      if (error) throw error;
      return user;
    },
    retry: false,
  });
  return {
    ...query,
    user: query.data,
    isAuthenticated: query.data?.role === "authenticated",
    userId: query.data?.id,
  };
};
