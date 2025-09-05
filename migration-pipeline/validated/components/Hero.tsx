import React from 'react';
export function Hero() {
  return <section className="relative w-full bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover the Heart of the City
          </h1>
          <p className="text-xl mb-8">
            Your ultimate guide to the best places, events, and experiences
            downtown has to offer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
              Explore Now
            </button>
            <button className="px-6 py-3 bg-transparent border border-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              View Map
            </button>
          </div>
        </div>
      </div>
    </section>;
}