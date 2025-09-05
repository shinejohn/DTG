// Generated Zod schema for Button
import { z } from 'zod';

export const ButtonVariantSchema = z.object({
  value: z.union([z.string(), z.string(), z.string(), z.string(), z.string(), z.string()]),
});

export type ButtonVariant = z.infer<typeof ButtonVariantSchema>;

export const ButtonSizeSchema = z.object({
  value: z.union([z.string(), z.string(), z.string()]),
});

export type ButtonSize = z.infer<typeof ButtonSizeSchema>;

export const ButtonPropsSchema = z.object({
  variant: z.string().optional(),
  size: z.string().optional(),
  isLoading: z.boolean().optional(),
  leftIcon: z.string().optional(),
  rightIcon: z.string().optional(),
  fullWidth: z.boolean().optional(),
  children: z.string(),
});

export type ButtonProps = z.infer<typeof ButtonPropsSchema>;

