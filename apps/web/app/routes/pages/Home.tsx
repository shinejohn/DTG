import React, { useEffect, useState } from 'react';
import { useLoaderData, useRouteError, isRouteErrorResponse, Link } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { SearchIcon, MapPinIcon, TrophyIcon, GiftIcon, StarIcon, TargetIcon, UsersIcon, TagIcon } from 'lucide-react';
import { useBrand } from '../../components/dtg/contexts/BrandContext';
import { Layout } from '@/components/dtg/Layout';
import { CategorySection } from '@/components/dtg/CategorySection';
import { FeaturedPlaces } from '@/components/dtg/FeaturedPlaces';
import { TrendingNow } from '@/components/dtg/TrendingNow';
import { CommunityActivity } from '@/components/dtg/CommunityActivity';
import { NewsAndEvents } from '@/components/dtg/NewsAndEvents';
import { SEOContent } from '@/components/dtg/SEOContent';

interface Community {
  id: string;
  name: string;
  slug: string;
  state: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const client = getSupabaseServerClient(request);
  
  // Fetch active communities
  const { data: communities } = await client
    .from('communities')
    .select('id, name, slug, state')
    .eq('is_active', true)
    .order('name');

  // Fetch premium placement businesses (Popular Places)
  const { data: premiumPlacements } = await client
    .from('businesses')
    .select('*')
    .eq('is_active', true)
    .eq('premium_placement', true)
    .order('created_at', { ascending: false })
    .limit(3);

  // Fetch trending businesses (also premium placement)
  const { data: trendingBusinesses } = await client
    .from('businesses')
    .select('*')
    .eq('is_active', true)
    .eq('premium_placement', true)
    .eq('is_trending', true)
    .order('created_at', { ascending: false })
    .limit(3);

  // Fetch all businesses (featured first, then others)
  const { data: allBusinesses } = await client
    .from('businesses')
    .select('*')
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(12);

  // Fetch featured news (2x2 grid = 4 items)
  const { data: news } = await client
    .from('news_articles')
    .select('*')
    .eq('is_active', true)
    .or('is_featured.eq.true')
    .order('is_featured', { ascending: false })
    .order('published_at', { ascending: false })
    .limit(4);

  // Fetch featured events (2x2 grid = 4 items, sorted by soonest)
  const { data: events } = await client
    .from('events')
    .select('*')
    .eq('is_active', true)
    .gte('event_date', new Date().toISOString())
    .or('is_featured.eq.true')
    .order('is_featured', { ascending: false })
    .order('event_date', { ascending: true })
    .limit(4);

  // Fetch categories for filtering
  const { data: categories } = await client
    .from('business_categories')
    .select('*')
    .eq('is_active', true)
    .order('name');

