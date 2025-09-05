import type { Route } from './+types/route';
import React from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  icon?: React.ReactNode;
}
export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  icon,
  className = '',
  ...props
}: BadgeProps) {
  // Base classes
  const baseClasses = 'inline-flex items-center font-medium';
  // Variant classes
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-purple-100 text-purple-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-cyan-100 text-cyan-800'
  };
  // Size classes
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5'
  };
  // Rounded class
  const roundedClass = rounded ? 'rounded-full' : 'rounded-md';
  // Combine classes
  const badgeClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${roundedClass}
    ${className}
  `.trim();
  return <span className={badgeClasses} {...props}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>;
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