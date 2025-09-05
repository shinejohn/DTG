import { Link } from "react-router";
import React, { useEffect, useState } from 'react';
import { Header } from '../../../components/dtg/Header';
import { Footer } from '../../../components/dtg/Footer';
import { PlanUpgradeButton } from '../../../components/dtg/PlanUpgradeButton';
import {
  LayoutDashboardIcon,
  BuildingIcon,
  CalendarIcon,
  SettingsIcon,
  UsersIcon,
  MessageSquareIcon,
  ImageIcon,
  BellIcon,
  TrendingUpIcon,
  EyeIcon,
  PhoneIcon,
  MapPinIcon,
  StarIcon,
  ChevronRightIcon,
  PlusIcon,
  ClockIcon,
  EditIcon,
  BellRingIcon,
  BarChart2Icon,
  RefreshCwIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  ThumbsUpIcon,
  SendIcon,
  PenToolIcon,
  ShoppingBagIcon,
  TagIcon,
  ZapIcon,
  XIcon,
  MessageCircleIcon,
  PercentIcon,
  GiftIcon,
  CrownIcon,
  TrophyIcon,
  AwardIcon,
  CoinIcon,
  TargetIcon,
  PieChartIcon,
  DollarSignIcon,
  BarChart3Icon,
  LineChartIcon,
  UserPlusIcon,
  BadgeIcon,
  LayersIcon,
  ShieldIcon,
} from 'lucide-react'

// Types
interface OverviewMetric {
  label: string
  value: string | number
  change: number
  icon: React.ReactNode
}
interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  date: string
  text: string
  photos?: string[]
  isResponded: boolean
  response?: string
}
interface PerformanceData {
  date: string
  views: number
  calls: number
  directions: number
}
interface CustomerInsight {
  label: string
  value: string | number
  change: number
  icon?: React.ReactNode
}
interface AISuggestion {
  id: string
  type: 'improvement' | 'opportunity' | 'alert'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  action?: string
  actionLink?: string
}
interface Business {
  id: string
  name: string
  category: string
  subcategory?: string
  coverImage: string
  logo?: string
  description: string
  completionPercentage: number
  verified: boolean
}
// New types for loyalty and rewards features
interface CouponPerformance {
  id: string
  name: string
  code: string
  type: 'percentage' | 'fixed' | 'bogo' | 'free'
  value: number
  status: 'active' | 'expired' | 'scheduled'
  views: number
  redemptions: number
  redemptionRate: number
  revenue: number
  startDate: string
  endDate: string
}
interface LoyaltyProgramStats {
  totalMembers: number
  memberGrowth: number
  tierDistribution: {
    tier: string
    count: number
    percentage: number
    color: string
  }[]
  pointsIssued: number
  pointsRedeemed: number
  redemptionRate: number
  averageEngagement: number
  activeMembers: number
  activeMembersPercentage: number
}
interface AchievementParticipation {
  id: string
  name: string
  description: string
  participants: number
  completions: number
  completionRate: number
  category: string
  points: number
}
interface RewardProgramROI {
  totalRevenue: number
  rewardInfluencedRevenue: number
  roiPercentage: number
  costOfRewards: number
  netProfit: number
  customerRetention: number
  repeatPurchaseRate: number
  averageOrderValue: number
  averageOrderValueChange: number
  lifetimeValue: number
  lifetimeValueChange: number
}

