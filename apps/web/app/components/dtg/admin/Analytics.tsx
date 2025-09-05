import React, { useCallback, useState } from 'react';
import { BarChart2Icon, TrendingUpIcon, UsersIcon, BuildingIcon, MessageSquareIcon, EyeIcon, SearchIcon, MapPinIcon, CalendarIcon, RefreshCwIcon, DownloadIcon, FilterIcon, ChevronDownIcon } from 'lucide-react';
export default function Analytics() {
  const [dateRange, setDateRange] = useState('30d');
  const [showDropdown, setShowDropdown] = useState(false);
  // Safely handle date range changes with error boundary
  const handleDateRangeChange = useCallback(range => {
    try {
      setDateRange(range);
      setShowDropdown(false);
    } catch (error) {
      console.error('Error changing date range:', error);
    }
  }, []);
  // Safely toggle dropdown with error boundary
  const toggleDropdown = useCallback(() => {
    try {
      setShowDropdown(prev => !prev);
    } catch (error) {
      console.error('Error toggling dropdown:', error);
    }
  }, []);
  // Safe handler for refresh button
  const handleRefresh = useCallback(() => {
    try {
      console.log('Refreshing analytics data');
      // Actual refresh logic would go here
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  }, []);
  // Safe handler for export button
  const handleExport = useCallback(() => {
    try {
      console.log('Exporting analytics data');
      // Actual export logic would go here
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  }, []);
  return <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold">Platform Analytics</h2>
          <p className="text-sm text-gray-600">
            Overview of platform performance and user activity
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <button className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium flex items-center" onClick={toggleDropdown} type="button">
              <CalendarIcon className="w-4 h-4 mr-1" />
              {dateRange === '7d' ? 'Last 7 days' : dateRange === '30d' ? 'Last 30 days' : dateRange === '90d' ? 'Last 90 days' : 'Custom range'}
              <ChevronDownIcon className="w-4 h-4 ml-1" />
            </button>
            {showDropdown && <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleDateRangeChange('7d')}>
                  Last 7 days
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleDateRangeChange('30d')}>
                  Last 30 days
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleDateRangeChange('90d')}>
                  Last 90 days
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleDateRangeChange('custom')}>
                  Custom range
                </div>
              </div>}
          </div>
          <button className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium flex items-center" onClick={handleRefresh} type="button">
            <RefreshCwIcon className="w-4 h-4 mr-1" />
            Refresh
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium flex items-center" onClick={handleExport} type="button">
            <DownloadIcon className="w-4 h-4 mr-1" />
            Export
          </button>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Users</p>
              <h3 className="text-2xl font-bold">12,543</h3>
              <div className="flex items-center mt-1 text-sm text-green-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>+5.2% from last period</span>
              </div>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <UsersIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Active Businesses</p>
              <h3 className="text-2xl font-bold">2,187</h3>
              <div className="flex items-center mt-1 text-sm text-green-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>+3.8% from last period</span>
              </div>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <BuildingIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Reviews Posted</p>
              <h3 className="text-2xl font-bold">8,924</h3>
              <div className="flex items-center mt-1 text-sm text-green-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>+7.1% from last period</span>
              </div>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <MessageSquareIcon className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Page Views</p>
              <h3 className="text-2xl font-bold">245,789</h3>
              <div className="flex items-center mt-1 text-sm text-green-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>+12.3% from last period</span>
              </div>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <EyeIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">User Growth</h3>
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2">vs previous period</span>
              <div className="relative">
                <button className="text-gray-500 hover:text-gray-700">
                  <FilterIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center">
            {/* Placeholder for chart */}
            <div className="text-center text-gray-500">
              <BarChart2Icon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>User growth chart would be displayed here</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Business Categories</h3>
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2">Top 5 categories</span>
              <div className="relative">
                <button className="text-gray-500 hover:text-gray-700">
                  <FilterIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center">
            {/* Placeholder for chart */}
            <div className="text-center text-gray-500">
              <BarChart2Icon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>Business categories chart would be displayed here</p>
            </div>
          </div>
        </div>
      </div>
      {/* Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Top Searches</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Search Term
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Count
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <SearchIcon className="w-4 h-4 text-gray-500 mr-2" />
                      <span>restaurants</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">1,245</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center text-green-600">
                      <TrendingUpIcon className="w-4 h-4 mr-1" />
                      <span>+12%</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <SearchIcon className="w-4 h-4 text-gray-500 mr-2" />
                      <span>coffee shops</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">982</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center text-green-600">
                      <TrendingUpIcon className="w-4 h-4 mr-1" />
                      <span>+8%</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <SearchIcon className="w-4 h-4 text-gray-500 mr-2" />
                      <span>fitness</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">876</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center text-green-600">
                      <TrendingUpIcon className="w-4 h-4 mr-1" />
                      <span>+15%</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <SearchIcon className="w-4 h-4 text-gray-500 mr-2" />
                      <span>bookstores</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">654</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center text-red-600">
                      <TrendingUpIcon className="w-4 h-4 mr-1 transform rotate-180" />
                      <span>-3%</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <SearchIcon className="w-4 h-4 text-gray-500 mr-2" />
                      <span>bars</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">543</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center text-green-600">
                      <TrendingUpIcon className="w-4 h-4 mr-1" />
                      <span>+5%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Top Locations</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Businesses
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 text-gray-500 mr-2" />
                      <span>Downtown</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">487</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{
                      width: '85%'
                    }}></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 text-gray-500 mr-2" />
                      <span>Midtown</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">342</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{
                      width: '70%'
                    }}></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 text-gray-500 mr-2" />
                      <span>Riverside</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">278</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{
                      width: '60%'
                    }}></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 text-gray-500 mr-2" />
                      <span>Westside</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">216</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{
                      width: '45%'
                    }}></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 text-gray-500 mr-2" />
                      <span>Northside</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">189</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{
                      width: '35%'
                    }}></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>;
}
