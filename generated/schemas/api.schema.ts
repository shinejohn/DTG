// Generated Zod schema for api
import { z } from 'zod';

export const ApiResponseSchema = z.object({
  data: z.union([z.string(), z.string()]),
  error: z.union([z.string(), z.string()]),
  status: z.number(),
  isLoading: z.boolean(),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;

export const RequestOptionsSchema = z.object({
  headers: z.string().optional(),
  params: z.union([z.string(), z.number(), z.string()]).optional(),
  cache: z.string().optional(),
  signal: z.string().optional(),
});

export type RequestOptions = z.infer<typeof RequestOptionsSchema>;

