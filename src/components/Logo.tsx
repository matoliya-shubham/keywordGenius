import { Link } from "@tanstack/react-router";
import PureTechLogo from "@/assets/puretech-logo.svg?react";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className="flex items-center ">
      <PureTechLogo className={cn("size-24", className)} />
    </Link>
  );
}
