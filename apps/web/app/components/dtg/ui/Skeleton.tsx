import type { Route } from './+types/route';
import React from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
}
export default function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
  animation = 'pulse'
}: SkeletonProps) {
  // Base classes
  const baseClasses = 'bg-gray-200';
  // Variant classes
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg'
  };
  // Animation classes
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'skeleton-wave',
    none: ''
  };
  // Combine classes
  const skeletonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${animationClasses[animation]}
    ${className}
  `.trim();
  // Default dimensions based on variant
  const getDefaultDimensions = () => {
    switch (variant) {
      case 'text':
        return {
          width: width || '100%',
          height: height || '1rem'
        };
      case 'circular':
        return {
          width: width || '2.5rem',
          height: height || '2.5rem'
        };
      case 'rectangular':
      case 'rounded':
        return {
          width: width || '100%',
          height: height || '6rem'
        };
      default:
        return {
          width,
          height
        };
    }
  };
  const dimensions = getDefaultDimensions();
  const style: React.CSSProperties = {
    width: dimensions.width,
    height: dimensions.height
  };
  return <div className={skeletonClasses} style={style} />;
}
// Create a skeleton for a card layout
export function CardSkeleton() {
  return <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <Skeleton variant="rectangular" height="12rem" animation="pulse" />
      <div className="p-4 space-y-3">
        <Skeleton variant="text" width="70%" height="1.5rem" animation="pulse" />
        <Skeleton variant="text" width="40%" animation="pulse" />
        <Skeleton variant="text" width="90%" animation="pulse" />
        <div className="flex space-x-2 pt-2">
          <Skeleton variant="rounded" width="4rem" height="1.5rem" animation="pulse" />
          <Skeleton variant="rounded" width="4rem" height="1.5rem" animation="pulse" />
        </div>
      </div>
    </div>;
}
// Create a skeleton for a list item
export function ListItemSkeleton() {
  return <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
      <Skeleton variant="circular" width="3rem" height="3rem" animation="pulse" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="60%" animation="pulse" />
        <Skeleton variant="text" width="80%" animation="pulse" />
        <Skeleton variant="text" width="40%" animation="pulse" />
      </div>
    </div>;
}
// Create a skeleton for text content
export function TextContentSkeleton({
  lines = 3
}) {
  return <div className="space-y-2">
      {Array.from({
      length: lines
    }).map((_, i) => <Skeleton key={i} variant="text" width={`${Math.floor(Math.random() * 40) + 60}%`} animation="pulse" />)}
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