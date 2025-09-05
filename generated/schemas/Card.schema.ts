// Generated Zod schema for Card
import { z } from 'zod';

export const CardPropsSchema = z.object({
  children: z.string(),
  className: z.string().optional(),
  variant: z.union([z.string(), z.string(), z.string()]).optional(),
  padding: z.union([z.string(), z.string(), z.string(), z.string()]).optional(),
  isHoverable: z.boolean().optional(),
});

export type CardProps = z.infer<typeof CardPropsSchema>;

