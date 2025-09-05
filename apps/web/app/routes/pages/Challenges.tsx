import { Link } from "react-router";
import React, { useEffect, useState } from 'react';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '@/components/dtg/Header';
import Footer from '@/components/dtg/Footer';
import { TrophyIcon, CalendarIcon, MapPinIcon, StarIcon, UsersIcon, ClockIcon, CheckCircleIcon, BarChart2Icon, ShareIcon, GiftIcon, TagIcon, ZapIcon, CameraIcon, HeartIcon, CompassIcon, UserIcon, MessageSquareIcon, AwardIcon, ChevronRightIcon, CrownIcon, FilterIcon, XIcon, PlusIcon, ChevronDownIcon, TicketIcon } from 'lucide-react';
// Types
interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'local' | 'seasonal' | 'community' | 'business' | 'achievement';
  type: 'check-in' | 'review' | 'photo' | 'social' | 'exploration' | 'points';
  startDate: string;
  endDate: string;
  status: 'active' | 'available' | 'completed' | 'expired';
  progress?: number;
  total: number;
  participants: number;
  rewards: {
    points: number;
    badge?: string;
    coupon?: {
      id: string;
      businessName: string;
      description: string;
    };
  };
  business?: {
    id: string;
    name: string;
    logo?: string;
  };
  leaderboard?: {
    userId: string;
    name: string;
    avatar: string;
    progress: number;
    rank: number;
    isCurrentUser: boolean;
    isFriend?: boolean;
  }[];
  milestones?: {
    count: number;
    reward: string;
    completed: boolean;
  }[];
  joinedAt?: string;
  completedAt?: string;
  friendsParticipating?: {
    id: string;
    name: string;
    avatar: string;
    progress: number;
  }[];
}

