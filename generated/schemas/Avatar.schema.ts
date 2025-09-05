// Generated Zod schema for Avatar
import { z } from 'zod';

export const AvatarPropsSchema = z.object({
  src: z.string().optional(),
  alt: z.string().optional(),
  size: z.union([z.string(), z.string(), z.string(), z.string(), z.string()]).optional(),
  shape: z.union([z.string(), z.string(), z.string()]).optional(),
  fallback: z.union([z.string(), z.string()]).optional(),
  className: z.string().optional(),
  status: z.union([z.string(), z.string(), z.string(), z.string(), z.string()]).optional(),
  bordered: z.boolean().optional(),
  onClick: z.string().optional(),
});

export type AvatarProps = z.infer<typeof AvatarPropsSchema>;

