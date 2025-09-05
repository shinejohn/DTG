import type { Route } from './+types/route';
import React from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { getBrandById } from './BrandService';
// Types
interface Community {
  id: string;
  name: string;
  brandId?: string;
}

const communities: Community[] = [{
  id: 'nyc',
  name: 'New York City'
}, {
  id: 'sf',
  name: 'San Francisco'
}, {
  id: 'chi',
  name: 'Chicago'
}, {
  id: 'la',
  name: 'Los Angeles'
}, {
  id: 'mia',
  name: 'Miami'
}, {
  id: 'sea',
  name: 'Seattle'
}, {
  id: 'aus',
  name: 'Austin'
}, {
  id: 'den',
  name: 'Denver'
}, {
  id: 'bos',
  name: 'Boston'
}, {
  id: 'por',
  name: 'Portland'
},
// Brand-specific communities
{
  id: 'foodie-quest-nyc',
  name: 'New York Food Scene',
  brandId: 'foodie-quest'
}, {
  id: 'foodie-quest-la',
  name: 'LA Dining',
  brandId: 'foodie-quest'
}, {
  id: 'foodie-quest-chi',
  name: 'Chicago Eats',
  brandId: 'foodie-quest'
}, {
  id: 'international-pub-crawl-nyc',
  name: 'NYC Pub Scene',
  brandId: 'international-pub-crawl'
}, {
  id: 'international-pub-crawl-dub',
  name: 'Dublin',
  brandId: 'international-pub-crawl'
}, {
  id: 'international-pub-crawl-lon',
  name: 'London',
  brandId: 'international-pub-crawl'
}];
// Get all communities
export default function getAllCommunities(): Community[] {
  return communities;
}
// Mock function to detect community from IP address
export async function detectCommunityFromIP(brandId?: string): Promise<Community> {
  // In a real app, this would make an API call to detect the user's location
  // For now, return a default community or filter by brand if provided
  return new Promise(resolve => {
    setTimeout(() => {
      if (brandId) {
        // If brand ID is provided, try to find a matching community
        const brandCommunity = communities.find(c => c.brandId === brandId);
        if (brandCommunity) {
          resolve(brandCommunity);
          return;
        }
      }
      // Default to NYC if no brand-specific community is found
      resolve(communities[0]); // Returns NYC
    }, 500); // Add slight delay to simulate API call
  });
}
// Get communities for a specific brand
export function getBrandCommunitiesData(brandId: string): Community[] {
  const brand = getBrandById(brandId);
  if (!brand || !brand.communities) return [];
  // Filter communities based on the brand's community IDs
  return brand.communities.map(communityId => {
    // First try to find an exact match
    const community = communities.find(c => c.id === communityId);
    if (community) return community;
    // If no exact match, create a placeholder
    return {
      id: communityId,
      name: communityId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    };
  }).filter(Boolean) as Community[];
}
// Get community by ID
export function getCommunityById(id: string): Community | null {
  return communities.find(community => community.id === id) || null;
}
// Get community name by ID
export function getCommunityName(id: string): string {
  const community = getCommunityById(id);
  return community ? community.name : id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
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