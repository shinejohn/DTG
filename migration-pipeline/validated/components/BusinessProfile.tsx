import React, { useEffect, useState, Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPinIcon, PhoneIcon, MailIcon, GlobeIcon, ClockIcon, StarIcon, CheckCircleIcon, TagIcon, WifiIcon, CreditCardIcon, ShareIcon, ThumbsUpIcon, MessageSquareIcon, BookmarkIcon, ChevronLeftIcon, ChevronRightIcon, UtensilsIcon, CalendarIcon, NewspaperIcon, ClockIcon as ClockIconOutline, ArrowLeftIcon, ExternalLinkIcon, UserIcon, ZoomInIcon, CameraIcon } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
// Import your API service
import { fetchBusinessBySlug } from '../services/businessService';
// Types
interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  holidayHours?: Record<string, string>;
}
interface Photo {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
  type: 'exterior' | 'interior' | 'food' | 'menu' | 'team' | 'other';
}
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  photoUrl?: string;
  popular?: boolean;
}
interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  yelp?: string;
}
interface Review {
  id: string;
  authorName: string;
  authorImage?: string;
  rating: number;
  date: string;
  content: string;
  helpful: number;
  images?: string[];
  response?: {
    authorName: string;
    date: string;
    content: string;
  };
}
interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  publishDate: string;
  author: string;
  source: string;
  sourceUrl: string;
  imageUrl?: string;
  tags: string[];
  category: string;
}
interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  address: string;
  imageUrl?: string;
  organizer: string;
  price?: string;
  ticketUrl?: string;
  tags: string[];
  capacity?: number;
  attendees?: number;
}
interface Business {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  shortDescription: string;
  contact: {
    phone: string;
    email: string;
    website: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
      latitude?: number;
      longitude?: number;
    };
  };
  hours: BusinessHours;
  features: string[];
  amenities: string[];
  paymentMethods: string[];
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  photos: Photo[];
  menu?: MenuItem[];
  socialMedia?: SocialLinks;
  reviews?: Review[];
  articles?: Article[];
  events?: Event[];
  rating?: number;
  reviewCount?: number;
  status: 'active' | 'pending' | 'suspended' | 'rejected';
  verified: boolean;
  featured: boolean;
}
interface BusinessProfileProps {
  slug: string;
}
export function BusinessProfile({
  slug
}: BusinessProfileProps) {
  const [business, setBusiness] = useState<Business | null>(null);
  // TODO: Remove useState for data - pass from parent or use context
  // TODO: Remove useState for data - pass from parent or use context
  // TODO: Remove useState for data - pass from parent or use context
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  // TODO: Remove useState for data - pass from parent or use context
  // TODO: Remove useState for data - pass from parent or use context
  const navigate = useNavigate();
  // Set loading state
  useEffect(() => {
    setLoading(true);
    // Fetch real data from API
    fetchBusinessBySlug(slug).then(data => {
      setBusiness(data);
    }).catch(error => {
      // console.error('Error fetching business data:', error);
      // You might want to set an error state here
    }).finally(() => {
      setLoading(false);
    });
  }, [slug]);
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading business profile...</p>
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
              We couldn't find the business you're looking for.
            </p>
            <Link to="/explore" className="text-blue-600 hover:text-blue-800 font-medium">
              Explore Other Businesses
            </Link>
          </div>
        </main>
        <Footer />
      </div>;
  }
  const nextPhoto = () => {
    setActivePhotoIndex(prevIndex => prevIndex === business.photos.length - 1 ? 0 : prevIndex + 1);
  };
  const prevPhoto = () => {
    setActivePhotoIndex(prevIndex => prevIndex === 0 ? business.photos.length - 1 : prevIndex - 1);
  };
  // Group menu items by category
  const menuCategories = business.menu ? business.menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>) : {};
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  // Format event time
  const formatEventTime = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    return `${start.toLocaleTimeString('en-US', timeOptions)} - ${end.toLocaleTimeString('en-US', timeOptions)}`;
  };
  // Check if an event is upcoming, happening now, or past
  const getEventStatus = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (now < start) return 'upcoming';
    if (now >= start && now <= end) return 'happening now';
    return 'past';
  };
  // Sort articles by publish date (most recent first)
  const sortedArticles = business.articles ? [...business.articles].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()) : [];
  // Sort events by start date (most recent first)
  const sortedEvents = business.events ? [...business.events].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()) : [];
  // Filter upcoming events
  const upcomingEvents = sortedEvents.filter(event => getEventStatus(event.startDate, event.endDate) !== 'past');
  // Filter past events
  const pastEvents = sortedEvents.filter(event => getEventStatus(event.startDate, event.endDate) === 'past');
  // Handle writing a review
  const handleWriteReview = () => {
    if (business) {
      navigate(`/review/${business.id}`);
    }
  };
  // Handle sharing
  const handleShare = () => {
    setShareModalOpen(true);
  };
  // Handle close share modal
  const handleCloseShareModal = () => {
    setShareModalOpen(false);
  };
  // Handle actual sharing
  const handleShareVia = (platform: 'facebook' | 'twitter' | 'email' | 'copy') => {
    if (!business) return;
    const businessUrl = window.location.href;
    const businessName = business.name;
    const message = `Check out ${businessName} on our platform!`;
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(businessUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(businessUrl)}&text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(`Check out ${businessName}`)}&body=${encodeURIComponent(`${message}\n${businessUrl}`)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(businessUrl).then(() => {
          alert('Link copied to clipboard!');
        }).catch(err => {
          // console.error('Could not copy text: ', err);
        });
        break;
    }
    setShareModalOpen(false);
  };
  // Handle favorite/bookmark
  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
    // In a real app, you would make an API call here to save/remove the favorite
    if (!isFavorited) {
      // console.log(`Adding ${business?.name} to favorites`);
      // Mock adding to favorites
      if (business) {
        const newFavorite = {
          id: `fav-${Date.now()}`,
          businessId: business.id,
          businessName: business.name,
          businessImage: business.photos[0].url,
          businessCategory: business.category,
          createdAt: new Date().toISOString()
        };
        // In a real app, you would update the user's favorites in the backend
        // For now, we'll just show a success message
        setTimeout(() => {
          alert(`${business.name} has been added to your favorites!`);
        }, 500);
      }
    } else {
      // console.log(`Removing ${business?.name} from favorites`);
      // Mock removing from favorites
      setTimeout(() => {
        alert(`${business?.name} has been removed from your favorites!`);
      }, 500);
    }
  };
  return <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        {/* Hero Section with Main Photo */}
        <div className="relative h-80 md:h-96 bg-gray-100">
          <img src={business.photos[activePhotoIndex].url} alt={business.photos[activePhotoIndex].alt} className="w-full h-full object-cover" />
          {/* Photo Navigation */}
          <button onClick={prevPhoto} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100" aria-label="Previous photo">
            <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
          </button>
          <button onClick={nextPhoto} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100" aria-label="Next photo">
            <ChevronRightIcon className="w-6 h-6 text-gray-800" />
          </button>
          {/* Photo Counter */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
            {activePhotoIndex + 1} / {business.photos.length}
          </div>
        </div>

        {/* Business Header Info */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {business.name}
              </h1>
              <div className="flex flex-wrap items-center mt-2">
                <div className="flex items-center mr-4">
                  <div className="flex items-center">
                    <StarIcon className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="ml-1 font-medium">{business.rating}</span>
                  </div>
                  <span className="ml-1 text-gray-600">
                    ({business.reviewCount} reviews)
                  </span>
                </div>
                <span className="text-gray-600 mr-4">
                  {business.category}{' '}
                  {business.subcategory ? `• ${business.subcategory}` : ''}
                </span>
                <span className="text-gray-600 mr-4">
                  {business.priceRange}
                </span>
                {business.verified && <span className="inline-flex items-center text-blue-700 font-medium text-sm">
                    <CheckCircleIcon className="w-4 h-4 mr-1" />
                    Verified
                  </span>}
              </div>
            </div>
            <div className="flex mt-4 md:mt-0 space-x-2">
              <button onClick={handleWriteReview} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                <MessageSquareIcon className="w-4 h-4 mr-2" />
                Write a Review
              </button>
              <button onClick={handleShare} className="p-2 border border-gray-300 rounded-md hover:bg-gray-50" aria-label="Share">
                <ShareIcon className="w-5 h-5 text-gray-700" />
              </button>
              <button onClick={handleToggleFavorite} className={`p-2 border border-gray-300 rounded-md hover:bg-gray-50 ${isFavorited ? 'bg-blue-50 border-blue-300' : ''}`} aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}>
                <BookmarkIcon className={`w-5 h-5 ${isFavorited ? 'text-blue-600 fill-current' : 'text-gray-700'}`} />
              </button>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">
                Location & Contact
              </h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <MapPinIcon className="w-5 h-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    {business.contact.address.street},{' '}
                    {business.contact.address.city},{' '}
                    {business.contact.address.state}{' '}
                    {business.contact.address.zipCode}
                  </span>
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">
                    {business.contact.phone}
                  </span>
                </div>
                <div className="flex items-center">
                  <GlobeIcon className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
                  <a href={business.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {business.contact.website.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Business Hours</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Monday</span>
                  <span>{business.hours.monday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Tuesday</span>
                  <span>{business.hours.tuesday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Wednesday</span>
                  <span>{business.hours.wednesday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Thursday</span>
                  <span>{business.hours.thursday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Friday</span>
                  <span>{business.hours.friday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday</span>
                  <span>{business.hours.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday</span>
                  <span>{business.hours.sunday}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">
                Features & Amenities
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {business.features.slice(0, 3).map((feature, index) => <div key={`feature-${index}`} className="flex items-center">
                    <TagIcon className="w-4 h-4 text-blue-600 mr-1" />
                    <span>{feature}</span>
                  </div>)}
                {business.amenities.slice(0, 3).map((amenity, index) => <div key={`amenity-${index}`} className="flex items-center">
                    <WifiIcon className="w-4 h-4 text-blue-600 mr-1" />
                    <span>{amenity}</span>
                  </div>)}
              </div>
              <div className="mt-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                + Show more features
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8 overflow-x-auto">
            <button onClick={() => setActiveTab('about')} className={`py-4 px-1 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'about' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              About
            </button>
            <button onClick={() => setActiveTab('menu')} className={`py-4 px-1 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'menu' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              Menu
            </button>
            <button onClick={() => setActiveTab('photos')} className={`py-4 px-1 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'photos' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              Photos
            </button>
            <button onClick={() => setActiveTab('reviews')} className={`py-4 px-1 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'reviews' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              Reviews
            </button>
            <button onClick={() => {
            setActiveTab('articles');
            setSelectedArticle(null);
          }} className={`py-4 px-1 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'articles' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              Articles
            </button>
            <button onClick={() => {
            setActiveTab('events');
            setSelectedEvent(null);
          }} className={`py-4 px-1 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'events' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              Events
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mb-12">
          {/* About Tab */}
          {activeTab === 'about' && <div>
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About {business.name}
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {business.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Features
                    </h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {business.features.map((feature, index) => <li key={`feature-full-${index}`} className="flex items-center">
                          <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                          <span>{feature}</span>
                        </li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Amenities
                    </h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {business.amenities.map((amenity, index) => <li key={`amenity-full-${index}`} className="flex items-center">
                          <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                          <span>{amenity}</span>
                        </li>)}
                    </ul>
                  </div>
                </div>
              </section>
              <section className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Payment Methods
                </h3>
                <div className="flex flex-wrap gap-2">
                  {business.paymentMethods.map((method, index) => <span key={`payment-${index}`} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                      <CreditCardIcon className="w-4 h-4 mr-1" />
                      {method}
                    </span>)}
                </div>
              </section>
              {business.socialMedia && <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Connect with {business.name}
                  </h3>
                  <div className="flex gap-3">
                    {business.socialMedia.facebook && <a href={business.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1877F2] text-white rounded-full hover:opacity-90">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                      </a>}
                    {business.socialMedia.instagram && <a href={business.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#E1306C] text-white rounded-full hover:opacity-90">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2c2.717 0 3.056.01 4.122.059 1.065.045 1.505.207 1.858.344 1.066.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772 4.915 4.915 0 01-1.772 1.153c-.35.35-.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.986-.01 4.04-.058 1.066-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.04-.058zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055.058-1.37.058 4.04 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858a3.097 3.097 0 00-.748 1.15 3.098 3.098 0 00-1.15.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.04-.058z" />
                        </svg>
                      </a>}
                  </div>
                </section>}
            </div>}
        </div>
      </main>
    </div>;
}