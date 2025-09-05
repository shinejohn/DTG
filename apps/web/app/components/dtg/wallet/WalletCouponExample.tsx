import React from 'react';
import { WalletCoupon } from './WalletCoupon';
export default function WalletCouponExample() {
  // Example coupon data
  const exampleCoupon = {
    id: 'coupon123',
    title: 'Summer Special: 20% Off',
    description: 'Get 20% off on all menu items this summer!',
    code: 'SUMMER20',
    discount: {
      type: 'percentage' as const,
      value: 20
    },
    validity: {
      startDate: '2023-06-01T00:00:00Z',
      endDate: '2023-08-31T23:59:59Z',
      isActive: true
    },
    business: {
      name: 'Urban Bites Café',
      logo: 'https://images.unsplash.com/photo-1514537099923-4c9672455d4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      location: 'Downtown'
    },
    displayOptions: {
      primaryColor: '#3B82F6',
      secondaryColor: '#F9FAFB',
      textColor: 'white'
    }
  };
  const handleAddToWallet = () => {
    // In a real app, this would trigger the wallet pass generation
    // and then prompt the user to add it to their digital wallet
    console.log('Adding coupon to wallet:', exampleCoupon.code);
    alert('Adding to wallet: ' + exampleCoupon.code);
  };
  const handleCopyCode = () => {
    console.log('Coupon code copied:', exampleCoupon.code);
    alert('Code copied to clipboard: ' + exampleCoupon.code);
  };
  return <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Digital Wallet Coupon
      </h1>
      <p className="text-center mb-8 text-gray-600">
        Click or tap on the coupon to flip it and see the redemption details.
      </p>
      <WalletCoupon coupon={exampleCoupon} onAddToWallet={handleAddToWallet} onCopyCode={handleCopyCode} />
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Note: This is a visual representation only.</p>
        <p>
          Server-side implementation is required to generate actual wallet
          passes.
        </p>
      </div>
    </div>;
}
