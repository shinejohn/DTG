import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { CrownIcon, GiftIcon, PercentIcon, TrophyIcon, ZapIcon, StarIcon, CheckIcon, BookmarkIcon, ClipboardIcon, TicketIcon, ChevronRightIcon, CopyIcon, QrCodeIcon, FilterIcon, SearchIcon, BellIcon, ArrowRightIcon, BadgeIcon, AwardIcon, LayersIcon, CheckSquareIcon, BarChart2Icon } from 'lucide-react';
// Mock data for user rewards
// TODO: Replace mock data with Supabase query in loader
// Original declaration removed: const mockUserRewards = {...
  totalPoints: 1250,
  memberSince: '2023-01-15',
  loyaltyPrograms: [{
    id: 'lp1',
    businessId: 'b1',
    businessName: 'Urban Bites Café',
    businessLogo: '/images/placeholder.jpg',
    programName: 'Urban Bites Rewards',
    currentTier: 'Bronze',
    points: 150,
    nextTier: 'Silver',
    pointsToNextTier: 350,
    joinDate: '2023-03-10',
    lastActivity: '2023-05-20'
  }, {
    id: 'lp2',
    businessId: 'b2',
    businessName: 'Downtown Fitness',
    businessLogo: '/images/placeholder.jpg',
    programName: 'Fitness Rewards',
    currentTier: 'Silver',
    points: 650,
    nextTier: 'Gold',
    pointsToNextTier: 850,
    joinDate: '2023-02-05',
    lastActivity: '2023-05-15'
  }],
  coupons: [{
    id: 'c1',
    businessId: 'b1',
    businessName: 'Urban Bites Café',
    businessLogo: '/images/placeholder.jpg',
    code: 'SUMMER20',
    title: 'Summer Special: 20% Off',
    description: 'Get 20% off on all menu items this summer!',
    expiryDate: '2023-08-31',
    isUsed: false,
    savedDate: '2023-05-10'
  }, {
    id: 'c2',
    businessId: 'b1',
    businessName: 'Urban Bites Café',
    businessLogo: '/images/placeholder.jpg',
    code: 'WELCOME10',
    title: 'New Customer: $10 Off First Order',
    description: 'Welcome! Enjoy $10 off your first order with us.',
    expiryDate: '2023-12-31',
    isUsed: true,
    savedDate: '2023-04-15',
    usedDate: '2023-04-20'
  }, {
    id: 'c3',
    businessId: 'b2',
    businessName: 'Downtown Fitness',
    businessLogo: '/images/placeholder.jpg',
    code: 'FIT25',
    title: '25% Off Membership',
    description: '25% off your next membership renewal',
    expiryDate: '2023-09-15',
    isUsed: false,
    savedDate: '2023-05-01'
  }],
  achievements: [{
    id: 'a1',
    businessId: 'b1',
    businessName: 'Urban Bites Café',
    businessLogo: '/images/placeholder.jpg',
    name: 'Coffee Enthusiast',
    description: 'Ordered 10 different coffee drinks',
    icon: 'coffee',
    category: 'dining',
    points: 150,
    completedDate: '2023-04-10'
  }, {
    id: 'a2',
    businessId: 'b1',
    businessName: 'Urban Bites Café',
    businessLogo: '/images/placeholder.jpg',
    name: 'Social Butterfly',
    description: 'Checked in with 5 different friends',
    icon: 'users',
    category: 'social',
    points: 250,
    completedDate: '2023-05-05'
  }, {
    id: 'a3',
    businessId: 'b2',
    businessName: 'Downtown Fitness',
    businessLogo: '/images/placeholder.jpg',
    name: 'Fitness Fanatic',
    description: 'Completed 20 workouts in a month',
    icon: 'activity',
    category: 'fitness',
    points: 300,
    completedDate: '2023-03-30'
  }],
  pointsHistory: [{
    id: 'ph1',
    businessId: 'b1',
    businessName: 'Urban Bites Café',
    businessLogo: '/images/placeholder.jpg',
    points: 25,
    type: 'earned',
    reason: 'Check-in',
    date: '2023-05-20'
  }, {
    id: 'ph2',
    businessId: 'b1',
    businessName: 'Urban Bites Café',
    businessLogo: '/images/placeholder.jpg',
    points: 50,
    type: 'earned',
    reason: 'Wrote a review',
    date: '2023-05-15'
  }, {
    id: 'ph3',
    businessId: 'b1',
    businessName: 'Urban Bites Café',
    businessLogo: '/images/placeholder.jpg',
    points: 150,
    type: 'redeemed',
    reason: 'Free Coffee',
    date: '2023-05-10'
  }, {
    id: 'ph4',
    businessId: 'b2',
    businessName: 'Downtown Fitness',
    businessLogo: '/images/placeholder.jpg',
    points: 100,
    type: 'earned',
    reason: 'Completed a challenge',
    date: '2023-05-05'
  }]
};
export function Rewards() {
  const [activeTab, setActiveTab] = useState<'programs' | 'coupons' | 'achievements' | 'history'>('programs');
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<any | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const getDaysLeft = (dateString: string) => {
    const expiryDate = new Date(dateString);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'coffee':
        return <CoffeeIcon className="w-5 h-5" />;
      case 'users':
        return <UsersIcon className="w-5 h-5" />;
      case 'activity':
        return <BarChart2Icon className="w-5 h-5" />;
      default:
        return <AwardIcon className="w-5 h-5" />;
    }
  };
  const openCouponModal = (coupon: any) => {
    setSelectedCoupon(coupon);
    setShowCouponModal(true);
    setShowQRCode(false);
  };
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Rewards</h1>
          <p className="text-gray-600 mt-1">
            Track your loyalty programs, coupons, and achievements
          </p>
        </div>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg shadow-sm p-4 text-white">
            <div className="flex items-center mb-2">
              <ZapIcon className="w-6 h-6 mr-2" />
              <h2 className="font-bold text-lg">Total Points</h2>
            </div>
            <div className="text-3xl font-bold mb-1">
              {mockUserRewards.totalPoints}
            </div>
            <p className="text-amber-100 text-sm">
              Member since {formatDate(mockUserRewards.memberSince)}
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-sm p-4 text-white">
            <div className="flex items-center mb-2">
              <TicketIcon className="w-6 h-6 mr-2" />
              <h2 className="font-bold text-lg">Saved Coupons</h2>
            </div>
            <div className="text-3xl font-bold mb-1">
              {mockUserRewards.coupons.filter(c => !c.isUsed).length}
            </div>
            <p className="text-blue-100 text-sm">
              {mockUserRewards.coupons.filter(c => c.isUsed).length} coupons
              used
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-sm p-4 text-white">
            <div className="flex items-center mb-2">
              <TrophyIcon className="w-6 h-6 mr-2" />
              <h2 className="font-bold text-lg">Achievements</h2>
            </div>
            <div className="text-3xl font-bold mb-1">
              {mockUserRewards.achievements.length}
            </div>
            <p className="text-purple-100 text-sm">
              Across{' '}
              {new Set(mockUserRewards.achievements.map(a => a.businessId)).size}{' '}
              businesses
            </p>
          </div>
        </div>
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="border-b">
            <nav className="flex">
              <button onClick={() => setActiveTab('programs')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'programs' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                <CrownIcon className="w-4 h-4 inline-block mr-1" />
                Loyalty Programs
              </button>
              <button onClick={() => setActiveTab('coupons')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'coupons' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                <PercentIcon className="w-4 h-4 inline-block mr-1" />
                Coupons
              </button>
              <button onClick={() => setActiveTab('achievements')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'achievements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                <BadgeIcon className="w-4 h-4 inline-block mr-1" />
                Achievements
              </button>
              <button onClick={() => setActiveTab('history')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                <LayersIcon className="w-4 h-4 inline-block mr-1" />
                Points History
              </button>
            </nav>
          </div>
          {/* Loyalty Programs Tab */}
          {activeTab === 'programs' && <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Your Loyalty Programs</h2>
                <div className="flex items-center">
                  <div className="relative mr-2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <input type="text" placeholder="Search programs" className="pl-10 pr-3 py-1.5 text-sm border border-gray-300 rounded-md" />
                  </div>
                  <button className="p-1.5 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
                    <FilterIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {mockUserRewards.loyaltyPrograms.map(program => <div key={program.id} className="border rounded-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center">
                        <img src={program.businessLogo} alt={program.businessName} className="w-12 h-12 rounded-full object-cover mr-4" />
                        <div className="flex-grow">
                          <h3 className="font-semibold text-gray-900">
                            {program.programName}
                          </h3>
                          <Link to={`/business/${program.businessId}`} className="text-sm text-gray-600 hover:text-blue-600">
                            {program.businessName}
                          </Link>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Joined</div>
                          <div className="text-sm font-medium">
                            {formatDate(program.joinDate)}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <div className="w-5 h-5 rounded-full mr-2" style={{
                        backgroundColor: program.currentTier === 'Bronze' ? '#CD7F32' : program.currentTier === 'Silver' ? '#C0C0C0' : '#FFD700'
                      }}></div>
                            <span className="font-medium">
                              {program.currentTier} Tier
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {program.points} /{' '}
                            {program.points + program.pointsToNextTier} points
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{
                      width: `${program.points / (program.points + program.pointsToNextTier) * 100}%`
                    }}></div>
                        </div>
                        <div className="mt-1 text-sm text-gray-600">
                          {program.pointsToNextTier} more points to reach{' '}
                          {program.nextTier}
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Last activity:</span>{' '}
                          {formatDate(program.lastActivity)}
                        </div>
                        <Link to={`/business/${program.businessId}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                          View Program
                          <ChevronRightIcon className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>}
          {/* Coupons Tab */}
          {activeTab === 'coupons' && <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Your Coupons</h2>
                <div className="flex items-center">
                  <div className="relative mr-2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <input type="text" placeholder="Search coupons" className="pl-10 pr-3 py-1.5 text-sm border border-gray-300 rounded-md" />
                  </div>
                  <button className="p-1.5 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
                    <FilterIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-md font-medium text-gray-700">
                  Active Coupons
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockUserRewards.coupons.filter(coupon => !coupon.isUsed).map(coupon => <div key={coupon.id} className="border rounded-lg overflow-hidden">
                        <div className="p-4">
                          <div className="flex items-center mb-3">
                            <img src={coupon.businessLogo} alt={coupon.businessName} className="w-10 h-10 rounded-full object-cover mr-3" />
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {coupon.businessName}
                              </h4>
                              <div className="text-xs text-gray-600">
                                Saved on {formatDate(coupon.savedDate)}
                              </div>
                            </div>
                          </div>
                          <div className="bg-blue-50 rounded-lg p-3 mb-3">
                            <h3 className="font-semibold text-blue-800">
                              {coupon.title}
                            </h3>
                            <p className="text-sm text-blue-700 mt-1">
                              {coupon.description}
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Expires:</span>{' '}
                              {formatDate(coupon.expiryDate)}
                              <br />
                              <span className={`${getDaysLeft(coupon.expiryDate) < 7 ? 'text-red-600 font-medium' : ''}`}>
                                {getDaysLeft(coupon.expiryDate) > 0 ? `${getDaysLeft(coupon.expiryDate)} days left` : 'Expires today!'}
                              </span>
                            </div>
                            <button onClick={() => openCouponModal(coupon)} className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">
                              View Coupon
                            </button>
                          </div>
                        </div>
                      </div>)}
                </div>
                <h3 className="text-md font-medium text-gray-700 mt-6">
                  Used Coupons
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockUserRewards.coupons.filter(coupon => coupon.isUsed).map(coupon => <div key={coupon.id} className="border rounded-lg overflow-hidden bg-gray-50">
                        <div className="p-4">
                          <div className="flex items-center mb-3">
                            <img src={coupon.businessLogo} alt={coupon.businessName} className="w-10 h-10 rounded-full object-cover mr-3 opacity-70" />
                            <div>
                              <h4 className="font-medium text-gray-700">
                                {coupon.businessName}
                              </h4>
                              <div className="text-xs text-gray-500">
                                Used on {formatDate(coupon.usedDate || '')}
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-100 rounded-lg p-3 mb-3">
                            <h3 className="font-semibold text-gray-700">
                              {coupon.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {coupon.description}
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                              <span className="font-medium">Expired:</span>{' '}
                              {formatDate(coupon.expiryDate)}
                            </div>
                            <div className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-sm font-medium">
                              Used
                            </div>
                          </div>
                        </div>
                      </div>)}
                </div>
              </div>
            </div>}
          {/* Achievements Tab */}
          {activeTab === 'achievements' && <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Your Achievements</h2>
                <div className="flex items-center">
                  <div className="relative mr-2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <input type="text" placeholder="Search achievements" className="pl-10 pr-3 py-1.5 text-sm border border-gray-300 rounded-md" />
                  </div>
                  <button className="p-1.5 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
                    <FilterIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockUserRewards.achievements.map(achievement => <div key={achievement.id} className="border rounded-lg p-4">
                    <div className="flex items-start">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${achievement.category === 'dining' ? 'bg-orange-100 text-orange-600' : achievement.category === 'social' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                        {getAchievementIcon(achievement.icon)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">
                            {achievement.name}
                          </h3>
                          <div className="text-purple-600 font-medium text-sm flex items-center">
                            <ZapIcon className="w-4 h-4 mr-1" />
                            {achievement.points} pts
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {achievement.description}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center">
                            <img src={achievement.businessLogo} alt={achievement.businessName} className="w-6 h-6 rounded-full object-cover mr-2" />
                            <span className="text-xs text-gray-600">
                              {achievement.businessName}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Completed on {formatDate(achievement.completedDate)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>}
          {/* Points History Tab */}
          {activeTab === 'history' && <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Points History</h2>
                <div className="flex items-center">
                  <div className="relative mr-2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <input type="text" placeholder="Search history" className="pl-10 pr-3 py-1.5 text-sm border border-gray-300 rounded-md" />
                  </div>
                  <button className="p-1.5 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
                    <FilterIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {mockUserRewards.pointsHistory.map(entry => <div key={entry.id} className="border rounded-lg p-4">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${entry.type === 'earned' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {entry.type === 'earned' ? <ZapIcon className="w-5 h-5" /> : <GiftIcon className="w-5 h-5" />}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {entry.type === 'earned' ? 'Earned' : 'Redeemed'}:{' '}
                              {entry.reason}
                            </h3>
                            <div className="flex items-center text-sm text-gray-600">
                              <img src={entry.businessLogo} alt={entry.businessName} className="w-4 h-4 rounded-full object-cover mr-1" />
                              {entry.businessName}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-semibold ${entry.type === 'earned' ? 'text-green-600' : 'text-red-600'}`}>
                              {entry.type === 'earned' ? '+' : '-'}
                              {entry.points} pts
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatDate(entry.date)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>}
        </div>
      </main>
      {/* Coupon Modal */}
      {showCouponModal && selectedCoupon && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Coupon Details
                </h3>
                <button onClick={() => setShowCouponModal(false)} className="text-gray-400 hover:text-gray-600">
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="text-center mb-4">
                <div className="flex items-center justify-center mb-3">
                  <img src={selectedCoupon.businessLogo} alt={selectedCoupon.businessName} className="w-16 h-16 rounded-full object-cover" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">
                  {selectedCoupon.businessName}
                </h4>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-blue-800 text-lg mb-1">
                    {selectedCoupon.title}
                  </h4>
                  <p className="text-blue-700">{selectedCoupon.description}</p>
                </div>
                {showQRCode ? <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4">
                    <div className="bg-white p-2 rounded-md w-48 h-48 mx-auto mb-2">
                      {/* This would be a real QR code in production */}
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <QrCodeIcon className="w-24 h-24 text-gray-500" />
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Show this QR code to the staff to redeem your coupon
                    </p>
                    <button onClick={() => setShowQRCode(false)} className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Show Coupon Code
                    </button>
                  </div> : <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4">
                    <div className="text-2xl font-bold font-mono mb-2">
                      {selectedCoupon.code}
                    </div>
                    <div className="flex justify-center space-x-3">
                      <button className="flex items-center text-gray-600 hover:text-gray-800">
                        <CopyIcon className="w-4 h-4 mr-1" />
                        Copy
                      </button>
                      <button onClick={() => setShowQRCode(true)} className="flex items-center text-gray-600 hover:text-gray-800">
                        <QrCodeIcon className="w-4 h-4 mr-1" />
                        QR Code
                      </button>
                    </div>
                  </div>}
                <div className="text-sm text-gray-600 mb-4">
                  <div className="mb-1">
                    <span className="font-medium">Expires:</span>{' '}
                    {formatDate(selectedCoupon.expiryDate)}
                  </div>
                  <div className="mb-1">
                    <span className="font-medium">Saved on:</span>{' '}
                    {formatDate(selectedCoupon.savedDate)}
                  </div>
                </div>
                {/* Usage Status */}
                {selectedCoupon.isUsed && <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-center">
                      <CheckIcon className="w-5 h-5 text-gray-600 mr-2" />
                      <p className="text-sm text-gray-700 font-medium">
                        Used on {formatDate(selectedCoupon.usedDate || '')}
                      </p>
                    </div>
                  </div>}
              </div>
              <div className="flex justify-between">
                <button onClick={() => setShowCouponModal(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  Close
                </button>
                {!selectedCoupon.isUsed && <Link to={`/business/${selectedCoupon.businessId}`} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Go to Business
                  </Link>}
              </div>
            </div>
          </div>
        </div>}
      <Footer />
    </div>;
}