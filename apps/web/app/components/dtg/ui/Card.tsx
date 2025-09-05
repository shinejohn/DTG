import type { Route } from './+types/route';
import React from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'small' | 'medium' | 'large';
  isHoverable?: boolean;
}
export default function Card({
  children,
  className = '',
  variant = 'default',
  padding = 'medium',
  isHoverable = false,
  ...props
}: CardProps) {
  // Base classes
  const baseClasses = 'bg-white rounded-lg overflow-hidden';
  // Variant classes
  const variantClasses = {
    default: '',
    bordered: 'border border-gray-200',
    elevated: 'shadow-sm'
  };
  // Padding classes
  const paddingClasses = {
    none: '',
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6'
  };
  // Hover effect
  const hoverClass = isHoverable ? 'transition-shadow hover:shadow-md' : '';
  // Combine classes
  const cardClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${paddingClasses[padding]}
    ${hoverClass}
    ${className}
  `.trim();
  return <div className={cardClasses} {...props}>
      {children}
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