// Generated Zod schema for Typography
import { z } from 'zod';

export const TypographyVariantSchema = z.object({
  value: z.union([z.string(), z.string(), z.string(), z.string(), z.string(), z.string(), z.string(), z.string(), z.string(), z.string(), z.string(), z.string()]),
});

export type TypographyVariant = z.infer<typeof TypographyVariantSchema>;

export const TypographyPropsSchema = z.object({
  variant: z.string().optional(),
  component: z.string().optional(),
  className: z.string().optional(),
  children: z.string(),
  color: z.union([z.string(), z.string(), z.string(), z.string(), z.string(), z.string(), z.string(), z.string(), z.string()]).optional(),
  align: z.union([z.string(), z.string(), z.string()]).optional(),
  truncate: z.boolean().optional(),
  gutterBottom: z.boolean().optional(),
});

export type TypographyProps = z.infer<typeof TypographyPropsSchema>;

