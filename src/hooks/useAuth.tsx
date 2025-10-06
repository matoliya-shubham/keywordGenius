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
        toast.error("Sign up failed", {
          icon: <CircleX />,
          description: data.error.message,
        });
      } else {
        toast.success("Sign up successful", {
          icon: <CheckCircle2 />,
          description: "Please check email to verify your account.",
        });
        queryClient.invalidateQueries({ queryKey: ["auth"] });
      }
    },
    onError: (error: Error) => {
      toast.error("Sign up failed", {
        icon: <CircleX />,
        description: error.message,
      });
    },
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: SignInCredentials) => authApi.signIn(credentials),
    onSuccess: (data) => {
      if (data.error) {
        toast.error("Sign in failed", {
          icon: <CircleX className="size-5" />,
          description: <p className="text-gray-600 ">{data.error.message}</p>,
          className: "flex gap-3",
          duration: 5000,
        });
      } else {
        toast.success("Sign in successful", {
          icon: <CheckCircle2 />,
          description: "You have successfully signed in.",
        });
        queryClient.invalidateQueries({ queryKey: ["auth"] });
      }
    },
    onError: (error: Error) => {
      toast.error("Sign in failed", {
        icon: <CircleX />,
        description: <p className="text-gray-600">{error.message}</p>,
      });
    },
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.signOut(),
    onSuccess: (data) => {
      if (data.error) {
        toast.error("Sign out failed", {
          icon: <CircleX />,
          description: data.error.message,
        });
      } else {
        toast.success("Sign out successful", {
          icon: <CheckCircle2 />,
          description: "You have been successfully signed out.",
        });
        queryClient.invalidateQueries({ queryKey: ["auth"] });
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
  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      const { user, error } = await authApi.getUser();
      if (error) throw error;
      return user;
    },
    retry: false,
  });
};
