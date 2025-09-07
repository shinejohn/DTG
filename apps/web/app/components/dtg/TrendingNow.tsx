import React from 'react';
import { Link } from 'react-router';
import { TrendingUpIcon, StarIcon, MapPinIcon } from 'lucide-react';

interface Business {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  category?: string;
  rating?: number;
  review_count?: number;
  address?: string;
  city?: string;
  state?: string;
  price_level?: string;
  trending_reason?: string;
}

interface TrendingNowProps {
  businesses: Business[];
}

export function TrendingNow({ businesses }: TrendingNowProps) {
  const defaultImage = 'https://images.unsplash.com/photo-1514537099923-4c9672455d4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
  
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {businesses.map(business => (
        <Link key={business.id} to={`/dtg/business/${business.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="relative h-48">
            <img 
              src={business.image_url || defaultImage} 
              alt={business.name} 
              className="w-full h-full object-cover" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultImage;
              }}
            />
            <div className="absolute top-3 left-3 flex items-center bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              <TrendingUpIcon className="w-3 h-3 mr-1" />
              {business.trending_reason || 'Trending'}
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-1">
              {business.category && (
                <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {business.category}
                </span>
              )}
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{business.name}</h3>
            {business.description && (
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {business.description}
              </p>
            )}
            {(business.rating || business.rating === 0) && (
              <div className="flex items-center mb-2">
                <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium ml-1">{business.rating.toFixed(1)}</span>
                {business.review_count !== undefined && (
                  <span className="text-xs text-gray-500 ml-1">
                    ({business.review_count} reviews)
                  </span>
                )}
              </div>
            )}
            <div className="flex items-center text-gray-600 text-sm">
              <MapPinIcon className="w-3 h-3 mr-1" />
              <span>{business.city || business.address || 'Location not available'}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>;
}

// Legacy export with mock data
const trendingPlaces = [{
  id: 't1',
  name: 'New Fusion Restaurant',
  image: 'https://images.unsplash.com/photo-1514537099923-4c9672455d4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  category: 'Restaurant',
  rating: 4.9,
  reviewCount: 42,
  location: 'Downtown',
  trend: 'New opening'
}, {
  id: 't2',
  name: 'Vintage Vinyl Records',
  image: 'https://images.unsplash.com/photo-1526394931762-8a4116f6e8c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  category: 'Music Store',
  rating: 4.7,
  reviewCount: 86,
  location: 'Arts District',
  trend: 'Popular this week'
}, {
  id: 't3',
  name: 'The Rooftop Bar',
  image: 'https://images.unsplash.com/photo-1525268323446-0505b6fe7778?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  category: 'Bar',
  rating: 4.8,
  reviewCount: 112,
  location: 'Midtown',
  trend: 'Seasonal favorite'
}, {
  id: 't4',
  name: 'Urban Day Spa',
  image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  category: 'Spa',
  rating: 4.9,
  reviewCount: 75,
  location: 'Uptown',
  trend: 'Rising popularity'
}, {
  id: 't5',
  name: 'Tech Gadget Shop',
  image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  category: 'Electronics',
  rating: 4.6,
  reviewCount: 64,
  location: 'Shopping District',
  trend: 'Recently reopened'
}, {
  id: 't6',
  name: 'Farm-to-Table Eatery',
  image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  category: 'Restaurant',
  rating: 4.8,
  reviewCount: 97,
  location: 'Riverside',
  trend: 'Local favorite'
}];
export function TrendingNowLegacy() {
  return <TrendingNow businesses={trendingPlaces.map(p => ({
    id: p.id,
    name: p.name,
    image_url: p.image,
    category: p.category,
    rating: p.rating,
    review_count: p.reviewCount,
    address: p.location,
    trending_reason: p.trend
  }))} />;
}
