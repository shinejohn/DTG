import React, { useEffect, useState, createContext, useContext, memo } from 'react';
// Types
export interface Brand {
  id: string;
  name: string;
  domain: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  isActive: boolean;
  brandType: 'community' | 'interest';
  isPrimary?: boolean; // Flag to mark a brand as primary
  features: {
    rewards: boolean;
    events: boolean;
    challenges: boolean;
    deals: boolean;
  };
  communities: string[];
  experience: {
    headline: string;
    description: string;
    searchPlaceholder: string;
    backgroundImage: string;
    featuredCategories: string[];
    newsletterTitle?: string;
    newsletterDescription?: string;
    newsletterButtonText?: string;
  };
  pageSections?: {
    // Section visibility
    hero: boolean;
    featuredCategories: boolean;
    popularPlaces: boolean;
    newsAndEvents: boolean;
    testimonials: boolean;
    newsletter: boolean;
    // Section order
    sectionsOrder: string[];
    // Section content customization
    sectionTitles?: {
      featuredCategories?: string;
      popularPlaces?: string;
      newsAndEvents?: string;
      testimonials?: string;
    };
    sectionDescriptions?: {
      featuredCategories?: string;
      popularPlaces?: string;
      newsAndEvents?: string;
      testimonials?: string;
    };
  };
}
interface BrandContextType {
  currentBrand: Brand | null;
  setCurrentBrand: (brand: Brand) => void;
  brands: Brand[];
  setBrands: (brands: Brand[]) => void;
  primaryBrand: Brand | null;
}
// Standard section configuration based on Downtown Guide
const standardSections = {
  hero: true,
  featuredCategories: true,
  popularPlaces: true,
  newsAndEvents: true,
  testimonials: false,
  newsletter: true,
  sectionsOrder: ['hero', 'featuredCategories', 'popularPlaces', 'newsAndEvents', 'testimonials', 'newsletter'],
  sectionTitles: {
    featuredCategories: 'Featured Categories',
    popularPlaces: 'Popular Places',
    newsAndEvents: 'News & Events',
    testimonials: 'What People Are Saying'
  },
  sectionDescriptions: {
    featuredCategories: 'Explore these popular categories in your area',
    popularPlaces: 'These places are getting a lot of attention',
    newsAndEvents: 'Stay up to date with the latest happenings',
    testimonials: 'See what people are saying about their experiences'
  }
};
// Initial brand data
const initialBrands: Brand[] = [
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
  isPrimary: true,
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
  },
  pageSections: standardSections
},
// INTEREST-BASED BRAND (Foodie Quest)
{
  id: 'foodie-quest',
  name: 'Foodie Quest',
  domain: 'foodiequest.wtf',
  logo: '/images/placeholder.jpg',
  primaryColor: '#FF6B6B',
  secondaryColor: '#C44D4D',
  isActive: true,
  brandType: 'interest',
  isPrimary: false,
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
  },
  pageSections: standardSections
},
// INTEREST-BASED BRAND (International Pub Crawl)
{
  id: 'international-pub-crawl',
  name: 'International Pub Crawl',
  domain: 'pubcrawl.wtf',
  logo: '/images/placeholder.jpg',
  primaryColor: '#4F3928',
  secondaryColor: '#8B6B4A',
  isActive: true,
  brandType: 'interest',
  isPrimary: false,
  features: {
    rewards: true,
    events: true,
    challenges: true,
    deals: true
  },
  communities: ['nyc', 'la', 'chi', 'sf', 'lon', 'dub', 'ber'],
  experience: {
    headline: "Cheers to {city}'s Best Pubs & Bars",
    description: 'Ready for a night out? Find the perfect spot to grab a drink, from cozy neighborhood pubs to trendy cocktail bars. Discover the vibrant nightlife scene of {city}.',
    searchPlaceholder: 'Search for pubs, bars, lounges...',
    backgroundImage: '/images/placeholder.jpg',
    featuredCategories: ['Pubs', 'Bars', 'Lounges', 'Nightclubs', 'Speakeasies', 'Brewpubs']
  },
  pageSections: standardSections
},
// INTEREST-BASED BRAND (Brewery Quest)
{
  id: 'brewery-quest',
  name: 'Brewery Quest',
  domain: 'breweryquest.wtf',
  logo: '/images/placeholder.jpg',
  primaryColor: '#FFA62B',
  secondaryColor: '#C16A26',
  isActive: true,
  brandType: 'interest',
  isPrimary: false,
  features: {
    rewards: true,
    events: true,
    challenges: true,
    deals: true
  },
  communities: ['por', 'den', 'sea', 'sf', 'chi', 'bos', 'aus'],
  experience: {
    headline: 'Craft Beer Paradise in {city}',
    description: "Nothing better than trying the latest brew from one of {city}'s local breweries! Discover unique flavors, meet passionate brewers, and find your new favorite craft beer spot.",
    searchPlaceholder: 'Search for breweries, taprooms, beer gardens...',
    backgroundImage: '/images/placeholder.jpg',
    featuredCategories: ['Breweries', 'Taprooms', 'Beer Gardens', 'Bottle Shops', 'Brewery Tours']
  },
  pageSections: standardSections
},
// INTEREST-BASED BRAND (Wine Quest)
{
  id: 'wine-quest',
  name: 'Wine Quest',
  domain: 'winequest.wtf',
  logo: '/images/placeholder.jpg',
  primaryColor: '#8E0000',
  secondaryColor: '#5E0000',
  isActive: true,
  brandType: 'interest',
  isPrimary: false,
  features: {
    rewards: true,
    events: true,
    challenges: true,
    deals: true
  },
  communities: ['sf', 'por', 'aus', 'nyc', 'la', 'sea'],
  experience: {
    headline: 'Uncork the Wine Experience in {city}',
    description: "From elegant tasting rooms to picturesque vineyards, explore {city}'s finest wine destinations. Discover local vintages, meet winemakers, and enjoy the perfect glass.",
    searchPlaceholder: 'Search for wineries, vineyards, wine bars...',
    backgroundImage: '/images/placeholder.jpg',
    featuredCategories: ['Wineries', 'Vineyards', 'Wine Bars', 'Tasting Rooms', 'Wine Tours']
  },
  pageSections: standardSections
},
// INTEREST-BASED BRAND (Global Spectator)
{
  id: 'global-spectator',
  name: 'Global Spectator',
  domain: 'globalspectator.wtf',
  logo: '/images/placeholder.jpg',
  primaryColor: '#3D348B',
  secondaryColor: '#7678ED',
  isActive: true,
  brandType: 'interest',
  isPrimary: false,
  features: {
    rewards: true,
    events: true,
    challenges: true,
    deals: true
  },
  communities: ['nyc', 'chi', 'la', 'sf', 'lon', 'par', 'tok'],
  experience: {
    headline: 'Live Entertainment in {city}',
    description: "Looking for an unforgettable night out? Discover {city}'s vibrant entertainment scene - from intimate venues to major shows, find the perfect live experience.",
    searchPlaceholder: 'Search for venues, shows, concerts, theaters...',
    backgroundImage: '/images/placeholder.jpg',
    featuredCategories: ['Venues', 'Theaters', 'Concert Halls', 'Comedy Clubs', 'Performance Spaces']
  },
  pageSections: standardSections
},
// INTEREST-BASED BRAND (Global Competitor)
{
  id: 'global-competitor',
  name: 'Global Competitor',
  domain: 'globalcompetitor.wtf',
  logo: '/images/placeholder.jpg',
  primaryColor: '#1E5F74',
  secondaryColor: '#4F9EB9',
  isActive: true,
  brandType: 'interest',
  isPrimary: false,
  features: {
    rewards: true,
    events: true,
    challenges: true,
    deals: true
  },
  communities: ['nyc', 'chi', 'la', 'sf', 'mia', 'bos', 'hou'],
  experience: {
    headline: 'Get in the Game in {city}',
    description: "Whether you're a player or a fan, discover {city}'s best sports venues, activities, and events. From professional arenas to local leagues, find your next sports adventure.",
    searchPlaceholder: 'Search for sports venues, activities, events...',
    backgroundImage: '/images/placeholder.jpg',
    featuredCategories: ['Arenas', 'Stadiums', 'Sports Bars', 'Athletic Clubs', 'Recreation Centers']
  },
  pageSections: standardSections
},
// INTEREST-BASED BRAND (Bucket List)
{
  id: 'my-bucket-list',
  name: 'My Bucket List',
  domain: 'mybucketlist.wtf',
  logo: '/images/placeholder.jpg',
  primaryColor: '#2A9D8F',
  secondaryColor: '#E9C46A',
  isActive: true,
  brandType: 'interest',
  isPrimary: false,
  features: {
    rewards: true,
    events: true,
    challenges: true,
    deals: true
  },
  communities: ['nyc', 'la', 'sf', 'chi', 'mia', 'sea', 'den'],
  experience: {
    headline: 'Unforgettable Experiences in {city}',
    description: 'Create memories that last a lifetime! Discover unique adventures, hidden gems, and must-try experiences in {city}. Start checking items off your bucket list today.',
    searchPlaceholder: 'Search for experiences, adventures, activities...',
    backgroundImage: '/images/placeholder.jpg',
    featuredCategories: ['Adventures', 'Tours', 'Landmarks', 'Activities', 'Unique Experiences']
  },
  pageSections: standardSections
},
// INTEREST-BASED BRAND (International Shopper)
{
  id: 'international-shopper',
  name: 'International Shopper',
  domain: 'internationalshopper.wtf',
  logo: '/images/placeholder.jpg',
  primaryColor: '#5F4B8B',
  secondaryColor: '#E69A8D',
  isActive: true,
  brandType: 'interest',
  isPrimary: false,
  features: {
    rewards: true,
    events: true,
    challenges: true,
    deals: true
  },
  communities: ['nyc', 'la', 'chi', 'sf', 'mia', 'lon', 'par'],
  experience: {
    headline: "Shop 'Til You Drop in {city}",
    description: "Calling all shoppers! Discover {city}'s best boutiques, markets, and shopping destinations. From luxury brands to local treasures, find exactly what you're looking for.",
    searchPlaceholder: 'Search for shops, boutiques, markets...',
    backgroundImage: '/images/placeholder.jpg',
    featuredCategories: ['Boutiques', 'Malls', 'Markets', 'Specialty Shops', 'Department Stores']
  },
  pageSections: standardSections
},
// INTEREST-BASED BRAND (Happy Hour)
{
  id: 'happy-hour',
  name: 'Happy Hour',
  domain: 'happyhour.wtf',
  logo: '/images/placeholder.jpg',
  primaryColor: '#F4A261',
  secondaryColor: '#E76F51',
  isActive: true,
  brandType: 'interest',
  isPrimary: false,
  features: {
    rewards: true,
    events: true,
    challenges: true,
    deals: true
  },
  communities: ['nyc', 'la', 'chi', 'sf', 'mia', 'sea', 'aus'],
  experience: {
    headline: 'Happy Hour Hotspots in {city}',
    description: "It's 5 o'clock somewhere! Find the best drink specials, bar deals, and happy hours in {city}. Unwind after work or kick off your night out with great deals.",
    searchPlaceholder: 'Search for happy hours, drink specials, bars...',
    backgroundImage: '/images/placeholder.jpg',
    featuredCategories: ['Bars', 'Pubs', 'Lounges', 'Restaurants with Bars', 'Cocktail Bars']
  },
  pageSections: standardSections
}];
const BrandContext = createContext<BrandContextType>({
  currentBrand: null,
  setCurrentBrand: () => {},
  brands: [],
  setBrands: () => {},
  primaryBrand: null
});
export const useBrand = () => useContext(BrandContext);
export const BrandProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);
  // Find the primary brand
  const primaryBrand = brands.find(brand => brand.isPrimary) || brands[0];
  // Set the primary brand as default on initial load if no current brand
  useEffect(() => {
    if (!currentBrand && primaryBrand) {
      setCurrentBrand(primaryBrand);
    }
  }, [brands, currentBrand, primaryBrand]);
  return <BrandContext.Provider value={{
    currentBrand,
    setCurrentBrand,
    brands,
    setBrands,
    primaryBrand
  }}>
      {children}
    </BrandContext.Provider>;
};