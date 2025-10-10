import z from "zod";
import { ResearchPurpose } from "@/constants/constant";

export const researchSchema = z
  .object({
    purpose: z.enum([ResearchPurpose.SEO, ResearchPurpose.SEM]),
    brandName: z.string().min(1, "This field is required"),
    targetLocation: z
      .string()
      .array()
      .min(1, "Please select at least on option"),
    brandURL: z
      .url("Please enter a valid URL")
      .min(1, "This field is required"),
    description: z.string().min(1, "This field is required"),
    questionnaire: z
      .custom<File[]>()
      .refine((files) => files && files.length > 0, "This field is required"),
    seedKeywords: z.custom<File[]>().optional(),
    seoThemes: z.custom<File[]>().optional(),
    existingKeywords: z.custom<File[]>().optional(),
    competitor: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          url: z.url("Please enter a valid URL").optional(),
        })
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (
      (data.purpose === ResearchPurpose.SEO ||
        data.purpose === ResearchPurpose.SEM) &&
      (!data.seedKeywords || !(data.seedKeywords instanceof File))
    ) {
      ctx.addIssue({
        path: ["seedKeywords"],
        code: "custom",
        message: "This field is required",
      });
    } else if (
      data.purpose === ResearchPurpose.SEO &&
      (!data.seoThemes || !(data.seoThemes instanceof File))
    ) {
      ctx.addIssue({
        path: ["seoThemes"],
        code: "custom",
        message: "This field is required",
      });
    }
  });

export type FormValues = z.infer<typeof researchSchema>;
