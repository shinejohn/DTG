// Generated Zod schema for Layout
import { z } from 'zod';

export const LayoutPropsSchema = z.object({
  children: z.string(),
  showHero: z.boolean().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  backgroundImage: z.string().optional(),
  hideFooter: z.boolean().optional(),
});

export type LayoutProps = z.infer<typeof LayoutPropsSchema>;

