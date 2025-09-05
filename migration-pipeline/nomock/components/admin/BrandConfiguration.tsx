import React, { useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, TrashIcon, PencilIcon, EyeIcon, GlobeIcon, PaletteIcon, ToggleLeftIcon, LayoutIcon, ImageIcon, CheckIcon, XIcon, MapPinIcon } from 'lucide-react';
import { getAllCommunities } from '../../services/CommunityService';
import { saveBrands } from '../../services/BrandService';
import { useBrand } from '../../contexts/BrandContext';
// Mock data for brands
const initialBrands = [
// INTEREST-BASED BRAND (Global Explorer type)
{
  id: 'foodie-quest',
  name: 'Foodie Quest',
  domain: 'foodiequest.wtf',
  logo: '/images/placeholder.jpg',
  primaryColor: '#FF6B6B',
  secondaryColor: '#C44D4D',
  isActive: true,
  brandType: 'interest',
  features: {
    rewards: true,
    events: true,
    challenges: true,
    deals: true
  },
  communities: ['nyc', 'la', 'chi', 'sf', 'mia'],
  experience: {
    headline: 'Taste the Flavors of {city}',
    description: 'Nothing beats experiencing the local cuisine! From hidden gems to award-winning restaurants, discover the best food experiences {city} has to offer.',
    searchPlaceholder: 'Search for restaurants, cafés, food trucks...',
    backgroundImage: '/images/placeholder.jpg',
    featuredCategories: ['Restaurants', 'Cafés', 'Food Trucks', 'Bakeries', 'Markets']
  }
}, {
  id: 'brewery-explorer',
  name: 'Brewery Explorer',
  domain: 'breweryexplorer.wtf',
  logo: '/images/placeholder.jpg',
  primaryColor: '#FFA62B',
  secondaryColor: '#C16A26',
  isActive: true,
  brandType: 'interest',
  features: {
    rewards: true,
    events: true,
    challenges: true,
    deals: true
  },
  communities: ['nyc', 'por', 'den', 'sea', 'sf', 'chi'],
  experience: {
    headline: 'Craft Beer Paradise in {city}',
    description: "Nothing better than trying the latest brew from one of {city}'s local breweries! Discover unique flavors, meet passionate brewers, and find your new favorite craft beer spot.",
    searchPlaceholder: 'Search for breweries, taprooms, beer gardens...',
    backgroundImage: '/images/placeholder.jpg',
    featuredCategories: ['Breweries', 'Taprooms', 'Beer Gardens', 'Bottle Shops', 'Brewery Tours']
  }
}, {
  id: 'wine-quest',
  name: 'Wine Quest',
  domain: 'winequest.wtf',
  logo: '/images/placeholder.jpg',
  primaryColor: '#8E0000',
  secondaryColor: '#5E0000',
  isActive: true,
  brandType: 'interest',
  features: {
    rewards: true,
    events: true,
    challenges: true,
    deals: true
  },
  communities: ['sf', 'por', 'aus', 'nyc', 'la'],
  experience: {
    headline: 'Uncork the Wine Experience in {city}',
    description: "From elegant tasting rooms to picturesque vineyards, explore {city}'s finest wine destinations. Discover local vintages, meet winemakers, and enjoy the perfect glass.",
    searchPlaceholder: 'Search for wineries, vineyards, wine bars...',
    backgroundImage: '/images/placeholder.jpg',
    featuredCategories: ['Wineries', 'Vineyards', 'Wine Bars', 'Tasting Rooms', 'Wine Tours']
  }
}, {
  id: 'entertainment-explorer',
  name: 'Entertainment Explorer',
  domain: 'entertainmentexplorer.wtf',
  logo: '/images/placeholder.jpg',
  primaryColor: '#3D348B',
  secondaryColor: '#7678ED',
  isActive: true,
  brandType: 'interest',
  features: {
    rewards: true,
    events: true,
    challenges: true,
    deals: true
  },
  communities: ['nyc', 'chi', 'la', 'sf', 'aus'],
  experience: {
    headline: 'Live Entertainment in {city}',
    description: "Looking for an unforgettable night out? Discover {city}'s vibrant entertainment scene - from intimate venues to major shows, find the perfect live experience.",
    searchPlaceholder: 'Search for venues, shows, concerts, theaters...',
    backgroundImage: '/images/placeholder.jpg',
    featuredCategories: ['Venues', 'Theaters', 'Concert Halls', 'Comedy Clubs', 'Performance Spaces']
  }
}, {
  id: 'retail-therapy',
  name: 'Retail Therapy',
  domain: 'retailtherapy.wtf',
  logo: '/images/placeholder.jpg',
  primaryColor: '#5F4B8B',
  secondaryColor: '#E69A8D',
  isActive: true,
  brandType: 'interest',
  features: {
    rewards: true,
    events: true,
    challenges: true,
    deals: true
  },
  communities: ['nyc', 'sf', 'chi', 'la', 'mia'],
  experience: {
    headline: "Shop 'Til You Drop in {city}",
    description: "Calling all shoppers! Discover {city}'s best boutiques, markets, and shopping destinations. From luxury brands to local treasures, find exactly what you're looking for.",
    searchPlaceholder: 'Search for shops, boutiques, markets...',
    backgroundImage: '/images/placeholder.jpg',
    featuredCategories: ['Boutiques', 'Malls', 'Markets', 'Specialty Shops', 'Department Stores']
  }
},
// COMMUNITY-BASED BRAND (Downtown Guide type)
{
  id: 'downtown-guide',
  name: 'Downtown Guide',
  domain: 'downtownguide.com',
  logo: '/images/placeholder.jpg',
  primaryColor: '#3B82F6',
  secondaryColor: '#1E40AF',
  isActive: true,
  brandType: 'community',
  features: {
    rewards: true,
    events: true,
    challenges: true,
    deals: true
  },
  communities: ['nyc', 'sf', 'chi', 'la', 'mia', 'sea', 'aus', 'den', 'bos', 'por'],
  experience: {
    headline: 'Discover Downtown {city}',
    description: 'Explore the heart of {city} - where history, culture, and urban energy come together.',
    searchPlaceholder: 'Search for restaurants, shops, events...',
    backgroundImage: '/images/placeholder.jpg',
    featuredCategories: ['Restaurants', 'Shopping', 'Entertainment', 'Services', 'Nightlife', 'Events']
  }
}];
interface Brand {
  id: string;
  name: string;
  domain: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  isActive: boolean;
  brandType: 'community' | 'interest'; // New field to distinguish brand types
  features: {
    rewards: boolean;
    events: boolean;
    challenges: boolean;
    deals: boolean;
  };
  communities?: string[];
  experience?: {
    headline?: string;
    description?: string;
    searchPlaceholder?: string;
    backgroundImage?: string;
    featuredCategories?: string[];
    newsletterTitle?: string;
    newsletterDescription?: string;
    newsletterButtonText?: string;
  };
  pageSections?: {
    hero: boolean;
    featuredCategories: boolean;
    popularPlaces: boolean;
    upcomingEvents: boolean;
    testimonials: boolean;
    newsletter: boolean;
    sectionsOrder: string[];
    sectionTitles?: {
      hero?: string;
      featuredCategories?: string;
      popularPlaces?: string;
      upcomingEvents?: string;
      testimonials?: string;
      newsletter?: string;
    };
    sectionDescriptions?: {
      hero?: string;
      featuredCategories?: string;
      popularPlaces?: string;
      upcomingEvents?: string;
      testimonials?: string;
      newsletter?: string;
    };
  };
}
export function BrandConfiguration() {
  const {
    brands: contextBrands,
    setBrands: setContextBrands
  } = useBrand();
  const [brands, setBrands] = useState(contextBrands);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Brand>>({});
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'features' | 'domains' | 'communities' | 'experience' | 'pageSections'>('general');
  const [availableCommunities, setAvailableCommunities] = useState<Array<{
    id: string;
    name: string;
  }>>([]);
  // Load available communities
  useEffect(() => {
    const communities = getAllCommunities();
    setAvailableCommunities(communities);
  }, []);
  // Initialize with brands from context
  useEffect(() => {
    setBrands(contextBrands);
  }, [contextBrands]);
  // Store brands in localStorage for the preview component to access
  // and update the context when brands change
  useEffect(() => {
    saveBrands(brands);
    setContextBrands(brands);
  }, [brands, setContextBrands]);
  // Initialize page sections if not present
  const initializePageSections = (brand: Partial<Brand>) => {
    if (!brand.pageSections) {
      setFormData({
        ...brand,
        pageSections: {
          hero: true,
          featuredCategories: true,
          popularPlaces: true,
          upcomingEvents: true,
          testimonials: false,
          newsletter: true,
          sectionsOrder: ['hero', 'featuredCategories', 'popularPlaces', 'upcomingEvents', 'testimonials', 'newsletter']
        }
      });
    }
  };
  // Add this to handleSelectBrand
  const handleSelectBrand = (brand: Brand) => {
    setSelectedBrand(brand);
    setFormData(brand);
    setIsEditing(false);
    // Initialize page sections if not present
    if (!brand.pageSections) {
      brand.pageSections = {
        hero: true,
        featuredCategories: true,
        popularPlaces: true,
        upcomingEvents: true,
        testimonials: false,
        newsletter: true,
        sectionsOrder: ['hero', 'featuredCategories', 'popularPlaces', 'upcomingEvents', 'testimonials', 'newsletter']
      };
    }
  };
  // Add this to handleCreateNew
  const handleCreateNew = () => {
    setSelectedBrand(null);
    setFormData({
      id: '',
      name: '',
      domain: '',
      logo: '',
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      isActive: true,
      brandType: 'interest',
      features: {
        rewards: true,
        events: true,
        challenges: true,
        deals: true
      },
      communities: [],
      pageSections: {
        hero: true,
        featuredCategories: true,
        popularPlaces: true,
        upcomingEvents: true,
        testimonials: false,
        newsletter: true,
        sectionsOrder: ['hero', 'featuredCategories', 'popularPlaces', 'upcomingEvents', 'testimonials', 'newsletter']
      }
    });
    setIsEditing(true);
    setActiveTab('general');
  };
  const handleEditBrand = () => {
    setIsEditing(true);
  };
  // Update handleInputChange to handle page section toggles
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value,
      type
    } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name.startsWith('features.')) {
        const featureName = name.split('.')[1];
        setFormData({
          ...formData,
          features: {
            ...formData.features,
            [featureName]: checkbox.checked
          }
        });
      } else if (name.startsWith('pageSections.')) {
        const sectionName = name.split('.')[1];
        setFormData({
          ...formData,
          pageSections: {
            ...formData.pageSections,
            [sectionName]: checkbox.checked
          }
        });
      } else if (name.startsWith('community-')) {
        const communityId = name.replace('community-', '');
        const currentCommunities = formData.communities || [];
        if (checkbox.checked) {
          // Add community if it doesn't exist
          if (!currentCommunities.includes(communityId)) {
            setFormData({
              ...formData,
              communities: [...currentCommunities, communityId]
            });
          }
        } else {
          // Remove community if it exists
          setFormData({
            ...formData,
            communities: currentCommunities.filter(id => id !== communityId)
          });
        }
      } else {
        setFormData({
          ...formData,
          [name]: checkbox.checked
        });
      }
    } else if (name.startsWith('experience.')) {
      // Handle experience fields for text inputs and textareas
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        experience: {
          ...formData.experience,
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  // Also need to add this function that was referenced but missing
  const handleColorChange = (colorField: string, value: string) => {
    setFormData({
      ...formData,
      [colorField]: value
    });
  };
  // Function to generate default experience content based on brand type
  const generateDefaultExperience = (brandId: string) => {
    switch (brandId) {
      case 'foodie-quest':
        return {
          headline: `Taste the Flavors of {city}`,
          description: `Nothing beats experiencing the local cuisine! From hidden gems to award-winning restaurants, discover the best food experiences {city} has to offer.`,
          searchPlaceholder: 'Search for restaurants, cafés, food trucks...',
          backgroundImage: '/images/placeholder.jpg',
          featuredCategories: ['Restaurants', 'Cafés', 'Food Trucks', 'Bakeries', 'Markets']
        };
      case 'international-pub-crawl':
        return {
          headline: `Cheers to {city}'s Best Pubs & Bars`,
          description: `Ready for a night out? Find the perfect spot to grab a drink, from cozy neighborhood pubs to trendy cocktail bars. Discover the vibrant nightlife scene of {city}.`,
          searchPlaceholder: 'Search for pubs, bars, lounges...',
          backgroundImage: '/images/placeholder.jpg',
          featuredCategories: ['Pubs', 'Bars', 'Lounges', 'Nightclubs']
        };
      case 'brewery':
        return {
          headline: `Craft Beer Paradise in {city}`,
          description: `Nothing better than trying the latest brew from one of {city}'s local breweries! Discover unique flavors, meet passionate brewers, and find your new favorite craft beer spot.`,
          searchPlaceholder: 'Search for breweries, taprooms, beer gardens...',
          backgroundImage: '/images/placeholder.jpg',
          featuredCategories: ['Breweries', 'Taprooms', 'Beer Gardens', 'Bottle Shops', 'Brewery Tours']
        };
      case 'wine-quest':
        return {
          headline: `Uncork the Wine Experience in {city}`,
          description: `From elegant tasting rooms to picturesque vineyards, explore {city}'s finest wine destinations. Discover local vintages, meet winemakers, and enjoy the perfect glass.`,
          searchPlaceholder: 'Search for wineries, vineyards, wine bars...',
          backgroundImage: '/images/placeholder.jpg',
          featuredCategories: ['Wineries', 'Vineyards', 'Wine Bars', 'Tasting Rooms', 'Wine Tours']
        };
      case 'global-spectator':
        return {
          headline: `Live Entertainment in {city}`,
          description: `Looking for an unforgettable night out? Discover {city}'s vibrant entertainment scene - from intimate venues to major shows, find the perfect live experience.`,
          searchPlaceholder: 'Search for venues, shows, concerts, theaters...',
          backgroundImage: '/images/placeholder.jpg',
          featuredCategories: ['Venues', 'Theaters', 'Concert Halls', 'Comedy Clubs', 'Performance Spaces']
        };
      case 'global-competitor':
        return {
          headline: `Get in the Game in {city}`,
          description: `Whether you're a player or a fan, discover {city}'s best sports venues, activities, and events. From professional arenas to local leagues, find your next sports adventure.`,
          searchPlaceholder: 'Search for sports venues, activities, events...',
          backgroundImage: '/images/placeholder.jpg',
          featuredCategories: ['Arenas', 'Stadiums', 'Sports Bars', 'Athletic Clubs', 'Recreation Centers']
        };
      case 'my-bucket-list':
        return {
          headline: `Unforgettable Experiences in {city}`,
          description: `Create memories that last a lifetime! Discover unique adventures, hidden gems, and must-try experiences in {city}. Start checking items off your bucket list today.`,
          searchPlaceholder: 'Search for experiences, adventures, activities...',
          backgroundImage: '/images/placeholder.jpg',
          featuredCategories: ['Adventures', 'Tours', 'Landmarks', 'Activities', 'Unique Experiences']
        };
      case 'happy-hour':
        return {
          headline: `Happy Hour Hotspots in {city}`,
          description: `It's 5 o'clock somewhere! Find the best drink specials, bar deals, and happy hours in {city}. Unwind after work or kick off your night out with great deals.`,
          searchPlaceholder: 'Search for happy hours, drink specials, bars...',
          backgroundImage: '/images/placeholder.jpg',
          featuredCategories: ['Bars', 'Pubs', 'Lounges', 'Restaurants with Bars', 'Cocktail Bars']
        };
      case 'international-shopper':
        return {
          headline: `Shop 'Til You Drop in {city}`,
          description: `Calling all shoppers! Discover {city}'s best boutiques, markets, and shopping destinations. From luxury brands to local treasures, find exactly what you're looking for.`,
          searchPlaceholder: 'Search for shops, boutiques, markets...',
          backgroundImage: '/images/placeholder.jpg',
          featuredCategories: ['Boutiques', 'Malls', 'Markets', 'Specialty Shops', 'Department Stores']
        };
      default:
        return {
          headline: `Discover {city}`,
          description: `Explore the best local businesses, events, and experiences in {city}.`,
          searchPlaceholder: 'Search for restaurants, shops, events...',
          backgroundImage: '/images/placeholder.jpg',
          featuredCategories: ['Restaurants', 'Shopping', 'Entertainment', 'Services', 'Nightlife', 'Events']
        };
    }
  };
  // Function to set default experience content
  const setDefaultExperience = () => {
    if (!formData.id) return;
    const defaultExperience = generateDefaultExperience(formData.id);
    setFormData({
      ...formData,
      experience: defaultExperience
    });
  };
  const handleSave = () => {
    if (!formData.id || !formData.name) {
      alert('Brand ID and Name are required');
      return;
    }
    // Ensure experience data is initialized
    if (!formData.experience) {
      formData.experience = {};
    }
    if (selectedBrand) {
      // Update existing brand
      setBrands(brands.map(brand => brand.id === selectedBrand.id ? {
        ...brand,
        ...formData
      } as Brand : brand));
    } else {
      // Create new brand
      setBrands([...brands, formData as Brand]);
    }
    setIsEditing(false);
    setSelectedBrand(formData as Brand);
  };
  const handleCancel = () => {
    if (selectedBrand) {
      setFormData(selectedBrand);
    } else {
      setFormData({});
    }
    setIsEditing(false);
  };
  const handleDeleteBrand = (brandId: string) => {
    if (confirm('Are you sure you want to delete this brand? This action cannot be undone.')) {
      setBrands(brands.filter(brand => brand.id !== brandId));
      if (selectedBrand?.id === brandId) {
        setSelectedBrand(null);
        setFormData({});
      }
    }
  };
  // Add a function to handle section reordering
  const handleSectionReorder = (sectionId: string, direction: 'up' | 'down') => {
    if (!formData.pageSections?.sectionsOrder) return;
    const currentOrder = [...formData.pageSections.sectionsOrder];
    const currentIndex = currentOrder.indexOf(sectionId);
    if (currentIndex === -1) return;
    if (direction === 'up' && currentIndex > 0) {
      // Move section up
      ;
      [currentOrder[currentIndex], currentOrder[currentIndex - 1]] = [currentOrder[currentIndex - 1], currentOrder[currentIndex]];
    } else if (direction === 'down' && currentIndex < currentOrder.length - 1) {
      // Move section down
      ;
      [currentOrder[currentIndex], currentOrder[currentIndex + 1]] = [currentOrder[currentIndex + 1], currentOrder[currentIndex]];
    }
    setFormData({
      ...formData,
      pageSections: {
        ...formData.pageSections,
        sectionsOrder: currentOrder
      }
    });
  };
  return <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Global Explorer Brands
        </h2>
        <p className="text-gray-600">
          Manage interest-based brands across your platform
        </p>
      </div>
      <div className="flex flex-col md:flex-row">
        {/* Brand List Sidebar */}
        <div className="w-full md:w-64 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <button onClick={handleCreateNew} className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <PlusIcon className="w-4 h-4 mr-2" />
              Add New Brand
            </button>
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
            {brands.map(brand => <div key={brand.id} onClick={() => handleSelectBrand(brand)} className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 flex items-center ${selectedBrand?.id === brand.id ? 'bg-blue-50' : ''}`}>
                <div className="w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
                  <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {brand.name}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <GlobeIcon className="w-3 h-3 mr-1" />
                    <span className="truncate">{brand.domain}</span>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${brand.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              </div>)}
          </div>
        </div>
        {/* Brand Details/Editor */}
        <div className="flex-grow p-6">
          {!selectedBrand && !isEditing ? <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <ImageIcon className="w-16 h-16 mb-4 text-gray-300" />
              <p>Select a brand to view details or create a new one</p>
            </div> : <div>
              {/* Action Buttons */}
              {!isEditing && <div className="flex justify-end mb-6 space-x-3">
                  <Link to={`/preview/brand/${selectedBrand!.id}`} target="_blank" className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200">
                    <EyeIcon className="w-4 h-4 mr-2" />
                    Preview Landing Page
                  </Link>
                  <button onClick={handleEditBrand} className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                    <PencilIcon className="w-4 h-4 mr-2" />
                    Edit Brand
                  </button>
                  <button onClick={() => handleDeleteBrand(selectedBrand!.id)} className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200">
                    <TrashIcon className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </div>}
              {/* Editor Tabs */}
              {isEditing && <div className="border-b border-gray-200 mb-6">
                  <nav className="flex -mb-px overflow-x-auto">
                    <button onClick={() => setActiveTab('general')} className={`py-3 px-4 font-medium text-sm border-b-2 ${activeTab === 'general' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                      General
                    </button>
                    <button onClick={() => setActiveTab('appearance')} className={`py-3 px-4 font-medium text-sm border-b-2 ${activeTab === 'appearance' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                      Appearance
                    </button>
                    <button onClick={() => setActiveTab('experience')} className={`py-3 px-4 font-medium text-sm border-b-2 ${activeTab === 'experience' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                      Experience
                    </button>
                    <button onClick={() => setActiveTab('pageSections')} className={`py-3 px-4 font-medium text-sm border-b-2 ${activeTab === 'pageSections' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                      Page Sections
                    </button>
                    <button onClick={() => setActiveTab('features')} className={`py-3 px-4 font-medium text-sm border-b-2 ${activeTab === 'features' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                      Features
                    </button>
                    <button onClick={() => setActiveTab('communities')} className={`py-3 px-4 font-medium text-sm border-b-2 ${activeTab === 'communities' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                      Communities
                    </button>
                    <button onClick={() => setActiveTab('domains')} className={`py-3 px-4 font-medium text-sm border-b-2 ${activeTab === 'domains' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                      Domains
                    </button>
                  </nav>
                </div>}
              {/* Form Content */}
              {isEditing ? <div>
                  {/* General Tab */}
                  {activeTab === 'general' && <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Brand ID
                        </label>
                        <input type="text" name="id" value={formData.id || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="brand-id" disabled={!!selectedBrand} />
                        <p className="mt-1 text-xs text-gray-500">
                          Unique identifier for this brand (cannot be changed
                          after creation)
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Brand Type
                        </label>
                        <div className="flex space-x-4">
                          <label className="inline-flex items-center">
                            <input type="radio" name="brandType" value="community" checked={formData.brandType === 'community'} onChange={() => setFormData({
                      ...formData,
                      brandType: 'community'
                    })} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                            <span className="ml-2 text-gray-700">
                              Community-based (Downtown Guide)
                            </span>
                          </label>
                          <label className="inline-flex items-center">
                            <input type="radio" name="brandType" value="interest" checked={formData.brandType === 'interest'} onChange={() => setFormData({
                      ...formData,
                      brandType: 'interest'
                    })} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                            <span className="ml-2 text-gray-700">
                              Interest-based (Global Explorer)
                            </span>
                          </label>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          Determines whether this brand focuses on communities
                          or interests
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Brand Name
                        </label>
                        <input type="text" name="name" value={formData.name || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder={formData.brandType === 'community' ? 'Downtown Guide' : 'Global Explorer'} />
                        <p className="mt-1 text-xs text-gray-500">
                          {formData.brandType === 'community' ? 'For community-based brands, consider using "Downtown Guide" or similar naming' : 'For interest-based brands, consider using "Global Explorer" or similar naming'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Logo URL
                        </label>
                        <input type="text" name="logo" value={formData.logo || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="https://example.com/logo.png" />
                        <div className="mt-2">
                          {formData.logo && <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200">
                              <img src={formData.logo} alt="Logo preview" className="w-full h-full object-cover" />
                            </div>}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive || false} onChange={handleInputChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                          Active
                        </label>
                      </div>
                    </div>}
                  {/* Appearance Tab */}
                  {activeTab === 'appearance' && <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">
                          Brand Colors
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Primary Color
                            </label>
                            <div className="flex items-center">
                              <input type="color" value={formData.primaryColor || '#3B82F6'} onChange={e => handleColorChange('primaryColor', e.target.value)} className="h-10 w-10 rounded border border-gray-300 mr-2" />
                              <input type="text" value={formData.primaryColor || '#3B82F6'} onChange={e => handleColorChange('primaryColor', e.target.value)} className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Secondary Color
                            </label>
                            <div className="flex items-center">
                              <input type="color" value={formData.secondaryColor || '#1E40AF'} onChange={e => handleColorChange('secondaryColor', e.target.value)} className="h-10 w-10 rounded border border-gray-300 mr-2" />
                              <input type="text" value={formData.secondaryColor || '#1E40AF'} onChange={e => handleColorChange('secondaryColor', e.target.value)} className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">
                          Preview
                        </h3>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="h-16 rounded-t-lg flex items-center px-4" style={{
                    backgroundColor: formData.primaryColor || '#3B82F6'
                  }}>
                            <div className="text-white font-bold text-xl">
                              {formData.name || 'Brand Name'}
                            </div>
                          </div>
                          <div className="bg-white p-4">
                            <div className="px-4 py-2 rounded-md text-white inline-block" style={{
                      backgroundColor: formData.secondaryColor || '#1E40AF'
                    }}>
                              Button Example
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>}
                  {/* Experience Tab */}
                  {activeTab === 'experience' && <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">
                          Brand Experience
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Customize how users experience your brand on the front
                          page
                        </p>
                        <div className="flex justify-end mb-4">
                          <button onClick={setDefaultExperience} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm">
                            Set Default Experience for{' '}
                            {formData.id || 'this brand'}
                          </button>
                        </div>
                        <div className="space-y-4 border border-gray-200 rounded-lg p-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Hero Headline
                            </label>
                            <input type="text" name="experience.headline" value={formData.experience?.headline || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Discover Amazing Experiences" />
                            <p className="mt-1 text-xs text-gray-500">
                              Main headline displayed in the hero section (use{' '}
                              {'{city}'} to include city name)
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Hero Description
                            </label>
                            <textarea name="experience.description" value={formData.experience?.description || ''} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Explore the best experiences in {city} and beyond." />
                            <p className="mt-1 text-xs text-gray-500">
                              Description shown below the headline (use{' '}
                              {'{city}'} to include city name)
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Search Placeholder
                            </label>
                            <input type="text" name="experience.searchPlaceholder" value={formData.experience?.searchPlaceholder || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Search for restaurants, events..." />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Hero Background Image URL
                            </label>
                            <input type="text" name="experience.backgroundImage" value={formData.experience?.backgroundImage || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="https://example.com/background.jpg" />
                            {formData.experience?.backgroundImage && <div className="mt-2 w-full h-32 rounded-md overflow-hidden border border-gray-200">
                                <img src={formData.experience.backgroundImage} alt="Background preview" className="w-full h-full object-cover" />
                              </div>}
                          </div>
                          {/* Newsletter Section Configuration */}
                          <div className="pt-4 border-t border-gray-200">
                            <h4 className="text-md font-medium text-gray-900 mb-3">
                              Newsletter Section
                            </h4>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Newsletter Title
                                </label>
                                <input type="text" name="experience.newsletterTitle" value={formData.experience?.newsletterTitle || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder={`Stay Updated with ${formData.name || 'Your Brand'}`} />
                                <p className="mt-1 text-xs text-gray-500">
                                  Main title for the newsletter section
                                </p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Newsletter Description
                                </label>
                                <textarea name="experience.newsletterDescription" value={formData.experience?.newsletterDescription || ''} onChange={handleInputChange} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Subscribe to our newsletter for the latest updates and exclusive offers." />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Button Text
                                </label>
                                <input type="text" name="experience.newsletterButtonText" value={formData.experience?.newsletterButtonText || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Subscribe" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Featured Categories
                            </label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {['Restaurants', 'Bars', 'Cafés', 'Breweries', 'Wineries', 'Events', 'Shopping', 'Activities', 'Nightlife', 'Attractions', 'Tours', 'Entertainment', 'Taprooms', 'Beer Gardens', 'Bottle Shops', 'Wine Bars', 'Tasting Rooms', 'Pubs', 'Lounges', 'Nightclubs', 'Venues', 'Theaters', 'Concert Halls', 'Comedy Clubs', 'Sports Bars', 'Arenas', 'Stadiums', 'Food Trucks', 'Bakeries', 'Markets', 'Boutiques', 'Malls', 'Specialty Shops', 'Department Stores', 'Brewery Tours', 'Wine Tours', 'Happy Hours', 'Drink Specials'].map(category => <div key={category} className="flex items-center">
                                  <input type="checkbox" id={`category-${category}`} checked={(formData.experience?.featuredCategories || []).includes(category)} onChange={e => {
                          const currentCategories = formData.experience?.featuredCategories || [];
                          let newCategories;
                          if (e.target.checked) {
                            newCategories = [...currentCategories, category];
                          } else {
                            newCategories = currentCategories.filter(c => c !== category);
                          }
                          setFormData({
                            ...formData,
                            experience: {
                              ...formData.experience,
                              featuredCategories: newCategories
                            }
                          });
                        }} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                  <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                                    {category}
                                  </label>
                                </div>)}
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                              Select up to 6 categories to feature on the home
                              page
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">
                          Preview
                        </h3>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="h-48 relative bg-cover bg-center" style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${formData.experience?.backgroundImage || '/images/placeholder.jpg'})`
                  }}>
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                              <h3 className="text-xl font-bold text-white mb-2">
                                {formData.experience?.headline || 'Discover Amazing Experiences'}
                              </h3>
                              <p className="text-sm text-white mb-4 max-w-md">
                                {formData.experience?.description || 'Explore the best experiences in your city and beyond.'}
                              </p>
                              <div className="w-64 h-8 bg-white rounded-full"></div>
                            </div>
                          </div>
                          <div className="p-4 bg-white">
                            <div className="flex flex-wrap gap-2">
                              {(formData.experience?.featuredCategories || []).slice(0, 6).map(category => <span key={category} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                    {category}
                                  </span>)}
                              {(!formData.experience?.featuredCategories || formData.experience.featuredCategories.length === 0) && <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                  No categories selected
                                </span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>}
                  {/* Page Sections Tab */}
                  {activeTab === 'pageSections' && <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Landing Page Sections
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Configure which sections appear on the landing page,
                        their order, and content
                      </p>
                      {/* Primary Brand Setting */}
                      <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-blue-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Primary Brand
                            </h4>
                            <p className="text-sm text-gray-600">
                              Set this brand as the primary brand for the
                              platform. The primary brand's homepage will be
                              used as the default homepage.
                            </p>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="isPrimary" name="isPrimary" checked={formData.isPrimary || false} onChange={e => {
                      if (e.target.checked) {
                        // Confirm before making this the primary brand
                        if (confirm('Making this the primary brand will change the default homepage. Continue?')) {
                          setFormData({
                            ...formData,
                            isPrimary: true
                          });
                        }
                      } else {
                        setFormData({
                          ...formData,
                          isPrimary: false
                        });
                      }
                    }} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label htmlFor="isPrimary" className="ml-2 block text-sm text-gray-900">
                              Set as Primary
                            </label>
                          </div>
                        </div>
                      </div>
                      {/* Section Visibility and Order */}
                      <div className="space-y-4 border border-gray-200 rounded-lg p-4 mb-6">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Section Visibility & Order
                        </h4>
                        {formData.pageSections?.sectionsOrder?.map((sectionId, index) => {
                  const sectionName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1).replace(/([A-Z])/g, ' $1');
                  const isEnabled = formData.pageSections?.[sectionId as keyof typeof formData.pageSections];
                  if (typeof isEnabled !== 'boolean') return null;
                  return <div key={sectionId} className="flex items-center justify-between py-3 border-b border-gray-100">
                                <div className="flex items-center">
                                  <span className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full mr-3">
                                    {index + 1}
                                  </span>
                                  <div>
                                    <h4 className="font-medium text-gray-900">
                                      {sectionName}
                                    </h4>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center">
                                    <input type="checkbox" id={`pageSections.${sectionId}`} name={`pageSections.${sectionId}`} checked={isEnabled} onChange={handleInputChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                    <label htmlFor={`pageSections.${sectionId}`} className="ml-2 block text-sm text-gray-900">
                                      Visible
                                    </label>
                                  </div>
                                  <div className="flex space-x-2">
                                    <button onClick={() => handleSectionReorder(sectionId, 'up')} disabled={index === 0} className={`p-1 rounded ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
                                      ↑
                                    </button>
                                    <button onClick={() => handleSectionReorder(sectionId, 'down')} disabled={index === (formData.pageSections?.sectionsOrder?.length || 0) - 1} className={`p-1 rounded ${index === (formData.pageSections?.sectionsOrder?.length || 0) - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
                                      ↓
                                    </button>
                                  </div>
                                </div>
                              </div>;
                })}
                      </div>
                      {/* Section Content Customization */}
                      <div className="border border-gray-200 rounded-lg p-4 mb-6">
                        <h4 className="font-medium text-gray-900 mb-4">
                          Section Content
                        </h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Customize the titles and descriptions for each section
                        </p>
                        <div className="space-y-6">
                          {/* Featured Categories Section */}
                          {formData.pageSections?.featuredCategories && <div className="p-4 border border-gray-200 rounded-lg">
                              <h5 className="font-medium text-gray-900 mb-3">
                                Featured Categories Section
                              </h5>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Section Title
                                  </label>
                                  <input type="text" name="pageSections.sectionTitles.featuredCategories" value={formData.pageSections?.sectionTitles?.featuredCategories || 'Featured Categories'} onChange={e => {
                          setFormData({
                            ...formData,
                            pageSections: {
                              ...formData.pageSections,
                              sectionTitles: {
                                ...formData.pageSections?.sectionTitles,
                                featuredCategories: e.target.value
                              }
                            }
                          });
                        }} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Featured Categories" />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Section Description
                                  </label>
                                  <textarea name="pageSections.sectionDescriptions.featuredCategories" value={formData.pageSections?.sectionDescriptions?.featuredCategories || ''} onChange={e => {
                          setFormData({
                            ...formData,
                            pageSections: {
                              ...formData.pageSections,
                              sectionDescriptions: {
                                ...formData.pageSections?.sectionDescriptions,
                                featuredCategories: e.target.value
                              }
                            }
                          });
                        }} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Explore these popular categories in your area" />
                                </div>
                              </div>
                            </div>}
                          {/* Popular Places Section */}
                          {formData.pageSections?.popularPlaces && <div className="p-4 border border-gray-200 rounded-lg">
                              <h5 className="font-medium text-gray-900 mb-3">
                                Popular Places Section
                              </h5>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Section Title
                                  </label>
                                  <input type="text" name="pageSections.sectionTitles.popularPlaces" value={formData.pageSections?.sectionTitles?.popularPlaces || 'Popular Places'} onChange={e => {
                          setFormData({
                            ...formData,
                            pageSections: {
                              ...formData.pageSections,
                              sectionTitles: {
                                ...formData.pageSections?.sectionTitles,
                                popularPlaces: e.target.value
                              }
                            }
                          });
                        }} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Popular Places" />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Section Description
                                  </label>
                                  <textarea name="pageSections.sectionDescriptions.popularPlaces" value={formData.pageSections?.sectionDescriptions?.popularPlaces || ''} onChange={e => {
                          setFormData({
                            ...formData,
                            pageSections: {
                              ...formData.pageSections,
                              sectionDescriptions: {
                                ...formData.pageSections?.sectionDescriptions,
                                popularPlaces: e.target.value
                              }
                            }
                          });
                        }} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="These places are getting a lot of attention" />
                                </div>
                              </div>
                            </div>}
                          {/* News & Events Section */}
                          {formData.pageSections?.newsAndEvents && <div className="p-4 border border-gray-200 rounded-lg">
                              <h5 className="font-medium text-gray-900 mb-3">
                                News & Events Section
                              </h5>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Section Title
                                  </label>
                                  <input type="text" name="pageSections.sectionTitles.newsAndEvents" value={formData.pageSections?.sectionTitles?.newsAndEvents || 'News & Events'} onChange={e => {
                          setFormData({
                            ...formData,
                            pageSections: {
                              ...formData.pageSections,
                              sectionTitles: {
                                ...formData.pageSections?.sectionTitles,
                                newsAndEvents: e.target.value
                              }
                            }
                          });
                        }} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="News & Events" />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Section Description
                                  </label>
                                  <textarea name="pageSections.sectionDescriptions.newsAndEvents" value={formData.pageSections?.sectionDescriptions?.newsAndEvents || ''} onChange={e => {
                          setFormData({
                            ...formData,
                            pageSections: {
                              ...formData.pageSections,
                              sectionDescriptions: {
                                ...formData.pageSections?.sectionDescriptions,
                                newsAndEvents: e.target.value
                              }
                            }
                          });
                        }} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Stay up to date with the latest happenings" />
                                </div>
                              </div>
                            </div>}
                          {/* Testimonials Section */}
                          {formData.pageSections?.testimonials && <div className="p-4 border border-gray-200 rounded-lg">
                              <h5 className="font-medium text-gray-900 mb-3">
                                Testimonials Section
                              </h5>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Section Title
                                  </label>
                                  <input type="text" name="pageSections.sectionTitles.testimonials" value={formData.pageSections?.sectionTitles?.testimonials || 'What People Are Saying'} onChange={e => {
                          setFormData({
                            ...formData,
                            pageSections: {
                              ...formData.pageSections,
                              sectionTitles: {
                                ...formData.pageSections?.sectionTitles,
                                testimonials: e.target.value
                              }
                            }
                          });
                        }} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="What People Are Saying" />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Section Description
                                  </label>
                                  <textarea name="pageSections.sectionDescriptions.testimonials" value={formData.pageSections?.sectionDescriptions?.testimonials || ''} onChange={e => {
                          setFormData({
                            ...formData,
                            pageSections: {
                              ...formData.pageSections,
                              sectionDescriptions: {
                                ...formData.pageSections?.sectionDescriptions,
                                testimonials: e.target.value
                              }
                            }
                          });
                        }} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="See what people are saying about their experiences" />
                                </div>
                              </div>
                            </div>}
                        </div>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-medium text-gray-900 mb-3">
                          Preview
                        </h4>
                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                          <div className="space-y-4">
                            {formData.pageSections?.sectionsOrder?.map(sectionId => {
                      const sectionName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1).replace(/([A-Z])/g, ' $1');
                      const isEnabled = formData.pageSections?.[sectionId as keyof typeof formData.pageSections];
                      if (!isEnabled || typeof isEnabled !== 'boolean') return null;
                      // Get custom title if available
                      const customTitle = sectionId !== 'hero' && sectionId !== 'newsletter' ? formData.pageSections?.sectionTitles?.[sectionId as keyof typeof formData.pageSections.sectionTitles] : '';
                      // Get custom description if available
                      const customDescription = sectionId !== 'hero' && sectionId !== 'newsletter' ? formData.pageSections?.sectionDescriptions?.[sectionId as keyof typeof formData.pageSections.sectionDescriptions] : '';
                      return <div key={sectionId} className="p-3 bg-white border border-gray-200 rounded">
                                    <div className="font-medium">
                                      {customTitle || sectionName}
                                    </div>
                                    {sectionId !== 'hero' && sectionId !== 'newsletter' && <div className="text-sm text-gray-500 mt-1">
                                          {customDescription || ''}
                                        </div>}
                                  </div>;
                    })}
                            {!formData.pageSections?.sectionsOrder?.some(sectionId => formData.pageSections?.[sectionId as keyof typeof formData.pageSections] === true) && <div className="p-3 bg-white border border-gray-200 rounded text-gray-500 text-center">
                                No visible sections
                              </div>}
                          </div>
                        </div>
                      </div>
                    </div>}
                  {/* Features Tab */}
                  {activeTab === 'features' && <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Feature Toggles
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Enable or disable features for this brand
                      </p>
                      <div className="space-y-4 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Rewards Program
                            </h4>
                            <p className="text-sm text-gray-500">
                              Points, achievements, and loyalty features
                            </p>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="features.rewards" name="features.rewards" checked={formData.features?.rewards || false} onChange={handleInputChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label htmlFor="features.rewards" className="ml-2 block text-sm text-gray-900 sr-only">
                              Rewards Program
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Events
                            </h4>
                            <p className="text-sm text-gray-500">
                              Event listings and calendar features
                            </p>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="features.events" name="features.events" checked={formData.features?.events || false} onChange={handleInputChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label htmlFor="features.events" className="ml-2 block text-sm text-gray-900 sr-only">
                              Events
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Challenges
                            </h4>
                            <p className="text-sm text-gray-500">
                              Community and personal challenges
                            </p>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="features.challenges" name="features.challenges" checked={formData.features?.challenges || false} onChange={handleInputChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label htmlFor="features.challenges" className="ml-2 block text-sm text-gray-900 sr-only">
                              Challenges
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Deals & Coupons
                            </h4>
                            <p className="text-sm text-gray-500">
                              Special offers and promotions
                            </p>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="features.deals" name="features.deals" checked={formData.features?.deals || false} onChange={handleInputChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label htmlFor="features.deals" className="ml-2 block text-sm text-gray-900 sr-only">
                              Deals & Coupons
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>}
                  {/* Communities Tab */}
                  {activeTab === 'communities' && <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Communities
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Select which communities are available for this brand
                      </p>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-gray-900">
                            Standard Communities
                          </h4>
                          <span className="text-xs text-gray-500">
                            {formData.communities?.filter(c => !c.includes('-')).length || 0}{' '}
                            selected
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                          {availableCommunities.filter(community => !community.id.includes('-')) // Filter out brand-specific communities
                  .map(community => <div key={community.id} className="flex items-center">
                                <input type="checkbox" id={`community-${community.id}`} name={`community-${community.id}`} checked={(formData.communities || []).includes(community.id)} onChange={handleInputChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                <label htmlFor={`community-${community.id}`} className="ml-2 block text-sm text-gray-900">
                                  {community.name}
                                </label>
                              </div>)}
                        </div>
                        <div className="border-t border-gray-200 pt-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium text-gray-900">
                              Brand-Specific Communities
                            </h4>
                            <span className="text-xs text-gray-500">
                              {formData.communities?.filter(c => c.includes('-')).length || 0}{' '}
                              selected
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {availableCommunities.filter(community => community.id.includes('-') && (community.id.startsWith(formData.id + '-') || !community.id.includes('-'))).map(community => <div key={community.id} className="flex items-center">
                                  <input type="checkbox" id={`community-${community.id}`} name={`community-${community.id}`} checked={(formData.communities || []).includes(community.id)} onChange={handleInputChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                  <label htmlFor={`community-${community.id}`} className="ml-2 block text-sm text-gray-900">
                                    {community.name}
                                  </label>
                                </div>)}
                          </div>
                        </div>
                      </div>
                    </div>}
                  {/* Domains Tab */}
                  {activeTab === 'domains' && <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Domain Configuration
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Configure domain settings for this brand
                      </p>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Primary Domain
                          </label>
                          <input type="text" name="domain" value={formData.domain || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="example.com" />
                          <p className="mt-1 text-xs text-gray-500">
                            The main domain for this brand (without http:// or
                            https://)
                          </p>
                        </div>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-yellow-700">
                                Additional domain configuration including DNS
                                settings and SSL certificates must be configured
                                in your hosting environment.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>}
                  {/* Save/Cancel Buttons */}
                  <div className="mt-8 flex justify-end space-x-3">
                    <button onClick={handleCancel} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                      Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Save Changes
                    </button>
                  </div>
                </div> /* Brand Details View */ : selectedBrand && <div>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-lg overflow-hidden mr-4">
                        <img src={selectedBrand.logo} alt={selectedBrand.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {selectedBrand.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedBrand.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {selectedBrand.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">
                            ID: {selectedBrand.id}
                          </span>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedBrand.brandType === 'community' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                            {selectedBrand.brandType === 'community' ? 'Community' : 'Interest'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <GlobeIcon className="w-4 h-4 mr-2 text-gray-500" />
                          Domain
                        </h4>
                        <p className="text-gray-800">{selectedBrand.domain}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <PaletteIcon className="w-4 h-4 mr-2 text-gray-500" />
                          Brand Colors
                        </h4>
                        <div className="flex space-x-3">
                          <div>
                            <div className="w-8 h-8 rounded border border-gray-200" style={{
                      backgroundColor: selectedBrand.primaryColor
                    }}></div>
                            <div className="text-xs text-gray-500 mt-1">
                              Primary
                            </div>
                          </div>
                          <div>
                            <div className="w-8 h-8 rounded border border-gray-200" style={{
                      backgroundColor: selectedBrand.secondaryColor
                    }}></div>
                            <div className="text-xs text-gray-500 mt-1">
                              Secondary
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <MapPinIcon className="w-4 h-4 mr-2 text-gray-500" />
                          Communities
                        </h4>
                        <div className="text-sm text-gray-600">
                          {selectedBrand.communities && selectedBrand.communities.length > 0 ? <div className="flex flex-wrap gap-2">
                              {selectedBrand.communities.slice(0, 5).map(communityId => {
                      const community = availableCommunities.find(c => c.id === communityId);
                      return community ? <span key={communityId} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                                      {community.name}
                                    </span> : null;
                    })}
                              {selectedBrand.communities.length > 5 && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800">
                                  +{selectedBrand.communities.length - 5} more
                                </span>}
                            </div> : <span className="text-gray-500">
                              No communities selected
                            </span>}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <ToggleLeftIcon className="w-4 h-4 mr-2 text-gray-500" />
                          Enabled Features
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className={`p-3 rounded-lg border ${selectedBrand.features.rewards ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-100'}`}>
                            <div className="flex items-center">
                              {selectedBrand.features.rewards ? <CheckIcon className="w-4 h-4 text-green-500 mr-2" /> : <XIcon className="w-4 h-4 text-gray-400 mr-2" />}
                              <span className={selectedBrand.features.rewards ? 'text-green-800' : 'text-gray-500'}>
                                Rewards
                              </span>
                            </div>
                          </div>
                          <div className={`p-3 rounded-lg border ${selectedBrand.features.events ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-100'}`}>
                            <div className="flex items-center">
                              {selectedBrand.features.events ? <CheckIcon className="w-4 h-4 text-green-500 mr-2" /> : <XIcon className="w-4 h-4 text-gray-400 mr-2" />}
                              <span className={selectedBrand.features.events ? 'text-green-800' : 'text-gray-500'}>
                                Events
                              </span>
                            </div>
                          </div>
                          <div className={`p-3 rounded-lg border ${selectedBrand.features.challenges ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-100'}`}>
                            <div className="flex items-center">
                              {selectedBrand.features.challenges ? <CheckIcon className="w-4 h-4 text-green-500 mr-2" /> : <XIcon className="w-4 h-4 text-gray-400 mr-2" />}
                              <span className={selectedBrand.features.challenges ? 'text-green-800' : 'text-gray-500'}>
                                Challenges
                              </span>
                            </div>
                          </div>
                          <div className={`p-3 rounded-lg border ${selectedBrand.features.deals ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-100'}`}>
                            <div className="flex items-center">
                              {selectedBrand.features.deals ? <CheckIcon className="w-4 h-4 text-green-500 mr-2" /> : <XIcon className="w-4 h-4 text-gray-400 mr-2" />}
                              <span className={selectedBrand.features.deals ? 'text-green-800' : 'text-gray-500'}>
                                Deals
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Brand Experience */}
                    {!isEditing && selectedBrand && <div className="bg-gray-50 rounded-lg p-4 md:col-span-2 mt-4">
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <LayoutIcon className="w-4 h-4 mr-2 text-gray-500" />
                          Brand Experience
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">
                              Hero Content
                            </h5>
                            <p className="text-sm text-gray-600 mt-1">
                              <strong>Headline:</strong>{' '}
                              {selectedBrand.experience?.headline || 'Default headline'}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              <strong>Search:</strong>{' '}
                              {selectedBrand.experience?.searchPlaceholder || 'Default search placeholder'}
                            </p>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">
                              Featured Categories
                            </h5>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedBrand.experience?.featuredCategories && selectedBrand.experience.featuredCategories.length > 0 ? selectedBrand.experience.featuredCategories.map(category => <span key={category} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                                      {category}
                                    </span>) : <span className="text-sm text-gray-500">
                                  No custom categories
                                </span>}
                            </div>
                          </div>
                        </div>
                      </div>}
                  </div>}
            </div>}
        </div>
      </div>
    </div>;
}