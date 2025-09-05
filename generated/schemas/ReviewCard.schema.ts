// Generated Zod schema for ReviewCard
import { z } from 'zod';

export const ReviewCardPropsSchema = z.object({
  review: z.array(z.string()),
  onMarkHelpful: z.string().optional(),
  onReply: z.string().optional(),
  isBusinessOwner: z.boolean().optional(),
  className: z.string().optional(),
});

export type ReviewCardProps = z.infer<typeof ReviewCardPropsSchema>;

