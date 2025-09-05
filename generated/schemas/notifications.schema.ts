// Generated Zod schema for notifications
import { z } from 'zod';

export const NotificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  message: z.string(),
  type: z.union([z.string(), z.string(), z.string(), z.string(), z.string()]),
  priority: z.union([z.string(), z.string(), z.string()]),
  read: z.boolean(),
  date: z.string(),
});

export type Notification = z.infer<typeof NotificationSchema>;

