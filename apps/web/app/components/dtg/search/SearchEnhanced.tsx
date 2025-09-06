import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { SearchIcon, FilterIcon, XIcon, VideoIcon, MapPinIcon } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

export interface SearchFilters {
  query: string;
  category: string;
  location?: string;
  priceRange?: [number, number];
  rating?: number;
  contentType: 'all' | 'business' | 'event' | 'deal' | 'video' | 'news';
  sortBy: 'relevance' | 'rating' | 'distance' | 'recent';
}

export interface SearchSuggestion {
  id: string;
  title: string;
  type: 'business' | 'event' | 'deal' | 'video';
  category?: string;
}

interface EnhancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  suggestions?: SearchSuggestion[];
  isLoading?: boolean;
  placeholder?: string;
  showAdvancedFilters?: boolean;
}

export function EnhancedSearch({
  onSearch,
  suggestions = [],
  isLoading = false,
  placeholder = "Search businesses, events, deals, videos...",
  showAdvancedFilters = true
}: EnhancedSearchProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    contentType: (searchParams.get('type') as SearchFilters['contentType']) || 'all',
    sortBy: (searchParams.get('sort') as SearchFilters['sortBy']) || 'relevance',
    rating: searchParams.get('rating') ? Number(searchParams.get('rating')) : undefined,
  });

  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const debouncedQuery = useDebounce(filters.query, 300);

  // Handle search submission
  const handleSearch = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    onSearch(filters);
    setShowSuggestions(false);
  }, [filters, onSearch]);

  // Update filters
  const updateFilter = <K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      query: '',
      category: '',
      contentType: 'all',
      sortBy: 'relevance',
      rating: undefined,
      priceRange: undefined,
      location: undefined
    });
  };

  // Show suggestions when query changes
  useEffect(() => {
    if (debouncedQuery.length > 2) {
      setShowSuggestions(true);
    }
  }, [debouncedQuery]);

  const contentTypeIcons = {
    all: null,
    business: <MapPinIcon className="w-4 h-4" />,
    event: <CalendarIcon className="w-4 h-4" />,
    deal: <TagIcon className="w-4 h-4" />,
    video: <VideoIcon className="w-4 h-4" />,
    news: <NewspaperIcon className="w-4 h-4" />
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Main search bar */}
        <div className="relative">
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-3 text-gray-400 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              value={filters.query}
              onChange={(e) => updateFilter('query', e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              placeholder={placeholder}
              className="w-full pl-10 pr-24 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              aria-label="Search"
            />
            {filters.query && (
              <button
                type="button"
                onClick={() => updateFilter('query', '')}
                className="absolute right-20 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <XIcon className="w-5 h-5" />
              </button>
            )}
            <div className="absolute right-3 flex items-center space-x-2">
              {showAdvancedFilters && (
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 rounded hover:bg-gray-100 ${showFilters ? 'text-blue-600' : 'text-gray-600'}`}
                  aria-label="Toggle filters"
                >
                  <FilterIcon className="w-5 h-5" />
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>

          {/* Search suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  type="button"
                  onClick={() => {
                    updateFilter('query', suggestion.title);
                    setShowSuggestions(false);
                    handleSearch();
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b last:border-b-0"
                >
                  <span className="text-gray-400">
                    {contentTypeIcons[suggestion.type] || <SearchIcon className="w-4 h-4" />}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{suggestion.title}</p>
                    {suggestion.category && (
                      <p className="text-sm text-gray-500">{suggestion.category}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 uppercase">{suggestion.type}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Advanced filters */}
        {showFilters && showAdvancedFilters && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Content Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content Type
                </label>
                <select
                  value={filters.contentType}
                  onChange={(e) => updateFilter('contentType', e.target.value as SearchFilters['contentType'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="business">Businesses</option>
                  <option value="event">Events</option>
                  <option value="deal">Deals</option>
                  <option value="video">Videos</option>
                  <option value="news">News</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => updateFilter('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  <option value="restaurant">Restaurants</option>
                  <option value="retail">Retail</option>
                  <option value="service">Services</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="health">Health & Wellness</option>
                  <option value="education">Education</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value as SearchFilters['sortBy'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Rating</option>
                  <option value="distance">Distance</option>
                  <option value="recent">Most Recent</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Rating
                </label>
                <select
                  value={filters.rating || ''}
                  onChange={(e) => updateFilter('rating', e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

// Icons that might be missing from lucide-react
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );
}

function NewspaperIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  );
}

export default EnhancedSearch;