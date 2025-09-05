// Generated Zod schema for BrandContext
import { z } from 'zod';

export const BrandSchema = z.object({
  id: z.string(),
  name: z.string(),
  domain: z.string(),
  logo: z.string(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  isActive: z.boolean(),
  brandType: z.union([z.string(), z.string()]),
  isPrimary: z.boolean().optional(),
  features: z.string(),
  communities: z.array(z.string()),
  experience: z.array(z.string()),
  pageSections: z.array(z.string()).optional(),
});

export type Brand = z.infer<typeof BrandSchema>;

export const BrandContextTypeSchema = z.object({
  currentBrand: z.union([z.string(), z.string()]),
  setCurrentBrand: z.string(),
  brands: z.array(z.string()),
  setBrands: z.array(z.string()),
  primaryBrand: z.union([z.string(), z.string()]),
});

export type BrandContextType = z.infer<typeof BrandContextTypeSchema>;

