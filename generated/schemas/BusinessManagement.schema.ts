// Generated Zod schema for BusinessManagement
import { z } from 'zod';

export const BusinessSchema = z.object({
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  category: z.string(),
  subcategory: z.string().optional(),
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  website: z.string().optional(),
  status: z.union([z.string(), z.string(), z.string(), z.string()]),
  verified: z.boolean(),
  featured: z.boolean(),
  createdDate: z.string(),
  logo: z.string().optional(),
});

export type Business = z.infer<typeof BusinessSchema>;

