// Generated Zod schema for BusinessCard
import { z } from 'zod';

export const BusinessCardPropsSchema = z.object({
  business: z.array(z.array(z.string())),
  variant: z.union([z.string(), z.string(), z.string()]).optional(),
  onSave: z.string().optional(),
  isSaved: z.boolean().optional(),
  showActions: z.boolean().optional(),
  className: z.string().optional(),
});

export type BusinessCardProps = z.infer<typeof BusinessCardPropsSchema>;

