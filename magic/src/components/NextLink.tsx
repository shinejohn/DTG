import React from 'react';
import NextLink from 'next/link';
interface LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}
export function Link({
  to,
  children,
  className,
  onClick
}: LinkProps) {
  return <NextLink href={to} className={className} onClick={onClick}>
      {children}
    </NextLink>;
}