import React, { useEffect, useState } from 'react';
import { useLoaderData, useRouteError, isRouteErrorResponse, useNavigate, Link } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Layout } from '@/components/dtg/Layout';
import { SearchIcon, MapPinIcon, FilterIcon, ListFilterIcon, GlobeIcon, ChevronRightIcon } from 'lucide-react';
import { getAllCommunities, getCommunityById } from '../../components/dtg/services/CommunityService';
export default function Explore() {
  const navigate = useNavigate();
  
  // Mock results data
  const mockResults = [
    {
      id: '1',
      name: 'Downtown Pizza',
      category: 'Restaurant',
      rating: 4.5,
      address: '123 Main St',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500',
      description: 'Best pizza in downtown with authentic Italian recipes.'
    },
    {
      id: '2',
      name: 'City Books',
      category: 'Shopping',
      rating: 4.8,
      address: '456 Oak Ave',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
      description: 'Independent bookstore with a great selection of local authors.'
    },
    {
      id: '3',
      name: 'Urban Fitness',
      category: 'Services',
      rating: 4.7,
      address: '789 Park St',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
      description: 'Modern gym with personal training and group classes.'
    }
  ];
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const [communities, setCommunities] = useState<Array<{
    id: string;
    name: string;
  }>>([]);
  const [filteredCommunities, setFilteredCommunities] = useState<Array<{
    id: string;
    name: string;
  }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // Load all communities
  useEffect(() => {
    const allCommunities = getAllCommunities();
    setCommunities(allCommunities);
    setFilteredCommunities(allCommunities);
  }, []);
  // Filter communities based on search query
  useEffect(() => {
    if (citySearchQuery.trim() === '') {
      setFilteredCommunities([]);
    } else {
      const filtered = communities.filter(community => community.name.toLowerCase().includes(citySearchQuery.toLowerCase())).slice(0, 5); // Limit to 5 suggestions for better UX
      setFilteredCommunities(filtered);
    }
  }, [citySearchQuery, communities]);
  
  const categories = [{
    id: 'all',
    name: 'All'
  }, {
    id: 'restaurants',
    name: 'Restaurants'
  }, {
    id: 'shopping',
    name: 'Shopping'
  }, {
    id: 'entertainment',
    name: 'Entertainment'
  }, {
    id: 'services',
    name: 'Services'
  }];
  
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery, 'in category:', category);
    // In a real app, this would trigger an API call
  };
  const handleCommunitySelect = (communityId: string) => {
    // In a real app, this would update the global state and redirect to the home page
    // with the selected community
    const community = getCommunityById(communityId);
    console.log(`Selected community: ${community.name}`);
    setCitySearchQuery('');
    setShowSuggestions(false);
    navigate('/dtg');
  };
  return <Layout>
      {/* Search Header */}
      <div className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Explore Downtown</h1>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Search for restaurants, shops, and more..." />
            </div>
            <div className="md:w-48">
              <select value={category} onChange={e => setCategory(e.target.value)} className="block w-full py-2 px-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                {categories.map(cat => <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>)}
              </select>
            </div>
            <button type="submit" className="bg-white text-blue-600 py-2 px-4 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Search
            </button>
          </form>
        </div>
      </div>
      {/* City Search Section - Simplified with Autofill */}
      <div className="bg-blue-50 py-8 border-b border-blue-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <GlobeIcon className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">
              Explore Another City
            </h2>
          </div>
          <p className="text-gray-600 mb-6">
            Discover local businesses, events, and attractions in cities across
            the country.
          </p>
          <div className="max-w-2xl">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPinIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" value={citySearchQuery} onChange={e => {
              setCitySearchQuery(e.target.value);
              setShowSuggestions(true);
            }} onFocus={() => setShowSuggestions(true)} className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 shadow-sm" placeholder="Search for a city..." />
              {/* Autofill Suggestions */} {showSuggestions && filteredCommunities.length > 0 && <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredCommunities.map(community => <button key={community.id} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between border-b border-gray-100" onClick={() => handleCommunitySelect(community.id)}>
                      <div className="flex items-center">
                        <MapPinIcon className="w-5 h-5 text-gray-500 mr-3" />
                        <span className="text-gray-800">{community.name}</span>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                    </button>)}
                </div>}
            </div>
            <div className="text-sm text-gray-600">
              <p>
                Don't see your city? We're constantly expanding to new
                locations.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Filter and Sort Bar */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-sm text-gray-700 hover:text-blue-600">
                <FilterIcon className="h-4 w-4 mr-1" />
                Filters
              </button>
              <button className="flex items-center text-sm text-gray-700 hover:text-blue-600">
                <ListFilterIcon className="h-4 w-4 mr-1" />
                Sort by: Relevance
              </button>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPinIcon className="h-4 w-4 mr-1" />
              <span>Current location: Downtown</span>
            </div>
          </div>
        </div>
      </div>
      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-6">Search Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockResults.map(result => <div key={result.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img src={result.image} alt={result.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{result.name}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {result.rating}★
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{result.category}</p>
                <p className="text-sm text-gray-600 mb-3">{result.address}</p>
                <p className="text-sm text-gray-700">{result.description}</p>
                <div className="mt-4 flex justify-between">
                  <Link to={`/dtg/business/${result.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details
                  </Link>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Save
                  </button>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </Layout>;
}
