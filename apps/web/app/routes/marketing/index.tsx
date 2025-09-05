import { Link } from 'react-router';
import { MapPin, Calendar, TrendingUp, Users, Search, Star } from 'lucide-react';

export default function Index() {
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
            <div className="bg-white rounded-lg shadow-xl p-2 max-w-2xl mx-auto">
              <div className="flex items-center">
                <Search className="h-6 w-6 text-gray-400 ml-4" />
                <input
                  type="text"
                  placeholder="Search businesses, events, or categories..."
                  className="flex-1 px-4 py-3 text-gray-800 focus:outline-none"
                />
                <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="container mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: MapPin, title: 'Find Places', description: 'Discover local businesses', color: 'bg-red-500' },
            { icon: Calendar, title: 'Events', description: 'Upcoming community events', color: 'bg-green-500' },
            { icon: TrendingUp, title: 'Trending', description: "What's popular now", color: 'bg-purple-500' },
            { icon: Users, title: 'Community', description: 'Connect with locals', color: 'bg-orange-500' }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
              <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Businesses */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Local Businesses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Downtown Coffee House',
                category: 'Coffee Shop',
                rating: 4.5,
                image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
                description: 'Cozy atmosphere with the best coffee in town'
              },
              {
                name: 'Main Street Pizzeria',
                category: 'Restaurant',
                rating: 4.8,
                image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
                description: 'Authentic Italian pizza made with love'
              },
              {
                name: 'City Fitness Center',
                category: 'Gym',
                rating: 4.6,
                image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
                description: 'State-of-the-art equipment and expert trainers'
              }
            ].map((business, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <img src={business.image} alt={business.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{business.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-medium">{business.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-2">{business.category}</p>
                  <p className="text-gray-600">{business.description}</p>
                  <Link to="#" className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium">
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
            <Link to="/businesses" className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
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