import { Card, CardContent } from "@/components/ui/card";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/profile/edit")({
  component: RouteComponent,
});

const userSchema = z.object({
  full_name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  avatar: z.url({ error: "Invalid avatar URL" }).optional(),
});

type FormValues = z.infer<typeof userSchema>;

function RouteComponent() {
  // const { mutate: updateProfile, isPending } = useUpdateProfile();
  const isPending = false;
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      avatar: undefined,
    },
  });

  const onSubmit = (data: FormValues) => {
    try {
      console.log(data);
      // updateProfile(data);
      navigate({ to: "/profile" });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="h-full max-h-[var(--main-height)] overflow-y-auto ">
      <h1 className="text-4xl font-bold text-center py-4">Edit Profile</h1>
      <div className=" flex flex-col items-center mt-6 justify-center ">
        <Card className="sm:w-full w-sm max-w-md shadow-lg">
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Name <span>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Email <span>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Password <span>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Avatar</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="Avatar URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full mt-8 grid grid-cols-2 gap-8">
                  <Button
                    asChild
                    variant="outline"
                    className=" cursor-pointer hover:opacity-80"
                  >
                    <Link to="/profile"> Cancel </Link>
                  </Button>
                  <Button
                    disabled={isPending}
                    type="submit"
                    className=" text-white cursor-pointer hover:opacity-80"
                  >
                    {isPending ? "Updating..." : "Update"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
