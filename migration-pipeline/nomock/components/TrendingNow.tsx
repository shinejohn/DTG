import React from 'react';
import { TrendingUpIcon, StarIcon, MapPinIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
// Sample data - in a real app, this would come from an API
const trendingPlaces = [{
  id: 't1',
  name: 'New Fusion Restaurant',
  image: '/images/placeholder.jpg',
  category: 'Restaurant',
  rating: 4.9,
  reviewCount: 42,
  location: 'Downtown',
  trend: 'New opening'
}, {
  id: 't2',
  name: 'Vintage Vinyl Records',
  image: '/images/placeholder.jpg',
  category: 'Music Store',
  rating: 4.7,
  reviewCount: 86,
  location: 'Arts District',
  trend: 'Popular this week'
}, {
  id: 't3',
  name: 'The Rooftop Bar',
  image: '/images/placeholder.jpg',
  category: 'Bar',
  rating: 4.8,
  reviewCount: 112,
  location: 'Midtown',
  trend: 'Seasonal favorite'
}, {
  id: 't4',
  name: 'Urban Day Spa',
  image: '/images/placeholder.jpg',
  category: 'Spa',
  rating: 4.9,
  reviewCount: 75,
  location: 'Uptown',
  trend: 'Rising popularity'
}, {
  id: 't5',
  name: 'Tech Gadget Shop',
  image: '/images/placeholder.jpg',
  category: 'Electronics',
  rating: 4.6,
  reviewCount: 64,
  location: 'Shopping District',
  trend: 'Recently reopened'
}, {
  id: 't6',
  name: 'Farm-to-Table Eatery',
  image: '/images/placeholder.jpg',
  category: 'Restaurant',
  rating: 4.8,
  reviewCount: 97,
  location: 'Riverside',
  trend: 'Local favorite'
}];
export function TrendingNow() {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trendingPlaces.map(place => <Link key={place.id} to={`/business/${place.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="relative h-48">
            <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 flex items-center bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              <TrendingUpIcon className="w-3 h-3 mr-1" />
              {place.trend}
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                {place.category}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{place.name}</h3>
            <div className="flex items-center mb-2">
              <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium ml-1">{place.rating}</span>
              <span className="text-xs text-gray-500 ml-1">
                ({place.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPinIcon className="w-3 h-3 mr-1" />
              <span>{place.location}</span>
            </div>
          </div>
        </Link>)}
    </div>;
}