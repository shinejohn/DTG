import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { json, useLoaderData } from 'react-router';
import type { Route } from './+types/route';
import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { AdminSidebar } from '../../components/admin/Sidebar';
import { UserManagement } from '../../components/admin/UserManagement';
import { BusinessManagement } from '../../components/admin/BusinessManagement';
import { ContentModeration } from '../../components/admin/ContentModeration';
import { Analytics } from '../../components/admin/Analytics';
import { SystemHealth } from '../../components/admin/SystemHealth';
import { BrandConfiguration } from '../../components/admin/BrandConfiguration';
export function AdminDashboard() {
  const [activePanel, setActivePanel] = useState<'users' | 'businesses' | 'content' | 'analytics' | 'system' | 'brands'>('users');
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-grow flex">
        <AdminSidebar activePanel={activePanel} setActivePanel={setActivePanel} />
        <main className="flex-grow p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">
              Manage users, businesses, and content across the platform
            </p>
          </div>
          {activePanel === 'users' && <UserManagement />}
          {activePanel === 'businesses' && <BusinessManagement />}
          {activePanel === 'brands' && <BrandConfiguration />}
          {activePanel === 'content' && <ContentModeration />}
          {activePanel === 'analytics' && <Analytics />}
          {activePanel === 'system' && <SystemHealth />}
        </main>
      </div>
      <Footer />
    </div>;
}

// React Router 7 loader function
export async function loader({ params, request }: Route.LoaderArgs) {
  const { supabase, headers } = getSupabaseServerClient(request);
  
  try {
    // Get generic data - customize based on page needs
    const { data: items, error } = await supabase
      .from('businesses') // Change table as needed
      .select('*')
      .limit(10);

    if (error) {
      // console.error('Error fetching data:', error);
    }

    const transformedData = {
      // Transform data to match component interface
      items: businesses || events || items || []
    };

    return json(transformedData, { headers });
  } catch (error) {
    // console.error('Loader error:', error);
    // Return empty data on error
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