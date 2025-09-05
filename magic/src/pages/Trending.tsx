import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { TrendingUpIcon, StarIcon, MapPinIcon, UsersIcon, FilterIcon, SearchIcon, ChevronDownIcon } from 'lucide-react';
// Mock data for trending businesses - in a real app, this would come from an API
const allTrendingBusinesses = [{
  id: 101,
  name: 'The Rooftop Lounge',
  category: 'Nightlife',
  rating: 4.9,
  reviews: 187,
  image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  address: '789 Skyline Ave, Downtown',
  trending: 'Hot spot this weekend',
  visitCount: 542
}, {
  id: 102,
  name: 'Artisan Bakery',
  category: 'Food & Drink',
  rating: 4.7,
  reviews: 143,
  image: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  address: '123 Main St, Downtown',
  trending: 'New menu items',
  visitCount: 328
}, {
  id: 103,
  name: 'Tech Hub Coworking',
  category: 'Services',
  rating: 4.8,
  reviews: 95,
  image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  address: '456 Innovation Blvd, Downtown',
  trending: 'Free trial week',
  visitCount: 217
}, {
  id: 104,
  name: 'Vintage Clothing Co.',
  category: 'Shopping',
  rating: 4.6,
  reviews: 112,
  image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  address: '321 Fashion St, Downtown',
  trending: 'Summer sale',
  visitCount: 189
}, {
  id: 105,
  name: 'Urban Fitness Center',
  category: 'Health & Fitness',
  rating: 4.8,
  reviews: 203,
  image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  address: '555 Wellness Way, Downtown',
  trending: 'New classes added',
  visitCount: 412
}, {
  id: 106,
  name: 'Craft Brewery & Taproom',
  category: 'Nightlife',
  rating: 4.7,
  reviews: 176,
  image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  address: '888 Brew St, Downtown',
  trending: 'Limited edition release',
  visitCount: 298
}, {
  id: 107,
  name: 'Modern Art Gallery',
  category: 'Arts & Culture',
  rating: 4.5,
  reviews: 89,
  image: 'https://images.unsplash.com/photo-1594971475874-b7af76456cde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  address: '123 Creative Blvd, Downtown',
  trending: 'New exhibition',
  visitCount: 175
}, {
  id: 108,
  name: 'Gourmet Coffee Shop',
  category: 'Food & Drink',
  rating: 4.9,
  reviews: 231,
  image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  address: '456 Bean St, Downtown',
  trending: 'Specialty roasts',
  visitCount: 387
}];
export function Trending() {
  const [businesses, setBusinesses] = useState(allTrendingBusinesses);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', 'Nightlife', 'Food & Drink', 'Shopping', 'Services', 'Health & Fitness', 'Arts & Culture'];
  useEffect(() => {
    let filtered = [...allTrendingBusinesses];
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(business => business.category === selectedCategory);
    }
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(business => business.name.toLowerCase().includes(searchQuery.toLowerCase()) || business.address.toLowerCase().includes(searchQuery.toLowerCase()) || business.category.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'trending') {
        return b.visitCount - a.visitCount;
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'reviews') {
        return b.reviews - a.reviews;
      }
      return 0;
    });
    setBusinesses(filtered);
  }, [selectedCategory, sortBy, searchQuery]);
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="bg-blue-600 py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-4">
              <TrendingUpIcon className="w-8 h-8 text-white mr-3" />
              <h1 className="text-3xl font-bold text-white">
                Trending Businesses
              </h1>
            </div>
            <p className="text-blue-100 max-w-2xl">
              Discover the most popular and trending businesses in your area.
              These places are buzzing with activity and offer exciting new
              experiences.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <FilterIcon className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="text-gray-700 font-medium">Filter:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={`px-3 py-1 text-sm rounded-full ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      {category}
                    </button>)}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="appearance-none bg-gray-100 text-gray-700 py-2 pl-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="trending">Sort by: Most Visited</option>
                    <option value="rating">Sort by: Highest Rated</option>
                    <option value="reviews">Sort by: Most Reviewed</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
                <div className="relative">
                  <input type="text" placeholder="Search businesses..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64" />
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-medium">{businesses.length}</span>{' '}
              trending businesses
              {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
              {searchQuery ? ` matching "${searchQuery}"` : ''}
            </p>
          </div>
          {/* Business Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {businesses.map(business => <div key={business.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 m-2 rounded">
                    {business.trending}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-semibold">{business.name}</h3>
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">
                        {business.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-blue-600 mb-2">
                    {business.category}
                  </p>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    <span>{business.address}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <UsersIcon className="w-4 h-4 mr-1" />
                    <span>{business.visitCount} people visited this week</span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {business.reviews} reviews
                    </span>
                    <Link to={`/business/${business.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>)}
          </div>
          {/* Empty State */}
          {businesses.length === 0 && <div className="text-center py-12">
              <div className="mb-4">
                <TrendingUpIcon className="w-12 h-12 text-gray-300 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No trending businesses found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Try adjusting your filters or search query to find what you're
                looking for.
              </p>
              <button onClick={() => {
            setSelectedCategory('All');
            setSortBy('trending');
            setSearchQuery('');
          }} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Reset Filters
              </button>
            </div>}
        </div>
      </main>
      <Footer />
    </div>;
}