// Generated Zod schema for SEOContent
import { z } from 'zod';

export const SEOContentPropsSchema = z.object({
  communityName: z.string(),
  communityDescription: z.string(),
  brandInterest: z.string(),
});

export type SEOContentProps = z.infer<typeof SEOContentPropsSchema>;

