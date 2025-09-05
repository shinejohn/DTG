// Generated Zod schema for Rewards
import { z } from 'zod';

export const UserPointsSchema = z.object({
  current: z.number(),
  lifetime: z.number(),
  level: z.number(),
  nextLevelAt: z.number(),
  rank: z.string(),
});

export type UserPoints = z.infer<typeof UserPointsSchema>;

export const PointTransactionSchema = z.object({
  id: z.string(),
  type: z.union([z.string(), z.string(), z.string(), z.string()]),
  amount: z.number(),
  description: z.string(),
  businessName: z.string().optional(),
  businessId: z.string().optional(),
  date: z.string(),
  iconType: z.string().optional(),
});

export type PointTransaction = z.infer<typeof PointTransactionSchema>;

export const CouponSchema = z.object({
  id: z.string(),
  businessId: z.string(),
  businessName: z.string(),
  businessLogo: z.string().optional(),
  title: z.string(),
  description: z.string(),
  discount: z.string(),
  category: z.string(),
  expiresAt: z.string(),
  pointCost: z.number().optional(),
  isExclusive: z.boolean().optional(),
  isRecommended: z.boolean().optional(),
});

export type Coupon = z.infer<typeof CouponSchema>;

export const AchievementSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  progress: z.number(),
  total: z.number(),
  completedAt: z.string().optional(),
  pointReward: z.number(),
});

export type Achievement = z.infer<typeof AchievementSchema>;

export const UserAchievementSchema = z.object({
  isCompleted: z.boolean(),
  isNew: z.boolean().optional(),
});

export type UserAchievement = z.infer<typeof UserAchievementSchema>;

export const LeaderboardEntrySchema = z.object({
  userId: z.string(),
  username: z.string(),
  name: z.string(),
  avatar: z.string(),
  points: z.number(),
  rank: z.number(),
  isCurrentUser: z.boolean(),
});

export type LeaderboardEntry = z.infer<typeof LeaderboardEntrySchema>;

