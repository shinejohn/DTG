// Generated Zod schema for CitySearchBar
import { z } from 'zod';

export const CitySearchBarPropsSchema = z.object({
  onCitySelect: z.string(),
});

export type CitySearchBarProps = z.infer<typeof CitySearchBarPropsSchema>;

