// Generated Zod schema for BrandConfiguration
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
  features: z.string(),
  communities: z.array(z.string()).optional(),
  experience: z.array(z.string()).optional(),
  pageSections: z.array(z.string()).optional(),
});

export type Brand = z.infer<typeof BrandSchema>;

