// Generated Zod schema for edit
import { z } from 'zod';

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
  services: z.array(z.string()).optional(),
  socialMedia: z.string().optional(),
  seo: z.array(z.string()).optional(),
});

export type Business = z.infer<typeof BusinessSchema>;

export const PhotoSchema = z.object({
  id: z.string(),
  url: z.string(),
  alt: z.string(),
  isPrimary: z.boolean().optional(),
  type: z.union([z.string(), z.string(), z.string(), z.string(), z.string(), z.string()]),
});

export type Photo = z.infer<typeof PhotoSchema>;

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

export const SocialLinksSchema = z.object({
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  youtube: z.string().optional(),
  yelp: z.string().optional(),
});

export type SocialLinks = z.infer<typeof SocialLinksSchema>;

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

export const ServiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.union([z.number(), z.string()]),
  duration: z.string().optional(),
  category: z.string(),
});

export type Service = z.infer<typeof ServiceSchema>;

export const FormSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  isCompleted: z.boolean(),
  component: z.string(),
});

export type FormSection = z.infer<typeof FormSectionSchema>;

