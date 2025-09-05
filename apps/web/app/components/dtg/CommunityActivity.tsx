import React from 'react';
import { Link } from 'react-router';
import { UserIcon, StarIcon, MapPinIcon, CheckIcon, MessageSquareIcon } from 'lucide-react';

// Sample data - in a real app, this would come from an API
const communityActivity = [{
  id: 'a1',
  type: 'review',
  user: {
    id: 'u1',
    name: 'Jessica M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  business: {
    id: 'b1',
    name: 'The Urban Bistro',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  rating: 5,
  content: 'Absolutely loved the ambiance and the food was exceptional. Will definitely be coming back!',
  timestamp: '2 hours ago'
}, {
  id: 'a2',
  type: 'check-in',
  user: {
    id: 'u2',
    name: 'Michael T.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  business: {
    id: 'b2',
    name: 'Craft Coffee House',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  timestamp: '4 hours ago'
}, {
  id: 'a3',
  type: 'review',
  user: {
    id: 'u3',
    name: 'Sarah K.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  business: {
    id: 'b3',
    name: 'Fresh Market Grocery',
    image: 'https://images.unsplash.com/photo-1506617564039-2f3b650b7010?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  rating: 4,
  content: 'Great selection of fresh produce and friendly staff. Prices are a bit high though.',
  timestamp: '1 day ago'
}, {
  id: 'a4',
  type: 'check-in',
  user: {
    id: 'u4',
    name: 'David L.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  business: {
    id: 'b4',
    name: 'The Cozy Bookstore',
    image: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  timestamp: '1 day ago'
}];
export default function CommunityActivity() {
  return <div className="space-y-4">
      {communityActivity.map(activity => <div key={activity.id} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center mb-3">
            <img src={activity.user.avatar} alt={activity.user.name} className="w-10 h-10 rounded-full object-cover mr-3" />
            <div>
              <Link to={`/profile/${activity.user.id}`} className="font-medium text-blue-600 hover:underline">
                {activity.user.name}
              </Link>
              <div className="flex items-center text-sm text-gray-500">
                {activity.type === 'review' ? <>
                    <MessageSquareIcon className="w-3 h-3 mr-1" />
                    <span>reviewed</span>
                  </> : <>
                    <CheckIcon className="w-3 h-3 mr-1" />
                    <span>checked in at</span>
                  </>}
                <Link to={`/business/${activity.business.id}`} className="ml-1 text-blue-600 hover:underline">
                  {activity.business.name}
                </Link>
                <span className="mx-1">•</span>
                <span>{activity.timestamp}</span>
              </div>
            </div>
          </div>
          <div className="flex">
            <Link to={`/business/${activity.business.id}`} className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
              <img src={activity.business.image} alt={activity.business.name} className="w-full h-full object-cover" />
            </Link>
            <div className="ml-3 flex-grow">
              {activity.type === 'review' && <>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < activity.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />)}
                  </div>
                  <p className="text-gray-700 text-sm">{activity.content}</p>
                </>}
              {activity.type === 'check-in' && <div className="flex items-center text-gray-700">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  <span>Checked in at {activity.business.name}</span>
                </div>}
            </div>
          </div>
        </div>)}
      <div className="text-center mt-6">
        <Link to="/community" className="text-blue-600 font-medium hover:underline">
          View More Community Activity
        </Link>
      </div>
    </div>;
}
