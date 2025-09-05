// Generated Zod schema for MetaTags
import { z } from 'zod';

export const MetaTagsPropsSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.string(),
  canonicalUrl: z.string().optional(),
  ogImage: z.string().optional(),
  ogType: z.string().optional(),
  twitterCard: z.string().optional(),
});

export type MetaTagsProps = z.infer<typeof MetaTagsPropsSchema>;

