// Generated Zod schema for ErrorBoundary
import { z } from 'zod';

export const StateSchema = z.object({
  hasError: z.boolean(),
  error: z.union([z.string(), z.string()]),
});

export type State = z.infer<typeof StateSchema>;

export const PropsSchema = z.object({
  children: z.string(),
});

export type Props = z.infer<typeof PropsSchema>;

