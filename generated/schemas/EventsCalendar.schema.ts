// Generated Zod schema for EventsCalendar
import { z } from 'zod';

export const EventSchema = z.object({
  id: z.number(),
  title: z.string(),
  date: z.string(),
  dateObj: z.date(),
  location: z.string(),
  image: z.string(),
  description: z.string(),
  category: z.string(),
  attendees: z.number(),
  price: z.string(),
  duration: z.string().optional(),
  weather: z.union([z.string(), z.string(), z.string()]).optional(),
  coordinates: z.string().optional(),
});

export type Event = z.infer<typeof EventSchema>;

export const EventsCalendarPropsSchema = z.object({
  events: z.array(z.string()),
  onFilterChange: z.string(),
});

export type EventsCalendarProps = z.infer<typeof EventsCalendarPropsSchema>;

