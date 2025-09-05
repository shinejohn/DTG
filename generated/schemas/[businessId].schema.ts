// Generated Zod schema for [businessId]
import { z } from 'zod';

export const BusinessSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  subcategory: z.string().optional(),
  image: z.string(),
  address: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
});

export type Business = z.infer<typeof BusinessSchema>;

export const ReviewFormSchema = z.object({
  overallRating: z.number(),
  categoryRatings: z.string(),
  title: z.string(),
  content: z.string(),
  photos: z.array(z.string()),
  photoPreviewUrls: z.array(z.string()),
  tags: z.array(z.string()),
  visitDate: z.string().optional(),
  isAnonymous: z.boolean(),
});

export type ReviewForm = z.infer<typeof ReviewFormSchema>;

