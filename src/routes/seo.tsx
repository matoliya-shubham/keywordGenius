import { Button } from "@/components/ui/button";
import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/seo")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  // Redirect to /seo/progress if at /seo
  useEffect(() => {
    navigate({ to: "/seo/research", replace: true });
  }, [navigate]);

  return (
    <div className="h-full max-h-[var(--main-height)] overflow-y-auto py-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold  ml-4">
          SEO keyword research Wizard
        </h1>
        <p className="text-gray-500 ml-4 ">
          Setup and track your keyword research workflow
        </p>
      </div>
      <div className="flex flex-col justify-baseline items-center h-max gap-2 relative mt-6">
        <div className="sticky top-0 grid grid-cols-2 gap-2 p-2 w-full md:w-2/3 mt-4 bg-white shadow-sm rounded-sm">
          <Button variant="outline" asChild>
            <Link to="/seo/research">Research</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/seo/progress">Progress</Link>
          </Button>
        </div>
        <div className="h-max w-full md:w-2/3 mx-auto bg-white shadow-sm rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
