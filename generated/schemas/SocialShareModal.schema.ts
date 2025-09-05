// Generated Zod schema for SocialShareModal
import { z } from 'zod';

export const SocialShareModalPropsSchema = z.object({
  isOpen: z.boolean(),
  onClose: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  imageUrl: z.string().optional(),
});

export type SocialShareModalProps = z.infer<typeof SocialShareModalPropsSchema>;

