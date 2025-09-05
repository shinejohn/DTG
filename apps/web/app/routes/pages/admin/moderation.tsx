import React from 'react';
import { useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Layout } from '@/components/dtg/Layout';


export default function Moderation() {
  const data = useLoaderData<typeof loader>();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Moderation</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Content Moderation</h2>
          <p className="text-gray-600 mb-4">Review and moderate user-generated content.</p>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <p className="text-yellow-800">Pending review: 5 items</p>
            </div>
          </div>
        </div>
  
      </div>
    </Layout>
  );
}

// React Router 7 loader function

