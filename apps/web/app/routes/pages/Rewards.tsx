import { Link } from "react-router";
import React, { useEffect, useState } from 'react';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '@/components/dtg/Header';
import { Footer } from '@/components/dtg/Footer';
import { TrophyIcon, StarIcon, TicketIcon, ChevronRightIcon, UserIcon, UsersIcon, BadgeCheckIcon, GiftIcon, HeartIcon, ClockIcon, CheckCircleIcon, ArrowUpIcon, ArrowRightIcon, MapPinIcon, ZapIcon, CalendarIcon, CrownIcon, AwardIcon, BarChart2Icon, PercentIcon, TagIcon } from 'lucide-react';
// Types
interface UserPoints {
  current: number;
  lifetime: number;
  level: number;
  nextLevelAt: number;
  rank: string;
}
interface PointTransaction {
  id: string;
  type: 'earned' | 'spent' | 'achievement' | 'referral';
  amount: number;
  description: string;
  businessName?: string;
  businessId?: string;
  date: string;
  iconType?: string;
}
interface Coupon {
  id: string;
  businessId: string;
  businessName: string;
  businessLogo?: string;
  title: string;
  description: string;
  discount: string;
  category: string;
  expiresAt: string;
  pointCost?: number;
  isExclusive?: boolean;
  isRecommended?: boolean;
}
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  total: number;
  completedAt?: string;
  pointReward: number;
}
interface UserAchievement extends Achievement {
  isCompleted: boolean;
  isNew?: boolean;
}
interface LeaderboardEntry {
  userId: string;
  username: string;
  name: string;
  avatar: string;
  points: number;
  rank: number;
  isCurrentUser: boolean;
}

