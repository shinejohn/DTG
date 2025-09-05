// Generated Zod schema for Achievements
import { z } from 'zod';

export const AchievementSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.union([z.string(), z.string(), z.string(), z.string(), z.string()]),
  icon: z.string(),
  progress: z.number(),
  total: z.number(),
  completedAt: z.string().optional(),
  pointReward: z.number(),
  badgeUrl: z.string().optional(),
  isCompleted: z.boolean(),
  isNew: z.boolean().optional(),
  isSecret: z.boolean().optional(),
  requirements: z.array(z.string()).optional(),
  businessId: z.string().optional(),
  businessName: z.string().optional(),
});

export type Achievement = z.infer<typeof AchievementSchema>;

export const FriendSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  avatar: z.string(),
  achievements: z.array(z.string()),
});

export type Friend = z.infer<typeof FriendSchema>;

