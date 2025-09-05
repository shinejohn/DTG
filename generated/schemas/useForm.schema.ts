// Generated Zod schema for useForm
import { z } from 'zod';

export const FormOptionsSchema = z.object({
  initialValues: z.string(),
  onSubmit: z.string(),
  validate: z.string().optional(),
});

export type FormOptions = z.infer<typeof FormOptionsSchema>;

