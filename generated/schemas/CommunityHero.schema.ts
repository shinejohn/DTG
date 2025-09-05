// Generated Zod schema for CommunityHero
import { z } from 'zod';

export const CommunityHeroPropsSchema = z.object({
  communityName: z.string(),
  onCommunityChange: z.string().optional(),
  availableCommunities: z.string().optional(),
});

export type CommunityHeroProps = z.infer<typeof CommunityHeroPropsSchema>;