// Upcoming challenges for calendar
const upcomingChallenges = [{
  id: 'uc1',
  title: 'Fall Harvest Tour',
  description: 'Explore seasonal offerings at local farms and markets',
  startDate: '2023-09-15T00:00:00Z',
  endDate: '2023-11-15T23:59:59Z',
  category: 'seasonal'
}, {
  id: 'uc2',
  title: 'Restaurant Week Challenge',
  description: 'Visit participating restaurants during Restaurant Week',
  startDate: '2023-09-25T00:00:00Z',
  endDate: '2023-10-02T23:59:59Z',
  category: 'community'
}, {
  id: 'uc3',
  title: 'Hidden Gems Hunter',
  description: 'Discover and review lesser-known local businesses',
  startDate: '2023-10-01T00:00:00Z',
  endDate: '2023-11-30T23:59:59Z',
  category: 'exploration'
}, {
  id: 'uc4',
  title: 'Holiday Shopping Spree',
  description: 'Support local shops during the holiday season',
  startDate: '2023-11-25T00:00:00Z',
  endDate: '2023-12-24T23:59:59Z',
  category: 'seasonal'
}];
export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'available' | 'past'>('active');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showModal, setShowModal] = useState(false);
  // Fetch challenges data
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use the mock data
    setLoading(true);
    setTimeout(() => {
      setChallenges(mockChallenges);
      setLoading(false);
    }, 500);
  }, []);
  const activeChallenges = challenges.filter(challenge => challenge.status === 'active');
  const availableChallenges = challenges.filter(challenge => challenge.status === 'available');
  const pastChallenges = challenges.filter(challenge => challenge.status === 'completed' || challenge.status === 'expired');
  const filteredChallenges = () => {
    let filtered = [];
    switch (activeTab) {
      case 'active':
        filtered = activeChallenges;
        break;
      case 'available':
        filtered = availableChallenges;
        break;
      case 'past':
        filtered = pastChallenges;
        break;
      default:
        filtered = activeChallenges;
    }
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(challenge => challenge.category === categoryFilter);
    }
    return filtered;
  };
  const handleChallengeClick = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedChallenge(null);
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    if (diffTime <= 0) return 'Ended';
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 30) {
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths} month${diffMonths > 1 ? 's' : ''} left`;
    }
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} left`;
    }
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} left`;
  };
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'local':
        return <MapPinIcon className="w-5 h-5 text-blue-500" />;
      case 'seasonal':
        return <CalendarIcon className="w-5 h-5 text-orange-500" />;
      case 'community':
        return <UsersIcon className="w-5 h-5 text-green-500" />;
      case 'business':
        return <BuildingIcon className="w-5 h-5 text-purple-500" />;
      case 'achievement':
        return <TrophyIcon className="w-5 h-5 text-amber-500" />;
      default:
        return <CompassIcon className="w-5 h-5 text-gray-500" />;
    }
  };
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'local':
        return 'Local';
      case 'seasonal':
        return 'Seasonal';
      case 'community':
        return 'Community';
      case 'business':
        return 'Business';
      case 'achievement':
        return 'Achievement';
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'check-in':
        return <MapPinIcon className="w-4 h-4" />;
      case 'review':
        return <StarIcon className="w-4 h-4" />;
      case 'photo':
        return <CameraIcon className="w-4 h-4" />;
      case 'social':
        return <MessageSquareIcon className="w-4 h-4" />;
      case 'exploration':
        return <CompassIcon className="w-4 h-4" />;
      case 'points':
        return <ZapIcon className="w-4 h-4" />;
      default:
        return <CheckCircleIcon className="w-4 h-4" />;
    }
  };
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'check-in':
        return 'Check-in';
      case 'review':
        return 'Review';
      case 'photo':
        return 'Photo';
      case 'social':
        return 'Social';
      case 'exploration':
        return 'Exploration';
      case 'points':
        return 'Points';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  const joinChallenge = (challengeId: string) => {
    // In a real app, this would send a request to join the challenge
    console.log(`Joining challenge ${challengeId}`);
    // For the demo, we'll update the local state
    setChallenges(challenges.map(challenge => challenge.id === challengeId ? {
      ...challenge,
      status: 'active',
      progress: 0,
      joinedAt: new Date().toISOString()
    } : challenge));
    // Close the modal if open
    if (showModal && selectedChallenge?.id === challengeId) {
      setSelectedChallenge({
        ...selectedChallenge,
        status: 'active',
        progress: 0,
        joinedAt: new Date().toISOString()
      });
    }
  };
  const shareChallenge = (challengeId: string) => {
    // In a real app, this would open a share dialog
    console.log(`Sharing challenge ${challengeId}`);
    // For demo purposes, we'll just show an alert
    alert('Share functionality would be implemented here!');
  };
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading challenges...</p>
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </main>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Challenges
              </h1>
              <p className="text-gray-600 mt-1">
                Complete challenges to earn rewards and compete with friends
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/leaderboards" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                <BarChart2Icon className="w-5 h-5 mr-1.5" />
                View Leaderboards
              </Link>
            </div>
          </div>
          {/* Active Challenges Summary - Only show if there are active challenges */} {activeChallenges.length > 0 && <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-4 sm:p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center">
                    <div className="w-5 h-5 text-orange-500 mr-2" />
                    Your Active Challenges
                  </h2>
                  <span className="text-sm text-gray-600">
                    {activeChallenges.length} active
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeChallenges.slice(0, 3).map(challenge => <div key={challenge.id} className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleChallengeClick(challenge)}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className="mr-3">
                            {getCategoryIcon(challenge.category)}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 line-clamp-1">
                              {challenge.title}
                            </h3>
                            <p className="text-xs text-gray-600">
                              {getTimeRemaining(challenge.endDate)}
                            </p>
                          </div>
                        </div>
                        <div className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                          {getCategoryLabel(challenge.category)}
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1 text-sm">
                          <span className="text-gray-700">Progress</span>
                          <span className="text-gray-700 font-medium">
                            {challenge.progress} / {challenge.total}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{
                      width: `${challenge.progress! / challenge.total * 100} %`
                    }}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <UsersIcon className="w-4 h-4 mr-1" />
                          <span>{challenge.participants} participants</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <ZapIcon className="w-4 h-4 mr-1 text-amber-500" />
                          <span>{challenge.rewards.points} pts</span>
                        </div>
                      </div>
                    </div>)}
                </div>
                {activeChallenges.length > 3 && <div className="mt-4 text-center">
                    <button onClick={() => setActiveTab('active')} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View all {activeChallenges.length} active challenges
                    </button>
                  </div>}
              </div>
            </div>} {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            <div className="border-b">
              <nav className="flex">
                <button onClick={() => setActiveTab('active')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'active' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <div className="w-4 h-4 inline-block mr-1" />
                  Active
                </button>
                <button onClick={() => setActiveTab('available')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'available' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <CompassIcon className="w-4 h-4 inline-block mr-1" />
                  Available
                </button>
                <button onClick={() => setActiveTab('past')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'past' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <ClockIcon className="w-4 h-4 inline-block mr-1" />
                  Past
                </button>
              </nav>
            </div>
          </div>
          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {activeTab === 'active' && 'Active Challenges'} {activeTab === 'available' && 'Available Challenges'} {activeTab === 'past' && 'Past Challenges'}
              </h2>
              <div className="flex items-center">
                <FilterIcon className="w-4 h-4 text-gray-500 mr-1" />
                <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="text-sm border-none focus:ring-0 text-gray-600 bg-transparent">
                  <option value="all">All Categories</option>
                  <option value="local">Local</option>
                  <option value="seasonal">Seasonal</option>
                  <option value="community">Community</option>
                  <option value="business">Business</option>
                  <option value="achievement">Achievement</option>
                </select>
              </div>
            </div>
          </div>
          {/* Challenge Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredChallenges().length === 0 ? <div className="col-span-full text-center py-12">
                <CompassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">
                  No challenges found
                </h3>
                <p className="text-gray-500">
                  {activeTab === 'active' ? "You haven't joined any challenges yet." : activeTab === 'available' ? 'There are no available challenges at the moment.' : "You haven't completed any challenges yet."}
                </p>
                {activeTab === 'active' && <button onClick={() => setActiveTab('available')} className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                    <PlusIcon className="w-4 h-4 mr-1.5" />
                    Find Challenges
                  </button>}
              </div> : filteredChallenges().map(challenge => <div key={challenge.id} className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]" onClick={() => handleChallengeClick(challenge)}>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100">
                          {getCategoryIcon(challenge.category)}
                        </div>
                        <div className="ml-3">
                          <h3 className="font-bold text-gray-900">
                            {challenge.title}
                          </h3>
                          <div className="flex items-center mt-0.5">
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full mr-2">
                              {getCategoryLabel(challenge.category)}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full flex items-center">
                              {getTypeIcon(challenge.type)}
                              <span className="ml-1">
                                {getTypeLabel(challenge.type)}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      {challenge.status === 'active' && <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          Active
                        </div>} {challenge.status === 'available' && <div className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                          Available
                        </div>} {challenge.status === 'completed' && <div className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                          Completed
                        </div>} {challenge.status === 'expired' && <div className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                          Expired
                        </div>}
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {challenge.description}
                    </p>
                    {(challenge.status === 'active' || challenge.status === 'completed') && challenge.progress !== undefined && <div className="mb-3">
                          <div className="flex items-center justify-between mb-1 text-xs">
                            <span className="text-gray-600">Progress</span>
                            <span className="text-gray-700 font-medium">
                              {challenge.progress} / {challenge.total}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{
                    width: `${challenge.progress / challenge.total * 100} %`
                  }}></div>
                          </div>
                        </div>}
                    <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center mr-3 mb-1">
                        <CalendarIcon className="w-3.5 h-3.5 mr-1" />
                        <span>
                          {formatDate(challenge.startDate)} -{' '} {formatDate(challenge.endDate)}
                        </span>
                      </div>
                      <div className="flex items-center mb-1">
                        <UsersIcon className="w-3.5 h-3.5 mr-1" />
                        <span>{challenge.participants} participants</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ZapIcon className="w-4 h-4 text-amber-500 mr-1" />
                        <span className="text-sm font-medium">
                          {challenge.rewards.points} points
                        </span>
                        {challenge.rewards.badge && <div className="ml-2 flex items-center">
                            <AwardIcon className="w-4 h-4 text-blue-500 mr-1" />
                            <span className="text-sm font-medium">Badge</span>
                          </div>} {challenge.rewards.coupon && <div className="ml-2 flex items-center">
                            <TicketIcon className="w-4 h-4 text-purple-500 mr-1" />
                            <span className="text-sm font-medium">Coupon</span>
                          </div>}
                      </div>
                      {challenge.status === 'active' && <span className="text-xs text-gray-500">
                          {getTimeRemaining(challenge.endDate)}
                        </span>} {challenge.status === 'available' && <button onClick={e => {
                  e.stopPropagation();
                  joinChallenge(challenge.id);
                } } className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded">
                          Join
                        </button>}
                    </div>
                  </div>
                </div>)}
          </div>
          {/* Challenge Calendar */} {activeTab === 'available' && <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-10">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="font-bold text-gray-900 flex items-center">
                  <CalendarIcon className="w-5 h-5 text-blue-600 mr-2" />
                  Upcoming Challenges
                </h2>
                <Link to="/challenges/calendar" className="text-sm text-blue-600 hover:text-blue-800">
                  View Calendar
                </Link>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {upcomingChallenges.map(challenge => <div key={challenge.id} className="flex items-start border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mr-4">
                        <CalendarIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {challenge.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                          {challenge.description}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <CalendarIcon className="w-3.5 h-3.5 mr-1" />
                          <span>
                            {formatDate(challenge.startDate)} -{' '} {formatDate(challenge.endDate)}
                          </span>
                          <span className="mx-2">•</span>
                          <div className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                            {getCategoryLabel(challenge.category)}
                          </div>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>} {/* Friend Activity */} {activeTab === 'active' && activeChallenges.length > 0 && <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-10">
              <div className="p-4 border-b">
                <h2 className="font-bold text-gray-900 flex items-center">
                  <UsersIcon className="w-5 h-5 text-blue-600 mr-2" />
                  Friends' Challenge Activity
                </h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {activeChallenges[0].friendsParticipating?.map(friend => <div key={friend.id} className="flex items-start">
                      <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full mr-3" />
                      <div className="flex-grow">
                        <p className="font-medium text-gray-900">
                          {friend.name} is participating in the Summer
                          Restaurant Tour
                        </p>
                        <div className="mt-1 flex items-center">
                          <div className="flex-grow">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{
                          width: `${friend.progress / 10 * 100} %`
                        }}></div>
                            </div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">
                            {friend.progress}/10
                          </span>
                        </div>
                      </div>
                    </div>)}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                  <Link to="/leaderboards/friends" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Compare with friends
                  </Link>
                </div>
              </div>
            </div>}
        </div>
      </main>
      {/* Challenge Detail Modal */} {showModal && selectedChallenge && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 bg-gray-100">
                    {getCategoryIcon(selectedChallenge.category)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedChallenge.title}
                    </h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full mr-2">
                        {getCategoryLabel(selectedChallenge.category)}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full flex items-center">
                        {getTypeIcon(selectedChallenge.type)}
                        <span className="ml-1">
                          {getTypeLabel(selectedChallenge.type)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-700 mb-4">
                {selectedChallenge.description}
              </p>
              {selectedChallenge.business && <div className="bg-gray-50 rounded-md p-4 mb-4">
                  <div className="flex items-center">
                    {selectedChallenge.business.logo ? <img src={selectedChallenge.business.logo} alt={selectedChallenge.business.name} className="w-10 h-10 rounded-md object-cover mr-3" /> : <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center mr-3">
                        <BuildingIcon className="w-5 h-5 text-gray-500" />
                      </div>}
                    <div>
                      <p className="font-medium text-gray-900">
                        Sponsored by {selectedChallenge.business.name}
                      </p>
                      <Link to={`/business/${selectedChallenge.business.id} `} onClick={e => e.stopPropagation()} className="text-sm text-blue-600 hover:text-blue-800">
                        View Business
                      </Link>
                    </div>
                  </div>
                </div>} {selectedChallenge.status === 'active' && selectedChallenge.progress !== undefined && <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Progress: {selectedChallenge.progress}/
                        {selectedChallenge.total}
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {Math.round(selectedChallenge.progress / selectedChallenge.total * 100)}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{
                width: `${selectedChallenge.progress / selectedChallenge.total * 100} %`
              }}></div>
                    </div>
                    {selectedChallenge.milestones && <div className="mt-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Milestones:
                        </h4>
                        <div className="space-y-2">
                          {selectedChallenge.milestones.map((milestone, index) => <div key={index} className={`flex items-center p-2 rounded-md ${milestone.completed ? 'bg-green-50' : 'bg-gray-50'}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${milestone.completed ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'} `}>
                                  {milestone.completed ? <CheckCircleIcon className="w-4 h-4" /> : <span className="text-xs font-medium">
                                      {milestone.count}
                                    </span>}
                                </div>
                                <div className="flex-grow">
                                  <p className={`text-sm ${milestone.completed ? 'text-green-700' : 'text-gray-700'} `}>
                                    {milestone.completed ? 'Completed: ' : ''} {milestone.count} {' '} {selectedChallenge.type === 'check-in' ? 'check-ins' : selectedChallenge.type + 's'}
                                  </p>
                                </div>
                                <div className={`text-sm font-medium ${milestone.completed ? 'text-green-700' : 'text-gray-700'} `}>
                                  {milestone.reward}
                                </div>
                              </div>)}
                        </div>
                      </div>}
                  </div>}
              <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-4">
                <div className="flex items-center text-blue-700 mb-2">
                  <GiftIcon className="w-5 h-5 mr-2" />
                  <span className="font-medium">Rewards</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <ZapIcon className="w-4 h-4 text-amber-500 mr-2" />
                    <span className="text-blue-700">
                      {selectedChallenge.rewards.points} points
                    </span>
                  </div>
                  {selectedChallenge.rewards.badge && <div className="flex items-center">
                      <AwardIcon className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-blue-700">Special Badge</span>
                    </div>} {selectedChallenge.rewards.coupon && <div className="flex items-center">
                      <TicketIcon className="w-4 h-4 text-purple-500 mr-2" />
                      <span className="text-blue-700">
                        {selectedChallenge.rewards.coupon.description} at{' '} {selectedChallenge.rewards.coupon.businessName}
                      </span>
                    </div>}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  <span>
                    {formatDate(selectedChallenge.startDate)} -{' '} {formatDate(selectedChallenge.endDate)}
                  </span>
                </div>
                <div className="flex items-center">
                  <UsersIcon className="w-4 h-4 mr-1" />
                  <span>{selectedChallenge.participants} participants</span>
                </div>
              </div>
              {selectedChallenge.status === 'active' && <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4 mb-4">
                  <div className="flex items-center text-yellow-700">
                    <ClockIcon className="w-5 h-5 mr-2" />
                    <span>
                      Time Remaining:{' '} {getTimeRemaining(selectedChallenge.endDate)}
                    </span>
                  </div>
                </div>} {selectedChallenge.status === 'completed' && <div className="bg-green-50 border border-green-100 rounded-md p-4 mb-4">
                  <div className="flex items-center text-green-700">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    <span className="font-medium">Challenge Completed!</span>
                  </div>
                  {selectedChallenge.completedAt && <p className="text-green-600 text-sm mt-1">
                      Completed on {formatDate(selectedChallenge.completedAt)}
                    </p>}
                </div>} {selectedChallenge.status === 'expired' && <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
                  <div className="flex items-center text-gray-700">
                    <ClockIcon className="w-5 h-5 mr-2" />
                    <span className="font-medium">Challenge Expired</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    This challenge ended on{' '} {formatDate(selectedChallenge.endDate)}
                  </p>
                </div>} {selectedChallenge.leaderboard && selectedChallenge.leaderboard.length > 0 && <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Challenge Leaderboard:
                    </h4>
                    <div className="bg-gray-50 rounded-md p-2">
                      <div className="space-y-2">
                        {selectedChallenge.leaderboard.map(entry => <div key={entry.userId} className={`flex items-center justify-between p-2 rounded-md ${entry.isCurrentUser ? 'bg-blue-50' : 'bg-white'}`}>
                            <div className="flex items-center">
                              <div className="w-6 h-6 flex items-center justify-center font-bold text-gray-700 mr-2">
                                {entry.rank}
                              </div>
                              <img src={entry.avatar} alt={entry.name} className="w-8 h-8 rounded-full mr-2" />
                              <div className="text-sm">
                                <p className="font-medium text-gray-900">
                                  {entry.name} {entry.isCurrentUser && <span className="ml-1 text-xs text-blue-600">
                                      (You)
                                    </span>}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">
                                {entry.progress}/{selectedChallenge.total}
                              </p>
                            </div>
                          </div>)}
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-200 text-center">
                        <Link to="/leaderboards" onClick={e => e.stopPropagation()} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View full leaderboard
                        </Link>
                      </div>
                    </div>
                  </div>}
              <div className="flex flex-wrap gap-2 mt-6">
                {selectedChallenge.status === 'available' && <button onClick={() => joinChallenge(selectedChallenge.id)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Join Challenge
                  </button>}
                <button onClick={() => shareChallenge(selectedChallenge.id)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center">
                  <ShareIcon className="w-4 h-4 mr-1.5" />
                  Share
                </button>
                {selectedChallenge.status === 'active' && <Link to={`/challenges/${selectedChallenge.id} `} onClick={e => e.stopPropagation()} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center">
                    <BarChart2Icon className="w-4 h-4 mr-1.5" />
                    Track Progress
                  </Link>}
              </div>
            </div>
          </div>
        </div>}
      <Footer />
    </div>;
}
function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    </svg>;
}
