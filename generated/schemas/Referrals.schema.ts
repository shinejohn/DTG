// Generated Zod schema for Referrals
import { z } from 'zod';

export const ReferralSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().optional(),
  status: z.union([z.string(), z.string(), z.string(), z.string()]),
  invitedAt: z.string(),
  registeredAt: z.string().optional(),
  pointsEarned: z.number().optional(),
});

export type Referral = z.infer<typeof ReferralSchema>;

export const ReferralStatsSchema = z.object({
  totalInvites: z.number(),
  successfulReferrals: z.number(),
  pendingReferrals: z.number(),
  totalPointsEarned: z.number(),
  referralCode: z.string(),
  referralLink: z.string(),
  referralBonus: z.number(),
});

export type ReferralStats = z.infer<typeof ReferralStatsSchema>;

export const ReferralCampaignSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  bonus: z.number(),
  regularBonus: z.number(),
  expiresAt: z.string(),
  isActive: z.boolean(),
});

export type ReferralCampaign = z.infer<typeof ReferralCampaignSchema>;

