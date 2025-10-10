import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Role } from "@/constants/constant";
import { useSignUp } from "@/hooks/useAuth";

const schema = z.object({
  full_name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email({ error: "Invalid email" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum([Role.ADMIN, Role.USER]),
});
type FormValues = z.infer<typeof schema>;
export default function AddUserDialog() {
  const { mutate: signUp } = useSignUp();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      role: Role.USER,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      signUp({
        email: data.email,
        password: data.password,
        full_name: data.full_name,
        is_admin: data.role === Role.ADMIN,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-2 bg-primary text-white">
          <Plus size={22} /> Add User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md text-gray-600">
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
                  <FormLabel className="text-md text-gray-600">
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md text-gray-600">
                    Select Role <span>*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      defaultValue={Role.USER}
                      className="flex items-center space-x-2"
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={Role.USER} id="option-user" />
                        <Label htmlFor="option-user">User</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={Role.ADMIN} id="option-admin" />
                        <Label htmlFor="option-admin">Admin</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full mt-4 hover:opacity-80 cursor-pointer text-white"
            >
              Invite
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
