import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { LayoutDashboardIcon, BuildingIcon, CalendarIcon, SettingsIcon, UsersIcon, MessageSquareIcon, ImageIcon, BellIcon, TrendingUpIcon, EyeIcon, PhoneIcon, MapPinIcon, StarIcon, ChevronRightIcon, DownloadIcon, BarChart2Icon, PieChartIcon, LineChartIcon, UserIcon, ClockIcon, HeartIcon, ArrowUpIcon, ArrowDownIcon, FilterIcon, CalendarRangeIcon, ChevronDownIcon, TagIcon, InfoIcon, FileTextIcon, DatabaseIcon, ExternalLinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
// Types
interface Business {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  logo?: string;
}
interface KeyMetric {
  label: string;
  value: number | string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}
interface TrafficData {
  date: string;
  views: number;
  calls: number;
  directions: number;
}
interface DemographicData {
  label: string;
  value: number;
  color: string;
}
interface HourlyTraffic {
  hour: string;
  traffic: number;
}
interface WeekdayTraffic {
  day: string;
  traffic: number;
}
interface ReviewTrend {
  month: string;
  avgRating: number;
  reviewCount: number;
}
interface ReviewSentiment {
  label: string;
  value: number;
  color: string;
}
interface PhotoPerformance {
  id: string;
  url: string;
  views: number;
  engagement: number;
  position: number;
}
interface CompetitorData {
  id: string;
  name: string;
  views: number;
  rating: number;
  reviewCount: number;
  responseRate: number;
  position: number;
}
// Mock data
const mockBusiness: Business = {
  id: 'b1',
  name: 'Urban Bites Café',
  category: 'Restaurants',
  subcategory: 'Café',
  logo: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FmZSUyMGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=100&q=60'
};
const mockKeyMetrics: KeyMetric[] = [{
  label: 'Profile Views',
  value: 8742,
  change: 12.5,
  trend: 'up',
  icon: <EyeIcon className="w-5 h-5 text-blue-500" />
}, {
  label: 'Phone Calls',
  value: 326,
  change: 8.2,
  trend: 'up',
  icon: <PhoneIcon className="w-5 h-5 text-green-500" />
}, {
  label: 'Direction Requests',
  value: 518,
  change: -3.7,
  trend: 'down',
  icon: <MapPinIcon className="w-5 h-5 text-purple-500" />
}, {
  label: 'Average Rating',
  value: 4.7,
  change: 0.2,
  trend: 'up',
  icon: <StarIcon className="w-5 h-5 text-yellow-500" />
}, {
  label: 'Total Reviews',
  value: 287,
  change: 15.3,
  trend: 'up',
  icon: <MessageSquareIcon className="w-5 h-5 text-orange-500" />
}, {
  label: 'Review Response Rate',
  value: '84%',
  change: 7.5,
  trend: 'up',
  icon: <MessageSquareIcon className="w-5 h-5 text-indigo-500" />
}];
const mockTrafficData: TrafficData[] = [{
  date: 'Jan',
  views: 4200,
  calls: 120,
  directions: 180
}, {
  date: 'Feb',
  views: 4800,
  calls: 140,
  directions: 210
}, {
  date: 'Mar',
  views: 5100,
  calls: 160,
  directions: 230
}, {
  date: 'Apr',
  views: 6200,
  calls: 190,
  directions: 260
}, {
  date: 'May',
  views: 6800,
  calls: 210,
  directions: 290
}, {
  date: 'Jun',
  views: 7300,
  calls: 240,
  directions: 310
}, {
  date: 'Jul',
  views: 8200,
  calls: 280,
  directions: 350
}, {
  date: 'Aug',
  views: 8700,
  calls: 320,
  directions: 380
}, {
  date: 'Sep',
  views: 7900,
  calls: 290,
  directions: 340
}, {
  date: 'Oct',
  views: 7200,
  calls: 260,
  directions: 320
}, {
  date: 'Nov',
  views: 6500,
  calls: 230,
  directions: 290
}, {
  date: 'Dec',
  views: 7800,
  calls: 270,
  directions: 330
}];
const mockDemographicData: DemographicData[] = [{
  label: '18-24',
  value: 15,
  color: '#3B82F6'
}, {
  label: '25-34',
  value: 32,
  color: '#10B981'
}, {
  label: '35-44',
  value: 28,
  color: '#F59E0B'
}, {
  label: '45-54',
  value: 14,
  color: '#6366F1'
}, {
  label: '55-64',
  value: 8,
  color: '#EC4899'
}, {
  label: '65+',
  value: 3,
  color: '#8B5CF6'
}];
const mockGenderData: DemographicData[] = [{
  label: 'Female',
  value: 58,
  color: '#EC4899'
}, {
  label: 'Male',
  value: 41,
  color: '#3B82F6'
}, {
  label: 'Other',
  value: 1,
  color: '#8B5CF6'
}];
const mockHourlyTraffic: HourlyTraffic[] = [{
  hour: '6 AM',
  traffic: 20
}, {
  hour: '7 AM',
  traffic: 45
}, {
  hour: '8 AM',
  traffic: 85
}, {
  hour: '9 AM',
  traffic: 120
}, {
  hour: '10 AM',
  traffic: 130
}, {
  hour: '11 AM',
  traffic: 170
}, {
  hour: '12 PM',
  traffic: 210
}, {
  hour: '1 PM',
  traffic: 190
}, {
  hour: '2 PM',
  traffic: 150
}, {
  hour: '3 PM',
  traffic: 110
}, {
  hour: '4 PM',
  traffic: 105
}, {
  hour: '5 PM',
  traffic: 130
}, {
  hour: '6 PM',
  traffic: 155
}, {
  hour: '7 PM',
  traffic: 140
}, {
  hour: '8 PM',
  traffic: 95
}, {
  hour: '9 PM',
  traffic: 60
}, {
  hour: '10 PM',
  traffic: 30
}];
const mockWeekdayTraffic: WeekdayTraffic[] = [{
  day: 'Mon',
  traffic: 680
}, {
  day: 'Tue',
  traffic: 720
}, {
  day: 'Wed',
  traffic: 750
}, {
  day: 'Thu',
  traffic: 820
}, {
  day: 'Fri',
  traffic: 980
}, {
  day: 'Sat',
  traffic: 1250
}, {
  day: 'Sun',
  traffic: 930
}];
const mockReviewTrends: ReviewTrend[] = [{
  month: 'Jan',
  avgRating: 4.3,
  reviewCount: 15
}, {
  month: 'Feb',
  avgRating: 4.4,
  reviewCount: 18
}, {
  month: 'Mar',
  avgRating: 4.3,
  reviewCount: 20
}, {
  month: 'Apr',
  avgRating: 4.5,
  reviewCount: 22
}, {
  month: 'May',
  avgRating: 4.6,
  reviewCount: 25
}, {
  month: 'Jun',
  avgRating: 4.7,
  reviewCount: 28
}, {
  month: 'Jul',
  avgRating: 4.8,
  reviewCount: 32
}, {
  month: 'Aug',
  avgRating: 4.7,
  reviewCount: 35
}, {
  month: 'Sep',
  avgRating: 4.7,
  reviewCount: 30
}, {
  month: 'Oct',
  avgRating: 4.8,
  reviewCount: 27
}, {
  month: 'Nov',
  avgRating: 4.7,
  reviewCount: 25
}, {
  month: 'Dec',
  avgRating: 4.7,
  reviewCount: 30
}];
const mockReviewSentiment: ReviewSentiment[] = [{
  label: 'Positive',
  value: 72,
  color: '#10B981'
}, {
  label: 'Neutral',
  value: 18,
  color: '#F59E0B'
}, {
  label: 'Negative',
  value: 10,
  color: '#EF4444'
}];
const mockPhotoPerformance: PhotoPerformance[] = [{
  id: 'p1',
  url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  views: 2845,
  engagement: 78,
  position: 1
}, {
  id: 'p2',
  url: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnJlYWtmYXN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  views: 1932,
  engagement: 65,
  position: 2
}, {
  id: 'p3',
  url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNhZmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  views: 1540,
  engagement: 59,
  position: 3
}, {
  id: 'p4',
  url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29mZmVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  views: 1320,
  engagement: 51,
  position: 4
}];
const mockCompetitorData: CompetitorData[] = [{
  id: 'c1',
  name: 'Urban Bites Café',
  views: 8742,
  rating: 4.7,
  reviewCount: 287,
  responseRate: 84,
  position: 1
}, {
  id: 'c2',
  name: 'Morning Brew Coffee',
  views: 7650,
  rating: 4.5,
  reviewCount: 245,
  responseRate: 72,
  position: 2
}, {
  id: 'c3',
  name: 'Green Plate Eatery',
  views: 6980,
  rating: 4.6,
  reviewCount: 210,
  responseRate: 65,
  position: 3
}, {
  id: 'c4',
  name: 'Downtown Bakery',
  views: 5840,
  rating: 4.8,
  reviewCount: 195,
  responseRate: 90,
  position: 4
}, {
  id: 'c5',
  name: 'The Coffee House',
  views: 5320,
  rating: 4.4,
  reviewCount: 178,
  responseRate: 60,
  position: 5
}];
// Helper function to format numbers with K/M for thousands/millions
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};
export function BusinessAnalytics() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedMetric, setSelectedMetric] = useState<'views' | 'calls' | 'directions'>('views');
  const [selectedChart, setSelectedChart] = useState<'traffic' | 'demographics' | 'hourly' | 'weekday'>('traffic');
  const [selectedReviewChart, setSelectedReviewChart] = useState<'trends' | 'sentiment'>('trends');
  // Safely change time range with error handling
  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      setTimeRange(e.target.value as any);
    } catch (err) {
      console.error('Error changing time range:', err);
    }
  };
  // Safely change selected metric with error handling
  const handleMetricChange = (metric: 'views' | 'calls' | 'directions') => {
    try {
      setSelectedMetric(metric);
    } catch (err) {
      console.error('Error changing selected metric:', err);
    }
  };
  // Safely change selected chart with error handling
  const handleChartChange = (chart: 'traffic' | 'demographics' | 'hourly' | 'weekday') => {
    try {
      setSelectedChart(chart);
    } catch (err) {
      console.error('Error changing selected chart:', err);
    }
  };
  // Safely change selected review chart with error handling
  const handleReviewChartChange = (chart: 'trends' | 'sentiment') => {
    try {
      setSelectedReviewChart(chart);
    } catch (err) {
      console.error('Error changing review chart:', err);
    }
  };
  // Fetch business data
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use the mock data
    setLoading(true);
    try {
      setTimeout(() => {
        setBusiness(mockBusiness);
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error('Error loading business data:', err);
      setLoading(false);
    }
  }, []);
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading analytics...</p>
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
                  <Link to="/business/analytics" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700">
                    <BarChart2Icon className="w-5 h-5 mr-3 text-blue-500" />
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link to="/business/events" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                    <CalendarIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Events
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
              <h1 className="text-2xl font-bold">Business Analytics</h1>
              <p className="text-gray-600">
                Analyze performance and customer insights
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={timeRange} onChange={handleTimeRangeChange}>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last 12 months</option>
                </select>
                <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
              <div className="flex gap-1">
                <button className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-50 flex items-center">
                  <FilterIcon className="w-4 h-4 mr-1" />
                  Filter
                </button>
                <button className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-50 flex items-center">
                  <CalendarRangeIcon className="w-4 h-4 mr-1" />
                  Custom Date
                </button>
                <div className="relative">
                  <button className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-50 flex items-center">
                    <DownloadIcon className="w-4 h-4 mr-1" />
                    Export
                    <ChevronDownIcon className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Key Metrics */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {mockKeyMetrics.map((metric, index) => <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {metric.icon}
                    </div>
                    <div className={`flex items-center text-sm ${metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                      {metric.trend === 'up' ? <ArrowUpIcon className="w-3 h-3 mr-1" /> : metric.trend === 'down' ? <ArrowDownIcon className="w-3 h-3 mr-1" /> : null}
                      <span>{Math.abs(metric.change)}%</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">
                    {typeof metric.value === 'number' && metric.label === 'Average Rating' ? metric.value.toFixed(1) : metric.value}
                  </h3>
                  <p className="text-sm text-gray-500">{metric.label}</p>
                </div>)}
            </div>
          </div>
          {/* Traffic Analysis */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Traffic Analysis</h2>
              <div className="flex mt-2 sm:mt-0">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button type="button" onClick={() => handleChartChange('traffic')} className={`px-4 py-2 text-sm font-medium rounded-l-md ${selectedChart === 'traffic' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}>
                    <LineChartIcon className="w-4 h-4 inline-block mr-1" />
                    Traffic
                  </button>
                  <button type="button" onClick={() => handleChartChange('demographics')} className={`px-4 py-2 text-sm font-medium ${selectedChart === 'demographics' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}>
                    <PieChartIcon className="w-4 h-4 inline-block mr-1" />
                    Demographics
                  </button>
                  <button type="button" onClick={() => handleChartChange('hourly')} className={`px-4 py-2 text-sm font-medium ${selectedChart === 'hourly' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}>
                    <ClockIcon className="w-4 h-4 inline-block mr-1" />
                    Hourly
                  </button>
                  <button type="button" onClick={() => handleChartChange('weekday')} className={`px-4 py-2 text-sm font-medium rounded-r-md ${selectedChart === 'weekday' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}>
                    <CalendarIcon className="w-4 h-4 inline-block mr-1" />
                    Weekday
                  </button>
                </div>
              </div>
            </div>
            {/* Traffic Chart */}
            {selectedChart === 'traffic' && <div>
                <div className="flex mb-4 space-x-2">
                  <button type="button" onClick={() => handleMetricChange('views')} className={`px-3 py-1 text-sm rounded-md ${selectedMetric === 'views' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Profile Views
                  </button>
                  <button type="button" onClick={() => handleMetricChange('calls')} className={`px-3 py-1 text-sm rounded-md ${selectedMetric === 'calls' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Calls
                  </button>
                  <button type="button" onClick={() => handleMetricChange('directions')} className={`px-3 py-1 text-sm rounded-md ${selectedMetric === 'directions' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Directions
                  </button>
                </div>
                <div className="h-80 relative">
                  {/* This would be a real chart in a production app */}
                  <div className="absolute inset-0 flex items-end justify-between px-2">
                    {mockTrafficData.map((data, index) => <div key={index} className="flex flex-col items-center w-1/12">
                        <div className="w-full bg-blue-500 rounded-t-md" style={{
                    height: `${data[selectedMetric] / Math.max(...mockTrafficData.map(d => d[selectedMetric])) * 220}px`
                  }}></div>
                        <div className="text-xs text-gray-600 mt-1 transform -rotate-45 origin-top-left ml-2">
                          {data.date}
                        </div>
                      </div>)}
                  </div>
                </div>
                <div className="flex justify-center mt-6 space-x-8">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">
                      {selectedMetric === 'views' ? 'Profile Views' : selectedMetric === 'calls' ? 'Phone Calls' : 'Direction Requests'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Total:</span>{' '}
                    {formatNumber(mockTrafficData.reduce((sum, data) => sum + data[selectedMetric], 0))}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Average:</span>{' '}
                    {formatNumber(Math.round(mockTrafficData.reduce((sum, data) => sum + data[selectedMetric], 0) / mockTrafficData.length))}
                  </div>
                </div>
              </div>}
            {/* Demographics Chart */}
            {selectedChart === 'demographics' && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-medium mb-4 text-center">
                    Age Distribution
                  </h3>
                  <div className="flex items-center justify-center h-64">
                    {/* This would be a real pie chart in a production app */}
                    <div className="relative w-48 h-48">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-white"></div>
                      </div>
                      {mockDemographicData.map((segment, index) => {
                    const rotation = index === 0 ? 0 : mockDemographicData.slice(0, index).reduce((sum, s) => sum + s.value, 0) * 3.6;
                    return <div key={index} className="absolute inset-0" style={{
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((rotation + segment.value * 3.6) * Math.PI / 180)}% ${50 - 50 * Math.sin((rotation + segment.value * 3.6) * Math.PI / 180)}%, ${50 + 50 * Math.cos(rotation * Math.PI / 180)}% ${50 - 50 * Math.sin(rotation * Math.PI / 180)}%)`,
                      backgroundColor: segment.color,
                      transform: 'rotate(0deg)'
                    }}></div>;
                  })}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {mockDemographicData.map((segment, index) => <div key={index} className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{
                    backgroundColor: segment.color
                  }}></div>
                        <span className="text-sm">
                          {segment.label}: {segment.value}%
                        </span>
                      </div>)}
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium mb-4 text-center">
                    Gender Distribution
                  </h3>
                  <div className="flex items-center justify-center h-64">
                    {/* This would be a real pie chart in a production app */}
                    <div className="relative w-48 h-48">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-white"></div>
                      </div>
                      {mockGenderData.map((segment, index) => {
                    const rotation = index === 0 ? 0 : mockGenderData.slice(0, index).reduce((sum, s) => sum + s.value, 0) * 3.6;
                    return <div key={index} className="absolute inset-0" style={{
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((rotation + segment.value * 3.6) * Math.PI / 180)}% ${50 - 50 * Math.sin((rotation + segment.value * 3.6) * Math.PI / 180)}%, ${50 + 50 * Math.cos(rotation * Math.PI / 180)}% ${50 - 50 * Math.sin(rotation * Math.PI / 180)}%)`,
                      backgroundColor: segment.color,
                      transform: 'rotate(0deg)'
                    }}></div>;
                  })}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {mockGenderData.map((segment, index) => <div key={index} className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{
                    backgroundColor: segment.color
                  }}></div>
                        <span className="text-sm">
                          {segment.label}: {segment.value}%
                        </span>
                      </div>)}
                  </div>
                </div>
              </div>}
            {/* Hourly Traffic Chart */}
            {selectedChart === 'hourly' && <div>
                <h3 className="text-base font-medium mb-4 text-center">
                  Hourly Traffic Distribution
                </h3>
                <div className="h-80 relative">
                  <div className="absolute inset-0 flex items-end justify-between px-2">
                    {mockHourlyTraffic.map((data, index) => <div key={index} className="flex flex-col items-center" style={{
                  width: `${100 / mockHourlyTraffic.length}%`
                }}>
                        <div className="w-full bg-blue-500 rounded-t-md" style={{
                    height: `${data.traffic / Math.max(...mockHourlyTraffic.map(d => d.traffic)) * 220}px`
                  }}></div>
                        <div className="text-xs text-gray-600 mt-1 transform -rotate-45 origin-top-left ml-2">
                          {data.hour}
                        </div>
                      </div>)}
                  </div>
                </div>
                <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div className="flex items-start">
                    <InfoIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">
                        Peak Hours Analysis
                      </h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Your business sees the most traffic between{' '}
                        <strong>11 AM - 2 PM</strong> and{' '}
                        <strong>5 PM - 7 PM</strong>. Consider increasing staff
                        during these hours or running special promotions during
                        slower periods to distribute traffic more evenly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>}
            {/* Weekday Traffic Chart */}
            {selectedChart === 'weekday' && <div>
                <h3 className="text-base font-medium mb-4 text-center">
                  Weekday Traffic Distribution
                </h3>
                <div className="h-80 relative">
                  <div className="absolute inset-0 flex items-end justify-between px-2">
                    {mockWeekdayTraffic.map((data, index) => <div key={index} className="flex flex-col items-center" style={{
                  width: `${100 / mockWeekdayTraffic.length}%`
                }}>
                        <div className="w-full bg-blue-500 rounded-t-md" style={{
                    height: `${data.traffic / Math.max(...mockWeekdayTraffic.map(d => d.traffic)) * 220}px`
                  }}></div>
                        <div className="text-sm font-medium text-gray-700 mt-2">
                          {data.day}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatNumber(data.traffic)}
                        </div>
                      </div>)}
                  </div>
                </div>
                <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div className="flex items-start">
                    <InfoIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">
                        Weekly Pattern Analysis
                      </h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Your business experiences the highest traffic on{' '}
                        <strong>Saturday</strong> and <strong>Friday</strong>,
                        with <strong>Monday</strong> and{' '}
                        <strong>Tuesday</strong> being the slowest days.
                        Consider running special promotions on slower days to
                        boost traffic.
                      </p>
                    </div>
                  </div>
                </div>
              </div>}
          </div>
          {/* Two Column Layout for Review Analytics and Photo Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Review Analytics */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex flex-wrap items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Review Analytics</h2>
                <div className="flex mt-2 sm:mt-0">
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button type="button" onClick={() => handleReviewChartChange('trends')} className={`px-4 py-2 text-sm font-medium rounded-l-md ${selectedReviewChart === 'trends' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}>
                      <LineChartIcon className="w-4 h-4 inline-block mr-1" />
                      Trends
                    </button>
                    <button type="button" onClick={() => handleReviewChartChange('sentiment')} className={`px-4 py-2 text-sm font-medium rounded-r-md ${selectedReviewChart === 'sentiment' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}>
                      <PieChartIcon className="w-4 h-4 inline-block mr-1" />
                      Sentiment
                    </button>
                  </div>
                </div>
              </div>
              {/* Review Trends Chart */}
              {selectedReviewChart === 'trends' && <div>
                  <div className="h-64 relative">
                    {/* This would be a real chart in a production app */}
                    <div className="absolute inset-0 flex items-end justify-between px-2">
                      {mockReviewTrends.map((data, index) => <div key={index} className="flex flex-col items-center w-1/12">
                          <div className="w-full bg-yellow-400 rounded-t-md" style={{
                      height: `${data.reviewCount / Math.max(...mockReviewTrends.map(d => d.reviewCount)) * 180}px`
                    }}></div>
                          <div className="text-xs text-gray-600 mt-1 transform -rotate-45 origin-top-left ml-2">
                            {data.month}
                          </div>
                        </div>)}
                    </div>
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="h-full w-full flex items-center">
                        <div className="w-full border-t border-dashed border-blue-300"></div>
                      </div>
                      <div className="absolute top-0 right-0 bottom-0 flex flex-col justify-between py-4">
                        {mockReviewTrends.map((data, index) => {
                      if (index % 3 === 0 || index === mockReviewTrends.length - 1) {
                        return <div key={index} className="flex items-center">
                                <div className="h-1 w-2 bg-blue-400 mr-1"></div>
                                <span className="text-xs text-blue-600">
                                  {data.avgRating.toFixed(1)}
                                </span>
                              </div>;
                      }
                      return null;
                    })}
                      </div>
                      <svg className="absolute inset-0 w-full h-full">
                        <path d={`M ${mockReviewTrends.map((data, index) => {
                      const x = index / (mockReviewTrends.length - 1) * 100;
                      const y = 100 - (data.avgRating - 4) / 1 * 100;
                      return `${x}% ${y}%`;
                    }).join(' L ')}`} fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                        {mockReviewTrends.map((data, index) => {
                      const x = index / (mockReviewTrends.length - 1) * 100;
                      const y = 100 - (data.avgRating - 4) / 1 * 100;
                      return <circle key={index} cx={`${x}%`} cy={`${y}%`} r="3" fill="#3B82F6" stroke="white" strokeWidth="1" />;
                    })}
                      </svg>
                    </div>
                  </div>
                  <div className="flex justify-center mt-6 space-x-8">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">
                        Review Count
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">
                        Average Rating
                      </span>
                    </div>
                  </div>
                </div>}
              {/* Review Sentiment Chart */}
              {selectedReviewChart === 'sentiment' && <div>
                  <div className="flex items-center justify-center h-64">
                    {/* This would be a real pie chart in a production app */}
                    <div className="relative w-48 h-48">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-white"></div>
                      </div>
                      {mockReviewSentiment.map((segment, index) => {
                    const rotation = index === 0 ? 0 : mockReviewSentiment.slice(0, index).reduce((sum, s) => sum + s.value, 0) * 3.6;
                    return <div key={index} className="absolute inset-0" style={{
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((rotation + segment.value * 3.6) * Math.PI / 180)}% ${50 - 50 * Math.sin((rotation + segment.value * 3.6) * Math.PI / 180)}%, ${50 + 50 * Math.cos(rotation * Math.PI / 180)}% ${50 - 50 * Math.sin(rotation * Math.PI / 180)}%)`,
                      backgroundColor: segment.color,
                      transform: 'rotate(0deg)'
                    }}></div>;
                  })}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {mockReviewSentiment.map((segment, index) => <div key={index} className="flex flex-col items-center p-2 border rounded-md">
                        <div className="w-4 h-4 rounded-full mb-1" style={{
                    backgroundColor: segment.color
                  }}></div>
                        <span className="text-sm font-medium">
                          {segment.label}
                        </span>
                        <span className="text-lg font-bold">
                          {segment.value}%
                        </span>
                      </div>)}
                  </div>
                </div>}
              <div className="mt-4 pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">
                  Common Themes in Reviews
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Great Service (45)
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Delicious Food (38)
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Cozy Atmosphere (32)
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Good Coffee (29)
                  </span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                    Slow Service (12)
                  </span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                    Limited Parking (10)
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                    Expensive (8)
                  </span>
                </div>
              </div>
            </div>
            {/* Photo Performance */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Photo Performance</h2>
                <Link to="/business/photos" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  Manage Photos
                  <ChevronRightIcon className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="space-y-4">
                {mockPhotoPerformance.map(photo => <div key={photo.id} className="flex items-center">
                    <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md mr-4">
                      <img src={photo.url} alt="Business photo" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                            #{photo.position}
                          </span>
                          <span className="text-sm font-medium">
                            Photo {photo.id}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {photo.views} views
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{
                      width: `${photo.engagement}%`
                    }}></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">
                          Engagement
                        </span>
                        <span className="text-xs font-medium">
                          {photo.engagement}%
                        </span>
                      </div>
                    </div>
                  </div>)}
              </div>
              <div className="mt-6 pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Photo Insights</h3>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-700">
                  <p>
                    Photos showing your storefront and food items perform best.
                    Consider adding more high-quality photos of your popular
                    menu items to increase engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Competitor Comparison */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Competitor Comparison</h2>
              <div className="text-sm text-gray-500">
                Based on similar businesses in your area
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reviews
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Response Rate
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockCompetitorData.map(competitor => <tr key={competitor.id} className={competitor.id === 'c1' ? 'bg-blue-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {competitor.name}
                            {competitor.id === 'c1' && <span className="ml-2 text-xs text-blue-600">
                                (You)
                              </span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatNumber(competitor.views)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-900">
                            {competitor.rating.toFixed(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {competitor.reviewCount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {competitor.responseRate}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium">
                          {competitor.position === 1 ? <span className="text-green-600">
                              #{competitor.position}
                            </span> : <span>#{competitor.position}</span>}
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-start">
                <InfoIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800">
                    Competitive Analysis
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Your business is performing well in terms of profile views
                    and ratings. Downtown Bakery has a higher rating and
                    response rate, which may be worth studying. Consider
                    improving your review response rate to match competitors.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Export Options */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Export Data</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <FileTextIcon className="w-6 h-6 text-blue-600" />
                  <DownloadIcon className="w-4 h-4 text-gray-500" />
                </div>
                <h3 className="font-medium">PDF Report</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Full analytics report with charts and insights
                </p>
              </div>
              <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <DatabaseIcon className="w-6 h-6 text-green-600" />
                  <DownloadIcon className="w-4 h-4 text-gray-500" />
                </div>
                <h3 className="font-medium">CSV Export</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Raw data export for custom analysis
                </p>
              </div>
              <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <BarChart2Icon className="w-6 h-6 text-purple-600" />
                  <ExternalLinkIcon className="w-4 h-4 text-gray-500" />
                </div>
                <h3 className="font-medium">Advanced Analytics</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Deeper insights and custom reports
                </p>
              </div>
              <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <CalendarIcon className="w-6 h-6 text-orange-600" />
                  <DownloadIcon className="w-4 h-4 text-gray-500" />
                </div>
                <h3 className="font-medium">Scheduled Reports</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Set up automatic weekly or monthly reports
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>;
}