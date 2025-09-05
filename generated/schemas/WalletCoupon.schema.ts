// Generated Zod schema for WalletCoupon
import { z } from 'zod';

export const WalletCouponPropsSchema = z.object({
  coupon: z.union([z.string(), z.string(), z.string(), z.string()]),
  onAddToWallet: z.string().optional(),
  onCopyCode: z.string().optional(),
});

export type WalletCouponProps = z.infer<typeof WalletCouponPropsSchema>;

