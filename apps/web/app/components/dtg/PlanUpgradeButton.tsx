import type { Route } from './+types/route';
import React, { useState } from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

import { ChevronUpIcon, ZapIcon, StarIcon } from 'lucide-react';
interface PlanUpgradeButtonProps {
  currentPlan?: 'starter' | 'basic' | 'professional' | 'premium' | 'enterprise';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
export default function PlanUpgradeButton({
  currentPlan = 'starter',
  size = 'md',
  className = ''
}: PlanUpgradeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const getPlanInfo = () => {
    switch (currentPlan) {
      case 'starter':
        return {
          name: 'Starter',
          nextPlan: 'basic',
          nextPlanName: 'Basic',
          nextPlanPrice: '$10/mo',
          color: 'bg-gray-100 text-gray-800'
        };
      case 'basic':
        return {
          name: 'Basic',
          nextPlan: 'professional',
          nextPlanName: 'Professional',
          nextPlanPrice: '$29/mo',
          color: 'bg-blue-100 text-blue-800'
        };
      case 'professional':
        return {
          name: 'Professional',
          nextPlan: 'premium',
          nextPlanName: 'Premium',
          nextPlanPrice: '$79/mo',
          color: 'bg-indigo-100 text-indigo-800'
        };
      case 'premium':
        return {
          name: 'Premium',
          nextPlan: 'enterprise',
          nextPlanName: 'Enterprise',
          nextPlanPrice: '$199/mo',
          color: 'bg-purple-100 text-purple-800'
        };
      case 'enterprise':
        return {
          name: 'Enterprise',
          nextPlan: 'enterprise',
          nextPlanName: 'Enterprise',
          nextPlanPrice: 'Custom',
          color: 'bg-purple-100 text-purple-800'
        };
      default:
        return {
          name: 'Starter',
          nextPlan: 'basic',
          nextPlanName: 'Basic',
          nextPlanPrice: '$10/mo',
          color: 'bg-gray-100 text-gray-800'
        };
    }
  };
  const planInfo = getPlanInfo();
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };
  return <div className={`relative ${className}`}>
      <button onClick={() => setIsOpen(!isOpen)} className={`flex items-center font-medium rounded-md ${planInfo.color} ${sizeClasses[size]} hover:bg-opacity-80 transition-colors`}>
        <ZapIcon className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} mr-1`} />
        {planInfo.name} Plan
        <ChevronUpIcon className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} ml-1 transition-transform ${isOpen ? '' : 'transform rotate-180'}`} />
      </button>
      {isOpen && <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 border border-gray-200 overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">Current Plan:</span>
              <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${planInfo.color}`}>
                {planInfo.name}
              </span>
            </div>
            {currentPlan !== 'enterprise' && <div className="text-xs text-gray-500">
                Upgrade to unlock more features
              </div>}
          </div>
          {currentPlan !== 'enterprise' && <>
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center mb-2">
                  <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="font-medium">Recommended Upgrade</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">
                    {planInfo.nextPlanName} Plan
                  </span>
                  <span className="text-sm">{planInfo.nextPlanPrice}</span>
                </div>
                <div className="text-xs text-gray-600 mb-3">
                  {planInfo.nextPlan === 'basic' && 'Get unlimited photos and product listings'}
                  {planInfo.nextPlan === 'professional' && 'Unlock priority search placement and advanced analytics'}
                  {planInfo.nextPlan === 'premium' && 'Get multi-location support and custom branding'}
                  {planInfo.nextPlan === 'enterprise' && 'Custom solutions for large businesses'}
                </div>
                <Link to={`/pricing?plan=${planInfo.nextPlan}`} className="block w-full text-center bg-blue-600 text-white text-sm font-medium py-2 rounded-md hover:bg-blue-700">
                  Upgrade Now
                </Link>
              </div>
              <div className="p-3">
                <Link to="/pricing" className="block text-center text-blue-600 text-sm hover:text-blue-800">
                  View All Plans
                </Link>
              </div>
            </>}
          {currentPlan === 'enterprise' && <div className="p-4">
              <div className="text-center text-sm text-gray-600 mb-2">
                You're on our highest tier plan
              </div>
              <Link to="/contact" className="block w-full text-center bg-blue-600 text-white text-sm font-medium py-2 rounded-md hover:bg-blue-700">
                Contact Support
              </Link>
            </div>}
        </div>}
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