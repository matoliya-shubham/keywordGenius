import {
  CompetitorSelector,
  type Competitor,
} from "@/components/CompetitorSelector";
import { CountrySelector } from "@/components/CountrySelector";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { UnsavedChangesDialog } from "@/components/UnsavedChangesDialog";
import { ResearchPurpose } from "@/constants/constant";
import { researchSchema, type FormValues } from "@/schema/researchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useBlocker } from "@tanstack/react-router";
import { FileText, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/_authenticated/seo/research")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm<FormValues>({
    resolver: zodResolver(researchSchema),
    defaultValues: {
      brandName: "",
      targetLocation: [],
      brandURL: "",
      description: "",
      questionnaire: [],
      purpose: ResearchPurpose.SEO,
      competitor: undefined,
    },
  });
  const [isFormDirty, setIsFormDirty] = useState(false);

  const { proceed, reset, status } = useBlocker({
    shouldBlockFn: () => isFormDirty,
    withResolver: true,
  });

  useEffect(() => {
    setIsFormDirty(form.formState.isDirty);
  }, [form.formState.isDirty]);

  const onSubmit = async () => {
    try {
      // TODO: Implement sign in logic
    } catch (err) {
      console.error(err);
    }
  };

  const selectedPurpose = form.watch("purpose");

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 p-4 px-6">
        Research Setup
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
          className="space-y-6 p-4 px-6"
        >
          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md text-gray-600">
                  Select purpose (SEO/SEM) <span>*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue={ResearchPurpose.SEO}
                    className="flex items-center space-x-2"
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={ResearchPurpose.SEO}
                        id="option-seo"
                      />
                      <Label htmlFor="option-seo">SEO</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={ResearchPurpose.SEM}
                        id="option-sem"
                      />
                      <Label htmlFor="option-sem">SEM</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <CountrySelector
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
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
                  <Dropzone
                    value={field.value}
                    onChange={field.onChange}
                    icon={<FileText />}
                    placeholder="Upload PDF, DOC, TXT,or CSV file"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3 justify-baseline">
            <FormField
              control={form.control}
              name="seedKeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md text-gray-600">
                    Seed Keywords <span>*</span>
                  </FormLabel>
                  <FormControl>
                    <Dropzone
                      value={field.value}
                      onChange={field.onChange}
                      icon={<Upload />}
                      placeholder="Upload CSV, DOC, or TXT file"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedPurpose === ResearchPurpose.SEO ? (
              <FormField
                control={form.control}
                name="seoThemes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md text-gray-600">
                      SEO Themes <span>*</span>
                    </FormLabel>
                    <FormControl>
                      <Dropzone
                        value={field.value}
                        onChange={field.onChange}
                        icon={<Upload />}
                        placeholder="Upload CSV, DOC, or TXT file"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="existingKeywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md text-gray-600">
                      Existing Keywords (optional)
                    </FormLabel>
                    <FormControl>
                      <Dropzone
                        value={field.value}
                        onChange={field.onChange}
                        icon={<Upload />}
                        placeholder="Upload CSV, DOC, or TXT file"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <FormField
            control={form.control}
            name="competitor"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md text-gray-600">
                  Competitors (optional)
                </FormLabel>
                <FormControl>
                  <CompetitorSelector
                    onChange={field.onChange}
                    value={field.value as Competitor[]}
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
            className="w-xs my-8 text-md cursor-pointer text-white"
          >
            Start Research
          </Button>
        </form>
      </Form>
      {status === "blocked" && (
        <UnsavedChangesDialog
          open={true}
          onConfirm={proceed}
          onCancel={reset}
        />
      )}
    </div>
  );
}
