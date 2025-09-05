import React from 'react';
import { useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
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

