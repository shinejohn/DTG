import type { Route } from './+types/route';
import React, { useEffect, useState, memo } from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '../../../components/dtg/Header';
import { Footer } from '../../../components/dtg/Footer';
import { LayoutDashboardIcon, BuildingIcon, TagIcon, BarChart2Icon, UsersIcon, SettingsIcon, PlusIcon, FilterIcon, SearchIcon, CalendarIcon, ArrowRightIcon, CheckIcon, XIcon, EyeIcon, ShoppingBagIcon, PercentIcon, TrendingUpIcon, TrendingDownIcon, RefreshCwIcon, DollarSignIcon, UserPlusIcon, ChevronDownIcon, ChevronRightIcon, ChevronLeftIcon, QrCodeIcon, CopyIcon, DownloadIcon, EditIcon, TrashIcon, SlidersIcon, AlertTriangleIcon, ZapIcon, ClipboardIcon, PrinterIcon, CheckCircleIcon, ChevronUpIcon, ImageIcon, LayersIcon, CreditCardIcon, GiftIcon, InfoIcon } from 'lucide-react';
// Types
interface Coupon {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: {
    type: 'percentage' | 'fixed' | 'bogo' | 'free';
    value: number;
  };
  constraints: {
    minPurchase?: number;
    maxDiscount?: number;
    limitPerUser?: number;
    limitTotal?: number;
    usedCount: number;
  };
  targeting: {
    customerSegment?: string[];
    newCustomersOnly?: boolean;
    minimumPurchaseHistory?: number;
  };
  validity: {
    startDate: string;
    endDate: string;
    isActive: boolean;
  };
  performance: {
    views: number;
    clicks: number;
    redemptions: number;
    revenue: number;
    averageOrderValue: number;
    newCustomers: number;
  };
  createdAt: string;
  lastModified: string;
  template?: string;
  categoryTags: string[];
  displayOptions: {
    primaryColor: string;
    secondaryColor?: string;
    image?: string;
  };
}
interface CouponTemplate {
  id: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed' | 'bogo' | 'free';
  defaultDiscount: number;
  image: string;
  primaryColor: string;
  secondaryColor?: string;
  popularityScore: number;
  categoryTags: string[];
}
interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  count: number;
  criteria: string[];
}

