// Generated Zod schema for dashboard
import { z } from 'zod';

export const OverviewMetricSchema = z.object({
  label: z.string(),
  value: z.union([z.string(), z.number()]),
  change: z.number(),
  icon: z.string(),
});

export type OverviewMetric = z.infer<typeof OverviewMetricSchema>;

export const ReviewSchema = z.object({
  id: z.string(),
  userId: z.string(),
  userName: z.string(),
  userAvatar: z.string().optional(),
  rating: z.number(),
  date: z.string(),
  text: z.string(),
  photos: z.array(z.string()).optional(),
  isResponded: z.boolean(),
  response: z.string().optional(),
});

export type Review = z.infer<typeof ReviewSchema>;

export const PerformanceDataSchema = z.object({
  date: z.string(),
  views: z.number(),
  calls: z.number(),
  directions: z.number(),
});

export type PerformanceData = z.infer<typeof PerformanceDataSchema>;

export const CustomerInsightSchema = z.object({
  label: z.string(),
  value: z.union([z.string(), z.number()]),
  change: z.number(),
  icon: z.string().optional(),
});

export type CustomerInsight = z.infer<typeof CustomerInsightSchema>;

export const AISuggestionSchema = z.object({
  id: z.string(),
  type: z.union([z.string(), z.string(), z.string()]),
  title: z.string(),
  description: z.string(),
  impact: z.union([z.string(), z.string(), z.string()]),
  action: z.string().optional(),
  actionLink: z.string().optional(),
});

export type AISuggestion = z.infer<typeof AISuggestionSchema>;

export const BusinessSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  subcategory: z.string().optional(),
  coverImage: z.string(),
  logo: z.string().optional(),
  description: z.string(),
  completionPercentage: z.number(),
  verified: z.boolean(),
});

export type Business = z.infer<typeof BusinessSchema>;

export const CouponPerformanceSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  type: z.union([z.string(), z.string(), z.string(), z.string()]),
  value: z.number(),
  status: z.union([z.string(), z.string(), z.string()]),
  views: z.number(),
  redemptions: z.number(),
  redemptionRate: z.number(),
  revenue: z.number(),
  startDate: z.string(),
  endDate: z.string(),
});

export type CouponPerformance = z.infer<typeof CouponPerformanceSchema>;

export const LoyaltyProgramStatsSchema = z.object({
  totalMembers: z.number(),
  memberGrowth: z.number(),
  tierDistribution: z.array(z.string()),
  pointsIssued: z.number(),
  pointsRedeemed: z.number(),
  redemptionRate: z.number(),
  averageEngagement: z.number(),
  activeMembers: z.number(),
  activeMembersPercentage: z.number(),
});

export type LoyaltyProgramStats = z.infer<typeof LoyaltyProgramStatsSchema>;

export const AchievementParticipationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  participants: z.number(),
  completions: z.number(),
  completionRate: z.number(),
  category: z.string(),
  points: z.number(),
});

export type AchievementParticipation = z.infer<typeof AchievementParticipationSchema>;

export const RewardProgramROISchema = z.object({
  totalRevenue: z.number(),
  rewardInfluencedRevenue: z.number(),
  roiPercentage: z.number(),
  costOfRewards: z.number(),
  netProfit: z.number(),
  customerRetention: z.number(),
  repeatPurchaseRate: z.number(),
  averageOrderValue: z.number(),
  averageOrderValueChange: z.number(),
  lifetimeValue: z.number(),
  lifetimeValueChange: z.number(),
});

export type RewardProgramROI = z.infer<typeof RewardProgramROISchema>;

