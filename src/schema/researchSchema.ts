import z from "zod";
import { ResearchPurpose } from "@/constants/constant";

export const researchSchema = z
  .object({
    purpose: z.enum([ResearchPurpose.SEO, ResearchPurpose.SEM]),
    brandName: z.string(),
    targetLocation: z.string().array().min(1),
    brandURL: z.url(),
    description: z.string(),
    questionnaire: z
      .custom<File[]>()
      .refine((files) => files && files.length > 0, "File is required"),
    seedKeywords: z.custom<File[]>().optional(),
    seoThemes: z.custom<File[]>().optional(),
    existingKeywords: z.custom<File[]>().optional(),
    competitor: z.string().optional(),
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
        message: "Seed Keywords file is required",
      });
    } else if (
      data.purpose === ResearchPurpose.SEO &&
      (!data.seoThemes || !(data.seoThemes instanceof File))
    ) {
      ctx.addIssue({
        path: ["seoThemes"],
        code: "custom",
        message: "SEO Themes file is required",
      });
    }
  });

export type FormValues = z.infer<typeof researchSchema>;
