import { createFileRoute } from "@tanstack/react-router";
import { Loader, MoveLeft } from "lucide-react";
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
import AddUserDialog from "@/components/dialogs/AddUserDialog";
import { Badge } from "@/components/ui/badge";
import { useGetAllProfiles } from "@/hooks/useProfile";

import { AlertDialogDeleteUser } from "@/components/AlertDialogDeleteUser";

export const Route = createFileRoute("/_authenticated/users")({
  component: RouteComponent,
});

function RouteComponent() {
  const { profiles, isPending } = useGetAllProfiles();

  return (
    <div className="h-full max-h-[var(--main-height)] overflow-y-auto pb-4">
      <div className="flex flex-col">
        <div className=" mt-4 ml-4  ">
          <Link to="/seo" className="flex items-center w-max gap-2">
            <MoveLeft /> Back to DashBoard
          </Link>
        </div>
        <h1 className="text-2xl font-bold mt-4 ml-4">User Management</h1>
      </div>
      <div className="h-max w-full md:w-2/3 mt-6 mx-auto bg-white shadow-sm rounded-md">
        <div className="pb-4 flex flex-col h-full min-h-[32rem]">
          <div className="flex items-center justify-between mx-6 py-6 ">
            <h2 className="text-2xl font-semibold text-gray-800 ">All Users</h2>
            <AddUserDialog />
          </div>
          {isPending ? (
            <div className="w-full h-full flex-1 flex items-center justify-center">
              <Loader className="animate-spin mr-2" size={20} /> Fetching
              Users...
            </div>
          ) : (
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
                  {profiles?.map((user) => {
                    const isAdmin = user.is_admin;
                    return (
                      <TableRow key={user.email} className="">
                        <TableCell className="font-normal py-4">
                          {user.full_name}
                        </TableCell>
                        <TableCell className="font-normal">
                          {user.email}
                        </TableCell>
                        <TableCell className="font-normal">
                          <Badge
                            variant="outline"
                            className={
                              user.is_active
                                ? "bg-green-200 border-green-600"
                                : "bg-gray-200 border-gray-500"
                            }
                          >
                            {user.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-normal">
                          <Badge variant={!isAdmin ? "outline" : "default"}>
                            {isAdmin ? "Admin" : "User"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <AlertDialogDeleteUser id={user.id} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
