import type { Route } from './+types/route';
import React, { useEffect, useState } from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { LayoutDashboardIcon, BuildingIcon, CalendarIcon, SettingsIcon, UsersIcon, MessageSquareIcon, ImageIcon, BellIcon, TagIcon, BarChart2Icon, Link2Icon, PlusIcon, ChevronRightIcon, ChevronLeftIcon, ChevronDownIcon, MapPinIcon, ClockIcon, CalendarDaysIcon, CheckIcon, XIcon, PenToolIcon, TrashIcon, EyeIcon, HeartIcon, DollarSignIcon, RefreshCwIcon, SearchIcon, FilterIcon, UploadIcon, InfoIcon, ExternalLinkIcon, MoreHorizontalIcon, AlertCircleIcon, SlidersIcon, GlobeIcon, UserIcon, CheckCircleIcon, ArrowUpRightIcon, ArrowRightIcon, ListIcon, GripIcon } from 'lucide-react';
// Types
interface Business {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  logo?: string;
}
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  imageUrl?: string;
  status: 'upcoming' | 'live' | 'past' | 'draft' | 'cancelled';
  eventType: 'business' | 'sponsored' | 'community';
  capacity?: number;
  attendees?: number;
  ticketPrice?: number;
  isFree?: boolean;
  visibility: 'public' | 'private' | 'unlisted';
  organizer: string;
  tags?: string[];
  syncedWith?: string[];
}
interface Sponsor {
  id: string;
  name: string;
  logo?: string;
  eventId: string;
  sponsorshipLevel: 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner';
  contribution: number;
  benefits: string[];
  status: 'confirmed' | 'pending' | 'declined';
}
interface SponsorshipOpportunity {
  id: string;
  eventName: string;
  eventId: string;
  organizerName: string;
  date: string;
  location: string;
  imageUrl?: string;
  sponsorshipLevels: {
    name: string;
    price: number;
    benefits: string[];
    available: number;
  }[];
  attendeeCount?: number;
  description: string;
  applicationDeadline: string;
  status: 'open' | 'closing_soon' | 'closed';
}
interface EventMetrics {
  viewCount: number;
  registrationCount: number;
  attendanceCount: number;
  engagementRate: number;
  ticketRevenue?: number;
  demographicData?: {
    ageGroups: {
      label: string;
      value: number;
    }[];
    genderDistribution: {
      label: string;
      value: number;
    }[];
  };
}

