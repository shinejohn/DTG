// Generated Zod schema for Badge
import { z } from 'zod';

export const BadgeVariantSchema = z.object({
  value: z.union([z.string(), z.string(), z.string(), z.string(), z.string(), z.string(), z.string()]),
});

export type BadgeVariant = z.infer<typeof BadgeVariantSchema>;

export const BadgePropsSchema = z.object({
  children: z.string(),
  variant: z.string().optional(),
  size: z.union([z.string(), z.string(), z.string()]).optional(),
  rounded: z.boolean().optional(),
  icon: z.string().optional(),
});

export type BadgeProps = z.infer<typeof BadgePropsSchema>;

