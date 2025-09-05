// Generated Zod schema for Spinner
import { z } from 'zod';

export const SpinnerPropsSchema = z.object({
  size: z.union([z.string(), z.string(), z.string(), z.string(), z.string()]).optional(),
  color: z.union([z.string(), z.string(), z.string(), z.string(), z.string()]).optional(),
  className: z.string().optional(),
  label: z.string().optional(),
});

export type SpinnerProps = z.infer<typeof SpinnerPropsSchema>;

