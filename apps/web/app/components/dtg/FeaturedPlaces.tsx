import type { Route } from './+types/route';
import React from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { StarIcon, MapPinIcon } from 'lucide-react';

// Sample data - in a real app, this would come from an API
const featuredBusinesses = [{
  id: 'b1',
  name: 'The Urban Bistro',
  image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  category: 'Restaurant',
  rating: 4.8,
  reviewCount: 124,
  location: 'Downtown',
  distance: '0.3 mi',
  priceLevel: '$$'
}, {
  id: 'b2',
  name: 'Craft Coffee House',
  image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  category: 'Café',
  rating: 4.6,
  reviewCount: 89,
  location: 'Midtown',
  distance: '0.7 mi',
  priceLevel: '$'
}, {
  id: 'b3',
  name: 'Fresh Market Grocery',
  image: 'https://images.unsplash.com/photo-1506617564039-2f3b650b7010?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  category: 'Grocery',
  rating: 4.5,
  reviewCount: 76,
  location: 'Uptown',
  distance: '1.2 mi',
  priceLevel: '$$'
}, {
  id: 'b4',
  name: 'The Cozy Bookstore',
  image: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  category: 'Bookstore',
  rating: 4.9,
  reviewCount: 112,
  location: 'Arts District',
  distance: '0.5 mi',
  priceLevel: '$$'
}, {
  id: 'b5',
  name: 'Sunset Yoga Studio',
  image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  category: 'Fitness',
  rating: 4.7,
  reviewCount: 65,
  location: 'Riverside',
  distance: '1.5 mi',
  priceLevel: '$$$'
}, {
  id: 'b6',
  name: 'Artisan Bakery',
  image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  category: 'Bakery',
  rating: 4.6,
  reviewCount: 92,
  location: 'Historic District',
  distance: '0.8 mi',
  priceLevel: '$$'
}];
export default function FeaturedPlaces() {
  return <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
      {featuredBusinesses.map(business => <Link key={business.id} to={`/business/${business.id}`} className="flex-none w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="h-36 overflow-hidden">
            <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                {business.category}
              </span>
              <span className="text-xs text-gray-500">
                {business.priceLevel}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 mb-1 truncate">
              {business.name}
            </h3>
            <div className="flex items-center mb-2">
              <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium ml-1">
                {business.rating}
              </span>
              <span className="text-xs text-gray-500 ml-1">
                ({business.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPinIcon className="w-3 h-3 mr-1" />
              <span className="truncate">{business.location}</span>
              <span className="ml-auto">{business.distance}</span>
            </div>
          </div>
        </Link>)}
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