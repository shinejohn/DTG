// Generated Zod schema for Rating
import { z } from 'zod';

export const RatingPropsSchema = z.object({
  value: z.number(),
  max: z.number().optional(),
  precision: z.union([z.string(), z.string()]).optional(),
  size: z.union([z.string(), z.string(), z.string()]).optional(),
  readOnly: z.boolean().optional(),
  onChange: z.string().optional(),
  emptyColor: z.string().optional(),
  filledColor: z.string().optional(),
  className: z.string().optional(),
  showValue: z.boolean().optional(),
  name: z.string().optional(),
  required: z.boolean().optional(),
});

export type RatingProps = z.infer<typeof RatingPropsSchema>;