  return {
    communities: communities || [],
    premiumPlacements: premiumPlacements || [],
    trendingBusinesses: trendingBusinesses || [],
    allBusinesses: allBusinesses || [],
    news: news || [],
    events: events || [],
    categories: categories || []
  };
}
export default function Home() {
  const { communities, premiumPlacements, trendingBusinesses, allBusinesses, news, events, categories } = useLoaderData<typeof loader>();
  const {
    currentBrand
  } = useBrand();
  const [selectedCommunity, setSelectedCommunity] = useState(() => {
    // Default to NYC if available, otherwise first community
    const nyc = communities.find(c => c.slug === 'nyc');
    return nyc ? nyc.id : communities[0]?.id || '';
  });
  const [communityName, setCommunityName] = useState(() => {
    const selected = communities.find(c => c.id === selectedCommunity);
    return selected?.name || 'New York City';
  });
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle community selection
  const handleCommunityChange = (communityId: string) => {
    setSelectedCommunity(communityId);
    const community = communities.find(c => c.id === communityId);
    if (community) {
      setCommunityName(community.name);
    }
  };
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/dtg/search?q=${encodeURIComponent(searchQuery)}&community=${encodeURIComponent(selectedCommunity)}`;
    }
  };
  // Generate SEO content based on community and brand type
  const brandInterest = currentBrand?.brandType === 'interest' ? currentBrand.name : 'local businesses';
  const communityDescription = generateCommunityDescription(communityName, brandInterest);
  const heroBackgroundImage = currentBrand?.experience?.backgroundImage || 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80';
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full bg-cover bg-center text-white" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${heroBackgroundImage} )`,
      backgroundColor: currentBrand?.primaryColor || '#3B82F6'
    }}>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {(currentBrand?.experience?.headline || 'Discover {city}').replace('{city}', communityName)}
            </h1>
            <p className="text-xl mb-8">
              {(currentBrand?.experience?.description || 'Explore the best of {city}').replace('{city}', communityName)}
            </p>
            {/* Main Search Bar */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={currentBrand?.experience?.searchPlaceholder || 'Search for restaurants, shops, events...'} />
                </div>
                <button type="submit" className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors" style={{
                color: currentBrand?.primaryColor || '#3B82F6'
              } }>
                  Search
                </button>
              </div>
            </form>
            {/* Location Selector */}
            <div className="inline-block">
              <div className="flex items-center justify-center bg-white bg-opacity-20 rounded-full px-4 py-2">
                <MapPinIcon className="w-5 h-5 text-white mr-2" />
                <select value={selectedCommunity} onChange={e => handleCommunityChange(e.target.value)} className="bg-transparent text-white border-none focus:outline-none focus:ring-0 cursor-pointer">
                  {communities.map(community => <option key={community.id} value={community.id} className="text-gray-800">
                      {community.name}
                    </option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <div className="flex-grow">
        {/* Quick Search Categories */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-2">
              {currentBrand?.pageSections?.sectionTitles?.featuredCategories || 'Featured Categories'}
            </h2>
            {currentBrand?.pageSections?.sectionDescriptions?.featuredCategories && <p className="text-gray-600 mb-6">
                {currentBrand.pageSections.sectionDescriptions.featuredCategories}
              </p>}
            <CategorySection />
          </div>
        </section>
        {/* Featured Businesses */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-2">
              {currentBrand?.pageSections?.sectionTitles?.popularPlaces || 'Popular Places'}
            </h2>
            {currentBrand?.pageSections?.sectionDescriptions?.popularPlaces && <p className="text-gray-600 mb-6">
                {currentBrand.pageSections.sectionDescriptions.popularPlaces}
              </p>}
            <FeaturedPlaces businesses={premiumPlacements} />
          </div>
        </section>
        {/* Trending Now */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-2">Trending Now</h2>
            <p className="text-gray-600 mb-6">
              See what's popular right now in {communityName}
            </p>
            <TrendingNow businesses={trendingBusinesses} />
          </div>
        </section>
        
        {/* All Businesses Grid */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-2">All Businesses</h2>
            <p className="text-gray-600 mb-6">
              Explore all the amazing businesses in {communityName}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allBusinesses.map(business => (
                <Link key={business.id} to={`/dtg/business/${business.id}`} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="h-40 overflow-hidden rounded-t-lg">
                    <img 
                      src={business.image_url || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
                      alt={business.name} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    {business.is_featured && (
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full mb-2">
                        Featured
                      </span>
                    )}
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">{business.name}</h3>
                    {business.category && (
                      <p className="text-sm text-gray-500 mb-2">{business.category}</p>
                    )}
                    {(business.rating || business.rating === 0) && (
                      <div className="flex items-center">
                        <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium ml-1">{business.rating.toFixed(1)}</span>
                        {business.review_count !== undefined && (
                          <span className="text-xs text-gray-500 ml-1">({business.review_count})</span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            {allBusinesses.length >= 12 && (
              <div className="text-center mt-8">
                <Link to="/dtg/businesses" className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  View All Businesses
                </Link>
              </div>
            )}
          </div>
        </section>
        
        {/* News & Events */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-2">
              {currentBrand?.pageSections?.sectionTitles?.newsAndEvents || 'News & Events'}
            </h2>
            {currentBrand?.pageSections?.sectionDescriptions?.newsAndEvents && <p className="text-gray-600 mb-6">
                {currentBrand.pageSections.sectionDescriptions.newsAndEvents}
              </p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* News Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Latest News</h3>
                <div className="grid grid-cols-1 gap-4">
                  {news.map(article => (
                    <Link key={article.id} to={`/dtg/news/${article.id}`} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
                      <div className="flex space-x-4">
                        {article.image_url && (
                          <img 
                            src={article.image_url} 
                            alt={article.title} 
                            className="w-20 h-20 object-cover rounded"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        )}
                        <div className="flex-1">
                          {article.is_featured && (
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded mb-1">
                              Featured
                            </span>
                          )}
                          <h4 className="font-medium text-gray-900 line-clamp-2">{article.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(article.published_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Events Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
                <div className="grid grid-cols-1 gap-4">
                  {events.map(event => (
                    <Link key={event.id} to={`/dtg/events/${event.id}`} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
                      <div className="flex space-x-4">
                        {event.image_url && (
                          <img 
                            src={event.image_url} 
                            alt={event.title} 
                            className="w-20 h-20 object-cover rounded"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        )}
                        <div className="flex-1">
                          {event.is_featured && (
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded mb-1">
                              Featured
                            </span>
                          )}
                          <h4 className="font-medium text-gray-900 line-clamp-2">{event.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(event.event_date).toLocaleDateString()} at {new Date(event.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          {event.location && (
                            <p className="text-sm text-gray-500">{event.location}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* SEO Content Section - ALWAYS VISIBLE */}
        <SEOContent communityName={communityName} communityDescription={communityDescription} brandInterest={brandInterest} />
        {/* Newsletter Signup */}
        <section className="py-12 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {currentBrand?.experience?.newsletterTitle || `Stay Updated with ${currentBrand?.name || 'Global Explorer'}`}
              </h2>
              <p className="text-gray-600 mb-6">
                {currentBrand?.experience?.newsletterDescription || 'Get the latest news, events, and exclusive deals delivered to your inbox.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input type="email" placeholder="Enter your email address" className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button className="px-6 py-3 text-white font-medium rounded-lg hover:opacity-90 transition-colors" style={{
                backgroundColor: currentBrand?.primaryColor || '#3B82F6'
              } }>
                  {currentBrand?.experience?.newsletterButtonText || 'Subscribe'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
// Helper function to generate SEO-friendly community descriptions
function generateCommunityDescription(communityName: string, brandInterest: string): string {
  // For a general description when no specific interest is available
  if (brandInterest === 'local businesses') {
    return `${communityName} offers a diverse range of experiences for residents and visitors alike. From acclaimed restaurants and boutique shops to cultural attractions and entertainment venues, there's something for everyone in this vibrant community.`;
  }
  // For specific interest-based descriptions
  const interestLower = brandInterest.toLowerCase();
  if (interestLower.includes('brewery') || interestLower.includes('beer')) {
    return `${communityName} has emerged as a premier destination for craft beer enthusiasts. The local brewery scene showcases innovative brewmasters creating everything from traditional lagers and ales to experimental small-batch creations, reflecting the unique character and creativity of the community.`;
  }
  if (interestLower.includes('restaurant') || interestLower.includes('food') || interestLower.includes('dining')) {
    return `${communityName} boasts a world-class culinary scene with restaurants ranging from Michelin-starred establishments to beloved neighborhood eateries. Local chefs pride themselves on creating innovative dishes using fresh, seasonal ingredients that showcase the region's diverse culinary traditions.`;
  }
  if (interestLower.includes('coffee') || interestLower.includes('cafe')) {
    return `${communityName} is home to a thriving coffee culture, with artisanal cafes and roasters on practically every corner. From third-wave specialty shops to cozy neighborhood cafes, coffee enthusiasts can explore a rich variety of brewing methods and single-origin beans from around the world.`;
  }
  if (interestLower.includes('art') || interestLower.includes('gallery') || interestLower.includes('museum')) {
    return `${communityName} features a vibrant arts scene with world-class museums, independent galleries, and public installations. The community has long been a haven for artists and creative professionals, fostering a rich cultural landscape that continues to evolve and inspire.`;
  }
  if (interestLower.includes('shop') || interestLower.includes('retail') || interestLower.includes('boutique')) {
    return `${communityName} offers a premier shopping experience with everything from luxury boutiques and department stores to unique independent retailers and vintage shops. Savvy shoppers will discover one-of-a-kind items and the latest trends throughout the community's diverse retail districts.`;
  }
  // Default interest-based description
  return `${communityName} is known for its exceptional ${brandInterest.toLowerCase()} scene. Visitors and locals alike can explore a wide variety of options, each offering unique experiences that showcase what makes this community special. Whether you're a longtime enthusiast or new to ${brandInterest.toLowerCase()}, ${communityName} has something to delight and surprise you.`;
}
