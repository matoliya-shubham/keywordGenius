import { supabase } from "../supabase-client";
import type { User, Session } from "@supabase/supabase-js";

export interface SignUpCredentials {
  email: string;
  password: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: Error | null;
}

// Auth API - all Supabase logic isolated here
export const authApi = {
  // Sign up new user
  signUp: async ({
    email,
    password,
  }: SignUpCredentials): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      return {
        user: data.user,
        session: data.session,
        error: error ? new Error(error.message) : null,
      };
    } catch (error) {
      return {
        user: null,
        session: null,
        error: error instanceof Error ? error : new Error("Unknown error"),
      };
    }
  },

  // Sign in existing user
  signIn: async ({
    email,
    password,
  }: SignInCredentials): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return {
        user: data.user,
        session: data.session,
        error: error ? new Error(error.message) : null,
      };
    } catch (error) {
      return {
        user: null,
        session: null,
        error: error instanceof Error ? error : new Error("Unknown error"),
      };
    }
  },

  // Sign out
  signOut: async (): Promise<{ error: Error | null }> => {
    try {
      const { error } = await supabase.auth.signOut();
      return {
        error: error ? new Error(error.message) : null,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error : new Error("Unknown error"),
      };
    }
  },

  // Get current session
  getSession: async (): Promise<{
    session: Session | null;
    error: Error | null;
  }> => {
    try {
      const { data, error } = await supabase.auth.getSession();
      return {
        session: data.session,
        error: error ? new Error(error.message) : null,
      };
    } catch (error) {
      return {
        session: null,
        error: error instanceof Error ? error : new Error("Unknown error"),
      };
    }
  },

  // Get current user
  getUser: async (): Promise<{ user: User | null; error: Error | null }> => {
    try {
      const { data, error } = await supabase.auth.getUser();
      return {
        user: data.user,
        error: error ? new Error(error.message) : null,
      };
    } catch (error) {
      return {
        user: null,
        error: error instanceof Error ? error : new Error("Unknown error"),
      };
    }
  },

  // Subscribe to auth changes
  onAuthStateChange: (callback: (session: Session | null) => void) => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
    return subscription;
  },
};
