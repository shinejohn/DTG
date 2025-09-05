import type { Route } from './+types/route';
import React, { useEffect, useState } from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '../../../components/dtg/Header';
import { Footer } from '../../../components/dtg/Footer';
import { LayoutDashboardIcon, BuildingIcon, TagIcon, BarChart2Icon, UsersIcon, SettingsIcon, StarIcon, GiftIcon, CrownIcon, PercentIcon, TrendingUpIcon, TrendingDownIcon, RefreshCwIcon, DollarSignIcon, UserPlusIcon, ChevronDownIcon, ChevronRightIcon, CreditCardIcon, CoffeeIcon, ShoppingBagIcon, ZapIcon, ClipboardIcon, XIcon, CheckIcon, PlusIcon, MinusIcon, EditIcon, AlertTriangleIcon, InfoIcon, ClockIcon, UserIcon, CalendarIcon, SearchIcon, FilterIcon, SlidersIcon, ArrowUpIcon, ArrowDownIcon, ArrowRightIcon, BellIcon, HeartIcon, CheckCircleIcon, CakeIcon, AwardIcon, LayersIcon, PenToolIcon, ShieldIcon, MessageSquareIcon, WifiIcon, UploadIcon } from 'lucide-react';
// Types
interface LoyaltyProgram {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  pointsSettings: {
    pointsPerDollar: number;
    minimumPointsRedemption: number;
    pointsValueInCents: number;
    expirationPeriodDays: number | null;
    roundingRule: 'up' | 'down' | 'nearest';
  };
  tiers: LoyaltyTier[];
  rewards: LoyaltyReward[];
  joinBonus: number;
  referralBonus: {
    referrer: number;
    referee: number;
  };
  birthdayBonus: number;
  createdAt: string;
  lastModified: string;
  stats: {
    totalMembers: number;
    activeMembers: number;
    totalPointsIssued: number;
    totalPointsRedeemed: number;
    averagePointsPerMember: number;
    redemptionRate: number;
  };
}
interface LoyaltyTier {
  id: string;
  name: string;
  threshold: number;
  benefits: string[];
  color: string;
  icon: string;
  multiplier: number;
}
interface LoyaltyReward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  type: 'discount' | 'free_item' | 'experience' | 'gift_card';
  value: number | string;
  image?: string;
  restrictions?: string[];
  availability: 'always' | 'limited';
  quantityAvailable?: number;
  quantityRedeemed: number;
  tierRestriction?: string[];
  isActive: boolean;
  createdAt: string;
}
interface LoyaltyMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  pointsBalance: number;
  lifetimePoints: number;
  tier: string;
  joinDate: string;
  lastActive: string;
  totalSpent: number;
  visitsCount: number;
  birthdayMonth?: number;
  birthdayDay?: number;
  rewardHistory: {
    id: string;
    rewardId: string;
    rewardName: string;
    pointsSpent: number;
    date: string;
  }[];
  pointsHistory: {
    id: string;
    amount: number;
    type: 'earn' | 'redeem' | 'expire' | 'adjust';
    description: string;
    date: string;
  }[];
}
interface PointsActivity {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  type: 'earn' | 'redeem' | 'expire' | 'adjust';
  description: string;
  date: string;
  orderId?: string;
  rewardId?: string;
  adjustedBy?: string;
}

