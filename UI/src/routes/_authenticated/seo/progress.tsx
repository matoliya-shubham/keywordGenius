import { JobConfigDialog } from "@/components/dialogs/JobConfigDialog";
import { StatusBadge, type Status } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";

export const Route = createFileRoute("/_authenticated/seo/progress")({
  component: RouteComponent,
});

const progress = [
  {
    jobId: "1",
    createdAt: "2025-10-03T12:44:29.000Z",
    status: "in-progress",
    availableToDownload: false,
  },
  {
    jobId: "2",
    createdAt: "2025-10-03T12:44:29.000Z",
    status: "in-progress",
    availableToDownload: true,
  },
  {
    jobId: "3",
    createdAt: "2025-10-03T12:44:29.000Z",
    status: "success",
    availableToDownload: false,
  },
  {
    jobId: "4",
    createdAt: "2025-10-03T12:44:29.000Z",
    status: "success",
    availableToDownload: true,
  },
  {
    jobId: "5",
    createdAt: "2025-10-03T12:44:29.000Z",
    status: "failed",
    availableToDownload: false,
  },
];

function RouteComponent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 p-4 px-6">
        Research Setup
      </h2>
      <div className="m-2 mx-6 border rounded-md">
        <Table>
          <TableCaption className="pb-2">Progress of your jobs.</TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-24">Job Id</TableHead>
              <TableHead className="w-60 ">Created At</TableHead>
              <TableHead className="w-40">Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {progress.map((prog) => (
              <TableRow key={prog.jobId}>
                <TableCell className="font-normal w-24">
                  <div className="w-full ml-4">{prog.jobId}</div>
                </TableCell>
                <TableCell className="font-normal w-40">
                  {new Date(prog.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="w-40">
                  <StatusBadge status={prog.status as Status} />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <JobConfigDialog />
                    {prog.availableToDownload && (
                      <Button
                        variant="outline"
                        className=" bg-gray-50 hover:bg-gray-100 hover:cursor-pointer text-gray-600"
                      >
                        <Download /> Download Excel
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
