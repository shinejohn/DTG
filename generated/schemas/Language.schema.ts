// Generated Zod schema for Language
import { z } from 'zod';

export const LanguageOptionSchema = z.object({
  code: z.string(),
  name: z.string(),
  localName: z.string(),
  flag: z.string(),
});

export type LanguageOption = z.infer<typeof LanguageOptionSchema>;

