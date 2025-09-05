import { Link } from "react-router";
import React, { useEffect, useState } from 'react';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '../../../components/dtg/Header';
import { Footer } from '../../../components/dtg/Footer';
import { UserIcon, MapPinIcon, CalendarIcon, StarIcon, CameraIcon, CheckSquareIcon, HeartIcon, UsersIcon, PenIcon, SettingsIcon, MessageSquareIcon, AwardIcon, ChevronRightIcon, EditIcon, GridIcon, ListIcon, GiftIcon, TrophyIcon, CrownIcon, ZapIcon, CoffeeIcon, ShoppingBagIcon, BadgeIcon, TargetIcon, BarChart2Icon, LayersIcon, CheckCircleIcon, TrendingUpIcon, ShieldIcon, ArrowUpIcon, ArrowDownIcon, PlusIcon, XIcon, CheckIcon, SendIcon } from 'lucide-react';
// Types
interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}
interface Friend {
  id: string;
  username: string;
  name: string;
  avatar: string;
}
interface Review {
  id: string;
  businessId: string;
  businessName: string;
  businessImage: string;
  rating: number;
  content: string;
  photos: string[];
  helpfulVotes: number;
  createdAt: string;
}
interface Photo {
  id: string;
  url: string;
  businessId: string;
  businessName: string;
  caption?: string;
  createdAt: string;
}
interface CheckIn {
  id: string;
  businessId: string;
  businessName: string;
  businessImage: string;
  comment?: string;
  createdAt: string;
}
interface Favorite {
  id: string;
  businessId: string;
  businessName: string;
  businessImage: string;
  businessCategory: string;
  createdAt: string;
}
// New types for rewards and loyalty features
interface RewardsSummary {
  pointsBalance: number;
  lifetimePoints: number;
  level: string;
  nextLevel: string;
  pointsToNextLevel: number;
  progressPercentage: number;
  recentPointsActivity: {
    id: string;
    amount: number;
    type: 'earned' | 'spent' | 'expired';
    source: string;
    date: string;
  }[];
}
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  total: number;
  completed: boolean;
  earnedAt?: string;
  category: 'dining' | 'exploration' | 'social' | 'loyalty' | 'review';
  points: number;
}
interface LoyaltyMembership {
  id: string;
  businessId: string;
  businessName: string;
  businessImage: string;
  tier: string;
  pointsBalance: number;
  memberSince: string;
  perks: string[];
}
interface LeaderboardPosition {
  rank: number;
  totalParticipants: number;
  category: string;
  points: number;
  trend: 'up' | 'down' | 'same';
  friendsAhead: Friend[];
  friendsBehind: Friend[];
}
interface UserProfile {
  id: string;
  username: string;
  name: string;
  avatar: string;
  coverPhoto: string;
  bio: string;
  location: string;
  memberSince: string;
  isVerified: boolean;
  stats: {
    reviewCount: number;
    photoCount: number;
    checkInCount: number;
    helpfulVotes: number;
    friendsCount: number;
  };
  badges: Badge[];
  friends: Friend[];
  reviews: Review[];
  photos: Photo[];
  checkIns: CheckIn[];
  favorites: Favorite[];
  // New fields for rewards and loyalty
  rewardsSummary?: RewardsSummary;
  achievements?: Achievement[];
  loyaltyMemberships?: LoyaltyMembership[];
  leaderboardPosition?: LeaderboardPosition;
}

