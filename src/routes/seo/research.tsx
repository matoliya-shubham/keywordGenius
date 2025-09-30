import { Dropzone } from "@/components/Dropzone";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import z from "zod";

export const Route = createFileRoute("/seo/research")({
  component: RouteComponent,
});

const formSchema = z.object({
  brandName: z.string(),
  targetLocation: z.string().array().min(1),
  brandURL: z.url(),
  description: z.string(),
  questionnaire: z
    .custom<File[]>()
    .refine((files) => files && files.length > 0, "File is required"),
  purpose: z.enum(["SEO", "SEM"]),
  competitor: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

function RouteComponent() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: "",
      targetLocation: [],
      brandURL: "",
      description: "",
      questionnaire: [],
      purpose: undefined,
      competitor: "",
    },
  });

  const onSubmit = async () => {
    try {
      // TODO: Implement sign in logic
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 p-4 px-6">
        Research Setup
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-4 px-6"
        >
          <FormField
            control={form.control}
            name="brandName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md text-gray-600">
                  Brand Name <span>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Brand Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="targetLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md text-gray-600">
                  Target Location <span>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg: United States, Canada, United Kingdom"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brandURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md text-gray-600">
                  Brand URL <span>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="eg: https://www.example.com" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-xs text-gray-500">
                  Ensure your website URL is optimized for the target locations
                  specified above
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md text-gray-600">
                  Service/Product Description <span>*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your service/product in detail"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="questionnaire"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md text-gray-600">
                  Brand Response to Questionnaire <span>*</span>
                </FormLabel>
                <FormControl>
                  <Dropzone value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md text-gray-600">
                  Select purpose (SEO/SEM) <span>*</span>
                </FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Research purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SEO">SEO</SelectItem>
                      <SelectItem value="SEM">SEM</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="competitor"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md text-gray-600">
                  Competitors (optional)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List your main competitors..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-xs text-gray-500">
                  <span className="text-blue-500 hover:cursor-pointer mr-1">
                    Suggest Competitors
                  </span>
                  (needs at least 1 of the above fields to be filled)
                </FormDescription>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-xs my-8 text-md bg-blue-500 hover:cursor-pointer hover:bg-blue-600 text-white"
          >
            Start Research
          </Button>
        </form>
      </Form>
    </div>
  );
}