export default function BusinessLoyalty() {
  const [loyaltyProgram, setLoyaltyProgram] = useState<LoyaltyProgram | null>(null);
  const [members, setMembers] = useState<LoyaltyMember[]>([]);
  const [pointsActivity, setPointsActivity] = useState<PointsActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'rewards' | 'members' | 'settings'>('overview');
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showAdjustPointsModal, setShowAdjustPointsModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<LoyaltyMember | null>(null);
  const [selectedReward, setSelectedReward] = useState<LoyaltyReward | null>(null);
  const [isEditingProgram, setIsEditingProgram] = useState(false);
  const [isAddingReward, setIsAddingReward] = useState(false);
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [memberFilter, setMemberFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [memberSort, setMemberSort] = useState<'name' | 'points' | 'tier' | 'recent'>('recent');
  const [pointsToAdjust, setPointsToAdjust] = useState<number>(0);
  const [adjustmentReason, setAdjustmentReason] = useState<string>('');
  // Fetch data
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use the mock data
    setLoading(true);
    setTimeout(() => {
      setLoyaltyProgram(mockLoyaltyProgram);
      setMembers(mockLoyaltyMembers);
      setPointsActivity(mockPointsActivity);
      setLoading(false);
    }, 500);
  }, []);
  // Filter and sort members
  const filteredMembers = members.filter(member => {
    // Filter by search query
    if (memberSearchQuery) {
      const query = memberSearchQuery.toLowerCase();
      return member.name.toLowerCase().includes(query) || member.email.toLowerCase().includes(query) || member.phone && member.phone.includes(query);
    }
    // Filter by activity status
    if (memberFilter === 'active') {
      const lastActiveDate = new Date(member.lastActive);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return lastActiveDate >= thirtyDaysAgo;
    }
    if (memberFilter === 'inactive') {
      const lastActiveDate = new Date(member.lastActive);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return lastActiveDate < thirtyDaysAgo;
    }
    return true;
  });
  // Sort members
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    switch (memberSort) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'points':
        return b.pointsBalance - a.pointsBalance;
      case 'tier':
        const tierOrder: Record<string, number> = {
          Bronze: 1,
          Silver: 2,
          Gold: 3
        };
        return tierOrder[b.tier] - tierOrder[a.tier];
      case 'recent':
        return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
      default:
        return 0;
    }
  });
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  // Format date with time
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };
  // Get days since last active
  const getDaysSinceLastActive = (lastActiveDate: string) => {
    const lastActive = new Date(lastActiveDate);
    const now = new Date();
    const diffTime = now.getTime() - lastActive.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  // Handle point adjustment
  const handleAdjustPoints = () => {
    if (!selectedMember || pointsToAdjust === 0 || !adjustmentReason.trim()) return;
    // In a real app, this would send a request to the API
    // For now, we'll update the local state
    // Update member's points
    setMembers(prev => prev.map(member => member.id === selectedMember.id ? {
      ...member,
      pointsBalance: member.pointsBalance + pointsToAdjust,
      pointsHistory: [{
        id: `ph${Math.random().toString(36).substr(2, 9)}`,
        amount: Math.abs(pointsToAdjust),
        type: pointsToAdjust > 0 ? 'earn' : 'adjust',
        description: adjustmentReason,
        date: new Date().toISOString()
      }, ...member.pointsHistory]
    } : member));
    // Add to points activity
    const newActivity: PointsActivity = {
      id: `pa${Math.random().toString(36).substr(2, 9)}`,
      memberId: selectedMember.id,
      memberName: selectedMember.name,
      amount: Math.abs(pointsToAdjust),
      type: pointsToAdjust > 0 ? 'earn' : 'adjust',
      description: adjustmentReason,
      date: new Date().toISOString(),
      adjustedBy: 'Admin'
    };
    setPointsActivity(prev => [newActivity, ...prev]);
    // Reset form and close modal
    setPointsToAdjust(0);
    setAdjustmentReason('');
    setShowAdjustPointsModal(false);
  };
  // Toggle reward active status
  const toggleRewardStatus = (rewardId: string) => {
    if (!loyaltyProgram) return;
    // Update reward status
    setLoyaltyProgram({
      ...loyaltyProgram,
      rewards: loyaltyProgram.rewards.map(reward => reward.id === rewardId ? {
        ...reward,
        isActive: !reward.isActive
      } : reward)
    });
  };
  // Get tier color class
  const getTierColorClass = (tier: string) => {
    if (!loyaltyProgram) return 'bg-gray-100 text-gray-800';
    const tierObj = loyaltyProgram.tiers.find(t => t.name === tier);
    if (!tierObj) return 'bg-gray-100 text-gray-800';
    switch (tier) {
      case 'Bronze':
        return 'bg-amber-100 text-amber-800';
      case 'Silver':
        return 'bg-gray-100 text-gray-800';
      case 'Gold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  // Get tier icon
  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Bronze':
        return <StarIcon className="w-4 h-4 text-amber-800" />;
      case 'Silver':
        return <AwardIcon className="w-4 h-4 text-gray-600" />;
      case 'Gold':
        return <CrownIcon className="w-4 h-4 text-yellow-600" />;
      default:
        return <StarIcon className="w-4 h-4 text-gray-600" />;
    }
  };
  // Calculate members by tier
  const membersByTier = loyaltyProgram?.tiers.map(tier => {
    return {
      name: tier.name,
      count: members.filter(member => member.tier === tier.name).length
    };
  }) || [];
  // Calculate upcoming birthdays (next 30 days)
  const upcomingBirthdays = members.filter(member => member.birthdayMonth !== undefined && member.birthdayDay !== undefined).filter(member => {
    if (!member.birthdayMonth || !member.birthdayDay) return false;
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // JavaScript months are 0-indexed
    const currentDay = today.getDate();
    // Check if birthday is within the next 30 days
    const birthdayThisYear = new Date(today.getFullYear(), member.birthdayMonth - 1, member.birthdayDay);
    // If birthday already passed this year, check for next year
    if (birthdayThisYear < today) {
      birthdayThisYear.setFullYear(birthdayThisYear.getFullYear() + 1);
    }
    const diffTime = birthdayThisYear.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  }).sort((a, b) => {
    if (!a.birthdayMonth || !a.birthdayDay || !b.birthdayMonth || !b.birthdayDay) return 0;
    const today = new Date();
    const aDate = new Date(today.getFullYear(), a.birthdayMonth - 1, a.birthdayDay);
    const bDate = new Date(today.getFullYear(), b.birthdayMonth - 1, b.birthdayDay);
    // If date already passed this year, use next year's date
    if (aDate < today) aDate.setFullYear(aDate.getFullYear() + 1);
    if (bDate < today) bDate.setFullYear(bDate.getFullYear() + 1);
    return aDate.getTime() - bDate.getTime();
  });
  // Get reward type icon
  const getRewardTypeIcon = (type: string) => {
    switch (type) {
      case 'discount':
        return <PercentIcon className="w-4 h-4" />;
      case 'free_item':
        return <CoffeeIcon className="w-4 h-4" />;
      case 'experience':
        return <AwardIcon className="w-4 h-4" />;
      case 'gift_card':
        return <CreditCardIcon className="w-4 h-4" />;
      default:
        return <GiftIcon className="w-4 h-4" />;
    }
  };
  // Recent activity (last 10 items)
  const recentActivity = pointsActivity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading loyalty program...</p>
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </main>
        <Footer />
      </div>;
  }
  if (!loyaltyProgram) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <GiftIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Loyalty Program Found
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't set up a loyalty program yet. Create one to start
              rewarding your customers and building loyalty.
            </p>
            <button onClick={() => {
            setIsEditingProgram(true);
            setActiveTab('settings');
          } } className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
              <PlusIcon className="w-5 h-5 mr-2" />
              Create Loyalty Program
            </button>
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
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <BuildingIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">Urban Bites Café</h2>
                <div className="text-xs text-gray-500">Business Dashboard</div>
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
                  <Link to="/business/coupons" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                    <PercentIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Coupons
                  </Link>
                </li>
                <li>
                  <Link to="/business/loyalty" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700">
                    <GiftIcon className="w-5 h-5 mr-3 text-blue-500" />
                    Loyalty Program
                  </Link>
                </li>
                <li>
                  <Link to="/business/insights" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                    <BarChart2Icon className="w-5 h-5 mr-3 text-gray-500" />
                    Insights
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
              </ul>
            </div>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-grow p-4 md:p-6">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold">{loyaltyProgram.name}</h1>
                <div className="flex items-center">
                  <p className="text-gray-600">{loyaltyProgram.description}</p>
                  <span className={`ml-3 text-xs px-2 py-0.5 rounded-full ${loyaltyProgram.status === 'active' ? 'bg-green-100 text-green-800' : loyaltyProgram.status === 'inactive' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'} `}>
                    {loyaltyProgram.status.charAt(0).toUpperCase() + loyaltyProgram.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <button onClick={() => {
                setIsEditingProgram(true);
                setActiveTab('settings');
              } } className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                  <EditIcon className="w-5 h-5 mr-2" />
                  Edit Program
                </button>
              </div>
            </div>
          </div>
          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            <div className="border-b">
              <nav className="flex">
                <button onClick={() => setActiveTab('overview')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <LayoutDashboardIcon className="w-4 h-4 inline-block mr-1" />
                  Overview
                </button>
                <button onClick={() => setActiveTab('rewards')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'rewards' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <GiftIcon className="w-4 h-4 inline-block mr-1" />
                  Rewards
                </button>
                <button onClick={() => setActiveTab('members')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'members' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <UsersIcon className="w-4 h-4 inline-block mr-1" />
                  Members
                </button>
                <button onClick={() => setActiveTab('settings')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <SettingsIcon className="w-4 h-4 inline-block mr-1" />
                  Settings
                </button>
              </nav>
            </div>
          </div>
          {/* Overview Tab */} {activeTab === 'overview' && <div>
              {/* Program Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Members</p>
                      <h3 className="text-2xl font-bold mt-1">
                        {loyaltyProgram.stats.totalMembers}
                      </h3>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <UsersIcon className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-green-600">
                    <TrendingUpIcon className="w-4 h-4 mr-1" />
                    <span>+12% this month</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Active Members</p>
                      <h3 className="text-2xl font-bold mt-1">
                        {loyaltyProgram.stats.activeMembers}
                      </h3>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <UserIcon className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <span>
                      {Math.round(loyaltyProgram.stats.activeMembers / loyaltyProgram.stats.totalMembers * 100)}
                      % of total
                    </span>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Points Issued</p>
                      <h3 className="text-2xl font-bold mt-1">
                        {loyaltyProgram.stats.totalPointsIssued.toLocaleString()}
                      </h3>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <ZapIcon className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <span>
                      Avg. {loyaltyProgram.stats.averagePointsPerMember} per
                      member
                    </span>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Redemption Rate</p>
                      <h3 className="text-2xl font-bold mt-1">
                        {(loyaltyProgram.stats.redemptionRate * 100).toFixed(1)}
                        %
                      </h3>
                    </div>
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <RefreshCwIcon className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <span>
                      {loyaltyProgram.stats.totalPointsRedeemed.toLocaleString()} {' '}
                      points redeemed
                    </span>
                  </div>
                </div>
              </div>
              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Points Activity */}
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4 border-b flex items-center justify-between">
                      <h2 className="font-bold text-gray-900">
                        Recent Points Activity
                      </h2>
                      <Link to="/business/loyalty/activity" className="text-sm text-blue-600 hover:text-blue-800">
                        View All
                      </Link>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Member
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Activity
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Points
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {recentActivity.map(activity => <tr key={activity.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {activity.memberName}
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {activity.description}
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${activity.type === 'earn' ? 'bg-green-100 text-green-800' : activity.type === 'redeem' ? 'bg-blue-100 text-blue-800' : activity.type === 'expire' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'} `}>
                                  {activity.type === 'earn' && '+'} {activity.type === 'redeem' && '-'} {activity.amount}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {formatDateTime(activity.date)}
                              </td>
                            </tr>)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* Popular Rewards */}
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4 border-b flex items-center justify-between">
                      <h2 className="font-bold text-gray-900">
                        Popular Rewards
                      </h2>
                      <button onClick={() => setActiveTab('rewards')} className="text-sm text-blue-600 hover:text-blue-800">
                        Manage Rewards
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {loyaltyProgram.rewards.sort((a, b) => b.quantityRedeemed - a.quantityRedeemed).slice(0, 4).map(reward => <div key={reward.id} className="border rounded-lg overflow-hidden flex">
                              <div className="w-20 h-20 flex-shrink-0">
                                <img src={reward.image || 'https://via.placeholder.com/80'} alt={reward.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="p-3 flex-grow">
                                <h3 className="font-medium text-gray-900">
                                  {reward.name}
                                </h3>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                  <ZapIcon className="w-4 h-4 mr-1 text-amber-500" />
                                  <span>{reward.pointsCost} points</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                  <RefreshCwIcon className="w-4 h-4 mr-1" />
                                  <span>
                                    {reward.quantityRedeemed} redeemed
                                  </span>
                                </div>
                              </div>
                            </div>)}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Membership Tiers */}
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4 border-b">
                      <h2 className="font-bold text-gray-900">
                        Membership Tiers
                      </h2>
                    </div>
                    <div className="p-4">
                      {membersByTier.map(tier => <div key={tier.name} className="mb-4 last:mb-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center">
                              {getTierIcon(tier.name)}
                              <span className="ml-2 font-medium">
                                {tier.name}
                              </span>
                            </div>
                            <span className="text-sm text-gray-600">
                              {tier.count} members
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className={`h-2.5 rounded-full ${tier.name === 'Bronze' ? 'bg-amber-500' : tier.name === 'Silver' ? 'bg-gray-400' : 'bg-yellow-500'} `} style={{
                        width: `${tier.count / loyaltyProgram.stats.totalMembers * 100}%`
                      }}></div>
                          </div>
                        </div>)}
                      <div className="mt-4 pt-4 border-t">
                        <button onClick={() => {
                      setIsEditingProgram(true);
                      setActiveTab('settings');
                    } } className="text-sm text-blue-600 hover:text-blue-800">
                          Edit Tier Structure
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Upcoming Birthdays */} {upcomingBirthdays.length > 0 && <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="p-4 border-b flex items-center">
                        <CakeIcon className="w-5 h-5 text-pink-500 mr-2" />
                        <h2 className="font-bold text-gray-900">
                          Upcoming Birthdays
                        </h2>
                      </div>
                      <div className="p-4">
                        <div className="space-y-3">
                          {upcomingBirthdays.slice(0, 5).map(member => <div key={member.id} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                  <UserIcon className="w-4 h-4 text-gray-600" />
                                </div>
                                <div className="ml-2">
                                  <div className="text-sm font-medium">
                                    {member.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {member.birthdayMonth && member.birthdayDay && new Date(new Date().getFullYear(), member.birthdayMonth - 1, member.birthdayDay).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                                  </div>
                                </div>
                              </div>
                              <button onClick={() => {
                        setSelectedMember(member);
                        setPointsToAdjust(loyaltyProgram.birthdayBonus);
                        setAdjustmentReason('Birthday bonus');
                        setShowAdjustPointsModal(true);
                      } } className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-md">
                                Send Bonus
                              </button>
                            </div>)}
                        </div>
                        {upcomingBirthdays.length > 5 && <div className="mt-3 text-center">
                            <button onClick={() => setActiveTab('members')} className="text-sm text-blue-600 hover:text-blue-800">
                              View All ({upcomingBirthdays.length})
                            </button>
                          </div>}
                      </div>
                    </div>} {/* Quick Actions */}
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4 border-b">
                      <h2 className="font-bold text-gray-900">Quick Actions</h2>
                    </div>
                    <div className="p-4">
                      <div className="space-y-2">
                        <button onClick={() => {
                      setIsAddingReward(true);
                      setActiveTab('rewards');
                    } } className="w-full flex items-center p-2 rounded-md hover:bg-gray-50 text-left">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <GiftIcon className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              Add New Reward
                            </div>
                            <div className="text-xs text-gray-500">
                              Create a new redemption option
                            </div>
                          </div>
                        </button>
                        <button onClick={() => setActiveTab('members')} className="w-full flex items-center p-2 rounded-md hover:bg-gray-50 text-left">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <UserPlusIcon className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              Manage Members
                            </div>
                            <div className="text-xs text-gray-500">
                              View and edit member information
                            </div>
                          </div>
                        </button>
                        <button onClick={() => setActiveTab('settings')} className="w-full flex items-center p-2 rounded-md hover:bg-gray-50 text-left">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                            <SettingsIcon className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              Program Settings
                            </div>
                            <div className="text-xs text-gray-500">
                              Adjust points values and rules
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>} {/* Rewards Tab */} {activeTab === 'rewards' && <div>
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">Rewards Catalog</h2>
                    <p className="text-sm text-gray-600">
                      Manage the rewards that members can redeem with their
                      points
                    </p>
                  </div>
                  <button onClick={() => setIsAddingReward(true)} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                    <PlusIcon className="w-4 h-4 mr-1.5" />
                    Add New Reward
                  </button>
                </div>
              </div>
              {/* Rewards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {loyaltyProgram.rewards.map(reward => <div key={reward.id} className={`bg-white rounded-lg shadow-sm overflow-hidden border ${!reward.isActive ? 'border-gray-200 opacity-75' : 'border-transparent'}`}>
                    <div className="h-40 overflow-hidden relative">
                      <img src={reward.image || 'https://via.placeholder.com/400x150'} alt={reward.name} className="w-full h-full object-cover" />
                      {!reward.isActive && <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                          <span className="bg-gray-800 text-white text-sm px-3 py-1 rounded-md">
                            Inactive
                          </span>
                        </div>}
                      <div className="absolute top-2 right-2">
                        <div className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                          {reward.pointsCost} points
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <div className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded flex items-center">
                          {getRewardTypeIcon(reward.type)}
                          <span className="ml-1">
                            {reward.type === 'discount' ? 'Discount' : reward.type === 'free_item' ? 'Free Item' : reward.type === 'experience' ? 'Experience' : 'Gift Card'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">
                        {reward.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {reward.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <RefreshCwIcon className="w-4 h-4 inline-block mr-1" />
                          {reward.quantityRedeemed} redeemed
                        </div>
                        {reward.availability === 'limited' && <div className="text-sm text-gray-600">
                            {reward.quantityAvailable && <span>
                                {reward.quantityRedeemed}/
                                {reward.quantityAvailable} used
                              </span>}
                          </div>}
                      </div>
                      {reward.tierRestriction && reward.tierRestriction.length > 0 && <div className="mt-2 flex flex-wrap gap-1">
                            {reward.tierRestriction.map(tier => <span key={tier} className={`text-xs px-2 py-0.5 rounded-full ${getTierColorClass(tier)}`}>
                                {tier} only
                              </span>)}
                          </div>}
                      <div className="mt-4 pt-3 border-t flex justify-between">
                        <button onClick={() => {
                    setSelectedReward(reward);
                    setShowRewardModal(true);
                  } } className="text-sm text-blue-600 hover:text-blue-800">
                          Edit
                        </button>
                        <button onClick={() => toggleRewardStatus(reward.id)} className={`text-sm ${reward.isActive ? 'text-gray-600 hover:text-gray-800' : 'text-green-600 hover:text-green-800'}`}>
                          {reward.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </div>
                  </div>)}
              </div>
              {/* Reward Insights */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <h2 className="text-lg font-semibold mb-4">Reward Insights</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Reward
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points Cost
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Redemptions
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points Spent
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loyaltyProgram.rewards.sort((a, b) => b.quantityRedeemed - a.quantityRedeemed).map(reward => <tr key={reward.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-md flex-shrink-0 overflow-hidden">
                                  <img src={reward.image || 'https://via.placeholder.com/32'} alt={reward.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">
                                    {reward.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {reward.type === 'discount' ? 'Discount' : reward.type === 'free_item' ? 'Free Item' : reward.type === 'experience' ? 'Experience' : 'Gift Card'}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {reward.pointsCost}
                              </div>
                              <div className="text-xs text-gray-500">
                                $
                                {(reward.pointsCost * loyaltyProgram.pointsSettings.pointsValueInCents / 100).toFixed(2)} {' '}
                                value
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {reward.quantityRedeemed}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {(reward.quantityRedeemed * reward.pointsCost).toLocaleString()}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`text-xs px-2 py-1 rounded-full ${reward.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} `}>
                                {reward.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                          </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>} {/* Members Tab */} {activeTab === 'members' && <div>
              {/* Filters and Search */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    <div className="relative">
                      <select value={memberFilter} onChange={e => setMemberFilter(e.target.value as any)} className="pl-10 pr-4 py-2 border rounded-md text-sm appearance-none">
                        <option value="all">All Members</option>
                        <option value="active">Active Only</option>
                        <option value="inactive">Inactive Only</option>
                      </select>
                      <FilterIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                    </div>
                    <div className="relative">
                      <select value={memberSort} onChange={e => setMemberSort(e.target.value as any)} className="pl-10 pr-4 py-2 border rounded-md text-sm appearance-none">
                        <option value="recent">Most Recent</option>
                        <option value="name">Name (A-Z)</option>
                        <option value="points">Points (High-Low)</option>
                        <option value="tier">Tier (High-Low)</option>
                      </select>
                      <SlidersIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                  <div className="relative flex-grow max-w-md">
                    <input type="text" placeholder="Search members..." value={memberSearchQuery} onChange={e => setMemberSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 border rounded-md w-full text-sm" />
                    <SearchIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>
              {/* Members List */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="font-bold text-gray-900">
                    Members ({filteredMembers.length})
                  </h2>
                  <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    <UploadIcon className="w-4 h-4 mr-1" />
                    Import Members
                  </button>
                </div>
                {filteredMembers.length === 0 ? <div className="p-8 text-center">
                    <UsersIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-700 mb-1">
                      No members found
                    </h3>
                    <p className="text-gray-500 mb-4">
                      {memberSearchQuery ? 'No members match your search criteria.' : "You don't have any loyalty program members yet."}
                    </p>
                  </div> : <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Member
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Points
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tier
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Active
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {sortedMembers.map(member => <tr key={member.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                  <UserIcon className="w-4 h-4 text-gray-600" />
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">
                                    {member.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {member.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {member.pointsBalance}
                              </div>
                              <div className="text-xs text-gray-500">
                                {member.lifetimePoints} lifetime
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTierColorClass(member.tier)} `}>
                                {getTierIcon(member.tier)}
                                <span className="ml-1">{member.tier}</span>
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {formatDate(member.lastActive)}
                              </div>
                              <div className="text-xs text-gray-500">
                                {getDaysSinceLastActive(member.lastActive) === 0 ? 'Today' : `${getDaysSinceLastActive(member.lastActive)} days ago`}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center space-x-2">
                                <button onClick={() => {
                          setSelectedMember(member);
                          setShowMemberModal(true);
                        } } className="text-blue-600 hover:text-blue-800">
                                  View
                                </button>
                                <button onClick={() => {
                          setSelectedMember(member);
                          setPointsToAdjust(0);
                          setAdjustmentReason('');
                          setShowAdjustPointsModal(true);
                        } } className="text-green-600 hover:text-green-800">
                                  Adjust Points
                                </button>
                              </div>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>}
              </div>
              {/* Tier Distribution Chart */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <h2 className="text-lg font-semibold mb-4">
                  Tier Distribution
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {membersByTier.map(tier => <div key={tier.name} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          {getTierIcon(tier.name)}
                          <span className="ml-2 font-medium">{tier.name}</span>
                        </div>
                        <span className="text-sm font-medium">
                          {tier.count}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <div className={`h-2.5 rounded-full ${tier.name === 'Bronze' ? 'bg-amber-500' : tier.name === 'Silver' ? 'bg-gray-400' : 'bg-yellow-500'} `} style={{
                    width: `${tier.count / loyaltyProgram.stats.totalMembers * 100}%`
                  }}></div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {Math.round(tier.count / loyaltyProgram.stats.totalMembers * 100)}
                        % of members
                      </div>
                    </div>)}
                </div>
              </div>
            </div>} {/* Settings Tab */} {activeTab === 'settings' && <div>
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Program Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Points Settings */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">
                      Points Configuration
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Points Per Dollar Spent
                        </label>
                        <div className="flex items-center">
                          <input type="number" value={loyaltyProgram.pointsSettings.pointsPerDollar} disabled={!isEditingProgram} className="w-20 px-3 py-2 border rounded-md mr-2" />
                          <span className="text-sm text-gray-600">
                            points for every $1 spent
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Points Value
                        </label>
                        <div className="flex items-center">
                          <span className="mr-2">Each point is worth</span>
                          <input type="number" value={loyaltyProgram.pointsSettings.pointsValueInCents} disabled={!isEditingProgram} className="w-16 px-3 py-2 border rounded-md mr-2" />
                          <span className="text-sm text-gray-600">cents</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Minimum Redemption
                        </label>
                        <div className="flex items-center">
                          <input type="number" value={loyaltyProgram.pointsSettings.minimumPointsRedemption} disabled={!isEditingProgram} className="w-20 px-3 py-2 border rounded-md mr-2" />
                          <span className="text-sm text-gray-600">
                            points minimum to redeem
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Points Expiration
                        </label>
                        <div className="flex items-center">
                          <input type="number" value={loyaltyProgram.pointsSettings.expirationPeriodDays || 0} disabled={!isEditingProgram} className="w-20 px-3 py-2 border rounded-md mr-2" />
                          <span className="text-sm text-gray-600">
                            days (0 = never expire)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Bonus Points */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">
                      Bonus Points
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sign-up Bonus
                        </label>
                        <div className="flex items-center">
                          <input type="number" value={loyaltyProgram.joinBonus} disabled={!isEditingProgram} className="w-20 px-3 py-2 border rounded-md mr-2" />
                          <span className="text-sm text-gray-600">
                            points for new members
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Referral Bonus
                        </label>
                        <div className="flex items-center mb-2">
                          <span className="mr-2">Referrer receives</span>
                          <input type="number" value={loyaltyProgram.referralBonus.referrer} disabled={!isEditingProgram} className="w-16 px-3 py-2 border rounded-md mr-2" />
                          <span className="text-sm text-gray-600">points</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">New member receives</span>
                          <input type="number" value={loyaltyProgram.referralBonus.referee} disabled={!isEditingProgram} className="w-16 px-3 py-2 border rounded-md mr-2" />
                          <span className="text-sm text-gray-600">points</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Birthday Bonus
                        </label>
                        <div className="flex items-center">
                          <input type="number" value={loyaltyProgram.birthdayBonus} disabled={!isEditingProgram} className="w-20 px-3 py-2 border rounded-md mr-2" />
                          <span className="text-sm text-gray-600">
                            points on member's birthday
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="font-medium text-gray-900 mb-3">
                    Membership Tiers
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tier Name
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Points Threshold
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Points Multiplier
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Benefits
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {loyaltyProgram.tiers.map(tier => <tr key={tier.id} >
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {getTierIcon(tier.name)}
                                <span className="ml-2 font-medium">
                                  {tier.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <input type="number" value={tier.threshold} disabled={!isEditingProgram} className="w-24 px-3 py-1 border rounded-md text-sm" />
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <input type="number" value={tier.multiplier} step="0.1" disabled={!isEditingProgram} className="w-16 px-3 py-1 border rounded-md text-sm" />
                                <span className="ml-2 text-sm text-gray-600">
                                  x
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <ul className="text-sm text-gray-600 list-disc pl-5">
                                {tier.benefits.map((benefit, index) => <li key={index} >{benefit}</li>)}
                              </ul>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t flex justify-end">
                  {isEditingProgram ? <>
                      <button onClick={() => setIsEditingProgram(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 mr-3">
                        Cancel
                      </button>
                      <button onClick={() => setIsEditingProgram(false)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Save Changes
                      </button>
                    </> : <button onClick={() => setIsEditingProgram(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Edit Program Settings
                    </button>}
                </div>
              </div>
              {/* Integration Settings */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Integrations</h2>
                <div className="space-y-6">
                  <div className="flex items-start justify-between p-4 border rounded-md">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center mr-4 flex-shrink-0">
                        <ShoppingBagIcon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Point of Sale Integration
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Connect your POS system to automatically award points
                          for purchases
                        </p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 border border-blue-600 text-blue-600 rounded-md text-sm hover:bg-blue-50">
                      Connect
                    </button>
                  </div>
                  <div className="flex items-start justify-between p-4 border rounded-md">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center mr-4 flex-shrink-0">
                        <WifiIcon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Online Ordering Integration
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Connect your online ordering system to track points
                          for online purchases
                        </p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 border border-blue-600 text-blue-600 rounded-md text-sm hover:bg-blue-50">
                      Connect
                    </button>
                  </div>
                  <div className="flex items-start justify-between p-4 border rounded-md">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center mr-4 flex-shrink-0">
                        <MessageSquareIcon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          SMS Notifications
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Send automated SMS notifications for points updates
                          and special offers
                        </p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 border border-blue-600 text-blue-600 rounded-md text-sm hover:bg-blue-50">
                      Configure
                    </button>
                  </div>
                </div>
              </div>
              {/* Advanced Settings */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Advanced Settings
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Export Member Data
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Download a CSV file with all member information
                      </p>
                    </div>
                    <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                      Export CSV
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Program Status
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Temporarily pause or activate your loyalty program
                      </p>
                    </div>
                    <button className={`px-3 py-1.5 rounded-md text-sm ${loyaltyProgram.status === 'active' ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'} `}>
                      {loyaltyProgram.status === 'active' ? 'Pause Program' : 'Activate Program'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-md bg-red-50">
                    <div>
                      <h3 className="font-medium text-red-700">
                        Reset Program
                      </h3>
                      <p className="text-sm text-red-600 mt-1">
                        Reset all points and member data (cannot be undone)
                      </p>
                    </div>
                    <button className="px-3 py-1.5 bg-white border border-red-500 text-red-600 rounded-md text-sm hover:bg-red-50">
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>}
        </main>
      </div>
      {/* Member Detail Modal */} {showMemberModal && selectedMember && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <UserIcon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedMember.name}
                    </h3>
                    <div className="flex items-center mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getTierColorClass(selectedMember.tier)} `}>
                        {getTierIcon(selectedMember.tier)}
                        <span className="ml-1">{selectedMember.tier}</span>
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-600">
                        Member since {formatDate(selectedMember.joinDate)}
                      </span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setShowMemberModal(false)} className="text-gray-400 hover:text-gray-600">
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-md p-3">
                  <div className="text-sm text-blue-700 mb-1">
                    Points Balance
                  </div>
                  <div className="text-2xl font-bold text-blue-900">
                    {selectedMember.pointsBalance}
                  </div>
                </div>
                <div className="bg-green-50 rounded-md p-3">
                  <div className="text-sm text-green-700 mb-1">
                    Lifetime Points
                  </div>
                  <div className="text-2xl font-bold text-green-900">
                    {selectedMember.lifetimePoints}
                  </div>
                </div>
                <div className="bg-purple-50 rounded-md p-3">
                  <div className="text-sm text-purple-700 mb-1">
                    Total Spent
                  </div>
                  <div className="text-2xl font-bold text-purple-900">
                    ${selectedMember.totalSpent.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">
                  Contact Information
                </h4>
                <div className="bg-gray-50 rounded-md p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium">{selectedMember.email}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="font-medium">
                        {selectedMember.phone || 'Not provided'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Birthday</div>
                      <div className="font-medium">
                        {selectedMember.birthdayMonth && selectedMember.birthdayDay ? new Date(2000, selectedMember.birthdayMonth - 1, selectedMember.birthdayDay).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric'
                    }) : 'Not provided'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Activity</div>
                      <div className="font-medium">
                        {selectedMember.visitsCount} visits
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Points History</h4>
                  <button onClick={() => {
                setShowMemberModal(false);
                setPointsToAdjust(0);
                setAdjustmentReason('');
                setShowAdjustPointsModal(true);
              } } className="text-sm text-blue-600 hover:text-blue-800">
                    Adjust Points
                  </button>
                </div>
                <div className="bg-gray-50 rounded-md overflow-hidden">
                  <div className="max-h-60 overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Activity
                          </th>
                          <th scope="col" className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Points
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedMember.pointsHistory.map(history => <tr key={history.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(history.date)}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                              {history.description}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-right">
                              <span className={`font-medium ${history.type === 'earn' ? 'text-green-600' : history.type === 'redeem' ? 'text-blue-600' : history.type === 'expire' ? 'text-red-600' : 'text-gray-600'} `}>
                                {history.type === 'earn' ? '+' : '-'} {history.amount}
                              </span>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {selectedMember.rewardHistory.length > 0 && <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Reward Redemptions
                  </h4>
                  <div className="bg-gray-50 rounded-md overflow-hidden">
                    <div className="max-h-60 overflow-y-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Reward
                            </th>
                            <th scope="col" className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Points Used
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {selectedMember.rewardHistory.map(redemption => <tr key={redemption.id} className="hover:bg-gray-50">
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(redemption.date)}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                {redemption.rewardName}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-right font-medium text-blue-600">
                                {redemption.pointsSpent}
                              </td>
                            </tr>)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>}
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowMemberModal(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Edit Member
                </button>
              </div>
            </div>
          </div>
        </div>} {/* Adjust Points Modal */} {showAdjustPointsModal && selectedMember && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Adjust Points
                </h3>
                <button onClick={() => setShowAdjustPointsModal(false)} className="text-gray-400 hover:text-gray-600">
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Member</div>
                <div className="font-medium text-gray-900">
                  {selectedMember.name}
                </div>
                <div className="text-sm text-gray-500">
                  {selectedMember.email}
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">
                  Current Points Balance
                </div>
                <div className="font-bold text-xl">
                  {selectedMember.pointsBalance}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Points Adjustment
                </label>
                <div className="flex">
                  <button onClick={() => setPointsToAdjust(prev => prev > 0 ? prev * -1 : prev)} className={`px-3 py-2 border ${pointsToAdjust < 0 ? 'bg-red-100 border-red-300 text-red-700' : 'bg-gray-100 border-gray-300 text-gray-700'} rounded-l-md`}>
                    <MinusIcon className="w-5 h-5" />
                  </button>
                  <input type="number" value={Math.abs(pointsToAdjust)} onChange={e => {
                const value = parseInt(e.target.value) || 0;
                setPointsToAdjust(pointsToAdjust < 0 ? -value : value);
              }} className="flex-grow px-3 py-2 border-y text-center" />
                  <button onClick={() => setPointsToAdjust(prev => prev < 0 ? prev * -1 : prev)} className={`px-3 py-2 border ${pointsToAdjust >= 0 ? 'bg-green-100 border-green-300 text-green-700' : 'bg-gray-100 border-gray-300 text-gray-700'} rounded-r-md`}>
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Adjustment
                </label>
                <input type="text" value={adjustmentReason} onChange={e => setAdjustmentReason(e.target.value)} placeholder="e.g., Birthday bonus, Service recovery, etc." className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div className="bg-gray-50 rounded-md p-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    New Balance:
                  </span>
                  <span className="font-bold">
                    {selectedMember.pointsBalance + pointsToAdjust}
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowAdjustPointsModal(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleAdjustPoints} disabled={pointsToAdjust === 0 || !adjustmentReason.trim()} className={`px-4 py-2 ${pointsToAdjust === 0 || !adjustmentReason.trim() ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : pointsToAdjust > 0 ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'} rounded-md`}>
                  {pointsToAdjust > 0 ? 'Add Points' : 'Deduct Points'}
                </button>
              </div>
            </div>
          </div>
        </div>} {/* Reward Detail Modal */} {showRewardModal && selectedReward && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-full">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Edit Reward</h3>
                <button onClick={() => setShowRewardModal(false)} className="text-gray-400 hover:text-gray-600">
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
              {/* Reward form would go here */}
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">
                  Reward editing functionality would be implemented here,
                  allowing you to update the reward details, points cost, and
                  availability.
                </p>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowRewardModal(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={() => setShowRewardModal(false)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>}
      <Footer />
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
