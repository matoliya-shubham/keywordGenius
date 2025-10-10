import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export type Status = "in-progress" | "success" | "failed" | "";

interface StatusBadgeProps {
  status: Status;
  value?: string;
}

export function StatusBadge({ status, value }: StatusBadgeProps) {
  switch (status) {
    case "in-progress":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 flex items-center gap-1">
          <Loader2 className="w-4 h-4" />
          {value || "In Progress"}
        </Badge>
      );
    case "success":
      return (
        <Badge className="bg-green-100 text-green-800 border-green-300 flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4" />
          {value || "Success"}
        </Badge>
      );
    case "failed":
      return (
        <Badge className="bg-red-100 text-red-800 border-red-300 flex items-center gap-1">
          <XCircle className="w-4 h-4" />
          {value || "Failed"}
        </Badge>
      );
    default:
      return value ? <Badge variant={"outline"}>{value}</Badge> : null;
  }
}
