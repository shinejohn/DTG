import React from 'react';
import { Link } from 'react-router';
import { StarIcon, MapPinIcon } from 'lucide-react';

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
}

interface FeaturedPlacesProps {
  businesses: Business[];
}

export function FeaturedPlaces({ businesses }: FeaturedPlacesProps) {
  // Default placeholder if no image
  const defaultImage = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
  
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {businesses.map(business => (
        <Link key={business.id} to={`/dtg/business/${business.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="h-48 overflow-hidden">
            <img 
              src={business.image_url || defaultImage} 
              alt={business.name} 
              className="w-full h-full object-cover" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultImage;
              }}
            />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              {business.category && (
                <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {business.category}
                </span>
              )}
              {business.price_level && (
                <span className="text-xs text-gray-500">
                  {business.price_level}
                </span>
              )}
            </div>
            <h3 className="font-bold text-gray-900 mb-1 truncate">
              {business.name}
            </h3>
            {business.description && (
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {business.description}
              </p>
            )}
            {(business.rating || business.rating === 0) && (
              <div className="flex items-center mb-2">
                <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium ml-1">
                  {business.rating.toFixed(1)}
                </span>
                {business.review_count !== undefined && (
                  <span className="text-xs text-gray-500 ml-1">
                    ({business.review_count} reviews)
                  </span>
                )}
              </div>
            )}
            <div className="flex items-center text-gray-600 text-sm">
              <MapPinIcon className="w-3 h-3 mr-1" />
              <span className="truncate">
                {business.city || business.address || 'Location not available'}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>;
}

// Keep the old export for backward compatibility temporarily
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
// Legacy export using mock data - will be removed
export function FeaturedPlacesLegacy() {
  return <FeaturedPlaces businesses={featuredBusinesses.map(b => ({
    id: b.id,
    name: b.name,
    image_url: b.image,
    category: b.category,
    rating: b.rating,
    review_count: b.reviewCount,
    address: b.location,
    price_level: b.priceLevel
  }))} />;
}
