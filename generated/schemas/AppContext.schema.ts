// Generated Zod schema for AppContext
import { z } from 'zod';

export const AppStateSchema = z.object({
  user: z.union([z.string(), z.string(), z.string(), z.string()]),
  ui: z.array(z.union([z.string(), z.string(), z.string(), z.string(), z.string()])),
  preferences: z.string(),
});

export type AppState = z.infer<typeof AppStateSchema>;

export const ActionSchema = z.object({
  value: z.union([z.string(), z.string(), z.string(), z.string(), z.string(), z.string(), z.string(), z.string(), z.string(), z.string(), z.string()]),
});

export type Action = z.infer<typeof ActionSchema>;

