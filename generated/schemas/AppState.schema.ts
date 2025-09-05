// Generated Zod schema for AppState
import { z } from 'zod';

export const AppStateSchema = z.object({
  user: z.union([z.string(), z.string(), z.string()]),
  ui: z.union([z.string(), z.string()]),
});

export type AppState = z.infer<typeof AppStateSchema>;

export const ActionSchema = z.object({
  value: z.union([z.string(), z.string(), z.string(), z.string()]),
});

export type Action = z.infer<typeof ActionSchema>;

