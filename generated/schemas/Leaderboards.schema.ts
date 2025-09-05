// Generated Zod schema for Leaderboards
import { z } from 'zod';

export const LeaderboardEntrySchema = z.object({
  userId: z.string(),
  username: z.string(),
  name: z.string(),
  avatar: z.string(),
  points: z.number(),
  reviewCount: z.number(),
  checkInCount: z.number(),
  achievementCount: z.number(),
  rank: z.number(),
  previousRank: z.number().optional(),
  isCurrentUser: z.boolean(),
  isFriend: z.boolean().optional(),
});

export type LeaderboardEntry = z.infer<typeof LeaderboardEntrySchema>;

export const ChallengeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  category: z.union([z.string(), z.string(), z.string(), z.string()]),
  participants: z.number(),
  leaderboard: z.array(z.string()),
});

export type Challenge = z.infer<typeof ChallengeSchema>;

