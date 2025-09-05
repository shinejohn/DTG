// Generated Zod schema for business
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

