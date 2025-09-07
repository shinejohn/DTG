import { Link, useLoaderData } from "react-router";
import React, { useState } from 'react';
import type { LoaderFunctionArgs } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

import {
  BarChart2Icon,
  TrophyIcon,
  StarIcon,
  MapPinIcon,
  UsersIcon,
  UserIcon,
  ChevronDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon,
  SearchIcon,
  TagIcon,
  ZapIcon,
  AwardIcon,
  CalendarIcon,
  CrownIcon,
  FireIcon,
  CheckCircleIcon,
  FilterIcon,
  GlobeIcon,
  RefreshCwIcon,
  CompassIcon,
  ClockIcon,
  BuildingIcon,
} from 'lucide-react'
// Types
interface LeaderboardEntry {
  userId: string
  username: string
  name: string
  avatar: string
  points: number
  reviewCount: number
  checkInCount: number
  achievementCount: number
  rank: number
  previousRank?: number
  isCurrentUser: boolean
  isFriend?: boolean
}
interface Challenge {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  category: 'points' | 'reviews' | 'check-ins' | 'achievements'
  participants: number
  leaderboard: LeaderboardEntry[]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const client = getSupabaseServerClient(request);
  
  // Fetch leaderboard data
  const { data: leaderboard } = await client
    .from('leaderboard')
    .select('*')
    .order('points', { ascending: false })
    .limit(50);
  
  // Fetch active challenges
  const { data: challenges } = await client
    .from('challenges')
    .select('*')
    .eq('is_active', true)
    .order('end_date', { ascending: false });
  
