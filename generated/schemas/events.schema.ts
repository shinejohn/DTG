// Generated Zod schema for events
import { z } from 'zod';

export const BusinessSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  subcategory: z.string().optional(),
  logo: z.string().optional(),
});

export type Business = z.infer<typeof BusinessSchema>;

export const EventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  endDate: z.string().optional(),
  location: z.string(),
  imageUrl: z.string().optional(),
  status: z.union([z.string(), z.string(), z.string(), z.string(), z.string()]),
  eventType: z.union([z.string(), z.string(), z.string()]),
  capacity: z.number().optional(),
  attendees: z.number().optional(),
  ticketPrice: z.number().optional(),
  isFree: z.boolean().optional(),
  visibility: z.union([z.string(), z.string(), z.string()]),
  organizer: z.string(),
  tags: z.array(z.string()).optional(),
  syncedWith: z.array(z.string()).optional(),
});

export type Event = z.infer<typeof EventSchema>;

export const SponsorSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string().optional(),
  eventId: z.string(),
  sponsorshipLevel: z.union([z.string(), z.string(), z.string(), z.string(), z.string()]),
  contribution: z.number(),
  benefits: z.array(z.string()),
  status: z.union([z.string(), z.string(), z.string()]),
});

export type Sponsor = z.infer<typeof SponsorSchema>;

export const SponsorshipOpportunitySchema = z.object({
  id: z.string(),
  eventName: z.string(),
  eventId: z.string(),
  organizerName: z.string(),
  date: z.string(),
  location: z.string(),
  imageUrl: z.string().optional(),
  sponsorshipLevels: z.array(z.array(z.string())),
  attendeeCount: z.number().optional(),
  description: z.string(),
  applicationDeadline: z.string(),
  status: z.union([z.string(), z.string(), z.string()]),
});

export type SponsorshipOpportunity = z.infer<typeof SponsorshipOpportunitySchema>;

export const EventMetricsSchema = z.object({
  viewCount: z.number(),
  registrationCount: z.number(),
  attendanceCount: z.number(),
  engagementRate: z.number(),
  ticketRevenue: z.number().optional(),
  demographicData: z.array(z.array(z.string())).optional(),
});

export type EventMetrics = z.infer<typeof EventMetricsSchema>;

