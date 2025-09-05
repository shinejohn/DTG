// Generated Zod schema for Settings
import { z } from 'zod';

export const ToggleSwitchPropsSchema = z.object({
  enabled: z.boolean(),
  onChange: z.string(),
  label: z.string(),
  description: z.string().optional(),
});

export type ToggleSwitchProps = z.infer<typeof ToggleSwitchPropsSchema>;

