import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { json, useLoaderData, Link, useNavigate } from 'react-router';
import type { Route } from './+types/route';
import React, { useEffect, useState, createElement } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SocialShareModal } from '../components/SocialShareModal';
import { ArrowLeftIcon, MapPinIcon, StarIcon, ClockIcon, CalendarIcon, TagIcon, PercentIcon, ShoppingCartIcon, GiftIcon, HeartIcon, ShareIcon, ExternalLinkIcon, CheckIcon, PhoneIcon, BuildingIcon, InfoIcon, ChevronRightIcon, MapIcon, UsersIcon, CopyIcon, XIcon } from 'lucide-react';
// Types
interface Deal {
  id: string;
  businessId: string;
  title: string;
  description: string;
  discount: {
    type: string;
    value: number;
  };
  expiryDate: string;
  code: string;
  howToRedeem?: string;
  termsAndConditions?: string;
  isExclusive: boolean;
  isPopular: boolean;
  isRecommended: boolean;
  redemptionCount: number;
  pointsCost?: number;
  business: {
    name: string;
    image: string;
    address: string;
    phone: string;
    website: string;
    category: string;
    rating: number;
    reviewCount: number;
  };
  relatedDeals?: {
    id: string;
    title: string;
    businessName: string;
    businessImage: string;
    discount: {
      type: string;
      value: number;
    };
  }[];
}
// Mock data for a deal
const mockDeal: Deal = {
  id: 'deal1',
  businessId: 'biz1',
  title: '50% Off All Coffee Drinks',
  description: 'Enjoy half-price coffee drinks any time of day, Monday through Friday. Includes specialty drinks, cold brew, and seasonal favorites. Limit one per customer per visit. Cannot be combined with other offers. Perfect for your morning pick-me-up or afternoon coffee break!',
  discount: {
    type: 'percentage',
    value: 50
  },
  expiryDate: '2023-12-31',
  code: 'COFFEE50',
  howToRedeem: 'Show this deal to the cashier when ordering. The discount will be applied to your entire order of coffee drinks.',
  termsAndConditions: 'Valid Monday-Friday only. Cannot be combined with other offers. Limit one per customer per visit. Not valid on national holidays.',
  isExclusive: true,
  isPopular: true,
  isRecommended: true,
  redemptionCount: 342,
  pointsCost: 150,
  business: {
    name: 'Urban Bites Café',
    image: '/images/placeholder.jpg',
    address: '123 Main Street, Downtown, CA 90210',
    phone: '(555) 123-4567',
    website: 'https://www.urbanbites.example',
    category: 'Café',
    rating: 4.7,
    reviewCount: 128
  },
  relatedDeals: [{
    id: 'deal2',
    title: 'Free Pastry with Any Coffee Purchase',
    businessName: 'Downtown Bakery',
    businessImage: '/images/placeholder.jpg',
    discount: {
      type: 'free',
      value: 0
    }
  }, {
    id: 'deal3',
    title: '20% Off Any Book Purchase',
    businessName: 'Riverside Books',
    businessImage: '/images/placeholder.jpg',
    discount: {
      type: 'percentage',
      value: 20
    }
  }]
};
export function DealDetail() {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'terms' | 'location'>('details');
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const navigate = useNavigate();
  // For demo purposes - in a real app, this would come from an auth context
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setDeal(mockDeal);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);
  const handleCopyCode = async () => {
    if (!deal?.code) return;
    try {
      // First try the modern clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(deal.code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } else {
        // Fallback for non-secure contexts or older browsers
        const textArea = document.createElement('textarea');
        textArea.value = deal.code;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
          console.error('Fallback copy failed:', err);
        } finally {
          textArea.remove();
        }
      }
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };
  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };
  const handleSaveDeal = () => {
    if (!isLoggedIn) {
      // Show login modal or redirect to login page
      setShowLoginModal(true);
    } else {
      // Handle saving the deal for logged in users
      alert('Deal saved to your favorites!');
      // In a real app, make an API call to save the deal to the user's favorites
    }
  };
  // Format date to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading deal information...</p>
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </main>
        <Footer />
      </div>;
  }
  if (error || !deal) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              {error || 'Deal not found. It may have been removed or expired.'}
            </p>
            <Link to="/deals" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Deals
            </Link>
          </div>
        </main>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        {/* Back navigation */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <Link to="/deals" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              Back to Deals
            </Link>
          </div>
        </div>

        {/* Deal header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:w-2/3">
                {deal.isExclusive && <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full mb-2">
                    Exclusive Deal
                  </span>}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {deal.title}
                </h1>
                <div className="flex items-center mb-4">
                  <Link to={`/business/${deal.businessId}`} className="flex items-center">
                    <img src={deal.business.image} alt={deal.business.name} className="w-8 h-8 rounded-full object-cover mr-2" />
                    <span className="font-medium text-gray-900">
                      {deal.business.name}
                    </span>
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <span>Expires: {formatDate(deal.expiryDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <UsersIcon className="w-4 h-4 mr-1" />
                    <span>{deal.redemptionCount} redeemed</span>
                  </div>
                  {deal.pointsCost && <div className="flex items-center">
                      <GiftIcon className="w-4 h-4 mr-1" />
                      <span>{deal.pointsCost} points</span>
                    </div>}
                </div>
              </div>
              <div className="md:w-1/3 mt-4 md:mt-0 md:flex md:justify-end">
                <div className="bg-gray-100 p-4 rounded-lg w-full md:max-w-xs">
                  <div className="text-center mb-3">
                    <span className="text-sm text-gray-600">Deal Code</span>
                    <div className="flex items-center justify-center mt-1">
                      <div className="bg-white border border-gray-300 rounded-l-md px-4 py-2 font-mono font-bold text-lg flex-grow text-center">
                        {deal.code}
                      </div>
                      <button onClick={handleCopyCode} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r-md" aria-label="Copy code">
                        {isCopied ? <CheckIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
                      </button>
                    </div>
                    {isCopied && <span className="text-xs text-green-600 mt-1 block">
                        Copied to clipboard!
                      </span>}
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">
                    Redeem Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex">
              <button onClick={() => setActiveTab('details')} className={`px-4 py-3 font-medium text-sm ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                Deal Details
              </button>
              <button onClick={() => setActiveTab('terms')} className={`px-4 py-3 font-medium text-sm ${activeTab === 'terms' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                Terms & Conditions
              </button>
              <button onClick={() => setActiveTab('location')} className={`px-4 py-3 font-medium text-sm ${activeTab === 'location' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                Business Location
              </button>
            </div>
          </div>
        </div>

        {/* Tab content */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {activeTab === 'details' && <div>
                  <h2 className="text-lg font-semibold mb-3">
                    About This Deal
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {showFullDescription ? deal.description : `${deal.description.substring(0, 150)}${deal.description.length > 150 ? '...' : ''}`}
                    {deal.description.length > 150 && <button onClick={() => setShowFullDescription(!showFullDescription)} className="ml-1 text-blue-600 hover:text-blue-800 font-medium">
                        {showFullDescription ? 'Show less' : 'Show more'}
                      </button>}
                  </p>
                  {deal.howToRedeem && <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                      <h3 className="font-semibold text-blue-800 mb-2">
                        How to Redeem
                      </h3>
                      <p className="text-blue-700 text-sm">
                        {deal.howToRedeem}
                      </p>
                    </div>}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center">
                      <UsersIcon className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-gray-700">
                        {deal.redemptionCount} people redeemed this deal
                      </span>
                    </div>
                    <div>
                      <Link to={`/business/${deal.businessId}`} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                        Visit Business
                        <ExternalLinkIcon className="w-4 h-4 ml-1.5" />
                      </Link>
                    </div>
                  </div>
                </div>}
              {activeTab === 'terms' && <div>
                  <h2 className="text-lg font-semibold mb-3">
                    Terms & Conditions
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-700 text-sm whitespace-pre-line">
                      {deal.termsAndConditions || 'No specific terms and conditions provided for this deal.'}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h3 className="font-medium text-gray-900 mb-2">
                        General Terms:
                      </h3>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li className="flex items-start">
                          <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span>
                            Deal must be presented at time of purchase.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span>
                            Cannot be combined with other offers or promotions.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span>Valid only at the location specified.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span>Expires on {formatDate(deal.expiryDate)}.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>}
              {activeTab === 'location' && <div>
                  <h2 className="text-lg font-semibold mb-3">
                    Business Information
                  </h2>
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="h-48 bg-gray-200">
                      {/* Map would go here in a real implementation */}
                      <div className="h-full flex items-center justify-center bg-gray-100">
                        <MapIcon className="w-12 h-12 text-gray-400" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {deal.business.name}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <MapPinIcon className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">
                            {deal.business.address}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon className="w-5 h-5 text-gray-500 mr-2" />
                          <span className="text-gray-700">
                            {deal.business.phone}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <ExternalLinkIcon className="w-5 h-5 text-gray-500 mr-2" />
                          <a href="#" className="text-blue-600 hover:underline">
                            {deal.business.website}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <TagIcon className="w-5 h-5 text-gray-500 mr-2" />
                          <span className="text-gray-700">
                            {deal.business.category}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <StarIcon className="w-5 h-5 text-yellow-400 mr-2" />
                          <span className="text-gray-700">
                            {deal.business.rating} ({deal.business.reviewCount}{' '}
                            reviews)
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Link to={`/business/${deal.businessId}`} className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                          View Business Profile
                          <ChevronRightIcon className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>}
            </div>

            {/* Sidebar */}
            <div>
              {/* Related deals */}
              {deal.relatedDeals && deal.relatedDeals.length > 0 && <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Related Deals
                  </h3>
                  <div className="space-y-4">
                    {deal.relatedDeals.map(relatedDeal => <Link key={relatedDeal.id} to={`/deals/${relatedDeal.id}`} className="flex items-start group">
                        <img src={relatedDeal.businessImage} alt={relatedDeal.businessName} className="w-12 h-12 rounded-md object-cover mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                            {relatedDeal.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {relatedDeal.businessName}
                          </p>
                          <div className="mt-1">
                            <span className="text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                              {relatedDeal.discount.type === 'percentage' ? `${relatedDeal.discount.value}% Off` : relatedDeal.discount.type === 'fixed' ? `$${relatedDeal.discount.value} Off` : 'Free Item'}
                            </span>
                          </div>
                        </div>
                      </Link>)}
                  </div>
                </div>}

              {/* Action buttons */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Actions</h3>
                <div className="space-y-2">
                  <button onClick={handleSaveDeal} className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    <HeartIcon className="w-5 h-5 mr-2" />
                    Save Deal
                  </button>
                  <button onClick={handleShareClick} className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    <ShareIcon className="w-5 h-5 mr-2" />
                    Share Deal
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    <InfoIcon className="w-5 h-5 mr-2" />
                    Report Issue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {deal && <SocialShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} title={deal.title} description={deal.description} imageUrl={deal.business.image} url={window.location.href} />}
      {/* Login Modal */}
      {showLoginModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Login Required
                </h3>
                <button onClick={() => setShowLoginModal(false)} className="text-gray-400 hover:text-gray-600">
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  You need to be logged in to save deals to your account.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={() => navigate('/login')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">
                  Log In
                </button>
                <button onClick={() => navigate('/register')} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md">
                  Sign Up
                </button>
                <button onClick={() => setShowLoginModal(false)} className="w-full text-gray-600 hover:text-gray-800 py-2 px-4">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
}

// React Router 7 loader function
export async function loader({ params, request }: Route.LoaderArgs) {
  const { supabase, headers } = getSupabaseServerClient(request);
  
  try {
    // Get generic data - customize based on page needs
    const { data: items, error } = await supabase
      .from('businesses') // Change table as needed
      .select('*')
      .limit(10);

    if (error) {
      console.error('Error fetching data:', error);
    }

    const transformedData = {
      // Transform data to match component interface
      items: businesses || events || items || []
    };

    return json(transformedData, { headers });
  } catch (error) {
    console.error('Loader error:', error);
    // Return empty data on error
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