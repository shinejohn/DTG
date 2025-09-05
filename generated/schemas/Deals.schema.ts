// Generated Zod schema for Deals
import { z } from 'zod';

export const BusinessSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  subcategory: z.string().optional(),
  logo: z.string().optional(),
  rating: z.number(),
  reviewCount: z.number(),
  distance: z.number().optional(),
  location: z.string(),
  coordinates: z.string().optional(),
});

export type Business = z.infer<typeof BusinessSchema>;

export const DealSchema = z.object({
  id: z.string(),
  businessId: z.string(),
  business: z.string(),
  title: z.string(),
  description: z.string(),
  discountType: z.union([z.string(), z.string(), z.string(), z.string(), z.string()]),
  discountValue: z.number().optional(),
  discountCode: z.string().optional(),
  category: z.string(),
  expiresAt: z.string(),
  startDate: z.string(),
  isExclusive: z.boolean().optional(),
  isRecommended: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  pointCost: z.number().optional(),
  imageUrl: z.string().optional(),
  tags: z.array(z.string()),
  redemptionCount: z.number(),
  saveCount: z.number(),
});

export type Deal = z.infer<typeof DealSchema>;

export const FilterOptionsSchema = z.object({
  categories: z.array(z.string()),
  discountTypes: z.array(z.string()),
  sortBy: z.union([z.string(), z.string(), z.string(), z.string(), z.string()]),
  onlyExclusive: z.boolean(),
  maxDistance: z.number(),
  searchTerm: z.string(),
});

export type FilterOptions = z.infer<typeof FilterOptionsSchema>;

