import { Link } from "react-router";
import React, { useEffect, useState } from 'react';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '../../../components/dtg/Header';
import { Footer } from '../../../components/dtg/Footer';
import { LayoutDashboardIcon, BuildingIcon, CalendarIcon, SettingsIcon, UsersIcon, MessageSquareIcon, ImageIcon, BellIcon, TagIcon, BarChart2Icon, NewspaperIcon, Link2Icon, ShareIcon, GlobeIcon, CheckCircleIcon, XCircleIcon, RefreshCwIcon, PlusIcon, ChevronRightIcon, ExternalLinkIcon, ArrowRightIcon, ToggleLeftIcon, ToggleRightIcon, AlertCircleIcon, BookmarkIcon, SendIcon, InfoIcon, MapPinIcon, ClockIcon, CheckIcon, XIcon, PenToolIcon, ChevronDownIcon, SearchIcon, FilterIcon, UserIcon, HeartIcon, ThumbsUpIcon, MailIcon } from 'lucide-react';
// Types
interface Business {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  logo?: string;
}
interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  lastSync?: string;
  status: 'active' | 'pending' | 'disconnected' | 'error';
  stats?: {
    mentions?: number;
    events?: number;
    notifications?: number;
  };
}
interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  image?: string;
  url: string;
  type: 'mention' | 'news';
  sentiment?: 'positive' | 'neutral' | 'negative';
}
interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  image?: string;
  url: string;
  status: 'upcoming' | 'live' | 'past';
  attendees?: number;
  sponsored?: boolean;
}
interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  platform: string;
  read: boolean;
  type: 'mention' | 'event' | 'review' | 'message' | 'alert';
  icon: React.ReactNode;
}
interface ContentItem {
  id: string;
  title: string;
  type: 'post' | 'event' | 'promotion' | 'update';
  date: string;
  platforms: string[];
  status: 'draft' | 'scheduled' | 'published';
  engagement?: {
    views: number;
    likes: number;
    shares: number;
  };
}

