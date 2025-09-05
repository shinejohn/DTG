import React from 'react';
export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'gray' | 'black';
  className?: string;
  label?: string;
}
export function Spinner({
  size = 'md',
  color = 'primary',
  className = '',
  label = 'Loading...'
}: SpinnerProps) {
  // Size classes
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };
  // Color classes
  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-purple-600',
    white: 'text-white',
    gray: 'text-gray-500',
    black: 'text-gray-900'
  };
  // Combine classes
  const spinnerClasses = `
    animate-spin
    ${sizeClasses[size]}
    ${colorClasses[color]}
    ${className}
  `.trim();
  return <div role="status" className="inline-flex items-center justify-center">
      <svg className={spinnerClasses} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-label={label}>
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span className="sr-only">{label}</span>
    </div>;
}