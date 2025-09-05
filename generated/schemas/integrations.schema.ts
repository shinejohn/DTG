// Generated Zod schema for integrations
import { z } from 'zod';

export const BusinessSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  subcategory: z.string().optional(),
  logo: z.string().optional(),
});

export type Business = z.infer<typeof BusinessSchema>;

export const PlatformSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  connected: z.boolean(),
  lastSync: z.string().optional(),
  status: z.union([z.string(), z.string(), z.string(), z.string()]),
  stats: z.string().optional(),
});

export type Platform = z.infer<typeof PlatformSchema>;

export const NewsItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  source: z.string(),
  date: z.string(),
  image: z.string().optional(),
  url: z.string(),
  type: z.union([z.string(), z.string()]),
  sentiment: z.union([z.string(), z.string(), z.string()]).optional(),
});

export type NewsItem = z.infer<typeof NewsItemSchema>;

export const EventItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  location: z.string(),
  image: z.string().optional(),
  url: z.string(),
  status: z.union([z.string(), z.string(), z.string()]),
  attendees: z.number().optional(),
  sponsored: z.boolean().optional(),
});

export type EventItem = z.infer<typeof EventItemSchema>;

export const NotificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  message: z.string(),
  date: z.string(),
  platform: z.string(),
  read: z.boolean(),
  type: z.union([z.string(), z.string(), z.string(), z.string(), z.string()]),
  icon: z.string(),
});

export type Notification = z.infer<typeof NotificationSchema>;

export const ContentItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.union([z.string(), z.string(), z.string(), z.string()]),
  date: z.string(),
  platforms: z.array(z.string()),
  status: z.union([z.string(), z.string(), z.string()]),
  engagement: z.string().optional(),
});

export type ContentItem = z.infer<typeof ContentItemSchema>;

