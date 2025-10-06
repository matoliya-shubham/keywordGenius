import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";
import userAvatar from "@/assets/user.png";

export const Route = createFileRoute("/_authenticated/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: userAvatar, // dummy profile picture
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // TODO: add logout logic
  };

  return (
    <div className="h-full max-h-[var(--main-height)] overflow-y-auto ">
      <h1 className="text-4xl font-bold text-center py-4">Profile</h1>
      <div className=" flex flex-col items-center mt-8 justify-center ">
        <Card className="w-full max-w-lg shadow-lg ">
          <CardHeader className="flex flex-col items-center">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-gray-200 shadow"
            />
            <CardTitle className="mt-4 text-xl">{user.name}</CardTitle>
            <p className="text-gray-600">{user.email}</p>
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