  return {
    leaderboard: leaderboard || [],
    challenges: challenges || []
  };
}
export default function Leaderboards() {
  const { leaderboard, challenges } = useLoaderData<typeof loader>();
  const [activeCategory, setActiveCategory] = useState<
    'points' | 'reviews' | 'check-ins' | 'achievements'
  >('points')
  const [timeFrame, setTimeFrame] = useState<'weekly' | 'monthly' | 'all-time'>(
    'all-time',
  )
  const [viewMode, setViewMode] = useState<'all' | 'friends'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(
    null,
  )
  // Filter leaderboard based on active filters
  const filteredLeaderboard = leaderboard
    .filter((entry) => {
      // Filter by view mode
      if (viewMode === 'friends' && !entry.isFriend && !entry.isCurrentUser) {
        return false
      }
      // Filter by search query
      if (
        searchQuery &&
        !entry.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !entry.username.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      // Sort based on active category
      switch (activeCategory) {
        case 'reviews':
          return b.reviewCount - a.reviewCount
        case 'check-ins':
          return b.checkInCount - a.checkInCount
        case 'achievements':
          return b.achievementCount - a.achievementCount
        default:
          return b.points - a.points
      }
    })
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }))
  // Get the current user's entry
  const currentUserEntry = filteredLeaderboard.find(
    (entry) => entry.isCurrentUser,
  )
  // Get the active challenge if selected
  const activeChallenge = selectedChallenge
    ? challenges.find((c) => c.id === selectedChallenge)
    : null
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'points':
        return <ZapIcon className="w-5 h-5" />
      case 'reviews':
        return <StarIcon className="w-5 h-5" />
      case 'check-ins':
        return <MapPinIcon className="w-5 h-5" />
      case 'achievements':
        return <TrophyIcon className="w-5 h-5" />
      default:
        return <BarChart2Icon className="w-5 h-5" />
    }
  }
  const getRankChangeIcon = (current: number, previous?: number) => {
    if (!previous) return null
    if (current < previous) {
      return <ArrowUpIcon className="w-4 h-4 text-green-500" />
    } else if (current > previous) {
      return <ArrowDownIcon className="w-4 h-4 text-red-500" />
    } else {
      return <MinusIcon className="w-4 h-4 text-gray-400" />
    }
  }
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
  const getTimeFrameLabel = () => {
    switch (timeFrame) {
      case 'weekly':
        return 'This Week'
      case 'monthly':
        return 'This Month'
      case 'all-time':
        return 'All Time'
      default:
        return 'All Time'
    }
  }
  const getCategoryValue = (entry: LeaderboardEntry) => {
    switch (activeCategory) {
      case 'reviews':
        return entry.reviewCount
      case 'check-ins':
        return entry.checkInCount
      case 'achievements':
        return entry.achievementCount
      default:
        return entry.points
    }
  }
  const getCategoryLabel = () => {
    switch (activeCategory) {
      case 'reviews':
        return 'Reviews'
      case 'check-ins':
        return 'Check-ins'
      case 'achievements':
        return 'Achievements'
      default:
        return 'Points'
    }
  }
  return (
    <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Leaderboards
              </h1>
              <p className="text-gray-600 mt-1">
                Compare your stats with friends and the community
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/achievements"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
              >
                <TrophyIcon className="w-5 h-5 mr-1.5" />
                View Achievements
              </Link>
            </div>
          </div>
          {/* Filters and Controls */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              {/* Category Selection */}
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={activeCategory} onChange={(e) => setActiveCategory(e.target.value as any)}
                    className="block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="points">Points</option>
                    <option value="reviews">Reviews</option>
                    <option value="check-ins">Check-ins</option>
                    <option value="achievements">Achievements</option>
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {getCategoryIcon(activeCategory)}
                  </div>
                </div>
              </div>
              {/* Time Period Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Period
                </label>
                <div className="relative">
                  <select
                    value={timeFrame} onChange={(e) => setTimeFrame(e.target.value as any)}
                    className="block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="weekly">This Week</option>
                    <option value="monthly">This Month</option>
                    <option value="all-time">All Time</option>
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
              {/* View Mode Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  View
                </label>
                <div className="flex rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => setViewMode('all')} className={`relative inline-flex items-center px-4 py-2 rounded-l-md border ${
                      viewMode === 'all'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-700'
                    } text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  >
                    <GlobeIcon className="w-4 h-4 mr-1.5" />
                    Everyone
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('friends')} className={`relative inline-flex items-center px-4 py-2 rounded-r-md border ${
                      viewMode === 'friends'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-700'
                    } text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  >
                    <UsersIcon className="w-4 h-4 mr-1.5" />
                    Friends
                  </button>
                </div>
              </div>
              {/* Search */}
              <div className="flex-grow md:max-w-xs">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search users..."
                  />
                  {searchQuery && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Clear</span>
                        <XIcon className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main Leaderboard */}
            <div className="md:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 text-blue-600">
                      {getCategoryIcon(activeCategory)}
                    </div>
                    <h2 className="font-bold text-gray-900">
                      {getCategoryLabel()} Leaderboard - {getTimeFrameLabel()}
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setActiveCategory('points')
                      setTimeFrame('all-time')
                      setViewMode('all')
                      setSearchQuery('')
                      setSelectedChallenge(null)
                    } }
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <RefreshCwIcon className="w-4 h-4 mr-1" />
                    Reset
                  </button>
                </div>
                {/* Leaderboard Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Rank
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          User
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {getCategoryLabel()}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredLeaderboard.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-6 py-12 text-center">
                            <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-gray-700 mb-1">
                              No results found
                            </h3>
                            <p className="text-gray-500">
                              Try adjusting your filters or search query
                            </p>
                          </td>
                        </tr>
                      ) : (
                        filteredLeaderboard.map((entry) => (
                          <tr
                            key={entry.userId} className={`${entry.isCurrentUser ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <span
                                  className={`text-lg font-bold ${entry.rank <= 3 ? 'text-amber-500' : 'text-gray-700'} `}
                                >
                                  {entry.rank}
                                </span>
                                {entry.previousRank && (
                                  <span className="ml-2">
                                    {getRankChangeIcon(
                                      entry.rank,
                                      entry.previousRank,
                                    )}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 relative">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={entry.avatar} alt={entry.name}
                                  />
                                  {entry.isFriend && !entry.isCurrentUser && (
                                    <div className="absolute -bottom-1 -right-1 bg-blue-100 rounded-full p-0.5">
                                      <UsersIcon className="w-3.5 h-3.5 text-blue-600" />
                                    </div>
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 flex items-center">
                                    {entry.name} {entry.isCurrentUser && (
                                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                        You
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    @{entry.username}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="text-lg font-semibold text-gray-900">
                                {getCategoryValue(entry).toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500">
                                {activeCategory === 'points'
                                  ? 'total points'
                                  : 'total'}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Pagination or Load More - simplified for demo */}
                <div className="bg-gray-50 px-6 py-3 flex justify-center">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Load more
                  </button>
                </div>
              </div>
            </div>
            {/* Sidebar */}
            <div className="md:w-1/3 space-y-6">
              {/* Personal Stats */} {currentUserEntry && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 border-b">
                    <h2 className="font-bold text-gray-900">Your Stats</h2>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-4">
                      <img
                        src={currentUserEntry.avatar} alt={currentUserEntry.name}
                        className="w-16 h-16 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {currentUserEntry.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <CrownIcon className="w-4 h-4 text-amber-500 mr-1" />
                          Rank #{currentUserEntry.rank} {getTimeFrameLabel()}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <ZapIcon className="w-4 h-4 text-blue-500 mr-1" />
                          Points
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          {currentUserEntry.points.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
                          Reviews
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          {currentUserEntry.reviewCount}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <MapPinIcon className="w-4 h-4 text-red-500 mr-1" />
                          Check-ins
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          {currentUserEntry.checkInCount}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <TrophyIcon className="w-4 h-4 text-amber-500 mr-1" />
                          Achievements
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          {currentUserEntry.achievementCount}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Link
                        to="/rewards"
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Rewards
                      </Link>
                      <Link
                        to="/achievements"
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Achievements
                      </Link>
                    </div>
                  </div>
                </div>
              )} {/* Active Challenges */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="font-bold text-gray-900">Active Challenges</h2>
                  <Link
                    to="/challenges"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    View All
                  </Link>
                </div>
                <div>
                  {challenges.length === 0 ? (
                    <div className="p-8 text-center">
                      <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-700 mb-1">
                        No active challenges
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Check back later for new challenges
                      </p>
                      <Link
                        to="/challenges"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Browse past challenges
                      </Link>
                    </div>
                  ) : (
                    <div>
                      {/* Challenge Selection */}
                      <div className="p-4 border-b">
                        <select
                          value={selectedChallenge || ''} onChange={(e) =>
                            setSelectedChallenge(e.target.value || null)
                          }
                          className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option value="">Select a challenge</option>
                          {challenges.map((challenge) => (
                            <option key={challenge.id} value={challenge.id}>
                              {challenge.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* Challenge Details */} {activeChallenge ? (
                        <div className="p-4">
                          <div className="mb-4">
                            <h3 className="font-medium text-gray-900 text-lg">
                              {activeChallenge.title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              {activeChallenge.description}
                            </p>
                            <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                              <div className="flex items-center">
                                <CalendarIcon className="w-4 h-4 mr-1" />
                                <span>
                                  {formatDate(activeChallenge.startDate)} -{' '} {formatDate(activeChallenge.endDate)}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <UsersIcon className="w-4 h-4 mr-1" />
                                <span>
                                  {activeChallenge.participants} participants
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mb-2">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                              Challenge Leaderboard
                            </h4>
                            <div className="space-y-2">
                              {activeChallenge.leaderboard.map(
                                (entry, index) => (
                                  <div
                                    key={entry.userId} className={`flex items-center justify-between p-2 rounded-md ${entry.isCurrentUser ? 'bg-blue-50' : 'bg-gray-50'}`}
                                  >
                                    <div className="flex items-center">
                                      <div className="w-6 h-6 flex items-center justify-center font-bold text-gray-700 mr-2">
                                        {index + 1}
                                      </div>
                                      <img
                                        src={entry.avatar} alt={entry.name}
                                        className="w-8 h-8 rounded-full mr-2"
                                      />
                                      <div className="text-sm">
                                        <p className="font-medium text-gray-900 line-clamp-1">
                                          {entry.name} {entry.isCurrentUser && (
                                            <span className="ml-1 text-xs text-blue-600">
                                              (You)
                                            </span>
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-semibold text-gray-900">
                                        {activeChallenge.category === 'points'
                                          ? entry.points.toLocaleString()
                                          : activeChallenge.category ===
                                              'reviews'
                                            ? entry.reviewCount
                                            : activeChallenge.category ===
                                                'check-ins'
                                              ? entry.checkInCount
                                              : entry.achievementCount}
                                      </p>
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                          <div className="text-center mt-4">
                            <Link
                              to={`/challenges/${activeChallenge.id} `}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View full challenge details
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          Select a challenge to view details
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* Community Insights */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="font-bold text-gray-900">
                    Community Insights
                  </h2>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <BuildingIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">
                          Most Popular Business
                        </p>
                        <p className="text-gray-600 text-sm">
                          Urban Bites Café with 342 check-ins this month
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <TrophyIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">
                          Most Achieved
                        </p>
                        <p className="text-gray-600 text-sm">
                          "Weekend Warrior" completed by 78 users
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <CompassIcon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">
                          Trending Area
                        </p>
                        <p className="text-gray-600 text-sm">
                          Downtown Arts District with 127 new reviews
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}

