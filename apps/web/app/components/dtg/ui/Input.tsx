import React, { forwardRef } from 'react';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  id,
  ...props
}, ref) => {
  // Generate a unique ID if not provided
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  // Base classes
  const baseInputClasses = 'block py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';
  // Icon padding
  const iconPaddingLeft = leftIcon ? 'pl-10' : 'pl-3';
  const iconPaddingRight = rightIcon ? 'pr-10' : 'pr-3';
  // Error state
  const errorClasses = error ? 'border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300';
  // Width
  const widthClass = fullWidth ? 'w-full' : '';
  // Combine classes
  const inputClasses = `
      ${baseInputClasses}
      ${iconPaddingLeft}
      ${iconPaddingRight}
      ${errorClasses}
      ${widthClass}
      ${className}
    `.trim();
  return <div className={fullWidth ? 'w-full' : ''}>
        {label && <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>}
        <div className="relative">
          {leftIcon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>}
          <input ref={ref} id={inputId} className={inputClasses} aria-invalid={error ? 'true' : 'false'} aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined} {...props} />
          {rightIcon && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightIcon}
            </div>}
        </div>
        {error ? <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p> : helperText ? <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p> : null}
      </div>;
}
