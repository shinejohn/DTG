// Generated Zod schema for ActiveSessions
import { z } from 'zod';

export const SessionSchema = z.object({
  id: z.string(),
  device: z.union([z.string(), z.string(), z.string(), z.string()]),
  location: z.string(),
  lastActive: z.string(),
  isCurrentSession: z.boolean(),
});

export type Session = z.infer<typeof SessionSchema>;

