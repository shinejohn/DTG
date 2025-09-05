import React, { Component } from 'react';
type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
interface TypographyProps {
  variant?: TypographyVariant;
  component?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'light' | 'dark';
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  gutterBottom?: boolean;
}
export function Typography({
  variant = 'body1',
  component,
  className = '',
  children,
  color = 'default',
  align = 'left',
  truncate = false,
  gutterBottom = false,
  ...props
}: TypographyProps & React.HTMLAttributes<HTMLElement>) {
  // Map variant to appropriate element if component is not specified
  const Component = component || getDefaultComponent(variant);
  // Base classes
  const baseClasses = 'block';
  // Variant classes
  const variantClasses = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-bold',
    h4: 'text-xl font-bold',
    h5: 'text-lg font-bold',
    h6: 'text-base font-bold',
    subtitle1: 'text-lg font-medium',
    subtitle2: 'text-base font-medium',
    body1: 'text-base',
    body2: 'text-sm',
    caption: 'text-xs',
    overline: 'text-xs uppercase tracking-wider'
  };
  // Color classes
  const colorClasses = {
    default: 'text-gray-900',
    primary: 'text-blue-600',
    secondary: 'text-purple-600',
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-cyan-600',
    light: 'text-gray-400',
    dark: 'text-gray-800'
  };
  // Alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };
  // Truncate class
  const truncateClass = truncate ? 'truncate' : '';
  // Margin bottom class
  const gutterClass = gutterBottom ? 'mb-2' : '';
  // Combine classes
  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${colorClasses[color]}
    ${alignClasses[align]}
    ${truncateClass}
    ${gutterClass}
    ${className}
  `.trim();
  return <Component className={classes} {...props}>
      {children}
    </Component>;
}
// Helper function to determine default component based on variant
function getDefaultComponent(variant: TypographyVariant): React.ElementType {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'subtitle1':
    case 'subtitle2':
      return 'h6';
    case 'body1':
    case 'body2':
      return 'p';
    case 'caption':
    case 'overline':
      return 'span';
    default:
      return 'p';
  }
}