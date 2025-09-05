// Generated Zod schema for loyalty
import { z } from 'zod';

export const LoyaltyProgramSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.union([z.string(), z.string(), z.string()]),
  pointsSettings: z.union([z.string(), z.string(), z.string(), z.string()]),
  tiers: z.array(z.string()),
  rewards: z.array(z.string()),
  joinBonus: z.number(),
  referralBonus: z.string(),
  birthdayBonus: z.number(),
  createdAt: z.string(),
  lastModified: z.string(),
  stats: z.string(),
});

export type LoyaltyProgram = z.infer<typeof LoyaltyProgramSchema>;

export const LoyaltyTierSchema = z.object({
  id: z.string(),
  name: z.string(),
  threshold: z.number(),
  benefits: z.array(z.string()),
  color: z.string(),
  icon: z.string(),
  multiplier: z.number(),
});

export type LoyaltyTier = z.infer<typeof LoyaltyTierSchema>;

export const LoyaltyRewardSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  pointsCost: z.number(),
  type: z.union([z.string(), z.string(), z.string(), z.string()]),
  value: z.union([z.number(), z.string()]),
  image: z.string().optional(),
  restrictions: z.array(z.string()).optional(),
  availability: z.union([z.string(), z.string()]),
  quantityAvailable: z.number().optional(),
  quantityRedeemed: z.number(),
  tierRestriction: z.array(z.string()).optional(),
  isActive: z.boolean(),
  createdAt: z.string(),
});

export type LoyaltyReward = z.infer<typeof LoyaltyRewardSchema>;

export const LoyaltyMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  pointsBalance: z.number(),
  lifetimePoints: z.number(),
  tier: z.string(),
  joinDate: z.string(),
  lastActive: z.string(),
  totalSpent: z.number(),
  visitsCount: z.number(),
  birthdayMonth: z.number().optional(),
  birthdayDay: z.number().optional(),
  rewardHistory: z.array(z.string()),
  pointsHistory: z.array(z.union([z.string(), z.string(), z.string(), z.string()])),
});

export type LoyaltyMember = z.infer<typeof LoyaltyMemberSchema>;

export const PointsActivitySchema = z.object({
  id: z.string(),
  memberId: z.string(),
  memberName: z.string(),
  amount: z.number(),
  type: z.union([z.string(), z.string(), z.string(), z.string()]),
  description: z.string(),
  date: z.string(),
  orderId: z.string().optional(),
  rewardId: z.string().optional(),
  adjustedBy: z.string().optional(),
});

export type PointsActivity = z.infer<typeof PointsActivitySchema>;

