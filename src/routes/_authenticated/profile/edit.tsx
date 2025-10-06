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
  name: z.string().min(1, "Name is required"),
  email: z.email({ error: "Invalid email" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
  avatar: z.url({ error: "Invalid avatar URL" }).optional(),
});

type FormValues = z.infer<typeof userSchema>;

function RouteComponent() {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      avatar: undefined,
    },
  });

  const onSubmit = async () => {
    try {
      // TODO: Implement sign in logic
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500">
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
                      <FormLabel className="text-gray-500">
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
                      <FormLabel className="text-gray-500">
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
                      <FormLabel>Avatar</FormLabel>
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
                    type="submit"
                    className=" text-white cursor-pointer hover:opacity-80"
                  >
                    Update
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
