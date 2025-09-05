import { Link } from "react-router";
import React, { useEffect, useState } from 'react';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '../../../components/dtg/Header';
import { Footer } from '../../../components/dtg/Footer';
import { LayoutDashboardIcon, BuildingIcon, CalendarIcon, SettingsIcon, UsersIcon, MessageSquareIcon, ImageIcon, BellIcon, TagIcon, PlusIcon, ChevronRightIcon, ClockIcon, CalendarRangeIcon, PercentIcon, CheckIcon, XIcon, EyeIcon, UserIcon, HeartIcon, BarChart2Icon, AlertTriangleIcon, FileTextIcon, ArrowRightIcon, SearchIcon, FilterIcon, ChevronDownIcon, EditIcon, TrashIcon, CopyIcon, PauseIcon, PlayIcon, ShoppingBagIcon, CoffeeIcon, UtensilsIcon, GiftIcon, DollarSignIcon, InfoIcon } from 'lucide-react';
// Types
interface Business {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  logo?: string;
}
interface Promotion {
  id: string;
  title: string;
  description: string;
  type: 'discount' | 'bogo' | 'freebie' | 'special' | 'event';
  discountType?: 'percentage' | 'fixed';
  discountValue?: number;
  code?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isPaused?: boolean;
  isRecurring?: boolean;
  recurrencePattern?: string;
  targetAudience?: string;
  redemptionLimit?: number;
  redemptionCount: number;
  viewCount: number;
  saveCount: number;
  imageUrl?: string;
}

