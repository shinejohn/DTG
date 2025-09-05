// Generated Zod schema for [username]
import { z } from 'zod';

export const BadgeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  earnedAt: z.string(),
});

export type Badge = z.infer<typeof BadgeSchema>;

export const FriendSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
  avatar: z.string(),
});

export type Friend = z.infer<typeof FriendSchema>;

export const ReviewSchema = z.object({
  id: z.string(),
  businessId: z.string(),
  businessName: z.string(),
  businessImage: z.string(),
  rating: z.number(),
  content: z.string(),
  photos: z.array(z.string()),
  helpfulVotes: z.number(),
  createdAt: z.string(),
});

export type Review = z.infer<typeof ReviewSchema>;

export const PhotoSchema = z.object({
  id: z.string(),
  url: z.string(),
  businessId: z.string(),
  businessName: z.string(),
  caption: z.string().optional(),
  createdAt: z.string(),
});

export type Photo = z.infer<typeof PhotoSchema>;

export const CheckInSchema = z.object({
  id: z.string(),
  businessId: z.string(),
  businessName: z.string(),
  businessImage: z.string(),
  comment: z.string().optional(),
  createdAt: z.string(),
});

export type CheckIn = z.infer<typeof CheckInSchema>;

export const FavoriteSchema = z.object({
  id: z.string(),
  businessId: z.string(),
  businessName: z.string(),
  businessImage: z.string(),
  businessCategory: z.string(),
  createdAt: z.string(),
});

export type Favorite = z.infer<typeof FavoriteSchema>;

export const RewardsSummarySchema = z.object({
  pointsBalance: z.number(),
  lifetimePoints: z.number(),
  level: z.string(),
  nextLevel: z.string(),
  pointsToNextLevel: z.number(),
  progressPercentage: z.number(),
  recentPointsActivity: z.array(z.union([z.string(), z.string(), z.string()])),
});

export type RewardsSummary = z.infer<typeof RewardsSummarySchema>;

export const AchievementSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  progress: z.number(),
  total: z.number(),
  completed: z.boolean(),
  earnedAt: z.string().optional(),
  category: z.union([z.string(), z.string(), z.string(), z.string(), z.string()]),
  points: z.number(),
});

export type Achievement = z.infer<typeof AchievementSchema>;

export const LoyaltyMembershipSchema = z.object({
  id: z.string(),
  businessId: z.string(),
  businessName: z.string(),
  businessImage: z.string(),
  tier: z.string(),
  pointsBalance: z.number(),
  memberSince: z.string(),
  perks: z.array(z.string()),
});

export type LoyaltyMembership = z.infer<typeof LoyaltyMembershipSchema>;

export const LeaderboardPositionSchema = z.object({
  rank: z.number(),
  totalParticipants: z.number(),
  category: z.string(),
  points: z.number(),
  trend: z.union([z.string(), z.string(), z.string()]),
  friendsAhead: z.array(z.string()),
  friendsBehind: z.array(z.string()),
});

export type LeaderboardPosition = z.infer<typeof LeaderboardPositionSchema>;

export const UserProfileSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
  avatar: z.string(),
  coverPhoto: z.string(),
  bio: z.string(),
  location: z.string(),
  memberSince: z.string(),
  isVerified: z.boolean(),
  stats: z.string(),
  badges: z.array(z.string()),
  friends: z.array(z.string()),
  reviews: z.array(z.string()),
  photos: z.array(z.string()),
  checkIns: z.array(z.string()),
  favorites: z.array(z.string()),
  rewardsSummary: z.string().optional(),
  achievements: z.array(z.string()).optional(),
  loyaltyMemberships: z.array(z.string()).optional(),
  leaderboardPosition: z.string().optional(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

