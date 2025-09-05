// Generated Zod schema for Challenges
import { z } from 'zod';

export const ChallengeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.union([z.string(), z.string(), z.string(), z.string(), z.string()]),
  type: z.union([z.string(), z.string(), z.string(), z.string(), z.string(), z.string()]),
  startDate: z.string(),
  endDate: z.string(),
  status: z.union([z.string(), z.string(), z.string(), z.string()]),
  progress: z.number().optional(),
  total: z.number(),
  participants: z.number(),
  rewards: z.string(),
  business: z.string().optional(),
  leaderboard: z.array(z.string()).optional(),
  milestones: z.array(z.string()).optional(),
  joinedAt: z.string().optional(),
  completedAt: z.string().optional(),
  friendsParticipating: z.array(z.string()).optional(),
});

export type Challenge = z.infer<typeof ChallengeSchema>;

