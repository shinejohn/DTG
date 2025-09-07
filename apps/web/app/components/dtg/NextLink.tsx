import React, { type ReactNode } from 'react';
import { Link as RouterLink } from 'react-router';

interface LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Link({
  to,
  children,
  className,
  onClick
}: LinkProps) {
  return (
    <RouterLink to={to} className={className} onClick={onClick}>
      {children}
    </RouterLink>
  );
}
