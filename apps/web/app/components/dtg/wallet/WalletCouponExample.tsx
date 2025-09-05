import type { Route } from './+types/route';
import React from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
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
export async function loader({ params, request }: Route.LoaderArgs) {
  const { supabase, headers } = getSupabaseServerClient(request);
  
  try {
    const { data: items, error } = await supabase
      .from('businesses')
      .select('*')
      .limit(10);

    if (error) {
      console.error('Error fetching data:', error);
    }

    return json({
      items: items || []
    }, { headers });
  } catch (error) {
    console.error('Loader error:', error);
    return json({
      items: []
    }, { headers });
  }
}
export function ErrorBoundary() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600">{error.status}</h1>
          <h2 className="text-xl font-semibold mt-2">{error.statusText}</h2>
          <p className="text-gray-600 mt-4">{error.data}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Error</h1>
        <p className="text-gray-600 mt-4">Something went wrong</p>
        <p className="text-sm text-gray-500 mt-2">{error?.message}</p>
      </div>
    </div>
  );
}