const promotionTemplates = [{
  id: 't1',
  title: 'Percentage Discount',
  description: 'Offer a percentage off the total purchase',
  type: 'discount',
  icon: <PercentIcon className="w-6 h-6 text-blue-500" />
}, {
  id: 't2',
  title: 'Fixed Amount Off',
  description: 'Offer a fixed dollar amount off the purchase',
  type: 'discount',
  icon: <DollarSignIcon className="w-6 h-6 text-green-500" />
}, {
  id: 't3',
  title: 'Buy One Get One',
  description: 'Customer buys one item and gets another free or discounted',
  type: 'bogo',
  icon: <ShoppingBagIcon className="w-6 h-6 text-purple-500" />
}, {
  id: 't4',
  title: 'Free Item',
  description: 'Offer a free item with purchase or for first-time customers',
  type: 'freebie',
  icon: <GiftIcon className="w-6 h-6 text-red-500" />
}, {
  id: 't5',
  title: 'Happy Hour',
  description: 'Special pricing during specific hours',
  type: 'special',
  icon: <CoffeeIcon className="w-6 h-6 text-orange-500" />
}, {
  id: 't6',
  title: 'Special Event',
  description: 'Promotion tied to a special event or holiday',
  type: 'event',
  icon: <CalendarIcon className="w-6 h-6 text-indigo-500" />
}];
export default function BusinessPromotions() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'paused'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [formData, setFormData] = useState<Partial<Promotion>>({
    title: '',
    description: '',
    type: 'discount',
    discountType: 'percentage',
    discountValue: 10,
    code: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isActive: true,
    isRecurring: false,
    targetAudience: 'All customers',
    redemptionLimit: 0
  });
  // Fetch business data
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use the mock data
    setLoading(true);
    setTimeout(() => {
      setBusiness(mockBusiness);
      setPromotions(mockPromotions);
      setLoading(false);
    }, 500);
  }, []);
  const handleCreatePromotion = () => {
    setView('create');
    setSelectedPromotion(null);
    setFormData({
      title: '',
      description: '',
      type: 'discount',
      discountType: 'percentage',
      discountValue: 10,
      code: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isActive: true,
      isRecurring: false,
      targetAudience: 'All customers',
      redemptionLimit: 0
    });
  };
  const handleEditPromotion = (promotion: Promotion) => {
    setView('edit');
    setSelectedPromotion(promotion);
    setFormData(promotion);
  };
  const handleSavePromotion = () => {
    // In a real app, this would send data to an API
    if (view === 'create') {
      const newPromotion: Promotion = {
        id: `p${Date.now()}`,
        ...(formData as any),
        redemptionCount: 0,
        viewCount: 0,
        saveCount: 0
      };
      setPromotions([...promotions, newPromotion]);
    } else if (view === 'edit' && selectedPromotion) {
      const updatedPromotions = promotions.map(p => p.id === selectedPromotion.id ? {
        ...p,
        ...formData
      } : p);
      setPromotions(updatedPromotions);
    }
    setView('list');
  };
  const handleDeletePromotion = (id: string) => {
    // In a real app, this would send a delete request to an API
    const updatedPromotions = promotions.filter(p => p.id !== id);
    setPromotions(updatedPromotions);
  };
  const handleTogglePromotionStatus = (id: string, field: 'isActive' | 'isPaused') => {
    const updatedPromotions = promotions.map(p => {
      if (p.id === id) {
        if (field === 'isActive') {
          return {
            ...p,
            isActive: !p.isActive
          };
        } else if (field === 'isPaused') {
          return {
            ...p,
            isPaused: !p.isPaused
          };
        }
      }
      return p;
    });
    setPromotions(updatedPromotions);
  };
  const handleDuplicatePromotion = (promotion: Promotion) => {
    const duplicatedPromotion: Promotion = {
      ...promotion,
      id: `p${Date.now()}`,
      title: `${promotion.title} (Copy)`,
      redemptionCount: 0,
      viewCount: 0,
      saveCount: 0
    };
    setPromotions([...promotions, duplicatedPromotion]);
  };
  const handleSelectTemplate = (templateId: string) => {
    const template = promotionTemplates.find(t => t.id === templateId);
    if (template) {
      setFormData({
        ...formData,
        type: template.type as any,
        title: template.title,
        description: `Enter description for your ${template.title.toLowerCase()} promotion`
      });
      setShowTemplates(false);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value,
      type
    } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  const filteredPromotions = promotions.filter(promotion => {
    // Filter by status
    if (filter === 'active' && (!promotion.isActive || promotion.isPaused)) return false;
    if (filter === 'inactive' && promotion.isActive) return false;
    if (filter === 'paused' && (!promotion.isPaused || !promotion.isActive)) return false;
    // Filter by search term
    if (searchTerm && !promotion.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading promotions...</p>
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </main>
        <Footer />
      </div>;
  }
  if (!business) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Business Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              We couldn't find your business information.
            </p>
            <Link to="/business/register" className="text-blue-600 hover:text-blue-800 font-medium">
              Register Your Business
            </Link>
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
              {business.logo ? <img src={business.logo} alt={business.name} className="w-10 h-10 rounded-full mr-3 object-cover" /> : <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <BuildingIcon className="w-5 h-5 text-blue-600" />
                </div>}
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
                <li>
                  <Link to="/business/reviews" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                    <MessageSquareIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link to="/business/photos" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
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
                  <Link to="/business/promotions" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700">
                    <TagIcon className="w-5 h-5 mr-3 text-blue-500" />
                    Promotions
                  </Link>
                </li>
                <li>
                  <Link to="/business/analytics" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                    <BarChart2Icon className="w-5 h-5 mr-3 text-gray-500" />
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link to="/business/events" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                    <CalendarIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Events
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
                <li>
                  <Link to="/business/notifications" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                    <BellIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Notifications
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-grow p-4 md:p-6">
          {/* Promotions List View */} {view === 'list' && <>
              {/* Page Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold">Promotions</h1>
                  <p className="text-gray-600">
                    Create and manage special offers for your customers
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button onClick={handleCreatePromotion} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                    <PlusIcon className="w-5 h-5 mr-1" />
                    Create Promotion
                  </button>
                </div>
              </div>
              {/* Filters and Search */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                    <button onClick={() => setFilter('all')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${filter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      All Promotions
                    </button>
                    <button onClick={() => setFilter('active')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${filter === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      Active
                    </button>
                    <button onClick={() => setFilter('paused')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${filter === 'paused' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      Paused
                    </button>
                    <button onClick={() => setFilter('inactive')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${filter === 'inactive' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      Inactive
                    </button>
                  </div>
                  <div className="relative">
                    <input type="text" placeholder="Search promotions..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64" />
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
              </div>
              {/* Promotions List */} {filteredPromotions.length === 0 ? <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <TagIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No promotions found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm ? `No promotions match "${searchTerm}"` : "You haven't created any promotions yet."}
                  </p>
                  <button onClick={handleCreatePromotion} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                    <PlusIcon className="w-5 h-5 mr-1" />
                    Create Your First Promotion
                  </button>
                </div> : <div className="space-y-4">
                  {filteredPromotions.map(promotion => <div key={promotion.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="md:flex">
                        {/* Promotion Image */} {promotion.imageUrl && <div className="md:w-1/4 h-48 md:h-auto">
                            <img src={promotion.imageUrl} alt={promotion.title} className="w-full h-full object-cover" />
                          </div>} {/* Promotion Details */}
                        <div className={`p-4 ${promotion.imageUrl ? 'md:w-3/4' : 'w-full'} `}>
                          <div className="flex flex-wrap items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center">
                                <h3 className="text-lg font-semibold">
                                  {promotion.title}
                                </h3>
                                {promotion.isActive && !promotion.isPaused && <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                    Active
                                  </span>} {promotion.isActive && promotion.isPaused && <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                    Paused
                                  </span>} {!promotion.isActive && <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                                    Inactive
                                  </span>} {promotion.isRecurring && <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                                    Recurring
                                  </span>}
                              </div>
                              <p className="text-gray-600 mt-1">
                                {promotion.description}
                              </p>
                            </div>
                            <div className="flex mt-2 md:mt-0">
                              <div className="dropdown relative">
                                <button className="p-2 hover:bg-gray-100 rounded-full">
                                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                                </button>
                                {/* Dropdown menu would go here in a real implementation */}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                            {promotion.code && <div className="flex items-center">
                                <TagIcon className="w-4 h-4 mr-1" />
                                Code:{' '}
                                <span className="font-medium ml-1">
                                  {promotion.code}
                                </span>
                              </div>}
                            <div className="flex items-center">
                              <CalendarRangeIcon className="w-4 h-4 mr-1" />
                              {new Date(promotion.startDate).toLocaleDateString()} {' '}
                              -{' '} {new Date(promotion.endDate).toLocaleDateString()}
                            </div>
                            {promotion.targetAudience && <div className="flex items-center">
                                <UserIcon className="w-4 h-4 mr-1" />
                                {promotion.targetAudience}
                              </div>}
                          </div>
                          <div className="flex flex-wrap gap-6 mb-4">
                            <div className="flex items-center">
                              <EyeIcon className="w-4 h-4 text-gray-500 mr-1" />
                              <span className="text-sm">
                                {promotion.viewCount} views
                              </span>
                            </div>
                            <div className="flex items-center">
                              <HeartIcon className="w-4 h-4 text-gray-500 mr-1" />
                              <span className="text-sm">
                                {promotion.saveCount} saves
                              </span>
                            </div>
                            <div className="flex items-center">
                              <CheckIcon className="w-4 h-4 text-gray-500 mr-1" />
                              <span className="text-sm">
                                {promotion.redemptionCount} redemptions
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button onClick={() => handleEditPromotion(promotion)} className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 flex items-center">
                              <EditIcon className="w-4 h-4 mr-1" />
                              Edit
                            </button>
                            {promotion.isActive ? promotion.isPaused ? <button onClick={() => handleTogglePromotionStatus(promotion.id, 'isPaused')} className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 flex items-center">
                                  <PlayIcon className="w-4 h-4 mr-1" />
                                  Resume
                                </button> : <button onClick={() => handleTogglePromotionStatus(promotion.id, 'isPaused')} className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 flex items-center">
                                  <PauseIcon className="w-4 h-4 mr-1" />
                                  Pause
                                </button> : null}
                            <button onClick={() => handleTogglePromotionStatus(promotion.id, 'isActive')} className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center ${promotion.isActive ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100' : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'}`}>
                              {promotion.isActive ? <>
                                  <XIcon className="w-4 h-4 mr-1" />
                                  Deactivate
                                </> : <>
                                  <CheckIcon className="w-4 h-4 mr-1" />
                                  Activate
                                </>}
                            </button>
                            <button onClick={() => handleDuplicatePromotion(promotion)} className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 flex items-center">
                              <CopyIcon className="w-4 h-4 mr-1" />
                              Duplicate
                            </button>
                            <button onClick={() => handleDeletePromotion(promotion.id)} className="px-3 py-1.5 bg-white border border-gray-300 text-red-600 text-sm font-medium rounded-md hover:bg-gray-50 flex items-center">
                              <TrashIcon className="w-4 h-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>)}
                </div>} {/* Promotion Analytics Summary */}
              <div className="mt-8 bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-semibold mb-4">
                  Promotion Performance Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600">Total Views</p>
                        <h3 className="text-2xl font-bold text-blue-800">
                          {promotions.reduce((sum, p) => sum + p.viewCount, 0).toLocaleString()}
                        </h3>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-full">
                        <EyeIcon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-600">
                          Total Redemptions
                        </p>
                        <h3 className="text-2xl font-bold text-green-800">
                          {promotions.reduce((sum, p) => sum + p.redemptionCount, 0).toLocaleString()}
                        </h3>
                      </div>
                      <div className="p-3 bg-green-100 rounded-full">
                        <CheckIcon className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-purple-600">
                          Conversion Rate
                        </p>
                        <h3 className="text-2xl font-bold text-purple-800">
                          {promotions.reduce((sum, p) => sum + p.viewCount, 0) > 0 ? (promotions.reduce((sum, p) => sum + p.redemptionCount, 0) / promotions.reduce((sum, p) => sum + p.viewCount, 0) * 100).toFixed(1) + '%' : '0%'}
                        </h3>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-full">
                        <BarChart2Icon className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <Link to="/business/analytics" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    View detailed promotion analytics
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </>} {/* Create/Edit Promotion Form */} {(view === 'create' || view === 'edit') && <>
              {/* Page Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold">
                    {view === 'create' ? 'Create Promotion' : 'Edit Promotion'}
                  </h1>
                  <p className="text-gray-600">
                    {view === 'create' ? 'Create a new special offer for your customers' : 'Update your existing promotion'}
                  </p>
                </div>
                <button onClick={() => setView('list')} className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50">
                  Cancel
                </button>
              </div>
              {/* Promotion Templates */} {view === 'create' && !showTemplates && <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">
                      Start with a Template
                    </h2>
                    <button onClick={() => setShowTemplates(!showTemplates)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Browse Templates
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div onClick={() => handleSelectTemplate('t1')} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center mb-2">
                        <PercentIcon className="w-6 h-6 text-blue-500 mr-2" />
                        <h3 className="font-medium">Percentage Discount</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        Offer a percentage off purchases to attract new
                        customers
                      </p>
                    </div>
                    <div onClick={() => handleSelectTemplate('t3')} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center mb-2">
                        <ShoppingBagIcon className="w-6 h-6 text-purple-500 mr-2" />
                        <h3 className="font-medium">Buy One Get One</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        Encourage larger orders with a BOGO promotion
                      </p>
                    </div>
                    <div onClick={() => handleSelectTemplate('t5')} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center mb-2">
                        <CoffeeIcon className="w-6 h-6 text-orange-500 mr-2" />
                        <h3 className="font-medium">Happy Hour Special</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        Drive traffic during slower hours with special pricing
                      </p>
                    </div>
                  </div>
                </div>} {/* Template Selection */} {showTemplates && <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Choose a Template</h2>
                    <button onClick={() => setShowTemplates(false)} className="text-gray-600 hover:text-gray-800">
                      <XIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {promotionTemplates.map(template => <div key={template.id} onClick={() => handleSelectTemplate(template.id)} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center mb-2">
                          {template.icon}
                          <h3 className="font-medium ml-2">{template.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          {template.description}
                        </p>
                      </div>)}
                  </div>
                </div>} {/* Promotion Form */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Basic Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                          Promotion Title*
                        </label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., Summer Sale, Happy Hour Special" />
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                          Description*
                        </label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Describe your promotion in detail"></textarea>
                      </div>
                      <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                          Promotion Type*
                        </label>
                        <select id="type" name="type" value={formData.type} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option value="discount">Discount</option>
                          <option value="bogo">Buy One Get One</option>
                          <option value="freebie">Free Item</option>
                          <option value="special">Special Offer</option>
                          <option value="event">Event Promotion</option>
                        </select>
                      </div>
                      {formData.type === 'discount' && <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="discountType" className="block text-sm font-medium text-gray-700 mb-1">
                              Discount Type
                            </label>
                            <select id="discountType" name="discountType" value={formData.discountType} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                              <option value="percentage">Percentage</option>
                              <option value="fixed">Fixed Amount</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700 mb-1">
                              {formData.discountType === 'percentage' ? 'Percentage (%)' : 'Amount ($)'}
                            </label>
                            <input type="number" id="discountValue" name="discountValue" value={formData.discountValue} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" min="0" step={formData.discountType === 'percentage' ? '1' : '0.01'} />
                          </div>
                        </div>}
                      <div>
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                          Promotion Code
                        </label>
                        <input type="text" id="code" name="code" value={formData.code} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., SUMMER20, WELCOME" />
                        <p className="mt-1 text-xs text-gray-500">
                          Leave blank if no code is needed to redeem this offer
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Schedule & Targeting */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Schedule & Targeting
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date*
                          </label>
                          <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                            End Date*
                          </label>
                          <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                          Activate promotion immediately
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="isRecurring" name="isRecurring" checked={formData.isRecurring} onChange={handleInputChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                        <label htmlFor="isRecurring" className="ml-2 block text-sm text-gray-700">
                          This is a recurring promotion
                        </label>
                      </div>
                      {formData.isRecurring && <div>
                          <label htmlFor="recurrencePattern" className="block text-sm font-medium text-gray-700 mb-1">
                            Recurrence Pattern
                          </label>
                          <select id="recurrencePattern" name="recurrencePattern" value={formData.recurrencePattern} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="Daily">Daily</option>
                            <option value="Weekdays only">Weekdays only</option>
                            <option value="Weekends only">Weekends only</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                          </select>
                        </div>}
                      <div>
                        <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-1">
                          Target Audience
                        </label>
                        <select id="targetAudience" name="targetAudience" value={formData.targetAudience} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option value="All customers">All customers</option>
                          <option value="New customers">New customers</option>
                          <option value="Returning customers">
                            Returning customers
                          </option>
                          <option value="VIP customers">VIP customers</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="redemptionLimit" className="block text-sm font-medium text-gray-700 mb-1">
                          Redemption Limit per Customer
                        </label>
                        <input type="number" id="redemptionLimit" name="redemptionLimit" value={formData.redemptionLimit} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" min="0" />
                        <p className="mt-1 text-xs text-gray-500">
                          Enter 0 for unlimited redemptions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Promotion Image Upload */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">
                    Promotion Image
                  </h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input type="file" id="image-upload" accept="image/jpeg, image/png" className="hidden" />
                    <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
                      <span className="text-gray-600 font-medium mb-1">
                        Drag an image here or click to upload
                      </span>
                      <span className="text-gray-500 text-sm">
                        Recommended size: 1200 x 600 pixels
                      </span>
                    </label>
                  </div>
                </div>
                {/* Tips for Effective Promotions */}
                <div className="mt-6 pt-6 border-t">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <div className="flex items-start">
                      <InfoIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">
                          Tips for Effective Promotions
                        </h4>
                        <ul className="mt-2 text-sm text-blue-700 list-disc list-inside space-y-1">
                          <li>
                            Use clear, compelling titles that highlight the
                            value
                          </li>
                          <li>Set a reasonable time limit to create urgency</li>
                          <li>
                            Target specific customer segments for better results
                          </li>
                          <li>
                            Add high-quality images to make your promotion stand
                            out
                          </li>
                          <li>
                            Analyze performance and adjust future promotions
                            accordingly
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Form Actions */}
                <div className="mt-6 pt-6 border-t flex justify-end space-x-3">
                  <button onClick={() => setView('list')} className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50">
                    Cancel
                  </button>
                  <button onClick={handleSavePromotion} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                    {view === 'create' ? 'Create Promotion' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </>}
        </main>
      </div>
      <Footer />
    </div>;
}
