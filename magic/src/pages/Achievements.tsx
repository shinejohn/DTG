import React, { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Link } from 'react-router-dom'
import {
  TrophyIcon,
  StarIcon,
  UsersIcon,
  MapPinIcon,
  CameraIcon,
  HeartIcon,
  CheckCircleIcon,
  LockIcon,
  InfoIcon,
  XIcon,
  UserIcon,
  CalendarIcon,
  BadgeCheckIcon,
  CompassIcon,
  MessageSquareIcon,
  TagIcon,
  ZapIcon,
  FireIcon,
  ShieldIcon,
  AwardIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  BarChartIcon,
  SettingsIcon,
  CrownIcon,
} from 'lucide-react'
// Types
interface Achievement {
  id: string
  title: string
  description: string
  category: 'explorer' | 'reviewer' | 'social' | 'events' | 'business'
  icon: string
  progress: number
  total: number
  completedAt?: string
  pointReward: number
  badgeUrl?: string
  isCompleted: boolean
  isNew?: boolean
  isSecret?: boolean
  requirements?: string[]
  businessId?: string
  businessName?: string
}
interface Friend {
  id: string
  name: string
  username: string
  avatar: string
  achievements: {
    total: number
    completed: number
    recent: Achievement[]
  }
}
// Mock data
const mockAchievements: Achievement[] = [
  // Explorer Category
  {
    id: 'a1',
    title: 'Downtown Explorer',
    description: 'Visit 10 different businesses in the downtown area',
    category: 'explorer',
    icon: 'map-pin',
    progress: 7,
    total: 10,
    isCompleted: false,
    pointReward: 100,
    requirements: [
      'Check in at 10 different businesses in the downtown district',
      'Visits must be at least 2 hours apart',
      'Businesses must be from at least 3 different categories',
    ],
  },
  {
    id: 'a2',
    title: 'Weekend Warrior',
    description: 'Check in at 5 different locations on a weekend',
    category: 'explorer',
    icon: 'calendar',
    progress: 5,
    total: 5,
    completedAt: '2023-07-10T16:30:00Z',
    isCompleted: true,
    pointReward: 75,
    badgeUrl:
      'https://images.unsplash.com/photo-1533928298208-27ff66555d8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'a3',
    title: 'Night Owl',
    description: 'Check in at 3 businesses after 10PM',
    category: 'explorer',
    icon: 'moon',
    progress: 2,
    total: 3,
    isCompleted: false,
    pointReward: 50,
  },
  {
    id: 'a4',
    title: 'Early Bird',
    description: 'Check in at 3 businesses before 8AM',
    category: 'explorer',
    icon: 'sun',
    progress: 1,
    total: 3,
    isCompleted: false,
    pointReward: 50,
  },
  {
    id: 'a5',
    title: 'Neighborhood Pioneer',
    description: 'Be the first of your friends to check in at 5 new businesses',
    category: 'explorer',
    icon: 'compass',
    progress: 3,
    total: 5,
    isCompleted: false,
    pointReward: 150,
  },
  // Reviewer Category
  {
    id: 'a6',
    title: 'Review Pro',
    description: 'Write 10 reviews for local businesses',
    category: 'reviewer',
    icon: 'star',
    progress: 7,
    total: 10,
    isCompleted: false,
    pointReward: 100,
  },
  {
    id: 'a7',
    title: 'Photo Enthusiast',
    description: 'Upload 20 photos of local businesses',
    category: 'reviewer',
    icon: 'camera',
    progress: 20,
    total: 20,
    completedAt: '2023-07-25T10:15:00Z',
    isCompleted: true,
    isNew: true,
    pointReward: 100,
    badgeUrl:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'a8',
    title: 'Helpful Reviewer',
    description: 'Get 50 helpful votes on your reviews',
    category: 'reviewer',
    icon: 'thumbs-up',
    progress: 32,
    total: 50,
    isCompleted: false,
    pointReward: 200,
  },
  {
    id: 'a9',
    title: 'Detailed Critic',
    description: 'Write 5 reviews with at least 200 words each',
    category: 'reviewer',
    icon: 'file-text',
    progress: 3,
    total: 5,
    isCompleted: false,
    pointReward: 150,
  },
  {
    id: 'a10',
    title: 'First Review',
    description: 'Write your first review',
    category: 'reviewer',
    icon: 'edit',
    progress: 1,
    total: 1,
    completedAt: '2023-05-15T14:30:00Z',
    isCompleted: true,
    pointReward: 25,
    badgeUrl:
      'https://images.unsplash.com/photo-1572048572872-2394404cf1f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
  // Social Category
  {
    id: 'a11',
    title: 'Social Butterfly',
    description: 'Check in at 15 different businesses',
    category: 'social',
    icon: 'users',
    progress: 12,
    total: 15,
    isCompleted: false,
    pointReward: 150,
  },
  {
    id: 'a12',
    title: 'Loyal Customer',
    description: 'Check in at the same business 5 times',
    category: 'social',
    icon: 'heart',
    progress: 5,
    total: 5,
    completedAt: '2023-07-10T16:30:00Z',
    isCompleted: true,
    pointReward: 75,
    badgeUrl:
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    businessId: 'b1',
    businessName: 'Urban Bites Café',
  },
  {
    id: 'a13',
    title: 'Friend Maker',
    description: 'Connect with 10 friends on the platform',
    category: 'social',
    icon: 'user-plus',
    progress: 7,
    total: 10,
    isCompleted: false,
    pointReward: 100,
  },
  {
    id: 'a14',
    title: 'Group Outing',
    description: 'Check in with 3 friends at the same location',
    category: 'social',
    icon: 'users',
    progress: 1,
    total: 1,
    completedAt: '2023-06-18T19:45:00Z',
    isCompleted: true,
    pointReward: 50,
    badgeUrl:
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'a15',
    title: 'Conversation Starter',
    description: "Leave 5 comments on friends' activities",
    category: 'social',
    icon: 'message-square',
    progress: 3,
    total: 5,
    isCompleted: false,
    pointReward: 50,
  },
  // Events Category
  {
    id: 'a16',
    title: 'Event Explorer',
    description: 'Attend 3 local events',
    category: 'events',
    icon: 'calendar',
    progress: 2,
    total: 3,
    isCompleted: false,
    pointReward: 75,
  },
  {
    id: 'a17',
    title: 'Festival Goer',
    description: 'Check in at a seasonal festival',
    category: 'events',
    icon: 'music',
    progress: 1,
    total: 1,
    completedAt: '2023-07-04T20:15:00Z',
    isCompleted: true,
    pointReward: 50,
    badgeUrl:
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'a18',
    title: 'Secret Achievement',
    description: 'This achievement is hidden until unlocked',
    category: 'events',
    icon: 'lock',
    progress: 0,
    total: 1,
    isCompleted: false,
    pointReward: 100,
    isSecret: true,
  },
  // Business Category
  {
    id: 'a19',
    title: 'Café Connoisseur',
    description: 'Visit 5 different coffee shops',
    category: 'business',
    icon: 'coffee',
    progress: 4,
    total: 5,
    isCompleted: false,
    pointReward: 75,
  },
  {
    id: 'a20',
    title: 'Foodie',
    description: 'Review 10 different restaurants',
    category: 'business',
    icon: 'utensils',
    progress: 6,
    total: 10,
    isCompleted: false,
    pointReward: 100,
  },
]
const mockFriends: Friend[] = [
  {
    id: 'f1',
    name: 'Michael Chen',
    username: 'michaelchen',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    achievements: {
      total: 20,
      completed: 15,
      recent: [
        {
          id: 'a7',
          title: 'Photo Enthusiast',
          description: 'Upload 20 photos of local businesses',
          category: 'reviewer',
          icon: 'camera',
          progress: 20,
          total: 20,
          completedAt: '2023-07-28T10:15:00Z',
          isCompleted: true,
          pointReward: 100,
          badgeUrl:
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
  },
  {
    id: 'f2',
    name: 'Emily Wilson',
    username: 'emilywilson',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    achievements: {
      total: 20,
      completed: 12,
      recent: [
        {
          id: 'a12',
          title: 'Loyal Customer',
          description: 'Check in at the same business 5 times',
          category: 'social',
          icon: 'heart',
          progress: 5,
          total: 5,
          completedAt: '2023-07-26T16:30:00Z',
          isCompleted: true,
          pointReward: 75,
          badgeUrl:
            'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
          businessId: 'b3',
          businessName: 'Downtown Bakery',
        },
      ],
    },
  },
  {
    id: 'f3',
    name: 'David Rodriguez',
    username: 'davidrodriguez',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    achievements: {
      total: 20,
      completed: 10,
      recent: [
        {
          id: 'a2',
          title: 'Weekend Warrior',
          description: 'Check in at 5 different locations on a weekend',
          category: 'explorer',
          icon: 'calendar',
          progress: 5,
          total: 5,
          completedAt: '2023-07-23T16:30:00Z',
          isCompleted: true,
          pointReward: 75,
          badgeUrl:
            'https://images.unsplash.com/photo-1533928298208-27ff66555d8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
  },
]
export function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [friends, setFriends] = useState<Friend[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showFriendActivity, setShowFriendActivity] = useState(true)
  // Fetch achievements data
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use the mock data
    setLoading(true)
    setTimeout(() => {
      setAchievements(mockAchievements)
      setFriends(mockFriends)
      setLoading(false)
    }, 500)
  }, [])
  const filteredAchievements = achievements.filter((achievement) => {
    if (activeCategory === 'all') return true
    if (activeCategory === 'completed') return achievement.isCompleted
    if (activeCategory === 'in-progress')
      return !achievement.isCompleted && achievement.progress > 0
    return achievement.category === activeCategory
  })
  const completedAchievements = achievements.filter((a) => a.isCompleted)
  const completionPercentage =
    achievements.length > 0
      ? Math.round((completedAchievements.length / achievements.length) * 100)
      : 0
  const totalPointsEarned = completedAchievements.reduce(
    (sum, a) => sum + a.pointReward,
    0,
  )
  const totalPointsPossible = achievements.reduce(
    (sum, a) => sum + a.pointReward,
    0,
  )
  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement)
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
    setSelectedAchievement(null)
  }
  const getAchievementIcon = (icon: string) => {
    switch (icon) {
      case 'map-pin':
        return <MapPinIcon className="w-6 h-6" />
      case 'star':
        return <StarIcon className="w-6 h-6" />
      case 'camera':
        return <CameraIcon className="w-6 h-6" />
      case 'heart':
        return <HeartIcon className="w-6 h-6" />
      case 'users':
        return <UsersIcon className="w-6 h-6" />
      case 'calendar':
        return <CalendarIcon className="w-6 h-6" />
      case 'compass':
        return <CompassIcon className="w-6 h-6" />
      case 'message-square':
        return <MessageSquareIcon className="w-6 h-6" />
      case 'lock':
        return <LockIcon className="w-6 h-6" />
      case 'moon':
        return <MoonIcon className="w-6 h-6" />
      case 'sun':
        return <SunIcon className="w-6 h-6" />
      case 'thumbs-up':
        return <ThumbsUpIcon className="w-6 h-6" />
      case 'file-text':
        return <FileTextIcon className="w-6 h-6" />
      case 'edit':
        return <EditIcon className="w-6 h-6" />
      case 'user-plus':
        return <UserPlusIcon className="w-6 h-6" />
      case 'music':
        return <MusicIcon className="w-6 h-6" />
      case 'coffee':
        return <CoffeeIcon className="w-6 h-6" />
      case 'utensils':
        return <UtensilsIcon className="w-6 h-6" />
      default:
        return <BadgeCheckIcon className="w-6 h-6" />
    }
  }
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading achievements...</p>
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Achievement Center
              </h1>
              <p className="text-gray-600 mt-1">
                Unlock achievements, earn badges, and collect rewards
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/leaderboards"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
              >
                <BarChartIcon className="w-5 h-5 mr-1.5" />
                View Leaderboards
              </Link>
            </div>
          </div>
          {/* Achievement Progress Summary */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Your Achievement Progress
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {completedAchievements.length} of {achievements.length}{' '}
                    achievements completed ({completionPercentage}%)
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center">
                  <TrophyIcon className="w-6 h-6 text-amber-500 mr-2" />
                  <span className="text-lg font-semibold">
                    {totalPointsEarned} / {totalPointsPossible} points earned
                  </span>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              {/* Badge Collection Preview */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">Recent Badges</h3>
                  <Link
                    to="/achievements/badges"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    View All Badges
                  </Link>
                </div>
                <div className="flex flex-wrap gap-3">
                  {completedAchievements
                    .filter((a) => a.badgeUrl)
                    .slice(0, 5)
                    .map((achievement) => (
                      <div
                        key={achievement.id}
                        className="relative cursor-pointer"
                        onClick={() => handleAchievementClick(achievement)}
                      >
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                          {achievement.badgeUrl ? (
                            <img
                              src={achievement.badgeUrl}
                              alt={achievement.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              {getAchievementIcon(achievement.icon)}
                            </div>
                          )}
                        </div>
                        {achievement.isNew && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            !
                          </span>
                        )}
                      </div>
                    ))}
                  {completedAchievements.filter((a) => a.badgeUrl).length ===
                    0 && (
                    <div className="text-gray-500 text-sm italic">
                      Complete achievements to earn badges
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Friend Activity */}
          {showFriendActivity && friends.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Friend Activity</h2>
                <button
                  onClick={() => setShowFriendActivity(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {friends.map((friend) => (
                    <div key={friend.id} className="flex items-start">
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div className="flex-grow">
                        <p className="font-medium text-gray-900">
                          {friend.name} unlocked an achievement
                        </p>
                        {friend.achievements.recent[0] && (
                          <div className="mt-1 p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                                {getAchievementIcon(
                                  friend.achievements.recent[0].icon,
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {friend.achievements.recent[0].title}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {formatDate(
                                    friend.achievements.recent[0].completedAt ||
                                      '',
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="mt-2 text-sm">
                          <span className="text-gray-600">
                            {friend.achievements.completed} of{' '}
                            {friend.achievements.total} achievements completed
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                  <Link
                    to="/leaderboards/friends"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Compare with friends
                  </Link>
                </div>
              </div>
            </div>
          )}
          {/* Category Tabs */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-3 whitespace-nowrap ${activeCategory === 'all' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                All Achievements
              </button>
              <button
                onClick={() => setActiveCategory('completed')}
                className={`px-4 py-3 whitespace-nowrap ${activeCategory === 'completed' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Completed
              </button>
              <button
                onClick={() => setActiveCategory('in-progress')}
                className={`px-4 py-3 whitespace-nowrap ${activeCategory === 'in-progress' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                In Progress
              </button>
              <button
                onClick={() => setActiveCategory('explorer')}
                className={`px-4 py-3 whitespace-nowrap ${activeCategory === 'explorer' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <CompassIcon className="w-4 h-4 inline-block mr-1" />
                Explorer
              </button>
              <button
                onClick={() => setActiveCategory('reviewer')}
                className={`px-4 py-3 whitespace-nowrap ${activeCategory === 'reviewer' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <StarIcon className="w-4 h-4 inline-block mr-1" />
                Reviewer
              </button>
              <button
                onClick={() => setActiveCategory('social')}
                className={`px-4 py-3 whitespace-nowrap ${activeCategory === 'social' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <UsersIcon className="w-4 h-4 inline-block mr-1" />
                Social
              </button>
              <button
                onClick={() => setActiveCategory('events')}
                className={`px-4 py-3 whitespace-nowrap ${activeCategory === 'events' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <CalendarIcon className="w-4 h-4 inline-block mr-1" />
                Events
              </button>
              <button
                onClick={() => setActiveCategory('business')}
                className={`px-4 py-3 whitespace-nowrap ${activeCategory === 'business' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <BuildingIcon className="w-4 h-4 inline-block mr-1" />
                Business
              </button>
            </div>
          </div>
          {/* Achievement Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {filteredAchievements.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <TrophyIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">
                  No achievements found
                </h3>
                <p className="text-gray-500">
                  {activeCategory === 'completed'
                    ? "You haven't completed any achievements in this category yet."
                    : 'There are no achievements in this category.'}
                </p>
              </div>
            ) : (
              filteredAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] ${achievement.isNew ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => handleAchievementClick(achievement)}
                >
                  <div className="p-5">
                    <div className="flex items-start">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${achievement.isCompleted ? 'bg-green-100 text-green-600' : achievement.isSecret ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-blue-600'}`}
                      >
                        {achievement.isSecret && !achievement.isCompleted ? (
                          <LockIcon className="w-6 h-6" />
                        ) : (
                          getAchievementIcon(achievement.icon)
                        )}
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-gray-900">
                            {achievement.isSecret && !achievement.isCompleted
                              ? 'Secret Achievement'
                              : achievement.title}
                          </h3>
                          {achievement.isNew && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {achievement.isSecret && !achievement.isCompleted
                            ? 'Complete special actions to unlock this achievement'
                            : achievement.description}
                        </p>
                        {achievement.isCompleted ? (
                          <div className="flex items-center mt-3 text-sm text-green-600">
                            <CheckCircleIcon className="w-4 h-4 mr-1" />
                            Completed{' '}
                            {achievement.completedAt
                              ? formatDate(achievement.completedAt)
                              : ''}
                            <span className="ml-2 font-medium">
                              +{achievement.pointReward} points
                            </span>
                          </div>
                        ) : (
                          <div className="mt-3">
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
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{
                                  width: `${(achievement.progress / achievement.total) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      {/* Achievement Detail Modal */}
      {showModal && selectedAchievement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${selectedAchievement.isCompleted ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}
                  >
                    {getAchievementIcon(selectedAchievement.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedAchievement.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedAchievement.category.charAt(0).toUpperCase() +
                        selectedAchievement.category.slice(1)}{' '}
                      Achievement
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-700 mb-4">
                {selectedAchievement.description}
              </p>
              {selectedAchievement.isCompleted ? (
                <div className="bg-green-50 border border-green-100 rounded-md p-4 mb-4">
                  <div className="flex items-center text-green-700">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    <span className="font-medium">Achievement Completed!</span>
                  </div>
                  {selectedAchievement.completedAt && (
                    <p className="text-green-600 text-sm mt-1">
                      Completed on {formatDate(selectedAchievement.completedAt)}
                    </p>
                  )}
                  <p className="text-green-600 text-sm mt-1">
                    Reward: {selectedAchievement.pointReward} points
                  </p>
                </div>
              ) : (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Progress: {selectedAchievement.progress}/
                      {selectedAchievement.total}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {Math.round(
                        (selectedAchievement.progress /
                          selectedAchievement.total) *
                          100,
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${(selectedAchievement.progress / selectedAchievement.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
                    <div className="flex items-center text-blue-700 mb-2">
                      <InfoIcon className="w-5 h-5 mr-2" />
                      <span className="font-medium">Achievement Details</span>
                    </div>
                    <p className="text-blue-600 text-sm">
                      Reward: {selectedAchievement.pointReward} points
                    </p>
                  </div>
                </div>
              )}
              {selectedAchievement.requirements && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Requirements:
                  </h4>
                  <ul className="space-y-2">
                    {selectedAchievement.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-gray-700 text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedAchievement.businessName && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Business:{' '}
                    <Link
                      to={`/business/${selectedAchievement.businessId}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedAchievement.businessName}
                    </Link>
                  </p>
                </div>
              )}
              {selectedAchievement.badgeUrl && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">Badge Earned:</p>
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-blue-100">
                    <img
                      src={selectedAchievement.badgeUrl}
                      alt={`${selectedAchievement.title} badge`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <Link
                    to="/rewards"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Rewards
                  </Link>
                  <Link
                    to="/leaderboards"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Leaderboards
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
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
function CameraIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  )
}
function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}
function SunIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}
function ThumbsUpIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  )
}
function FileTextIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}
function EditIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}
function UserPlusIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  )
}
function MusicIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}
function CoffeeIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  )
}
function UtensilsIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  )
}
