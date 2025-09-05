// Generated Zod schema for useAsync
import { z } from 'zod';

export const UseAsyncStateSchema = z.object({
  data: z.union([z.string(), z.string()]),
  error: z.union([z.string(), z.string()]),
  isLoading: z.boolean(),
  isSuccess: z.boolean(),
  isError: z.boolean(),
});

export type UseAsyncState = z.infer<typeof UseAsyncStateSchema>;

export const UseAsyncOptionsSchema = z.object({
  immediate: z.boolean().optional(),
  onSuccess: z.string().optional(),
  onError: z.string().optional(),
});

export type UseAsyncOptions = z.infer<typeof UseAsyncOptionsSchema>;

