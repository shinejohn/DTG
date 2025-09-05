// Generated Zod schema for Icon
import { z } from 'zod';

export const IconPropsSchema = z.object({
  name: z.string(),
  size: z.number().optional(),
  className: z.string().optional(),
});

export type IconProps = z.infer<typeof IconPropsSchema>;

