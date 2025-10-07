import { supabase } from "@/supabase-client";
import type { User } from "@supabase/supabase-js";

type Profile = {
  id: string;
  email: string;
  full_name: string;
  avatar: string;
  is_admin: boolean;
  is_active: boolean;
};

export async function getProfile() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("User not logged in");

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) throw new Error(error.message);
  return profile as Profile;
}

export async function updateProfile(profile: User) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("User not logged in");

  const { data: profileData, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("id", user.id)
    .single();

  if (error) throw new Error(error.message);
  return profileData as Profile;
}

export async function deleteProfile(id: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("User not logged in");

  const { error } = await supabase.from("profiles").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

export async function getAllProfiles() {
  const { data: profiles, error } = await supabase.from("profiles").select("*");

  if (error) throw new Error(error.message);
  return profiles as Profile[];
}
