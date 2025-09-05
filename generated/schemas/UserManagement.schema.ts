// Generated Zod schema for UserManagement
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.union([z.string(), z.string(), z.string(), z.string()]),
  status: z.union([z.string(), z.string(), z.string(), z.string()]),
  joinDate: z.string(),
  lastActive: z.string(),
  profileImage: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

