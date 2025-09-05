// Generated Zod schema for DealDetail
import { z } from 'zod';

export const DealSchema = z.object({
  id: z.string(),
  businessId: z.string(),
  title: z.string(),
  description: z.string(),
  discount: z.string(),
  expiryDate: z.string(),
  code: z.string(),
  howToRedeem: z.string().optional(),
  termsAndConditions: z.string().optional(),
  isExclusive: z.boolean(),
  isPopular: z.boolean(),
  isRecommended: z.boolean(),
  redemptionCount: z.number(),
  pointsCost: z.number().optional(),
  business: z.string(),
  relatedDeals: z.array(z.string()).optional(),
});

export type Deal = z.infer<typeof DealSchema>;

