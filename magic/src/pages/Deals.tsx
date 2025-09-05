import React, { useEffect, useState, useRef } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { SearchIcon, FilterIcon, MapPinIcon, TagIcon, CalendarIcon, StarIcon, HeartIcon, PercentIcon, ShoppingBagIcon, CoffeeIcon, UtensilsIcon, MusicIcon, ShoppingCartIcon, HomeIcon, GlassWaterIcon, HeartPulseIcon, ChevronDownIcon, XIcon, ClockIcon, CheckIcon, ArrowUpIcon, ArrowDownIcon, ListIcon, GridIcon, MapIcon, BuildingIcon, ZapIcon, InfoIcon, ExternalLinkIcon, ChevronRightIcon, BookmarkIcon, ShareIcon, GiftIcon } from 'lucide-react';
// Types
interface Business {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  logo?: string;
  rating: number;
  reviewCount: number;
  distance?: number;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
interface Deal {
  id: string;
  businessId: string;
  business: Business;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed' | 'bogo' | 'free' | 'special';
  discountValue?: number;
  discountCode?: string;
  category: string;
  expiresAt: string;
  startDate: string;
  isExclusive?: boolean;
  isRecommended?: boolean;
  isFeatured?: boolean;
  pointCost?: number;
  imageUrl?: string;
  tags: string[];
  redemptionCount: number;
  saveCount: number;
}
interface FilterOptions {
  categories: string[];
  discountTypes: string[];
  sortBy: 'relevance' | 'expiringSoon' | 'newest' | 'popular' | 'distance';
  onlyExclusive: boolean;
  maxDistance: number;
  searchTerm: string;
}
// Mock data
const mockDeals: Deal[] = [{
  id: 'd1',
  businessId: 'b1',
  business: {
    id: 'b1',
    name: 'Urban Bites Café',
    category: 'Food & Drink',
    subcategory: 'Café',
    logo: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FmZSUyMGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=100&q=60',
    rating: 4.7,
    reviewCount: 128,
    distance: 0.3,
    location: '123 Main St, Downtown',
    coordinates: {
      lat: 40.7128,
      lng: -74.006
    }
  },
  title: 'Happy Hour Special: 50% Off All Drinks',
  description: 'Enjoy half-price drinks between 3PM and 6PM, Monday through Friday. Valid for all non-alcoholic beverages.',
  discountType: 'percentage',
  discountValue: 50,
  discountCode: 'HAPPYHOUR',
  category: 'Food & Drink',
  expiresAt: '2023-12-31T23:59:59Z',
  startDate: '2023-07-01T00:00:00Z',
  isRecommended: true,
  isFeatured: true,
  imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29mZmVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  tags: ['coffee', 'drinks', 'happy hour', 'weekday special'],
  redemptionCount: 342,
  saveCount: 78
}, {
  id: 'd2',
  businessId: 'b3',
  business: {
    id: 'b3',
    name: 'Downtown Bakery',
    category: 'Food & Drink',
    subcategory: 'Bakery',
    logo: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cGFzdHJ5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=100&q=60',
    rating: 4.5,
    reviewCount: 96,
    distance: 0.7,
    location: '456 Oak St, Downtown',
    coordinates: {
      lat: 40.7138,
      lng: -74.008
    }
  },
  title: 'Buy One Get One Free Pastries',
  description: 'Purchase any pastry and get a second one of equal or lesser value for free. Valid all day on weekends.',
  discountType: 'bogo',
  category: 'Food & Drink',
  expiresAt: '2023-09-30T23:59:59Z',
  startDate: '2023-06-01T00:00:00Z',
  isExclusive: true,
  pointCost: 150,
  imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cGFzdHJ5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  tags: ['pastry', 'bakery', 'weekend', 'bogo'],
  redemptionCount: 186,
  saveCount: 54
}, {
  id: 'd3',
  businessId: 'b2',
  business: {
    id: 'b2',
    name: 'City Cinema',
    category: 'Entertainment',
    subcategory: 'Movie Theater',
    logo: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2luZW1hfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=100&q=60',
    rating: 4.3,
    reviewCount: 215,
    distance: 1.2,
    location: '789 Pine St, Downtown',
    coordinates: {
      lat: 40.7148,
      lng: -74.003
    }
  },
  title: '$5 Off Any Movie Ticket',
  description: 'Get $5 off any regular-priced movie ticket. Valid Monday through Thursday only.',
  discountType: 'fixed',
  discountValue: 5,
  discountCode: 'MOVIE5',
  category: 'Entertainment',
  expiresAt: '2023-08-31T23:59:59Z',
  startDate: '2023-07-15T00:00:00Z',
  imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2luZW1hfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  tags: ['movies', 'entertainment', 'weekday', 'discount'],
  redemptionCount: 421,
  saveCount: 112
}, {
  id: 'd4',
  businessId: 'b4',
  business: {
    id: 'b4',
    name: 'Fitness First Gym',
    category: 'Health & Wellness',
    subcategory: 'Gym',
    logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=100&q=60',
    rating: 4.2,
    reviewCount: 87,
    distance: 0.9,
    location: '321 Elm St, Downtown',
    coordinates: {
      lat: 40.7118,
      lng: -74.002
    }
  },
  title: 'Free 7-Day Trial Membership',
  description: 'Try our gym for free for 7 days. Includes access to all facilities and classes.',
  discountType: 'free',
  category: 'Health & Wellness',
  expiresAt: '2023-10-15T23:59:59Z',
  startDate: '2023-07-01T00:00:00Z',
  isRecommended: true,
  imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  tags: ['fitness', 'gym', 'trial', 'free'],
  redemptionCount: 154,
  saveCount: 68
}, {
  id: 'd5',
  businessId: 'b5',
  business: {
    id: 'b5',
    name: 'Bella Boutique',
    category: 'Shopping',
    subcategory: 'Clothing',
    logo: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Ym91dGlxdWV8ZW58MHx8MHx8&auto=format&fit=crop&w=100&q=60',
    rating: 4.8,
    reviewCount: 64,
    distance: 0.5,
    location: '567 Maple St, Downtown',
    coordinates: {
      lat: 40.7138,
      lng: -74.001
    }
  },
  title: '25% Off All Summer Collection',
  description: 'Enjoy 25% off our entire summer collection. Limited time offer.',
  discountType: 'percentage',
  discountValue: 25,
  discountCode: 'SUMMER25',
  category: 'Shopping',
  expiresAt: '2023-08-15T23:59:59Z',
  startDate: '2023-07-01T00:00:00Z',
  isFeatured: true,
  imageUrl: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Ym91dGlxdWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  tags: ['fashion', 'clothing', 'summer', 'sale'],
  redemptionCount: 98,
  saveCount: 42
}, {
  id: 'd6',
  businessId: 'b6',
  business: {
    id: 'b6',
    name: 'The Cocktail Bar',
    category: 'Food & Drink',
    subcategory: 'Bar',
    logo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=100&q=60',
    rating: 4.6,
    reviewCount: 142,
    distance: 0.4,
    location: '890 Walnut St, Downtown',
    coordinates: {
      lat: 40.7158,
      lng: -74.007
    }
  },
  title: 'Two Cocktails for the Price of One',
  description: 'Buy one signature cocktail and get a second one free. Valid every Thursday from 7PM to 10PM.',
  discountType: 'bogo',
  category: 'Food & Drink',
  expiresAt: '2023-09-28T23:59:59Z',
  startDate: '2023-06-01T00:00:00Z',
  isExclusive: true,
  pointCost: 200,
  imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  tags: ['cocktails', 'bar', 'nightlife', 'bogo', 'thursday'],
  redemptionCount: 276,
  saveCount: 85
}, {
  id: 'd7',
  businessId: 'b7',
  business: {
    id: 'b7',
    name: 'Harmony Spa',
    category: 'Health & Wellness',
    subcategory: 'Spa',
    logo: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3BhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=100&q=60',
    rating: 4.9,
    reviewCount: 78,
    distance: 1.1,
    location: '432 Cedar St, Downtown',
    coordinates: {
      lat: 40.7168,
      lng: -74.009
    }
  },
  title: '20% Off Any Massage Treatment',
  description: 'Enjoy 20% off any massage treatment. New customers only.',
  discountType: 'percentage',
  discountValue: 20,
  discountCode: 'RELAX20',
  category: 'Health & Wellness',
  expiresAt: '2023-10-31T23:59:59Z',
  startDate: '2023-07-01T00:00:00Z',
  isRecommended: true,
  imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3BhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  tags: ['spa', 'massage', 'wellness', 'relaxation'],
  redemptionCount: 112,
  saveCount: 47
}, {
  id: 'd8',
  businessId: 'b8',
  business: {
    id: 'b8',
    name: 'Vinyl Records',
    category: 'Shopping',
    subcategory: 'Music Store',
    logo: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVjb3JkJTIwc3RvcmV8ZW58MHx8MHx8&auto=format&fit=crop&w=100&q=60',
    rating: 4.4,
    reviewCount: 53,
    distance: 0.8,
    location: '765 Birch St, Downtown',
    coordinates: {
      lat: 40.7178,
      lng: -74.005
    }
  },
  title: '$10 Off Any Purchase of $50+',
  description: 'Get $10 off when you spend $50 or more on vinyl records or accessories.',
  discountType: 'fixed',
  discountValue: 10,
  discountCode: 'VINYL10',
  category: 'Shopping',
  expiresAt: '2023-09-15T23:59:59Z',
  startDate: '2023-07-15T00:00:00Z',
  imageUrl: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVjb3JkJTIwc3RvcmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  tags: ['music', 'vinyl', 'records', 'shopping'],
  redemptionCount: 67,
  saveCount: 28
}];
// Categories
const categories = [{
  id: 'food-drink',
  name: 'Food & Drink',
  icon: <UtensilsIcon className="w-5 h-5" />
}, {
  id: 'shopping',
  name: 'Shopping',
  icon: <ShoppingBagIcon className="w-5 h-5" />
}, {
  id: 'entertainment',
  name: 'Entertainment',
  icon: <MusicIcon className="w-5 h-5" />
}, {
  id: 'health-wellness',
  name: 'Health & Wellness',
  icon: <HeartPulseIcon className="w-5 h-5" />
}, {
  id: 'services',
  name: 'Services',
  icon: <HomeIcon className="w-5 h-5" />
}, {
  id: 'nightlife',
  name: 'Nightlife',
  icon: <GlassWaterIcon className="w-5 h-5" />
}];
// Discount types
const discountTypes = [{
  id: 'percentage',
  name: 'Percentage Off',
  icon: <PercentIcon className="w-5 h-5" />
}, {
  id: 'fixed',
  name: 'Fixed Amount Off',
  icon: <TagIcon className="w-5 h-5" />
}, {
  id: 'bogo',
  name: 'Buy One Get One',
  icon: <ShoppingCartIcon className="w-5 h-5" />
}, {
  id: 'free',
  name: 'Free Items',
  icon: <GiftIcon className="w-5 h-5" />
}];
export function Deals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileSort, setShowMobileSort] = useState(false);
  const [savedDeals, setSavedDeals] = useState<string[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: [],
    discountTypes: [],
    sortBy: 'relevance',
    onlyExclusive: false,
    maxDistance: 5,
    searchTerm: ''
  });
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // Fetch deals data
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use the mock data
    setLoading(true);
    setTimeout(() => {
      setDeals(mockDeals);
      setFilteredDeals(mockDeals);
      setLoading(false);
    }, 500);
  }, []);
  // Apply filters
  useEffect(() => {
    if (deals.length === 0) return;
    let result = [...deals];
    // Apply search term
    if (filterOptions.searchTerm) {
      const term = filterOptions.searchTerm.toLowerCase();
      result = result.filter(deal => deal.title.toLowerCase().includes(term) || deal.description.toLowerCase().includes(term) || deal.business.name.toLowerCase().includes(term) || deal.tags.some(tag => tag.toLowerCase().includes(term)));
    }
    // Apply category filters
    if (filterOptions.categories.length > 0) {
      result = result.filter(deal => filterOptions.categories.includes(deal.category));
    }
    // Apply discount type filters
    if (filterOptions.discountTypes.length > 0) {
      result = result.filter(deal => filterOptions.discountTypes.includes(deal.discountType));
    }
    // Apply exclusive filter
    if (filterOptions.onlyExclusive) {
      result = result.filter(deal => deal.isExclusive);
    }
    // Apply distance filter
    result = result.filter(deal => deal.business.distance && deal.business.distance <= filterOptions.maxDistance);
    // Apply sorting
    switch (filterOptions.sortBy) {
      case 'expiringSoon':
        result.sort((a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime());
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        break;
      case 'popular':
        result.sort((a, b) => b.redemptionCount - a.redemptionCount);
        break;
      case 'distance':
        result.sort((a, b) => (a.business.distance || 999) - (b.business.distance || 999));
        break;
      default:
        // For 'relevance', featured and recommended deals come first
        result.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          if (a.isRecommended && !b.isRecommended) return -1;
          if (!a.isRecommended && b.isRecommended) return 1;
          return 0;
        });
    }
    setFilteredDeals(result);
  }, [deals, filterOptions]);
  // Initialize map (this would use a real map library in a production app)
  useEffect(() => {
    if (viewMode === 'map' && mapContainerRef.current) {
      // In a real app, this would initialize a map like Google Maps or Leaflet
      console.log('Map would be initialized here');
    }
  }, [viewMode]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions(prev => ({
      ...prev,
      searchTerm: e.target.value
    }));
  };
  const toggleCategoryFilter = (category: string) => {
    setFilterOptions(prev => {
      const categories = prev.categories.includes(category) ? prev.categories.filter(c => c !== category) : [...prev.categories, category];
      return {
        ...prev,
        categories
      };
    });
  };
  const toggleDiscountTypeFilter = (type: string) => {
    setFilterOptions(prev => {
      const discountTypes = prev.discountTypes.includes(type) ? prev.discountTypes.filter(t => t !== type) : [...prev.discountTypes, type];
      return {
        ...prev,
        discountTypes
      };
    });
  };
  const toggleExclusiveFilter = () => {
    setFilterOptions(prev => ({
      ...prev,
      onlyExclusive: !prev.onlyExclusive
    }));
  };
  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    setFilterOptions(prev => ({
      ...prev,
      sortBy
    }));
    setShowMobileSort(false);
  };
  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions(prev => ({
      ...prev,
      maxDistance: parseInt(e.target.value)
    }));
  };
  const resetFilters = () => {
    setFilterOptions({
      categories: [],
      discountTypes: [],
      sortBy: 'relevance',
      onlyExclusive: false,
      maxDistance: 5,
      searchTerm: ''
    });
  };
  const toggleSaveDeal = (dealId: string) => {
    setSavedDeals(prev => prev.includes(dealId) ? prev.filter(id => id !== dealId) : [...prev, dealId]);
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  const getDaysRemaining = (dateString: string) => {
    const today = new Date();
    const expireDate = new Date(dateString);
    const diffTime = expireDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  const getDiscountLabel = (deal: Deal) => {
    switch (deal.discountType) {
      case 'percentage':
        return `${deal.discountValue}% OFF`;
      case 'fixed':
        return `$${deal.discountValue} OFF`;
      case 'bogo':
        return 'BUY 1 GET 1';
      case 'free':
        return 'FREE';
      default:
        return 'SPECIAL';
    }
  };
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading deals...</p>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Coupons & Deals
              </h1>
              <p className="text-gray-600 mt-1">
                Discover special offers from local businesses
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <Link to="/rewards" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                <ZapIcon className="w-5 h-5 mr-1.5" />
                My Rewards
              </Link>
              {viewMode !== 'map' && <div className="hidden md:flex items-center space-x-2 bg-white rounded-md shadow-sm p-1">
                  <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`} aria-label="Grid view">
                    <GridIcon className="w-5 h-5" />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`} aria-label="List view">
                    <ListIcon className="w-5 h-5" />
                  </button>
                  <button onClick={() => setViewMode('map')} className={`p-1.5 rounded ${viewMode === 'map' ? 'bg-gray-200' : 'hover:bg-gray-100'}`} aria-label="Map view">
                    <MapIcon className="w-5 h-5" />
                  </button>
                </div>}
            </div>
          </div>
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-grow">
                <input type="text" placeholder="Search deals, businesses, or categories..." value={filterOptions.searchTerm} onChange={handleSearchChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md" />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium flex items-center hover:bg-gray-50">
                  <FilterIcon className="w-5 h-5 mr-1.5" />
                  Filters
                  {(filterOptions.categories.length > 0 || filterOptions.discountTypes.length > 0 || filterOptions.onlyExclusive) && <span className="ml-1.5 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {filterOptions.categories.length + filterOptions.discountTypes.length + (filterOptions.onlyExclusive ? 1 : 0)}
                    </span>}
                </button>
                <div className="hidden md:block relative">
                  <button onClick={() => setShowMobileSort(!showMobileSort)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium flex items-center hover:bg-gray-50">
                    <span>Sort: </span>
                    <span className="font-medium ml-1">
                      {filterOptions.sortBy === 'relevance' && 'Relevance'}
                      {filterOptions.sortBy === 'expiringSoon' && 'Expiring Soon'}
                      {filterOptions.sortBy === 'newest' && 'Newest'}
                      {filterOptions.sortBy === 'popular' && 'Most Popular'}
                      {filterOptions.sortBy === 'distance' && 'Distance'}
                    </span>
                    <ChevronDownIcon className="w-5 h-5 ml-1" />
                  </button>
                  {showMobileSort && <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-200">
                      <button onClick={() => handleSortChange('relevance')} className={`px-4 py-2 text-left w-full hover:bg-gray-100 ${filterOptions.sortBy === 'relevance' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                        Relevance
                      </button>
                      <button onClick={() => handleSortChange('expiringSoon')} className={`px-4 py-2 text-left w-full hover:bg-gray-100 ${filterOptions.sortBy === 'expiringSoon' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                        Expiring Soon
                      </button>
                      <button onClick={() => handleSortChange('newest')} className={`px-4 py-2 text-left w-full hover:bg-gray-100 ${filterOptions.sortBy === 'newest' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                        Newest
                      </button>
                      <button onClick={() => handleSortChange('popular')} className={`px-4 py-2 text-left w-full hover:bg-gray-100 ${filterOptions.sortBy === 'popular' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                        Most Popular
                      </button>
                      <button onClick={() => handleSortChange('distance')} className={`px-4 py-2 text-left w-full hover:bg-gray-100 ${filterOptions.sortBy === 'distance' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                        Distance
                      </button>
                    </div>}
                </div>
                <div className="md:hidden">
                  <button onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} className="p-2 border border-gray-300 rounded-md text-gray-700" aria-label={viewMode === 'grid' ? 'List view' : 'Grid view'}>
                    {viewMode === 'grid' ? <ListIcon className="w-5 h-5" /> : <GridIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
            {/* Mobile Sort Options */}
            <div className="md:hidden mt-4">
              <div className="flex overflow-x-auto pb-2 space-x-2">
                <button onClick={() => handleSortChange('relevance')} className={`px-3 py-1.5 rounded-full whitespace-nowrap ${filterOptions.sortBy === 'relevance' ? 'bg-blue-100 text-blue-800 font-medium' : 'bg-gray-100 text-gray-700'}`}>
                  Relevance
                </button>
                <button onClick={() => handleSortChange('expiringSoon')} className={`px-3 py-1.5 rounded-full whitespace-nowrap ${filterOptions.sortBy === 'expiringSoon' ? 'bg-blue-100 text-blue-800 font-medium' : 'bg-gray-100 text-gray-700'}`}>
                  Expiring Soon
                </button>
                <button onClick={() => handleSortChange('newest')} className={`px-3 py-1.5 rounded-full whitespace-nowrap ${filterOptions.sortBy === 'newest' ? 'bg-blue-100 text-blue-800 font-medium' : 'bg-gray-100 text-gray-700'}`}>
                  Newest
                </button>
                <button onClick={() => handleSortChange('popular')} className={`px-3 py-1.5 rounded-full whitespace-nowrap ${filterOptions.sortBy === 'popular' ? 'bg-blue-100 text-blue-800 font-medium' : 'bg-gray-100 text-gray-700'}`}>
                  Most Popular
                </button>
                <button onClick={() => handleSortChange('distance')} className={`px-3 py-1.5 rounded-full whitespace-nowrap ${filterOptions.sortBy === 'distance' ? 'bg-blue-100 text-blue-800 font-medium' : 'bg-gray-100 text-gray-700'}`}>
                  Distance
                </button>
              </div>
            </div>
            {/* Active Filters */}
            {(filterOptions.categories.length > 0 || filterOptions.discountTypes.length > 0 || filterOptions.onlyExclusive) && <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {filterOptions.categories.map(category => <span key={category} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {category}
                    <button onClick={() => toggleCategoryFilter(category)} className="ml-1 text-blue-600 hover:text-blue-800">
                      <XIcon className="w-3 h-3" />
                    </button>
                  </span>)}
                {filterOptions.discountTypes.map(type => <span key={type} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {type === 'percentage' && 'Percentage Off'}
                    {type === 'fixed' && 'Fixed Amount Off'}
                    {type === 'bogo' && 'Buy One Get One'}
                    {type === 'free' && 'Free Items'}
                    <button onClick={() => toggleDiscountTypeFilter(type)} className="ml-1 text-purple-600 hover:text-purple-800">
                      <XIcon className="w-3 h-3" />
                    </button>
                  </span>)}
                {filterOptions.onlyExclusive && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    Exclusive Deals
                    <button onClick={toggleExclusiveFilter} className="ml-1 text-amber-600 hover:text-amber-800">
                      <XIcon className="w-3 h-3" />
                    </button>
                  </span>}
                <button onClick={resetFilters} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Reset all
                </button>
              </div>}
          </div>
          {/* Main Content Area */}
          <div className="flex flex-col md:flex-row">
            {/* Filter Sidebar - Desktop */}
            <div className={`${showFilters ? 'block' : 'hidden'} md:block md:w-64 flex-shrink-0 md:mr-6`}>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-20">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="font-bold text-gray-900">Filters</h2>
                  <button onClick={() => setShowFilters(false)} className="md:hidden text-gray-500 hover:text-gray-700">
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
                {/* Categories */}
                <div className="p-4 border-b">
                  <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => <label key={category.id} className="flex items-center">
                        <input type="checkbox" checked={filterOptions.categories.includes(category.name)} onChange={() => toggleCategoryFilter(category.name)} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                        <span className="ml-2 flex items-center text-gray-700">
                          <span className="mr-2">{category.icon}</span>
                          {category.name}
                        </span>
                      </label>)}
                  </div>
                </div>
                {/* Discount Types */}
                <div className="p-4 border-b">
                  <h3 className="font-medium text-gray-900 mb-3">
                    Discount Types
                  </h3>
                  <div className="space-y-2">
                    {discountTypes.map(type => <label key={type.id} className="flex items-center">
                        <input type="checkbox" checked={filterOptions.discountTypes.includes(type.id)} onChange={() => toggleDiscountTypeFilter(type.id)} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                        <span className="ml-2 flex items-center text-gray-700">
                          <span className="mr-2">{type.icon}</span>
                          {type.name}
                        </span>
                      </label>)}
                  </div>
                </div>
                {/* Distance */}
                <div className="p-4 border-b">
                  <h3 className="font-medium text-gray-900 mb-3">Distance</h3>
                  <div>
                    <input type="range" min="1" max="10" step="1" value={filterOptions.maxDistance} onChange={handleDistanceChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>1 mile</span>
                      <span>
                        {filterOptions.maxDistance}{' '}
                        {filterOptions.maxDistance === 1 ? 'mile' : 'miles'}
                      </span>
                      <span>10 miles</span>
                    </div>
                  </div>
                </div>
                {/* Other Filters */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-3">
                    Other Filters
                  </h3>
                  <label className="flex items-center">
                    <input type="checkbox" checked={filterOptions.onlyExclusive} onChange={toggleExclusiveFilter} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    <span className="ml-2 text-gray-700">
                      Exclusive Deals Only
                    </span>
                  </label>
                </div>
                {/* Reset Filters Button - Mobile Only */}
                <div className="p-4 border-t md:hidden">
                  <button onClick={resetFilters} className="w-full py-2 text-center text-blue-600 font-medium border border-blue-600 rounded-md hover:bg-blue-50">
                    Reset Filters
                  </button>
                  <button onClick={() => setShowFilters(false)} className="w-full py-2 text-center text-white font-medium bg-blue-600 rounded-md hover:bg-blue-700 mt-2">
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
            {/* Deals Content */}
            <div className="flex-grow">
              {viewMode === 'map' ? <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[calc(100vh-240px)] min-h-[500px]">
                  <div ref={mapContainerRef} className="w-full h-full bg-gray-100 relative">
                    {/* This would be replaced with an actual map component */}
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <MapIcon className="w-16 h-16 text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg">Map View</p>
                      <p className="text-gray-400 text-sm mt-2">
                        In a real app, deals would be displayed on an
                        interactive map here.
                      </p>
                    </div>
                    {/* List of deals that would be shown on the side of the map */}
                    <div className="absolute top-4 right-4 w-80 max-h-[calc(100%-32px)] overflow-y-auto bg-white rounded-lg shadow-lg">
                      <div className="p-3 border-b">
                        <h3 className="font-medium">
                          {filteredDeals.length}{' '}
                          {filteredDeals.length === 1 ? 'Deal' : 'Deals'} Found
                        </h3>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {filteredDeals.slice(0, 5).map(deal => <div key={deal.id} className="p-3 hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                {deal.business.logo ? <img src={deal.business.logo} alt={deal.business.name} className="w-10 h-10 rounded-full object-cover" /> : <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <BuildingIcon className="w-5 h-5 text-gray-500" />
                                  </div>}
                              </div>
                              <div className="ml-3 flex-grow">
                                <p className="font-medium text-sm">
                                  {deal.title}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {deal.business.name}
                                </p>
                                <div className="flex items-center mt-1">
                                  <span className="text-xs font-medium bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                                    {getDiscountLabel(deal)}
                                  </span>
                                  <span className="text-xs text-gray-500 ml-2 flex items-center">
                                    <MapPinIcon className="w-3 h-3 mr-0.5" />
                                    {deal.business.distance} mi
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>)}
                        {filteredDeals.length > 5 && <div className="p-3 text-center">
                            <button className="text-sm text-blue-600 font-medium">
                              View all {filteredDeals.length} deals
                            </button>
                          </div>}
                      </div>
                    </div>
                  </div>
                </div> : <>
                  {/* Featured Deals */}
                  {filteredDeals.some(deal => deal.isFeatured) && <div className="mb-8">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Featured Deals
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredDeals.filter(deal => deal.isFeatured).slice(0, 2).map(deal => <div key={deal.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                              <div className="relative h-48">
                                {deal.imageUrl ? <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <BuildingIcon className="w-12 h-12 text-gray-400" />
                                  </div>}
                                <div className="absolute top-0 left-0 m-3">
                                  <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-md">
                                    {getDiscountLabel(deal)}
                                  </span>
                                </div>
                                {deal.isExclusive && <div className="absolute top-0 right-0 m-3">
                                    <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                                      EXCLUSIVE
                                    </span>
                                  </div>}
                              </div>
                              <div className="p-4">
                                <div className="flex items-center mb-2">
                                  {deal.business.logo ? <img src={deal.business.logo} alt={deal.business.name} className="w-8 h-8 rounded-full object-cover mr-2" /> : <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                                      <BuildingIcon className="w-4 h-4 text-gray-500" />
                                    </div>}
                                  <div>
                                    <p className="text-sm font-medium">
                                      {deal.business.name}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-500">
                                      <StarIcon className="w-3 h-3 text-yellow-500 mr-1" />
                                      <span>{deal.business.rating}</span>
                                      <span className="mx-1">·</span>
                                      <span>
                                        {deal.business.reviewCount} reviews
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">
                                  {deal.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                  {deal.description}
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-xs text-gray-500">
                                    <ClockIcon className="w-3 h-3 mr-1" />
                                    <span>
                                      Expires {formatDate(deal.expiresAt)}
                                    </span>
                                  </div>
                                  <button onClick={() => toggleSaveDeal(deal.id)} className={`p-1.5 rounded-full ${savedDeals.includes(deal.id) ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}>
                                    <HeartIcon className="w-5 h-5" />
                                  </button>
                                </div>
                                <Link to={`/deals/${deal.id}`} className="mt-3 w-full inline-block text-center py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                                  View Deal
                                </Link>
                              </div>
                            </div>)}
                      </div>
                    </div>}
                  {/* All Deals */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-gray-900">
                        {filteredDeals.length}{' '}
                        {filteredDeals.length === 1 ? 'Deal' : 'Deals'}{' '}
                        Available
                      </h2>
                    </div>
                    {filteredDeals.length === 0 ? <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <TagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No deals found
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Try adjusting your filters or search terms to find
                          more deals.
                        </p>
                        <button onClick={resetFilters} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                          Reset Filters
                        </button>
                      </div> : viewMode === 'grid' ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredDeals.map(deal => <div key={deal.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="relative h-40">
                              {deal.imageUrl ? <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                  <BuildingIcon className="w-10 h-10 text-gray-400" />
                                </div>}
                              <div className="absolute top-0 left-0 m-3">
                                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                                  {getDiscountLabel(deal)}
                                </span>
                              </div>
                              {deal.isExclusive && <div className="absolute top-0 right-0 m-3">
                                  <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                                    EXCLUSIVE
                                  </span>
                                </div>}
                            </div>
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                {deal.business.logo ? <img src={deal.business.logo} alt={deal.business.name} className="w-6 h-6 rounded-full object-cover mr-2" /> : <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                                    <BuildingIcon className="w-3 h-3 text-gray-500" />
                                  </div>}
                                <p className="text-sm font-medium">
                                  {deal.business.name}
                                </p>
                              </div>
                              <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">
                                {deal.title}
                              </h3>
                              <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                {deal.description}
                              </p>
                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center text-gray-500">
                                  <MapPinIcon className="w-3 h-3 mr-1" />
                                  <span>{deal.business.distance} mi</span>
                                </div>
                                <div className="flex items-center text-gray-500">
                                  <ClockIcon className="w-3 h-3 mr-1" />
                                  <span>
                                    {getDaysRemaining(deal.expiresAt) <= 0 ? 'Expired' : `${getDaysRemaining(deal.expiresAt)} days left`}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-3">
                                <Link to={`/deals/${deal.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                  View Deal
                                </Link>
                                <button onClick={() => toggleSaveDeal(deal.id)} className={`p-1.5 rounded-full ${savedDeals.includes(deal.id) ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}>
                                  <HeartIcon className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>)}
                      </div> : <div className="space-y-4">
                        {filteredDeals.map(deal => <div key={deal.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="md:flex">
                              <div className="md:w-1/4 relative h-48 md:h-auto">
                                {deal.imageUrl ? <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <BuildingIcon className="w-12 h-12 text-gray-400" />
                                  </div>}
                                <div className="absolute top-0 left-0 m-3">
                                  <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-md">
                                    {getDiscountLabel(deal)}
                                  </span>
                                </div>
                                {deal.isExclusive && <div className="absolute top-0 right-0 m-3">
                                    <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                                      EXCLUSIVE
                                    </span>
                                  </div>}
                              </div>
                              <div className="p-4 md:p-6 md:w-3/4">
                                <div className="flex items-center mb-2">
                                  {deal.business.logo ? <img src={deal.business.logo} alt={deal.business.name} className="w-8 h-8 rounded-full object-cover mr-2" /> : <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                                      <BuildingIcon className="w-4 h-4 text-gray-500" />
                                    </div>}
                                  <div>
                                    <p className="font-medium">
                                      {deal.business.name}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-500">
                                      <StarIcon className="w-3 h-3 text-yellow-500 mr-1" />
                                      <span>{deal.business.rating}</span>
                                      <span className="mx-1">·</span>
                                      <span>
                                        {deal.business.reviewCount} reviews
                                      </span>
                                      <span className="mx-1">·</span>
                                      <MapPinIcon className="w-3 h-3 mr-1" />
                                      <span>{deal.business.distance} mi</span>
                                    </div>
                                  </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                  {deal.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                  {deal.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {deal.tags.map((tag, index) => <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                                      {tag}
                                    </span>)}
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                  <div className="flex items-center mb-2 sm:mb-0">
                                    <div className="flex items-center text-sm text-gray-500 mr-4">
                                      <ClockIcon className="w-4 h-4 mr-1" />
                                      <span>
                                        Expires {formatDate(deal.expiresAt)}
                                      </span>
                                    </div>
                                    {deal.discountCode && <div className="flex items-center text-sm">
                                        <span className="text-gray-600 mr-2">
                                          Code:
                                        </span>
                                        <span className="font-mono bg-gray-100 px-2 py-0.5 rounded font-medium">
                                          {deal.discountCode}
                                        </span>
                                      </div>}
                                  </div>
                                  <div className="flex items-center">
                                    <button onClick={() => toggleSaveDeal(deal.id)} className={`p-1.5 rounded-full ${savedDeals.includes(deal.id) ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'} mr-2`}>
                                      <HeartIcon className="w-5 h-5" />
                                    </button>
                                    <Link to={`/deals/${deal.id}`} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                                      View Deal
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>)}
                      </div>}
                  </div>
                </>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}