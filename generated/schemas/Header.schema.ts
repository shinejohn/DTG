// Generated Zod schema for Header
import { z } from 'zod';

export const HeaderPropsSchema = z.object({
  siteName: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  showHero: z.boolean().optional(),
  backgroundImage: z.string().optional(),
});

export type HeaderProps = z.infer<typeof HeaderPropsSchema>;

