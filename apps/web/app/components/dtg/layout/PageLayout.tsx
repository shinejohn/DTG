import type { Route } from './+types/route';
import React from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { useBrand } from '../../contexts/BrandContext';
interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}
export default function PageLayout({
  children,
  title,
  description,
  showHeader = true,
  showFooter = true,
  className = ''
}: PageLayoutProps) {
  const {
    currentBrand
  } = useBrand();
  return <div className="min-h-screen flex flex-col bg-gray-50">
      {showHeader && <Header siteName={currentBrand?.name || 'Downtown Guide'} />}
      <main className={`flex-grow container mx-auto px-4 py-6 ${className}`}>
        {title && <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {description && <p className="text-gray-600 mt-1">{description}</p>}
          </div>}
        {children}
      </main>
      {showFooter && <Footer />}
    </div>;
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