export default function UserProfile() {
  const {
    username
  } = useParams<{
    username: string;
  }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'reviews' | 'photos' | 'checkins' | 'favorites' | 'rewards' | 'achievements'>('reviews');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [isCurrentUser, setIsCurrentUser] = useState(true); // In a real app, you would check if the profile belongs to the current user
  // Fetch user profile data
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use the mock data
    setLoading(true);
    setTimeout(() => {
      setProfile(mockUserProfile);
      setLoading(false);
    }, 500);
  }, [username]);
  // Handle follow/unfollow
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    // In a real app, you would make an API call here
    if (!isFollowing) {
      // Mock successful follow
      console.log(`Following user ${username}`);
      // You could update the profile stats here in a real implementation
      if (profile) {
        const updatedProfile = {
          ...profile,
          stats: {
            ...profile.stats,
            friendsCount: profile.stats.friendsCount + 1
          }
        };
        setProfile(updatedProfile);
      }
    } else {
      // Mock successful unfollow
      console.log(`Unfollowing user ${username}`);
      // You could update the profile stats here in a real implementation
      if (profile) {
        const updatedProfile = {
          ...profile,
          stats: {
            ...profile.stats,
            friendsCount: Math.max(0, profile.stats.friendsCount - 1)
          }
        };
        setProfile(updatedProfile);
      }
    }
  };
  // Handle opening message modal
  const handleOpenMessageModal = () => {
    setIsMessageModalOpen(true);
  };
  // Handle closing message modal
  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
    setMessageText('');
  };
  // Handle sending message
  const handleSendMessage = () => {
    if (messageText.trim() === '') return;
    // In a real app, you would make an API call here
    console.log(`Sending message to ${username}: ${messageText}`);
    // Mock successful message send
    setTimeout(() => {
      handleCloseMessageModal();
      // You could show a success toast/notification here
    }, 500);
  };
  // Handle navigation to edit profile
  const handleEditProfile = () => {
    // In a real app, this would navigate to the edit profile page
    // For now, we'll just log and use react-router to navigate
    console.log('Navigating to edit profile page');
    window.location.href = '/profile/edit';
  };
  // Handle navigation to settings
  const handleSettings = () => {
    // In a real app, this would navigate to the settings page
    // For now, we'll just log and use react-router to navigate
    console.log('Navigating to settings page');
    window.location.href = '/settings';
  };
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading profile...</p>
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </main>
        <Footer />
      </div>;
  }
  if (!profile) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Profile Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              The user you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/explore" className="text-blue-600 hover:text-blue-800 font-medium">
              Browse businesses
            </Link>
          </div>
        </main>
        <Footer />
      </div>;
  }
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  // Helper function to get badge icon component
  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'award':
        return <AwardIcon className="w-5 h-5" />;
      case 'camera':
        return <CameraIcon className="w-5 h-5" />;
      case 'users':
        return <UsersIcon className="w-5 h-5" />;
      case 'trending-up':
        return <TrendingUpIcon className="w-5 h-5" />;
      case 'coffee':
        return <CoffeeIcon className="w-5 h-5" />;
      case 'utensils':
        return <ShoppingBagIcon className="w-5 h-5" />;
      case 'crown':
        return <CrownIcon className="w-5 h-5" />;
      case 'zap':
        return <ZapIcon className="w-5 h-5" />;
      case 'star':
        return <StarIcon className="w-5 h-5" />;
      case 'thumbs-up':
        return <CheckCircleIcon className="w-5 h-5" />;
      default:
        return <BadgeIcon className="w-5 h-5" />;
    }
  };
  // Get achievement icon component
  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'star':
        return <StarIcon className="w-5 h-5" />;
      case 'camera':
        return <CameraIcon className="w-5 h-5" />;
      case 'users':
        return <UsersIcon className="w-5 h-5" />;
      case 'coffee':
        return <CoffeeIcon className="w-5 h-5" />;
      case 'thumbs-up':
        return <CheckCircleIcon className="w-5 h-5" />;
      case 'crown':
        return <CrownIcon className="w-5 h-5" />;
      default:
        return <TrophyIcon className="w-5 h-5" />;
    }
  };
  // Helper function to get trend icon
  const getTrendIcon = (trend: 'up' | 'down' | 'same') => {
    switch (trend) {
      case 'up':
        return <ArrowUpIcon className="w-4 h-4 text-green-500" />;
      case 'down':
        return <ArrowDownIcon className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        {/* Cover Photo */}
        <div className="relative h-[200px] md:h-[300px] overflow-hidden">
          <img src={profile.coverPhoto} alt={`${profile.name}'s cover photo`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          {/* Profile actions - only visible if it's the user's own profile */} {isCurrentUser && <div className="absolute top-4 right-4 flex space-x-2">
              <button onClick={handleEditProfile} className="bg-white/90 hover:bg-white text-gray-800 px-3 py-1.5 rounded-md text-sm font-medium flex items-center">
                <EditIcon className="w-4 h-4 mr-1.5" />
                Edit Profile
              </button>
              <button onClick={handleSettings} className="bg-white/90 hover:bg-white text-gray-800 px-3 py-1.5 rounded-md text-sm font-medium flex items-center">
                <SettingsIcon className="w-4 h-4 mr-1.5" />
                Settings
              </button>
            </div>}
        </div>
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="relative -mt-20 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6 pt-24 relative">
              <div className="absolute -top-16 left-6">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
                  <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                    {profile.isVerified && <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                        <CheckIcon className="w-3 h-3 mr-1" />
                        Verified
                      </span>} {/* Add level badge */} {profile.rewardsSummary && <span className="ml-2 bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                        <CrownIcon className="w-3 h-3 mr-1" />
                        {profile.rewardsSummary.level}
                      </span>}
                  </div>
                  <div className="text-gray-600 flex items-center mt-1">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    {profile.location}
                  </div>
                  <div className="text-gray-600 flex items-center mt-1 text-sm">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    Member since{' '} {new Date(profile.memberSince).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                  </div>
                  <p className="mt-3 text-gray-700">{profile.bio}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button onClick={handleFollowToggle} className={`${isFollowing ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' : 'bg-blue-600 hover:bg-blue-700 text-white'} px-4 py-2 rounded-md text-sm font-medium`}>
                    <UsersIcon className="w-4 h-4 inline-block mr-1.5" />
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                  <button onClick={handleOpenMessageModal} className="ml-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium">
                    <MessageSquareIcon className="w-4 h-4 inline-block mr-1.5" />
                    Message
                  </button>
                </div>
              </div>
              {/* Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6 pt-6 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {profile.stats.reviewCount}
                  </div>
                  <div className="text-sm text-gray-600">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {profile.stats.photoCount}
                  </div>
                  <div className="text-sm text-gray-600">Photos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {profile.stats.checkInCount}
                  </div>
                  <div className="text-sm text-gray-600">Check-ins</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {profile.stats.helpfulVotes}
                  </div>
                  <div className="text-sm text-gray-600">Helpful Votes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {profile.stats.friendsCount}
                  </div>
                  <div className="text-sm text-gray-600">Friends</div>
                </div>
                {/* Add points to statistics */} {profile.rewardsSummary && <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {profile.rewardsSummary.pointsBalance}
                    </div>
                    <div className="text-sm text-gray-600">Points</div>
                  </div>}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mb-10">
            {/* Main Content */}
            <div className="md:w-2/3">
              {/* Tab Navigation */}
              <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
                <div className="border-b">
                  <nav className="flex flex-wrap">
                    <button onClick={() => setActiveTab('reviews')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                      <StarIcon className="w-4 h-4 inline-block mr-1" />
                      Reviews
                    </button>
                    <button onClick={() => setActiveTab('photos')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'photos' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                      <CameraIcon className="w-4 h-4 inline-block mr-1" />
                      Photos
                    </button>
                    <button onClick={() => setActiveTab('checkins')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'checkins' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                      <CheckSquareIcon className="w-4 h-4 inline-block mr-1" />
                      Check-ins
                    </button>
                    <button onClick={() => setActiveTab('favorites')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'favorites' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                      <HeartIcon className="w-4 h-4 inline-block mr-1" />
                      Favorites
                    </button>
                    {/* New Rewards Tab */}
                    <button onClick={() => setActiveTab('rewards')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'rewards' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                      <GiftIcon className="w-4 h-4 inline-block mr-1" />
                      Rewards
                    </button>
                    {/* New Achievements Tab */}
                    <button onClick={() => setActiveTab('achievements')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'achievements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                      <TrophyIcon className="w-4 h-4 inline-block mr-1" />
                      Achievements
                    </button>
                  </nav>
                </div>
                <div className="p-4">
                  {/* View mode toggle */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">
                      {activeTab === 'reviews' && 'Reviews'} {activeTab === 'photos' && 'Photos'} {activeTab === 'checkins' && 'Check-ins'} {activeTab === 'favorites' && 'Favorites'} {activeTab === 'rewards' && 'Rewards & Loyalty'} {activeTab === 'achievements' && 'Achievements'}
                    </h2>
                    <div className="flex space-x-2">
                      <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        <ListIcon className="w-4 h-4" />
                      </button>
                      <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        <GridIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {/* Reviews Tab */} {activeTab === 'reviews' && <div className="space-y-6">
                      {profile.reviews.length === 0 ? <div className="text-center py-8">
                          <PenIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <h3 className="text-lg font-medium text-gray-700 mb-1">
                            No reviews yet
                          </h3>
                          <p className="text-gray-500">
                            This user hasn't written any reviews yet.
                          </p>
                        </div> : profile.reviews.map(review => <div key={review.id} className="border-b pb-6 last:border-b-0">
                            <div className="flex items-start">
                              <Link to={`/business/${review.businessId} `} className="flex-shrink-0">
                                <img src={review.businessImage} alt={review.businessName} className="w-16 h-16 object-cover rounded-md" />
                              </Link>
                              <div className="ml-4 flex-grow">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <Link to={`/business/${review.businessId} `} className="font-medium text-gray-900 hover:text-blue-600">
                                      {review.businessName}
                                    </Link>
                                    <div className="flex items-center mt-1">
                                      <div className="flex mr-2">
                                        {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />)}
                                      </div>
                                      <span className="text-sm text-gray-600">
                                        {formatDate(review.createdAt)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-gray-700 mt-2">
                                  {review.content}
                                </p>
                                {review.photos.length > 0 && <div className="flex gap-2 mt-3">
                                    {review.photos.map((photo, index) => <div key={index} className="w-20 h-20 overflow-hidden rounded-md">
                                        <img src={photo} alt={`Review photo ${index + 1}`} className="w-full h-full object-cover" />
                                      </div>)}
                                  </div>}
                                <div className="flex items-center mt-3 text-sm">
                                  <span className="text-gray-600">
                                    <StarIcon className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                    {review.helpfulVotes} people found this
                                    helpful
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>)}
                    </div>} {/* Photos Tab */} {activeTab === 'photos' && <div>
                      {profile.photos.length === 0 ? <div className="text-center py-8">
                          <CameraIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <h3 className="text-lg font-medium text-gray-700 mb-1">
                            No photos yet
                          </h3>
                          <p className="text-gray-500">
                            This user hasn't uploaded any photos yet.
                          </p>
                        </div> : viewMode === 'grid' ? <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {profile.photos.map(photo => <div key={photo.id} className="relative group">
                              <img src={photo.url} alt={photo.caption || `Photo at ${photo.businessName}`} className="w-full h-40 object-cover rounded-md" />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-end justify-start p-3">
                                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Link to={`/business/${photo.businessId} `} className="font-medium text-white hover:underline">
                                    {photo.businessName}
                                  </Link>
                                  <div className="text-sm">
                                    {formatDate(photo.createdAt)}
                                  </div>
                                </div>
                              </div>
                            </div>)}
                        </div> : <div className="space-y-4">
                          {profile.photos.map(photo => <div key={photo.id} className="flex items-start">
                              <div className="w-32 h-32 flex-shrink-0">
                                <img src={photo.url} alt={photo.caption || `Photo at ${photo.businessName}`} className="w-full h-full object-cover rounded-md" />
                              </div>
                              <div className="ml-4 flex-grow">
                                <Link to={`/business/${photo.businessId} `} className="font-medium text-gray-900 hover:text-blue-600">
                                  {photo.businessName}
                                </Link>
                                {photo.caption && <p className="text-gray-700 mt-1">
                                    {photo.caption}
                                  </p>}
                                <div className="text-sm text-gray-600 mt-1">
                                  {formatDate(photo.createdAt)}
                                </div>
                              </div>
                            </div>)}
                        </div>}
                    </div>} {/* Check-ins Tab */} {activeTab === 'checkins' && <div className="space-y-4">
                      {profile.checkIns.length === 0 ? <div className="text-center py-8">
                          <CheckSquareIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <h3 className="text-lg font-medium text-gray-700 mb-1">
                            No check-ins yet
                          </h3>
                          <p className="text-gray-500">
                            This user hasn't checked in anywhere yet.
                          </p>
                        </div> : profile.checkIns.map(checkIn => <div key={checkIn.id} className="flex items-start">
                            <Link to={`/business/${checkIn.businessId} `} className="flex-shrink-0">
                              <img src={checkIn.businessImage} alt={checkIn.businessName} className="w-16 h-16 object-cover rounded-md" />
                            </Link>
                            <div className="ml-4 flex-grow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <Link to={`/business/${checkIn.businessId} `} className="font-medium text-gray-900 hover:text-blue-600">
                                    {checkIn.businessName}
                                  </Link>
                                  <div className="text-sm text-gray-600 mt-1">
                                    {formatDate(checkIn.createdAt)}
                                  </div>
                                </div>
                              </div>
                              {checkIn.comment && <p className="text-gray-700 mt-2">
                                  {checkIn.comment}
                                </p>}
                            </div>
                          </div>)}
                    </div>} {/* Favorites Tab */} {activeTab === 'favorites' && <div className="space-y-4">
                      {profile.favorites.length === 0 ? <div className="text-center py-8">
                          <HeartIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <h3 className="text-lg font-medium text-gray-700 mb-1">
                            No favorites yet
                          </h3>
                          <p className="text-gray-500">
                            This user hasn't saved any favorites yet.
                          </p>
                        </div> : profile.favorites.map(favorite => <div key={favorite.id} className="flex items-start">
                            <Link to={`/business/${favorite.businessId} `} className="flex-shrink-0">
                              <img src={favorite.businessImage} alt={favorite.businessName} className="w-16 h-16 object-cover rounded-md" />
                            </Link>
                            <div className="ml-4 flex-grow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <Link to={`/business/${favorite.businessId} `} className="font-medium text-gray-900 hover:text-blue-600">
                                    {favorite.businessName}
                                  </Link>
                                  <div className="flex items-center mt-1">
                                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                                      {favorite.businessCategory}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-sm text-gray-600">
                                  Saved on {formatDate(favorite.createdAt)}
                                </div>
                              </div>
                            </div>
                          </div>)}
                    </div>} {/* Rewards Tab */} {activeTab === 'rewards' && profile.rewardsSummary && <div className="space-y-6">
                      {/* Rewards Summary */}
                      <div className="bg-white border rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-3">
                          Rewards Summary
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="text-sm text-blue-700 mb-1">
                              Current Balance
                            </div>
                            <div className="text-2xl font-bold text-blue-900">
                              {profile.rewardsSummary.pointsBalance} pts
                            </div>
                            <div className="text-xs text-blue-600 mt-1">
                              {profile.rewardsSummary.lifetimePoints} lifetime
                              points
                            </div>
                          </div>
                          <div className="bg-amber-50 rounded-lg p-3">
                            <div className="text-sm text-amber-700 mb-1">
                              Current Level
                            </div>
                            <div className="text-xl font-bold text-amber-900">
                              {profile.rewardsSummary.level}
                            </div>
                            <div className="text-xs text-amber-600 mt-1">
                              Next: {profile.rewardsSummary.nextLevel}
                            </div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3">
                            <div className="text-sm text-green-700 mb-1">
                              Level Progress
                            </div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-green-800 font-medium">
                                {profile.rewardsSummary.pointsToNextLevel} {' '}
                                points to next level
                              </span>
                              <span className="text-green-800 font-medium">
                                {profile.rewardsSummary.progressPercentage}%
                              </span>
                            </div>
                            <div className="w-full bg-green-200 rounded-full h-2.5">
                              <div className="bg-green-600 h-2.5 rounded-full" style={{
                            width: `${profile.rewardsSummary.progressPercentage} %`
                          }}></div>
                            </div>
                          </div>
                        </div>
                        <h4 className="font-medium text-gray-800 mb-2">
                          Recent Activity
                        </h4>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          {profile.rewardsSummary.recentPointsActivity.map(activity => <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                <div className="flex items-center">
                                  {activity.type === 'earned' ? <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                      <PlusIcon className="w-4 h-4 text-green-600" />
                                    </div> : activity.type === 'spent' ? <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                      <GiftIcon className="w-4 h-4 text-blue-600" />
                                    </div> : <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                      <XIcon className="w-4 h-4 text-gray-600" />
                                    </div>}
                                  <div>
                                    <div className="text-sm font-medium">
                                      {activity.source}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {formatDate(activity.date)}
                                    </div>
                                  </div>
                                </div>
                                <div className={`font-medium ${activity.type === 'earned' ? 'text-green-600' : 'text-blue-600'} `}>
                                  {activity.type === 'earned' ? '+' : '-'} {activity.amount} pts
                                </div>
                              </div>)}
                        </div>
                      </div>
                      {/* Loyalty Memberships */} {profile.loyaltyMemberships && profile.loyaltyMemberships.length > 0 && <div className="bg-white border rounded-lg p-4">
                            <h3 className="text-lg font-semibold mb-3">
                              Loyalty Program Memberships
                            </h3>
                            <div className="space-y-4">
                              {profile.loyaltyMemberships.map(membership => <div key={membership.id} className="border rounded-lg overflow-hidden">
                                  <div className="flex items-center p-4 border-b">
                                    <img src={membership.businessImage} alt={membership.businessName} className="w-12 h-12 rounded-md object-cover mr-4" />
                                    <div className="flex-grow">
                                      <Link to={`/business/${membership.businessId} `} className="font-medium text-gray-900 hover:text-blue-600">
                                        {membership.businessName}
                                      </Link>
                                      <div className="flex items-center mt-1">
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${membership.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' : membership.tier === 'Silver' ? 'bg-gray-100 text-gray-800' : 'bg-amber-100 text-amber-800'} `}>
                                          {membership.tier} Member
                                        </span>
                                        <span className="ml-2 text-xs text-gray-500">
                                          Since{' '} {new Date(membership.memberSince).toLocaleDateString('en-US', {
                                  month: 'short',
                                  year: 'numeric'
                                })}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-lg font-bold">
                                        {membership.pointsBalance}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        points
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-4 bg-gray-50">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                                      Membership Perks
                                    </h4>
                                    <ul className="space-y-1">
                                      {membership.perks.map((perk, index) => <li key={index} className="text-sm text-gray-600 flex items-start">
                                          <CheckIcon className="w-4 h-4 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                                          {perk}
                                        </li>)}
                                    </ul>
                                  </div>
                                </div>)}
                            </div>
                          </div>}
                    </div>} {/* Achievements Tab */} {activeTab === 'achievements' && profile.achievements && <div className="space-y-6">
                      {/* In Progress Achievements */}
                      <div className="bg-white border rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-3">
                          In Progress
                        </h3>
                        <div className="space-y-4">
                          {profile.achievements.filter(a => !a.completed).map(achievement => <div key={achievement.id} className="border rounded-lg p-4">
                                <div className="flex items-start">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${achievement.category === 'dining' ? 'bg-orange-100 text-orange-600' : achievement.category === 'exploration' ? 'bg-green-100 text-green-600' : achievement.category === 'social' ? 'bg-blue-100 text-blue-600' : achievement.category === 'loyalty' ? 'bg-purple-100 text-purple-600' : 'bg-yellow-100 text-yellow-600'} `}>
                                    {getAchievementIcon(achievement.icon)}
                                  </div>
                                  <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h4 className="font-medium text-gray-900">
                                          {achievement.name}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                          {achievement.description}
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <span className="text-sm font-medium text-blue-600">
                                          {achievement.points} pts
                                        </span>
                                      </div>
                                    </div>
                                    <div className="mt-2">
                                      <div className="flex items-center justify-between text-xs mb-1">
                                        <span className="text-gray-600">
                                          Progress
                                        </span>
                                        <span className="font-medium">
                                          {achievement.progress} /{' '} {achievement.total}
                                        </span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-600 h-2 rounded-full" style={{
                                  width: `${achievement.progress / achievement.total * 100} %`
                                }}></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>)}
                        </div>
                      </div>
                      {/* Completed Achievements */}
                      <div className="bg-white border rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-3">
                          Completed
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {profile.achievements.filter(a => a.completed).map(achievement => <div key={achievement.id} className="border rounded-lg p-4 bg-gray-50">
                                <div className="flex items-start">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${achievement.category === 'dining' ? 'bg-orange-100 text-orange-600' : achievement.category === 'exploration' ? 'bg-green-100 text-green-600' : achievement.category === 'social' ? 'bg-blue-100 text-blue-600' : achievement.category === 'loyalty' ? 'bg-purple-100 text-purple-600' : 'bg-yellow-100 text-yellow-600'} `}>
                                    {getAchievementIcon(achievement.icon)}
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900">
                                      {achievement.name}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                      {achievement.description}
                                    </p>
                                    <div className="mt-1 flex items-center">
                                      <CheckCircleIcon className="w-4 h-4 text-green-500 mr-1" />
                                      <span className="text-xs text-gray-500">
                                        Completed on{' '} {formatDate(achievement.earnedAt || '')}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>)}
                        </div>
                      </div>
                    </div>}
                </div>
              </div>
            </div>
            {/* Sidebar */}
            <div className="md:w-1/3 space-y-6">
              {/* Rewards Summary - Added to sidebar */} {profile.rewardsSummary && <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Rewards Summary</h2>
                    <GiftIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-600">Points Balance:</span>
                      <span className="text-xl font-bold text-blue-600">
                        {profile.rewardsSummary.pointsBalance}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Current Level:</span>
                      <span className="font-medium">
                        {profile.rewardsSummary.level}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Next Level:</span>
                      <span>{profile.rewardsSummary.nextLevel}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{
                    width: `${profile.rewardsSummary.progressPercentage} %`
                  }}></div>
                    </div>
                    <div className="text-xs text-center text-gray-600">
                      {profile.rewardsSummary.pointsToNextLevel} points needed
                      for next level
                    </div>
                  </div>
                  <button onClick={() => setActiveTab('rewards')} className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
                    View Rewards
                  </button>
                </div>} {/* Leaderboard Position - New */} {profile.leaderboardPosition && <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Leaderboard</h2>
                    <BarChart2Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-purple-700">Your Rank</div>
                        <div className="flex items-center">
                          <span className="text-2xl font-bold text-purple-900">
                            {profile.leaderboardPosition.rank}
                          </span>
                          <span className="text-sm text-purple-700 ml-1">
                            / {profile.leaderboardPosition.totalParticipants}
                          </span>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border-4 border-purple-200">
                        <CrownIcon className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="mt-1 flex items-center text-sm">
                      <span className="text-purple-700">
                        Category: {profile.leaderboardPosition.category}
                      </span>
                      <span className="ml-auto flex items-center">
                        {getTrendIcon(profile.leaderboardPosition.trend)}
                        <span className={`ml-1 ${profile.leaderboardPosition.trend === 'up' ? 'text-green-600' : profile.leaderboardPosition.trend === 'down' ? 'text-red-600' : 'text-gray-600'} `}>
                          {profile.leaderboardPosition.trend === 'up' ? 'Trending Up' : profile.leaderboardPosition.trend === 'down' ? 'Trending Down' : 'Stable'}
                        </span>
                      </span>
                    </div>
                  </div>
                  {/* Friends comparison */}
                  <div className="space-y-3">
                    {profile.leaderboardPosition.friendsAhead.length > 0 && <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                          Friends Ahead
                        </h3>
                        {profile.leaderboardPosition.friendsAhead.map(friend => <Link key={friend.id} to={`/profile/${friend.username}`} className="flex items-center mb-2 last:mb-0">
                              <img src={friend.avatar} alt={friend.name} className="w-8 h-8 rounded-full mr-2" />
                              <div className="text-sm">{friend.name}</div>
                            </Link>)}
                      </div>} {profile.leaderboardPosition.friendsBehind.length > 0 && <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                          Friends Behind
                        </h3>
                        {profile.leaderboardPosition.friendsBehind.map(friend => <Link key={friend.id} to={`/profile/${friend.username}`} className="flex items-center mb-2 last:mb-0">
                              <img src={friend.avatar} alt={friend.name} className="w-8 h-8 rounded-full mr-2" />
                              <div className="text-sm">{friend.name}</div>
                            </Link>)}
                      </div>}
                  </div>
                  <div className="mt-4 text-center">
                    <Link to="/leaderboards" className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center justify-center">
                      View Full Leaderboards
                      <ChevronRightIcon className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>} {/* Badges */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Badges</h2>
                  <AwardIcon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {profile.badges.slice(0, 4).map(badge => <div key={badge.id} className="bg-gray-50 rounded-lg p-3 flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                        {getBadgeIcon(badge.icon)}
                      </div>
                      <div className="font-medium text-sm">{badge.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(badge.earnedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric'
                    })}
                      </div>
                    </div>)}
                </div>
                {profile.badges.length > 4 && <button onClick={() => setActiveTab('achievements')} className="w-full text-blue-600 hover:text-blue-800 text-sm font-medium py-2">
                    View All {profile.badges.length} Badges
                  </button>}
              </div>
              {/* Achievement Highlights - New */} {profile.achievements && <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">
                      Achievement Highlights
                    </h2>
                    <TrophyIcon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="space-y-3">
                    {profile.achievements.filter(a => a.completed || a.progress / a.total > 0.5).slice(0, 3).map(achievement => <div key={achievement.id} className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${achievement.category === 'dining' ? 'bg-orange-100 text-orange-600' : achievement.category === 'exploration' ? 'bg-green-100 text-green-600' : achievement.category === 'social' ? 'bg-blue-100 text-blue-600' : achievement.category === 'loyalty' ? 'bg-purple-100 text-purple-600' : 'bg-yellow-100 text-yellow-600'} `}>
                            {getAchievementIcon(achievement.icon)}
                          </div>
                          <div className="flex-grow">
                            <div className="font-medium text-sm">
                              {achievement.name}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-gray-600">
                                {achievement.description}
                              </div>
                              {achievement.completed ? <CheckCircleIcon className="w-4 h-4 text-green-500 ml-1" /> : <span className="text-xs font-medium">
                                  {Math.round(achievement.progress / achievement.total * 100)}
                                  %
                                </span>}
                            </div>
                            {!achievement.completed && <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                <div className="bg-amber-500 h-1.5 rounded-full" style={{
                        width: `${achievement.progress / achievement.total * 100} %`
                      }}></div>
                              </div>}
                          </div>
                        </div>)}
                  </div>
                  <div className="mt-4 text-center">
                    <button onClick={() => setActiveTab('achievements')} className="text-amber-600 hover:text-amber-800 text-sm font-medium flex items-center justify-center mx-auto">
                      View All Achievements
                      <ChevronRightIcon className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>} {/* Friends */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Friends</h2>
                  <UsersIcon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {profile.friends.map(friend => <Link key={friend.id} to={`/profile/${friend.username}`} className="flex items-center">
                      <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full mr-2" />
                      <div className="overflow-hidden">
                        <div className="font-medium text-sm truncate">
                          {friend.name}
                        </div>
                      </div>
                    </Link>)}
                </div>
                <div className="mt-4 text-center">
                  <Link to={`/profile/${profile.username} /friends`} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center">
                    View all {profile.stats.friendsCount} friends
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {/* Message Modal */} {isMessageModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Message {profile?.name}</h3>
              <button onClick={handleCloseMessageModal} className="text-gray-500 hover:text-gray-700">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4">
              <textarea value={messageText} onChange={e => setMessageText(e.target.value)} placeholder={`Write a message to ${profile?.name} ...`} className="w-full border border-gray-300 rounded-md px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div className="flex justify-end space-x-3">
              <button onClick={handleCloseMessageModal} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleSendMessage} disabled={messageText.trim() === ''} className={`px-4 py-2 rounded-md flex items-center ${messageText.trim() === '' ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>
                <SendIcon className="w-4 h-4 mr-1.5" />
                Send
              </button>
            </div>
          </div>
        </div>}
    </div>;
}
