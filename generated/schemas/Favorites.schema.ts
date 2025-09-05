// Generated Zod schema for Favorites
import { z } from 'zod';

export const BusinessSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  subcategory: z.string().optional(),
  image: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
  priceRange: z.union([z.string(), z.string(), z.string(), z.string()]),
  address: z.string(),
  distance: z.string().optional(),
  tags: z.array(z.string()).optional(),
  savedAt: z.string(),
});

export type Business = z.infer<typeof BusinessSchema>;

export const CustomListSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  businessIds: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CustomList = z.infer<typeof CustomListSchema>;

export const BusinessCardPropsSchema = z.object({
  business: z.string(),
  lists: z.array(z.string()),
  onRemove: z.string(),
  onAddToList: z.string(),
  onRemoveFromList: z.string(),
});

export type BusinessCardProps = z.infer<typeof BusinessCardPropsSchema>;

