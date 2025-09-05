// Generated Zod schema for Search
import { z } from 'zod';

export const SearchParamsSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  radius: z.number().optional(),
  priceRange: z.string().optional(),
  rating: z.number().optional(),
  openNow: z.boolean().optional(),
  features: z.array(z.string()).optional(),
  sort: z.union([z.string(), z.string(), z.string(), z.string()]).optional(),
  page: z.number().optional(),
});

export type SearchParams = z.infer<typeof SearchParamsSchema>;

