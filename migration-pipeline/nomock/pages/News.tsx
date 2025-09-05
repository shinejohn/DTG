import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { NewspaperIcon, SearchIcon, CalendarIcon, FilterIcon, ChevronDownIcon } from 'lucide-react';
// Mock data for news - in a real app, this would come from an API
const allNewsItems = [{
  id: 1,
  title: 'New Downtown Art Gallery Opening This Weekend',
  source: 'Downtown Chronicle',
  date: 'Today',
  image: '/images/placeholder.jpg',
  content: 'The new Downtown Art Gallery is set to open this weekend with an exhibition featuring local artists. The gallery aims to showcase contemporary art and provide a platform for emerging artists in the community.',
  category: 'Arts & Culture'
}, {
  id: 2,
  title: 'City Council Approves New Restaurant Row Development',
  source: 'Local Business Times',
  date: 'Yesterday',
  image: '/images/placeholder.jpg',
  content: 'The City Council has approved plans for a new Restaurant Row development downtown. The project will feature a mix of local and national restaurant chains and is expected to create hundreds of jobs.',
  category: 'Business'
}, {
  id: 3,
  title: 'Downtown Farmers Market Expands to Twice Weekly',
  source: 'Community News',
  date: '2 days ago',
  image: '/images/placeholder.jpg',
  content: 'Due to popular demand, the Downtown Farmers Market will now be held twice weekly. Starting next month, the market will be open on both Saturdays and Wednesdays, giving residents more opportunities to purchase fresh, local produce.',
  category: 'Community'
}, {
  id: 4,
  title: 'Local Tech Startup Secures $5 Million in Funding',
  source: 'Tech Business Journal',
  date: '3 days ago',
  image: '/images/placeholder.jpg',
  content: 'A local tech startup has secured $5 million in Series A funding. The company, which specializes in AI-powered retail solutions, plans to use the funding to expand its team and accelerate product development.',
  category: 'Business'
}, {
  id: 5,
  title: 'New Bike Lanes to Be Added to Main Street',
  source: 'City Transportation News',
  date: '4 days ago',
  image: '/images/placeholder.jpg',
  content: 'The city has announced plans to add dedicated bike lanes to Main Street as part of its ongoing efforts to improve urban mobility and reduce carbon emissions. Construction is expected to begin next month.',
  category: 'Infrastructure'
}, {
  id: 6,
  title: 'Local School Wins National Science Competition',
  source: 'Education Weekly',
  date: '5 days ago',
  image: '/images/placeholder.jpg',
  content: 'Students from Lincoln High School have won first place in a prestigious national science competition. Their project on renewable energy solutions impressed the judges and earned the school a $50,000 grant.',
  category: 'Education'
}, {
  id: 7,
  title: 'Community Center Renovation Project Completed',
  source: 'Neighborhood News',
  date: '1 week ago',
  image: '/images/placeholder.jpg',
  content: 'The renovation of the Downtown Community Center has been completed. The updated facility now features a new gymnasium, expanded library, and modernized meeting spaces for community events and programs.',
  category: 'Community'
}, {
  id: 8,
  title: 'Local Chef Named Finalist in National Cooking Competition',
  source: 'Food & Dining Magazine',
  date: '1 week ago',
  image: '/images/placeholder.jpg',
  content: 'Chef Maria Rodriguez of Downtown Bistro has been named a finalist in a prestigious national cooking competition. Chef Rodriguez is known for her innovative approach to combining local ingredients with international flavors.',
  category: 'Food & Dining'
}];
export function News() {
  const [newsItems, setNewsItems] = useState(allNewsItems);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', 'Business', 'Community', 'Arts & Culture', 'Infrastructure', 'Education', 'Food & Dining'];
  const handleFilter = () => {
    let filtered = [...allNewsItems];
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(news => news.category === selectedCategory);
    }
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(news => news.title.toLowerCase().includes(searchQuery.toLowerCase()) || news.content.toLowerCase().includes(searchQuery.toLowerCase()) || news.source.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    // Apply sorting
    if (sortBy === 'newest') {
      // Already sorted by newest in our mock data
    } else if (sortBy === 'oldest') {
      filtered.reverse();
    }
    setNewsItems(filtered);
  };
  useEffect(() => {
    handleFilter();
  }, [selectedCategory, sortBy, searchQuery]);
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="bg-blue-600 py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-4">
              <NewspaperIcon className="w-8 h-8 text-white mr-3" />
              <h1 className="text-3xl font-bold text-white">Local News</h1>
            </div>
            <p className="text-blue-100 max-w-2xl">
              Stay informed with the latest news and updates from around the
              community. Discover what's happening in business, arts,
              infrastructure, and more.
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
                  <span className="text-gray-700 font-medium">Category:</span>
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
                    <option value="newest">Sort by: Newest First</option>
                    <option value="oldest">Sort by: Oldest First</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
                <div className="relative">
                  <input type="text" placeholder="Search news..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64" />
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-medium">{newsItems.length}</span>{' '}
              news articles
              {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
              {searchQuery ? ` matching "${searchQuery}"` : ''}
            </p>
          </div>
          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map(news => <Link key={news.id} to={`/news/${news.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {news.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {news.content}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{news.source}</span>
                    <span>{news.date}</span>
                  </div>
                </div>
              </Link>)}
          </div>
          {/* Empty State */}
          {newsItems.length === 0 && <div className="text-center py-12">
              <div className="mb-4">
                <NewspaperIcon className="w-12 h-12 text-gray-300 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No news articles found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Try adjusting your filters or search query to find what you're
                looking for.
              </p>
              <button onClick={() => {
            setSelectedCategory('All');
            setSortBy('newest');
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