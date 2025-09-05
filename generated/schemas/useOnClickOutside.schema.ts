// Generated Zod schema for useOnClickOutside
import { z } from 'zod';

export const EventSchema = z.object({
  value: z.union([z.string(), z.string()]),
});

export type Event = z.infer<typeof EventSchema>;

