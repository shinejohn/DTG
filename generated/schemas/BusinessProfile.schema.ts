// Generated Zod schema for BusinessProfile
import { z } from 'zod';

export const BusinessHoursSchema = z.object({
  monday: z.string(),
  tuesday: z.string(),
  wednesday: z.string(),
  thursday: z.string(),
  friday: z.string(),
  saturday: z.string(),
  sunday: z.string(),
  holidayHours: z.string().optional(),
});

export type BusinessHours = z.infer<typeof BusinessHoursSchema>;

export const PhotoSchema = z.object({
  id: z.string(),
  url: z.string(),
  alt: z.string(),
  isPrimary: z.boolean().optional(),
  type: z.union([z.string(), z.string(), z.string(), z.string(), z.string(), z.string()]),
});

export type Photo = z.infer<typeof PhotoSchema>;

export const MenuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  photoUrl: z.string().optional(),
  popular: z.boolean().optional(),
});

export type MenuItem = z.infer<typeof MenuItemSchema>;

export const SocialLinksSchema = z.object({
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  youtube: z.string().optional(),
  yelp: z.string().optional(),
});

export type SocialLinks = z.infer<typeof SocialLinksSchema>;

export const ReviewSchema = z.object({
  id: z.string(),
  authorName: z.string(),
  authorImage: z.string().optional(),
  rating: z.number(),
  date: z.string(),
  content: z.string(),
  helpful: z.number(),
  images: z.array(z.string()).optional(),
  response: z.string().optional(),
});

export type Review = z.infer<typeof ReviewSchema>;

export const ArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
  publishDate: z.string(),
  author: z.string(),
  source: z.string(),
  sourceUrl: z.string(),
  imageUrl: z.string().optional(),
  tags: z.array(z.string()),
  category: z.string(),
});

export type Article = z.infer<typeof ArticleSchema>;

export const EventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  location: z.string(),
  address: z.string(),
  imageUrl: z.string().optional(),
  organizer: z.string(),
  price: z.string().optional(),
  ticketUrl: z.string().optional(),
  tags: z.array(z.string()),
  capacity: z.number().optional(),
  attendees: z.number().optional(),
});

export type Event = z.infer<typeof EventSchema>;

export const BusinessSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  subcategory: z.string().optional(),
  description: z.string(),
  shortDescription: z.string(),
  contact: z.string(),
  hours: z.string(),
  features: z.array(z.string()),
  amenities: z.array(z.string()),
  paymentMethods: z.array(z.string()),
  priceRange: z.union([z.string(), z.string(), z.string(), z.string()]),
  photos: z.array(z.string()),
  menu: z.array(z.string()).optional(),
  socialMedia: z.string().optional(),
  reviews: z.array(z.string()).optional(),
  articles: z.array(z.string()).optional(),
  events: z.array(z.string()).optional(),
  rating: z.number().optional(),
  reviewCount: z.number().optional(),
  status: z.union([z.string(), z.string(), z.string(), z.string()]),
  verified: z.boolean(),
  featured: z.boolean(),
});

export type Business = z.infer<typeof BusinessSchema>;

export const BusinessProfilePropsSchema = z.object({
  slug: z.string(),
});

export type BusinessProfileProps = z.infer<typeof BusinessProfilePropsSchema>;

