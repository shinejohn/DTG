import type { Route } from './+types/route';
import React from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

import { CalendarIcon, ClockIcon, MapPinIcon, ExternalLinkIcon } from 'lucide-react';
// Sample data - in a real app, this would come from an API
const newsAndEvents = [{
  id: 'n1',
  type: 'news',
  title: 'New Restaurant Row Development Announced',
  image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  source: 'Day.News',
  date: 'May 15, 2023',
  excerpt: 'The city has approved plans for a new restaurant development featuring 12 unique dining concepts...',
  url: '/news/n1'
}, {
  id: 'e1',
  type: 'event',
  title: 'Summer Food Festival',
  image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  date: 'June 24-26, 2023',
  time: '11:00 AM - 8:00 PM',
  location: 'Downtown Plaza',
  url: '/events/e1'
}, {
  id: 'n2',
  type: 'news',
  title: 'Local Brewery Wins National Award',
  image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  source: 'Day.News',
  date: 'May 10, 2023',
  excerpt: 'Hometown Brewing Co. has been recognized for their innovative craft beer at the National Beer Competition...',
  url: '/news/n2'
}, {
  id: 'e2',
  type: 'event',
  title: 'Art Walk & Wine Tasting',
  image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  date: 'June 3, 2023',
  time: '5:00 PM - 9:00 PM',
  location: 'Arts District',
  url: '/events/e2'
}];
export default function NewsAndEvents() {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {newsAndEvents.map(item => <Link key={item.id} to={item.url} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
          <div className="h-48 overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-4 flex-grow">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.type === 'news' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                {item.type === 'news' ? 'News' : 'Event'}
              </span>
              {item.type === 'news' && <span className="text-xs text-gray-500 flex items-center">
                  <ExternalLinkIcon className="w-3 h-3 mr-1" />
                  {item.source}
                </span>}
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
            {item.type === 'news' ? <>
                <p className="text-gray-600 text-sm mb-2">{item.excerpt}</p>
                <div className="text-gray-500 text-xs">
                  <CalendarIcon className="w-3 h-3 inline mr-1" />
                  {item.date}
                </div>
              </> : <div className="space-y-1">
                <div className="flex items-center text-gray-600 text-sm">
                  <CalendarIcon className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <ClockIcon className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span>{item.time}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPinIcon className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span>{item.location}</span>
                </div>
              </div>}
          </div>
        </Link>)}
      <div className="md:col-span-2 text-center mt-4">
        <div className="flex justify-center space-x-4">
          <Link to="/news" className="text-blue-600 font-medium hover:underline">
            View All News
          </Link>
          <Link to="/events" className="text-blue-600 font-medium hover:underline">
            View All Events
          </Link>
        </div>
      </div>
    </div>;
}
export async function loader({ params, request }: Route.LoaderArgs) {
  const { supabase, headers } = getSupabaseServerClient(request);
  
  try {
    const { data: items, error } = await supabase
      .from('businesses')
      .select('*')
      .limit(10);

    if (error) {
      console.error('Error fetching data:', error);
    }

    return json({
      items: items || []
    }, { headers });
  } catch (error) {
    console.error('Loader error:', error);
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