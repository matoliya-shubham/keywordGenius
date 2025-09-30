import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-2">
      <span>Hello "/profile/"!</span>
      <Outlet />
      <Link to="/profile/edit">Edit Profile</Link>
    </div>
  );
}
