// Generated Zod schema for Alert
import { z } from 'zod';

export const AlertVariantSchema = z.object({
  value: z.union([z.string(), z.string(), z.string(), z.string()]),
});

export type AlertVariant = z.infer<typeof AlertVariantSchema>;

export const ToastPropsSchema = z.object({
  message: z.string(),
  duration: z.number().optional(),
  position: z.union([z.string(), z.string(), z.string(), z.string(), z.string(), z.string()]).optional(),
  onClose: z.string(),
});

export type ToastProps = z.infer<typeof ToastPropsSchema>;

