import { z } from 'zod';

export const formRequestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  startDate: z.date(),
  dueDate: z.date(),
  budget: z.coerce.number().min(1, 'Budget is required'),
  language: z.string().min(1, 'Language is required'),
  datasetDesc: z.string(),
  totalSamples: z.coerce.number().min(1, 'Minimal dataset samples are required'),
  imageGuidelines: z.string()
  // exampleImage:
});

export type RequestFormSchema = z.infer<typeof formRequestSchema>;
