import React from 'react';
import { useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Layout } from '@/components/dtg/Layout';


export default function Achievements() {
  const data = useLoaderData<typeof loader>();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Achievements</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">Explorer</h3>
            <p className="text-gray-600">Visit 10 different businesses</p>
            <div className="mt-4 bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
            </div>
          </div>
        </div>
  
      </div>
    </Layout>
  );
}

// React Router 7 loader function

