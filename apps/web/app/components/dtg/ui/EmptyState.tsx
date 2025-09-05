import type { Route } from './+types/route';
import React from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Typography } from './Typography';
import { Button } from './Button';
export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}
export default function EmptyState({
  title,
  description,
  icon,
  action,
  secondaryAction,
  className = '',
  size = 'md'
}: EmptyStateProps) {
  // Size classes
  const sizeClasses = {
    sm: 'py-4 px-4',
    md: 'py-8 px-6',
    lg: 'py-12 px-8'
  };
  // Icon size classes
  const iconSizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };
  return <div className={`
      flex flex-col items-center justify-center text-center 
      bg-white rounded-lg border border-gray-200
      ${sizeClasses[size]}
      ${className}
    `}>
      {icon && <div className={`text-gray-400 mb-4 ${iconSizeClasses[size]}`}>
          {icon}
        </div>}
      <Typography variant={size === 'lg' ? 'h3' : size === 'md' ? 'h4' : 'h5'} className="mb-2">
        {title}
      </Typography>
      {description && <Typography variant="body2" color="light" className="mb-6 max-w-md">
          {description}
        </Typography>}
      {action && <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="primary" onClick={action.onClick} size={size === 'sm' ? 'sm' : 'md'}>
            {action.label}
          </Button>
          {secondaryAction && <Button variant="outline" onClick={secondaryAction.onClick} size={size === 'sm' ? 'sm' : 'md'}>
              {secondaryAction.label}
            </Button>}
        </div>}
    </div>;
}
// Specialized empty states for common scenarios
export function NoResultsEmptyState({
  onReset,
  searchTerm = '',
  size = 'md'
}: {
  onReset: () => void;
  searchTerm?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  return <EmptyState title={`No results found${searchTerm ? ` for "${searchTerm}"` : ''}`} description="Try adjusting your search or filter criteria to find what you're looking for." icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>} action={{
    label: 'Clear Filters',
    onClick: onReset
  }} size={size} />;
}
export function NoFavoritesEmptyState({
  onBrowse,
  size = 'md'
}: {
  onBrowse: () => void;
  size?: 'sm' | 'md' | 'lg';
}) {
  return <EmptyState title="No favorites yet" description="Save your favorite places to quickly access them later." icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>} action={{
    label: 'Browse Places',
    onClick: onBrowse
  }} size={size} />;
}
export function NoDealsEmptyState({
  onBrowse,
  size = 'md'
}: {
  onBrowse: () => void;
  size?: 'sm' | 'md' | 'lg';
}) {
  return <EmptyState title="No deals available" description="There are currently no deals matching your criteria. Check back later or browse all deals." icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a4 4 0 00-4-4H5.45a4 4 0 00-2.83 1.17l.01.01a4 4 0 001.17 6.44M12 8l-4.08.35M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>} action={{
    label: 'Browse All Deals',
    onClick: onBrowse
  }} size={size} />;
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