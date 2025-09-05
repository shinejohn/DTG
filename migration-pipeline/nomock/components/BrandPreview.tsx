import React, { useState, useRef } from 'react';
import { useParams, Link, useLoaderData } from 'react-router-dom';
import { Footer } from './Footer';
import { useBrand } from '../contexts/BrandContext';
import { CalendarIcon, MapPinIcon, ClockIcon, SearchIcon, StarIcon, TrendingUpIcon, MessageCircleIcon, UserIcon, BellIcon, MenuIcon, ChevronRightIcon, ChevronLeftIcon, HeartIcon, CheckIcon, NewspaperIcon, ShoppingBagIcon, UtensilsIcon, MusicIcon, CoffeeIcon, BuildingIcon, TagIcon, GlassWaterIcon } from 'lucide-react';
import type { Route } from './+types/brand-preview';

// Define types for our data
interface Business {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
  featured?: boolean;
  trending?: boolean;
}

interface CommunityActivity {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  type: 'review' | 'check-in';
  business: string;
  content: string;
  rating?: number;
  timeAgo: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
}

interface NewsItem {
  id: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
}

// React Router 7 loader function
export async function loader({ params }: Route.LoaderArgs) {
  const { brandId } = params;
  
  // TODO: Replace with actual Supabase queries
  // const { supabase } = getSupabaseServerClient(request);
  
  // For now, return empty data structure
  return {
    featuredBusinesses: [] as Business[],
    trendingBusinesses: [] as Business[],
    communityActivity: [] as CommunityActivity[],
    events: [] as Event[],
    newsItems: [] as NewsItem[]
  };
}

