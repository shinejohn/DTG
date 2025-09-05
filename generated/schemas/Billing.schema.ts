// Generated Zod schema for Billing
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  avatar: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const SubscriptionSchema = z.object({
  id: z.string(),
  planId: z.string(),
  planName: z.string(),
  status: z.union([z.string(), z.string(), z.string(), z.string()]),
  currentPeriodStart: z.string(),
  currentPeriodEnd: z.string(),
  cancelAtPeriodEnd: z.boolean(),
  trialEnd: z.string().optional(),
  billingCycle: z.union([z.string(), z.string()]),
  amount: z.number(),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;

export const PaymentMethodSchema = z.object({
  id: z.string(),
  type: z.union([z.string(), z.string()]),
  isDefault: z.boolean(),
  details: z.string(),
});

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;

export const InvoiceSchema = z.object({
  id: z.string(),
  number: z.string(),
  date: z.string(),
  amount: z.number(),
  status: z.union([z.string(), z.string(), z.string(), z.string(), z.string()]),
  description: z.string(),
  downloadUrl: z.string(),
});

export type Invoice = z.infer<typeof InvoiceSchema>;

export const UsageMetricSchema = z.object({
  name: z.string(),
  used: z.number(),
  limit: z.number(),
  unit: z.string(),
  icon: z.string(),
});

export type UsageMetric = z.infer<typeof UsageMetricSchema>;

export const PlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  monthlyPrice: z.number(),
  annualPrice: z.number(),
  features: z.array(z.string()),
  popular: z.boolean().optional(),
});

export type Plan = z.infer<typeof PlanSchema>;

