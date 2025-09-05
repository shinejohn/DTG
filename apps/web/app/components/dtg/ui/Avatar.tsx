import type { Route } from './+types/route';
import React, { useState, isValidElement } from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square' | 'rounded';
  fallback?: string | React.ReactNode;
  className?: string;
  status?: 'online' | 'offline' | 'away' | 'busy' | 'none';
  bordered?: boolean;
  onClick?: () => void;
}
export default function Avatar({
  src,
  alt = '',
  size = 'md',
  shape = 'circle',
  fallback,
  className = '',
  status = 'none',
  bordered = false,
  onClick
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  // Size classes
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  };
  // Shape classes
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-md'
  };
  // Status classes
  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
    none: ''
  };
  // Status size classes
  const statusSizeClasses = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4'
  };
  // Border classes
  const borderClass = bordered ? 'border-2 border-white' : '';
  // Generate fallback content
  const getFallbackContent = () => {
    if (isValidElement(fallback)) {
      return fallback;
    }
    if (typeof fallback === 'string') {
      return fallback;
    }
    // Default fallback is first letter of alt text
    return alt ? alt.charAt(0).toUpperCase() : '?';
  };
  // Combine classes
  const avatarClasses = `
    ${sizeClasses[size]}
    ${shapeClasses[shape]}
    ${borderClass}
    ${onClick ? 'cursor-pointer' : ''}
    inline-flex items-center justify-center overflow-hidden bg-gray-200 text-gray-700 font-medium
    ${className}
  `.trim();
  return <div className="relative inline-block">
      {!src || imageError ? <div className={avatarClasses} onClick={onClick}>
          {getFallbackContent()}
        </div> : <img src={src} alt={alt} className={avatarClasses} onError={() => setImageError(true)} onClick={onClick} />}
      {status !== 'none' && <span className={`
          absolute bottom-0 right-0 block rounded-full 
          ${statusClasses[status]}
          ${statusSizeClasses[size]}
          ${shape === 'circle' ? 'ring-2 ring-white' : ''}
        `} />}
    </div>;
}
// Avatar Group component to display multiple avatars
export function AvatarGroup({
  avatars,
  max = 4,
  size = 'md',
  shape = 'circle',
  className = ''
}: {
  avatars: Array<Omit<AvatarProps, 'size' | 'shape'>>;
  max?: number;
  size?: AvatarProps['size'];
  shape?: AvatarProps['shape'];
  className?: string;
}) {
  const overflow = avatars.length > max ? avatars.length - max : 0;
  const displayAvatars = avatars.slice(0, max);
  // Offset classes
  const offsetClasses = {
    xs: '-ml-1.5',
    sm: '-ml-2',
    md: '-ml-2.5',
    lg: '-ml-3',
    xl: '-ml-4'
  };
  return <div className={`flex ${className}`}>
      {displayAvatars.map((avatar, index) => <div key={index} className={`${index > 0 ? offsetClasses[size] : ''}`}>
          <Avatar {...avatar} size={size} shape={shape} bordered />
        </div>)}
      {overflow > 0 && <div className={offsetClasses[size]}>
          <Avatar fallback={`+${overflow}`} size={size} shape={shape} bordered className="bg-gray-300" />
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