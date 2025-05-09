import type { NewFeature } from '@/context/DatasetRequestContext';
import { z } from 'zod';

export const createFeatureSchema = (existingFeatures: NewFeature[] = []) =>
  z.object({
    name: z
      .string()
      .min(1, 'Feature name is required')
      .refine((name) => !existingFeatures.some((f) => f.name.toLowerCase() === name.toLowerCase()), {
        message: 'A feature with this name already exists'
      }),
    labelGuidelines: z.string().min(1, 'Label guidelines are required')
  });

export const featureSchema = z.object({
  name: z.string().min(1, 'Feature name is required'),
  labelGuidelines: z.string().min(1, 'Label guidelines are required')
});

export const createOrderSchema = z
  .object({
    name: z.string().min(1, 'Order name is required'),
    startDate: z.date(), // or z.coerce.date() if your form gives you an ISO string
    endDate: z.date(),
    budget: z.coerce.number().min(1, 'Budget must be at least 1'),
    labelingLanguage: z.enum(['polish', 'english']),
    datasetDescription: z.string().min(1, 'Dataset description is required'),
    minSamplesCount: z.coerce.number().min(1, 'Minimal dataset samples are required'),
    imageGuidelines: z.string().min(1, 'Image guidelines are required'),
    exampleImageUrl: z.string().url('Must be a valid URL'),
    features: z.array(featureSchema).min(1, 'At least one feature is required')
  })
  .refine((data) => data.endDate > data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate']
  });

export type CreateOrderFormSchema = z.infer<typeof createOrderSchema>;
