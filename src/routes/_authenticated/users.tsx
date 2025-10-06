import { createFileRoute } from "@tanstack/react-router";
import { MoveLeft, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge, type Status } from "@/components/StatusBadge";
import AddUserDialog from "@/components/dialogs/AddUserDialog";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/users")({
  component: RouteComponent,
});

export const users = [
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    status: "active",
    role: "user",
  },
  {
    name: "Bob Smith",
    email: "bob.smith@example.com",
    status: "pending",
    role: "user",
  },
  {
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    status: "active",
    role: "user",
  },
  {
    name: "Diana Evans",
    email: "diana.evans@example.com",
    status: "pending",
    role: "user",
  },
  {
    name: "Ethan Williams",
    email: "ethan.williams@example.com",
    status: "active",
    role: "user",
  },
  {
    name: "Fiona Clark",
    email: "fiona.clark@example.com",
    status: "pending",
    role: "user",
  },
];

const statusMap: Record<string, Status> = {
  active: "success",
  pending: "",
};
function RouteComponent() {
  return (
    <div className="h-full max-h-[var(--main-height)] overflow-y-auto pb-4">
      <div className="flex flex-col">
        <div className=" mt-4 ml-4">
          <Link to="/seo" className="flex items-center gap-2">
            <MoveLeft /> Back to DashBoard
          </Link>
        </div>
        <h1 className="text-2xl font-bold mt-4 ml-4">User Management</h1>
      </div>
      <div className="h-max w-full md:w-2/3 mt-6 mx-auto bg-white shadow-sm rounded-md">
        <div className="pb-4">
          <div className="flex items-center justify-between mx-6 py-6 ">
            <h2 className="text-2xl font-semibold text-gray-800 ">All Users</h2>
            <AddUserDialog />
          </div>
          <div className="m-2 mx-6 border rounded-md">
            <Table>
              <TableCaption className="pb-2">Manage users</TableCaption>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="w-40">Name</TableHead>
                  <TableHead className="w-68">Email</TableHead>
                  <TableHead className="w-40">Status</TableHead>
                  <TableHead className="w-40">Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.email} className="">
                    <TableCell className="font-medium py-4">
                      {user.name}
                    </TableCell>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell className="font-medium">
                      <StatusBadge
                        status={statusMap[user.status]}
                        value={user.status}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Trash2 size={22} className="text-red-600" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