export default function Rewards() {
  const [userPoints, setUserPoints] = useState<UserPoints | null>(null);
  const [transactions, setTransactions] = useState<PointTransaction[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'points' | 'achievements' | 'coupons'>('points');
  // Fetch rewards data
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use default data
    setLoading(true);
    setTimeout(() => {
      setUserPoints({
        current: 2450,
        lifetime: 12500,
        level: 4,
        nextLevelAt: 15000,
        rank: 'Gold Explorer'
      });
      setTransactions([
        { id: '1', type: 'earned', amount: 50, description: 'Review at Bella Italia', businessName: 'Bella Italia', date: '2024-01-15', iconType: 'review' },
        { id: '2', type: 'spent', amount: -200, description: 'Redeemed 10% off coupon', businessName: 'Urban Brewery', date: '2024-01-14', iconType: 'coupon' },
        { id: '3', type: 'achievement', amount: 100, description: 'First Foodie Badge', date: '2024-01-13', iconType: 'achievement' },
        { id: '4', type: 'referral', amount: 500, description: 'Friend joined Downtown Guide', date: '2024-01-12', iconType: 'referral' },
      ]);
      setCoupons([
        { id: '1', businessId: 'b1', businessName: 'Bella Italia', title: '20% Off Dinner', description: 'Valid Mon-Thu on orders over $50', discount: '20%', category: 'Restaurant', expiresAt: '2024-02-01', pointCost: 500, isExclusive: true },
        { id: '2', businessId: 'b2', businessName: 'Urban Brewery', title: 'Buy 2 Get 1 Free', description: 'On all craft beers', discount: 'BOGO', category: 'Bar', expiresAt: '2024-01-31', pointCost: 300 },
        { id: '3', businessId: 'b3', businessName: 'Sakura Sushi', title: '$10 Off Lunch', description: 'Weekday lunch specials', discount: '$10', category: 'Restaurant', expiresAt: '2024-02-15', pointCost: 200, isRecommended: true },
      ]);
      setAchievements([
        { id: '1', title: 'First Review', description: 'Write your first review', icon: 'star', progress: 1, total: 1, completedAt: '2024-01-10', pointReward: 50, isCompleted: true },
        { id: '2', title: 'Explorer', description: 'Visit 10 different businesses', icon: 'map', progress: 7, total: 10, pointReward: 200, isCompleted: false },
        { id: '3', title: 'Foodie', description: 'Review 5 restaurants', icon: 'utensils', progress: 3, total: 5, pointReward: 150, isCompleted: false },
      ]);
      setLeaderboard([
        { rank: 1, name: 'Sarah M.', points: 5420, avatar: '/api/placeholder/32/32' },
        { rank: 2, name: 'Mike R.', points: 4890, avatar: '/api/placeholder/32/32' },
        { rank: 3, name: 'Lisa K.', points: 4650, avatar: '/api/placeholder/32/32' },
      ]);
      setLoading(false);
    }, 500);
  }, []);
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading rewards...</p>
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </main>
        <Footer />
      </div>;
  }
  if (!userPoints) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Rewards Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              We couldn't find your rewards information. Please try again later.
            </p>
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>;
  }
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else if (diffInSeconds < 604800) {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    } else {
      return formatDate(dateString);
    }
  };
  const getTransactionIcon = (transaction: PointTransaction) => {
    switch (transaction.type) {
      case 'earned':
        if (transaction.iconType === 'review') {
          return <StarIcon className="w-5 h-5 text-yellow-500" />;
        } else if (transaction.iconType === 'checkin') {
          return <MapPinIcon className="w-5 h-5 text-blue-500" />;
        } else {
          return <PlusIcon className="w-5 h-5 text-green-500" />;
        }
      case 'spent':
        return <TicketIcon className="w-5 h-5 text-purple-500" />;
      case 'achievement':
        return <TrophyIcon className="w-5 h-5 text-amber-500" />;
      case 'referral':
        return <UsersIcon className="w-5 h-5 text-indigo-500" />;
      default:
        return <ZapIcon className="w-5 h-5 text-blue-500" />;
    }
  };
  const getAchievementIcon = (icon: string) => {
    switch (icon) {
      case 'star':
        return <StarIcon className="w-6 h-6 text-yellow-500" />;
      case 'camera':
        return <CameraIcon className="w-6 h-6 text-blue-500" />;
      case 'map-pin':
        return <MapPinIcon className="w-6 h-6 text-red-500" />;
      case 'heart':
        return <HeartIcon className="w-6 h-6 text-pink-500" />;
      default:
        return <BadgeCheckIcon className="w-6 h-6 text-indigo-500" />;
    }
  };
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Your Rewards
              </h1>
              <p className="text-gray-600 mt-1">
                Earn points, unlock achievements, and redeem exclusive rewards
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/deals" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                <TagIcon className="w-5 h-5 mr-1.5" />
                Browse Deals
              </Link>
            </div>
          </div>
          {/* Mobile Tab Navigation */}
          <div className="md:hidden mb-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="flex border-b">
                <button onClick={() => setActiveTab('points')} className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'points' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>
                  <ZapIcon className="w-4 h-4 inline-block mr-1" />
                  Points
                </button>
                <button onClick={() => setActiveTab('achievements')} className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'achievements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>
                  <TrophyIcon className="w-4 h-4 inline-block mr-1" />
                  Achievements
                </button>
                <button onClick={() => setActiveTab('coupons')} className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'coupons' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>
                  <TicketIcon className="w-4 h-4 inline-block mr-1" />
                  Coupons
                </button>
              </div>
            </div>
          </div>
          {/* Mobile Content based on active tab */}
          <div className="md:hidden">
            {activeTab === 'points' && <>
                {/* Points Summary Card - Mobile */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-gray-900">
                        Points Summary
                      </h2>
                      <div className="flex items-center">
                        <CrownIcon className="w-5 h-5 text-amber-500 mr-1.5" />
                        <span className="text-sm font-medium">
                          {userPoints.rank}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-gray-600 text-sm">Current Balance</p>
                        <p className="text-3xl font-bold text-blue-600">
                          {userPoints.current.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600 text-sm">Lifetime Points</p>
                        <p className="text-xl font-semibold text-gray-800">
                          {userPoints.lifetime.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-gray-600">
                          Level {userPoints.level}
                        </p>
                        <p className="text-sm text-gray-600">
                          Level {userPoints.level + 1}
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{
                      width: `${userPoints.current / userPoints.nextLevelAt * 100} %`
                    }}></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      {userPoints.nextLevelAt - userPoints.current} points until
                      Level {userPoints.level + 1}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link to="/rewards/history" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center">
                        View full points history
                        <ChevronRightIcon className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Recent Activity Feed - Mobile */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-bold text-gray-900">
                      Recent Activity
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {transactions.slice(0, 3).map(transaction => <div key={transaction.id} className="p-4">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                            {getTransactionIcon(transaction)}
                          </div>
                          <div className="ml-3 flex-grow">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-gray-900">
                                {transaction.description} {' '} {transaction.businessName && <Link to={`/business/${transaction.businessId} `} className="text-blue-600 hover:text-blue-800">
                                    {transaction.businessName}
                                  </Link>}
                              </p>
                              <span className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'} `}>
                                {transaction.amount > 0 ? '+' : ''} {transaction.amount}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-0.5">
                              {formatTimeAgo(transaction.date)}
                            </p>
                          </div>
                        </div>
                      </div>)}
                  </div>
                  <div className="p-4 bg-gray-50">
                    <Link to="/rewards/activity" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center">
                      View all activity
                      <ChevronRightIcon className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
                {/* Leaderboard Preview - Mobile */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-bold text-gray-900">
                      Leaderboard
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {leaderboard.slice(0, 3).map(entry => <div key={entry.userId} className={`p-4 ${entry.isCurrentUser ? 'bg-blue-50' : ''}`}>
                        <div className="flex items-center">
                          <div className="w-8 h-8 flex items-center justify-center font-semibold text-gray-500">
                            {entry.rank}
                          </div>
                          <img src={entry.avatar} alt={entry.name} className="w-10 h-10 rounded-full mx-2" />
                          <div className="flex-grow">
                            <p className="font-medium text-gray-900">
                              {entry.name} {entry.isCurrentUser && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                  You
                                </span>}
                            </p>
                            <p className="text-sm text-gray-500">
                              @{entry.username}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              {entry.points.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">points</p>
                          </div>
                        </div>
                      </div>)}
                  </div>
                  <div className="p-4 bg-gray-50">
                    <Link to="/rewards/leaderboard" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center">
                      View full leaderboard
                      <ChevronRightIcon className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </>} {activeTab === 'achievements' && <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-bold text-gray-900">
                    Achievements
                  </h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {achievements.map(achievement => <div key={achievement.id} className="p-4">
                      <div className="flex items-start">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${achievement.isCompleted ? 'bg-green-100' : 'bg-gray-100'} `}>
                          {getAchievementIcon(achievement.icon)}
                        </div>
                        <div className="ml-3 flex-grow">
                          <div className="flex items-center">
                            <h3 className="font-medium text-gray-900">
                              {achievement.title}
                            </h3>
                            {achievement.isNew && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                New
                              </span>}
                          </div>
                          <p className="text-sm text-gray-600 mt-0.5">
                            {achievement.description}
                          </p>
                          {achievement.isCompleted ? <div className="flex items-center mt-2 text-sm text-green-600">
                              <CheckCircleIcon className="w-4 h-4 mr-1" />
                              Completed{' '} {achievement.completedAt ? formatDate(achievement.completedAt) : ''}
                              <span className="ml-2 font-medium">
                                +{achievement.pointReward} points
                              </span>
                            </div> : <div className="mt-2">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-xs text-gray-500">
                                  Progress: {achievement.progress}/
                                  {achievement.total}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Reward: {achievement.pointReward} points
                                </p>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{
                          width: `${achievement.progress / achievement.total * 100} %`
                        }}></div>
                              </div>
                            </div>}
                        </div>
                      </div>
                    </div>)}
                </div>
                <div className="p-4 bg-gray-50">
                  <Link to="/rewards/achievements" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center">
                    View all achievements
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>} {activeTab === 'coupons' && <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-bold text-gray-900">
                    Available Rewards
                  </h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {coupons.map(coupon => <div key={coupon.id} className="p-4">
                      <div className="flex items-start">
                        {coupon.businessLogo ? <img src={coupon.businessLogo} alt={coupon.businessName} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" /> : <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <BuildingIcon className="w-6 h-6 text-gray-400" />
                          </div>}
                        <div className="ml-3 flex-grow">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">
                              {coupon.title}
                            </h3>
                            <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                              {coupon.discount}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-0.5">
                            {coupon.businessName}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-xs text-gray-500 flex items-center">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              Expires: {formatDate(coupon.expiresAt)}
                            </div>
                            {coupon.pointCost > 0 ? <span className="text-sm font-medium text-gray-700">
                                {coupon.pointCost} points
                              </span> : <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                Free
                              </span>}
                          </div>
                        </div>
                      </div>
                    </div>)}
                </div>
                <div className="p-4 bg-gray-50">
                  <Link to="/deals" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center">
                    Browse all deals
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>}
          </div>
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Points Summary Card */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900">
                      Points Summary
                    </h2>
                    <div className="flex items-center">
                      <CrownIcon className="w-5 h-5 text-amber-500 mr-1.5" />
                      <span className="text-sm font-medium">
                        {userPoints.rank}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-gray-600 text-sm">Current Balance</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {userPoints.current.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 text-sm">Lifetime Points</p>
                      <p className="text-xl font-semibold text-gray-800">
                        {userPoints.lifetime.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-gray-600">
                        Level {userPoints.level}
                      </p>
                      <p className="text-sm text-gray-600">
                        Level {userPoints.level + 1}
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{
                      width: `${userPoints.current / userPoints.nextLevelAt * 100} %`
                    }}></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    {userPoints.nextLevelAt - userPoints.current} points until
                    Level {userPoints.level + 1}
                  </p>
                </div>
                <div className="bg-gray-50 px-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/rewards/history" className="text-center text-sm font-medium text-blue-600 hover:text-blue-800">
                      Points History
                    </Link>
                    <Link to="/rewards/ways-to-earn" className="text-center text-sm font-medium text-blue-600 hover:text-blue-800">
                      Ways to Earn
                    </Link>
                  </div>
                </div>
              </div>
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="font-bold text-gray-900">Quick Actions</h2>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/deals" className="flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <TicketIcon className="w-6 h-6 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-blue-800">
                        Browse Deals
                      </span>
                    </Link>
                    <Link to="/rewards/redeem" className="flex flex-col items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                      <GiftIcon className="w-6 h-6 text-purple-600 mb-2" />
                      <span className="text-sm font-medium text-purple-800">
                        Redeem Points
                      </span>
                    </Link>
                    <Link to="/rewards/achievements" className="flex flex-col items-center p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                      <TrophyIcon className="w-6 h-6 text-amber-600 mb-2" />
                      <span className="text-sm font-medium text-amber-800">
                        Achievements
                      </span>
                    </Link>
                    <Link to="/rewards/refer" className="flex flex-col items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                      <UsersIcon className="w-6 h-6 text-green-600 mb-2" />
                      <span className="text-sm font-medium text-green-800">
                        Refer Friends
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              {/* Leaderboard Preview */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="font-bold text-gray-900">Leaderboard</h2>
                  <Link to="/rewards/leaderboard" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    View All
                  </Link>
                </div>
                <div className="divide-y divide-gray-100">
                  {leaderboard.map(entry => <div key={entry.userId} className={`p-4 ${entry.isCurrentUser ? 'bg-blue-50' : ''}`}>
                      <div className="flex items-center">
                        <div className="w-8 h-8 flex items-center justify-center font-semibold text-gray-500">
                          {entry.rank}
                        </div>
                        <img src={entry.avatar} alt={entry.name} className="w-10 h-10 rounded-full mx-2" />
                        <div className="flex-grow">
                          <p className="font-medium text-gray-900">
                            {entry.name} {entry.isCurrentUser && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                You
                              </span>}
                          </p>
                          <p className="text-sm text-gray-500">
                            @{entry.username}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {entry.points.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">points</p>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
            {/* Middle Column */}
            <div className="space-y-6">
              {/* Recent Activity Feed */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="font-bold text-gray-900">Recent Activity</h2>
                  <Link to="/rewards/activity" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    View All
                  </Link>
                </div>
                <div className="divide-y divide-gray-100">
                  {transactions.map(transaction => <div key={transaction.id} className="p-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                          {getTransactionIcon(transaction)}
                        </div>
                        <div className="ml-3 flex-grow">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900">
                              {transaction.description} {' '} {transaction.businessName && <Link to={`/business/${transaction.businessId} `} className="text-blue-600 hover:text-blue-800">
                                  {transaction.businessName}
                                </Link>}
                            </p>
                            <span className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'} `}>
                              {transaction.amount > 0 ? '+' : ''} {transaction.amount}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {formatTimeAgo(transaction.date)}
                          </p>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
              {/* Ways to Earn More */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="font-bold text-gray-900">
                    Ways to Earn More Points
                  </h2>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <StarIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">
                          Write Reviews
                        </p>
                        <p className="text-sm text-gray-600">
                          Earn 50 points for each review you write for a local
                          business
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <CameraIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">
                          Upload Photos
                        </p>
                        <p className="text-sm text-gray-600">
                          Earn 25 points for each photo you upload of a business
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <MapPinIcon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">Check In</p>
                        <p className="text-sm text-gray-600">
                          Earn 15 points each time you check in at a local
                          business
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <UsersIcon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">
                          Refer Friends
                        </p>
                        <p className="text-sm text-gray-600">
                          Earn 150 points for each friend who joins through your
                          referral
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link to="/rewards/ways-to-earn" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center">
                      View all ways to earn
                      <ChevronRightIcon className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-6">
              {/* Achievement Progress */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="font-bold text-gray-900">
                    Achievement Progress
                  </h2>
                  <Link to="/rewards/achievements" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    View All
                  </Link>
                </div>
                <div className="divide-y divide-gray-100">
                  {achievements.filter(a => a.isNew || !a.isCompleted).slice(0, 3).map(achievement => <div key={achievement.id} className="p-4">
                        <div className="flex items-start">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${achievement.isCompleted ? 'bg-green-100' : 'bg-gray-100'} `}>
                            {getAchievementIcon(achievement.icon)}
                          </div>
                          <div className="ml-3 flex-grow">
                            <div className="flex items-center">
                              <h3 className="font-medium text-gray-900">
                                {achievement.title}
                              </h3>
                              {achievement.isNew && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                  New
                                </span>}
                            </div>
                            <p className="text-sm text-gray-600 mt-0.5">
                              {achievement.description}
                            </p>
                            {achievement.isCompleted ? <div className="flex items-center mt-2 text-sm text-green-600">
                                <CheckCircleIcon className="w-4 h-4 mr-1" />
                                Completed{' '} {achievement.completedAt ? formatDate(achievement.completedAt) : ''}
                                <span className="ml-2 font-medium">
                                  +{achievement.pointReward} points
                                </span>
                              </div> : <div className="mt-2">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="text-xs text-gray-500">
                                    Progress: {achievement.progress}/
                                    {achievement.total}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Reward: {achievement.pointReward} points
                                  </p>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-blue-600 h-2 rounded-full" style={{
                            width: `${achievement.progress / achievement.total * 100} %`
                          }}></div>
                                </div>
                              </div>}
                          </div>
                        </div>
                      </div>)}
                </div>
              </div>
              {/* Available Rewards */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="font-bold text-gray-900">Available Rewards</h2>
                  <Link to="/deals" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    View All
                  </Link>
                </div>
                <div className="divide-y divide-gray-100">
                  {coupons.map(coupon => <div key={coupon.id} className="p-4">
                      <div className="flex items-start">
                        {coupon.businessLogo ? <img src={coupon.businessLogo} alt={coupon.businessName} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" /> : <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <BuildingIcon className="w-6 h-6 text-gray-400" />
                          </div>}
                        <div className="ml-3 flex-grow">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">
                              {coupon.title}
                            </h3>
                            <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                              {coupon.discount}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-0.5">
                            {coupon.businessName}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-xs text-gray-500 flex items-center">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              Expires: {formatDate(coupon.expiresAt)}
                            </div>
                            {coupon.pointCost > 0 ? <span className="text-sm font-medium text-gray-700">
                                {coupon.pointCost} points
                              </span> : <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                Free
                              </span>}
                          </div>
                          <Link to={`/deals/${coupon.id} `} className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
                            View deal
                            <ChevronRightIcon className="w-4 h-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}
function CameraIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>;
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
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>;
}
function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>;
}
