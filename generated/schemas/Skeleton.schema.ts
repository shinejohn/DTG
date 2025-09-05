// Generated Zod schema for Skeleton
import { z } from 'zod';

export const SkeletonPropsSchema = z.object({
  variant: z.union([z.string(), z.string(), z.string(), z.string()]).optional(),
  width: z.union([z.string(), z.number()]).optional(),
  height: z.union([z.string(), z.number()]).optional(),
  className: z.string().optional(),
  animation: z.union([z.string(), z.string(), z.string()]).optional(),
});

export type SkeletonProps = z.infer<typeof SkeletonPropsSchema>;

