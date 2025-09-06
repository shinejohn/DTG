import React from 'react';
import { Link } from 'react-router';
import { UtensilsIcon, ShoppingBagIcon, BriefcaseIcon, CalendarIcon, GlassWaterIcon, HeartIcon, ShoppingCartIcon, MusicIcon } from 'lucide-react';
import { useBrand } from './contexts/BrandContext';
export function CategorySection() {
  const {
    currentBrand
  } = useBrand();
  // Default categories that align with requirements
  const defaultCategories = [{
    id: 'restaurants',
    name: 'Restaurants',
    icon: <UtensilsIcon className="w-6 h-6" />,
    color: 'bg-red-100 text-red-600'
  }, {
    id: 'shopping',
    name: 'Shopping',
    icon: <ShoppingBagIcon className="w-6 h-6" />,
    color: 'bg-blue-100 text-blue-600'
  }, {
    id: 'services',
    name: 'Services',
    icon: <BriefcaseIcon className="w-6 h-6" />,
    color: 'bg-green-100 text-green-600'
  }, {
    id: 'events',
    name: 'Events',
    icon: <CalendarIcon className="w-6 h-6" />,
    color: 'bg-purple-100 text-purple-600'
  }, {
    id: 'nightlife',
    name: 'Nightlife',
    icon: <GlassWaterIcon className="w-6 h-6" />,
    color: 'bg-indigo-100 text-indigo-600'
  }, {
    id: 'health',
    name: 'Health & Wellness',
    icon: <HeartIcon className="w-6 h-6" />,
    color: 'bg-pink-100 text-pink-600'
  }, {
    id: 'groceries',
    name: 'Groceries',
    icon: <ShoppingCartIcon className="w-6 h-6" />,
    color: 'bg-yellow-100 text-yellow-600'
  }, {
    id: 'entertainment',
    name: 'Entertainment',
    icon: <MusicIcon className="w-6 h-6" />,
    color: 'bg-orange-100 text-orange-600'
  }];
  // Map brand-specific categories to our standard category objects if available
  const categories = currentBrand?.experience?.featuredCategories?.length ? defaultCategories.filter(cat => currentBrand.experience?.featuredCategories?.some(brandCat => brandCat.toLowerCase().includes(cat.id.toLowerCase()))).slice(0, 8) // Ensure we don't exceed 8 categories
  : defaultCategories;
  return <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {categories.map(category => <Link key={category.id} to={`/dtg/explore?category=${category.id}`} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mb-3`}>
            {category.icon}
          </div>
          <span className="text-gray-800 font-medium text-center">
            {category.name}
          </span>
        </Link>)}
    </div>;
}
