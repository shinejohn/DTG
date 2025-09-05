// Generated Zod schema for Pagination
import { z } from 'zod';

export const PaginationPropsSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  onPageChange: z.string(),
  siblingCount: z.number().optional(),
  showFirstLast: z.boolean().optional(),
  size: z.union([z.string(), z.string(), z.string()]).optional(),
  className: z.string().optional(),
  prevLabel: z.string().optional(),
  nextLabel: z.string().optional(),
});

export type PaginationProps = z.infer<typeof PaginationPropsSchema>;

