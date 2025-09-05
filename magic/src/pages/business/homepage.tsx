import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, PhoneIcon, MailIcon, GlobeIcon, ClockIcon, StarIcon, CheckIcon, CalendarIcon, CameraIcon, FacebookIcon, InstagramIcon, ChevronRightIcon, ChevronLeftIcon, ArrowRightIcon, MenuIcon, XIcon, MessageSquareIcon, UtensilsIcon, UserIcon } from 'lucide-react';
// Using the same mock data from the business detail page
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
  }],
  // Additional data for a more complete business homepage
  about: {
    story: "Urban Bites Café began in 2018 when founders Mike and Olivia Peterson, a husband-and-wife team with a passion for great food and community, decided to create the kind of place they'd want to spend time in themselves. After years working in various restaurants and cafés, they combined their experience to establish a space that prioritizes quality ingredients, sustainable practices, and a welcoming atmosphere.",
    mission: 'Our mission is to create a gathering place where food, community, and sustainability intersect. We believe that a café can be more than just a place to grab coffee – it can be a cornerstone of the neighborhood, a workspace for creatives, and a business that makes a positive impact on the environment and local economy.',
    team: [{
      name: 'Mike Peterson',
      role: 'Co-Founder & Head Barista',
      bio: 'Mike has over 15 years of experience in specialty coffee and has competed in multiple regional barista championships. He personally selects all our coffee beans and trains our barista team.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    }, {
      name: 'Olivia Peterson',
      role: 'Co-Founder & Executive Chef',
      bio: "With a background in farm-to-table restaurants, Olivia develops our seasonal menu items and oversees our kitchen operations. She's passionate about showcasing local ingredients in creative ways.",
      image: 'https://randomuser.me/api/portraits/women/35.jpg'
    }, {
      name: 'Sophia Chen',
      role: 'Café Manager',
      bio: 'Sophia joined our team in 2019 and quickly became an essential part of Urban Bites. She manages our day-to-day operations and is likely the friendly face greeting you at the counter.',
      image: 'https://randomuser.me/api/portraits/women/17.jpg'
    }]
  },
  events: [{
    id: 1,
    title: 'Coffee Tasting Workshop',
    date: '2023-11-15',
    time: '3:00 PM - 5:00 PM',
    description: 'Join our head barista for a guided tasting of single-origin coffees from around the world. Learn about different brewing methods and how to identify flavor notes.',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y29mZmVlJTIwdGFzdGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60'
  }, {
    id: 2,
    title: 'Local Artist Showcase',
    date: '2023-11-22',
    time: '6:00 PM - 9:00 PM',
    description: "We're featuring the works of local photographer Jamie Rivera. Come enjoy complimentary appetizers and meet the artist while viewing stunning urban landscape photography.",
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0JTIwZ2FsbGVyeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60'
  }],
  specialties: [{
    title: 'Specialty Coffee',
    description: 'We source our beans from ethical, sustainable farms and roast them locally to ensure the freshest cup possible.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29mZmVlJTIwYmVhbnN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60'
  }, {
    title: 'Fresh Pastries',
    description: 'Our in-house pastry chef creates delicious treats daily, from flaky croissants to decadent cakes.',
    image: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFzdHJpZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60'
  }, {
    title: 'Healthy Meals',
    description: 'Enjoy nutritious breakfast and lunch options made with locally sourced, organic ingredients whenever possible.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60'
  }]
};
export function BusinessHomepage() {
  const [business, setBusiness] = useState(mockBusiness);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // In a real app, fetch business data
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBusiness(mockBusiness);
      setIsLoading(false);
    }, 500);
    // Auto-rotate hero slides
    const interval = setInterval(() => {
      setActiveSlide(prev => prev === business.images.length - 1 ? 0 : prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const nextSlide = () => {
    setActiveSlide(prev => prev === business.images.length - 1 ? 0 : prev + 1);
  };
  const prevSlide = () => {
    setActiveSlide(prev => prev === 0 ? business.images.length - 1 : prev - 1);
  };
  // Handle reservation form submission
  const handleReservation = e => {
    e.preventDefault();
    alert('Reservation request submitted! We will confirm your reservation shortly.');
    setReservationModalOpen(false);
  };
  // Handle contact form submission
  const handleContact = e => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setContactModalOpen(false);
  };
  if (isLoading) {
    return <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>;
  }
  return <div className="w-full min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {business.name}
              </h1>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium">
                About
              </a>
              <a href="#menu" className="text-gray-600 hover:text-gray-900 font-medium">
                Menu
              </a>
              <a href="#gallery" className="text-gray-600 hover:text-gray-900 font-medium">
                Gallery
              </a>
              <a href="#events" className="text-gray-600 hover:text-gray-900 font-medium">
                Events
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 font-medium">
                Testimonials
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 font-medium">
                Contact
              </a>
              <button onClick={() => setReservationModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Reserve a Table
              </button>
            </nav>
            {/* Mobile menu button */}
            <button className="md:hidden text-gray-500 hover:text-gray-700" onClick={() => setMobileMenuOpen(true)}>
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && <div className="fixed inset-0 z-50 bg-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                {business.name}
              </h1>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col space-y-6">
              <a href="#about" className="text-xl text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMobileMenuOpen(false)}>
                About
              </a>
              <a href="#menu" className="text-xl text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Menu
              </a>
              <a href="#gallery" className="text-xl text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Gallery
              </a>
              <a href="#events" className="text-xl text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Events
              </a>
              <a href="#testimonials" className="text-xl text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Testimonials
              </a>
              <a href="#contact" className="text-xl text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </a>
              <button onClick={() => {
            setMobileMenuOpen(false);
            setReservationModalOpen(true);
          }} className="bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors text-xl">
                Reserve a Table
              </button>
            </nav>
          </div>
        </div>}
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        {business.images.map((image, index) => <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${activeSlide === index ? 'opacity-100' : 'opacity-0'}`}>
            <img src={image} alt={`${business.name} - Showcase ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>)}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Welcome to {business.name}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-8">
            {business.description.split('.')[0]}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setReservationModalOpen(true)} className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Reserve a Table
            </button>
            <a href="#menu" className="px-6 py-3 bg-white text-gray-900 rounded-md hover:bg-gray-100 transition-colors">
              View Our Menu
            </a>
          </div>
        </div>
        {/* Slide Controls */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-opacity">
          <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-opacity">
          <ChevronRightIcon className="w-6 h-6 text-gray-800" />
        </button>
        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {business.images.map((_, index) => <button key={index} onClick={() => setActiveSlide(index)} className={`h-2 w-2 rounded-full ${activeSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'}`} aria-label={`Go to slide ${index + 1}`} />)}
        </div>
      </section>
      {/* Quick Info Bar */}
      <section className="bg-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center mb-2 md:mb-0 mr-8">
              <MapPinIcon className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-gray-700">{business.address}</span>
            </div>
            <div className="flex items-center mb-2 md:mb-0 mr-8">
              <PhoneIcon className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-gray-700">{business.phone}</span>
            </div>
            <div className="flex items-center mb-2 md:mb-0">
              <ClockIcon className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-gray-700">
                Open Today: {business.hours.monday}
              </span>
            </div>
            <div className="flex space-x-3 mt-2 md:mt-0">
              {business.socialMedia.facebook && <a href={business.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1877F2] text-white rounded-full hover:opacity-90 transition-opacity">
                  <FacebookIcon className="w-4 h-4" />
                </a>}
              {business.socialMedia.instagram && <a href={business.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#E1306C] text-white rounded-full hover:opacity-90 transition-opacity">
                  <InstagramIcon className="w-4 h-4" />
                </a>}
            </div>
          </div>
        </div>
      </section>
      {/* Specialties Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Specialties
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At {business.name}, we pride ourselves on quality and
              craftsmanship in everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {business.specialties.map((specialty, index) => <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img src={specialty.image} alt={specialty.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {specialty.title}
                  </h3>
                  <p className="text-gray-600">{specialty.description}</p>
                </div>
              </div>)}
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {business.about.story}
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {business.about.mission}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Features
                  </h3>
                  <ul className="space-y-2">
                    {business.features.slice(0, 4).map((feature, index) => <li key={index} className="flex items-center">
                        <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Amenities
                  </h3>
                  <ul className="space-y-2">
                    {business.features.slice(4, 8).map((feature, index) => <li key={index} className="flex items-center">
                        <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>)}
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Meet Our Team
                </h3>
                <div className="space-y-8">
                  {business.about.team.map((member, index) => <div key={index} className="flex items-start">
                      <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                      <div>
                        <h4 className="font-semibold text-lg">{member.name}</h4>
                        <p className="text-blue-600 mb-2">{member.role}</p>
                        <p className="text-gray-600 text-sm">{member.bio}</p>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Menu Section */}
      <section id="menu" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Menu</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a variety of freshly prepared dishes made with locally
              sourced ingredients. Our menu changes seasonally to showcase the
              best produce available.
            </p>
          </div>
          <div className="space-y-12">
            {business.menu.map((section, index) => <div key={index}>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  {section.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.items.map((item, itemIndex) => <div key={itemIndex} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-lg">
                            {item.name}
                          </h4>
                          <p className="text-gray-600 mt-1">
                            {item.description}
                          </p>
                        </div>
                        <div className="ml-4 font-medium text-gray-900 text-lg">
                          {item.price}
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>)}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Please inform your server of any allergies or dietary
              restrictions. We're happy to accommodate special requests when
              possible.
            </p>
            <button onClick={() => setReservationModalOpen(true)} className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Reserve a Table
            </button>
          </div>
        </div>
      </section>
      {/* Gallery Section */}
      <section id="gallery" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Photo Gallery
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take a visual tour of our café, our food, and the experience we
              offer.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {business.images.map((image, index) => <div key={index} className="group relative overflow-hidden rounded-lg h-64">
                <img src={image} alt={`${business.name} - Gallery image ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                  <CameraIcon className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>)}
          </div>
        </div>
      </section>
      {/* Events Section */}
      <section id="events" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join us for special events, workshops, and community gatherings at{' '}
              {business.name}.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {business.events.map(event => <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <span>
                      {new Date(event.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}{' '}
                      • {event.time}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    RSVP Now
                  </button>
                </div>
              </div>)}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section id="testimonials" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <div className="flex items-center justify-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(star => <StarIcon key={star} className={`w-6 h-6 ${star <= Math.round(business.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />)}
              </div>
              <span className="ml-2 text-2xl font-bold">{business.rating}</span>
              <span className="ml-2 text-gray-600">
                ({business.reviewCount} reviews)
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {business.reviews.map(review => <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start mb-4">
                  <img src={review.user.avatar} alt={review.user.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-medium">{review.user.name}</h4>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />)}
                    </div>
                  </div>
                </div>
                {review.title && <h3 className="font-medium text-lg mb-2">{review.title}</h3>}
                <p className="text-gray-700 mb-4">
                  {review.content.length > 150 ? `${review.content.substring(0, 150)}...` : review.content}
                </p>
                {review.photos && review.photos.length > 0 && <div className="flex flex-wrap gap-2 mb-4">
                    {review.photos.map((photo, index) => <img key={index} src={photo} alt={`Review photo ${index + 1}`} className="w-20 h-20 object-cover rounded-md" />)}
                  </div>}
                <div className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
                </div>
              </div>)}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Contact Us
              </h2>
              <p className="text-gray-700 mb-8">
                Have questions or feedback? We'd love to hear from you! Fill out
                the form or use the contact information provided.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <MapPinIcon className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Address</h3>
                    <p className="text-gray-600">{business.address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <PhoneIcon className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">{business.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MailIcon className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">contact@urbanbitescafe.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ClockIcon className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Hours</h3>
                    <div className="text-gray-600">
                      <p>Monday - Thursday: {business.hours.monday}</p>
                      <p>Friday: {business.hours.friday}</p>
                      <p>Saturday: {business.hours.saturday}</p>
                      <p>Sunday: {business.hours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  {business.socialMedia.facebook && <a href={business.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1877F2] text-white rounded-full hover:opacity-90 transition-opacity">
                      <FacebookIcon className="w-5 h-5" />
                    </a>}
                  {business.socialMedia.instagram && <a href={business.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#E1306C] text-white rounded-full hover:opacity-90 transition-opacity">
                      <InstagramIcon className="w-5 h-5" />
                    </a>}
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Send Us a Message
                </h3>
                <form onSubmit={e => {
                e.preventDefault();
                setContactModalOpen(true);
              }}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Your Message
                    </label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4" required></textarea>
                  </div>
                  <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Map Section */}
      <section className="h-96 bg-gray-200 relative">
        {/* This would be a real map in a production environment */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Interactive Map Would Be Here</p>
            <p className="text-gray-700 font-medium">{business.address}</p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">{business.name}</h3>
              <p className="mb-4 text-gray-300">
                A cozy café serving specialty coffee and fresh, healthy food in
                the heart of downtown.
              </p>
              <div className="flex space-x-4">
                {business.socialMedia.facebook && <a href={business.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    <FacebookIcon className="w-5 h-5" />
                  </a>}
                {business.socialMedia.instagram && <a href={business.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    <InstagramIcon className="w-5 h-5" />
                  </a>}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#menu" className="text-gray-300 hover:text-white transition-colors">
                    Menu
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="text-gray-300 hover:text-white transition-colors">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#events" className="text-gray-300 hover:text-white transition-colors">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Hours</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Monday - Thursday: {business.hours.monday}</li>
                <li>Friday: {business.hours.friday}</li>
                <li>Saturday: {business.hours.saturday}</li>
                <li>Sunday: {business.hours.sunday}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <MapPinIcon className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{business.address}</span>
                </li>
                <li className="flex items-center">
                  <PhoneIcon className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>{business.phone}</span>
                </li>
                <li className="flex items-center">
                  <MailIcon className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>contact@urbanbitescafe.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>
              &copy; {new Date().getFullYear()} {business.name}. All rights
              reserved.
            </p>
            <div className="mt-2 text-sm">
              <a href="#" className="text-gray-400 hover:text-white mx-2">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white mx-2">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white mx-2">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* Reservation Modal */}
      {reservationModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Make a Reservation</h3>
              <button onClick={() => setReservationModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleReservation}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Your Name
                </label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Date
                </label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Time
                </label>
                <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Party Size
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  <option value="">Select party size</option>
                  <option value="1">1 person</option>
                  <option value="2">2 people</option>
                  <option value="3">3 people</option>
                  <option value="4">4 people</option>
                  <option value="5">5 people</option>
                  <option value="6">6 people</option>
                  <option value="7+">7+ people</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Special Requests (optional)
                </label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setReservationModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>}
      {/* Contact Success Modal */}
      {contactModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for contacting us. We will get back to you as soon as
                possible.
              </p>
              <button onClick={() => setContactModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>}
    </div>;
}