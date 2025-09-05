import React from 'react';
// Define icon paths in a central location
const iconPaths: Record<string, string> = {
  home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  // Add more icons as needed
};
interface IconProps {
  name: keyof typeof iconPaths;
  size?: number;
  className?: string;
}
export default function Icon({
  name,
  size = 24,
  className = ''
}: IconProps) {
  const path = iconPaths[name];
  if (!path) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={path} />
    </svg>;
}
