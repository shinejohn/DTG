import type { Route } from './+types/route';
import React, { useEffect, useState, useRef } from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { SearchIcon, MapPinIcon, XIcon } from 'lucide-react';
import { getAllCommunities } from '../services/CommunityService';
interface CitySearchBarProps {
  onCitySelect: (communityId: string) => void;
}
export default function CitySearchBar({
  onCitySelect
}: CitySearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [communities, setCommunities] = useState<Array<{
    id: string;
    name: string;
  }>>([]);
  const [filteredCommunities, setFilteredCommunities] = useState<Array<{
    id: string;
    name: string;
  }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Load all communities
  useEffect(() => {
    const allCommunities = getAllCommunities();
    setCommunities(allCommunities);
  }, []);
  // Filter communities based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCommunities(communities.slice(0, 5)); // Show top 5 communities when empty
    } else {
      const filtered = communities.filter(community => community.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 10); // Limit to 10 results
      setFilteredCommunities(filtered);
    }
  }, [searchQuery, communities]);
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleCommunitySelect = (communityId: string) => {
    const community = communities.find(c => c.id === communityId);
    if (community) {
      setSearchQuery(community.name);
      onCitySelect(communityId);
      setIsFocused(false);
    }
  };
  const clearSearch = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };
  return <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPinIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input ref={inputRef} type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onFocus={() => setIsFocused(true)} className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm" placeholder="Search for a city to explore..." />
        {searchQuery && <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
            <XIcon className="h-5 w-5" />
          </button>}
      </div>
      {isFocused && <div ref={dropdownRef} className="absolute mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          {filteredCommunities.length > 0 ? <ul className="max-h-60 overflow-auto py-1">
              {filteredCommunities.map(community => <li key={community.id}>
                  <button onClick={() => handleCommunitySelect(community.id)} className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center">
                    <MapPinIcon className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-800">{community.name}</span>
                  </button>
                </li>)}
            </ul> : <div className="p-4 text-center text-gray-500">
              No cities found matching your search
            </div>}
          <div className="p-2 border-t border-gray-100 text-xs text-gray-500 text-center">
            Search for any city to explore local businesses and events
          </div>
        </div>}
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