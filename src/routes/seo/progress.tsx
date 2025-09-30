import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/seo/progress")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/seo/progress"!</div>;
}
