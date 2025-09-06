import React from 'react';
export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  icon?: React.ReactNode;
}
export function Badge({
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

export default Badge;
