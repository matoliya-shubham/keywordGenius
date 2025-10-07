import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteProfile,
  getAllProfiles,
  getProfile,
  updateProfile,
} from "../api/userProfile";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { CheckCircle2, CircleX } from "lucide-react";

export const useProfile = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => getProfile(),
  });

  return { data, error, isPending };
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profile: User) => updateProfile(profile),
    onSuccess: () => {
      toast.success(
        <p className="text-gray-700 text-md font-semibold">
          Profile update successful
        </p>,
        {
          icon: (
            <CheckCircle2 className="size-5" stroke="green" strokeWidth={2} />
          ),
          description: "Profile updated successfully.",
        }
      );
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: Error) => {
      toast.error(
        <p className="text-gray-700 text-md font-semibold">
          Profile update failed
        </p>,
        {
          icon: <CircleX className="size-5" stroke="red" strokeWidth={2} />,
          description: <p className="text-gray-600 ">{error.message}</p>,
        }
      );
    },
  });
};

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProfile(id),
    onSuccess: () => {
      toast.success(
        <p className="text-gray-700 text-md font-semibold">
          Profile delete successful
        </p>,
        {
          icon: <CircleX className="size-5" stroke="green" strokeWidth={2} />,
          description: (
            <p className="text-gray-600 ">Profile deleted successfully.</p>
          ),
        }
      );
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: Error) => {
      toast.error(
        <p className="text-gray-700 text-md font-semibold">
          Profile delete failed
        </p>,
        {
          icon: <CircleX className="size-5" stroke="red" strokeWidth={2} />,
          description: <p className="text-gray-600 ">{error.message}</p>,
        }
      );
    },
  });
};

export const useGetAllProfiles = () => {
  const query = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => getAllProfiles(),
  });

  return { ...query, profiles: query.data, count: query.data?.length };
};
