import { Link, useLoaderData } from 'react-router';
import { MapPin, Calendar, TrendingUp, Users, Search, Star } from 'lucide-react';
import type { LoaderFunctionArgs } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

interface Business {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  short_description: string;
  average_rating: number;
  review_count: number;
  price_range: string;
  logo_url: string | null;
  cover_image_url: string | null;
  address_city: string;
  category: {
    name: string;
  };
}

export async function loader({ request }: LoaderFunctionArgs) {
  const client = getSupabaseServerClient(request);
  
  // Fetch featured businesses with their categories
  const { data: businesses, error } = await client
    .from('businesses')
    .select(`
      id,
      name,
      slug,
      category_id,
      short_description,
      average_rating,
      review_count,
      price_range,
      logo_url,
      cover_image_url,
      address_city,
      category:business_categories(name)
    `)
    .eq('is_featured', true)
    .eq('status', 'active')
    .limit(6);

  if (error) {
    console.error('Error fetching featured businesses:', error);
  }

  return {
    featuredBusinesses: businesses || []
  };
}

export default function Index() {
  const { featuredBusinesses } = useLoaderData<typeof loader>();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    if (query?.trim()) {
      window.location.href = `/dtg/search?q=${encodeURIComponent(query)}`;
    }
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Downtown Guide
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-blue-100">
              Discover the best local businesses, events, and deals in your downtown area
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-xl p-2 max-w-2xl mx-auto">
              <div className="flex items-center">
                <Search className="h-6 w-6 text-gray-400 ml-4" />
                <input
                  type="text"
                  name="search"
                  placeholder="Search businesses, events, or categories..."
                  className="flex-1 px-4 py-3 text-gray-800 focus:outline-none"
                />
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="container mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: MapPin, title: 'Find Places', description: 'Discover local businesses', color: 'bg-red-500', href: '/dtg/explore' },
            { icon: Calendar, title: 'Events', description: 'Upcoming community events', color: 'bg-green-500', href: '/dtg/events' },
            { icon: TrendingUp, title: 'Trending', description: "What's popular now", color: 'bg-purple-500', href: '/dtg/trending' },
            { icon: Users, title: 'Community', description: 'Connect with locals', color: 'bg-orange-500', href: '/dtg' }
          ].map((item, index) => (
            <Link 
              key={index} 
              to={item.href}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition block"
            >
              <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Businesses */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Local Businesses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBusinesses.map((business) => (
              <div key={business.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <img 
                  src={business.cover_image_url || business.logo_url || 'https://via.placeholder.com/400x300?text=No+Image'} 
                  alt={business.name} 
                  className="w-full h-48 object-cover" 
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{business.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-medium">{business.average_rating || 0}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-2">{business.category?.name || 'Business'}</p>
                  <p className="text-gray-600">{business.short_description || 'Visit us to learn more!'}</p>
                  <Link to={`/dtg/business/${business.slug}`} className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium">
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Your Local Community
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Get exclusive deals, event updates, and connect with your neighbors
          </p>
          <div className="space-x-4">
            <Link to="/auth/sign-up" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Get Started
            </Link>
            <Link to="/dtg/explore" className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Browse Businesses
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay in the Loop</h3>
            <p className="text-gray-600 mb-6">
              Get the latest updates on local events, new businesses, and exclusive deals
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}