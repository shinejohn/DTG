// Generated Zod schema for Sidebar
import { z } from 'zod';

export const AdminSidebarPropsSchema = z.object({
  activePanel: z.string().optional(),
  setActivePanel: z.string().optional(),
});

export type AdminSidebarProps = z.infer<typeof AdminSidebarPropsSchema>;

