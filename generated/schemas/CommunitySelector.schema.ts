// Generated Zod schema for CommunitySelector
import { z } from 'zod';

export const CommunitySelectorPropsSchema = z.object({
  currentCommunity: z.string(),
  onCommunityChange: z.string(),
  availableCommunities: z.string().optional(),
});

export type CommunitySelectorProps = z.infer<typeof CommunitySelectorPropsSchema>;

