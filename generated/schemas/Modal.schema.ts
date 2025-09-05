// Generated Zod schema for Modal
import { z } from 'zod';

export const ModalPropsSchema = z.object({
  isOpen: z.boolean(),
  onClose: z.string(),
  title: z.string().optional(),
  children: z.string(),
  footer: z.string().optional(),
  size: z.union([z.string(), z.string(), z.string(), z.string(), z.string()]).optional(),
  closeOnOverlayClick: z.boolean().optional(),
  closeOnEsc: z.boolean().optional(),
});

export type ModalProps = z.infer<typeof ModalPropsSchema>;

