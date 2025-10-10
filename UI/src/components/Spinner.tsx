import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  const sizeClasses =
    size === "sm"
      ? "h-4 w-4 border-2"
      : size === "lg"
      ? "h-12 w-12 border-4"
      : "h-6 w-6 border-2";

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-solid border-blue-500 border-t-transparent",
        sizeClasses,
        className
      )}
    />
  );
}
