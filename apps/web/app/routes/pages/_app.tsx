import type { Route } from './+types/route';
import React, { Component } from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { AppProps } from 'next/app';
import { ErrorBoundary } from '@/components/dtg/ErrorBoundary';
import { FloatingNavigation } from '@/components/dtg/FloatingNavigation';
import { BrandProvider } from '../contexts/BrandContext';
import { AppProvider } from '../contexts/AppContext';
import '../styles/globals.css';
export default function MyApp({
  Component,
  pageProps
}: AppProps) {
  return <ErrorBoundary>
      <AppProvider>
        <BrandProvider>
          <div className="w-full min-h-screen bg-white">
            <Component {...pageProps} />
            <FloatingNavigation />
          </div>
        </BrandProvider>
      </AppProvider>
    </ErrorBoundary>;
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
