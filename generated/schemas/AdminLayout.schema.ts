// Generated Zod schema for AdminLayout
import { z } from 'zod';

export const AdminLayoutPropsSchema = z.object({
  children: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
});

export type AdminLayoutProps = z.infer<typeof AdminLayoutPropsSchema>;

