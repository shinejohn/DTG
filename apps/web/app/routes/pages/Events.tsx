import React, { useEffect, useState } from 'react';
import { useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '@/components/dtg/Header';
import { Footer } from '@/components/dtg/Footer';
import { CalendarIcon, SearchIcon, FilterIcon, ChevronDownIcon, ClockIcon, MapPinIcon, UsersIcon, TagIcon } from 'lucide-react';
import { Link } from 'react-router';
import { EventsCalendar } from '@/components/dtg/EventsCalendar';
const allEventItems = [{
  id: 101,
  title: 'Summer Night Market',
  date: 'This Friday, 6-10 PM',
  dateObj: new Date(2023, 4, 19, 18, 0),
  location: 'Main Street Plaza',
  image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  description: 'Join us for the Summer Night Market featuring local vendors, artisans, food trucks, and live music. A perfect evening out for the whole family.',
  category: 'Market',
  attendees: 342,
  price: 'Free',
  duration: '4 hours',
  weather: {
    condition: 'sunny',
    temperature: 76
  },
  coordinates: {
    lat: 40.7128,
    lng: -74.006
  }
}, {
  id: 102,
  title: 'Local Music Festival',
  date: 'This Weekend, All Day',
  dateObj: new Date(2023, 4, 20, 10, 0),
  location: 'Riverside Park',
  image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  description: 'A two-day celebration of local music featuring over 20 bands across three stages. Food vendors, craft beer, and family activities will be available.',
  category: 'Music',
  attendees: 1250,
  price: '$25',
  duration: 'All day',
  weather: {
    condition: 'cloudy',
    temperature: 72
  },
  coordinates: {
    lat: 40.7831,
    lng: -73.9712
  }
}, {
  id: 103,
  title: 'Food & Wine Tasting Tour',
  date: 'Next Tuesday, 7-9 PM',
  dateObj: new Date(2023, 4, 23, 19, 0),
  location: 'Various Downtown Restaurants',
  image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  description: 'Sample the best food and wine from downtown restaurants on this guided walking tour. Each stop includes a signature dish paired with a complementary wine.',
  category: 'Food & Drink',
  attendees: 75,
  price: '$65',
  duration: '2 hours',
  coordinates: {
    lat: 40.7112,
    lng: -74.0055
  }
}, {
  id: 104,
  title: 'Tech Startup Networking Mixer',
  date: 'Next Wednesday, 6-8 PM',
  dateObj: new Date(2023, 4, 24, 18, 0),
  location: 'Innovation Hub',
  image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  description: 'Connect with local entrepreneurs, investors, and tech professionals at this casual networking event. Complimentary drinks and appetizers will be served.',
  category: 'Networking',
  attendees: 120,
  price: '$10',
  duration: '2 hours',
  coordinates: {
    lat: 40.7484,
    lng: -73.9857
  }
}, {
  id: 105,
  title: 'Outdoor Yoga in the Park',
  date: 'Every Saturday, 9-10 AM',
  dateObj: new Date(2023, 4, 20, 9, 0),
  location: 'Central Park',
  image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  description: 'Start your weekend with an energizing yoga session in the beautiful surroundings of Central Park. All levels welcome. Bring your own mat.',
  category: 'Fitness',
  attendees: 45,
  price: '$5',
  duration: '1 hour',
  weather: {
    condition: 'sunny',
    temperature: 68
  },
  coordinates: {
    lat: 40.7812,
    lng: -73.9665
  }
}, {
  id: 106,
  title: 'Craft Beer Festival',
  date: 'June 3, 12-6 PM',
  dateObj: new Date(2023, 5, 3, 12, 0),
  location: 'Brewery District',
  image: 'https://images.unsplash.com/photo-1575367439058-6096bb9cf5e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  description: 'Sample over 100 craft beers from 30+ local and regional breweries. Ticket includes a souvenir tasting glass and 15 sample tickets.',
  category: 'Food & Drink',
  attendees: 850,
  price: '$45',
  duration: '6 hours',
  weather: {
    condition: 'sunny',
    temperature: 80
  },
  coordinates: {
    lat: 40.7215,
    lng: -74.0045
  }
}, {
  id: 107,
  title: 'Downtown Art Walk',
  date: 'First Friday of June, 5-9 PM',
  dateObj: new Date(2023, 5, 2, 17, 0),
  location: 'Arts District',
  image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  description: 'Explore downtown galleries and art studios during this self-guided tour. Meet artists, enjoy refreshments, and discover new artwork.',
  category: 'Arts & Culture',
  attendees: 300,
  price: 'Free',
  duration: '4 hours',
  coordinates: {
    lat: 40.7234,
    lng: -74.006
  }
}, {
  id: 108,
  title: 'Charity 5K Run/Walk',
  date: 'June 10, 8 AM',
  dateObj: new Date(2023, 5, 10, 8, 0),
  location: 'Waterfront Park',
  image: 'https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  description: 'Join us for the annual charity 5K to raise funds for local education programs. All participants receive a t-shirt and finisher medal.',
  category: 'Sports',
  attendees: 520,
  price: '$30',
  duration: '3 hours',
  weather: {
    condition: 'cloudy',
    temperature: 65
  },
  coordinates: {
    lat: 40.7023,
    lng: -74.016
  }
}];
export default function Events() {
  const [eventItems, setEventItems] = useState(allEventItems);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('calendar');
  const categories = ['All', 'Music', 'Food & Drink', 'Arts & Culture', 'Sports', 'Fitness', 'Networking', 'Market'];
  const handleFilter = () => {
    let filtered = [...allEventItems];
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }
    // Apply price filter
    if (priceFilter === 'free') {
      filtered = filtered.filter(event => event.price === 'Free');
    } else if (priceFilter === 'paid') {
      filtered = filtered.filter(event => event.price !== 'Free');
    }
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(event => event.title.toLowerCase().includes(searchQuery.toLowerCase()) || event.description.toLowerCase().includes(searchQuery.toLowerCase()) || event.location.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    // Apply sorting
    if (sortBy === 'date') {
      filtered.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());
    } else if (sortBy === 'popularity') {
      filtered.sort((a, b) => b.attendees - a.attendees);
    }
    setEventItems(filtered);
  };
  useEffect(() => {
    handleFilter();
  }, [selectedCategory, sortBy, searchQuery, priceFilter]);
  const handleFilterChange = (filters: any) => {
    // Apply filters from the calendar component
    if (filters.categories.length > 0) {
      setSelectedCategory(filters.categories[0]);
    }
    if (filters.price === 'free') {
      setPriceFilter('free');
    }
  };
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="bg-blue-600 py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-4">
              <CalendarIcon className="w-8 h-8 text-white mr-3" />
              <h1 className="text-3xl font-bold text-white">Upcoming Events</h1>
            </div>
            <p className="text-blue-100 max-w-2xl">
              Never miss what matters - your community's social hub. Discover
              exciting events happening nearby, connect with attendees, and keep
              track of your social calendar all in one place.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          {/* View Toggle */}
          <div className="flex justify-end mb-4">
            <div className="inline-flex rounded-md shadow-sm">
              <button onClick={() => setViewMode('calendar')} className={`px-4 py-2 text-sm font-medium rounded-l-lg ${viewMode === 'calendar' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
                Calendar View
              </button>
              <button onClick={() => setViewMode('list')} className={`px-4 py-2 text-sm font-medium rounded-r-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
                List View
              </button>
            </div>
          </div>
          {/* Calendar View */} {viewMode === 'calendar' && <EventsCalendar events={eventItems} onFilterChange={handleFilterChange} />} {/* List View */} {viewMode === 'list' && <>
              {/* Filters and Search */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                    <div className="flex items-center">
                      <FilterIcon className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-gray-700 font-medium">
                        Category:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={`px-3 py-1 text-sm rounded-full ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} `}>
                          {category}
                        </button>)}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="relative">
                      <select value={priceFilter} onChange={e => setPriceFilter(e.target.value)} className="appearance-none bg-gray-100 text-gray-700 py-2 pl-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="all">All Prices</option>
                        <option value="free">Free Only</option>
                        <option value="paid">Paid Only</option>
                      </select>
                      <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                    <div className="relative">
                      <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="appearance-none bg-gray-100 text-gray-700 py-2 pl-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="date">Sort by: Date</option>
                        <option value="popularity">Sort by: Popularity</option>
                      </select>
                      <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                    <div className="relative">
                      <input type="text" placeholder="Search events..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64" />
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing{' '}
                  <span className="font-medium">{eventItems.length}</span>{' '}
                  events
                  {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''} {priceFilter !== 'all' ? ` (${priceFilter === 'free' ? 'Free' : 'Paid'} events)` : ''} {searchQuery ? ` matching "${searchQuery}"` : ''}
                </p>
              </div>
              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventItems.map(event => <Link key={event.id} to={`/events/${event.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden relative">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-2 py-1 m-2 rounded">
                        {event.price}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-2">
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          {event.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {event.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <ClockIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span>{event.location}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <UsersIcon className="w-3 h-3 mr-1" />
                        <span>{event.attendees} people interested</span>
                      </div>
                    </div>
                  </Link>)}
              </div>
              {/* Empty State */} {eventItems.length === 0 && <div className="text-center py-12">
                  <div className="mb-4">
                    <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No events found
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Try adjusting your filters or search query to find what
                    you're looking for.
                  </p>
                  <button onClick={() => {
              setSelectedCategory('All');
              setSortBy('date');
              setSearchQuery('');
              setPriceFilter('all');
            } } className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Reset Filters
                  </button>
                </div>}
            </>}
        </div>
      </main>
      <Footer />
    </div>;
}