export function BrandPreview() {
  const { brandId } = useParams<{ brandId: string }>();
  const { brands } = useBrand();
  const brand = brands.find(b => b.id === brandId);
  
  // Get data from loader
  const { 
    featuredBusinesses, 
    trendingBusinesses, 
    communityActivity, 
    events, 
    newsItems 
  } = useLoaderData<typeof loader>();
  
  const [activeTab, setActiveTab] = useState<'events' | 'news'>('events');
  const [selectedLocation, setSelectedLocation] = useState('New York City');
  const featuredBusinessesRef = useRef<HTMLDivElement>(null);
  
  // Scroll controls for horizontal scrolling
  const scrollFeatured = (direction: 'left' | 'right') => {
    if (featuredBusinessesRef.current) {
      const scrollAmount = 320;
      if (direction === 'left') {
        featuredBusinessesRef.current.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth'
        });
      } else {
        featuredBusinessesRef.current.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  };
  
  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Brand Not Found</h2>
          <p className="text-gray-600">
            The brand you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }
  
  // Replace placeholders in content with safe fallbacks
  const title = (brand.experience?.headline || 'Discover {city}').replace('{city}', selectedLocation);
  const subtitle = (brand.experience?.description || 'Explore the best local businesses, events, and experiences in {city}.').replace('{city}', selectedLocation);
  // TODO: Replace with actual hero image from database
  const heroImage = brand.experience?.backgroundImage || '/images/default-hero.jpg';
  const brandInterest = brand.brandType === 'interest' ? brand.name.split(' ')[0] : undefined;
  
  // Default featured categories if not defined
  const featuredCategories = brand.experience?.featuredCategories || ['Restaurants', 'Shopping', 'Entertainment', 'Services', 'Nightlife', 'Events'];
  
  // Get category icon based on name
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'restaurants':
        return <UtensilsIcon className="w-6 h-6" />;
      case 'shopping':
        return <ShoppingBagIcon className="w-6 h-6" />;
      case 'entertainment':
        return <MusicIcon className="w-6 h-6" />;
      case 'cafés':
      case 'coffee':
        return <CoffeeIcon className="w-6 h-6" />;
      case 'nightlife':
        return <GlassWaterIcon className="w-6 h-6" />;
      default:
        return <BuildingIcon className="w-6 h-6" />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0 font-bold text-xl flex items-center">
                <div 
                  className="w-10 h-10 rounded-full mr-2 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${brand.logo})` }}
                ></div>
                <span style={{ color: brand.primaryColor }}>
                  {brand.name}
                </span>
              </div>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:block flex-1 mx-8">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search for restaurants, shops, and more..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
            {/* User Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <BellIcon className="w-6 h-6" />
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <UserIcon className="w-6 h-6" />
              </button>
              <button 
                className="px-4 py-2 rounded-full text-white font-medium" 
                style={{ backgroundColor: brand.primaryColor }}
              >
                Sign In
              </button>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-600 hover:text-gray-900">
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center" 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
          height: '500px'
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {title}
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              {subtitle}
            </p>
            {/* Main Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-6">
              <input 
                type="text" 
                placeholder={brand.experience?.searchPlaceholder || 'Search for restaurants, shops, events...'} 
                className="w-full px-5 py-4 pr-12 rounded-full shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">
                <SearchIcon className="w-6 h-6" />
              </button>
            </div>
            {/* Location Selector */}
            <div className="inline-block">
              <select 
                value={selectedLocation} 
                onChange={e => setSelectedLocation(e.target.value)} 
                className="px-4 py-2 rounded-md bg-white bg-opacity-90 text-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="New York City">New York City</option>
                <option value="San Francisco">San Francisco</option>
                <option value="Chicago">Chicago</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Miami">Miami</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Search Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Quick Search Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredCategories.map((category, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div 
                  className="w-12 h-12 flex items-center justify-center rounded-full mb-3" 
                  style={{ backgroundColor: `${brand.primaryColor}20` }}
                >
                  {getCategoryIcon(category)}
                </div>
                <span className="font-medium text-gray-800">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Businesses</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => scrollFeatured('left')} 
                className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollFeatured('right')} 
                className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {featuredBusinesses.length > 0 ? (
            <div 
              ref={featuredBusinessesRef} 
              className="flex overflow-x-auto pb-4 hide-scrollbar" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex space-x-4">
                {featuredBusinesses.map(business => (
                  <div key={business.id} className="flex-shrink-0 w-72 bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={business.image} 
                        alt={business.name} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {business.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {business.category}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <StarIcon className="w-4 h-4 text-yellow-500" />
                          <span className="ml-1 text-sm font-medium">
                            {business.rating}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {business.reviewCount} reviews
                        </span>
                        <button 
                          className="text-sm font-medium" 
                          style={{ color: brand.primaryColor }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No featured businesses available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <TrendingUpIcon className="w-6 h-6 mr-2" style={{ color: brand.primaryColor }} />
            <h2 className="text-2xl font-bold">Trending Now</h2>
          </div>
          
          {trendingBusinesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingBusinesses.map(business => (
                <div key={business.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={business.image} 
                      alt={business.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {business.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {business.category}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <span className="ml-1 text-sm font-medium">
                          {business.rating}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {business.reviewCount} reviews
                      </span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-600 flex items-center">
                        <TrendingUpIcon className="w-3 h-3 mr-1" /> Trending
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No trending businesses at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Community Activity */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <MessageCircleIcon className="w-6 h-6 mr-2" style={{ color: brand.primaryColor }} />
            <h2 className="text-2xl font-bold">Community Activity</h2>
          </div>
          
          {communityActivity.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communityActivity.map(activity => (
                <div key={activity.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                  <div className="flex items-start">
                    <img 
                      src={activity.user.avatar} 
                      alt={activity.user.name} 
                      className="w-10 h-10 rounded-full mr-3" 
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-900">
                          {activity.user.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {activity.timeAgo}
                        </span>
                      </div>
                      <div className="mb-2">
                        {activity.type === 'review' ? (
                          <div className="flex items-center">
                            <span className="text-sm text-gray-600">Reviewed</span>
                            <span className="mx-1 font-medium text-sm" style={{ color: brand.primaryColor }}>
                              {activity.business}
                            </span>
                            <div className="flex ml-2">
                              {Array.from({ length: activity.rating || 0 }).map((_, i) => (
                                <StarIcon key={i} className="w-3 h-3 text-yellow-500" />
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <span className="text-sm text-gray-600">Checked in at</span>
                            <span className="mx-1 font-medium text-sm" style={{ color: brand.primaryColor }}>
                              {activity.business}
                            </span>
                            <CheckIcon className="w-3 h-3 text-green-500 ml-1" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-700">{activity.content}</p>
                      <div className="flex items-center mt-3 text-xs text-gray-500">
                        <button className="flex items-center mr-3 hover:text-gray-700">
                          <HeartIcon className="w-3 h-3 mr-1" /> Like
                        </button>
                        <button className="flex items-center hover:text-gray-700">
                          <MessageCircleIcon className="w-3 h-3 mr-1" /> Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No community activity to show.</p>
            </div>
          )}
        </div>
      </section>

      {/* News & Events */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">News & Events</h2>
            <div className="flex space-x-2">
              <button 
                className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'events' ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} 
                onClick={() => setActiveTab('events')} 
                style={activeTab === 'events' ? { backgroundColor: brand.primaryColor } : {}}
              >
                <CalendarIcon className="w-4 h-4 inline-block mr-1" />
                Events
              </button>
              <button 
                className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'news' ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} 
                onClick={() => setActiveTab('news')} 
                style={activeTab === 'news' ? { backgroundColor: brand.primaryColor } : {}}
              >
                <NewspaperIcon className="w-4 h-4 inline-block mr-1" />
                News
              </button>
            </div>
          </div>
          
          {activeTab === 'events' && (
            events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {events.map(event => (
                  <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 text-lg mb-3">
                        {event.title}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-2" style={{ color: brand.primaryColor }} />
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-2" style={{ color: brand.primaryColor }} />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="w-4 h-4 mr-2" style={{ color: brand.primaryColor }} />
                          {event.location}
                        </div>
                      </div>
                      <button 
                        className="mt-4 w-full py-2 text-white rounded-md hover:opacity-90 transition-opacity" 
                        style={{ backgroundColor: brand.primaryColor }}
                      >
                        RSVP
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No upcoming events.</p>
              </div>
            )
          )}
          
          {activeTab === 'news' && (
            newsItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {newsItems.map(item => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 text-lg mb-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" style={{ color: brand.primaryColor }} />
                          {item.date}
                        </div>
                        <div>{item.author}</div>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {item.excerpt}
                      </p>
                      <button 
                        className="w-full py-2 text-white rounded-md hover:opacity-90 transition-opacity" 
                        style={{ backgroundColor: brand.primaryColor }}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No news items available.</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* SEO Content Section - ALWAYS VISIBLE FOR ALL BRANDS */}
      <section className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Discover{' '}
              {brand.brandType === 'interest' ? brand.name.split(' ')[0] : 'Local Businesses'}{' '}
              in {selectedLocation}
            </h2>
            <div className="prose prose-lg text-gray-600 mx-auto">
              {brand.brandType === 'interest' ? (
                // Interest-specific content
                <>
                  <p>
                    {selectedLocation} offers some of the best{' '}
                    {brand.name.toLowerCase()} experiences in the region.
                    Whether you're a local resident or just visiting, exploring
                    the {brand.name.toLowerCase()} scene is a must-do activity
                    that provides authentic insights into the local culture and
                    community.
                  </p>
                  <p>
                    From hidden gems to well-established favorites, our curated
                    guide helps you discover the perfect spots to enjoy{' '}
                    {brand.name.toLowerCase()} in {selectedLocation}. Our
                    community of passionate enthusiasts regularly shares
                    reviews, photos, and tips to help you make the most of your
                    experience.
                  </p>
                  <p>
                    Join our growing community today to start your own{' '}
                    {brand.name.toLowerCase()} adventure, earn rewards for your
                    visits, and connect with fellow enthusiasts who share your
                    passion.
                  </p>
                </>
              ) : (
                // Community-based content
                <>
                  <p>
                    {selectedLocation} is a vibrant community with a rich
                    tapestry of local businesses, events, and experiences
                    waiting to be discovered. Our comprehensive guide helps you
                    navigate the best that {selectedLocation} has to offer, from
                    popular attractions to hidden gems known only to locals.
                  </p>
                  <p>
                    Whether you're looking for the perfect dining spot, planning
                    a day of shopping, or seeking entertainment options, our
                    platform connects you with authentic local experiences. Our
                    community of residents and visitors continuously shares
                    insights, reviews, and recommendations to help you make the
                    most of your time in {selectedLocation}.
                  </p>
                  <p>
                    Join our community today to start exploring{' '}
                    {selectedLocation} like a local, support small businesses,
                    and discover why this area continues to captivate both
                    residents and visitors alike.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-auto">
        <div className="container mx-auto px-4 py-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
          <h3 className="font-bold mb-2">Preview Mode</h3>
          <p>This is a preview of how the brand will appear to users.</p>
          <p className="mt-2 text-sm text-blue-600">Brand ID: {brand.id}</p>
        </div>
        <Footer />
      </div>

      {/* Custom CSS for hiding scrollbars */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}