// Helper function to format dates
const formatDate = (dateString: string, includeTime: boolean = true): string => {
  const date = new Date(dateString);
  // For dates, use formatted date
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
  });
  // Add time if requested
  if (includeTime) {
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
    return `${formattedDate}, ${formattedTime}`;
  }
  return formattedDate;
};
// Generate calendar days for the current month
const generateCalendarDays = (date: Date = new Date()): {
  day: number;
  date: Date;
  events: Event[];
}[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  // First day of the month
  const firstDay = new Date(year, month, 1);
  // Last day of the month
  const lastDay = new Date(year, month + 1, 0);
  // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = firstDay.getDay();
  // Calculate days from previous month to show
  const daysFromPrevMonth = firstDayOfWeek;
  // Calculate days from next month to show
  const daysInMonth = lastDay.getDate();
  const daysFromNextMonth = (7 - (daysFromPrevMonth + daysInMonth) % 7) % 7;
  // Generate calendar days
  const calendarDays: {
    day: number;
    date: Date;
    events: Event[];
  }[] = [];
  // Add days from previous month
  const prevMonth = new Date(year, month - 1, 0);
  const prevMonthDays = prevMonth.getDate();
  for (let i = 0; i < daysFromPrevMonth; i++) {
    const day = prevMonthDays - daysFromPrevMonth + i + 1;
    const date = new Date(year, month - 1, day);
    calendarDays.push({
      day,
      date,
      events: []
    });
  }
  // Add days from current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    // Find events for this day
    const dayEvents = mockEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === i && eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });
    calendarDays.push({
      day: i,
      date,
      events: dayEvents
    });
  }
  // Add days from next month
  for (let i = 1; i <= daysFromNextMonth; i++) {
    const date = new Date(year, month + 1, i);
    calendarDays.push({
      day: i,
      date,
      events: []
    });
  }
  return calendarDays;
};
export default function BusinessEvents() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [sponsorshipOpportunities, setSponsorshipOpportunities] = useState<SponsorshipOpportunity[]>([]);
  const [activeTab, setActiveTab] = useState<'calendar' | 'events' | 'sponsorships' | 'analytics'>('calendar');
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [calendarDays, setCalendarDays] = useState<{
    day: number;
    date: Date;
    events: Event[];
  }[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'past' | 'draft'>('all');
  const [filterType, setFilterType] = useState<'all' | 'business' | 'sponsored' | 'community'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isApplyingSponsorshipForm, setIsApplyingSponsorshipForm] = useState<string | null>(null);
  const [showWhensTheFunSyncModal, setShowWhensTheFunSyncModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // Fetch business and events data
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use the mock data
    setLoading(true);
    setTimeout(() => {
      setBusiness(mockBusiness);
      setEvents(mockEvents);
      setSponsors(mockSponsors);
      setSponsorshipOpportunities(mockSponsorshipOpportunities);
      setCalendarDays(generateCalendarDays(currentMonth));
      setLoading(false);
    }, 500);
  }, []);
  // Update calendar when month changes
  useEffect(() => {
    setCalendarDays(generateCalendarDays(currentMonth));
  }, [currentMonth]);
  // Handle month navigation
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  const goToToday = () => {
    setCurrentMonth(new Date());
  };
  // Filter events based on current filters and search term
  const filteredEvents = events.filter(event => {
    // Filter by status
    if (filterStatus !== 'all') {
      if (filterStatus === 'upcoming' && event.status !== 'upcoming') return false;
      if (filterStatus === 'past' && event.status !== 'past') return false;
      if (filterStatus === 'draft' && event.status !== 'draft') return false;
    }
    // Filter by type
    if (filterType !== 'all') {
      if (filterType === 'business' && event.eventType !== 'business') return false;
      if (filterType === 'sponsored' && event.eventType !== 'sponsored') return false;
      if (filterType === 'community' && event.eventType !== 'community') return false;
    }
    // Filter by search term
    if (searchTerm && !event.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });
  // Handle event creation
  const handleCreateEvent = () => {
    setIsCreatingEvent(true);
  };
  // Handle event view
  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
  };
  // Close event view modal
  const closeEventModal = () => {
    setSelectedEvent(null);
  };
  // Close create event modal
  const closeCreateEventModal = () => {
    setIsCreatingEvent(false);
  };
  // Handle day click in calendar
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    // This could open a modal to create an event on this date
    // or show events for this date
  };
  // Apply for sponsorship
  const handleApplyForSponsorship = (opportunityId: string) => {
    setIsApplyingSponsorshipForm(opportunityId);
  };
  // Close sponsorship application form
  const closeApplySponsorshipForm = () => {
    setIsApplyingSponsorshipForm(null);
  };
  // Toggle WhensTheFun sync modal
  const toggleWhensTheFunSyncModal = () => {
    setShowWhensTheFunSyncModal(!showWhensTheFunSyncModal);
  };
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading events...</p>
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
                  <Link to="/business/events" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700">
                    <CalendarIcon className="w-5 h-5 mr-3 text-blue-500" />
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/business/integrations" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                    <Link2Icon className="w-5 h-5 mr-3 text-gray-500" />
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
              <h1 className="text-2xl font-bold">Events</h1>
              <p className="text-gray-600">
                Create and manage your business events
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <button onClick={toggleWhensTheFunSyncModal} className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md bg-white hover:bg-gray-50">
                <RefreshCwIcon className="w-5 h-5 mr-1" />
                Sync with WhensTheFun
              </button>
              <button onClick={handleCreateEvent} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                <PlusIcon className="w-5 h-5 mr-1" />
                Create Event
              </button>
            </div>
          </div>
          {/* Tabs Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b">
              <div className="flex overflow-x-auto">
                <button onClick={() => setActiveTab('calendar')} className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'calendar' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <CalendarDaysIcon className="w-5 h-5 inline-block mr-1" />
                  Calendar View
                </button>
                <button onClick={() => setActiveTab('events')} className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'events' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <ListIcon className="w-5 h-5 inline-block mr-1" />
                  Events List
                </button>
                <button onClick={() => setActiveTab('sponsorships')} className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'sponsorships' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <DollarSignIcon className="w-5 h-5 inline-block mr-1" />
                  Sponsorships
                </button>
                <button onClick={() => setActiveTab('analytics')} className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'analytics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <BarChart2Icon className="w-5 h-5 inline-block mr-1" />
                  Analytics
                </button>
              </div>
            </div>
            {/* Calendar View Tab */} {activeTab === 'calendar' && <div className="p-4">
                {/* Calendar Header */}
                <div className="flex flex-wrap items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <button onClick={goToPreviousMonth} className="p-2 hover:bg-gray-100 rounded-full">
                      <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <h2 className="text-lg font-semibold">
                      {currentMonth.toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                    </h2>
                    <button onClick={goToNextMonth} className="p-2 hover:bg-gray-100 rounded-full">
                      <ChevronRightIcon className="w-5 h-5" />
                    </button>
                    <button onClick={goToToday} className="ml-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md">
                      Today
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 mt-2 md:mt-0">
                    <div className="relative">
                      <input type="text" placeholder="Search events..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64" />
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                    <div className="relative">
                      <button className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium flex items-center">
                        <FilterIcon className="w-4 h-4 mr-1" />
                        Filter
                        <ChevronDownIcon className="w-4 h-4 ml-1" />
                      </button>
                      <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="p-2 border-b">
                          <div className="text-xs font-semibold text-gray-500 mb-1">
                            Status
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <input type="radio" id="status-all" name="status" checked={filterStatus === 'all'} onChange={() => setFilterStatus('all')} className="h-3 w-3 text-blue-600" />
                              <label htmlFor="status-all" className="ml-2 text-sm text-gray-700">
                                All
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input type="radio" id="status-upcoming" name="status" checked={filterStatus === 'upcoming'} onChange={() => setFilterStatus('upcoming')} className="h-3 w-3 text-blue-600" />
                              <label htmlFor="status-upcoming" className="ml-2 text-sm text-gray-700">
                                Upcoming
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input type="radio" id="status-past" name="status" checked={filterStatus === 'past'} onChange={() => setFilterStatus('past')} className="h-3 w-3 text-blue-600" />
                              <label htmlFor="status-past" className="ml-2 text-sm text-gray-700">
                                Past
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input type="radio" id="status-draft" name="status" checked={filterStatus === 'draft'} onChange={() => setFilterStatus('draft')} className="h-3 w-3 text-blue-600" />
                              <label htmlFor="status-draft" className="ml-2 text-sm text-gray-700">
                                Draft
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <div className="text-xs font-semibold text-gray-500 mb-1">
                            Type
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <input type="radio" id="type-all" name="type" checked={filterType === 'all'} onChange={() => setFilterType('all')} className="h-3 w-3 text-blue-600" />
                              <label htmlFor="type-all" className="ml-2 text-sm text-gray-700">
                                All
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input type="radio" id="type-business" name="type" checked={filterType === 'business'} onChange={() => setFilterType('business')} className="h-3 w-3 text-blue-600" />
                              <label htmlFor="type-business" className="ml-2 text-sm text-gray-700">
                                Business
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input type="radio" id="type-sponsored" name="type" checked={filterType === 'sponsored'} onChange={() => setFilterType('sponsored')} className="h-3 w-3 text-blue-600" />
                              <label htmlFor="type-sponsored" className="ml-2 text-sm text-gray-700">
                                Sponsored
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input type="radio" id="type-community" name="type" checked={filterType === 'community'} onChange={() => setFilterType('community')} className="h-3 w-3 text-blue-600" />
                              <label htmlFor="type-community" className="ml-2 text-sm text-gray-700">
                                Community
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Calendar Grid */}
                <div className="border rounded-lg overflow-hidden">
                  {/* Weekday Headers */}
                  <div className="grid grid-cols-7 bg-gray-50 border-b">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => <div key={index} className="py-2 text-center text-sm font-medium text-gray-700">
                          {day}
                        </div>)}
                  </div>
                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 divide-x divide-y">
                    {calendarDays.map((day, index) => {
                  const isCurrentMonth = day.date.getMonth() === currentMonth.getMonth();
                  const isToday = day.date.toDateString() === new Date().toDateString();
                  const hasEvents = day.events.length > 0;
                  return <div key={index} className={`min-h-32 p-1 ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'} 
                                    ${isToday ? 'border-2 border-blue-500' : ''}
                                    hover:bg-blue-50 cursor-pointer relative`} onClick={() => handleDayClick(day.date)}>
                          <div className={`text-right p-1 ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'} `}>
                            {day.day}
                          </div>
                          {/* Events for this day */}
                          <div className="space-y-1 mt-1 max-h-24 overflow-y-auto">
                            {day.events.filter(event => {
                        // Apply filters
                        if (filterStatus !== 'all' && event.status !== filterStatus) return false;
                        if (filterType !== 'all' && event.eventType !== filterType) return false;
                        if (searchTerm && !event.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
                        return true;
                      }).map(event => <div key={event.id} className={`px-2 py-1 text-xs rounded truncate cursor-pointer
                                         ${event.eventType === 'business' ? 'bg-blue-100 text-blue-800' : event.eventType === 'sponsored' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`} onClick={e => {
                        e.stopPropagation();
                        handleViewEvent(event);
                      }}>
                                  {new Date(event.date).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit'
                        })} {' '}
                                  - {event.title}
                                </div>)}
                          </div>
                          {/* Indicator for more events */} {hasEvents && day.events.length > 3 && <div className="absolute bottom-1 right-1 text-xs text-gray-500">
                              +{day.events.length - 3} more
                            </div>}
                        </div>;
                })}
                  </div>
                </div>
              </div>} {/* Events List Tab */} {activeTab === 'events' && <div className="p-4">
                {/* Filters and Search */}
                <div className="flex flex-wrap items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'} rounded-md`}>
                      <ListIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => setViewMode('calendar')} className={`p-2 ${viewMode === 'calendar' ? 'bg-gray-200' : 'hover:bg-gray-100'} rounded-md`}>
                      <GripIcon className="w-5 h-5" />
                    </button>
                    <div className="ml-2 flex space-x-1">
                      <button onClick={() => setFilterStatus('all')} className={`px-3 py-1 text-sm rounded-md ${filterStatus === 'all' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}>
                        All
                      </button>
                      <button onClick={() => setFilterStatus('upcoming')} className={`px-3 py-1 text-sm rounded-md ${filterStatus === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}>
                        Upcoming
                      </button>
                      <button onClick={() => setFilterStatus('past')} className={`px-3 py-1 text-sm rounded-md ${filterStatus === 'past' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}>
                        Past
                      </button>
                      <button onClick={() => setFilterStatus('draft')} className={`px-3 py-1 text-sm rounded-md ${filterStatus === 'draft' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}>
                        Draft
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2 md:mt-0">
                    <div className="relative">
                      <input type="text" placeholder="Search events..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64" />
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                    <div className="relative">
                      <button className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium flex items-center">
                        <SlidersIcon className="w-4 h-4 mr-1" />
                        Type
                        <ChevronDownIcon className="w-4 h-4 ml-1" />
                      </button>
                      <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="p-2">
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <input type="radio" id="type-all-list" name="type-list" checked={filterType === 'all'} onChange={() => setFilterType('all')} className="h-3 w-3 text-blue-600" />
                              <label htmlFor="type-all-list" className="ml-2 text-sm text-gray-700">
                                All Types
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input type="radio" id="type-business-list" name="type-list" checked={filterType === 'business'} onChange={() => setFilterType('business')} className="h-3 w-3 text-blue-600" />
                              <label htmlFor="type-business-list" className="ml-2 text-sm text-gray-700">
                                Business Events
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input type="radio" id="type-sponsored-list" name="type-list" checked={filterType === 'sponsored'} onChange={() => setFilterType('sponsored')} className="h-3 w-3 text-blue-600" />
                              <label htmlFor="type-sponsored-list" className="ml-2 text-sm text-gray-700">
                                Sponsored Events
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input type="radio" id="type-community-list" name="type-list" checked={filterType === 'community'} onChange={() => setFilterType('community')} className="h-3 w-3 text-blue-600" />
                              <label htmlFor="type-community-list" className="ml-2 text-sm text-gray-700">
                                Community Events
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Events List */} {filteredEvents.length === 0 ? <div className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      No events found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm || filterStatus !== 'all' || filterType !== 'all' ? 'No events match your current filters.' : "You haven't created any events yet."}
                    </p>
                    {(searchTerm || filterStatus !== 'all' || filterType !== 'all') && <button onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
                setFilterType('all');
              } } className="text-blue-600 hover:text-blue-800 font-medium">
                        Clear filters
                      </button>}
                  </div> : <>
                    {viewMode === 'list' ? <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Event
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date & Time
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Location
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Attendees
                              </th>
                              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {filteredEvents.map(event => <tr key={event.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleViewEvent(event)}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    {event.imageUrl ? <img src={event.imageUrl} alt={event.title} className="h-10 w-10 rounded-md object-cover mr-3" /> : <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center mr-3">
                                        <CalendarIcon className="h-5 w-5 text-gray-500" />
                                      </div>}
                                    <div className="text-sm font-medium text-gray-900">
                                      {event.title}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">
                                    {formatDate(event.date)}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">
                                    {event.location}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full
                                    ${event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : event.status === 'live' ? 'bg-green-100 text-green-800' : event.status === 'past' ? 'bg-gray-100 text-gray-800' : event.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'} `}>
                                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full
                                    ${event.eventType === 'business' ? 'bg-indigo-100 text-indigo-800' : event.eventType === 'sponsored' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'} `}>
                                    {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">
                                    {event.attendees !== undefined ? <span>
                                        {event.attendees}/
                                        {event.capacity || '∞'}
                                      </span> : <span>-</span>}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <div className="flex justify-end space-x-2" onClick={e => e.stopPropagation()} >
                                    <button className="text-blue-600 hover:text-blue-900">
                                      <PenToolIcon className="h-4 w-4" />
                                    </button>
                                    <button className="text-gray-600 hover:text-gray-900">
                                      <MoreHorizontalIcon className="h-4 w-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>)}
                          </tbody>
                        </table>
                      </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredEvents.map(event => <div key={event.id} className="border rounded-lg overflow-hidden bg-white hover:shadow-md cursor-pointer" onClick={() => handleViewEvent(event)}>
                            {event.imageUrl ? <div className="h-40 overflow-hidden">
                                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                              </div> : <div className="h-40 bg-gray-200 flex items-center justify-center">
                                <CalendarIcon className="h-12 w-12 text-gray-400" />
                              </div>}
                            <div className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full
                                    ${event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : event.status === 'live' ? 'bg-green-100 text-green-800' : event.status === 'past' ? 'bg-gray-100 text-gray-800' : event.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'} `}>
                                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                  </span>
                                  <span className={`ml-1 px-2 py-1 text-xs font-medium rounded-full
                                    ${event.eventType === 'business' ? 'bg-indigo-100 text-indigo-800' : event.eventType === 'sponsored' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'} `}>
                                    {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
                                  </span>
                                </div>
                                <div className="flex" onClick={e => e.stopPropagation()} >
                                  <button className="text-gray-600 hover:text-gray-900 p-1">
                                    <MoreHorizontalIcon className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                              <h3 className="text-lg font-semibold mb-2">
                                {event.title}
                              </h3>
                              <div className="space-y-1 text-sm text-gray-600 mb-3">
                                <div className="flex items-center">
                                  <ClockIcon className="h-4 w-4 mr-1" />
                                  {formatDate(event.date)}
                                </div>
                                <div className="flex items-center">
                                  <MapPinIcon className="h-4 w-4 mr-1" />
                                  {event.location}
                                </div>
                                {event.attendees !== undefined && <div className="flex items-center">
                                    <UsersIcon className="h-4 w-4 mr-1" />
                                    {event.attendees} {' '} {event.capacity ? `/ ${event.capacity}` : ''} {' '}
                                    attendees
                                  </div>}
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  {event.isFree ? <span className="text-xs font-medium text-green-600">
                                      Free
                                    </span> : event.ticketPrice ? <span className="text-xs font-medium">
                                      ${event.ticketPrice}
                                    </span> : null}
                                </div>
                                <div className="flex items-center text-xs text-gray-500">
                                  {event.syncedWith && event.syncedWith.includes('WhensTheFun') && <div className="flex items-center mr-2" title="Synced with WhensTheFun">
                                        <CheckCircleIcon className="h-3 w-3 text-green-500 mr-1" />
                                        <span>WhensTheFun</span>
                                      </div>}
                                </div>
                              </div>
                            </div>
                          </div>)}
                      </div>}
                  </>}
              </div>} {/* Sponsorships Tab */} {activeTab === 'sponsorships' && <div className="p-4">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Your Sponsorships
                  </h3>
                  {sponsors.length === 0 ? <div className="bg-white rounded-lg border p-6 text-center">
                      <DollarSignIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold mb-2">
                        No sponsorships yet
                      </h4>
                      <p className="text-gray-600 mb-4">
                        You haven't sponsored any events yet. Sponsoring events
                        can help increase your business visibility.
                      </p>
                      <button onClick={() => setActiveTab('sponsorships')} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                        Browse Opportunities
                      </button>
                    </div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sponsors.map(sponsor => {
                  const sponsoredEvent = events.find(e => e.id === sponsor.eventId);
                  return <div key={sponsor.id} className="bg-white rounded-lg border overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                              <div className="flex items-center">
                                <div className="p-2 bg-purple-100 rounded-md mr-3">
                                  <DollarSignIcon className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">
                                    {sponsoredEvent?.title || 'Event'}
                                  </h4>
                                  <div className="text-sm text-gray-600">
                                    {sponsoredEvent ? formatDate(sponsoredEvent.date, false) : 'Unknown date'}
                                  </div>
                                </div>
                              </div>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full
                                ${sponsor.sponsorshipLevel === 'platinum' ? 'bg-purple-100 text-purple-800' : sponsor.sponsorshipLevel === 'gold' ? 'bg-yellow-100 text-yellow-800' : sponsor.sponsorshipLevel === 'silver' ? 'bg-gray-200 text-gray-800' : sponsor.sponsorshipLevel === 'bronze' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'} `}>
                                {sponsor.sponsorshipLevel.charAt(0).toUpperCase() + sponsor.sponsorshipLevel.slice(1)}
                              </span>
                            </div>
                            <div className="p-4">
                              <div className="flex justify-between items-center mb-3">
                                <div className="text-sm">
                                  <span className="font-medium">
                                    Contribution:
                                  </span>{' '}
                                  ${sponsor.contribution}
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full
                                  ${sponsor.status === 'confirmed' ? 'bg-green-100 text-green-800' : sponsor.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'} `}>
                                  {sponsor.status.charAt(0).toUpperCase() + sponsor.status.slice(1)}
                                </span>
                              </div>
                              <div className="mb-3">
                                <h5 className="text-sm font-medium mb-1">
                                  Benefits:
                                </h5>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {sponsor.benefits.map((benefit, index) => <li key={index} className="flex items-center">
                                      <CheckIcon className="w-3 h-3 text-green-500 mr-1" />
                                      {benefit}
                                    </li>)}
                                </ul>
                              </div>
                              <div className="flex justify-end space-x-2">
                                {sponsoredEvent && <button onClick={() => handleViewEvent(sponsoredEvent)} className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium">
                                    View Event
                                  </button>}
                                <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 font-medium">
                                  Manage
                                </button>
                              </div>
                            </div>
                          </div>;
                })}
                    </div>}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Sponsorship Opportunities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sponsorshipOpportunities.map(opportunity => <div key={opportunity.id} className="bg-white rounded-lg border overflow-hidden">
                        {opportunity.imageUrl ? <div className="h-40 overflow-hidden">
                            <img src={opportunity.imageUrl} alt={opportunity.eventName} className="w-full h-full object-cover" />
                          </div> : <div className="h-40 bg-gray-200 flex items-center justify-center">
                            <CalendarIcon className="h-12 w-12 text-gray-400" />
                          </div>}
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">
                              {opportunity.eventName}
                            </h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full
                              ${opportunity.status === 'open' ? 'bg-green-100 text-green-800' : opportunity.status === 'closing_soon' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'} `}>
                              {opportunity.status === 'open' ? 'Open' : opportunity.status === 'closing_soon' ? 'Closing Soon' : 'Closed'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            By {opportunity.organizerName}
                          </div>
                          <div className="space-y-1 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              {formatDate(opportunity.date, false)}
                            </div>
                            <div className="flex items-center">
                              <MapPinIcon className="h-4 w-4 mr-1" />
                              {opportunity.location}
                            </div>
                            {opportunity.attendeeCount && <div className="flex items-center">
                                <UsersIcon className="h-4 w-4 mr-1" />
                                Expected attendance: {opportunity.attendeeCount}
                              </div>}
                          </div>
                          <div className="mb-3">
                            <h5 className="text-sm font-medium mb-1">
                              Available Sponsorship Levels:
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {opportunity.sponsorshipLevels.map((level, index) => <div key={index} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                                    {level.name}: ${level.price} (
                                    {level.available} available)
                                  </div>)}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              Apply by:{' '} {formatDate(opportunity.applicationDeadline, false)}
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <button onClick={() => handleApplyForSponsorship(opportunity.id)} className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 flex items-center">
                              <DollarSignIcon className="w-4 h-4 mr-1" />
                              Apply to Sponsor
                            </button>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>} {/* Analytics Tab */} {activeTab === 'analytics' && <div className="p-4">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Event Performance
                  </h3>
                  {events.length === 0 ? <div className="bg-white rounded-lg border p-6 text-center">
                      <BarChart2Icon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold mb-2">
                        No event data available
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Create and run events to see performance analytics.
                      </p>
                      <button onClick={handleCreateEvent} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                        Create Your First Event
                      </button>
                    </div> : <>
                      {/* Event Metrics Overview */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-lg border p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <CalendarIcon className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="text-sm text-gray-500">
                              Last 30 days
                            </div>
                          </div>
                          <h4 className="text-2xl font-bold">
                            {events.filter(e => e.status === 'upcoming').length}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Upcoming Events
                          </p>
                        </div>
                        <div className="bg-white rounded-lg border p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <EyeIcon className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="text-sm text-gray-500">
                              Last 30 days
                            </div>
                          </div>
                          <h4 className="text-2xl font-bold">2,845</h4>
                          <p className="text-sm text-gray-500">
                            Total Event Views
                          </p>
                        </div>
                        <div className="bg-white rounded-lg border p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="p-2 bg-purple-100 rounded-lg">
                              <UsersIcon className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="text-sm text-gray-500">
                              Last 30 days
                            </div>
                          </div>
                          <h4 className="text-2xl font-bold">324</h4>
                          <p className="text-sm text-gray-500">
                            Total Attendees
                          </p>
                        </div>
                        <div className="bg-white rounded-lg border p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                              <HeartIcon className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div className="text-sm text-gray-500">Average</div>
                          </div>
                          <h4 className="text-2xl font-bold">18.5%</h4>
                          <p className="text-sm text-gray-500">
                            Engagement Rate
                          </p>
                        </div>
                      </div>
                      {/* Event Performance Table */}
                      <div className="bg-white rounded-lg border mb-6">
                        <div className="p-4 border-b">
                          <h4 className="font-medium">
                            Event Performance Metrics
                          </h4>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Event
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Views
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Registrations
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Attendance
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Engagement
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Revenue
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {events.filter(event => mockEventMetrics[event.id]).map(event => {
                          const metrics = mockEventMetrics[event.id];
                          return <tr key={event.id} className="hover:bg-gray-50">
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                          {event.title}
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                          {formatDate(event.date, false)}
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                          {metrics.viewCount}
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                          {metrics.registrationCount}
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                          {metrics.attendanceCount}
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                          {metrics.engagementRate}%
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                          {metrics.ticketRevenue ? `$${metrics.ticketRevenue}` : '-'}
                                        </div>
                                      </td>
                                    </tr>;
                        })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* Demographics Charts */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white rounded-lg border p-4">
                          <h4 className="font-medium mb-4">
                            Attendee Age Distribution
                          </h4>
                          <div className="h-64 flex items-center justify-center">
                            {/* This would be a real chart in a production app */}
                            <div className="w-full h-full flex items-end justify-between px-4">
                              {mockEventMetrics['e1']?.demographicData?.ageGroups.map((group, index) => <div key={index} className="flex flex-col items-center">
                                    <div className="w-12 bg-blue-500 rounded-t-md" style={{
                            height: `${group.value / Math.max(...(mockEventMetrics['e1']?.demographicData?.ageGroups.map(g => g.value) || [1])) * 200} px`
                          }}></div>
                                    <div className="text-xs text-gray-600 mt-2">
                                      {group.label}
                                    </div>
                                    <div className="text-xs font-medium">
                                      {group.value}%
                                    </div>
                                  </div>)}
                            </div>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg border p-4">
                          <h4 className="font-medium mb-4">
                            Attendee Gender Distribution
                          </h4>
                          <div className="h-64 flex items-center justify-center">
                            {/* This would be a real pie chart in a production app */}
                            <div className="relative w-48 h-48">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 rounded-full bg-white"></div>
                              </div>
                              {mockEventMetrics['e1']?.demographicData?.genderDistribution.map((segment, index) => {
                          const rotation = index === 0 ? 0 : mockEventMetrics['e1']?.demographicData?.genderDistribution.slice(0, index).reduce((sum, s) => sum + s.value, 0) * 3.6;
                          const color = index === 0 ? '#EC4899' // pink for female
                          : index === 1 ? '#3B82F6' // blue for male
                          : '#8B5CF6'; // purple for other
                          return <div key={index} className="absolute inset-0" style={{
                            clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((rotation + segment.value * 3.6) * Math.PI / 180)}% ${50 - 50 * Math.sin((rotation + segment.value * 3.6) * Math.PI / 180)}%, ${50 + 50 * Math.cos(rotation * Math.PI / 180)}% ${50 - 50 * Math.sin(rotation * Math.PI / 180)}%)`,
                            backgroundColor: color,
                            transform: 'rotate(0deg)'
                          }}></div>;
                        })}
                            </div>
                          </div>
                          <div className="flex justify-center space-x-6 mt-4">
                            {mockEventMetrics['e1']?.demographicData?.genderDistribution.map((segment, index) => {
                        const color = index === 0 ? '#EC4899' // pink for female
                        : index === 1 ? '#3B82F6' // blue for male
                        : '#8B5CF6'; // purple for other
                        return <div key={index} className="flex items-center">
                                    <div className="w-3 h-3 rounded-full mr-2" style={{
                            backgroundColor: color
                          } }></div>
                                    <span className="text-sm">
                                      {segment.label}: {segment.value}%
                                    </span>
                                  </div>;
                      })}
                          </div>
                        </div>
                      </div>
                      {/* Analytics Insights */}
                      <div className="bg-white rounded-lg border p-4">
                        <h4 className="font-medium mb-4">Event Insights</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border rounded-lg p-3 bg-blue-50 border-blue-100">
                            <div className="flex items-start">
                              <div className="p-2 bg-blue-100 rounded-lg mr-3 flex-shrink-0">
                                <TrendingUpIcon className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h5 className="font-medium text-blue-800">
                                  Attendance Trend
                                </h5>
                                <p className="text-sm text-blue-700 mt-1">
                                  Your event attendance has increased by 15%
                                  compared to last quarter. Coffee tasting
                                  workshops are particularly popular.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="border rounded-lg p-3 bg-green-50 border-green-100">
                            <div className="flex items-start">
                              <div className="p-2 bg-green-100 rounded-lg mr-3 flex-shrink-0">
                                <UsersIcon className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <h5 className="font-medium text-green-800">
                                  Audience Insight
                                </h5>
                                <p className="text-sm text-green-700 mt-1">
                                  Your events attract primarily 25-34 year old
                                  professionals. Consider targeting this
                                  demographic with more specialized events.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="border rounded-lg p-3 bg-purple-50 border-purple-100">
                            <div className="flex items-start">
                              <div className="p-2 bg-purple-100 rounded-lg mr-3 flex-shrink-0">
                                <DollarSignIcon className="w-5 h-5 text-purple-600" />
                              </div>
                              <div>
                                <h5 className="font-medium text-purple-800">
                                  Revenue Opportunity
                                </h5>
                                <p className="text-sm text-purple-700 mt-1">
                                  Paid workshops have a 85% attendance rate vs.
                                  65% for free events. Consider more premium
                                  offerings with limited capacity.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="border rounded-lg p-3 bg-yellow-50 border-yellow-100">
                            <div className="flex items-start">
                              <div className="p-2 bg-yellow-100 rounded-lg mr-3 flex-shrink-0">
                                <CalendarIcon className="w-5 h-5 text-yellow-600" />
                              </div>
                              <div>
                                <h5 className="font-medium text-yellow-800">
                                  Optimal Scheduling
                                </h5>
                                <p className="text-sm text-yellow-700 mt-1">
                                  Weekend events see 40% higher attendance than
                                  weekday events. Evening events (after 6PM)
                                  perform best on weekdays.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>}
                </div>
              </div>}
          </div>
          {/* WhensTheFun Integration Banner */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-start md:items-center md:flex-row flex-col">
                <div className="p-3 bg-purple-100 rounded-lg mr-4 mb-3 md:mb-0">
                  <CalendarDaysIcon className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    WhensTheFun Integration
                  </h3>
                  <p className="text-gray-600 max-w-2xl">
                    Automatically sync your business events with WhensTheFun to
                    reach a wider audience. Events will appear in local event
                    listings and be discoverable by potential customers.
                  </p>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <button onClick={toggleWhensTheFunSyncModal} className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700">
                  <RefreshCwIcon className="w-5 h-5 mr-1" />
                  Sync Events
                </button>
              </div>
            </div>
          </div>
          {/* Event Management Tips */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">
              Event Management Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <CalendarDaysIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-medium">Plan Ahead</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Create and publish your events at least 3-4 weeks in advance
                  to maximize visibility and attendance.
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  Event planning guide
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </a>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <GlobeIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-medium">Promote Widely</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Use cross-platform promotion to reach more potential
                  attendees. Share your events on social media and through
                  email.
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  Promotion strategies
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </a>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <BarChart2Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-medium">Analyze Results</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Review your event analytics to understand what works and
                  improve future events based on attendee behavior.
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  Analytics best practices
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
      {/* Event View Modal */} {selectedEvent && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {selectedEvent.imageUrl ? <div className="h-64 overflow-hidden">
                  <img src={selectedEvent.imageUrl} alt={selectedEvent.title} className="w-full h-full object-cover" />
                  <button onClick={closeEventModal} className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100">
                    <XIcon className="w-5 h-5" />
                  </button>
                </div> : <div className="h-64 bg-gray-200 flex items-center justify-center relative">
                  <CalendarIcon className="h-16 w-16 text-gray-400" />
                  <button onClick={closeEventModal} className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100">
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>}
            </div>
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between mb-4">
                <div className="flex items-center space-x-2 mb-2 md:mb-0">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full
                    ${selectedEvent.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : selectedEvent.status === 'live' ? 'bg-green-100 text-green-800' : selectedEvent.status === 'past' ? 'bg-gray-100 text-gray-800' : selectedEvent.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'} `}>
                    {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full
                    ${selectedEvent.eventType === 'business' ? 'bg-indigo-100 text-indigo-800' : selectedEvent.eventType === 'sponsored' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'} `}>
                    {selectedEvent.eventType.charAt(0).toUpperCase() + selectedEvent.eventType.slice(1)}
                  </span>
                  {selectedEvent.visibility !== 'public' && <span className={`px-2 py-1 text-xs font-medium rounded-full
                      ${selectedEvent.visibility === 'private' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'} `}>
                      {selectedEvent.visibility.charAt(0).toUpperCase() + selectedEvent.visibility.slice(1)}
                    </span>}
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-md">
                    <PenToolIcon className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-md">
                    <TrashIcon className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-md">
                    <MoreHorizontalIcon className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="col-span-2">
                  <p className="text-gray-700 mb-6">
                    {selectedEvent.description}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <ClockIcon className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Date & Time</h3>
                        <p className="text-gray-600">
                          {formatDate(selectedEvent.date)} {selectedEvent.endDate && <>
                              <br />
                              <span className="text-gray-500">
                                to {formatDate(selectedEvent.endDate)}
                              </span>
                            </>}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPinIcon className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p className="text-gray-600">
                          {selectedEvent.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <UsersIcon className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Attendees</h3>
                        <p className="text-gray-600">
                          {selectedEvent.attendees !== undefined ? <>
                              {selectedEvent.attendees} {' '} {selectedEvent.capacity ? `of ${selectedEvent.capacity}` : ''} {' '}
                              registered
                              {selectedEvent.capacity && <span className="ml-2 text-sm text-gray-500">
                                  (
                                  {Math.round(selectedEvent.attendees / selectedEvent.capacity * 100)}
                                  % capacity)
                                </span>}
                            </> : 'No attendance data available'}
                        </p>
                      </div>
                    </div>
                    {selectedEvent.ticketPrice !== undefined && <div className="flex items-start">
                        <DollarSignIcon className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Pricing</h3>
                          <p className="text-gray-600">
                            {selectedEvent.isFree ? 'Free event' : `$${selectedEvent.ticketPrice} per ticket`}
                          </p>
                        </div>
                      </div>} {selectedEvent.tags && selectedEvent.tags.length > 0 && <div className="flex items-start">
                        <TagIcon className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Tags</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {selectedEvent.tags.map((tag, index) => <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                {tag}
                              </span>)}
                          </div>
                        </div>
                      </div>}
                  </div>
                </div>
                <div>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h3 className="font-medium mb-3">Event Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Organizer:</span>
                        <span className="font-medium">
                          {selectedEvent.organizer}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-medium">
                          {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Visibility:</span>
                        <span className="font-medium">
                          {selectedEvent.visibility.charAt(0).toUpperCase() + selectedEvent.visibility.slice(1)}
                        </span>
                      </div>
                      {selectedEvent.syncedWith && selectedEvent.syncedWith.length > 0 && <div className="flex justify-between">
                            <span className="text-gray-600">Synced with:</span>
                            <div>
                              {selectedEvent.syncedWith.map((platform, index) => <span key={index} className="font-medium block text-right">
                                    {platform}
                                  </span>)}
                            </div>
                          </div>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 flex items-center justify-center">
                      <PenToolIcon className="w-4 h-4 mr-1" />
                      Edit Event
                    </button>
                    {selectedEvent.status === 'upcoming' && <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 flex items-center justify-center">
                        <ExternalLinkIcon className="w-4 h-4 mr-1" />
                        View Public Page
                      </button>} {selectedEvent.status === 'draft' && <button className="w-full px-4 py-2 border border-green-600 text-green-600 font-medium rounded-md hover:bg-green-50 flex items-center justify-center">
                        <CheckIcon className="w-4 h-4 mr-1" />
                        Publish Event
                      </button>} {selectedEvent.status === 'upcoming' && !selectedEvent.syncedWith?.includes('WhensTheFun') && <button onClick={toggleWhensTheFunSyncModal} className="w-full px-4 py-2 border border-purple-600 text-purple-600 font-medium rounded-md hover:bg-purple-50 flex items-center justify-center">
                          <RefreshCwIcon className="w-4 h-4 mr-1" />
                          Sync with WhensTheFun
                        </button>}
                  </div>
                </div>
              </div>
              {/* Event Metrics (if available) */} {mockEventMetrics[selectedEvent.id] && <div className="border-t pt-6 mt-6">
                  <h3 className="font-semibold text-lg mb-4">
                    Event Performance
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Views</span>
                        <EyeIcon className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="text-xl font-bold">
                        {mockEventMetrics[selectedEvent.id].viewCount}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">
                          Registrations
                        </span>
                        <UserIcon className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="text-xl font-bold">
                        {mockEventMetrics[selectedEvent.id].registrationCount}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">
                          Attendance
                        </span>
                        <CheckCircleIcon className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="text-xl font-bold">
                        {mockEventMetrics[selectedEvent.id].attendanceCount}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">
                          Engagement
                        </span>
                        <HeartIcon className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="text-xl font-bold">
                        {mockEventMetrics[selectedEvent.id].engagementRate}%
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-right">
                    <button onClick={() => {
                closeEventModal();
                setActiveTab('analytics');
              } } className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center ml-auto">
                      View detailed analytics
                      <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>}
            </div>
          </div>
        </div>} {/* Create Event Modal */} {isCreatingEvent && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Create New Event</h2>
                <button onClick={closeCreateEventModal} className="p-2 hover:bg-gray-100 rounded-full">
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="event-title" className="block text-sm font-medium text-gray-700 mb-1">
                        Event Title*
                      </label>
                      <input type="text" id="event-title" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter event title" />
                    </div>
                    <div>
                      <label htmlFor="event-description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description*
                      </label>
                      <textarea id="event-description" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Describe your event"></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="event-type" className="block text-sm font-medium text-gray-700 mb-1">
                          Event Type*
                        </label>
                        <select id="event-type" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option value="business">Business Event</option>
                          <option value="sponsored">Sponsored Event</option>
                          <option value="community">Community Event</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="event-visibility" className="block text-sm font-medium text-gray-700 mb-1">
                          Visibility*
                        </label>
                        <select id="event-visibility" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option value="public">Public</option>
                          <option value="private">
                            Private (Invitation Only)
                          </option>
                          <option value="unlisted">
                            Unlisted (Hidden from listings)
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Date and Location */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Date & Location</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="event-start-date" className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date & Time*
                        </label>
                        <input type="datetime-local" id="event-start-date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label htmlFor="event-end-date" className="block text-sm font-medium text-gray-700 mb-1">
                          End Date & Time*
                        </label>
                        <input type="datetime-local" id="event-end-date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="event-location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location*
                      </label>
                      <input type="text" id="event-location" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter event location" />
                    </div>
                  </div>
                </div>
                {/* Capacity and Tickets */}
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Capacity & Tickets
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="event-capacity" className="block text-sm font-medium text-gray-700 mb-1">
                          Capacity (optional)
                        </label>
                        <input type="number" id="event-capacity" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Leave blank for unlimited" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Is this a free event?
                        </label>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center">
                            <input type="radio" id="event-free-yes" name="event-free" className="h-4 w-4 text-blue-600 border-gray-300" />
                            <label htmlFor="event-free-yes" className="ml-2 text-sm text-gray-700">
                              Yes, it's free
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="event-free-no" name="event-free" className="h-4 w-4 text-blue-600 border-gray-300" />
                            <label htmlFor="event-free-no" className="ml-2 text-sm text-gray-700">
                              No, requires ticket
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="event-price" className="block text-sm font-medium text-gray-700 mb-1">
                        Ticket Price ($)
                      </label>
                      <input type="number" id="event-price" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter ticket price" step="0.01" />
                    </div>
                  </div>
                </div>
                {/* Event Image */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Event Image</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input type="file" id="event-image" accept="image/*" className="hidden" />
                    <label htmlFor="event-image" className="cursor-pointer flex flex-col items-center justify-center">
                      <UploadIcon className="w-12 h-12 text-gray-400 mb-3" />
                      <span className="text-gray-600 font-medium mb-1">
                        Drag an image here or click to upload
                      </span>
                      <span className="text-gray-500 text-sm">
                        Recommended size: 1200 x 600 pixels
                      </span>
                    </label>
                  </div>
                </div>
                {/* Additional Settings */}
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Additional Settings
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="event-tags" className="block text-sm font-medium text-gray-700 mb-1">
                        Tags (comma separated)
                      </label>
                      <input type="text" id="event-tags" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., coffee, workshop, tasting" />
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="sync-whensthefun" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      <label htmlFor="sync-whensthefun" className="ml-2 text-sm text-gray-700">
                        Sync with WhensTheFun
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="share-social" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      <label htmlFor="share-social" className="ml-2 text-sm text-gray-700">
                        Share on social media after creation
                      </label>
                    </div>
                  </div>
                </div>
                {/* Form Actions */}
                <div className="pt-6 border-t flex justify-end space-x-3">
                  <button onClick={closeCreateEventModal} className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-yellow-600 text-white font-medium rounded-md hover:bg-yellow-700">
                    Save as Draft
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                    Create Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>} {/* WhensTheFun Sync Modal */} {showWhensTheFunSyncModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-full mr-3">
                    <CalendarDaysIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold">Sync with WhensTheFun</h2>
                </div>
                <button onClick={toggleWhensTheFunSyncModal} className="p-2 hover:bg-gray-100 rounded-full">
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Select which events you want to sync with WhensTheFun. Synced
                  events will appear in local event listings and be discoverable
                  by potential customers.
                </p>
                <div className="border rounded-lg divide-y max-h-64 overflow-y-auto">
                  {events.filter(e => e.status === 'upcoming' || e.status === 'draft').map(event => <div key={event.id} className="p-3 flex items-center justify-between hover:bg-gray-50">
                        <div className="flex items-center">
                          <input type="checkbox" id={`sync-event-${event.id} `} checked={event.syncedWith?.includes('WhensTheFun') || false} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                          <label htmlFor={`sync-event-${event.id} `} className="ml-2 flex-grow">
                            <div className="font-medium">{event.title}</div>
                            <div className="text-sm text-gray-500">
                              {formatDate(event.date, false)}
                            </div>
                          </label>
                        </div>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full
                        ${event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'} `}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                      </div>)}
                </div>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <InfoIcon className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-800">
                      About WhensTheFun Integration
                    </h4>
                    <p className="text-sm text-purple-700 mt-1">
                      WhensTheFun is a popular local events platform that helps
                      businesses reach new customers. Synced events will
                      automatically update if you make changes to them in your
                      dashboard.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button onClick={toggleWhensTheFunSyncModal} className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={toggleWhensTheFunSyncModal} className="px-4 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 flex items-center">
                  <RefreshCwIcon className="w-4 h-4 mr-1" />
                  Sync Selected Events
                </button>
              </div>
            </div>
          </div>
        </div>} {/* Apply for Sponsorship Modal */} {isApplyingSponsorshipForm && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Apply for Sponsorship</h2>
                <button onClick={closeApplySponsorshipForm} className="p-2 hover:bg-gray-100 rounded-full">
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              {/* Sponsorship Application Form */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Event Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {sponsorshipOpportunities.find(o => o.id === isApplyingSponsorshipForm)?.imageUrl ? <img src={sponsorshipOpportunities.find(o => o.id === isApplyingSponsorshipForm)?.imageUrl} alt="Event" className="w-16 h-16 rounded-md object-cover" /> : <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                            <CalendarIcon className="w-8 h-8 text-gray-400" />
                          </div>}
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">
                          {sponsorshipOpportunities.find(o => o.id === isApplyingSponsorshipForm)?.eventName}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Organized by:{' '} {sponsorshipOpportunities.find(o => o.id === isApplyingSponsorshipForm)?.organizerName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(sponsorshipOpportunities.find(o => o.id === isApplyingSponsorshipForm)?.date || '', false)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {sponsorshipOpportunities.find(o => o.id === isApplyingSponsorshipForm)?.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Sponsorship Level
                  </h3>
                  <div className="space-y-3">
                    {sponsorshipOpportunities.find(o => o.id === isApplyingSponsorshipForm)?.sponsorshipLevels.map((level, index) => <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                          <div className="flex items-start">
                            <input type="radio" id={`level-${index} `} name="sponsorship-level" className="h-4 w-4 text-blue-600 border-gray-300 mt-1" />
                            <label htmlFor={`level-${index} `} className="ml-2 flex-grow">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">
                                  {level.name} Sponsorship
                                </span>
                                <span className="text-lg font-bold">
                                  ${level.price}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 mt-1 mb-2">
                                {level.available} spots available
                              </div>
                              <div className="text-sm">
                                <h5 className="font-medium mb-1">Benefits:</h5>
                                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                  {level.benefits.map((benefit, i) => <li key={i} >{benefit}</li>)}
                                </ul>
                              </div>
                            </label>
                          </div>
                        </div>)}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Additional Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="sponsorship-message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message to Organizer (optional)
                      </label>
                      <textarea id="sponsorship-message" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Introduce your business and why you're interested in sponsoring this event"></textarea>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="sponsorship-terms" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      <label htmlFor="sponsorship-terms" className="ml-2 text-sm text-gray-700">
                        I agree to the sponsorship terms and conditions
                      </label>
                    </div>
                  </div>
                </div>
                {/* Form Actions */}
                <div className="pt-6 border-t flex justify-end space-x-3">
                  <button onClick={closeApplySponsorshipForm} className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50">
                    Cancel
                  </button>
                  <button onClick={closeApplySponsorshipForm} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                    Submit Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>} {/* Day Selection Modal */} {selectedDate && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
                </h2>
                <button onClick={() => setSelectedDate(null)} className="p-2 hover:bg-gray-100 rounded-full">
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              {/* Events for selected day */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Events on this day:</h3>
                {events.filter(event => {
              const eventDate = new Date(event.date);
              return eventDate.toDateString() === selectedDate.toDateString();
            }).length === 0 ? <div className="text-center py-6 bg-gray-50 rounded-lg">
                    <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-600">
                      No events scheduled for this day
                    </p>
                  </div> : <div className="space-y-3">
                    {events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.toDateString() === selectedDate.toDateString();
              }).map(event => <div key={event.id} className="flex items-start p-3 border rounded-lg hover:bg-gray-50">
                          <div className="p-2 bg-blue-100 rounded-md mr-3 flex-shrink-0">
                            <ClockIcon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{event.title}</h4>
                              <span className={`px-2 py-0.5 text-xs font-medium rounded-full
                              ${event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : event.status === 'live' ? 'bg-green-100 text-green-800' : event.status === 'past' ? 'bg-gray-100 text-gray-800' : event.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'} `}>
                                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              {new Date(event.date).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit'
                    })} {event.endDate && ` - ${new Date(event.endDate).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit'
                    })}`}
                            </div>
                            <div className="text-sm text-gray-600">
                              {event.location}
                            </div>
                            <div className="mt-2 flex justify-end">
                              <button onClick={() => {
                      setSelectedDate(null);
                      handleViewEvent(event);
                    } } className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>)}
                  </div>}
              </div>
              <div className="flex justify-between">
                <button onClick={() => setSelectedDate(null)} className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50">
                  Close
                </button>
                <button onClick={() => {
              setSelectedDate(null);
              handleCreateEvent();
            } } className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 flex items-center">
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Create Event on This Day
                </button>
              </div>
            </div>
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
