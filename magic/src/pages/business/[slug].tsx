import React, { useEffect, useState, Component } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPinIcon, PhoneIcon, GlobeIcon, ClockIcon, StarIcon, CameraIcon, MessageSquareIcon, ShareIcon, BookmarkIcon, ThumbsUpIcon, ChevronDownIcon, InstagramIcon, FacebookIcon, ZoomInIcon } from 'lucide-react';
// Mock data for business details
const mockBusiness = {
  id: 'urban-bites-cafe',
  name: 'Urban Bites Café',
  category: 'Restaurants',
  subcategory: 'Café',
  description: 'Urban Bites Café is a cozy spot serving artisanal coffee, freshly baked pastries, and healthy breakfast and lunch options. Our ingredients are locally sourced, and we pride ourselves on our sustainable practices and community involvement.',
  address: '123 Main Street, Downtown, CA 94105',
  phone: '(555) 123-4567',
  website: 'www.urbanbitescafe.com',
  rating: 4.7,
  reviewCount: 243,
  price: '$$',
  hours: {
    monday: '7:00 AM - 6:00 PM',
    tuesday: '7:00 AM - 6:00 PM',
    wednesday: '7:00 AM - 6:00 PM',
    thursday: '7:00 AM - 6:00 PM',
    friday: '7:00 AM - 8:00 PM',
    saturday: '8:00 AM - 8:00 PM',
    sunday: '8:00 AM - 5:00 PM'
  },
  features: ['Free Wi-Fi', 'Outdoor Seating', 'Wheelchair Accessible', 'Vegetarian Options', 'Vegan Options', 'Gluten-Free Options', 'Organic Ingredients', 'Pet Friendly'],
  images: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60', 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNhZmV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60', 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNhZmV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60', 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNhZmV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60'],
  socialMedia: {
    facebook: 'https://facebook.com/urbanbitescafe',
    instagram: 'https://instagram.com/urbanbitescafe'
  },
  reviews: [{
    id: 1,
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      reviewCount: 27
    },
    rating: 5,
    date: '2023-09-15',
    title: 'Best coffee in town!',
    content: 'I absolutely love the atmosphere at Urban Bites. Their cappuccino is to die for, and the staff is always friendly and attentive. The outdoor seating area is perfect for working or catching up with friends. Highly recommend their avocado toast with poached eggs!',
    helpful: 12,
    photos: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60']
  }, {
    id: 2,
    user: {
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      reviewCount: 15
    },
    rating: 4,
    date: '2023-08-30',
    title: 'Great place for remote work',
    content: "Urban Bites has become my go-to spot for remote work. The Wi-Fi is reliable, and they don't mind if you stay for a few hours. The cold brew is excellent, and they have plenty of outlets. Only reason for 4 stars is that it can get quite busy and noisy around lunch time.",
    helpful: 8,
    photos: []
  }, {
    id: 3,
    user: {
      name: 'Emily Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      reviewCount: 42
    },
    rating: 5,
    date: '2023-08-12',
    title: 'Amazing vegan options!',
    content: 'As someone with dietary restrictions, I appreciate the variety of vegan options at Urban Bites. The vegan banana bread is incredible, and they offer multiple plant-based milk alternatives at no extra charge. The staff is knowledgeable about ingredients and always willing to accommodate special requests.',
    helpful: 15,
    photos: ['https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNhZmV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60']
  }, {
    id: 4,
    user: {
      name: 'David Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
      reviewCount: 8
    },
    rating: 4,
    date: '2023-07-25',
    title: 'Solid breakfast spot',
    content: 'Had the breakfast burrito and a latte this morning. Food was fresh and delicious, coffee was good but not exceptional. Prices are reasonable for the quality. Would definitely come back to try more items on their menu.',
    helpful: 5,
    photos: []
  }],
  menu: [{
    category: 'Coffee & Espresso',
    items: [{
      name: 'Drip Coffee',
      price: '$3.50',
      description: 'Our house blend, medium roast'
    }, {
      name: 'Cold Brew',
      price: '$4.50',
      description: 'Steeped for 24 hours, smooth and refreshing'
    }, {
      name: 'Espresso',
      price: '$3.00',
      description: 'Double shot of our signature espresso blend'
    }, {
      name: 'Cappuccino',
      price: '$4.75',
      description: 'Equal parts espresso, steamed milk, and foam'
    }, {
      name: 'Latte',
      price: '$5.00',
      description: 'Espresso with steamed milk and a light layer of foam'
    }, {
      name: 'Mocha',
      price: '$5.50',
      description: 'Espresso with chocolate, steamed milk, and whipped cream'
    }]
  }, {
    category: 'Breakfast',
    items: [{
      name: 'Avocado Toast',
      price: '$9.50',
      description: 'Multigrain toast with smashed avocado, cherry tomatoes, microgreens, and optional poached egg'
    }, {
      name: 'Breakfast Burrito',
      price: '$10.50',
      description: 'Scrambled eggs, black beans, cheddar, avocado, and salsa in a whole wheat tortilla'
    }, {
      name: 'Acai Bowl',
      price: '$11.00',
      description: 'Acai blend topped with granola, fresh berries, banana, and honey'
    }, {
      name: 'Quiche of the Day',
      price: '$8.50',
      description: "Served with a side salad (ask server for today's selection)"
    }]
  }, {
    category: 'Lunch',
    items: [{
      name: 'Harvest Salad',
      price: '$12.00',
      description: 'Mixed greens, roasted vegetables, goat cheese, candied pecans, and balsamic vinaigrette'
    }, {
      name: 'Turkey Pesto Sandwich',
      price: '$11.50',
      description: 'Roasted turkey, provolone, pesto, tomato, and arugula on sourdough'
    }, {
      name: 'Veggie Wrap',
      price: '$10.50',
      description: 'Hummus, cucumber, roasted red pepper, spinach, and feta in a spinach wrap'
    }, {
      name: 'Soup of the Day',
      price: '$6.50',
      description: "Served with a slice of fresh bread (ask server for today's selection)"
    }]
  }, {
    category: 'Pastries & Desserts',
    items: [{
      name: 'Croissant',
      price: '$3.75',
      description: 'Buttery, flaky, and baked fresh daily'
    }, {
      name: 'Blueberry Muffin',
      price: '$3.50',
      description: 'Made with organic blueberries and topped with streusel'
    }, {
      name: 'Vegan Banana Bread',
      price: '$4.00',
      description: 'Moist banana bread made with plant-based ingredients'
    }, {
      name: 'Chocolate Chip Cookie',
      price: '$2.75',
      description: 'Soft-baked with semi-sweet chocolate chunks'
    }]
  }]
};
export function BusinessProfile() {
  const {
    slug
  } = useParams();
  const [business, setBusiness] = useState(mockBusiness);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [photoUploadModalOpen, setPhotoUploadModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // In a real app, fetch business data based on slug
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBusiness(mockBusiness);
      setIsLoading(false);
    }, 500);
  }, [slug]);
  // Handle call button click
  const handleCall = () => {
    setCallModalOpen(true);
  };
  // Handle message button click
  const handleMessage = () => {
    setMessageModalOpen(true);
  };
  // Handle share button click
  const handleShare = () => {
    setShareModalOpen(true);
  };
  // Handle save/bookmark button click
  const handleSave = () => {
    setIsSaved(!isSaved);
    // In a real app, you would make an API call to save/unsave the business
    const message = isSaved ? `${business.name} has been removed from your saved businesses` : `${business.name} has been saved to your favorites!`;
    // Show a toast notification or alert
    alert(message);
  };
  // Handle add photo button click
  const handleAddPhoto = () => {
    setPhotoUploadModalOpen(true);
  };
  // Handle write review button click
  const handleWriteReview = () => {
    navigate(`/review/${business.id}`);
  };
  // Handle share via different platforms
  const handleShareVia = platform => {
    const businessUrl = window.location.href;
    const businessName = business.name;
    const message = `Check out ${businessName} on our platform!`;
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(businessUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(businessUrl)}&text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(`Check out ${businessName}`)}&body=${encodeURIComponent(`${message}\n${businessUrl}`)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(businessUrl).then(() => alert('Link copied to clipboard!')).catch(err => console.error('Could not copy text: ', err));
        break;
    }
    setShareModalOpen(false);
  };
  // Handle photo upload
  const handlePhotoUpload = e => {
    e.preventDefault();
    // In a real app, you would handle the file upload to a server
    alert('Photo uploaded successfully!');
    setPhotoUploadModalOpen(false);
  };
  // Handle direct call
  const handleDirectCall = () => {
    window.location.href = `tel:${business.phone}`;
    setCallModalOpen(false);
  };
  // Handle send message
  const handleSendMessage = e => {
    e.preventDefault();
    // In a real app, you would send the message to the business
    alert('Message sent successfully!');
    setMessageModalOpen(false);
  };
  if (isLoading) {
    return <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>;
  }
  return <div className="w-full min-h-screen bg-gray-50">
      {/* Header/Hero Section */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <img src={business.images[0]} alt={business.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="container mx-auto px-4 pb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {business.name}
            </h1>
            <div className="flex items-center text-white mb-4">
              <div className="flex items-center mr-4">
                <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                <span>{business.rating}</span>
                <span className="ml-1 text-gray-300">
                  ({business.reviewCount} reviews)
                </span>
              </div>
              <span className="mr-4">•</span>
              <span>{business.category}</span>
              <span className="mx-2">•</span>
              <span>{business.price}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Business Info */}
          <div className="w-full lg:w-2/3">
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button onClick={handleCall} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <PhoneIcon className="w-4 h-4 mr-2" />
                Call
              </button>
              <button onClick={handleMessage} className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                <MessageSquareIcon className="w-4 h-4 mr-2" />
                Message
              </button>
              <button onClick={handleShare} className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                <ShareIcon className="w-4 h-4 mr-2" />
                Share
              </button>
              <button onClick={handleSave} className={`flex items-center px-4 py-2 rounded-md ${isSaved ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                <BookmarkIcon className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
              </button>
              <button onClick={handleAddPhoto} className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                <CameraIcon className="w-4 h-4 mr-2" />
                Add Photo
              </button>
              <button onClick={handleWriteReview} className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                <StarIcon className="w-4 h-4 mr-2" />
                Write Review
              </button>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                <button onClick={() => setActiveTab('overview')} className={`py-4 text-lg font-medium border-b-2 ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  Overview
                </button>
                <button onClick={() => setActiveTab('reviews')} className={`py-4 text-lg font-medium border-b-2 ${activeTab === 'reviews' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  Reviews
                </button>
                <button onClick={() => setActiveTab('photos')} className={`py-4 text-lg font-medium border-b-2 ${activeTab === 'photos' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  Photos
                </button>
                <button onClick={() => setActiveTab('menu')} className={`py-4 text-lg font-medium border-b-2 ${activeTab === 'menu' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  Menu
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && <div>
                <h2 className="text-2xl font-semibold mb-4">
                  About {business.name}
                </h2>
                <p className="text-gray-700 mb-6">{business.description}</p>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {business.features.map(feature => <div key={feature} className="flex items-center">
                        <ThumbsUpIcon className="w-5 h-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </div>)}
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Photos</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {business.images.slice(0, 6).map((image, index) => <div key={index} className="h-40 overflow-hidden rounded-lg">
                        <img src={image} alt={`${business.name} - Image ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </div>)}
                  </div>
                </div>
              </div>}

            {activeTab === 'reviews' && <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">
                    Reviews for {business.name}
                  </h2>
                  <button onClick={handleWriteReview} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                    <StarIcon className="w-4 h-4 mr-2" />
                    Write a Review
                  </button>
                </div>
                <div className="mb-8">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center mb-2">
                      <StarIcon className="w-6 h-6 text-yellow-500 mr-2" />
                      <span className="text-2xl font-bold">
                        {business.rating}
                      </span>
                      <span className="mx-2 text-gray-500">•</span>
                      <span className="text-gray-600">
                        {business.reviewCount} reviews
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
                        Newest First
                      </button>
                      <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
                        Highest Rated
                      </button>
                      <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
                        With Photos
                      </button>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {business.reviews.map(review => <div key={review.id} className="border-b border-gray-200 pb-6">
                        <div className="flex items-start mb-3">
                          <img src={review.user.avatar} alt={review.user.name} className="w-12 h-12 rounded-full mr-4" />
                          <div>
                            <h4 className="font-medium">{review.user.name}</h4>
                            <div className="text-sm text-gray-500">
                              {review.user.reviewCount} reviews
                            </div>
                          </div>
                        </div>
                        <div className="mb-2 flex items-center">
                          <div className="flex text-yellow-400 mr-2">
                            {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />)}
                          </div>
                          <span className="text-gray-500 text-sm">
                            {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                          </span>
                        </div>
                        {review.title && <h3 className="font-medium text-lg mb-2">
                            {review.title}
                          </h3>}
                        <p className="text-gray-700 mb-4">{review.content}</p>
                        {review.photos && review.photos.length > 0 && <div className="flex flex-wrap gap-2 mb-4">
                            {review.photos.map((photo, index) => <img key={index} src={photo} alt={`Review photo ${index + 1}`} className="w-20 h-20 object-cover rounded-md" />)}
                          </div>}
                        <div className="flex items-center text-sm text-gray-500">
                          <button className="flex items-center mr-4 hover:text-gray-700">
                            <ThumbsUpIcon className="w-4 h-4 mr-1" />
                            Helpful ({review.helpful})
                          </button>
                          <button className="flex items-center hover:text-gray-700">
                            <MessageSquareIcon className="w-4 h-4 mr-1" />
                            Comment
                          </button>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>}

            {activeTab === 'photos' && <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">
                    Photos of {business.name}
                  </h2>
                  <button onClick={handleAddPhoto} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 flex items-center">
                    <CameraIcon className="w-4 h-4 mr-2" />
                    Add Photos
                  </button>
                </div>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                      All Photos ({business.images.length})
                    </button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm hover:bg-gray-300">
                      Food & Drink
                    </button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm hover:bg-gray-300">
                      Interior
                    </button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm hover:bg-gray-300">
                      Exterior
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {business.images.map((image, index) => <div key={index} className="relative group">
                      <div className="h-48 overflow-hidden rounded-lg">
                        <img src={image} alt={`${business.name} - Image ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="p-2 bg-white rounded-full">
                            <ZoomInIcon className="w-5 h-5 text-gray-800" />
                          </button>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>}

            {activeTab === 'menu' && <div>
                <h2 className="text-2xl font-semibold mb-6">
                  Menu for {business.name}
                </h2>
                <div className="mb-8">
                  {business.menu.map((section, index) => <div key={index} className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
                        {section.category}
                      </h3>
                      <div className="space-y-4">
                        {section.items.map((item, itemIndex) => <div key={itemIndex} className="flex justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">
                                {item.name}
                              </h4>
                              <p className="text-gray-600 text-sm mt-1">
                                {item.description}
                              </p>
                            </div>
                            <div className="ml-4 font-medium text-gray-900">
                              {item.price}
                            </div>
                          </div>)}
                      </div>
                    </div>)}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                  <p>Menu last updated: September 2023</p>
                  <p className="mt-1">
                    Prices and items may vary. Please contact the business for
                    the most up-to-date information.
                  </p>
                </div>
              </div>}
          </div>

          {/* Right Column - Business Details */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Business Information
              </h3>
              <ul className="space-y-4 text-lg font-medium">
                <li className="flex items-start">
                  <MapPinIcon className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <div>{business.address}</div>
                  </div>
                </li>
                <li className="flex items-center">
                  <PhoneIcon className="w-5 h-5 text-gray-500 mr-3" />
                  <div>{business.phone}</div>
                </li>
                <li className="flex items-center">
                  <GlobeIcon className="w-5 h-5 text-gray-500 mr-3" />
                  <div>{business.website}</div>
                </li>
                <li className="flex items-start">
                  <ClockIcon className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <div className="mb-1">Hours:</div>
                    <div className="text-sm text-gray-600">
                      <div className="mb-1">
                        Monday: {business.hours.monday}
                      </div>
                      <div className="mb-1">
                        Tuesday: {business.hours.tuesday}
                      </div>
                      <div className="mb-1">
                        Wednesday: {business.hours.wednesday}
                      </div>
                      <div className="mb-1">
                        Thursday: {business.hours.thursday}
                      </div>
                      <div className="mb-1">
                        Friday: {business.hours.friday}
                      </div>
                      <div className="mb-1">
                        Saturday: {business.hours.saturday}
                      </div>
                      <div>Sunday: {business.hours.sunday}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            {business.socialMedia && <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Connect with {business.name}
                </h3>
                <div className="flex gap-3">
                  {business.socialMedia.facebook && <a href={business.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1877F2] text-white rounded-full hover:opacity-90">
                      <FacebookIcon className="w-5 h-5" />
                    </a>}
                  {business.socialMedia.instagram && <a href={business.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#E1306C] text-white rounded-full hover:opacity-90">
                      <InstagramIcon className="w-5 h-5" />
                    </a>}
                </div>
              </section>}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {shareModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Share {business.name}</h3>
              <button onClick={() => setShareModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleShareVia('facebook')} className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-blue-50">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Facebook</span>
              </button>
              <button onClick={() => handleShareVia('twitter')} className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-blue-50">
                <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Twitter</span>
              </button>
              <button onClick={() => handleShareVia('email')} className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-blue-50">
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Email</span>
              </button>
              <button onClick={() => handleShareVia('copy')} className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-blue-50">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h8a2 2 0 002-2v3a2 2 0 01-2 2h-3" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Copy Link</span>
              </button>
            </div>
          </div>
        </div>}

      {/* Call Modal */}
      {callModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Call {business.name}</h3>
              <button onClick={() => setCallModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-4">Phone number:</p>
              <p className="text-2xl font-bold mb-6">{business.phone}</p>
              <div className="flex justify-center gap-4">
                <button onClick={handleDirectCall} className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center">
                  <PhoneIcon className="w-5 h-5 mr-2" />
                  Call Now
                </button>
                <button onClick={() => setCallModalOpen(false)} className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>}

      {/* Message Modal */}
      {messageModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Message {business.name}</h3>
              <button onClick={() => setMessageModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSendMessage}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4" placeholder="Type your message here..." required></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setMessageModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>}

      {/* Photo Upload Modal */}
      {photoUploadModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Photo</h3>
              <button onClick={() => setPhotoUploadModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <form onSubmit={handlePhotoUpload}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Upload Photo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <CameraIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 mb-2">
                    Drag and drop a photo here, or
                  </p>
                  <input type="file" accept="image/*" className="hidden" id="photo-upload" required />
                  <label htmlFor="photo-upload" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer inline-block">
                    Browse Files
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Caption (optional)
                </label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Add a caption to your photo" />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setPhotoUploadModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Upload Photo
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
}