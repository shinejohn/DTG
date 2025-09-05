import type { Route } from './+types/route';
import React from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

import { StarIcon, MapPinIcon, HeartIcon, ExternalLinkIcon } from 'lucide-react';
import { Badge } from '../ui/Badge';
export interface BusinessCardProps {
  business: {
    id: string;
    name: string;
    image: string;
    category: string;
    subcategory?: string;
    rating: number;
    reviewCount: number;
    priceRange: string;
    address: string;
    distance?: string;
    tags?: string[];
    features?: string[];
    openNow?: boolean;
    isVerified?: boolean;
    isFeatured?: boolean;
    description?: string;
  };
  variant?: 'grid' | 'list' | 'compact';
  onSave?: (id: string) => void;
  isSaved?: boolean;
  showActions?: boolean;
  className?: string;
}
export default function BusinessCard({
  business,
  variant = 'grid',
  onSave,
  isSaved = false,
  showActions = true,
  className = ''
}: BusinessCardProps) {
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSave) {
      onSave(business.id);
    }
  };
  // Grid view (default)
  if (variant === 'grid') {
    return <div className={`bg-white rounded-lg shadow-sm overflow-hidden group ${className}`}>
        <div className="relative">
          <img src={business.image} alt={business.name} className="w-full h-40 object-cover" />
          {business.openNow && <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
              Open Now
            </div>}
          {showActions && <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={handleSave} className="p-1.5 bg-white rounded-full text-gray-700 hover:text-blue-600 shadow-sm" title={isSaved ? 'Remove from favorites' : 'Save to favorites'}>
                <HeartIcon className={`w-4 h-4 ${isSaved ? 'fill-current text-blue-600' : ''}`} />
              </button>
            </div>}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold mb-1">
                <Link to={`/business/${business.id}`} className="hover:text-blue-600">
                  {business.name}
                </Link>
              </h3>
              <div className="text-sm text-gray-600 mb-1">
                {business.subcategory || business.category}
              </div>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">
                    {business.rating}
                  </span>
                </div>
                <span className="mx-1 text-gray-400">•</span>
                <span className="text-sm text-gray-600">
                  {business.reviewCount} reviews
                </span>
                <span className="mx-1 text-gray-400">•</span>
                <span className="text-sm text-gray-600">
                  {business.priceRange}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="truncate">{business.address}</span>
          </div>
          {business.distance && <div className="text-sm text-gray-500 mt-1">
              {business.distance}
            </div>}
          {(business.tags || business.features) && <div className="mt-2 flex flex-wrap gap-1">
              {business.tags?.slice(0, 3).map(tag => <Badge key={tag} variant="default" size="sm" rounded>
                  {tag}
                </Badge>)}
              {business.features?.slice(0, 3).map(feature => <Badge key={feature} variant="default" size="sm" rounded>
                  {feature}
                </Badge>)}
            </div>}
        </div>
      </div>;
  }
  // List view
  if (variant === 'list') {
    return <div className={`bg-white rounded-lg shadow-sm p-4 flex gap-4 group ${className}`}>
        <div className="flex-shrink-0">
          <img src={business.image} alt={business.name} className="w-24 h-24 object-cover rounded-md" />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold mb-1">
                <Link to={`/business/${business.id}`} className="hover:text-blue-600">
                  {business.name}
                </Link>
              </h3>
              <div className="text-sm text-gray-600 mb-1">
                {business.subcategory || business.category}
              </div>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">
                    {business.rating}
                  </span>
                </div>
                <span className="mx-1 text-gray-400">•</span>
                <span className="text-sm text-gray-600">
                  {business.reviewCount} reviews
                </span>
                <span className="mx-1 text-gray-400">•</span>
                <span className="text-sm text-gray-600">
                  {business.priceRange}
                </span>
              </div>
            </div>
            {showActions && <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={handleSave} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full" title={isSaved ? 'Remove from favorites' : 'Save to favorites'}>
                  <HeartIcon className={`w-4 h-4 ${isSaved ? 'fill-current text-blue-600' : ''}`} />
                </button>
              </div>}
          </div>
          <div className="text-sm text-gray-600 flex items-center">
            <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
            <span>{business.address}</span>
          </div>
          {business.description && <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {business.description}
            </p>}
          {(business.tags || business.features) && <div className="mt-2 flex flex-wrap gap-1">
              {business.tags?.slice(0, 3).map(tag => <Badge key={tag} variant="default" size="sm" rounded>
                  {tag}
                </Badge>)}
              {business.features?.slice(0, 3).map(feature => <Badge key={feature} variant="default" size="sm" rounded>
                  {feature}
                </Badge>)}
            </div>}
        </div>
      </div>;
  }
  // Compact view
  return <div className={`bg-white rounded-lg shadow-sm overflow-hidden flex ${className}`}>
      <div className="w-20 h-20 flex-shrink-0">
        <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-3 flex-grow">
        <h3 className="font-medium text-gray-900 text-sm">{business.name}</h3>
        <div className="flex items-center mt-1 text-xs text-gray-500">
          <StarIcon className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="ml-1">{business.rating}</span>
          <span className="mx-1">•</span>
          <span>{business.priceRange}</span>
        </div>
        <div className="flex items-center mt-1 text-xs text-gray-500">
          <MapPinIcon className="w-3 h-3 mr-1" />
          <span className="truncate">{business.address}</span>
        </div>
      </div>
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