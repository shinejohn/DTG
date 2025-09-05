import React from 'react';
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'small' | 'medium' | 'large';
  isHoverable?: boolean;
}
export function Card({
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