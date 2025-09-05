import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { json, useLoaderData } from 'react-router';
import type { Route } from './+types/route';
import React, { useEffect, useState } from 'react';
import { SearchIcon, MapPinIcon } from 'lucide-react';
import { useBrand } from '../contexts/BrandContext';
import { Layout } from '../components/Layout';
import { CategorySection } from '../components/CategorySection';
import { FeaturedPlaces } from '../components/FeaturedPlaces';
import { TrendingNow } from '../components/TrendingNow';
import { CommunityActivity } from '../components/CommunityActivity';
import { NewsAndEvents } from '../components/NewsAndEvents';
import { SEOContent } from '../components/SEOContent';
import { getAllCommunities, getCommunityById } from '../services/CommunityService';
export function Home() {
  const {
    currentBrand
  } = useBrand();
  // Removed useState - using loaderData instead
  // Removed useState - using loaderData instead
  const [communities, setCommunities] = useState<Array<{
    id: string;
    name: string;
  }>>([]);
  // Removed useState - using loaderData instead
  // Load communities
  useEffect(() => {
    const allCommunities = getAllCommunities();
    setCommunities(allCommunities);
  }, []);
  // Handle community selection
  const handleCommunityChange = (communityId: string) => {
    setSelectedCommunity(communityId);
    const community = getCommunityById(communityId);
    if (community) {
      setCommunityName(community.name);
    }
  };
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('Searching for:', searchQuery, 'in', communityName);
    // In a real app, this would redirect to search results page
  };
  // Generate SEO content based on community and brand type
  const brandInterest = currentBrand?.brandType === 'interest' ? currentBrand.name : 'local businesses';
  const communityDescription = generateCommunityDescription(communityName, brandInterest);
  const heroBackgroundImage = currentBrand?.experience?.backgroundImage || '/images/placeholder.jpg';
  return <Layout>
      {/* Hero Section */}
      <section className="relative w-full bg-cover bg-center text-white" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${heroBackgroundImage})`,
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
              }}>
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
            <div className="overflow-x-auto pb-4">
              <FeaturedPlaces />
            </div>
          </div>
        </section>
        {/* Trending Now */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-2">Trending Now</h2>
            <p className="text-gray-600 mb-6">
              See what's popular right now in {communityName}
            </p>
            <TrendingNow />
          </div>
        </section>
        {/* Community Activity */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-2">Community Activity</h2>
            <p className="text-gray-600 mb-6">
              Recent reviews and check-ins from the community
            </p>
            <CommunityActivity />
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
            <NewsAndEvents />
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
              }}>
                  {currentBrand?.experience?.newsletterButtonText || 'Subscribe'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>;
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
      // console.error('Error fetching data:', error);
    }

    const transformedData = {
      // Transform data to match component interface
      items: businesses || events || items || []
    };

    return json(transformedData, { headers });
  } catch (error) {
    // console.error('Loader error:', error);
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