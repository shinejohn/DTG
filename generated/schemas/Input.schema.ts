// Generated Zod schema for Input
import { z } from 'zod';

export const InputPropsSchema = z.object({
  label: z.string().optional(),
  helperText: z.string().optional(),
  error: z.string().optional(),
  leftIcon: z.string().optional(),
  rightIcon: z.string().optional(),
  fullWidth: z.boolean().optional(),
});

export type InputProps = z.infer<typeof InputPropsSchema>;

