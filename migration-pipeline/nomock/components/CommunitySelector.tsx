import React, { useEffect, useState } from 'react';
import { SearchIcon, MapPinIcon, XIcon } from 'lucide-react';
import { getAllCommunities } from '../services/CommunityService';
interface CommunitySelectorProps {
  currentCommunity: string;
  onCommunityChange: (community: string) => void;
  availableCommunities?: Array<{
    id: string;
    name: string;
  }>;
}
export function CommunitySelector({
  currentCommunity,
  onCommunityChange,
  availableCommunities
}: CommunitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [communities, setCommunities] = useState<Array<{
    id: string;
    name: string;
  }>>([]);
  // Load communities - either provided or from service
  useEffect(() => {
    if (availableCommunities) {
      setCommunities(availableCommunities);
    } else {
      // Fallback to all communities if none provided
      const allCommunities = getAllCommunities();
      setCommunities(allCommunities.map(c => ({
        id: c.id,
        name: c.name
      })));
    }
  }, [availableCommunities]);
  const filteredCommunities = searchQuery.trim() === '' ? communities : communities.filter(community => community.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleCommunitySelect = (communityId: string, communityName: string) => {
    onCommunityChange(communityId);
    setIsOpen(false);
    setSearchQuery('');
  };
  return <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center text-white bg-blue-700 bg-opacity-30 hover:bg-opacity-40 rounded-full px-4 py-2 transition-colors">
        <MapPinIcon className="w-4 h-4 mr-2" />
        <span>{currentCommunity}</span>
      </button>
      {isOpen && <div className="absolute mt-2 w-80 bg-white rounded-lg shadow-xl z-50">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-900">Select a community</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-500">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Search communities..." />
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredCommunities.length > 0 ? <ul className="divide-y divide-gray-200">
                  {filteredCommunities.map(community => <li key={community.id}>
                      <button onClick={() => handleCommunitySelect(community.id, community.name)} className="w-full text-left px-3 py-3 hover:bg-gray-50 flex items-center">
                        <MapPinIcon className="w-4 h-4 text-gray-400 mr-2" />
                        <span>{community.name}</span>
                      </button>
                    </li>)}
                </ul> : <div className="text-center py-4 text-gray-500">
                  No communities found
                </div>}
            </div>
          </div>
        </div>}
    </div>;
}