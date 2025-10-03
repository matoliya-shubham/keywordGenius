import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { Button } from "../ui/button";

interface JobDetails {
  jobId: string;
  brandName: string;
  targetLocation: string[];
  brandURL: string;
  description: string;
  questionnaire: string[];
  purpose: string;
  createdAt: string;
  competitor: string[];
}

export function JobConfigDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: JobDetails;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className=" bg-gray-50 hover:bg-gray-100 hover:cursor-pointer text-gray-600"
        >
          <Eye /> View Input Config
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[38rem] min-h-[20rem] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Job Configuration - job-001</DialogTitle>
          <DialogDescription className="flex justify-between">
            <div>
              <span title="Job ID" className="font-mono">
                job-001
              </span>
            </div>
            <div>
              <span title="Created At">Jan 15, 2025, 04:00 PM</span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Brand URL */}
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Brand Name</p>
              <p>Brand Name</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Brand URL</p>
              <a
                href={"https://techcorp.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 "
              >
                https://techcorp.com
              </a>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-sm text-gray-500">Description</p>
            <p className="text-gray-800">
              Enterprise software solutions for modern businesses
            </p>
          </div>

          {/* Purpose */}
          <div>
            <p className="text-sm text-gray-500">Purpose</p>
            <Badge variant="outline">SEO</Badge>
          </div>

          {/* Locations */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Target Locations</p>
            <div className="flex flex-wrap gap-2">
              {["United States", "Canada", "United Kingdom"].map((loc, i) => (
                <Badge key={i} variant="secondary">
                  {loc}
                </Badge>
              ))}
            </div>
          </div>

          {/* Questionnaire */}
          <div>
            <p className="text-sm text-gray-500">Questionnaire</p>
            <ul className="list-disc list-inside text-gray-800">
              {[
                "What are your main competitors?",
                "What are your main competitors?",
                "What are your main competitors?",
              ].map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>

          {/* Competitors */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Competitors</p>
            <ul className="list-disc list-inside text-gray-800">
              {["Tech Corp", "Tech Corp", "Tech Corp"].map((comp, i) => (
                <li key={i}>
                  <a
                    href={comp.split("(")[1]?.replace(")", "")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {comp}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
