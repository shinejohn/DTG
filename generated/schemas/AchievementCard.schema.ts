// Generated Zod schema for AchievementCard
import { z } from 'zod';

export const AchievementCardPropsSchema = z.object({
  achievement: z.union([z.string(), z.string(), z.string()]),
  onClick: z.string().optional(),
  variant: z.union([z.string(), z.string()]).optional(),
  className: z.string().optional(),
});

export type AchievementCardProps = z.infer<typeof AchievementCardPropsSchema>;

