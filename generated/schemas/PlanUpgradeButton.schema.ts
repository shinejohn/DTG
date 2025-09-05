// Generated Zod schema for PlanUpgradeButton
import { z } from 'zod';

export const PlanUpgradeButtonPropsSchema = z.object({
  currentPlan: z.union([z.string(), z.string(), z.string(), z.string(), z.string()]).optional(),
  size: z.union([z.string(), z.string(), z.string()]).optional(),
  className: z.string().optional(),
});

export type PlanUpgradeButtonProps = z.infer<typeof PlanUpgradeButtonPropsSchema>;

