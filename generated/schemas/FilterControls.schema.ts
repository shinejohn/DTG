// Generated Zod schema for FilterControls
import { z } from 'zod';

export const FilterOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.union([z.string(), z.string(), z.string(), z.string(), z.string()]),
  options: z.string().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
});

export type FilterOption = z.infer<typeof FilterOptionSchema>;

export const FilterControlsPropsSchema = z.object({
  filters: z.array(z.string()),
  activeFilters: z.string(),
  onFilterChange: z.string(),
  onClearFilter: z.string(),
  onClearAll: z.string(),
  onApplyFilters: z.string().optional(),
  className: z.string().optional(),
  isMobile: z.boolean().optional(),
  onClose: z.string().optional(),
});

export type FilterControlsProps = z.infer<typeof FilterControlsPropsSchema>;

