import type { Route } from './+types/route';
import React from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Layout } from '@/components/dtg/Layout';


export default function TwoFactorAuth() {
  const data = useLoaderData<typeof loader>();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">TwoFactorAuth</h1>
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Two-Factor Authentication</h2>
          <p className="text-gray-600 mb-6">Secure your account with two-factor authentication.</p>
          
          <div className="space-y-4">
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
              Enable 2FA
            </button>
            <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
              Disable 2FA
            </button>
          </div>
        </div>
  
      </div>
    </Layout>
  );
}

// React Router 7 loader function
export async function loader({ params, request }: Route.LoaderArgs) {
  const { supabase, headers } = getSupabaseServerClient(request);
  
  try {
    // Get data for this page
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
