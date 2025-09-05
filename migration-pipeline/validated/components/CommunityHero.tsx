import React, { useEffect, useState, memo } from 'react';
import { Search } from 'lucide-react';
import { detectCurrentBrand, Brand } from '../services/BrandService';
interface CommunityHeroProps {
  communityName: string;
  onCommunityChange?: (communityId: string) => void;
  availableCommunities?: Array<{
    id: string;
    name: string;
  }>;
}
export function CommunityHero({
  communityName,
  onCommunityChange,
  availableCommunities
}: CommunityHeroProps) {
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);
  useEffect(() => {
    // Detect the current brand when component mounts
    const brand = detectCurrentBrand();
    setCurrentBrand(brand);
  }, []);
  // Get brand-specific headline and description
  const getBrandContent = () => {
    // Default content if no brand is detected
    const defaultContent = {
      headline: `Discover ${communityName}`,
      description: `Explore the best local businesses, events, and experiences in ${communityName}.`,
      searchPlaceholder: 'Search for restaurants, shops, events...',
      backgroundImage: '/images/placeholder.jpg'
    };
    if (!currentBrand) return defaultContent;
    // If the brand has custom experience settings, use those
    if (currentBrand.experience) {
      const {
        headline,
        description,
        searchPlaceholder,
        backgroundImage
      } = currentBrand.experience;
      return {
        headline: (headline || defaultContent.headline).replace('{city}', communityName),
        description: (description || defaultContent.description).replace('{city}', communityName),
        searchPlaceholder: searchPlaceholder || defaultContent.searchPlaceholder,
        backgroundImage: backgroundImage || defaultContent.backgroundImage
      };
    }
    // Otherwise, use brand-specific defaults
    switch (currentBrand.id) {
      case 'foodie-quest':
        return {
          headline: `Taste the Flavors of ${communityName}`,
          description: `Nothing beats experiencing the local cuisine! From hidden gems to award-winning restaurants, discover the best food experiences ${communityName} has to offer.`,
          searchPlaceholder: 'Search for restaurants, cafés, food trucks...',
          backgroundImage: '/images/placeholder.jpg'
        };
      case 'international-pub-crawl':
        return {
          headline: `Cheers to ${communityName}'s Best Pubs & Bars`,
          description: `Ready for a night out? Find the perfect spot to grab a drink, from cozy neighborhood pubs to trendy cocktail bars. Discover the vibrant nightlife scene of ${communityName}.`,
          searchPlaceholder: 'Search for pubs, bars, lounges...',
          backgroundImage: '/images/placeholder.jpg'
        };
      case 'brewery':
        return {
          headline: `Craft Beer Paradise in ${communityName}`,
          description: `Nothing better than trying the latest brew from one of ${communityName}'s local breweries! Discover unique flavors, meet passionate brewers, and find your new favorite craft beer spot.`,
          searchPlaceholder: 'Search for breweries, taprooms, beer gardens...',
          backgroundImage: '/images/placeholder.jpg'
        };
      case 'wine-quest':
        return {
          headline: `Uncork the Wine Experience in ${communityName}`,
          description: `From elegant tasting rooms to picturesque vineyards, explore ${communityName}'s finest wine destinations. Discover local vintages, meet winemakers, and enjoy the perfect glass.`,
          searchPlaceholder: 'Search for wineries, vineyards, wine bars...',
          backgroundImage: '/images/placeholder.jpg'
        };
      case 'global-spectator':
        return {
          headline: `Live Entertainment in ${communityName}`,
          description: `Looking for an unforgettable night out? Discover ${communityName}'s vibrant entertainment scene - from intimate venues to major shows, find the perfect live experience.`,
          searchPlaceholder: 'Search for venues, shows, concerts, theaters...',
          backgroundImage: '/images/placeholder.jpg'
        };
      case 'global-competitor':
        return {
          headline: `Get in the Game in ${communityName}`,
          description: `Whether you're a player or a fan, discover ${communityName}'s best sports venues, activities, and events. From professional arenas to local leagues, find your next sports adventure.`,
          searchPlaceholder: 'Search for sports venues, activities, events...',
          backgroundImage: '/images/placeholder.jpg'
        };
      case 'my-bucket-list':
        return {
          headline: `Unforgettable Experiences in ${communityName}`,
          description: `Create memories that last a lifetime! Discover unique adventures, hidden gems, and must-try experiences in ${communityName}. Start checking items off your bucket list today.`,
          searchPlaceholder: 'Search for experiences, adventures, activities...',
          backgroundImage: '/images/placeholder.jpg'
        };
      case 'happy-hour':
        return {
          headline: `Happy Hour Hotspots in ${communityName}`,
          description: `It's 5 o'clock somewhere! Find the best drink specials, bar deals, and happy hours in ${communityName}. Unwind after work or kick off your night out with great deals.`,
          searchPlaceholder: 'Search for happy hours, drink specials, bars...',
          backgroundImage: '/images/placeholder.jpg'
        };
      case 'international-shopper':
        return {
          headline: `Shop 'Til You Drop in ${communityName}`,
          description: `Calling all shoppers! Discover ${communityName}'s best boutiques, markets, and shopping destinations. From luxury brands to local treasures, find exactly what you're looking for.`,
          searchPlaceholder: 'Search for shops, boutiques, markets...',
          backgroundImage: '/images/placeholder.jpg'
        };
      default:
        return defaultContent;
    }
  };
  const content = getBrandContent();
  return <div className="relative bg-cover bg-center" style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${content.backgroundImage})`,
    height: '500px'
  }}>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {content.headline}
          </h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            {content.description}
          </p>
          <div className="relative max-w-2xl mx-auto">
            <input type="text" placeholder={content.searchPlaceholder} className="w-full px-5 py-4 pr-12 rounded-full shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">
              <Search className="w-6 h-6" />
            </button>
          </div>
          {/* Community Selector - Only show if there are available communities */}
          {availableCommunities && availableCommunities.length > 0 && onCommunityChange && <div className="mt-6">
                <select className="px-4 py-2 rounded-md bg-white bg-opacity-90 text-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500" value={availableCommunities.find(c => c.name === communityName)?.id || ''} onChange={e => onCommunityChange(e.target.value)}>
                  {availableCommunities.map(community => <option key={community.id} value={community.id}>
                      {community.name}
                    </option>)}
                </select>
              </div>}
        </div>
      </div>
    </div>;
}