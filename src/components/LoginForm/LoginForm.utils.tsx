import { z } from 'zod';
import { featureSchema } from '@/components/NewRequestForm/NewRequestForm.utils';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().length(8)
});

export type LoginFormSchema = z.infer<typeof loginSchema>;
