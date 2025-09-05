// Generated Zod schema for coupons
import { z } from 'zod';

export const CouponSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  code: z.string(),
  discount: z.union([z.string(), z.string(), z.string(), z.string()]),
  constraints: z.string(),
  targeting: z.array(z.string()),
  validity: z.string(),
  performance: z.string(),
  createdAt: z.string(),
  lastModified: z.string(),
  template: z.string().optional(),
  categoryTags: z.array(z.string()),
  displayOptions: z.string(),
});

export type Coupon = z.infer<typeof CouponSchema>;

export const CouponTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.union([z.string(), z.string(), z.string(), z.string()]),
  defaultDiscount: z.number(),
  image: z.string(),
  primaryColor: z.string(),
  secondaryColor: z.string().optional(),
  popularityScore: z.number(),
  categoryTags: z.array(z.string()),
});

export type CouponTemplate = z.infer<typeof CouponTemplateSchema>;

export const CustomerSegmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  count: z.number(),
  criteria: z.array(z.string()),
});

export type CustomerSegment = z.infer<typeof CustomerSegmentSchema>;

