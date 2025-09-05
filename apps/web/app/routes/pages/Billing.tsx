import React from 'react';
import { useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Layout } from '@/components/dtg/Layout';


export default function Billing() {
  const data = useLoaderData<typeof loader>();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Billing</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
          <p className="text-gray-600 mb-4">Manage your subscription and billing details.</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Update Billing
          </button>
        </div>
  
      </div>
    </Layout>
  );
}

// React Router 7 loader function

