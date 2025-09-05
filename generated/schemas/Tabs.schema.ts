// Generated Zod schema for Tabs
import { z } from 'zod';

export const TabSchema = z.object({
  id: z.string(),
  label: z.string(),
  content: z.string(),
  disabled: z.boolean().optional(),
  icon: z.string().optional(),
});

export type Tab = z.infer<typeof TabSchema>;

export const TabsPropsSchema = z.object({
  tabs: z.array(z.string()),
  defaultTab: z.string().optional(),
  onChange: z.string().optional(),
  variant: z.union([z.string(), z.string(), z.string(), z.string()]).optional(),
  size: z.union([z.string(), z.string(), z.string()]).optional(),
  alignment: z.union([z.string(), z.string(), z.string(), z.string()]).optional(),
  className: z.string().optional(),
  tabsClassName: z.string().optional(),
  contentClassName: z.string().optional(),
});

export type TabsProps = z.infer<typeof TabsPropsSchema>;

