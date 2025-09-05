import type { Route } from './+types/route';
import React, { useEffect, useState, useRef, Fragment } from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

import { Footer } from './Footer';
import { useBrand } from '../contexts/BrandContext';
import { CalendarIcon, MapPinIcon, ClockIcon, SearchIcon, StarIcon, TrendingUpIcon, MessageCircleIcon, UserIcon, BellIcon, MenuIcon, ChevronRightIcon, ChevronLeftIcon, HeartIcon, CheckIcon, NewspaperIcon, ShoppingBagIcon, UtensilsIcon, MusicIcon, CoffeeIcon, BuildingIcon, TagIcon, GlassWaterIcon } from 'lucide-react';
export default function BrandPreview() {
  const {
    brandId
  } = useParams<{
    brandId: string;
  }>();
  const {
    brands
  } = useBrand();
  const brand = brands.find(b => b.id === brandId);
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
    return <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Brand Not Found</h2>
          <p className="text-gray-600">
            The brand you're looking for doesn't exist.
          </p>
        </div>
      </div>;
  }
  // Replace placeholders in content with safe fallbacks
  const title = (brand.experience?.headline || 'Discover {city}').replace('{city}', selectedLocation);
  const subtitle = (brand.experience?.description || 'Explore the best local businesses, events, and experiences in {city}.').replace('{city}', selectedLocation);
  const heroImage = brand.experience?.backgroundImage || 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80';
  const brandInterest = brand.brandType === 'interest' ? brand.name.split(' ')[0] : undefined;
  // Default featured categories if not defined
  const featuredCategories = brand.experience?.featuredCategories || ['Restaurants', 'Shopping', 'Entertainment', 'Services', 'Nightlife', 'Events'];
  
  const featuredBusinesses = [{
    id: 1,
    name: 'Urban Bites Café',
    category: 'Café',
    rating: 4.8,
    reviewCount: 126,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: true
  }, {
    id: 2,
    name: 'Craft Beer Haven',
    category: 'Brewery',
    rating: 4.7,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: true
  }, {
    id: 3,
    name: 'Vineyard Vistas',
    category: 'Wine Bar',
    rating: 4.9,
    reviewCount: 102,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: true
  }, {
    id: 4,
    name: 'The Melody Lounge',
    category: 'Live Music',
    rating: 4.6,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: true
  }, {
    id: 5,
    name: 'Fashion Forward',
    category: 'Boutique',
    rating: 4.5,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: true
  }, {
    id: 6,
    name: 'Downtown Diner',
    category: 'Restaurant',
    rating: 4.4,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: true
  }];
  
  const trendingBusinesses = [{
    id: 7,
    name: 'Artisan Coffee Roasters',
    category: 'Coffee Shop',
    rating: 4.9,
    reviewCount: 87,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    trending: true
  }, {
    id: 8,
    name: 'Sunset Lounge',
    category: 'Cocktail Bar',
    rating: 4.7,
    reviewCount: 62,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    trending: true
  }, {
    id: 9,
    name: 'The Book Nook',
    category: 'Bookstore',
    rating: 4.8,
    reviewCount: 43,
    image: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    trending: true
  }, {
    id: 10,
    name: 'Green Thumb Garden Center',
    category: 'Garden Supply',
    rating: 4.6,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    trending: true
  }];
  
  const communityActivity = [{
    id: 1,
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    type: 'review',
    business: 'Urban Bites Café',
    content: 'Absolutely loved the atmosphere and the coffee was amazing!',
    rating: 5,
    timeAgo: '2 hours ago'
  }, {
    id: 2,
    user: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    type: 'check-in',
    business: 'Craft Beer Haven',
    content: 'Trying out their new seasonal IPA',
    timeAgo: '4 hours ago'
  }, {
    id: 3,
    user: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    type: 'review',
    business: 'Vineyard Vistas',
    content: 'Great selection of wines and knowledgeable staff.',
    rating: 4,
    timeAgo: 'Yesterday'
  }, {
    id: 4,
    user: {
      name: 'James Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    type: 'check-in',
    business: 'The Melody Lounge',
    content: 'Amazing live jazz tonight!',
    timeAgo: 'Yesterday'
  }];
  // Sample events
  const events = [{
    id: 1,
    title: 'Craft Beer Festival',
    date: 'Oct 15, 2023',
    time: '12:00 PM - 8:00 PM',
    location: 'Downtown Park',
    image: 'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }, {
    id: 2,
    title: 'Food Truck Rally',
    date: 'Oct 22, 2023',
    time: '11:00 AM - 7:00 PM',
    location: 'Riverside Plaza',
    image: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }, {
    id: 3,
    title: 'Wine Tasting Tour',
    date: 'Oct 29, 2023',
    time: '3:00 PM - 6:00 PM',
    location: 'Local Vineyards',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }];
  // Sample news items
  const newsItems = [{
    id: 1,
    title: 'New Restaurant Opens Downtown',
    date: 'Oct 10, 2023',
    author: 'Local Reporter',
    excerpt: 'A new farm-to-table restaurant has opened in the heart of downtown, featuring locally sourced ingredients and craft cocktails.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }, {
    id: 2,
    title: 'Weekend Art Festival Returns',
    date: 'Oct 8, 2023',
    author: 'Arts Correspondent',
    excerpt: 'The annual arts festival returns this weekend with over 100 local and national artists showcasing their work throughout the city.',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }, {
    id: 3,
    title: 'City Approves New Bike Lanes',
    date: 'Oct 5, 2023',
    author: 'City Hall Reporter',
    excerpt: 'The city council has approved funding for new protected bike lanes connecting downtown to the eastern neighborhoods.',
    image: 'https://images.unsplash.com/photo-1519583272095-6433daf26b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }];
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
  return <div className="min-h-screen flex flex-col bg-white">
      {/* Header Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0 font-bold text-xl flex items-center">
                <div className="w-10 h-10 rounded-full mr-2 bg-cover bg-center" style={{
                backgroundImage: `url(${brand.logo})`
              }}></div>
                <span style={{
                color: brand.primaryColor
              }}>
                  {brand.name}
                </span>
              </div>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:block flex-1 mx-8">
              <div className="relative">
                <input type="text" placeholder="Search for restaurants, shops, and more..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
              <button className="px-4 py-2 rounded-full text-white font-medium" style={{
              backgroundColor: brand.primaryColor
            }}>
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
      <div className="relative bg-cover bg-center" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
      height: '500px'
    }}>
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
              <input type="text" placeholder={brand.experience?.searchPlaceholder || 'Search for restaurants, shops, events...'} className="w-full px-5 py-4 pr-12 rounded-full shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">
                <SearchIcon className="w-6 h-6" />
              </button>
            </div>
            {/* Location Selector */}
            <div className="inline-block">
              <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)} className="px-4 py-2 rounded-md bg-white bg-opacity-90 text-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
            {featuredCategories.map((category, index) => <div key={index} className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center rounded-full mb-3" style={{
              backgroundColor: `${brand.primaryColor}20`
            }}>
                  {getCategoryIcon(category)}
                </div>
                <span className="font-medium text-gray-800">{category}</span>
              </div>)}
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Businesses</h2>
            <div className="flex space-x-2">
              <button onClick={() => scrollFeatured('left')} className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100">
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button onClick={() => scrollFeatured('right')} className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100">
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          {/* Horizontal scrolling container */}
          <div ref={featuredBusinessesRef} className="flex overflow-x-auto pb-4 hide-scrollbar" style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
            <div className="flex space-x-4">
              {featuredBusinesses.map(business => <div key={business.id} className="flex-shrink-0 w-72 bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-40 overflow-hidden">
                    <img src={business.image} alt={business.name} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" />
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
                      <button className="text-sm font-medium" style={{
                    color: brand.primaryColor
                  }}>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <TrendingUpIcon className="w-6 h-6 mr-2" style={{
            color: brand.primaryColor
          }} />
            <h2 className="text-2xl font-bold">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingBusinesses.map(business => <div key={business.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100">
                <div className="h-40 overflow-hidden">
                  <img src={business.image} alt={business.name} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" />
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
              </div>)}
          </div>
        </div>
      </section>

      {/* Community Activity */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <MessageCircleIcon className="w-6 h-6 mr-2" style={{
            color: brand.primaryColor
          }} />
            <h2 className="text-2xl font-bold">Community Activity</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityActivity.map(activity => <div key={activity.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                <div className="flex items-start">
                  <img src={activity.user.avatar} alt={activity.user.name} className="w-10 h-10 rounded-full mr-3" />
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
                      {activity.type === 'review' ? <div className="flex items-center">
                          <span className="text-sm text-gray-600">
                            Reviewed
                          </span>
                          <span className="mx-1 font-medium text-sm" style={{
                      color: brand.primaryColor
                    }}>
                            {activity.business}
                          </span>
                          <div className="flex ml-2">
                            {Array.from({
                        length: activity.rating || 0
                      }).map((_, i) => <StarIcon key={i} className="w-3 h-3 text-yellow-500" />)}
                          </div>
                        </div> : <div className="flex items-center">
                          <span className="text-sm text-gray-600">
                            Checked in at
                          </span>
                          <span className="mx-1 font-medium text-sm" style={{
                      color: brand.primaryColor
                    }}>
                            {activity.business}
                          </span>
                          <CheckIcon className="w-3 h-3 text-green-500 ml-1" />
                        </div>}
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
              </div>)}
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">News & Events</h2>
            <div className="flex space-x-2">
              <button className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'events' ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => setActiveTab('events')} style={activeTab === 'events' ? {
              backgroundColor: brand.primaryColor
            } : {}}>
                <CalendarIcon className="w-4 h-4 inline-block mr-1" />
                Events
              </button>
              <button className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'news' ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => setActiveTab('news')} style={activeTab === 'news' ? {
              backgroundColor: brand.primaryColor
            } : {}}>
                <NewspaperIcon className="w-4 h-4 inline-block mr-1" />
                News
              </button>
            </div>
          </div>
          {activeTab === 'events' && <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map(event => <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100">
                  <div className="h-48 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-3">
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2" style={{
                    color: brand.primaryColor
                  }} />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-2" style={{
                    color: brand.primaryColor
                  }} />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-2" style={{
                    color: brand.primaryColor
                  }} />
                        {event.location}
                      </div>
                    </div>
                    <button className="mt-4 w-full py-2 text-white rounded-md hover:opacity-90 transition-opacity" style={{
                backgroundColor: brand.primaryColor
              }}>
                      RSVP
                    </button>
                  </div>
                </div>)}
            </div>}
          {activeTab === 'news' && <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsItems.map(item => <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100">
                  <div className="h-48 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" style={{
                    color: brand.primaryColor
                  }} />
                        {item.date}
                      </div>
                      <div>{item.author}</div>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                    <button className="w-full py-2 text-white rounded-md hover:opacity-90 transition-opacity" style={{
                backgroundColor: brand.primaryColor
              }}>
                      Read More
                    </button>
                  </div>
                </div>)}
            </div>}
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
              {brand.brandType === 'interest' ?
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
                </> :
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
                </>}
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
      <style jsx="true">{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
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