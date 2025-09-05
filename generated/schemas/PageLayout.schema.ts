// Generated Zod schema for PageLayout
import { z } from 'zod';

export const PageLayoutPropsSchema = z.object({
  children: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  showHeader: z.boolean().optional(),
  showFooter: z.boolean().optional(),
  className: z.string().optional(),
});

export type PageLayoutProps = z.infer<typeof PageLayoutPropsSchema>;