const mockBusiness: Business = {
  id: 'b1',
  name: 'Urban Bites Café',
  category: 'Restaurants',
  subcategory: 'Café',
  coverImage:
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1200&q=60',
  logo: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FmZSUyMGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=100&q=60',
  description:
    'A cozy café in the heart of downtown, serving specialty coffee, fresh pastries, and healthy breakfast and lunch options.',
  completionPercentage: 85,
  verified: true,
}
const mockOverviewMetrics: OverviewMetric[] = [
  {
    label: 'Profile Views',
    value: 1248,
    change: 12.5,
    icon: <EyeIcon className="w-5 h-5 text-blue-500" />,
  },
  {
    label: 'Phone Calls',
    value: 86,
    change: 8.2,
    icon: <PhoneIcon className="w-5 h-5 text-green-500" />,
  },
  {
    label: 'Direction Requests',
    value: 124,
    change: 15.7,
    icon: <MapPinIcon className="w-5 h-5 text-purple-500" />,
  },
  {
    label: 'Reviews',
    value: 4.7,
    change: 0.2,
    icon: <StarIcon className="w-5 h-5 text-yellow-500" />,
  },
]
const mockPerformanceData: PerformanceData[] = [
  {
    date: 'Mon',
    views: 150,
    calls: 10,
    directions: 15,
  },
  {
    date: 'Tue',
    views: 180,
    calls: 12,
    directions: 18,
  },
  {
    date: 'Wed',
    views: 220,
    calls: 15,
    directions: 22,
  },
  {
    date: 'Thu',
    views: 240,
    calls: 18,
    directions: 24,
  },
  {
    date: 'Fri',
    views: 280,
    calls: 22,
    directions: 28,
  },
  {
    date: 'Sat',
    views: 320,
    calls: 25,
    directions: 32,
  },
  {
    date: 'Sun',
    views: 280,
    calls: 20,
    directions: 25,
  },
]
const mockReviews: Review[] = [
  {
    id: 'r1',
    userId: 'u1',
    userName: 'Sarah Johnson',
    userAvatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    rating: 5,
    date: '2023-07-15',
    text: "This place is amazing! The coffee is always perfectly brewed and the avocado toast is to die for. I love the atmosphere and the staff is always friendly. It's my go-to spot for meetings and catching up with friends.",
    photos: [
      'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnJlYWtmYXN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    ],
    isResponded: true,
    response:
      "Thank you so much for your kind words, Sarah! We're thrilled that you enjoy our coffee and food. We take pride in creating a welcoming atmosphere and it's wonderful to hear that it's become your go-to spot. We look forward to serving you again soon!",
  },
  {
    id: 'r2',
    userId: 'u2',
    userName: 'Michael Chen',
    userAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 4,
    date: '2023-06-30',
    text: "Great spot for working remotely. The WiFi is reliable and they don't mind if you stay for a few hours. The quinoa salad bowl is fresh and filling. Only giving 4 stars because it can get quite busy and noisy during lunch hours.",
    isResponded: false,
  },
  {
    id: 'r3',
    userId: 'u3',
    userName: 'Emma Wilson',
    userAvatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    rating: 5,
    date: '2023-07-02',
    text: "I love their seasonal specials! The outdoor seating area is perfect for sunny days, and they're very accommodating with dietary restrictions. Their gluten-free options are actually delicious, which is rare to find!",
    photos: [
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2FmZSUyMHBhdGlvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    ],
    isResponded: false,
  },
]
const mockCustomerInsights: CustomerInsight[] = [
  {
    label: 'Peak Hours',
    value: '11:00 AM - 2:00 PM',
    change: 0,
    icon: <ClockIcon className="w-4 h-4 text-blue-500" />,
  },
  {
    label: 'Customer Age',
    value: '25-34 years',
    change: 5,
    icon: <UsersIcon className="w-4 h-4 text-green-500" />,
  },
  {
    label: 'Top Search Term',
    value: 'healthy lunch',
    change: 0,
    icon: <SearchIcon className="w-4 h-4 text-purple-500" />,
  },
  {
    label: 'Return Rate',
    value: '68%',
    change: 3.5,
    icon: <RefreshCwIcon className="w-4 h-4 text-orange-500" />,
  },
]
const mockAISuggestions: AISuggestion[] = [
  {
    id: 's1',
    type: 'improvement',
    title: 'Add more photos of your popular dishes',
    description:
      'Businesses with 10+ photos get 35% more profile views. You currently have 6 photos.',
    impact: 'high',
    action: 'Upload Photos',
    actionLink: '/business/profile/edit#photos',
  },
  {
    id: 's2',
    type: 'opportunity',
    title: 'Create a weekday lunch special',
    description:
      'Based on your traffic patterns, promoting a lunch special could increase weekday visits.',
    impact: 'medium',
    action: 'Create Promotion',
    actionLink: '/business/promotions/new',
  },
  {
    id: 's3',
    type: 'alert',
    title: 'Update your holiday hours',
    description:
      'The upcoming holiday weekend may affect your business hours. Update them to keep customers informed.',
    impact: 'high',
    action: 'Update Hours',
    actionLink: '/business/profile/edit#hours',
  },
]
// New mock data for loyalty and rewards features
const mockCouponPerformance: CouponPerformance[] = [
  {
    id: 'c1',
    name: 'Summer Special',
    code: 'SUMMER20',
    type: 'percentage',
    value: 20,
    status: 'active',
    views: 432,
    redemptions: 87,
    redemptionRate: 20.1,
    revenue: 1740,
    startDate: '2023-06-01',
    endDate: '2023-08-31',
  },
  {
    id: 'c2',
    name: 'New Customer',
    code: 'WELCOME10',
    type: 'fixed',
    value: 10,
    status: 'active',
    views: 215,
    redemptions: 63,
    redemptionRate: 29.3,
    revenue: 945,
    startDate: '2023-01-01',
    endDate: '2023-12-31',
  },
  {
    id: 'c3',
    name: 'Loyalty Member',
    code: 'LOYAL25',
    type: 'percentage',
    value: 25,
    status: 'active',
    views: 178,
    redemptions: 42,
    redemptionRate: 23.6,
    revenue: 1260,
    startDate: '2023-07-01',
    endDate: '2023-09-30',
  },
]
const mockLoyaltyProgramStats: LoyaltyProgramStats = {
  totalMembers: 458,
  memberGrowth: 15.3,
  tierDistribution: [
    {
      tier: 'Bronze',
      count: 287,
      percentage: 62.7,
      color: '#CD7F32',
    },
    {
      tier: 'Silver',
      count: 124,
      percentage: 27.1,
      color: '#C0C0C0',
    },
    {
      tier: 'Gold',
      count: 47,
      percentage: 10.2,
      color: '#FFD700',
    },
  ],
  pointsIssued: 25680,
  pointsRedeemed: 18450,
  redemptionRate: 71.8,
  averageEngagement: 2.7,
  activeMembers: 342,
  activeMembersPercentage: 74.7,
}
const mockAchievementParticipation: AchievementParticipation[] = [
  {
    id: 'a1',
    name: 'Coffee Enthusiast',
    description: 'Order 10 different coffee drinks',
    participants: 124,
    completions: 56,
    completionRate: 45.2,
    category: 'dining',
    points: 150,
  },
  {
    id: 'a2',
    name: 'Breakfast Champion',
    description: 'Try all breakfast menu items',
    participants: 98,
    completions: 23,
    completionRate: 23.5,
    category: 'dining',
    points: 200,
  },
  {
    id: 'a3',
    name: 'Regular',
    description: 'Visit 15 times in one month',
    participants: 75,
    completions: 12,
    completionRate: 16.0,
    category: 'loyalty',
    points: 300,
  },
  {
    id: 'a4',
    name: 'Social Butterfly',
    description: 'Check in with 5 different friends',
    participants: 142,
    completions: 31,
    completionRate: 21.8,
    category: 'social',
    points: 250,
  },
]
const mockRewardProgramROI: RewardProgramROI = {
  totalRevenue: 85750,
  rewardInfluencedRevenue: 27840,
  roiPercentage: 324,
  costOfRewards: 6570,
  netProfit: 21270,
  customerRetention: 78.5,
  repeatPurchaseRate: 42.3,
  averageOrderValue: 24.75,
  averageOrderValueChange: 18.2,
  lifetimeValue: 387.5,
  lifetimeValueChange: 32.8,
}
// Helper function to format numbers with K/M for thousands/millions
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}
function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
function CoinIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  )
}
export default function BusinessDashboard() {
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<
    'overview' | 'reviews' | 'insights' | 'actions' | 'loyalty'
  >('overview')
  const [responseText, setResponseText] = useState<string>('')
  const [respondingToReview, setRespondingToReview] = useState<string | null>(
    null,
  )
  const [selectedMetric, setSelectedMetric] = useState<
    'views' | 'calls' | 'directions'
  >('views')
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d')
  const [dismissedSuggestions, setDismissedSuggestions] = useState<string[]>([])
  const [activeLoyaltyTab, setActiveLoyaltyTab] = useState<
    'coupons' | 'program' | 'achievements' | 'roi'
  >('coupons')
  // Fetch business data
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use the mock data
    setLoading(true)
    setTimeout(() => {
      setBusiness(mockBusiness)
      setLoading(false)
    }, 500)
  }, [])
  const handleReviewResponse = (reviewId: string) => {
    if (!responseText.trim()) return
    // In a real app, this would send the response to an API
    console.log(`Responding to review ${reviewId} with: ${responseText}`)
    // Update the local state to show the response
    const updatedReviews = mockReviews.map((review) => {
      if (review.id === reviewId) {
        return {
          ...review,
          isResponded: true,
          response: responseText,
        }
      }
      return review
    })
    // Reset the response form
    setResponseText('')
    setRespondingToReview(null)
  }
  const dismissSuggestion = (suggestionId: string) => {
    setDismissedSuggestions((prev) => [...prev, suggestionId])
  }
  const filteredSuggestions = mockAISuggestions.filter(
    (suggestion) => !dismissedSuggestions.includes(suggestion.id),
  )
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading dashboard...</p>
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
  if (!business) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Business Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              We couldn't find your business information.
            </p>
            <Link
              to="/business/register"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Register Your Business
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-grow flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-sm hidden md:block">
          <div className="p-4 border-b">
            <div className="flex items-center">
              {business.logo ? (
                <img
                  src={business.logo} alt={business.name}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <BuildingIcon className="w-5 h-5 text-blue-600" />
                </div>
              )}
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
                  <Link
                    to="/business/dashboard"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700"
                  >
                    <LayoutDashboardIcon className="w-5 h-5 mr-3 text-blue-500" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/business/profile/edit"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <BuildingIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Business Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/business/reviews"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <MessageSquareIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Reviews
                    <span className="ml-auto bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
                      2
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/business/photos"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
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
                  <Link
                    to="/business/promotions"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <TagIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Promotions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/business/insights"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <BarChart2Icon className="w-5 h-5 mr-3 text-gray-500" />
                    Insights
                  </Link>
                </li>
                <li>
                  <Link
                    to="/business/events"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <CalendarIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Events
                  </Link>
                </li>
                {/* New Loyalty Program Link */}
                <li>
                  <Link
                    to="/business/loyalty"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <CrownIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Loyalty Program
                  </Link>
                </li>
                {/* New Coupons Link */}
                <li>
                  <Link
                    to="/business/coupons"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <PercentIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Coupons
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
                  <Link
                    to="/business/settings"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <SettingsIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Account Settings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/business/notifications"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <BellIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Notifications
                    <span className="ml-auto bg-red-100 text-red-600 text-xs font-medium px-2 py-0.5 rounded-full">
                      3
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-grow p-4 md:p-6">
          {/* Business Profile Completion Alert */} {business.completionPercentage < 100 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start">
              <div className="flex-shrink-0 mr-3">
                <AlertTriangleIcon className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-blue-800">
                  Complete your business profile
                </h3>
                <p className="text-sm text-blue-600 mb-2">
                  Your profile is {business.completionPercentage}% complete.
                  Businesses with complete profiles get up to 70% more views.
                </p>
                <div className="w-full bg-blue-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${business.completionPercentage} %`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex-shrink-0 ml-3">
                <Link
                  to="/business/profile/edit"
                  className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 text-sm font-medium rounded-md hover:bg-blue-600 hover:text-white"
                >
                  Complete Profile
                </Link>
              </div>
            </div>
          )} {/* Mobile Tab Navigation */}
          <div className="md:hidden mb-6 border-b">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('reviews')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
                Reviews
              </button>
              <button
                onClick={() => setActiveTab('insights')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'insights' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
                Insights
              </button>
              <button
                onClick={() => setActiveTab('loyalty')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'loyalty' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
                Loyalty
              </button>
              <button
                onClick={() => setActiveTab('actions')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'actions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
                Actions
              </button>
            </div>
          </div>
          {/* Desktop Content - Always visible on desktop */}
          <div className="hidden md:block">
            {/* Overview Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Overview</h2>
                <div className="flex items-center space-x-2">
                  <select
                    className="text-sm border-gray-300 rounded-md"
                    value={timeRange} onChange={(e) => setTimeRange(e.target.value as any)}
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                  </select>
                </div>
              </div>
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {mockOverviewMetrics.map((metric, index) => (
                  <div
                    key={index} className="bg-white rounded-lg shadow-sm p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-500">{metric.label}</p>
                        <h3 className="text-2xl font-bold mt-1">
                          {typeof metric.value === 'number' &&
                          metric.label === 'Reviews'
                            ? metric.value.toFixed(1)
                            : typeof metric.value === 'number'
                              ? formatNumber(metric.value)
                              : metric.value}
                        </h3>
                      </div>
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {metric.icon}
                      </div>
                    </div>
                    <div
                      className={`flex items-center mt-2 text-sm ${metric.change > 0 ? 'text-green-600' : metric.change < 0 ? 'text-red-600' : 'text-gray-500'} `}
                    >
                      <span>
                        {metric.change > 0 ? '+' : ''} {metric.change}%
                      </span>
                      <span className="text-gray-500 ml-1">
                        vs. last period
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* New Loyalty Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Loyalty Members */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Loyalty Members</p>
                      <h3 className="text-2xl font-bold mt-1">
                        {mockLoyaltyProgramStats.totalMembers}
                      </h3>
                    </div>
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <CrownIcon className="w-5 h-5 text-amber-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-green-600">
                    <TrendingUpIcon className="w-4 h-4 mr-1" />
                    <span>+{mockLoyaltyProgramStats.memberGrowth}%</span>
                    <span className="text-gray-500 ml-1">vs. last period</span>
                  </div>
                </div>
                {/* Active Coupons */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Active Coupons</p>
                      <h3 className="text-2xl font-bold mt-1">
                        {
                          mockCouponPerformance.filter(
                            (c) => c.status === 'active',
                          ).length
                        }
                      </h3>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <PercentIcon className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <span>
                      {mockCouponPerformance.reduce(
                        (acc, curr) =>
                          curr.status === 'active'
                            ? acc + curr.redemptions
                            : acc,
                        0,
                      )} {' '}
                      redemptions
                    </span>
                  </div>
                </div>
                {/* Achievement Engagement */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        Achievement Engagement
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        {Math.round(
                          mockAchievementParticipation.reduce(
                            (acc, curr) => acc + curr.completionRate,
                            0,
                          ) / mockAchievementParticipation.length,
                        )}
                        %
                      </h3>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <TrophyIcon className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <span>
                      {mockAchievementParticipation.reduce(
                        (acc, curr) => acc + curr.completions,
                        0,
                      )} {' '}
                      completions
                    </span>
                  </div>
                </div>
                {/* Reward Program ROI */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        Reward Program ROI
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        {mockRewardProgramROI.roiPercentage}%
                      </h3>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <DollarSignIcon className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-green-600">
                    <TrendingUpIcon className="w-4 h-4 mr-1" />
                    <span>
                      +{mockRewardProgramROI.averageOrderValueChange}%
                    </span>
                    <span className="text-gray-500 ml-1">AOV increase</span>
                  </div>
                </div>
              </div>
              {/* Performance Chart */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex flex-wrap items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Performance</h3>
                  <div className="flex space-x-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => setSelectedMetric('views')} className={`px-3 py-1 text-sm rounded-md ${selectedMetric === 'views' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      Profile Views
                    </button>
                    <button
                      onClick={() => setSelectedMetric('calls')} className={`px-3 py-1 text-sm rounded-md ${selectedMetric === 'calls' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      Calls
                    </button>
                    <button
                      onClick={() => setSelectedMetric('directions')} className={`px-3 py-1 text-sm rounded-md ${selectedMetric === 'directions' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      Directions
                    </button>
                  </div>
                </div>
                {/* Simple Chart Visualization */}
                <div className="h-64 relative">
                  <div className="absolute inset-0 flex items-end justify-between px-2">
                    {mockPerformanceData.map((data, index) => (
                      <div
                        key={index} className="flex flex-col items-center w-1/7"
                      >
                        <div
                          className="w-12 bg-blue-500 rounded-t-md"
                          style={{
                            height: `${(data[selectedMetric] / Math.max(...mockPerformanceData.map((d) => d[selectedMetric]))) * 180} px`,
                          }}
                        ></div>
                        <div className="text-xs text-gray-600 mt-1">
                          {data.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Loyalty & Rewards Section - New */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Loyalty & Rewards</h2>
                <Link
                  to="/business/loyalty"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                  Manage Program
                  <ChevronRightIcon className="w-4 h-4 ml-1" />
                </Link>
              </div>
              {/* Loyalty Tabs */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="border-b">
                  <nav className="flex">
                    <button
                      onClick={() => setActiveLoyaltyTab('coupons')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
                        activeLoyaltyTab === 'coupons'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <PercentIcon className="w-4 h-4 inline-block mr-1" />
                      Coupon Performance
                    </button>
                    <button
                      onClick={() => setActiveLoyaltyTab('program')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
                        activeLoyaltyTab === 'program'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <CrownIcon className="w-4 h-4 inline-block mr-1" />
                      Loyalty Program
                    </button>
                    <button
                      onClick={() => setActiveLoyaltyTab('achievements')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
                        activeLoyaltyTab === 'achievements'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <TrophyIcon className="w-4 h-4 inline-block mr-1" />
                      Achievements
                    </button>
                    <button
                      onClick={() => setActiveLoyaltyTab('roi')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
                        activeLoyaltyTab === 'roi'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <PieChartIcon className="w-4 h-4 inline-block mr-1" />
                      ROI Analysis
                    </button>
                  </nav>
                </div>
                {/* Coupon Performance Tab */} {activeLoyaltyTab === 'coupons' && (
                  <div className="p-4">
                    <div className="flex flex-wrap items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Active Coupons</h3>
                      <Link
                        to="/business/coupons/new"
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                      >
                        <PlusIcon className="w-4 h-4 mr-1.5" />
                        Create Coupon
                      </Link>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Coupon
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Views
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Redemptions
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Rate
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Revenue
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {mockCouponPerformance.map((coupon) => (
                            <tr key={coupon.id} >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                                    <PercentIcon className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {coupon.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {coupon.type === 'percentage'
                                        ? `${coupon.value}% off`
                                        : coupon.type === 'fixed'
                                          ? `$${coupon.value} off`
                                          : coupon.type === 'bogo'
                                            ? 'Buy one get one'
                                            : 'Free item'}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {coupon.views}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {coupon.redemptions}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {coupon.redemptionRate}%
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  ${coupon.revenue}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  ${
                                    coupon.status === 'active'
                                      ? 'bg-green-100 text-green-800'
                                      : coupon.status === 'expired'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                  } `}
                                >
                                  {coupon.status.charAt(0).toUpperCase() +
                                    coupon.status.slice(1)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )} {/* Loyalty Program Tab */} {activeLoyaltyTab === 'program' && (
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-amber-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-amber-800">
                            Member Stats
                          </h4>
                          <CrownIcon className="w-5 h-5 text-amber-600" />
                        </div>
                        <div className="text-3xl font-bold text-amber-900 mb-1">
                          {mockLoyaltyProgramStats.totalMembers}
                        </div>
                        <div className="text-sm text-amber-700 flex items-center">
                          <TrendingUpIcon className="w-4 h-4 mr-1 text-green-600" />
                          <span className="text-green-600">
                            +{mockLoyaltyProgramStats.memberGrowth}%
                          </span>
                          <span className="ml-1">vs. last period</span>
                        </div>
                        <div className="mt-3 text-sm">
                          <div className="flex justify-between mb-1">
                            <span className="text-amber-800">
                              Active members:
                            </span>
                            <span className="font-medium">
                              {mockLoyaltyProgramStats.activeMembers} (
                              {mockLoyaltyProgramStats.activeMembersPercentage}
                              %)
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-amber-800">
                              Avg. engagement:
                            </span>
                            <span className="font-medium">
                              {mockLoyaltyProgramStats.averageEngagement} {' '}
                              visits/month
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-blue-800">
                            Points Activity
                          </h4>
                          <CoinIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-blue-700 mb-1">
                              Issued
                            </div>
                            <div className="text-2xl font-bold text-blue-900">
                              {formatNumber(
                                mockLoyaltyProgramStats.pointsIssued,
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-blue-700 mb-1">
                              Redeemed
                            </div>
                            <div className="text-2xl font-bold text-blue-900">
                              {formatNumber(
                                mockLoyaltyProgramStats.pointsRedeemed,
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="text-sm text-blue-700 mb-1">
                            Redemption Rate
                          </div>
                          <div className="w-full bg-blue-200 rounded-full h-2.5">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{
                                width: `${mockLoyaltyProgramStats.redemptionRate} %`,
                              }}
                            ></div>
                          </div>
                          <div className="text-xs text-blue-600 mt-1 text-right">
                            {mockLoyaltyProgramStats.redemptionRate}%
                          </div>
                        </div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-purple-800">
                            Tier Distribution
                          </h4>
                          <LayersIcon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="space-y-3">
                          {mockLoyaltyProgramStats.tierDistribution.map(
                            (tier, index) => (
                              <div key={index} >
                                <div className="flex justify-between text-sm mb-1">
                                  <span>{tier.tier}</span>
                                  <span>
                                    {tier.count} members ({tier.percentage}%)
                                  </span>
                                </div>
                                <div className="w-full bg-purple-200 rounded-full h-2.5">
                                  <div
                                    className="h-2.5 rounded-full"
                                    style={{
                                      width: `${tier.percentage} %`,
                                      backgroundColor: tier.color,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <Link
                        to="/business/loyalty/members"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                      >
                        View Member List
                        <ChevronRightIcon className="w-4 h-4 ml-1" />
                      </Link>
                      <Link
                        to="/business/loyalty/settings"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                      >
                        Program Settings
                        <ChevronRightIcon className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                )} {/* Achievements Tab */} {activeLoyaltyTab === 'achievements' && (
                  <div className="p-4">
                    <div className="flex flex-wrap items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">
                        Achievement Participation
                      </h3>
                      <Link
                        to="/business/achievements/new"
                        className="inline-flex items-center px-3 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700"
                      >
                        <PlusIcon className="w-4 h-4 mr-1.5" />
                        Create Achievement
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockAchievementParticipation.map((achievement) => (
                        <div
                          key={achievement.id} className="border rounded-lg p-4"
                        >
                          <div className="flex items-start">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                                achievement.category === 'dining'
                                  ? 'bg-orange-100 text-orange-600'
                                  : achievement.category === 'exploration'
                                    ? 'bg-green-100 text-green-600'
                                    : achievement.category === 'social'
                                      ? 'bg-blue-100 text-blue-600'
                                      : 'bg-purple-100 text-purple-600'
                              } `}
                            >
                              {achievement.category === 'dining' ? (
                                <CoffeeIcon className="w-5 h-5" />
                              ) : achievement.category === 'social' ? (
                                <UsersIcon className="w-5 h-5" />
                              ) : achievement.category === 'loyalty' ? (
                                <CrownIcon className="w-5 h-5" />
                              ) : (
                                <MapPinIcon className="w-5 h-5" />
                              )}
                            </div>
                            <div className="flex-grow">
                              <div className="flex justify-between">
                                <h4 className="font-medium">
                                  {achievement.name}
                                </h4>
                                <span className="text-sm font-medium text-purple-600">
                                  {achievement.points} pts
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {achievement.description}
                              </p>
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>
                                  {achievement.participants} participants
                                </span>
                                <span>
                                  {achievement.completions} completions (
                                  {achievement.completionRate}%)
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-600 h-2 rounded-full"
                                  style={{
                                    width: `${achievement.completionRate} %`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-right">
                      <Link
                        to="/business/achievements"
                        className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center inline-flex justify-end"
                      >
                        View All Achievements
                        <ChevronRightIcon className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                )} {/* ROI Analysis Tab */} {activeLoyaltyTab === 'roi' && (
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white border rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-3">
                          Revenue Impact
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              Total Revenue
                            </div>
                            <div className="text-xl font-bold">
                              ${formatNumber(mockRewardProgramROI.totalRevenue)}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              Reward Influenced
                            </div>
                            <div className="text-xl font-bold">
                              $
                              {formatNumber(
                                mockRewardProgramROI.rewardInfluencedRevenue,
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              {Math.round(
                                (mockRewardProgramROI.rewardInfluencedRevenue /
                                  mockRewardProgramROI.totalRevenue) *
                                  100,
                              )}
                              % of total
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Program Cost</span>
                            <span className="font-medium">
                              $
                              {formatNumber(mockRewardProgramROI.costOfRewards)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Net Profit</span>
                            <span className="font-medium">
                              ${formatNumber(mockRewardProgramROI.netProfit)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">ROI</span>
                            <span className="font-medium text-green-600">
                              {mockRewardProgramROI.roiPercentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white border rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-3">
                          Customer Metrics
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">
                                Customer Retention
                              </span>
                              <span className="font-medium">
                                {mockRewardProgramROI.customerRetention}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{
                                  width: `${mockRewardProgramROI.customerRetention} %`,
                                }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">
                                Repeat Purchase Rate
                              </span>
                              <span className="font-medium">
                                {mockRewardProgramROI.repeatPurchaseRate}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{
                                  width: `${mockRewardProgramROI.repeatPurchaseRate} %`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              Avg. Order Value
                            </div>
                            <div className="text-xl font-bold">
                              ${mockRewardProgramROI.averageOrderValue}
                            </div>
                            <div className="text-xs text-green-600">
                              +{mockRewardProgramROI.averageOrderValueChange}%
                              increase
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              Customer Lifetime Value
                            </div>
                            <div className="text-xl font-bold">
                              ${mockRewardProgramROI.lifetimeValue}
                            </div>
                            <div className="text-xs text-green-600">
                              +{mockRewardProgramROI.lifetimeValueChange}%
                              increase
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="p-2 bg-green-100 rounded-md mr-3">
                          <BarChart3Icon className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-green-800 mb-1">
                            Reward Program Impact Summary
                          </h4>
                          <p className="text-sm text-green-700">
                            Your loyalty program is generating a positive ROI of{' '} {mockRewardProgramROI.roiPercentage}%. The program
                            has increased average order value by{' '} {mockRewardProgramROI.averageOrderValueChange}% and
                            customer lifetime value by{' '} {mockRewardProgramROI.lifetimeValueChange}%.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Recent Reviews Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recent Reviews</h2>
                <Link
                  to="/business/reviews"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                  View All
                  <ChevronRightIcon className="w-4 h-4 ml-1" />
                </Link>
              </div>
              {mockReviews.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <MessageCircleIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
                  <p className="text-gray-600 mb-4">
                    When customers leave reviews, they'll appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <div
                      key={review.id} className="bg-white rounded-lg shadow-sm p-4"
                    >
                      <div className="flex items-start">
                        <img
                          src={
                            review.userAvatar ||
                            'https://via.placeholder.com/40'
                          } alt={review.userName}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div className="flex-grow">
                          <div className="flex flex-wrap items-center mb-1">
                            <h4 className="font-medium mr-2">
                              {review.userName}
                            </h4>
                            <span className="text-sm text-gray-600">
                              {new Date(review.date).toLocaleDateString(
                                'en-US',
                                {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                },
                              )}
                            </span>
                          </div>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 mb-3">{review.text}</p>
                          {review.photos && review.photos.length > 0 && (
                            <div className="flex gap-2 mb-3">
                              {review.photos.map((photo, index) => (
                                <div
                                  key={index} className="w-16 h-16 overflow-hidden rounded-md"
                                >
                                  <img
                                    src={photo} alt={`Review by ${review.userName}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )} {review.isResponded && review.response && (
                            <div className="bg-gray-50 p-3 rounded-md mt-3 mb-3">
                              <div className="flex items-center mb-2">
                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                  <BuildingIcon className="w-3 h-3 text-blue-600" />
                                </div>
                                <div className="text-sm font-medium">
                                  Your Response
                                </div>
                                <div className="ml-auto text-xs text-gray-500">
                                  {new Date().toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </div>
                              </div>
                              <p className="text-sm text-gray-700">
                                {review.response}
                              </p>
                            </div>
                          )} {!review.isResponded && (
                            <div>
                              {respondingToReview === review.id ? (
                                <div className="mt-3">
                                  <textarea
                                    className="w-full px-3 py-2 border rounded-md text-sm"
                                    rows={3} placeholder="Write your response..."
                                    value={responseText}
                                    onChange={(e) =>
                                      setResponseText(e.target.value)
                                    }
                                  ></textarea>
                                  <div className="flex justify-end mt-2 space-x-2">
                                    <button
                                      onClick={() =>
                                        setRespondingToReview(null)
                                      } className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-100"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleReviewResponse(review.id)
                                      } className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 flex items-center"
                                    >
                                      <SendIcon className="w-3 h-3 mr-1" />
                                      Send Response
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="mt-3">
                                  <button
                                    onClick={() =>
                                      setRespondingToReview(review.id)
                                    } className="px-3 py-1.5 border border-blue-600 text-blue-600 text-sm font-medium rounded-md hover:bg-blue-50"
                                  >
                                    Respond to Review
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Two Column Layout for Insights and Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Customer Insights Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Customer Insights</h2>
                  <Link
                    to="/business/insights"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    View Details
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </Link>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockCustomerInsights.map((insight, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm text-gray-600 flex items-center">
                            {insight.icon}
                            <span className="ml-1.5">{insight.label}</span>
                          </div>
                          {insight.change > 0 && (
                            <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                              +{insight.change}%
                            </span>
                          )}
                        </div>
                        <div className="font-semibold">{insight.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Quick Actions Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Quick Actions</h2>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="space-y-3">
                    <Link
                      to="/business/profile/edit#hours"
                      className="flex items-center p-3 border rounded-md hover:bg-gray-50"
                    >
                      <div className="p-2 bg-blue-100 rounded-md mr-3">
                        <ClockIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Update Hours</div>
                        <div className="text-sm text-gray-600">
                          Modify your business hours
                        </div>
                      </div>
                    </Link>
                    <Link
                      to="/business/photos"
                      className="flex items-center p-3 border rounded-md hover:bg-gray-50"
                    >
                      <div className="p-2 bg-purple-100 rounded-md mr-3">
                        <ImageIcon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">Add Photos</div>
                        <div className="text-sm text-gray-600">
                          Upload new business photos
                        </div>
                      </div>
                    </Link>
                    <Link
                      to="/business/coupons/new"
                      className="flex items-center p-3 border rounded-md hover:bg-gray-50"
                    >
                      <div className="p-2 bg-green-100 rounded-md mr-3">
                        <PercentIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Create Coupon</div>
                        <div className="text-sm text-gray-600">
                          Offer a special deal or discount
                        </div>
                      </div>
                    </Link>
                    <Link
                      to="/business/achievements/new"
                      className="flex items-center p-3 border rounded-md hover:bg-gray-50"
                    >
                      <div className="p-2 bg-amber-100 rounded-md mr-3">
                        <TrophyIcon className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="font-medium">Create Achievement</div>
                        <div className="text-sm text-gray-600">
                          Add a new customer challenge
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* AI Suggestions Section */}
            <div className="mt-8">
              <div className="flex items-center mb-6">
                <h2 className="text-xl font-bold">AI Suggestions</h2>
                <div className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  Powered by AI
                </div>
              </div>
              {filteredSuggestions.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <ZapIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No suggestions right now
                  </h3>
                  <p className="text-gray-600">
                    We'll analyze your business data and provide smart
                    recommendations soon.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id} className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-l-blue-500"
                    >
                      <div className="flex justify-between">
                        <div
                          className={`p-2 rounded-md ${suggestion.type === 'improvement' ? 'bg-blue-100' : suggestion.type === 'opportunity' ? 'bg-green-100' : 'bg-orange-100'} `}
                        >
                          {suggestion.type === 'improvement' ? (
                            <TrendingUpIcon
                              className={`w-5 h-5 ${suggestion.type === 'improvement' ? 'text-blue-600' : suggestion.type === 'opportunity' ? 'text-green-600' : 'text-orange-600'} `}
                            />
                          ) : suggestion.type === 'opportunity' ? (
                            <ZapIcon className="w-5 h-5 text-green-600" />
                          ) : (
                            <AlertTriangleIcon className="w-5 h-5 text-orange-600" />
                          )}
                        </div>
                        <button
                          onClick={() => dismissSuggestion(suggestion.id)} className="text-gray-400 hover:text-gray-600"
                        >
                          <XIcon className="w-5 h-5" />
                        </button>
                      </div>
                      <h3 className="font-semibold mt-3 mb-1">
                        {suggestion.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {suggestion.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${suggestion.impact === 'high' ? 'bg-red-100 text-red-800' : suggestion.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'} `}
                        >
                          {suggestion.impact.charAt(0).toUpperCase() +
                            suggestion.impact.slice(1)} {' '}
                          Impact
                        </div>
                        {suggestion.action && (
                          <Link
                            to={suggestion.actionLink || '#'} className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            {suggestion.action}
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Mobile Content - Conditionally rendered based on active tab */}
          <div className="md:hidden">
            {activeTab === 'overview' && (
              <div>
                {/* Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {mockOverviewMetrics.map((metric, index) => (
                    <div
                      key={index} className="bg-white rounded-lg shadow-sm p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-500">
                            {metric.label}
                          </p>
                          <h3 className="text-2xl font-bold mt-1">
                            {typeof metric.value === 'number' &&
                            metric.label === 'Reviews'
                              ? metric.value.toFixed(1)
                              : typeof metric.value === 'number'
                                ? formatNumber(metric.value)
                                : metric.value}
                          </h3>
                        </div>
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {metric.icon}
                        </div>
                      </div>
                      <div
                        className={`flex items-center mt-2 text-sm ${metric.change > 0 ? 'text-green-600' : metric.change < 0 ? 'text-red-600' : 'text-gray-500'} `}
                      ><span>
                          {metric.change > 0 ? '+' : ''} {metric.change}%
                        </span>
                        <span className="text-gray-500 ml-1">
                          vs. last period
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* New Loyalty Metrics for Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Loyalty Members */}
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Loyalty Members</p>
                        <h3 className="text-2xl font-bold mt-1">
                          {mockLoyaltyProgramStats.totalMembers}
                        </h3>
                      </div>
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <CrownIcon className="w-5 h-5 text-amber-600" />
                      </div>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-green-600">
                      <TrendingUpIcon className="w-4 h-4 mr-1" />
                      <span>+{mockLoyaltyProgramStats.memberGrowth}%</span>
                    </div>
                  </div>
                  {/* Active Coupons */}
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Active Coupons</p>
                        <h3 className="text-2xl font-bold mt-1">
                          {
                            mockCouponPerformance.filter(
                              (c) => c.status === 'active',
                            ).length
                          }
                        </h3>
                      </div>
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <PercentIcon className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <span>
                        {mockCouponPerformance.reduce(
                          (acc, curr) =>
                            curr.status === 'active'
                              ? acc + curr.redemptions
                              : acc,
                          0,
                        )} {' '}
                        redemptions
                      </span>
                    </div>
                  </div>
                </div>
                {/* Performance Chart */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  <div className="flex flex-wrap items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Performance</h3>
                    <div className="flex space-x-2 mt-2 sm:mt-0">
                      <button
                        onClick={() => setSelectedMetric('views')} className={`px-3 py-1 text-sm rounded-md ${selectedMetric === 'views' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        Views
                      </button>
                      <button
                        onClick={() => setSelectedMetric('calls')} className={`px-3 py-1 text-sm rounded-md ${selectedMetric === 'calls' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        Calls
                      </button>
                      <button
                        onClick={() => setSelectedMetric('directions')} className={`px-3 py-1 text-sm rounded-md ${selectedMetric === 'directions' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        Directions
                      </button>
                    </div>
                  </div>
                  {/* Simple Chart Visualization */}
                  <div className="h-48 relative">
                    <div className="absolute inset-0 flex items-end justify-between px-2">
                      {mockPerformanceData.map((data, index) => (
                        <div
                          key={index} className="flex flex-col items-center w-1/7"
                        >
                          <div
                            className="w-8 bg-blue-500 rounded-t-md"
                            style={{
                              height: `${(data[selectedMetric] / Math.max(...mockPerformanceData.map((d) => d[selectedMetric]))) * 140} px`,
                            }}
                          ></div>
                          <div className="text-xs text-gray-600 mt-1">
                            {data.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )} {activeTab === 'reviews' && (
              <div>
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <div
                      key={review.id} className="bg-white rounded-lg shadow-sm p-4"
                    >
                      <div className="flex items-start">
                        <img
                          src={
                            review.userAvatar ||
                            'https://via.placeholder.com/40'
                          } alt={review.userName}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div className="flex-grow">
                          <div className="flex flex-wrap items-center mb-1">
                            <h4 className="font-medium mr-2">
                              {review.userName}
                            </h4>
                            <span className="text-sm text-gray-600">
                              {new Date(review.date).toLocaleDateString(
                                'en-US',
                                {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                },
                              )}
                            </span>
                          </div>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 mb-3">{review.text}</p>
                          {review.photos && review.photos.length > 0 && (
                            <div className="flex gap-2 mb-3">
                              {review.photos.map((photo, index) => (
                                <div
                                  key={index} className="w-16 h-16 overflow-hidden rounded-md"
                                >
                                  <img
                                    src={photo} alt={`Review by ${review.userName}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )} {review.isResponded && review.response && (
                            <div className="bg-gray-50 p-3 rounded-md mt-3 mb-3">
                              <div className="flex items-center mb-2">
                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                  <BuildingIcon className="w-3 h-3 text-blue-600" />
                                </div>
                                <div className="text-sm font-medium">
                                  Your Response
                                </div>
                                <div className="ml-auto text-xs text-gray-500">
                                  {new Date().toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </div>
                              </div>
                              <p className="text-sm text-gray-700">
                                {review.response}
                              </p>
                            </div>
                          )} {!review.isResponded && (
                            <div>
                              {respondingToReview === review.id ? (
                                <div className="mt-3">
                                  <textarea
                                    className="w-full px-3 py-2 border rounded-md text-sm"
                                    rows={3} placeholder="Write your response..."
                                    value={responseText}
                                    onChange={(e) =>
                                      setResponseText(e.target.value)
                                    }
                                  ></textarea>
                                  <div className="flex justify-end mt-2 space-x-2">
                                    <button
                                      onClick={() =>
                                        setRespondingToReview(null)
                                      } className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-100"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleReviewResponse(review.id)
                                      } className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 flex items-center"
                                    >
                                      <SendIcon className="w-3 h-3 mr-1" />
                                      Send Response
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="mt-3">
                                  <button
                                    onClick={() =>
                                      setRespondingToReview(review.id)
                                    } className="px-3 py-1.5 border border-blue-600 text-blue-600 text-sm font-medium rounded-md hover:bg-blue-50"
                                  >
                                    Respond to Review
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} {activeTab === 'insights' && (
              <div>
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  <div className="grid grid-cols-1 gap-4">
                    {mockCustomerInsights.map((insight, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm text-gray-600 flex items-center">
                            {insight.icon}
                            <span className="ml-1.5">{insight.label}</span>
                          </div>
                          {insight.change > 0 && (
                            <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                              +{insight.change}%
                            </span>
                          )}
                        </div>
                        <div className="font-semibold">{insight.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-4">AI Suggestions</h3>
                <div className="space-y-4">
                  {filteredSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id} className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-l-blue-500"
                    >
                      <div className="flex justify-between">
                        <div
                          className={`p-2 rounded-md ${suggestion.type === 'improvement' ? 'bg-blue-100' : suggestion.type === 'opportunity' ? 'bg-green-100' : 'bg-orange-100'} `}
                        >
                          {suggestion.type === 'improvement' ? (
                            <TrendingUpIcon
                              className={`w-5 h-5 ${suggestion.type === 'improvement' ? 'text-blue-600' : suggestion.type === 'opportunity' ? 'text-green-600' : 'text-orange-600'} `}
                            />
                          ) : suggestion.type === 'opportunity' ? (
                            <ZapIcon className="w-5 h-5 text-green-600" />
                          ) : (
                            <AlertTriangleIcon className="w-5 h-5 text-orange-600" />
                          )}
                        </div>
                        <button
                          onClick={() => dismissSuggestion(suggestion.id)} className="text-gray-400 hover:text-gray-600"
                        >
                          <XIcon className="w-5 h-5" />
                        </button>
                      </div>
                      <h3 className="font-semibold mt-3 mb-1">
                        {suggestion.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {suggestion.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${suggestion.impact === 'high' ? 'bg-red-100 text-red-800' : suggestion.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'} `}
                        >
                          {suggestion.impact.charAt(0).toUpperCase() +
                            suggestion.impact.slice(1)} {' '}
                          Impact
                        </div>
                        {suggestion.action && (
                          <Link
                            to={suggestion.actionLink || '#'} className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            {suggestion.action}
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} {activeTab === 'loyalty' && (
              <div>
                {/* Mobile Loyalty Tabs */}
                <div className="mb-4 border-b">
                  <div className="flex overflow-x-auto">
                    <button
                      onClick={() => setActiveLoyaltyTab('coupons')} className={`px-3 py-2 font-medium whitespace-nowrap text-sm ${activeLoyaltyTab === 'coupons' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    >
                      Coupons
                    </button>
                    <button
                      onClick={() => setActiveLoyaltyTab('program')} className={`px-3 py-2 font-medium whitespace-nowrap text-sm ${activeLoyaltyTab === 'program' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    >
                      Program
                    </button>
                    <button
                      onClick={() => setActiveLoyaltyTab('achievements')} className={`px-3 py-2 font-medium whitespace-nowrap text-sm ${activeLoyaltyTab === 'achievements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    >
                      Achievements
                    </button>
                    <button
                      onClick={() => setActiveLoyaltyTab('roi')} className={`px-3 py-2 font-medium whitespace-nowrap text-sm ${activeLoyaltyTab === 'roi' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    >
                      ROI
                    </button>
                  </div>
                </div>
                {activeLoyaltyTab === 'coupons' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold">Active Coupons</h3>
                      <Link
                        to="/business/coupons/new"
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                      >
                        <PlusIcon className="w-4 h-4 mr-1.5" />
                        Create
                      </Link>
                    </div>
                    {mockCouponPerformance.map((coupon) => (
                      <div
                        key={coupon.id} className="bg-white rounded-lg shadow-sm p-4"
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                            <PercentIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4 flex-grow">
                            <div className="flex justify-between">
                              <div className="text-sm font-medium text-gray-900">
                                {coupon.name}
                              </div>
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${
                                  coupon.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : coupon.status === 'expired'
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-yellow-100 text-yellow-800'
                                } `}
                              >
                                {coupon.status.charAt(0).toUpperCase() +
                                  coupon.status.slice(1)}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500">
                              {coupon.type === 'percentage'
                                ? `${coupon.value}% off`
                                : coupon.type === 'fixed'
                                  ? `$${coupon.value} off`
                                  : coupon.type === 'bogo'
                                    ? 'Buy one get one'
                                    : 'Free item'}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center">
                            <div className="text-gray-500">Views</div>
                            <div className="font-medium">{coupon.views}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-gray-500">Redemptions</div>
                            <div className="font-medium">
                              {coupon.redemptions}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-gray-500">Rate</div>
                            <div className="font-medium">
                              {coupon.redemptionRate}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )} {activeLoyaltyTab === 'program' && (
                  <div className="space-y-4">
                    <div className="bg-amber-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-amber-800">
                          Member Stats
                        </h4>
                        <CrownIcon className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="text-3xl font-bold text-amber-900 mb-1">
                        {mockLoyaltyProgramStats.totalMembers}
                      </div>
                      <div className="text-sm text-amber-700 flex items-center">
                        <TrendingUpIcon className="w-4 h-4 mr-1 text-green-600" />
                        <span className="text-green-600">
                          +{mockLoyaltyProgramStats.memberGrowth}%
                        </span>
                        <span className="ml-1">vs. last period</span>
                      </div>
                      <div className="mt-3 text-sm">
                        <div className="flex justify-between mb-1">
                          <span className="text-amber-800">
                            Active members:
                          </span>
                          <span className="font-medium">
                            {mockLoyaltyProgramStats.activeMembers} (
                            {mockLoyaltyProgramStats.activeMembersPercentage}%)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-purple-800">
                          Tier Distribution
                        </h4>
                        <LayersIcon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="space-y-3">
                        {mockLoyaltyProgramStats.tierDistribution.map(
                          (tier, index) => (
                            <div key={index} >
                              <div className="flex justify-between text-sm mb-1">
                                <span>{tier.tier}</span>
                                <span>
                                  {tier.count} ({tier.percentage}%)
                                </span>
                              </div>
                              <div className="w-full bg-purple-200 rounded-full h-2.5">
                                <div
                                  className="h-2.5 rounded-full"
                                  style={{
                                    width: `${tier.percentage} %`,
                                    backgroundColor: tier.color,
                                  }}
                                ></div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                )} {activeLoyaltyTab === 'achievements' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold">Achievements</h3>
                      <Link
                        to="/business/achievements/new"
                        className="inline-flex items-center px-3 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700"
                      >
                        <PlusIcon className="w-4 h-4 mr-1.5" />
                        Create
                      </Link>
                    </div>
                    {mockAchievementParticipation.map((achievement) => (
                      <div
                        key={achievement.id} className="bg-white rounded-lg shadow-sm p-4"
                      >
                        <div className="flex items-start">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                              achievement.category === 'dining'
                                ? 'bg-orange-100 text-orange-600'
                                : achievement.category === 'exploration'
                                  ? 'bg-green-100 text-green-600'
                                  : achievement.category === 'social'
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'bg-purple-100 text-purple-600'
                            } `}
                          >
                            {achievement.category === 'dining' ? (
                              <CoffeeIcon className="w-5 h-5" />
                            ) : achievement.category === 'social' ? (
                              <UsersIcon className="w-5 h-5" />
                            ) : achievement.category === 'loyalty' ? (
                              <CrownIcon className="w-5 h-5" />
                            ) : (
                              <MapPinIcon className="w-5 h-5" />
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <h4 className="font-medium">
                                {achievement.name}
                              </h4>
                              <span className="text-sm font-medium text-purple-600">
                                {achievement.points} pts
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {achievement.description}
                            </p>
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>
                                {achievement.completions}/
                                {achievement.participants}
                              </span>
                              <span>{achievement.completionRate}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-600 h-2 rounded-full"
                                style={{
                                  width: `${achievement.completionRate} %`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )} {activeLoyaltyTab === 'roi' && (
                  <div className="space-y-4">
                    <div className="bg-white border rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-3">
                        Revenue Impact
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">
                            Total Revenue
                          </div>
                          <div className="text-xl font-bold">
                            ${formatNumber(mockRewardProgramROI.totalRevenue)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">
                            Reward Influenced
                          </div>
                          <div className="text-xl font-bold">
                            $
                            {formatNumber(
                              mockRewardProgramROI.rewardInfluencedRevenue,
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">ROI</span>
                          <span className="font-medium text-green-600">
                            {mockRewardProgramROI.roiPercentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white border rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-3">
                        Customer Metrics
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">
                            Avg. Order Value
                          </div>
                          <div className="text-xl font-bold">
                            ${mockRewardProgramROI.averageOrderValue}
                          </div>
                          <div className="text-xs text-green-600">
                            +{mockRewardProgramROI.averageOrderValueChange}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">
                            Customer LTV
                          </div>
                          <div className="text-xl font-bold">
                            ${mockRewardProgramROI.lifetimeValue}
                          </div>
                          <div className="text-xs text-green-600">
                            +{mockRewardProgramROI.lifetimeValueChange}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )} {activeTab === 'actions' && (
              <div>
                <div className="space-y-3 mb-6">
                  <Link
                    to="/business/profile/edit#hours"
                    className="flex items-center p-3 bg-white border rounded-md shadow-sm"
                  >
                    <div className="p-2 bg-blue-100 rounded-md mr-3">
                      <ClockIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Update Hours</div>
                      <div className="text-sm text-gray-600">
                        Modify your business hours
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/business/photos"
                    className="flex items-center p-3 bg-white border rounded-md shadow-sm"
                  >
                    <div className="p-2 bg-purple-100 rounded-md mr-3">
                      <ImageIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">Add Photos</div>
                      <div className="text-sm text-gray-600">
                        Upload new business photos
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/business/coupons/new"
                    className="flex items-center p-3 bg-white border rounded-md shadow-sm"
                  >
                    <div className="p-2 bg-green-100 rounded-md mr-3">
                      <PercentIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">Create Coupon</div>
                      <div className="text-sm text-gray-600">
                        Offer a special deal or discount
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/business/achievements/new"
                    className="flex items-center p-3 bg-white border rounded-md shadow-sm"
                  >
                    <div className="p-2 bg-amber-100 rounded-md mr-3">
                      <TrophyIcon className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-medium">Create Achievement</div>
                      <div className="text-sm text-gray-600">
                        Add a new customer challenge
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

