import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useProfile } from "@/hooks/useProfile";
import { useSignOut } from "@/hooks/useAuth";

export const ProfileDropdown = () => {
  const { data: profile } = useProfile();
  const signOut = useSignOut();

  const handleLogout = () => {
    signOut.mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 hover:bg-[var(--color-primary)] border hover:text-white rounded-full p-1 relative">
          <User className="size-5" />
          <span className="font-normal">
            {profile?.full_name?.split(" ")[0] || "User"}
          </span>
          {profile?.is_admin && (
            <div className="absolute right-0 top-0 w-2 h-2 bg-green-500 rounded-full"></div>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem asChild className="flex items-center space-x-2">
          <Link to="/profile">
            <User className="w-4 h-4" />
            <span>Profile</span>
            {profile?.is_admin && (
              <span className="ml-auto text-xs text-green-500 ">Admin</span>
            )}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="flex items-center space-x-2 text-red-600"
        >
          <div onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
