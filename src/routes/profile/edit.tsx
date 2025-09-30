import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-2">
      <span>Hello "/profile/edit"!</span>
      <Link to="/profile">Back to Profile</Link>
    </div>
  );
}
