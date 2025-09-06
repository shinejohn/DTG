import React, { useState } from 'react';
import { useLoaderData, useRouteError, isRouteErrorResponse, useSearchParams } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Layout } from '@/components/dtg/Layout';
import { SearchIcon, FilterIcon, MapPinIcon } from 'lucide-react';

interface SearchItem {
  id?: string;
  name: string;
  category: string;
  location: string;
  description?: string;
  rating?: number;
}

interface LoaderData {
  query: string;
  category: string;
  items: SearchItem[];
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';
  const category = url.searchParams.get('category') || '';
  
  // For now, return empty results until we implement proper search
  return {
    query,
    category,
    items: []
  };
}

export default function Search() {
  const data = useLoaderData<LoaderData>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(data.query);
  const [selectedCategory, setSelectedCategory] = useState(data.category);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL params
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    setSearchParams(params);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Search Businesses</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search businesses, restaurants, shops..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option value="restaurant">Restaurants</option>
                <option value="retail">Retail</option>
                <option value="service">Services</option>
              </select>
              
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Search Results */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Search Results ({data.items.length})</h2>
            
            {data.items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No results found. Try adjusting your search criteria.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.items.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-2">{item.name || 'Business Name'}</h3>
                    <p className="text-gray-600 mb-4">{item.category || 'Category'}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      <span>{item.location || 'Location'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// React Router 7 loader function

