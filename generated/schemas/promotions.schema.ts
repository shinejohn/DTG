// Generated Zod schema for promotions
import { z } from 'zod';

export const BusinessSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  subcategory: z.string().optional(),
  logo: z.string().optional(),
});

export type Business = z.infer<typeof BusinessSchema>;

export const PromotionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  type: z.union([z.string(), z.string(), z.string(), z.string(), z.string()]),
  discountType: z.union([z.string(), z.string()]).optional(),
  discountValue: z.number().optional(),
  code: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  isActive: z.boolean(),
  isPaused: z.boolean().optional(),
  isRecurring: z.boolean().optional(),
  recurrencePattern: z.string().optional(),
  targetAudience: z.string().optional(),
  redemptionLimit: z.number().optional(),
  redemptionCount: z.number(),
  viewCount: z.number(),
  saveCount: z.number(),
  imageUrl: z.string().optional(),
});

export type Promotion = z.infer<typeof PromotionSchema>;

