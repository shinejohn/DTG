import React, { useState } from 'react';
import { HomeIcon, SearchIcon, UserIcon, BuildingIcon, SettingsIcon, ShareIcon, ChevronUpIcon, PlusIcon, XIcon, CompassIcon, StarIcon, HeartIcon, GiftIcon, PercentIcon, CrownIcon, TrophyIcon, TargetIcon, UsersIcon, CreditCardIcon, ShieldIcon, MessageSquareIcon, CalendarIcon, BarChartIcon, TagIcon, LayoutDashboardIcon, PencilIcon, DollarSignIcon, LinkIcon, StoreIcon } from 'lucide-react';
import { SocialShareModal } from './SocialShareModal';
export default function FloatingNavigation() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('main');
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const openShareModal = e => {
    e.stopPropagation();
    setIsShareModalOpen(true);
  };
  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };
  const navigationCategories = [{
    id: 'main',
    label: 'Main',
    items: [{
      to: '/',
      icon: <HomeIcon className="w-5 h-5 text-blue-600 mb-1" />,
      label: 'Home'
    }, {
      to: '/explore',
      icon: <CompassIcon className="w-5 h-5 text-blue-600 mb-1" />,
      label: 'Explore'
    }, {
      to: '/search',
      icon: <SearchIcon className="w-5 h-5 text-blue-600 mb-1" />,
      label: 'Search'
    }, {
      to: '/business/urban-bites-cafe',
      icon: <StoreIcon className="w-5 h-5 text-blue-600 mb-1" />,
      label: 'Business Detail'
    }, {
      to: '/profile/sarahjohnson',
      icon: <UserIcon className="w-5 h-5 text-blue-600 mb-1" />,
      label: 'Profile'
    }, {
      to: '/favorites',
      icon: <HeartIcon className="w-5 h-5 text-blue-600 mb-1" />,
      label: 'Favorites'
    }, {
      to: '/settings',
      icon: <SettingsIcon className="w-5 h-5 text-blue-600 mb-1" />,
      label: 'Settings'
    }]
  }, {
    id: 'rewards',
    label: 'Rewards',
    items: [{
      to: '/rewards',
      icon: <GiftIcon className="w-5 h-5 text-purple-600 mb-1" />,
      label: 'Rewards'
    }, {
      to: '/deals',
      icon: <PercentIcon className="w-5 h-5 text-purple-600 mb-1" />,
      label: 'Deals'
    }, {
      to: '/achievements',
      icon: <TrophyIcon className="w-5 h-5 text-purple-600 mb-1" />,
      label: 'Achievements'
    }, {
      to: '/leaderboards',
      icon: <CrownIcon className="w-5 h-5 text-purple-600 mb-1" />,
      label: 'Leaderboards'
    }, {
      to: '/challenges',
      icon: <TargetIcon className="w-5 h-5 text-purple-600 mb-1" />,
      label: 'Challenges'
    }, {
      to: '/referrals',
      icon: <UsersIcon className="w-5 h-5 text-purple-600 mb-1" />,
      label: 'Referrals'
    }]
  }, {
    id: 'business',
    label: 'Business',
    items: [{
      to: '/business/dashboard',
      icon: <LayoutDashboardIcon className="w-5 h-5 text-green-600 mb-1" />,
      label: 'Dashboard'
    }, {
      to: '/business/profile/edit',
      icon: <BuildingIcon className="w-5 h-5 text-green-600 mb-1" />,
      label: 'Profile'
    }, {
      to: '/business/analytics',
      icon: <BarChartIcon className="w-5 h-5 text-green-600 mb-1" />,
      label: 'Analytics'
    }, {
      to: '/business/events',
      icon: <CalendarIcon className="w-5 h-5 text-green-600 mb-1" />,
      label: 'Events'
    }, {
      to: '/business/promotions',
      icon: <TagIcon className="w-5 h-5 text-green-600 mb-1" />,
      label: 'Promotions'
    }, {
      to: '/business/coupons',
      icon: <PercentIcon className="w-5 h-5 text-green-600 mb-1" />,
      label: 'Coupons'
    }, {
      to: '/business/loyalty',
      icon: <CrownIcon className="w-5 h-5 text-green-600 mb-1" />,
      label: 'Loyalty'
    }, {
      to: '/business/integrations',
      icon: <LinkIcon className="w-5 h-5 text-green-600 mb-1" />,
      label: 'Integrations'
    }]
  }, {
    id: 'account',
    label: 'Account',
    items: [{
      to: '/login',
      icon: <UserIcon className="w-5 h-5 text-orange-600 mb-1" />,
      label: 'Login'
    }, {
      to: '/register',
      icon: <PencilIcon className="w-5 h-5 text-orange-600 mb-1" />,
      label: 'Register'
    }, {
      to: '/pricing',
      icon: <DollarSignIcon className="w-5 h-5 text-orange-600 mb-1" />,
      label: 'Pricing'
    }, {
      to: '/billing',
      icon: <CreditCardIcon className="w-5 h-5 text-orange-600 mb-1" />,
      label: 'Billing'
    }, {
      action: openShareModal,
      icon: <ShareIcon className="w-5 h-5 text-orange-600 mb-1" />,
      label: 'Share'
    }]
  }, {
    id: 'admin',
    label: 'Admin',
    items: [{
      to: '/admin',
      icon: <ShieldIcon className="w-5 h-5 text-red-600 mb-1" />,
      label: 'Dashboard'
    }, {
      to: '/admin/moderation',
      icon: <MessageSquareIcon className="w-5 h-5 text-red-600 mb-1" />,
      label: 'Moderation'
    }]
  }];
  return <>
      <div className="fixed bottom-6 right-6 z-50">
        {isExpanded && <div className="bg-white rounded-lg shadow-lg mb-4 overflow-hidden">
            <div className="p-3 border-b">
              <h3 className="text-sm font-medium">Quick Navigation</h3>
            </div>
            {/* Category Tabs */}
            <div className="flex border-b overflow-x-auto">
              {navigationCategories.map(category => <button key={category.id} className={`px-3 py-2 text-sm font-medium whitespace-nowrap ${activeCategory === category.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`} onClick={() => setActiveCategory(category.id)}>
                  {category.label}
                </button>)}
            </div>
            {/* Navigation Grid */}
            <div className="p-2">
              {navigationCategories.map(category => <div key={category.id} className={`grid grid-cols-3 gap-2 ${activeCategory === category.id ? 'block' : 'hidden'}`}>
                  {category.items.map((item, index) => item.to ? <Link key={index} to={item.to} className="flex flex-col items-center p-2 rounded hover:bg-gray-100">
                        {item.icon}
                        <span className="text-xs">{item.label}</span>
                      </Link> : <button key={index} onClick={item.action} className="flex flex-col items-center p-2 rounded hover:bg-gray-100">
                        {item.icon}
                        <span className="text-xs">{item.label}</span>
                      </button>)}
                </div>)}
            </div>
            <div className="p-3 border-t">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Share this with friends!
                </span>
                <button onClick={toggleExpand} className="text-gray-500 hover:text-gray-700">
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>}
        <button onClick={toggleExpand} className={`flex items-center justify-center p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all ${isExpanded ? 'rotate-180' : ''}`}>
          {isExpanded ? <ChevronUpIcon className="w-6 h-6" /> : <PlusIcon className="w-6 h-6" />}
        </button>
      </div>
      <SocialShareModal isOpen={isShareModalOpen} onClose={closeShareModal} title="Downtown Guide" description="Check out this awesome local guide app!" url={window.location.href} imageUrl="https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" />
    </>;
}
