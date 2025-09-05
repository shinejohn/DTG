import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SearchIcon, MapPinIcon, FilterIcon, ListIcon, MapIcon, StarIcon, DollarSignIcon, ClockIcon, CheckIcon, ChevronDownIcon, XIcon, SlidersIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
// Search parameters interface
interface SearchParams {
  q?: string; // search query
  category?: string;
  location?: string;
  radius?: number;
  priceRange?: string;
  rating?: number;
  openNow?: boolean;
  features?: string[];
  sort?: 'relevance' | 'rating' | 'distance' | 'newest';
  page?: number;
}
export function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMapView, setIsMapView] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    q: '',
    category: '',
    location: '',
    radius: 5,
    priceRange: '',
    rating: 0,
    openNow: false,
    features: [],
    sort: 'relevance',
    page: 1
  });
  const [totalResults, setTotalResults] = useState(0);
  // For demonstration purposes, determine if this is an interest-based brand
  // In a real application, this would come from your brand/user context
  const isInterestBased = true;
  const brandInterest = 'Food'; // Example interest
  // Parse query parameters on page load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newParams: SearchParams = {
      q: params.get('q') || '',
      category: params.get('category') || '',
      location: params.get('location') || '',
      radius: Number(params.get('radius')) || 5,
      priceRange: params.get('priceRange') || '',
      rating: Number(params.get('rating')) || 0,
      openNow: params.get('openNow') === 'true',
      features: params.get('features')?.split(',') || [],
      sort: params.get('sort') as SearchParams['sort'] || 'relevance',
      page: Number(params.get('page')) || 1
    };
    setSearchParams(newParams);
    // In a real app, this would fetch results based on these parameters
    fetchSearchResults(newParams);
  }, [location.search]);
  // Mock function to fetch search results
  const fetchSearchResults = (params: SearchParams) => {
    // In a real app, this would be an API call
    console.log('Fetching results with params:', params);
    setTotalResults(mockResults.length);
    // Simulate API delay
    setTimeout(() => {
      // Results would be set here
    }, 300);
  };
  // Update URL when filters change
  const updateFilters = (newParams: Partial<SearchParams>) => {
    const updatedParams = {
      ...searchParams,
      ...newParams,
      page: 1
    };
    setSearchParams(updatedParams);
    // Update URL query parameters
    const queryParams = new URLSearchParams();
    Object.entries(updatedParams).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && !(Array.isArray(value) && value.length === 0)) {
        if (Array.isArray(value)) {
          queryParams.set(key, value.join(','));
        } else {
          queryParams.set(key, String(value));
        }
      }
    });
    navigate(`/search?${queryParams.toString()}`);
  };
  // Handle sorting change
  const handleSortChange = (sort: SearchParams['sort']) => {
    updateFilters({
      sort
    });
  };
  // Handle page change
  const handlePageChange = (page: number) => {
    updateFilters({
      page
    });
  };
  // Toggle a feature filter
  const toggleFeature = (feature: string) => {
    const features = searchParams.features || [];
    const updatedFeatures = features.includes(feature) ? features.filter(f => f !== feature) : [...features, feature];
    updateFilters({
      features: updatedFeatures
    });
  };
  // Price range options
  const priceOptions = [{
    value: '$',
    label: '$',
    display: <DollarSignIcon className="w-4 h-4" />
  }, {
    value: '$$',
    label: '$$',
    display: <>
          <DollarSignIcon className="w-4 h-4" />
          <DollarSignIcon className="w-4 h-4" />
        </>
  }, {
    value: '$$$',
    label: '$$$',
    display: <>
          <DollarSignIcon className="w-4 h-4" />
          <DollarSignIcon className="w-4 h-4" />
          <DollarSignIcon className="w-4 h-4" />
        </>
  }, {
    value: '$$$$',
    label: '$$$$',
    display: <>
          <DollarSignIcon className="w-4 h-4" />
          <DollarSignIcon className="w-4 h-4" />
          <DollarSignIcon className="w-4 h-4" />
          <DollarSignIcon className="w-4 h-4" />
        </>
  }];
  // Category options
  const categoryOptions = [{
    value: '',
    label: 'All Categories'
  }, {
    value: 'restaurants',
    label: 'Restaurants'
  }, {
    value: 'shopping',
    label: 'Shopping'
  }, {
    value: 'entertainment',
    label: 'Entertainment'
  }, {
    value: 'services',
    label: 'Services'
  }, {
    value: 'nightlife',
    label: 'Nightlife'
  }, {
    value: 'wellness',
    label: 'Wellness'
  }];
  // Feature options
  const featureOptions = [{
    value: 'parking',
    label: 'Free Parking'
  }, {
    value: 'wifi',
    label: 'Free Wi-Fi'
  }, {
    value: 'delivery',
    label: 'Delivery'
  }, {
    value: 'takeout',
    label: 'Takeout'
  }, {
    value: 'outdoor',
    label: 'Outdoor Seating'
  }, {
    value: 'reservations',
    label: 'Reservations'
  }, {
    value: 'wheelchair',
    label: 'Wheelchair Accessible'
  }, {
    value: 'pet_friendly',
    label: 'Pet Friendly'
  }];
  // Sort options
  const sortOptions = [{
    value: 'relevance',
    label: 'Relevance'
  }, {
    value: 'rating',
    label: 'Highest Rated'
  }, {
    value: 'distance',
    label: 'Distance'
  }, {
    value: 'newest',
    label: 'Newest'
  }];
  // Mock data for search results
  const mockResults = [{
    id: 1,
    name: 'The Urban Café',
    category: 'Restaurants',
    subcategory: 'Café',
    rating: 4.8,
    reviewCount: 243,
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    address: '123 Main St, Downtown',
    distance: '0.3 miles',
    openNow: true,
    features: ['wifi', 'outdoor', 'takeout'],
    description: 'Cozy café with great coffee and pastries'
  }, {
    id: 2,
    name: 'Fashion Forward',
    category: 'Shopping',
    subcategory: 'Clothing',
    rating: 4.5,
    reviewCount: 187,
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3RvcmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    address: '456 Oak Ave, Downtown',
    distance: '0.5 miles',
    openNow: true,
    features: ['wheelchair', 'parking'],
    description: 'Trendy boutique with the latest styles'
  }, {
    id: 3,
    name: 'City Cinema',
    category: 'Entertainment',
    subcategory: 'Movie Theater',
    rating: 4.7,
    reviewCount: 312,
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2luZW1hfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    address: '789 Pine St, Downtown',
    distance: '0.8 miles',
    openNow: false,
    features: ['parking', 'wheelchair', 'reservations'],
    description: 'Modern movie theater with premium seating'
  }, {
    id: 4,
    name: 'Downtown Fitness',
    category: 'Services',
    subcategory: 'Gym',
    rating: 4.6,
    reviewCount: 156,
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    address: '101 Elm St, Downtown',
    distance: '1.2 miles',
    openNow: true,
    features: ['parking', 'wifi'],
    description: 'Full-service gym with state-of-the-art equipment'
  }, {
    id: 5,
    name: 'Riverfront Restaurant',
    category: 'Restaurants',
    subcategory: 'Fine Dining',
    rating: 4.9,
    reviewCount: 421,
    priceRange: '$$$$',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    address: '222 River Dr, Downtown',
    distance: '0.7 miles',
    openNow: true,
    features: ['reservations', 'outdoor', 'parking'],
    description: 'Upscale dining with scenic river views'
  }, {
    id: 6,
    name: 'Tech Hub Coworking',
    category: 'Services',
    subcategory: 'Coworking Space',
    rating: 4.7,
    reviewCount: 89,
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y293b3JraW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    address: '333 Tech Blvd, Downtown',
    distance: '0.4 miles',
    openNow: true,
    features: ['wifi', 'parking', 'wheelchair'],
    description: 'Modern coworking space with private offices and meeting rooms'
  }];
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header brandInterest={isInterestBased ? brandInterest : undefined} />
      <main className="flex-grow">
        {/* Search Header */}
        <div className="bg-blue-600 text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">
                  {searchParams.q ? `Results for "${searchParams.q}"` : 'Search Results'}
                </h1>
                <p className="text-blue-100 mt-1">
                  {totalResults}{' '}
                  {totalResults === 1 ? 'business' : 'businesses'} found
                  {searchParams.location ? ` near ${searchParams.location}` : ''}
                </p>
              </div>
              <div className="flex items-center">
                <button onClick={() => setIsMobileFiltersOpen(true)} className="md:hidden flex items-center bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-md mr-2">
                  <FilterIcon className="w-4 h-4 mr-1" />
                  Filters
                </button>
                <div className="relative">
                  <select value={searchParams.sort} onChange={e => handleSortChange(e.target.value as SearchParams['sort'])} className="appearance-none bg-blue-700 text-white px-4 py-2 pr-8 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    {sortOptions.map(option => <option key={option.value} value={option.value}>
                        Sort: {option.label}
                      </option>)}
                  </select>
                  <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                </div>
                <div className="ml-3 bg-blue-700 rounded-md overflow-hidden flex">
                  <button className={`px-3 py-2 flex items-center ${!isMapView ? 'bg-blue-800' : ''}`} onClick={() => setIsMapView(false)}>
                    <ListIcon className="w-4 h-4" />
                  </button>
                  <button className={`px-3 py-2 flex items-center ${isMapView ? 'bg-blue-800' : ''}`} onClick={() => setIsMapView(true)}>
                    <MapIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filters Sidebar (overlay) */}
        {isMobileFiltersOpen && <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg overflow-y-auto">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-medium text-lg">Filters</h3>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                {/* Filter content - same as desktop sidebar */}
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Category</h3>
                  <select value={searchParams.category} onChange={e => updateFilters({
                category: e.target.value
              })} className="w-full border border-gray-300 rounded-md px-3 py-2">
                    {categoryOptions.map(option => <option key={option.value} value={option.value}>
                        {option.label}
                      </option>)}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Price</h3>
                  <div className="flex space-x-2">
                    {priceOptions.map(option => <button key={option.value} onClick={() => updateFilters({
                  priceRange: option.value
                })} className={`flex-1 py-2 border rounded-md flex justify-center items-center ${searchParams.priceRange === option.value ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                        {option.label}
                      </button>)}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => <button key={rating} onClick={() => updateFilters({
                  rating
                })} className={`w-full py-2 px-3 border rounded-md flex items-center ${searchParams.rating === rating ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />)}
                        </div>
                        <span className="ml-2">& Up</span>
                      </button>)}
                  </div>
                </div>

                {/* Distance Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Distance</h3>
                  <select value={searchParams.radius} onChange={e => updateFilters({
                radius: Number(e.target.value)
              })} className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value={1}>Within 1 mile</option>
                    <option value={5}>Within 5 miles</option>
                    <option value={10}>Within 10 miles</option>
                    <option value={25}>Within 25 miles</option>
                  </select>
                </div>

                {/* Open Now Toggle */}
                <div className="mb-6">
                  <button onClick={() => updateFilters({
                openNow: !searchParams.openNow
              })} className={`w-full py-2 px-3 border rounded-md flex items-center justify-between ${searchParams.openNow ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      <span>Open Now</span>
                    </div>
                    {searchParams.openNow && <CheckIcon className="w-4 h-4" />}
                  </button>
                </div>

                {/* Features Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Features</h3>
                  <div className="space-y-2">
                    {featureOptions.map(feature => <button key={feature.value} onClick={() => toggleFeature(feature.value)} className={`w-full py-2 px-3 border rounded-md flex items-center justify-between ${searchParams.features?.includes(feature.value) ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                        <span>{feature.label}</span>
                        {searchParams.features?.includes(feature.value) && <CheckIcon className="w-4 h-4" />}
                      </button>)}
                  </div>
                </div>

                {/* Apply Filters Button */}
                <button onClick={() => setIsMobileFiltersOpen(false)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>}

        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Desktop Filters Sidebar */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-medium text-lg">Filters</h2>
                  <button onClick={() => updateFilters({
                  category: '',
                  priceRange: '',
                  rating: 0,
                  radius: 5,
                  openNow: false,
                  features: []
                })} className="text-blue-600 text-sm hover:text-blue-800">
                    Clear All
                  </button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Category</h3>
                  <select value={searchParams.category} onChange={e => updateFilters({
                  category: e.target.value
                })} className="w-full border border-gray-300 rounded-md px-3 py-2">
                    {categoryOptions.map(option => <option key={option.value} value={option.value}>
                        {option.label}
                      </option>)}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Price</h3>
                  <div className="flex space-x-2">
                    {priceOptions.map(option => <button key={option.value} onClick={() => updateFilters({
                    priceRange: option.value
                  })} className={`flex-1 py-2 border rounded-md flex justify-center items-center ${searchParams.priceRange === option.value ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                        {option.label}
                      </button>)}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => <button key={rating} onClick={() => updateFilters({
                    rating
                  })} className={`w-full py-2 px-3 border rounded-md flex items-center ${searchParams.rating === rating ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />)}
                        </div>
                        <span className="ml-2">& Up</span>
                      </button>)}
                  </div>
                </div>

                {/* Distance Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Distance</h3>
                  <select value={searchParams.radius} onChange={e => updateFilters({
                  radius: Number(e.target.value)
                })} className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value={1}>Within 1 mile</option>
                    <option value={5}>Within 5 miles</option>
                    <option value={10}>Within 10 miles</option>
                    <option value={25}>Within 25 miles</option>
                  </select>
                </div>

                {/* Open Now Toggle */}
                <div className="mb-6">
                  <button onClick={() => updateFilters({
                  openNow: !searchParams.openNow
                })} className={`w-full py-2 px-3 border rounded-md flex items-center justify-between ${searchParams.openNow ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      <span>Open Now</span>
                    </div>
                    {searchParams.openNow && <CheckIcon className="w-4 h-4" />}
                  </button>
                </div>

                {/* Features Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Features</h3>
                  <div className="space-y-2">
                    {featureOptions.map(feature => <button key={feature.value} onClick={() => toggleFeature(feature.value)} className={`w-full py-2 px-3 border rounded-md flex items-center justify-between ${searchParams.features?.includes(feature.value) ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                        <span>{feature.label}</span>
                        {searchParams.features?.includes(feature.value) && <CheckIcon className="w-4 h-4" />}
                      </button>)}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow">
              {isMapView ?
            // Map View
            <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[calc(100vh-240px)] min-h-[500px]">
                  <div className="h-full bg-gray-100 flex items-center justify-center">
                    <div className="text-center p-6">
                      <MapIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Map View
                      </h3>
                      <p className="text-gray-600">
                        In a real application, this would display an interactive
                        map with business locations.
                      </p>
                    </div>
                  </div>
                </div> :
            // List View
            <div>
                  {/* Active Filters */}
                  {(searchParams.category || searchParams.priceRange || searchParams.rating > 0 || searchParams.openNow || searchParams.features && searchParams.features.length > 0) && <div className="bg-white rounded-lg shadow-sm p-3 mb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-gray-600 mr-1">
                          Active filters:
                        </span>
                        {searchParams.category && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                            {categoryOptions.find(c => c.value === searchParams.category)?.label}
                            <button onClick={() => updateFilters({
                      category: ''
                    })} className="ml-1 text-blue-600 hover:text-blue-800">
                              <XIcon className="w-3 h-3" />
                            </button>
                          </span>}
                        {searchParams.priceRange && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                            Price: {searchParams.priceRange}
                            <button onClick={() => updateFilters({
                      priceRange: ''
                    })} className="ml-1 text-blue-600 hover:text-blue-800">
                              <XIcon className="w-3 h-3" />
                            </button>
                          </span>}
                        {searchParams.rating > 0 && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                            {searchParams.rating}+ Stars
                            <button onClick={() => updateFilters({
                      rating: 0
                    })} className="ml-1 text-blue-600 hover:text-blue-800">
                              <XIcon className="w-3 h-3" />
                            </button>
                          </span>}
                        {searchParams.openNow && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                            Open Now
                            <button onClick={() => updateFilters({
                      openNow: false
                    })} className="ml-1 text-blue-600 hover:text-blue-800">
                              <XIcon className="w-3 h-3" />
                            </button>
                          </span>}
                        {searchParams.features?.map(feature => <span key={feature} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                            {featureOptions.find(f => f.value === feature)?.label}
                            <button onClick={() => toggleFeature(feature)} className="ml-1 text-blue-600 hover:text-blue-800">
                              <XIcon className="w-3 h-3" />
                            </button>
                          </span>)}
                        <button onClick={() => updateFilters({
                    category: '',
                    priceRange: '',
                    rating: 0,
                    openNow: false,
                    features: []
                  })} className="text-blue-600 text-xs hover:text-blue-800 ml-auto">
                          Clear All
                        </button>
                      </div>
                    </div>}

                  {/* Results Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockResults.map(result => <div key={result.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-48 relative">
                          <img src={result.image} alt={result.name} className="w-full h-full object-cover" />
                          {result.openNow && <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 m-2 rounded">
                              Open Now
                            </div>}
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-lg font-semibold">
                              {result.name}
                            </h3>
                            <div className="flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              <StarIcon className="w-3 h-3 mr-1" />
                              <span>{result.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <span>{result.category}</span>
                            <span className="mx-2">•</span>
                            <span>{result.subcategory}</span>
                            <span className="mx-2">•</span>
                            <span>{result.priceRange}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <MapPinIcon className="w-4 h-4 mr-1" />
                            <span>{result.address}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">
                            {result.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {result.features.map(feature => <span key={feature} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                                {featureOptions.find(f => f.value === feature)?.label}
                              </span>)}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              {result.reviewCount} reviews
                            </span>
                            <Link to={`/business/${result.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>)}
                  </div>

                  {/* Pagination */}
                  <div className="mt-8 flex justify-center">
                    <nav className="flex items-center space-x-2">
                      <button onClick={() => handlePageChange(Math.max(1, searchParams.page! - 1))} disabled={searchParams.page === 1} className={`px-3 py-2 rounded-md ${searchParams.page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}>
                        Previous
                      </button>
                      {[1, 2, 3].map(page => <button key={page} onClick={() => handlePageChange(page)} className={`px-3 py-2 rounded-md ${searchParams.page === page ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                          {page}
                        </button>)}
                      <button onClick={() => handlePageChange(searchParams.page! + 1)} className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                        Next
                      </button>
                    </nav>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}