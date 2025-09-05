// Generated Zod schema for Pricing
import { z } from 'zod';

export const PricingPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  monthlyPrice: z.union([z.number(), z.string()]),
  annualPrice: z.union([z.number(), z.string()]),
  features: z.array(z.union([z.string(), z.string()])),
  popular: z.boolean().optional(),
  buttonText: z.string(),
  buttonLink: z.string(),
  featureCategories: z.array(z.array(z.union([z.string(), z.string()]))).optional(),
});

export type PricingPlan = z.infer<typeof PricingPlanSchema>;

export const FAQSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export type FAQ = z.infer<typeof FAQSchema>;

