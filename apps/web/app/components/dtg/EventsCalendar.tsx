import React, { useEffect, useState } from 'react';
import { CalendarIcon, MapPinIcon, ClockIcon, UsersIcon, FilterIcon, ListIcon, MapIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon, SunIcon, CloudIcon, UmbrellaIcon, BellIcon, Share2Icon, CarIcon, ExternalLinkIcon, CheckIcon, ArrowRightIcon, SearchIcon, MusicIcon, UtensilsIcon, HeartIcon, UsersIcon as GroupIcon, DollarSignIcon, TagIcon } from 'lucide-react';
// Types
interface Event {
  id: number;
  title: string;
  date: string;
  dateObj: Date;
  location: string;
  image: string;
  description: string;
  category: string;
  attendees: number;
  price: string;
  duration?: string;
  weather?: {
    condition: 'sunny' | 'cloudy' | 'rainy';
    temperature: number;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
}
interface EventsCalendarProps {
  events: Event[];
  onFilterChange: (filters: any) => void;
}
export function EventsCalendar({
  events,
  onFilterChange
}: EventsCalendarProps) {
  const [view, setView] = useState<'calendar' | 'map' | 'list'>('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filters, setFilters] = useState({
    period: 'all',
    categories: [] as string[],
    price: 'all'
  });
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  // Calculate days for the current month view
  useEffect(() => {
    const days = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0);
    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    // Add days from previous month to fill the first week
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay - i));
    }
    // Add all days of the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    // Add days from next month to complete the last week
    const remainingDays = 7 - days.length % 7;
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push(new Date(year, month + 1, i));
      }
    }
    setCalendarDays(days);
  }, [currentMonth]);
  // Set featured events
  useEffect(() => {
    // Select 3 events with the most attendees
    const featured = [...events].sort((a, b) => b.attendees - a.attendees).slice(0, 3);
    setFeaturedEvents(featured);
  }, [events]);
  // Apply filters and notify parent
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);
  // Group events by time of day
  const groupEventsByTime = (events: Event[]) => {
    const morning = events.filter(e => {
      const hour = e.dateObj.getHours();
      return hour >= 5 && hour < 12;
    });
    const afternoon = events.filter(e => {
      const hour = e.dateObj.getHours();
      return hour >= 12 && hour < 17;
    });
    const evening = events.filter(e => {
      const hour = e.dateObj.getHours();
      return hour >= 17 || hour < 5;
    });
    return {
      morning,
      afternoon,
      evening
    };
  };
  // Filter events for the selected date
  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    return events.filter(event => {
      const eventDate = event.dateObj;
      return eventDate.getDate() === date.getDate() && eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear();
    });
  };
  // Check if a date has events
  const hasEvents = (date: Date) => {
    return events.some(event => {
      const eventDate = event.dateObj;
      return eventDate.getDate() === date.getDate() && eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear();
    });
  };
  // Get events count for a date
  const getEventsCount = (date: Date) => {
    return events.filter(event => {
      const eventDate = event.dateObj;
      return eventDate.getDate() === date.getDate() && eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear();
    }).length;
  };
  // Handle month navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  // Handle filter changes
  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  const handleCategoryToggle = (category: string) => {
    setFilters(prev => {
      const categories = [...prev.categories];
      if (categories.includes(category)) {
        return {
          ...prev,
          categories: categories.filter(c => c !== category)
        };
      } else {
        return {
          ...prev,
          categories: [...categories, category]
        };
      }
    });
  };
  // Jump to today
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };
  // Jump to this weekend
  const goToWeekend = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    let daysUntilWeekend = 0;
    if (dayOfWeek === 0) {
      // Sunday
      daysUntilWeekend = 6; // Go to next Saturday
    } else if (dayOfWeek === 6) {
      // Saturday
      daysUntilWeekend = 0; // Today is Saturday
    } else {
      daysUntilWeekend = 6 - dayOfWeek; // Days until Saturday
    }
    const weekend = new Date(today);
    weekend.setDate(today.getDate() + daysUntilWeekend);
    setCurrentMonth(new Date(weekend.getFullYear(), weekend.getMonth(), 1));
    setSelectedDate(weekend);
  };
  // Get weather icon based on condition
  const getWeatherIcon = (condition: 'sunny' | 'cloudy' | 'rainy') => {
    switch (condition) {
      case 'sunny':
        return <SunIcon className="w-5 h-5 text-yellow-500" />;
      case 'cloudy':
        return <CloudIcon className="w-5 h-5 text-gray-500" />;
      case 'rainy':
        return <UmbrellaIcon className="w-5 h-5 text-blue-500" />;
      default:
        return <SunIcon className="w-5 h-5 text-yellow-500" />;
    }
  };
  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Music':
        return <MusicIcon className="w-4 h-4" />;
      case 'Food & Drink':
        return <UtensilsIcon className="w-4 h-4" />;
      case 'Sports':
      case 'Fitness':
        return <UsersIcon className="w-4 h-4" />;
      default:
        return <TagIcon className="w-4 h-4" />;
    }
  };
  // Format price for display
  const formatPrice = (price: string) => {
    return price === 'Free' ? <span className="text-green-600 font-medium">FREE</span> : price;
  };
  // Selected date events
  const selectedDateEvents = getEventsForDate(selectedDate);
  const {
    morning,
    afternoon,
    evening
  } = groupEventsByTime(selectedDateEvents);
  // Render days of week header
  const renderDaysOfWeek = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return <div className="grid grid-cols-7 mb-2">
        {days.map(day => <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>)}
      </div>;
  };
  // Render calendar grid
  const renderCalendarGrid = () => {
    return <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
        const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
        const isToday = day.toDateString() === new Date().toDateString();
        const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
        const dayEvents = getEventsCount(day);
        return <div key={index} onClick={() => setSelectedDate(day)} className={`
                relative h-20 p-1 border rounded-md cursor-pointer transition-colors
                ${isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}
                ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:bg-gray-50'}
                ${isToday ? 'font-bold' : ''}
              `}>
              <div className="flex justify-between items-start">
                <span className={`text-sm ${isToday ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
                  {day.getDate()}
                </span>
                {dayEvents > 0 && <span className="text-xs font-medium bg-blue-100 text-blue-800 rounded-full px-1.5">
                    {dayEvents}
                  </span>}
              </div>
              {hasEvents(day) && <div className="absolute bottom-1 left-0 right-0 flex justify-center">
                  <div className="flex space-x-1">
                    {dayEvents > 0 && dayEvents <= 3 ? Array(dayEvents).fill(0).map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>) : dayEvents > 3 ? <>
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <span className="text-xs text-blue-600">
                          +{dayEvents - 3}
                        </span>
                      </> : null}
                  </div>
                </div>}
            </div>;
      })}
      </div>;
  };
  // Render featured events carousel
  const renderFeaturedEvents = () => {
    return <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Featured Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredEvents.map(event => <div key={event.id} className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow" onMouseEnter={() => setHoveredEvent(event)} onMouseLeave={() => setHoveredEvent(null)}>
              <div className="h-48 relative">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg mb-1">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-white/90 text-sm">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <span>
                      {new Date(event.dateObj).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                    </span>
                    <span className="mx-2">•</span>
                    <ClockIcon className="w-4 h-4 mr-1" />
                    <span>
                      {new Date(event.dateObj).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                    </span>
                  </div>
                </div>
                {/* Price badge */}
                <div className="absolute top-3 right-3 bg-white/90 text-gray-800 text-xs font-bold px-2 py-1 rounded-full">
                  {event.price}
                </div>
                {/* Weather badge for outdoor events */}
                {event.weather && <div className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                    {getWeatherIcon(event.weather.condition)}
                    <span className="ml-1">{event.weather.temperature}°</span>
                  </div>}
              </div>
              <div className="p-4 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    {event.category}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <UsersIcon className="w-4 h-4 mr-1" />
                    <span>{event.attendees} attending</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    RSVP
                  </button>
                </div>
              </div>
              {/* Quick preview overlay on hover */}
              {hoveredEvent?.id === event.id && <div className="absolute inset-0 bg-black/75 flex items-center justify-center p-4 transition-opacity">
                  <div className="text-center text-white">
                    <p className="mb-4">
                      {event.description.substring(0, 120)}...
                    </p>
                    <Link to={`/events/${event.id}`} className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                      View Details
                      <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>}
            </div>)}
        </div>
      </div>;
  };
  // Render time-based event list
  const renderTimeBasedList = () => {
    if (!selectedDate) {
      return <div className="text-center py-8">
          <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Select a date to view events</p>
        </div>;
    }
    if (selectedDateEvents.length === 0) {
      return <div className="text-center py-8 bg-white rounded-lg shadow-sm">
          <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No events on this day
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-4">
            There are no events scheduled for{' '}
            {selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
            .
          </p>
          <button onClick={() => setShowAddEventForm(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add an Event
          </button>
        </div>;
    }
    const formatDateHeading = (date: Date) => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (date.toDateString() === today.toDateString()) {
        return 'Today';
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
      } else {
        return date.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric'
        });
      }
    };
    return <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">
          Events for {formatDateHeading(selectedDate)}
        </h2>
        {/* Morning section */}
        {morning.length > 0 && <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 flex items-center text-orange-600">
              <SunIcon className="w-5 h-5 mr-2" />
              Morning
            </h3>
            <div className="space-y-4">
              {morning.map(event => renderEventCard(event))}
            </div>
          </div>}
        {/* Afternoon section */}
        {afternoon.length > 0 && <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 flex items-center text-yellow-600">
              <SunIcon className="w-5 h-5 mr-2" />
              Afternoon
            </h3>
            <div className="space-y-4">
              {afternoon.map(event => renderEventCard(event))}
            </div>
          </div>}
        {/* Evening section */}
        {evening.length > 0 && <div className="mb-4">
            <h3 className="text-lg font-medium mb-4 flex items-center text-indigo-600">
              <CloudIcon className="w-5 h-5 mr-2" />
              Evening
            </h3>
            <div className="space-y-4">
              {evening.map(event => renderEventCard(event))}
            </div>
          </div>}
      </div>;
  };
  // Render individual event card
  const renderEventCard = (event: Event) => {
    return <div key={event.id} className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 h-32 md:h-auto">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
          </div>
          <div className="p-4 md:w-3/4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-lg mb-1">{event.title}</h4>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  <span>
                    {new Date(event.dateObj).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                    {event.duration && ` • ${event.duration}`}
                  </span>
                </div>
              </div>
              <span className="text-sm font-medium">
                {formatPrice(event.price)}
              </span>
            </div>
            <div className="flex flex-wrap items-center mb-3">
              <div className="flex items-center text-sm text-gray-600 mr-4">
                <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                <span>{event.location}</span>
              </div>
              <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full flex items-center">
                {getCategoryIcon(event.category)}
                <span className="ml-1">{event.category}</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-2">
                  {/* Attendee avatars would go here */}
                  <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-500"></div>
                </div>
                <span className="text-sm text-gray-600">
                  {event.attendees} attending
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="text-gray-600 hover:text-gray-800">
                  <BellIcon className="w-5 h-5" />
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <Share2Icon className="w-5 h-5" />
                </button>
                <Link to={`/events/${event.id}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                  Details
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>;
  };
  return <div className="container mx-auto px-4">
      {/* Interactive Calendar Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex items-center mb-4 md:mb-0">
            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full mr-2">
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-bold">
              {currentMonth.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric'
            })}
            </h2>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full ml-2">
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="flex space-x-2">
            <button onClick={goToToday} className="px-3 py-1.5 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-md">
              Today
            </button>
            <button onClick={goToWeekend} className="px-3 py-1.5 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-md">
              This Weekend
            </button>
            <div className="flex">
              <button onClick={() => setView('calendar')} className={`p-2 rounded-l-md ${view === 'calendar' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                <CalendarIcon className="w-5 h-5" />
              </button>
              <button onClick={() => setView('map')} className={`p-2 ${view === 'map' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                <MapIcon className="w-5 h-5" />
              </button>
              <button onClick={() => setView('list')} className={`p-2 rounded-r-md ${view === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                <ListIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        {/* Smart Filter Bar */}
        <div className="flex flex-wrap items-center mb-4 overflow-x-auto pb-2">
          <button onClick={() => handleFilterChange('period', 'today')} className={`flex items-center px-3 py-1.5 mr-2 mb-2 rounded-full text-sm font-medium ${filters.period === 'today' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            <CalendarIcon className="w-4 h-4 mr-1" />
            Today
          </button>
          <button onClick={() => handleFilterChange('period', 'weekend')} className={`flex items-center px-3 py-1.5 mr-2 mb-2 rounded-full text-sm font-medium ${filters.period === 'weekend' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            <CalendarIcon className="w-4 h-4 mr-1" />
            This Weekend
          </button>
          <button onClick={() => handleFilterChange('price', 'free')} className={`flex items-center px-3 py-1.5 mr-2 mb-2 rounded-full text-sm font-medium ${filters.price === 'free' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            <DollarSignIcon className="w-4 h-4 mr-1" />
            Free
          </button>
          <button onClick={() => handleCategoryToggle('Family')} className={`flex items-center px-3 py-1.5 mr-2 mb-2 rounded-full text-sm font-medium ${filters.categories.includes('Family') ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            <GroupIcon className="w-4 h-4 mr-1" />
            Family
          </button>
          <button onClick={() => handleCategoryToggle('Music')} className={`flex items-center px-3 py-1.5 mr-2 mb-2 rounded-full text-sm font-medium ${filters.categories.includes('Music') ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            <MusicIcon className="w-4 h-4 mr-1" />
            Music
          </button>
          <button onClick={() => handleCategoryToggle('Sports')} className={`flex items-center px-3 py-1.5 mr-2 mb-2 rounded-full text-sm font-medium ${filters.categories.includes('Sports') ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            <UsersIcon className="w-4 h-4 mr-1" />
            Sports
          </button>
          <button onClick={() => handleCategoryToggle('Food & Drink')} className={`flex items-center px-3 py-1.5 mr-2 mb-2 rounded-full text-sm font-medium ${filters.categories.includes('Food & Drink') ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            <UtensilsIcon className="w-4 h-4 mr-1" />
            Food
          </button>
          <button className="flex items-center px-3 py-1.5 mb-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200">
            <FilterIcon className="w-4 h-4 mr-1" />
            More Filters
          </button>
        </div>
        {/* Calendar View */}
        {view === 'calendar' && <>
            {renderDaysOfWeek()}
            {renderCalendarGrid()}
          </>}
        {/* Map View */}
        {view === 'map' && <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">
                Map view would display event locations here
              </p>
            </div>
          </div>}
        {/* List View */}
        {view === 'list' && <div className="space-y-4">
            {events.map(event => renderEventCard(event))}
          </div>}
      </div>
      {/* Featured Events Carousel */}
      {renderFeaturedEvents()}
      {/* Time-based Event List */}
      {renderTimeBasedList()}
      {/* Add Event Floating Action Button */}
      <button onClick={() => setShowAddEventForm(true)} className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
        <PlusIcon className="w-6 h-6" />
      </button>
    </div>;
}
