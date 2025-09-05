import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { Header } from '@/components/dtg/Header';
import Footer from '@/components/dtg/Footer';
import { CalendarIcon, ArrowLeftIcon, ClockIcon, MapPinIcon, UsersIcon, TagIcon, ShareIcon, HeartIcon, CheckIcon, ExternalLinkIcon } from 'lucide-react';
const allEventItems = [{
  id: 101,
  title: 'Summer Night Market',
  date: 'Friday, May 19, 2023',
  time: '6:00 PM - 10:00 PM',
  dateObj: new Date(2023, 4, 19, 18, 0),
  location: 'Main Street Plaza',
  address: '123 Main Street, Downtown',
  image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  description: `<p>Join us for the Summer Night Market featuring local vendors, artisans, food trucks, and live music. A perfect evening out for the whole family.</p>
    <h3>What to Expect:</h3>
    <ul>
      <li>Artisan crafts and handmade goods</li>
      <li>Local farm produce and specialty foods</li>
      <li>Food trucks offering a variety of cuisines</li>
      <li>Live music performances</li>
      <li>Activities for children</li>
      <li>Community art project</li>
    </ul>
    <p>The event is free to attend and open to all ages. Food and merchandise will be available for purchase. Most vendors accept credit cards, but we recommend bringing some cash as well.</p>`,
  category: 'Market',
  organizer: 'Downtown Business Association',
  attendees: 342,
  price: 'Free',
  tags: ['Night Market', 'Local Vendors', 'Food Trucks', 'Live Music', 'Family-Friendly']
}, {
  id: 102,
  title: 'Local Music Festival',
  date: 'Saturday & Sunday, May 20-21, 2023',
  time: '10:00 AM - 10:00 PM',
  dateObj: new Date(2023, 4, 20, 10, 0),
  location: 'Riverside Park',
  address: '456 River Road, Downtown',
  image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  description: `<p>A two-day celebration of local music featuring over 20 bands across three stages. Food vendors, craft beer, and family activities will be available.</p>
    <p>The Local Music Festival returns for its 5th year with an exciting lineup of talent from across the region. From rock and indie to jazz and folk, there's something for every music lover to enjoy.</p>
    <h3>Festival Highlights:</h3>
    <ul>
      <li>20+ bands performing across three stages</li>
      <li>Headliners include The River Band, Electric Echo, and Sarah James</li>
      <li>Local craft beer garden featuring 10 regional breweries</li>
      <li>Food court with diverse dining options</li>
      <li>Artisan marketplace</li>
      <li>Family zone with activities for all ages</li>
    </ul>
    <p>Tickets are $25 for a single day or $40 for the weekend pass. Children under 12 are free when accompanied by an adult. Limited VIP packages are available for $75, which include preferred viewing areas, exclusive lounge access, and complimentary food and beverages.</p>`,
  category: 'Music',
  organizer: 'City Arts Council',
  attendees: 1250,
  price: '$25',
  tags: ['Music Festival', 'Live Bands', 'Outdoor Event', 'Craft Beer', 'Family Activities']
}, {
  id: 103,
  title: 'Food & Wine Tasting Tour',
  date: 'Tuesday, May 23, 2023',
  time: '7:00 PM - 9:00 PM',
  dateObj: new Date(2023, 4, 23, 19, 0),
  location: 'Various Downtown Restaurants',
  address: 'Starting at The Grand Hotel Lobby, 789 Central Ave, Downtown',
  image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  description: `<p>Sample the best food and wine from downtown restaurants on this guided walking tour. Each stop includes a signature dish paired with a complementary wine.</p>
    <p>Join certified sommelier Michael Chen for an evening of culinary delights as you explore the vibrant downtown food scene. This walking tour will take you to five of the area's most acclaimed restaurants, where you'll enjoy specially prepared dishes paired with exceptional wines.</p>
    <h3>Tour Details:</h3>
    <ul>
      <li>Guided by certified sommelier Michael Chen</li>
      <li>Visit five downtown restaurants</li>
      <li>Sample signature dishes at each location</li>
      <li>Enjoy expertly paired wines with each course</li>
      <li>Learn about food and wine pairing principles</li>
      <li>Meet chefs and restaurant owners</li>
    </ul>
    <p>The tour covers approximately 1 mile of walking and lasts about 2 hours. Comfortable shoes are recommended. Dietary restrictions can be accommodated with advance notice. Must be 21+ to participate. ID will be checked at the start of the tour.</p>`,
  category: 'Food & Drink',
  organizer: 'Downtown Culinary Alliance',
  attendees: 75,
  price: '$65',
  tags: ['Food Tour', 'Wine Tasting', 'Culinary Experience', 'Downtown', 'Adult Event']
}, {
  id: 104,
  title: 'Tech Startup Networking Mixer',
  date: 'Wednesday, May 24, 2023',
  time: '6:00 PM - 8:00 PM',
  dateObj: new Date(2023, 4, 24, 18, 0),
  location: 'Innovation Hub',
  address: '101 Tech Drive, Downtown',
  image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  description: `<p>Connect with local entrepreneurs, investors, and tech professionals at this casual networking event. Complimentary drinks and appetizers will be served.</p>
    <p>The Tech Startup Networking Mixer brings together the local tech community for an evening of meaningful connections and conversations. Whether you're a founder looking for investors, a developer seeking new opportunities, or simply interested in the startup ecosystem, this event is for you.</p>
    <h3>Event Features:</h3>
    <ul>
      <li>Lightning pitches from 5 local startups</li>
      <li>Panel discussion with successful entrepreneurs</li>
      <li>Networking activities designed to facilitate meaningful connections</li>
      <li>Complimentary drinks and appetizers</li>
      <li>Opportunity to schedule follow-up meetings in dedicated quiet spaces</li>
    </ul>
    <p>Business casual attire is recommended. Don't forget to bring plenty of business cards! Registration is required as space is limited. The $10 ticket fee helps cover event costs and supports the Innovation Hub's mentorship program for underrepresented founders.</p>`,
  category: 'Networking',
  organizer: 'Innovation Hub',
  attendees: 120,
  price: '$10',
  tags: ['Networking', 'Tech Startups', 'Entrepreneurs', 'Professional Event', 'Business']
}];
export default function EventDetail() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [isInterested, setIsInterested] = useState(false);
  const eventItem = allEventItems.find(item => item.id === Number(id));
  if (!eventItem) {
    return <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-700 mb-2">
              Event not found
            </h1>
            <p className="text-gray-500 mb-6">
              The event you're looking for doesn't exist or has been removed.
            </p>
            <button onClick={() => navigate('/events')} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Back to Events
            </button>
          </div>
        </main>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="bg-blue-600 py-6">
          <div className="container mx-auto px-4">
            <Link to="/events" className="inline-flex items-center text-white hover:text-blue-100 mb-4">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Events
            </Link>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="lg:flex lg:space-x-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Event Header */}
              <div className="mb-6">
                <span className="inline-block text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">
                  {eventItem.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {eventItem.title}
                </h1>
                <div className="flex flex-wrap items-center text-gray-600 text-sm mb-4">
                  <span className="mr-4">
                    Organized by {eventItem.organizer}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {eventItem.tags.map(tag => <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {tag}
                    </span>)}
                </div>
              </div>
              {/* Featured Image */}
              <div className="mb-8 rounded-lg overflow-hidden">
                <img src={eventItem.image} alt={eventItem.title} className="w-full h-auto object-cover" />
              </div>
              {/* Event Details */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  About This Event
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{
                __html: eventItem.description
              } } />
              </div>
            </div>
            {/* Sidebar */}
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <div className="mb-6">
                  <div className="text-2xl font-bold text-gray-800">
                    {eventItem.price}
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <CalendarIcon className="w-5 h-5 text-gray-600 mt-0.5 mr-3" />
                    <div>
                      <div className="font-medium text-gray-800">
                        Date & Time
                      </div>
                      <div className="text-gray-600">{eventItem.date}</div>
                      <div className="text-gray-600">{eventItem.time}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPinIcon className="w-5 h-5 text-gray-600 mt-0.5 mr-3" />
                    <div>
                      <div className="font-medium text-gray-800">Location</div>
                      <div className="text-gray-600">{eventItem.location}</div>
                      <div className="text-gray-600">{eventItem.address}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <UsersIcon className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-800">
                        {eventItem.attendees} people interested
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex justify-center items-center">
                    {eventItem.price === 'Free' ? 'Register Now' : 'Buy Tickets'}
                  </button>
                  <button onClick={() => setIsInterested(!isInterested)} className={`w-full py-3 px-4 border font-medium rounded-lg flex justify-center items-center space-x-2 ${isInterested ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                    {isInterested ? <>
                        <CheckIcon className="w-5 h-5" />
                        <span>Interested</span>
                      </> : <>
                        <HeartIcon className="w-5 h-5" />
                        <span>I'm Interested</span>
                      </>}
                  </button>
                  <div className="flex space-x-3">
                    <button className="flex-1 py-2 px-3 border border-gray-300 text-gray-700 font-medium rounded-lg flex justify-center items-center hover:bg-gray-50">
                      <ShareIcon className="w-5 h-5 mr-2" />
                      Share
                    </button>
                    <a href={`https://maps.google.com/?q=${encodeURIComponent(eventItem.address)} `} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 px-3 border border-gray-300 text-gray-700 font-medium rounded-lg flex justify-center items-center hover:bg-gray-50">
                      <ExternalLinkIcon className="w-5 h-5 mr-2" />
                      Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Related Events */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Similar Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allEventItems.filter(item => item.id !== eventItem.id && item.category === eventItem.category).slice(0, 3).map(event => <Link key={event.id} to={`/events/${event.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-40 overflow-hidden relative">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-2 py-1 m-2 rounded">
                        {event.price}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {event.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        <span>{event.date.split(',')[0]}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </Link>)}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}
