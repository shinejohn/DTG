import type { Route } from './+types/route';
import React, { useState } from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { StarIcon } from 'lucide-react';
export interface RatingProps {
  value: number;
  max?: number;
  precision?: 0.5 | 1;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  onChange?: (value: number) => void;
  emptyColor?: string;
  filledColor?: string;
  className?: string;
  showValue?: boolean;
  name?: string;
  required?: boolean;
}
export default function Rating({
  value,
  max = 5,
  precision = 1,
  size = 'md',
  readOnly = false,
  onChange,
  emptyColor = 'text-gray-300',
  filledColor = 'text-yellow-400',
  className = '',
  showValue = false,
  name,
  required = false
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [focusVisible, setFocusVisible] = useState(-1);
  // Size classes
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };
  // Create array of items based on max
  const items = Array.from({
    length: max
  }, (_, index) => index + 1);
  // Calculate the display value (considering hover state)
  const displayValue = hoverValue ?? value;
  // Handle click on a star
  const handleClick = (newValue: number) => {
    if (!readOnly && onChange) {
      // If clicking the same value, clear it (unless required)
      if (value === newValue && !required) {
        onChange(0);
      } else {
        onChange(newValue);
      }
    }
  };
  // Handle mouse enter on a star
  const handleMouseEnter = (newValue: number) => {
    if (!readOnly) {
      setHoverValue(newValue);
    }
  };
  // Handle mouse leave
  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(null);
    }
  };
  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (readOnly) return;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        if (onChange && value < max) {
          onChange(Math.min(max, value + precision));
        }
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        if (onChange && value > 0) {
          onChange(Math.max(0, value - precision));
        }
        break;
      case 'Home':
        event.preventDefault();
        if (onChange && !required) {
          onChange(0);
        }
        break;
      case 'End':
        event.preventDefault();
        if (onChange) {
          onChange(max);
        }
        break;
      default:
        break;
    }
  };
  return <div className={`inline-flex items-center ${className}`} onMouseLeave={handleMouseLeave}>
      <div className="flex" role="radiogroup" aria-label="Rating" onKeyDown={handleKeyDown}>
        {items.map(item => {
        // For half-star precision
        const isActive = precision === 0.5 ? item - 0.5 <= displayValue : item <= displayValue;
        // For half-star precision
        const isHalfActive = precision === 0.5 && item - 0.5 <= displayValue && item > displayValue;
        return <span key={item} className={`
                ${!readOnly ? 'cursor-pointer' : ''}
                ${focusVisible === item ? 'outline-blue-500 outline-offset-2 outline-2 outline' : ''}
              `} onClick={() => handleClick(item)} onMouseEnter={() => handleMouseEnter(item)} onFocus={() => setFocusVisible(item)} onBlur={() => setFocusVisible(-1)} role="radio" aria-checked={item === Math.ceil(value)} tabIndex={!readOnly ? 0 : -1}>
              {isHalfActive ? <div className="relative">
                  <StarIcon className={`${sizeClasses[size]} ${emptyColor}`} />
                  <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                    <StarIcon className={`${sizeClasses[size]} ${filledColor} fill-current`} />
                  </div>
                </div> : <StarIcon className={`
                    ${sizeClasses[size]} 
                    ${isActive ? `${filledColor} fill-current` : emptyColor}
                  `} />}
            </span>;
      })}
      </div>
      {showValue && <span className="ml-2 text-sm font-medium text-gray-700">
          {value.toFixed(precision === 0.5 ? 1 : 0)}
        </span>}
      {name && <input type="hidden" name={name} value={value} required={required} />}
    </div>;
}
// Read-only rating display with review count
export function RatingDisplay({
  rating,
  reviewCount,
  size = 'sm',
  showCount = true,
  className = ''
}: {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}) {
  return <div className={`flex items-center ${className}`}>
      <Rating value={rating} readOnly size={size} />
      {showCount && reviewCount !== undefined && <span className="ml-1 text-sm text-gray-600">({reviewCount})</span>}
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