export default function BusinessCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [templates, setTemplates] = useState<CouponTemplate[]>([]);
  const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'creation' | 'analytics'>('active');
  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [isCreatingCoupon, setIsCreatingCoupon] = useState(false);
  const [creationStep, setCreationStep] = useState(1);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'performance' | 'expiring'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCouponsForBulk, setSelectedCouponsForBulk] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  // New coupon form state
  const [newCoupon, setNewCoupon] = useState<Partial<Coupon>>({
    title: '',
    description: '',
    code: '',
    discount: {
      type: 'percentage',
      value: 15
    },
    constraints: {
      minPurchase: 0,
      maxDiscount: 0,
      limitPerUser: 1,
      limitTotal: 0,
      usedCount: 0
    },
    targeting: {
      customerSegment: ['all'],
      newCustomersOnly: false
    },
    validity: {
      startDate: new Date().toISOString(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
      isActive: true
    },
    categoryTags: [],
    displayOptions: {
      primaryColor: '#2196F3',
      secondaryColor: '#E3F2FD'
    }
  });
  // Analytics time range
  const [analyticsTimeRange, setAnalyticsTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  // Fetch data
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use the mock data
    setLoading(true);
    setTimeout(() => {
      setCoupons(mockCoupons);
      setTemplates(mockTemplates);
      setCustomerSegments(mockCustomerSegments);
      setLoading(false);
    }, 500);
  }, []);
  // Filter coupons based on search and filters
  const filteredCoupons = coupons.filter(coupon => {
    // Filter by status
    if (filterStatus === 'active' && !coupon.validity.isActive) return false;
    if (filterStatus === 'inactive' && coupon.validity.isActive) return false;
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return coupon.title.toLowerCase().includes(query) || coupon.description.toLowerCase().includes(query) || coupon.code.toLowerCase().includes(query) || coupon.categoryTags.some(tag => tag.toLowerCase().includes(query));
    }
    return true;
  });
  // Sort coupons
  const sortedCoupons = [...filteredCoupons].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'performance':
        return b.performance.redemptions / b.performance.views - a.performance.redemptions / a.performance.views;
      case 'expiring':
        return new Date(a.validity.endDate).getTime() - new Date(b.validity.endDate).getTime();
      default:
        return 0;
    }
  });
  // Handle coupon selection for bulk actions
  const toggleCouponSelection = (couponId: string) => {
    setSelectedCouponsForBulk(prev => {
      if (prev.includes(couponId)) {
        return prev.filter(id => id !== couponId);
      } else {
        return [...prev, couponId];
      }
    });
  };
  // Handle bulk actions
  const handleBulkAction = (action: 'activate' | 'deactivate' | 'delete') => {
    if (selectedCouponsForBulk.length === 0) return;
    // In a real app, this would send a request to the API
    // For now, we'll update the local state
    switch (action) {
      case 'activate':
        setCoupons(prev => prev.map(coupon => selectedCouponsForBulk.includes(coupon.id) ? {
          ...coupon,
          validity: {
            ...coupon.validity,
            isActive: true
          }
        } : coupon));
        break;
      case 'deactivate':
        setCoupons(prev => prev.map(coupon => selectedCouponsForBulk.includes(coupon.id) ? {
          ...coupon,
          validity: {
            ...coupon.validity,
            isActive: false
          }
        } : coupon));
        break;
      case 'delete':
        setCoupons(prev => prev.filter(coupon => !selectedCouponsForBulk.includes(coupon.id)));
        break;
    }
    // Clear selection after action
    setSelectedCouponsForBulk([]);
    setShowBulkActions(false);
  };
  // Generate a random coupon code
  const generateCouponCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewCoupon(prev => ({
      ...prev,
      code
    }));
  };
  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setNewCoupon(prev => ({
        ...prev,
        discount: {
          type: template.type,
          value: template.defaultDiscount
        },
        displayOptions: {
          primaryColor: template.primaryColor,
          secondaryColor: template.secondaryColor,
          image: template.image
        },
        categoryTags: [...template.categoryTags]
      }));
    }
    setCreationStep(2);
  };
  // Handle form submission
  const handleCreateCoupon = () => {
    // In a real app, this would send a request to the API
    // For now, we'll update the local state
    const newCouponFull: Coupon = {
      id: `c${coupons.length + 1}`,
      title: newCoupon.title || 'New Coupon',
      description: newCoupon.description || '',
      code: newCoupon.code || 'NEWCODE',
      discount: newCoupon.discount || {
        type: 'percentage',
        value: 10
      },
      constraints: newCoupon.constraints || {
        minPurchase: 0,
        maxDiscount: 0,
        limitPerUser: 1,
        limitTotal: 0,
        usedCount: 0
      },
      targeting: newCoupon.targeting || {
        customerSegment: ['all'],
        newCustomersOnly: false
      },
      validity: newCoupon.validity || {
        startDate: new Date().toISOString(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
        isActive: true
      },
      performance: {
        views: 0,
        clicks: 0,
        redemptions: 0,
        revenue: 0,
        averageOrderValue: 0,
        newCustomers: 0
      },
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      template: selectedTemplateId || undefined,
      categoryTags: newCoupon.categoryTags || [],
      displayOptions: newCoupon.displayOptions || {
        primaryColor: '#2196F3'
      }
    };
    setCoupons(prev => [newCouponFull, ...prev]);
    // Reset form
    setNewCoupon({
      title: '',
      description: '',
      code: '',
      discount: {
        type: 'percentage',
        value: 15
      },
      constraints: {
        minPurchase: 0,
        maxDiscount: 0,
        limitPerUser: 1,
        limitTotal: 0,
        usedCount: 0
      },
      targeting: {
        customerSegment: ['all'],
        newCustomersOnly: false
      },
      validity: {
        startDate: new Date().toISOString(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
        isActive: true
      },
      categoryTags: [],
      displayOptions: {
        primaryColor: '#2196F3',
        secondaryColor: '#E3F2FD'
      }
    });
    setSelectedTemplateId(null);
    setCreationStep(1);
    setIsCreatingCoupon(false);
    setActiveTab('active');
  };
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  // Calculate days left until expiration
  const getDaysLeft = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  // Calculate redemption rate
  const getRedemptionRate = (views: number, redemptions: number) => {
    if (views === 0) return 0;
    return (redemptions / views * 100).toFixed(1);
  };
  // Get discount display text
  const getDiscountText = (discount: {
    type: string;
    value: number;
  }) => {
    switch (discount.type) {
      case 'percentage':
        return `${discount.value}% off`;
      case 'fixed':
        return `$${discount.value} off`;
      case 'bogo':
        return 'Buy one get one free';
      case 'free':
        return 'Free item';
      default:
        return `${discount.value}% off`;
    }
  };
  // Toggle coupon active status
  const toggleCouponStatus = (couponId: string) => {
    setCoupons(prev => prev.map(coupon => coupon.id === couponId ? {
      ...coupon,
      validity: {
        ...coupon.validity,
        isActive: !coupon.validity.isActive
      }
    } : coupon));
  };
  // Delete coupon
  const deleteCoupon = (couponId: string) => {
    setCoupons(prev => prev.filter(coupon => coupon.id !== couponId));
  };
  // Show QR code modal
  const showQrCodeModal = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setShowQrModal(true);
  };
  // Calculate total performance metrics
  const totalPerformance = coupons.reduce((acc, coupon) => {
    acc.views += coupon.performance.views;
    acc.redemptions += coupon.performance.redemptions;
    acc.revenue += coupon.performance.revenue;
    acc.newCustomers += coupon.performance.newCustomers;
    return acc;
  }, {
    views: 0,
    redemptions: 0,
    revenue: 0,
    newCustomers: 0
  });
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading coupon manager...</p>
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
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
                  <Link to="/business/coupons" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700">
                    <PercentIcon className="w-5 h-5 mr-3 text-blue-500" />
                    Coupons
                  </Link>
                </li>
                <li>
                  <Link to="/business/loyalty" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                    <GiftIcon className="w-5 h-5 mr-3 text-gray-500" />
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
                <h1 className="text-2xl font-bold">Coupon Manager</h1>
                <p className="text-gray-600">
                  Create and manage coupon campaigns for your business
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                {!isCreatingCoupon && <button onClick={() => {
                setIsCreatingCoupon(true);
                setActiveTab('creation');
              } } className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Create New Coupon
                  </button>}
              </div>
            </div>
          </div>
          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            <div className="border-b">
              <nav className="flex">
                <button onClick={() => {
                setActiveTab('active');
                setIsCreatingCoupon(false);
              } } className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'active' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <TagIcon className="w-4 h-4 inline-block mr-1" />
                  Active Coupons
                </button>
                <button onClick={() => {
                setActiveTab('creation');
                setIsCreatingCoupon(true);
              } } className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'creation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <PlusIcon className="w-4 h-4 inline-block mr-1" />
                  Create Coupon
                </button>
                <button onClick={() => {
                setActiveTab('analytics');
                setIsCreatingCoupon(false);
              } } className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'analytics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <BarChart2Icon className="w-4 h-4 inline-block mr-1" />
                  Analytics
                </button>
              </nav>
            </div>
          </div>
          {/* Active Coupons Tab */} {activeTab === 'active' && <div>
              {/* Filters and Search */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    <div className="relative">
                      <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as any)} className="pl-10 pr-4 py-2 border rounded-md text-sm appearance-none">
                        <option value="all">All Status</option>
                        <option value="active">Active Only</option>
                        <option value="inactive">Inactive Only</option>
                      </select>
                      <FilterIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                    </div>
                    <div className="relative">
                      <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="pl-10 pr-4 py-2 border rounded-md text-sm appearance-none">
                        <option value="newest">Newest First</option>
                        <option value="performance">Best Performing</option>
                        <option value="expiring">Expiring Soon</option>
                      </select>
                      <SlidersIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                  <div className="relative flex-grow max-w-md">
                    <input type="text" placeholder="Search coupons..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 border rounded-md w-full text-sm" />
                    <SearchIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                  </div>
                </div>
                {/* Bulk Actions */} {selectedCouponsForBulk.length > 0 && <div className="mt-4 pt-4 border-t flex flex-wrap items-center justify-between">
                    <div className="text-sm">
                      <span className="font-medium">
                        {selectedCouponsForBulk.length}
                      </span>{' '}
                      coupons selected
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleBulkAction('activate')} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-md text-sm font-medium flex items-center">
                        <CheckIcon className="w-4 h-4 mr-1" />
                        Activate
                      </button>
                      <button onClick={() => handleBulkAction('deactivate')} className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-md text-sm font-medium flex items-center">
                        <XIcon className="w-4 h-4 mr-1" />
                        Deactivate
                      </button>
                      <button onClick={() => handleBulkAction('delete')} className="px-3 py-1.5 bg-red-100 text-red-700 rounded-md text-sm font-medium flex items-center">
                        <TrashIcon className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>}
              </div>
              {/* Coupons List */} {sortedCoupons.length === 0 ? <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <PercentIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No coupons found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery ? 'No coupons match your search criteria.' : "You haven't created any coupons yet."}
                  </p>
                  <button onClick={() => {
              setIsCreatingCoupon(true);
              setActiveTab('creation');
            } } className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                    <PlusIcon className="w-4 h-4 mr-1.5" />
                    Create Your First Coupon
                  </button>
                </div> : <div className="space-y-4">
                  {sortedCoupons.map(coupon => <div key={coupon.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="p-4 border-b flex items-start justify-between">
                        <div className="flex items-start">
                          <input type="checkbox" checked={selectedCouponsForBulk.includes(coupon.id)} onChange={() => toggleCouponSelection(coupon.id)} className="mt-1 mr-3" />
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {coupon.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <span className={`text-sm px-2 py-0.5 rounded-full ${coupon.validity.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} `}>
                                {coupon.validity.isActive ? 'Active' : 'Inactive'}
                              </span>
                              <span className="text-sm text-gray-600">
                                {getDiscountText(coupon.discount)}
                              </span>
                              <span className="text-sm text-gray-600">
                                Code:{' '}
                                <span className="font-medium">
                                  {coupon.code}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => showQrCodeModal(coupon)} className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded" title="QR Code">
                            <QrCodeIcon className="w-5 h-5" />
                          </button>
                          <button onClick={() => toggleCouponStatus(coupon.id)} className={`p-1.5 rounded ${coupon.validity.isActive ? 'text-green-500 hover:text-green-700 hover:bg-green-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`} title={coupon.validity.isActive ? 'Deactivate' : 'Activate'}>
                            {coupon.validity.isActive ? <CheckCircleIcon className="w-5 h-5" /> : <XIcon className="w-5 h-5" />}
                          </button>
                          <button onClick={() => deleteCoupon(coupon.id)} className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded" title="Delete">
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <h4 className="text-xs font-medium text-gray-500 mb-1">
                              Validity Period
                            </h4>
                            <div className="flex items-center">
                              <CalendarIcon className="w-4 h-4 text-gray-600 mr-1.5" />
                              <span className="text-sm">
                                {formatDate(coupon.validity.startDate)} -{' '} {formatDate(coupon.validity.endDate)}
                              </span>
                            </div>
                            {coupon.validity.isActive && getDaysLeft(coupon.validity.endDate) > 0 && <div className="text-xs text-gray-600 mt-1">
                                  {getDaysLeft(coupon.validity.endDate)} days
                                  remaining
                                </div>} {coupon.validity.isActive && getDaysLeft(coupon.validity.endDate) <= 0 && <div className="text-xs text-red-600 mt-1">
                                  Expired
                                </div>}
                          </div>
                          <div>
                            <h4 className="text-xs font-medium text-gray-500 mb-1">
                              Constraints
                            </h4>
                            <div className="space-y-1">
                              {coupon.constraints.minPurchase > 0 && <div className="flex items-center text-sm text-gray-600">
                                  <DollarSignIcon className="w-3.5 h-3.5 mr-1" />
                                  Min. purchase: $
                                  {coupon.constraints.minPurchase}
                                </div>} {coupon.constraints.limitPerUser > 0 && <div className="flex items-center text-sm text-gray-600">
                                  <UserPlusIcon className="w-3.5 h-3.5 mr-1" />
                                  {coupon.constraints.limitPerUser} per customer
                                </div>} {coupon.constraints.limitTotal > 0 && <div className="flex items-center text-sm text-gray-600">
                                  <LayersIcon className="w-3.5 h-3.5 mr-1" />
                                  {coupon.constraints.usedCount}/
                                  {coupon.constraints.limitTotal} used
                                </div>}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-medium text-gray-500 mb-1">
                              Performance
                            </h4>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Views:</span>
                                <span className="font-medium">
                                  {coupon.performance.views}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">
                                  Redemptions:
                                </span>
                                <span className="font-medium">
                                  {coupon.performance.redemptions}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">
                                  Conversion:
                                </span>
                                <span className="font-medium">
                                  {getRedemptionRate(coupon.performance.views, coupon.performance.redemptions)}
                                  %
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {coupon.targeting.customerSegment && coupon.targeting.customerSegment.length > 0 && <div className="mt-3 pt-3 border-t">
                              <h4 className="text-xs font-medium text-gray-500 mb-1">
                                Target Audience
                              </h4>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {coupon.targeting.customerSegment.map((segment, index) => <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                                      {segment === 'all' ? 'All Customers' : segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                    </span>)} {coupon.targeting.newCustomersOnly && <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                                    New Customers Only
                                  </span>}
                              </div>
                            </div>}
                      </div>
                    </div>)}
                </div>}
            </div>} {/* Create Coupon Tab */} {activeTab === 'creation' && isCreatingCoupon && <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6 border-b pb-4">
                <h2 className="text-xl font-bold">Create New Coupon</h2>
                <p className="text-gray-600">
                  Design and configure your coupon campaign
                </p>
              </div>
              {/* Step Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${creationStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} `}>
                      1
                    </div>
                    <div className={`h-1 w-12 ${creationStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'} `}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${creationStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} `}>
                      2
                    </div>
                    <div className={`h-1 w-12 ${creationStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'} `}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${creationStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} `}>
                      3
                    </div>
                    <div className={`h-1 w-12 ${creationStep >= 4 ? 'bg-blue-600' : 'bg-gray-200'} `}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${creationStep >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} `}>
                      4
                    </div>
                  </div>
                  <button onClick={() => {
                setIsCreatingCoupon(false);
                setActiveTab('active');
                setCreationStep(1);
              } } className="text-sm text-gray-600 hover:text-gray-900">
                    Cancel
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                  <div className="w-8 text-center">Type</div>
                  <div className="w-8 text-center ml-12">Details</div>
                  <div className="w-8 text-center ml-12">Audience</div>
                  <div className="w-8 text-center ml-12">Review</div>
                </div>
              </div>
              {/* Step 1: Choose Template */} {creationStep === 1 && <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Choose a Coupon Type
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {templates.map(template => <div key={template.id} className={`border rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] ${selectedTemplateId === template.id ? 'ring-2 ring-blue-500' : ''}`} onClick={() => handleTemplateSelect(template.id)}>
                        <div className="h-40 overflow-hidden">
                          <img src={template.image} alt={template.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{template.name}</h4>
                            {template.popularityScore > 90 && <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                                Popular
                              </span>}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {template.description}
                          </p>
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                              {template.type === 'percentage' ? 'Percentage' : template.type === 'fixed' ? 'Fixed Amount' : template.type === 'bogo' ? 'Buy One Get One' : 'Free Item'}
                            </span>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>} {/* Step 2: Coupon Details */} {creationStep === 2 && <div>
                  <h3 className="text-lg font-semibold mb-4">Coupon Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Coupon Title*
                        </label>
                        <input type="text" value={newCoupon.title || ''} onChange={e => setNewCoupon({
                    ...newCoupon,
                    title: e.target.value
                  })} placeholder="e.g., Summer Special 20% Off" className="w-full px-3 py-2 border rounded-md" required />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea value={newCoupon.description || ''} onChange={e => setNewCoupon({
                    ...newCoupon,
                    description: e.target.value
                  })} placeholder="Describe your coupon offer" className="w-full px-3 py-2 border rounded-md" rows={3} ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Coupon Code*
                        </label>
                        <div className="flex">
                          <input type="text" value={newCoupon.code || ''} onChange={e => setNewCoupon({
                      ...newCoupon,
                      code: e.target.value.toUpperCase()
                    })} placeholder="e.g., SUMMER20" className="flex-grow px-3 py-2 border rounded-l-md uppercase" required />
                          <button onClick={generateCouponCode} className="px-3 py-2 bg-gray-100 border border-l-0 rounded-r-md text-gray-600 hover:bg-gray-200">
                            Generate
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Use a memorable code that customers can easily
                          remember.
                        </p>
                      </div>
                      {newCoupon.discount?.type === 'percentage' && <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Discount Percentage*
                          </label>
                          <div className="flex items-center">
                            <input type="number" value={newCoupon.discount?.value || 0} onChange={e => setNewCoupon({
                      ...newCoupon,
                      discount: {
                        ...newCoupon.discount,
                        value: parseInt(e.target.value)
                      }
                    })} min="1" max="100" className="w-full px-3 py-2 border rounded-md" required />
                            <span className="ml-2">%</span>
                          </div>
                        </div>} {newCoupon.discount?.type === 'fixed' && <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Discount Amount*
                          </label>
                          <div className="flex items-center">
                            <span className="mr-2">$</span>
                            <input type="number" value={newCoupon.discount?.value || 0} onChange={e => setNewCoupon({
                      ...newCoupon,
                      discount: {
                        ...newCoupon.discount,
                        value: parseInt(e.target.value)
                      }
                    })} min="1" className="w-full px-3 py-2 border rounded-md" required />
                          </div>
                        </div>}
                    </div>
                    <div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Validity Period*
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">
                              Start Date
                            </label>
                            <input type="date" value={newCoupon.validity?.startDate ? new Date(newCoupon.validity.startDate).toISOString().split('T')[0] : ''} onChange={e => setNewCoupon({
                        ...newCoupon,
                        validity: {
                          ...newCoupon.validity,
                          startDate: new Date(e.target.value).toISOString()
                        }
                      })} className="w-full px-3 py-2 border rounded-md" required />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">
                              End Date
                            </label>
                            <input type="date" value={newCoupon.validity?.endDate ? new Date(newCoupon.validity.endDate).toISOString().split('T')[0] : ''} onChange={e => setNewCoupon({
                        ...newCoupon,
                        validity: {
                          ...newCoupon.validity,
                          endDate: new Date(e.target.value).toISOString()
                        }
                      })} className="w-full px-3 py-2 border rounded-md" required />
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Constraints
                        </label>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">
                              Minimum Purchase Amount ($)
                            </label>
                            <input type="number" value={newCoupon.constraints?.minPurchase || 0} onChange={e => setNewCoupon({
                        ...newCoupon,
                        constraints: {
                          ...newCoupon.constraints,
                          minPurchase: parseInt(e.target.value)
                        }
                      })} min="0" className="w-full px-3 py-2 border rounded-md" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">
                              Usage Limit Per Customer
                            </label>
                            <input type="number" value={newCoupon.constraints?.limitPerUser || 0} onChange={e => setNewCoupon({
                        ...newCoupon,
                        constraints: {
                          ...newCoupon.constraints,
                          limitPerUser: parseInt(e.target.value)
                        }
                      })} min="0" className="w-full px-3 py-2 border rounded-md" />
                            <p className="text-xs text-gray-500 mt-1">
                              Set to 0 for unlimited uses per customer
                            </p>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">
                              Total Redemption Limit
                            </label>
                            <input type="number" value={newCoupon.constraints?.limitTotal || 0} onChange={e => setNewCoupon({
                        ...newCoupon,
                        constraints: {
                          ...newCoupon.constraints,
                          limitTotal: parseInt(e.target.value)
                        }
                      })} min="0" className="w-full px-3 py-2 border rounded-md" />
                            <p className="text-xs text-gray-500 mt-1">
                              Set to 0 for unlimited total redemptions
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <button onClick={() => setCreationStep(1)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                      Back
                    </button>
                    <button onClick={() => setCreationStep(3)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" disabled={!newCoupon.title || !newCoupon.code}>
                      Next: Audience Targeting
                    </button>
                  </div>
                </div>} {/* Step 3: Audience Targeting */} {creationStep === 3 && <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Audience Targeting
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Define who should receive this coupon to maximize its
                    effectiveness
                  </p>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Segments
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {customerSegments.map(segment => <div key={segment.id} className={`border rounded-lg p-3 cursor-pointer ${newCoupon.targeting?.customerSegment?.includes(segment.id === 's1' ? 'all' : segment.name.toLowerCase().replace(/\s+/g, '-')) ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`} onClick={() => {
                  const segmentValue = segment.id === 's1' ? 'all' : segment.name.toLowerCase().replace(/\s+/g, '-');
                  const currentSegments = newCoupon.targeting?.customerSegment || [];
                  let newSegments;
                  if (segmentValue === 'all') {
                    // If "All Customers" is selected, clear other selections
                    newSegments = ['all'];
                  } else if (currentSegments.includes(segmentValue)) {
                    // Remove if already selected
                    newSegments = currentSegments.filter(s => s !== segmentValue);
                    // If empty after removal, default to "all"
                    if (newSegments.length === 0) newSegments = ['all'];
                  } else {
                    // Add new segment and remove "all" if present
                    newSegments = [...currentSegments.filter(s => s !== 'all'), segmentValue];
                  }
                  setNewCoupon({
                    ...newCoupon,
                    targeting: {
                      ...newCoupon.targeting,
                      customerSegment: newSegments
                    }
                  });
                }}>
                          <div className="flex items-start">
                            <div className={`w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center ${newCoupon.targeting?.customerSegment?.includes(segment.id === 's1' ? 'all' : segment.name.toLowerCase().replace(/\s+/g, '-')) ? 'bg-blue-500 text-white' : 'border border-gray-300'} `}>
                              {newCoupon.targeting?.customerSegment?.includes(segment.id === 's1' ? 'all' : segment.name.toLowerCase().replace(/\s+/g, '-')) && <CheckIcon className="w-3 h-3" />}
                            </div>
                            <div className="ml-2">
                              <div className="font-medium text-gray-900">
                                {segment.name}
                              </div>
                              <div className="text-xs text-gray-600">
                                {segment.description}
                              </div>
                              <div className="text-xs text-blue-600 mt-1">
                                {segment.count} customers
                              </div>
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <input type="checkbox" checked={newCoupon.targeting?.newCustomersOnly || false} onChange={e => setNewCoupon({
                  ...newCoupon,
                  targeting: {
                    ...newCoupon.targeting,
                    newCustomersOnly: e.target.checked
                  }
                })} className="mr-2" />
                      New Customers Only
                    </label>
                    <p className="text-xs text-gray-500 mt-1 ml-6">
                      This coupon will only be valid for customers who have
                      never made a purchase before
                    </p>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <button onClick={() => setCreationStep(2)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                      Back
                    </button>
                    <button onClick={() => setCreationStep(4)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Next: Review & Create
                    </button>
                  </div>
                </div>} {/* Step 4: Review & Create */} {creationStep === 4 && <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Review & Create Coupon
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Review your coupon details before creating it
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="md:w-1/3">
                        {/* Coupon Preview */}
                        <div className="rounded-lg overflow-hidden shadow-sm" style={{
                    backgroundColor: newCoupon.displayOptions?.primaryColor || '#2196F3'
                  } }>
                          <div className="p-4 text-white">
                            <h3 className="font-bold text-xl mb-1">
                              {newCoupon.title || 'Coupon Title'}
                            </h3>
                            <p className="text-white text-opacity-90 text-sm mb-3">
                              {newCoupon.description || 'Coupon description goes here'}
                            </p>
                            <div className="bg-white bg-opacity-20 p-2 rounded text-center mb-3">
                              <span className="font-mono font-bold text-lg">
                                {newCoupon.code || 'CODE'}
                              </span>
                            </div>
                            <div className="text-sm text-white text-opacity-90">
                              Valid until:{' '} {newCoupon.validity?.endDate ? formatDate(newCoupon.validity.endDate) : 'End date'}
                            </div>
                          </div>
                          <div className="bg-white p-3">
                            <div className="text-center font-bold text-lg" style={{
                        color: newCoupon.displayOptions?.primaryColor || '#2196F3'
                      } }>
                              {newCoupon.discount?.type === 'percentage' ? `${newCoupon.discount.value}% OFF` : newCoupon.discount?.type === 'fixed' ? `$${newCoupon.discount.value} OFF` : newCoupon.discount?.type === 'bogo' ? 'BUY ONE GET ONE FREE' : 'FREE ITEM'}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <h4 className="font-medium mb-3">Coupon Details</h4>
                        <dl className="space-y-2 text-sm">
                          <div className="flex">
                            <dt className="w-1/3 text-gray-500">Title:</dt>
                            <dd className="w-2/3 font-medium">
                              {newCoupon.title || 'Not set'}
                            </dd>
                          </div>
                          <div className="flex">
                            <dt className="w-1/3 text-gray-500">Code:</dt>
                            <dd className="w-2/3 font-medium">
                              {newCoupon.code || 'Not set'}
                            </dd>
                          </div>
                          <div className="flex">
                            <dt className="w-1/3 text-gray-500">Discount:</dt>
                            <dd className="w-2/3 font-medium">
                              {newCoupon.discount?.type === 'percentage' ? `${newCoupon.discount.value}% off` : newCoupon.discount?.type === 'fixed' ? `$${newCoupon.discount.value} off` : newCoupon.discount?.type === 'bogo' ? 'Buy one get one free' : 'Free item'}
                            </dd>
                          </div>
                          <div className="flex">
                            <dt className="w-1/3 text-gray-500">
                              Valid Period:
                            </dt>
                            <dd className="w-2/3">
                              {newCoupon.validity?.startDate ? formatDate(newCoupon.validity.startDate) : 'Not set'} {' '}
                              to{' '} {newCoupon.validity?.endDate ? formatDate(newCoupon.validity.endDate) : 'Not set'}
                            </dd>
                          </div>
                          <div className="flex">
                            <dt className="w-1/3 text-gray-500">
                              Min. Purchase:
                            </dt>
                            <dd className="w-2/3">
                              {newCoupon.constraints?.minPurchase ? `$${newCoupon.constraints.minPurchase}` : 'None'}
                            </dd>
                          </div>
                          <div className="flex">
                            <dt className="w-1/3 text-gray-500">
                              Usage Limits:
                            </dt>
                            <dd className="w-2/3">
                              {newCoupon.constraints?.limitPerUser ? `${newCoupon.constraints.limitPerUser} per customer` : 'Unlimited per customer'} {newCoupon.constraints?.limitTotal ? `, ${newCoupon.constraints.limitTotal} total` : ', Unlimited total'}
                            </dd>
                          </div>
                          <div className="flex">
                            <dt className="w-1/3 text-gray-500">
                              Target Audience:
                            </dt>
                            <dd className="w-2/3">
                              {newCoupon.targeting?.customerSegment?.map(segment => segment === 'all' ? 'All Customers' : segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join(', ')} {newCoupon.targeting?.newCustomersOnly && ' (New customers only)'}
                            </dd>
                          </div>
                        </dl>
                        {/* Warning about limits */} {newCoupon.constraints?.limitPerUser === 0 && newCoupon.constraints?.limitTotal === 0 && <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-start">
                              <AlertTriangleIcon className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                              <div className="text-sm text-yellow-700">
                                <p className="font-medium">
                                  No usage limits set
                                </p>
                                <p>
                                  This coupon can be used unlimited times by any
                                  customer. Consider setting usage limits to
                                  prevent abuse.
                                </p>
                              </div>
                            </div>}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <button onClick={() => setCreationStep(3)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                      Back
                    </button>
                    <button onClick={handleCreateCoupon} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Create Coupon
                    </button>
                  </div>
                </div>}
            </div>} {/* Analytics Tab */} {activeTab === 'analytics' && <div>
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    Coupon Performance Overview
                  </h3>
                  <div className="mt-3 md:mt-0">
                    <select value={analyticsTimeRange} onChange={e => setAnalyticsTimeRange(e.target.value as any)} className="border rounded-md px-3 py-1.5 text-sm">
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                      <option value="90d">Last 90 days</option>
                      <option value="all">All time</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-blue-700">
                        Total Views
                      </h4>
                      <EyeIcon className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold text-blue-900">
                      {totalPerformance.views}
                    </div>
                    <div className="text-sm text-blue-600 mt-1">
                      Coupon impressions
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-green-700">
                        Redemptions
                      </h4>
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      {totalPerformance.redemptions}
                    </div>
                    <div className="text-sm text-green-600 mt-1">
                      Coupons used
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-purple-700">
                        Revenue
                      </h4>
                      <DollarSignIcon className="w-5 h-5 text-purple-500" />
                    </div>
                    <div className="text-2xl font-bold text-purple-900">
                      ${totalPerformance.revenue}
                    </div>
                    <div className="text-sm text-purple-600 mt-1">
                      From coupon orders
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-orange-700">
                        New Customers
                      </h4>
                      <UserPlusIcon className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="text-2xl font-bold text-orange-900">
                      {totalPerformance.newCustomers}
                    </div>
                    <div className="text-sm text-orange-600 mt-1">
                      First-time buyers
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Redemption Rate
                  </h4>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Average:{' '} {getRedemptionRate(totalPerformance.views, totalPerformance.redemptions)}
                      %
                    </span>
                    <span className="text-xs text-gray-500">
                      {totalPerformance.redemptions} of {totalPerformance.views} {' '}
                      views
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{
                  width: `${totalPerformance.redemptions / totalPerformance.views * 100} %`
                }}></div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <h3 className="text-lg font-semibold mb-4">
                  Coupon Performance Comparison
                </h3>
                {coupons.length === 0 ? <div className="text-center py-8">
                    <PercentIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h4 className="text-lg font-medium text-gray-700 mb-1">
                      No coupons to analyze
                    </h4>
                    <p className="text-gray-500 mb-4">
                      Create some coupons to see their performance analytics
                    </p>
                    <button onClick={() => {
                setIsCreatingCoupon(true);
                setActiveTab('creation');
              } } className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                      <PlusIcon className="w-4 h-4 mr-1.5" />
                      Create Your First Coupon
                    </button>
                  </div> : <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Coupon
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Views
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Redemptions
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Conversion
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Revenue
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            New Customers
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {sortedCoupons.map(coupon => <tr key={coupon.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full flex-shrink-0" style={{
                          backgroundColor: coupon.displayOptions.primaryColor
                        } }>
                                  <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
                                    {coupon.discount.type === 'percentage' ? `${coupon.discount.value}%` : coupon.discount.type === 'fixed' ? `$${coupon.discount.value}` : coupon.discount.type === 'bogo' ? 'B1G1' : 'FREE'}
                                  </div>
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">
                                    {coupon.title}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {coupon.code}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {coupon.performance.views}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {coupon.performance.redemptions}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm">
                              <div className={`font-medium ${parseFloat(getRedemptionRate(coupon.performance.views, coupon.performance.redemptions)) > 10 ? 'text-green-700' : parseFloat(getRedemptionRate(coupon.performance.views, coupon.performance.redemptions)) > 5 ? 'text-yellow-700' : 'text-gray-700'} `}>
                                {getRedemptionRate(coupon.performance.views, coupon.performance.redemptions)}
                                %
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${coupon.performance.revenue}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {coupon.performance.newCustomers}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`text-xs px-2 py-1 rounded-full ${coupon.validity.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} `}>
                                {coupon.validity.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>}
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-semibold mb-4">
                  Insights & Recommendations
                </h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start">
                    <ZapIcon className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800 mb-1">
                        Best Performing Coupon Type
                      </h4>
                      <p className="text-sm text-blue-700">
                        Percentage discount coupons have the highest redemption
                        rate at 15.2%. Consider using this type for your next
                        campaign.
                      </p>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-start">
                    <TrendingUpIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800 mb-1">
                        Customer Acquisition
                      </h4>
                      <p className="text-sm text-green-700">
                        "New Customer" coupons have brought in{' '} {totalPerformance.newCustomers} first-time customers,
                        with an average first purchase value of $30.
                      </p>
                    </div>
                  </div>
                  <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 flex items-start">
                    <CalendarIcon className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-800 mb-1">
                        Optimal Timing
                      </h4>
                      <p className="text-sm text-purple-700">
                        Coupons released on Mondays show 22% higher redemption
                        rates. Consider scheduling your next campaign to start
                        on a Monday.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
        </main>
      </div>
      {/* QR Code Modal */} {showQrModal && selectedCoupon && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Coupon QR Code
                </h3>
                <button onClick={() => setShowQrModal(false)} className="text-gray-400 hover:text-gray-600">
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="text-center mb-4">
                <p className="text-gray-600 mb-4">
                  Scan this QR code to redeem the coupon:{' '}
                  <strong>{selectedCoupon.code}</strong>
                </p>
                <div className="bg-white p-4 rounded-lg border mx-auto w-48 h-48 flex items-center justify-center mb-4">
                  {/* This would be a real QR code in a production app */}
                  <div className="text-center">
                    <QrCodeIcon className="w-24 h-24 text-gray-800 mx-auto" />
                    <p className="text-sm text-gray-500 mt-2">
                      QR Code for {selectedCoupon.code}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center space-x-3">
                  <button className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 text-sm">
                    <CopyIcon className="w-4 h-4 mr-1.5" />
                    Copy
                  </button>
                  <button className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 text-sm">
                    <DownloadIcon className="w-4 h-4 mr-1.5" />
                    Download
                  </button>
                  <button className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 text-sm">
                    <PrinterIcon className="w-4 h-4 mr-1.5" />
                    Print
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  Coupon Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount:</span>
                    <span className="font-medium">
                      {getDiscountText(selectedCoupon.discount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valid Until:</span>
                    <span>{formatDate(selectedCoupon.validity.endDate)}</span>
                  </div>
                  {selectedCoupon.constraints.minPurchase > 0 && <div className="flex justify-between">
                      <span className="text-gray-600">Min. Purchase:</span>
                      <span>${selectedCoupon.constraints.minPurchase}</span>
                    </div>}
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start">
                  <InfoIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    You can print this QR code and display it in your store, or
                    share it digitally with your customers.
                  </p>
                </div>
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
