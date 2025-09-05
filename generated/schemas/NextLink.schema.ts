// Generated Zod schema for NextLink
import { z } from 'zod';

export const LinkPropsSchema = z.object({
  to: z.string(),
  children: z.string(),
  className: z.string().optional(),
  onClick: z.string().optional(),
});

export type LinkProps = z.infer<typeof LinkPropsSchema>;

