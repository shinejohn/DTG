// Generated Zod schema for CommunityService
import { z } from 'zod';

export const CommunitySchema = z.object({
  id: z.string(),
  name: z.string(),
  brandId: z.string().optional(),
});

export type Community = z.infer<typeof CommunitySchema>;

