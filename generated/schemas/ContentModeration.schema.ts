// Generated Zod schema for ContentModeration
import { z } from 'zod';

export const ModerationItemSchema = z.object({
  id: z.string(),
  type: z.union([z.string(), z.string(), z.string(), z.string(), z.string()]),
  content: z.string(),
  user: z.string(),
  userAvatar: z.string().optional(),
  business: z.string().optional(),
  date: z.string(),
  status: z.union([z.string(), z.string(), z.string()]),
  flagReason: z.string().optional(),
  image: z.string().optional(),
});

export type ModerationItem = z.infer<typeof ModerationItemSchema>;

