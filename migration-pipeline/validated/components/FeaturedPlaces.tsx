import React from 'react';
import { StarIcon, MapPinIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
// Sample data - in a real app, this would come from an API
const featuredBusinesses = [{
  id: 'b1',
  name: 'The Urban Bistro',
  image: '/images/placeholder.jpg',
  category: 'Restaurant',
  rating: 4.8,
  reviewCount: 124,
  location: 'Downtown',
  distance: '0.3 mi',
  priceLevel: '$$'
}, {
  id: 'b2',
  name: 'Craft Coffee House',
  image: '/images/placeholder.jpg',
  category: 'Café',
  rating: 4.6,
  reviewCount: 89,
  location: 'Midtown',
  distance: '0.7 mi',
  priceLevel: '$'
}, {
  id: 'b3',
  name: 'Fresh Market Grocery',
  image: '/images/placeholder.jpg',
  category: 'Grocery',
  rating: 4.5,
  reviewCount: 76,
  location: 'Uptown',
  distance: '1.2 mi',
  priceLevel: '$$'
}, {
  id: 'b4',
  name: 'The Cozy Bookstore',
  image: '/images/placeholder.jpg',
  category: 'Bookstore',
  rating: 4.9,
  reviewCount: 112,
  location: 'Arts District',
  distance: '0.5 mi',
  priceLevel: '$$'
}, {
  id: 'b5',
  name: 'Sunset Yoga Studio',
  image: '/images/placeholder.jpg',
  category: 'Fitness',
  rating: 4.7,
  reviewCount: 65,
  location: 'Riverside',
  distance: '1.5 mi',
  priceLevel: '$$$'
}, {
  id: 'b6',
  name: 'Artisan Bakery',
  image: '/images/placeholder.jpg',
  category: 'Bakery',
  rating: 4.6,
  reviewCount: 92,
  location: 'Historic District',
  distance: '0.8 mi',
  priceLevel: '$$'
}];
export function FeaturedPlaces() {
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