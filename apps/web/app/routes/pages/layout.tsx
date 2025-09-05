import type { Route } from './+types/layout';
import { Outlet } from 'react-router';
import React from 'react';
// DTG Layout wrapper for all Downtown Guide pages
export default function DTGLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Error</h1>
        <p className="text-gray-600 mt-4">Something went wrong with the Downtown Guide</p>
        <p className="text-sm text-gray-500 mt-2">Please try refreshing the page</p>
      </div>
    </div>
  );
}
