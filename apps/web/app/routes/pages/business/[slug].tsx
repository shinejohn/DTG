import type { Route } from './+types/route';
import React from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Layout } from '@/components/dtg/Layout';
import { StarIcon, MapPinIcon, PhoneIcon } from 'lucide-react';

export default function BusinessDetail() {
  const { business } = useLoaderData<typeof loader>();

  if (!business) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Business Not Found</h1>
            <p className="text-gray-600">The business you're looking for doesn't exist.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{business.name}</h1>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-600 mb-4">{business.description || 'No description available.'}</p>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">{business.rating || 'No rating'}</span>
                  </div>
                  <span className="text-gray-500">({business.reviews_count || 0} reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                <div className="space-y-3">
                  {business.phone && (
                    <div className="flex items-center">
                      <PhoneIcon className="w-5 h-5 text-gray-400 mr-3" />
                      <span>{business.phone}</span>
                    </div>
                  )}
                  {business.address && (
                    <div className="flex items-start">
                      <MapPinIcon className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <span>{business.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// React Router 7 loader function
export async function loader({ params, request }: Route.LoaderArgs) {
  const { supabase, headers } = getSupabaseServerClient(request);
  const { slug } = params;
  
  try {
    const { data: business, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching business:', error);
    }

    return json({
      business: business || null
    }, { headers });
  } catch (error) {
    console.error('Loader error:', error);
    return json({
      business: null
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