// Helper function to format dates
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  // For upcoming dates, use relative time (e.g., "in 3 days")
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays > 0 && diffDays < 7) {
    return `in ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  } else if (diffDays === 0) {
    return 'today';
  } else if (diffDays === -1) {
    return 'yesterday';
  } else if (diffDays < -1 && diffDays > -7) {
    return `${Math.abs(diffDays)} days ago`;
  }
  // Otherwise, use formatted date
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
};
export default function BusinessIntegrations() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [eventItems, setEventItems] = useState<EventItem[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [activeTab, setActiveTab] = useState<'news' | 'events' | 'notifications' | 'content' | 'accounts'>('news');
  const [isConnectingPlatform, setIsConnectingPlatform] = useState(false);
  const [isCreatingContent, setIsCreatingContent] = useState(false);
  const [selectedPlatformFilters, setSelectedPlatformFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  // Fetch business and integration data
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use the mock data
    setLoading(true);
    setTimeout(() => {
      setBusiness(mockBusiness);
      setPlatforms(mockPlatforms);
      setNewsItems(mockNewsItems);
      setEventItems(mockEventItems);
      setNotifications(mockNotifications);
      setContentItems(mockContentItems);
      setLoading(false);
    }, 500);
  }, []);
  // Toggle platform connection
  const togglePlatformConnection = (platformId: string) => {
    setPlatforms(platforms.map(platform => {
      if (platform.id === platformId) {
        const connected = !platform.connected;
        return {
          ...platform,
          connected,
          status: connected ? 'active' : 'disconnected',
          lastSync: connected ? new Date().toISOString() : undefined
        };
      }
      return platform;
    }));
  };
  // Refresh platform data
  const refreshPlatformData = (platformId: string) => {
    setPlatforms(platforms.map(platform => {
      if (platform.id === platformId) {
        return {
          ...platform,
          lastSync: new Date().toISOString()
        };
      }
      return platform;
    }));
  };
  // Mark notification as read
  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification => {
      if (notification.id === notificationId) {
        return {
          ...notification,
          read: true
        };
      }
      return notification;
    }));
  };
  // Filter items by platform
  const filteredNewsItems = selectedPlatformFilters.length > 0 ? newsItems.filter(item => selectedPlatformFilters.includes(item.source)) : newsItems;
  const filteredEventItems = selectedPlatformFilters.length > 0 ? eventItems.filter(item => {
    // For events, we need to check if the event is from WhensTheFun
    // or if it's a sponsored event that the business is participating in
    return selectedPlatformFilters.includes('WhensTheFun');
  }) : eventItems;
  const filteredNotifications = selectedPlatformFilters.length > 0 ? notifications.filter(notification => selectedPlatformFilters.includes(notification.platform)) : notifications;
  const filteredContentItems = selectedPlatformFilters.length > 0 ? contentItems.filter(item => {
    // Check if any of the item's platforms are in the selected filters
    return item.platforms.some(platform => selectedPlatformFilters.includes(platform));
  }) : contentItems;
  // Search functionality
  const searchedNewsItems = searchTerm ? filteredNewsItems.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())) : filteredNewsItems;
  const searchedEventItems = searchTerm ? filteredEventItems.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())) : filteredEventItems;
  const searchedNotifications = searchTerm ? filteredNotifications.filter(notification => notification.title.toLowerCase().includes(searchTerm.toLowerCase()) || notification.message.toLowerCase().includes(searchTerm.toLowerCase())) : filteredNotifications;
  const searchedContentItems = searchTerm ? filteredContentItems.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())) : filteredContentItems;
  // Toggle platform filter
  const togglePlatformFilter = (platformName: string) => {
    if (selectedPlatformFilters.includes(platformName)) {
      setSelectedPlatformFilters(selectedPlatformFilters.filter(name => name !== platformName));
    } else {
      setSelectedPlatformFilters([...selectedPlatformFilters, platformName]);
    }
  };
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading integrations...</p>
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </main>
        <Footer />
      </div>;
  }
  if (!business) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Business Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              We couldn't find your business information.
            </p>
            <Link to="/business/register" className="text-blue-600 hover:text-blue-800 font-medium">
              Register Your Business
            </Link>
          </div>
        </main>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-grow flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-sm hidden md:block">
          <div className="p-4 border-b">
            <div className="flex items-center">
              {business.logo ? <img src={business.logo} alt={business.name} className="w-10 h-10 rounded-full mr-3 object-cover" /> : <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <BuildingIcon className="w-5 h-5 text-blue-600" />
                </div>}
              <div>
                <h2 className="font-semibold text-sm">{business.name}</h2>
                <div className="text-xs text-gray-500">{business.category}</div>
              </div>
            </div>
          </div>
          <nav className="p-2">
            <div className="mb-4">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                Main
              </div>
              <ul className="space-y-1">
                <li>
                  <Link to="/business/dashboard" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                    <LayoutDashboardIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/business/profile/edit" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                    <BuildingIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Business Profile
                  </Link>
                </li>
                <li>
                  <Link to="/business/reviews" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                    <MessageSquareIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link to="/business/photos" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                    <ImageIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Photos
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                Marketing
              </div>
              <ul className="space-y-1">
                <li>
                  <Link to="/business/promotions" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                    <TagIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Promotions
                  </Link>
                </li>
                <li>
                  <Link to="/business/analytics" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                    <BarChart2Icon className="w-5 h-5 mr-3 text-gray-500" />
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link to="/business/events" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                    <CalendarIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/business/integrations" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700">
                    <Link2Icon className="w-5 h-5 mr-3 text-blue-500" />
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                Settings
              </div>
              <ul className="space-y-1">
                <li>
                  <Link to="/business/settings" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                    <SettingsIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Account Settings
                  </Link>
                </li>
                <li>
                  <Link to="/business/notifications" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                    <BellIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Notifications
                    <span className="ml-auto bg-red-100 text-red-600 text-xs font-medium px-2 py-0.5 rounded-full">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-grow p-4 md:p-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Integrations Dashboard</h1>
              <p className="text-gray-600">
                Manage your business presence across multiple platforms
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <button onClick={() => setIsCreatingContent(true)} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                <ShareIcon className="w-5 h-5 mr-1" />
                Create Content
              </button>
              <button onClick={() => setIsConnectingPlatform(true)} className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md bg-white hover:bg-gray-50">
                <Link2Icon className="w-5 h-5 mr-1" />
                Connect Platform
              </button>
            </div>
          </div>
          {/* Connected Platforms Overview */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4">Connected Platforms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {platforms.map(platform => <div key={platform.id} className="border rounded-lg p-4 relative">
                  <div className="absolute top-3 right-3">
                    {platform.connected ? <div className="flex items-center text-xs text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        Connected
                      </div> : <div className="flex items-center text-xs text-gray-500">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mr-1"></div>
                        Disconnected
                      </div>}
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-gray-100 rounded-lg mr-3">
                      {platform.icon}
                    </div>
                    <h3 className="font-medium">{platform.name}</h3>
                  </div>
                  {platform.connected && platform.lastSync && <div className="text-xs text-gray-500 mb-2">
                      Last synced: {formatDate(platform.lastSync)}
                    </div>} {platform.connected && platform.stats && <div className="flex flex-wrap gap-2 mb-3">
                      {platform.stats.mentions && <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                          {platform.stats.mentions} mentions
                        </div>} {platform.stats.events && <div className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                          {platform.stats.events} events
                        </div>} {platform.stats.notifications && <div className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full">
                          {platform.stats.notifications} notifications
                        </div>}
                    </div>}
                  <div className="flex justify-between">
                    {platform.connected ? <>
                        <button onClick={() => refreshPlatformData(platform.id)} className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
                          <RefreshCwIcon className="w-3 h-3 mr-1" />
                          Refresh
                        </button>
                        <button onClick={() => togglePlatformConnection(platform.id)} className="text-xs text-gray-600 hover:text-gray-800">
                          Disconnect
                        </button>
                      </> : <button onClick={() => togglePlatformConnection(platform.id)} className="text-xs text-blue-600 hover:text-blue-800">
                        Connect
                      </button>}
                  </div>
                </div>)}
            </div>
          </div>
          {/* Tabs Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b">
              <div className="flex overflow-x-auto">
                <button onClick={() => setActiveTab('news')} className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'news' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <NewspaperIcon className="w-5 h-5 inline-block mr-1" />
                  News & Mentions
                </button>
                <button onClick={() => setActiveTab('events')} className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'events' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <CalendarIcon className="w-5 h-5 inline-block mr-1" />
                  Events
                </button>
                <button onClick={() => setActiveTab('notifications')} className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'notifications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'} relative`}>
                  <BellIcon className="w-5 h-5 inline-block mr-1" />
                  Notifications
                  {notifications.filter(n => !n.read).length > 0 && <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>}
                </button>
                <button onClick={() => setActiveTab('content')} className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'content' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <ShareIcon className="w-5 h-5 inline-block mr-1" />
                  Content Sharing
                </button>
                <button onClick={() => setActiveTab('accounts')} className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'accounts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <Link2Icon className="w-5 h-5 inline-block mr-1" />
                  Account Linking
                </button>
              </div>
            </div>
            {/* Search and Filter */}
            <div className="p-4 border-b">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="relative w-full md:w-64">
                  <input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full" />
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <button className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium flex items-center">
                      <FilterIcon className="w-4 h-4 mr-1" />
                      Filter by Platform
                      <ChevronDownIcon className="w-4 h-4 ml-1" />
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      {platforms.map(platform => <div key={platform.id} className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => togglePlatformFilter(platform.name)}>
                          <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                            {selectedPlatformFilters.includes(platform.name) && <CheckIcon className="w-3 h-3 text-blue-600" />}
                          </div>
                          <div className="flex items-center">
                            {platform.icon}
                            <span className="ml-2 text-sm">
                              {platform.name}
                            </span>
                          </div>
                        </div>)}
                    </div>
                  </div>
                </div>
              </div>
              {selectedPlatformFilters.length > 0 && <div className="mt-2 flex flex-wrap gap-2">
                  {selectedPlatformFilters.map(name => <div key={name} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center">
                      {name}
                      <XIcon className="w-3 h-3 ml-1 cursor-pointer" onClick={() => togglePlatformFilter(name)} />
                    </div>)}
                  <button onClick={() => setSelectedPlatformFilters([])} className="text-xs text-gray-600 hover:text-gray-800">
                    Clear all
                  </button>
                </div>}
            </div>
            {/* Tab Content */}
            <div className="p-4">
              {/* News & Mentions Tab */} {activeTab === 'news' && <div>
                  {searchedNewsItems.length === 0 ? <div className="text-center py-8">
                      <NewspaperIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No news or mentions found
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {searchTerm || selectedPlatformFilters.length > 0 ? 'No results match your current filters.' : 'Connect with Day.News and other platforms to track mentions of your business.'}
                      </p>
                      {(searchTerm || selectedPlatformFilters.length > 0) && <button onClick={() => {
                  setSearchTerm('');
                  setSelectedPlatformFilters([]);
                } } className="text-blue-600 hover:text-blue-800 font-medium">
                          Clear filters
                        </button>}
                    </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchedNewsItems.map(item => <div key={item.id} className="border rounded-lg overflow-hidden">
                          {item.image && <div className="h-40 overflow-hidden">
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </div>}
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                {item.type === 'mention' ? <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                                    Mention
                                  </span> : <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                                    News
                                  </span>} {item.sentiment && <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full
                                      ${item.sentiment === 'positive' ? 'bg-green-100 text-green-800' : item.sentiment === 'negative' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'} `}>
                                    {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                                  </span>}
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatDate(item.date)}
                              </div>
                            </div>
                            <h3 className="font-medium mb-1">{item.title}</h3>
                            <div className="flex items-center text-xs text-gray-600 mb-3">
                              <span>Source: {item.source}</span>
                            </div>
                            <div className="flex justify-between">
                              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                                Read Article
                                <ExternalLinkIcon className="w-3 h-3 ml-1" />
                              </a>
                              <button className="text-gray-600 hover:text-gray-800 text-sm">
                                <BookmarkIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>)}
                    </div>}
                </div>} {/* Events Tab */} {activeTab === 'events' && <div>
                  {searchedEventItems.length === 0 ? <div className="text-center py-8">
                      <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No events found
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {searchTerm || selectedPlatformFilters.length > 0 ? 'No results match your current filters.' : 'Connect with WhensTheFun to manage your business events.'}
                      </p>
                      {(searchTerm || selectedPlatformFilters.length > 0) && <button onClick={() => {
                  setSearchTerm('');
                  setSelectedPlatformFilters([]);
                } } className="text-blue-600 hover:text-blue-800 font-medium">
                          Clear filters
                        </button>}
                    </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchedEventItems.map(event => <div key={event.id} className="border rounded-lg overflow-hidden">
                          {event.image && <div className="h-40 overflow-hidden">
                              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                            </div>}
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full mr-2
                                    ${event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : event.status === 'live' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} `}>
                                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                </span>
                                {event.sponsored && <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    Sponsored
                                  </span>}
                              </div>
                            </div>
                            <h3 className="font-medium mb-2">{event.title}</h3>
                            <div className="space-y-1 mb-3">
                              <div className="flex items-center text-xs text-gray-600">
                                <ClockIcon className="w-3 h-3 mr-1" />
                                <span>
                                  {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                                </span>
                              </div>
                              <div className="flex items-center text-xs text-gray-600">
                                <MapPinIcon className="w-3 h-3 mr-1" />
                                <span>{event.location}</span>
                              </div>
                              {event.attendees && <div className="flex items-center text-xs text-gray-600">
                                  <UsersIcon className="w-3 h-3 mr-1" />
                                  <span>{event.attendees} attendees</span>
                                </div>}
                            </div>
                            <div className="flex justify-between">
                              <a href={event.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                                View Details
                                <ChevronRightIcon className="w-4 h-4 ml-1" />
                              </a>
                              <Link to="/business/events" className="text-gray-600 hover:text-gray-800 text-sm">
                                Manage
                              </Link>
                            </div>
                          </div>
                        </div>)}
                    </div>}
                </div>} {/* Notifications Tab */} {activeTab === 'notifications' && <div>
                  {searchedNotifications.length === 0 ? <div className="text-center py-8">
                      <BellIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No notifications found
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {searchTerm || selectedPlatformFilters.length > 0 ? 'No results match your current filters.' : "You don't have any notifications at the moment."}
                      </p>
                      {(searchTerm || selectedPlatformFilters.length > 0) && <button onClick={() => {
                  setSearchTerm('');
                  setSelectedPlatformFilters([]);
                } } className="text-blue-600 hover:text-blue-800 font-medium">
                          Clear filters
                        </button>}
                    </div> : <div className="space-y-4">
                      {searchedNotifications.map(notification => <div key={notification.id} className={`border rounded-lg p-4 ${!notification.read ? 'bg-blue-50 border-blue-100' : ''}`}>
                          <div className="flex items-start">
                            <div className="p-2 bg-gray-100 rounded-lg mr-3 flex-shrink-0">
                              {notification.icon}
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-medium">
                                  {notification.title}
                                </h3>
                                <div className="text-xs text-gray-500">
                                  {formatDate(notification.date)}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                    {notification.platform}
                                  </span>
                                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full
                                    ${notification.type === 'mention' ? 'bg-blue-100 text-blue-800' : notification.type === 'event' ? 'bg-purple-100 text-purple-800' : notification.type === 'review' ? 'bg-yellow-100 text-yellow-800' : notification.type === 'message' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} `}>
                                    {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                                  </span>
                                </div>
                                {!notification.read ? <button onClick={() => markNotificationAsRead(notification.id)} className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                                    Mark as read
                                  </button> : <span className="text-xs text-gray-500">
                                    Read
                                  </span>}
                              </div>
                            </div>
                          </div>
                        </div>)}
                    </div>}
                </div>} {/* Content Sharing Tab */} {activeTab === 'content' && <div>
                  <div className="mb-4 flex justify-between items-center">
                    <h3 className="font-medium">Your Content</h3>
                    <button onClick={() => setIsCreatingContent(true)} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                      <PlusIcon className="w-4 h-4 mr-1" />
                      Create New Content
                    </button>
                  </div>
                  {searchedContentItems.length === 0 ? <div className="text-center py-8">
                      <ShareIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No content found
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {searchTerm || selectedPlatformFilters.length > 0 ? 'No results match your current filters.' : "You haven't created any content yet."}
                      </p>
                      {(searchTerm || selectedPlatformFilters.length > 0) && <button onClick={() => {
                  setSearchTerm('');
                  setSelectedPlatformFilters([]);
                } } className="text-blue-600 hover:text-blue-800 font-medium">
                          Clear filters
                        </button>}
                    </div> : <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Content
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Platforms
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Engagement
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {searchedContentItems.map(content => <tr key={content.id} >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {content.title}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full
                                  ${content.type === 'post' ? 'bg-blue-100 text-blue-800' : content.type === 'event' ? 'bg-purple-100 text-purple-800' : content.type === 'promotion' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} `}>
                                  {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {new Date(content.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex space-x-1">
                                  {content.platforms.map(platform => {
                            const platformObj = platforms.find(p => p.name === platform);
                            return platformObj ? <div key={platform} className="p-1 bg-gray-100 rounded-full" title={platform}>
                                        {platformObj.icon}
                                      </div> : null;
                          })}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full
                                  ${content.status === 'published' ? 'bg-green-100 text-green-800' : content.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'} `}>
                                  {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {content.engagement ? <div className="text-sm text-gray-500">
                                    <div className="flex items-center">
                                      <EyeIcon className="w-3 h-3 mr-1" />
                                      {content.engagement.views}
                                    </div>
                                    <div className="flex items-center">
                                      <ThumbsUpIcon className="w-3 h-3 mr-1" />
                                      {content.engagement.likes}
                                    </div>
                                    <div className="flex items-center">
                                      <ShareIcon className="w-3 h-3 mr-1" />
                                      {content.engagement.shares}
                                    </div>
                                  </div> : <span className="text-xs text-gray-500">
                                    No data
                                  </span>}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex space-x-2">
                                  <button className="text-blue-600 hover:text-blue-800">
                                    <PenToolIcon className="w-4 h-4" />
                                  </button>
                                  <button className="text-gray-600 hover:text-gray-800">
                                    <ShareIcon className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>)}
                        </tbody>
                      </table>
                    </div>}
                </div>} {/* Account Linking Tab */} {activeTab === 'accounts' && <div>
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Connected Accounts</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Manage your connections to external platforms and
                      services.
                    </p>
                    <div className="space-y-4">
                      {platforms.map(platform => <div key={platform.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="p-2 bg-gray-100 rounded-lg mr-3">
                                {platform.icon}
                              </div>
                              <div>
                                <h4 className="font-medium">{platform.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {platform.connected ? <>
                                      Connected{' '} {platform.lastSync && `· Last synced: ${formatDate(platform.lastSync)}`}
                                    </> : 'Not connected'}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              {platform.connected ? <>
                                  <button onClick={() => refreshPlatformData(platform.id)} className="mr-3 text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    <RefreshCwIcon className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => togglePlatformConnection(platform.id)} className="flex items-center">
                                    <ToggleRightIcon className="w-10 h-6 text-blue-600" />
                                  </button>
                                </> : <button onClick={() => togglePlatformConnection(platform.id)} className="flex items-center">
                                  <ToggleLeftIcon className="w-10 h-6 text-gray-400" />
                                </button>}
                            </div>
                          </div>
                          {platform.connected && <div className="mt-4 pt-4 border-t">
                              <div className="flex flex-wrap gap-4">
                                <div className="flex-grow">
                                  <h5 className="text-sm font-medium mb-1">
                                    Permissions
                                  </h5>
                                  <div className="space-y-2">
                                    <div className="flex items-center text-sm">
                                      <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                                      Read business information
                                    </div>
                                    <div className="flex items-center text-sm">
                                      <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                                      Post content on your behalf
                                    </div>
                                    <div className="flex items-center text-sm">
                                      <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                                      Access analytics data
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-grow">
                                  <h5 className="text-sm font-medium mb-1">
                                    Settings
                                  </h5>
                                  <div className="space-y-2">
                                    <div className="flex items-center">
                                      <input type="checkbox" id={`auto-sync-${platform.id} `} checked={true} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                                      <label htmlFor={`auto-sync-${platform.id} `} className="ml-2 text-sm text-gray-700">
                                        Auto-sync content
                                      </label>
                                    </div>
                                    <div className="flex items-center">
                                      <input type="checkbox" id={`notifications-${platform.id} `} checked={true} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                                      <label htmlFor={`notifications-${platform.id} `} className="ml-2 text-sm text-gray-700">
                                        Receive notifications
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>}
                        </div>)}
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <div className="flex items-start">
                      <InfoIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">
                          About Platform Integrations
                        </h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Connecting your business to these platforms allows you
                          to manage your online presence from one place. You can
                          publish content, track mentions, manage events, and
                          receive notifications across all connected platforms.
                        </p>
                        <div className="mt-2">
                          <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Learn more about our integrations
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
            </div>
          </div>
          {/* Integration Tips */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Integration Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <GlobeIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-medium">Reach More Customers</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Connect to multiple platforms to increase your business
                  visibility and reach a wider audience.
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  Learn more
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </a>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <ShareIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-medium">Streamline Content Sharing</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Create content once and distribute it across multiple
                  platforms with just a few clicks.
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  View tutorial
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </a>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <BellIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-medium">Stay Informed</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Receive unified notifications from all platforms to stay on
                  top of customer interactions.
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  Set up notifications
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
      {/* Modal for connecting a new platform */} {isConnectingPlatform && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Connect a Platform</h3>
              <button onClick={() => setIsConnectingPlatform(false)} className="text-gray-500 hover:text-gray-700">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Select a platform to connect with your business profile.
            </p>
            <div className="space-y-3 mb-6">
              {platforms.filter(p => !p.connected).map(platform => <div key={platform.id} className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer" onClick={() => togglePlatformConnection(platform.id)}>
                    <div className="flex items-center">
                      <div className="p-2 bg-gray-100 rounded-lg mr-3">
                        {platform.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{platform.name}</h4>
                        <p className="text-xs text-gray-600">
                          Connect to manage your {platform.name} presence
                        </p>
                      </div>
                    </div>
                  </div>)}
            </div>
            <div className="flex justify-end">
              <button onClick={() => setIsConnectingPlatform(false)} className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </div>
        </div>} {/* Modal for creating new content */} {isCreatingContent && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Create New Content</h3>
              <button onClick={() => setIsCreatingContent(false)} className="text-gray-500 hover:text-gray-700">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="content-title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input type="text" id="content-title" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter content title" />
            </div>
            <div className="mb-4">
              <label htmlFor="content-type" className="block text-sm font-medium text-gray-700 mb-1">
                Content Type
              </label>
              <select id="content-type" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="post">Post</option>
                <option value="event">Event</option>
                <option value="promotion">Promotion</option>
                <option value="update">Update</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="content-body" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea id="content-body" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Write your content here..."></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Share to Platforms
              </label>
              <div className="grid grid-cols-2 gap-2">
                {platforms.filter(p => p.connected).map(platform => <div key={platform.id} className="flex items-center">
                      <input type="checkbox" id={`share-${platform.id} `} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      <label htmlFor={`share-${platform.id} `} className="ml-2 flex items-center text-sm text-gray-700">
                        {platform.icon}
                        <span className="ml-1">{platform.name}</span>
                      </label>
                    </div>)}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="content-schedule" className="block text-sm font-medium text-gray-700 mb-1">
                Schedule
              </label>
              <div className="flex items-center">
                <select id="content-schedule" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="now">Publish now</option>
                  <option value="schedule">Schedule for later</option>
                  <option value="draft">Save as draft</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setIsCreatingContent(false)} className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={() => setIsCreatingContent(false)} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                Create Content
              </button>
            </div>
          </div>
        </div>}
    </div>;
}
