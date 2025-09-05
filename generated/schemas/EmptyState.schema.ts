// Generated Zod schema for EmptyState
import { z } from 'zod';

export const EmptyStatePropsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
  action: z.string().optional(),
  secondaryAction: z.string().optional(),
  className: z.string().optional(),
  size: z.union([z.string(), z.string(), z.string()]).optional(),
});

export type EmptyStateProps = z.infer<typeof EmptyStatePropsSchema>;

