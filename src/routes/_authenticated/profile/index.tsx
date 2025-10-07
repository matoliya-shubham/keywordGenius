import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";
import userAvatar from "@/assets/user.png";
import { useProfile } from "@/hooks/useProfile";
import { useSignOut } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: profile } = useProfile();
  const signOut = useSignOut();

  const handleLogout = () => {
    signOut.mutate();
  };

  return (
    <div className="h-full max-h-[var(--main-height)] overflow-y-auto ">
      <h1 className="text-4xl font-bold text-center py-4">Profile</h1>
      <div className=" flex flex-col items-center mt-8 justify-center ">
        <Card className="w-full max-w-lg shadow-lg ">
          <CardHeader className="flex flex-col items-center">
            <img
              src={profile?.avatar || userAvatar}
              alt={profile?.full_name || "Profile image"}
              className="w-24 h-24 rounded-full border-4 border-gray-200 shadow"
            />
            <CardTitle className="mt-4 text-xl">{profile?.full_name}</CardTitle>
            <p className="text-gray-600">{profile?.email}</p>
          </CardHeader>

          <CardContent className="flex justify-center gap-4 mt-6">
            <Button variant="outline" asChild>
              <Link to="/profile/edit">Edit Profile</Link>
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
