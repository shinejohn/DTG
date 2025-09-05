import React, { useEffect, useState } from 'react';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { BuildingIcon, PhoneIcon, MailIcon, GlobeIcon, MapPinIcon, ClockIcon, ImageIcon, MenuIcon, CheckIcon, XIcon, PlusIcon, TrashIcon, SaveIcon, ChevronRightIcon, InfoIcon, AlertTriangleIcon, UploadIcon, InstagramIcon, FacebookIcon, TwitterIcon, LinkedinIcon, YoutubeIcon, TagIcon, WifiIcon, CreditCardIcon, AccessibilityIcon, UtensilsIcon, CoffeeIcon, BeerIcon, MusicIcon, TvIcon, DollarSignIcon, HashIcon, CheckCircleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
// Types
interface Business {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  shortDescription: string;
  contact: {
    phone: string;
    email: string;
    website: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
      latitude?: number;
      longitude?: number;
    };
  };
  hours: BusinessHours;
  features: string[];
  amenities: string[];
  paymentMethods: string[];
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  photos: Photo[];
  menu?: MenuItem[];
  services?: Service[];
  socialMedia?: SocialLinks;
  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}
interface Photo {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
  type: 'exterior' | 'interior' | 'food' | 'menu' | 'team' | 'other';
}
interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  holidayHours?: Record<string, string>;
}
interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  yelp?: string;
}
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  photoUrl?: string;
  popular?: boolean;
}
interface Service {
  id: string;
  name: string;
  description: string;
  price: number | string;
  duration?: string;
  category: string;
}
interface FormSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isCompleted: boolean;
  component: React.ReactNode;
}
// Mock data
const mockBusiness: Business = {
  id: '1',
  name: 'Urban Bites Café',
  category: 'Restaurants',
  subcategory: 'Café',
  description: 'A cozy café in the heart of downtown, serving specialty coffee, fresh pastries, and healthy breakfast and lunch options. Our ingredients are locally sourced and organic whenever possible. The relaxed atmosphere makes it perfect for working, meeting friends, or just enjoying a quiet moment with a great cup of coffee.',
  shortDescription: 'Cozy café serving specialty coffee and fresh, healthy food options.',
  contact: {
    phone: '(555) 123-4567',
    email: 'info@urbanbites.com',
    website: 'https://www.urbanbites.com',
    address: {
      street: '123 Main Street',
      city: 'Downtown',
      state: 'CA',
      zipCode: '90210',
      country: 'USA',
      latitude: 34.0522,
      longitude: -118.2437
    }
  },
  hours: {
    monday: '7:00 AM - 8:00 PM',
    tuesday: '7:00 AM - 8:00 PM',
    wednesday: '7:00 AM - 8:00 PM',
    thursday: '7:00 AM - 8:00 PM',
    friday: '7:00 AM - 9:00 PM',
    saturday: '8:00 AM - 9:00 PM',
    sunday: '8:00 AM - 6:00 PM'
  },
  features: ['Outdoor Seating', 'Takeout', 'Delivery', 'Vegetarian Options', 'Vegan Options', 'Gluten-Free Options'],
  amenities: ['Free Wi-Fi', 'Restrooms', 'Air Conditioning', 'Wheelchair Accessible', 'Pet Friendly', 'Power Outlets'],
  paymentMethods: ['Credit Cards', 'Apple Pay', 'Google Pay', 'Cash'],
  priceRange: '$$',
  photos: [{
    id: '1',
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1200&q=60',
    alt: 'Urban Bites Café storefront',
    isPrimary: true,
    type: 'exterior'
  }, {
    id: '2',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNhZmV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    alt: 'Interior of Urban Bites Café',
    type: 'interior'
  }, {
    id: '3',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29mZmVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    alt: 'Coffee being prepared',
    type: 'food'
  }, {
    id: '4',
    url: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnJlYWtmYXN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    alt: 'Breakfast plate with eggs and toast',
    type: 'food'
  }, {
    id: '5',
    url: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2FmZSUyMHBhdGlvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    alt: 'Outdoor patio seating',
    type: 'exterior'
  }, {
    id: '6',
    url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cGFzdHJ5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    alt: 'Fresh pastries',
    type: 'food'
  }],
  menu: [{
    id: 'm1',
    name: 'Avocado Toast',
    description: 'Smashed avocado on artisan sourdough with cherry tomatoes, microgreens, and a poached egg',
    price: 12.99,
    category: 'Breakfast',
    photoUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZvY2FkbyUyMHRvYXN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    popular: true
  }, {
    id: 'm2',
    name: 'Acai Bowl',
    description: 'Organic acai blend topped with granola, fresh berries, banana, and honey',
    price: 10.99,
    category: 'Breakfast',
    photoUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWNhaSUyMGJvd2x8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    popular: true
  }, {
    id: 'm3',
    name: 'Specialty Latte',
    description: 'House-made vanilla or caramel syrup with espresso and steamed milk of your choice',
    price: 5.5,
    category: 'Drinks',
    photoUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bGF0dGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  }, {
    id: 'm4',
    name: 'Caprese Panini',
    description: 'Fresh mozzarella, tomato, and basil on ciabatta with balsamic glaze, served with side salad',
    price: 13.99,
    category: 'Lunch',
    photoUrl: 'https://images.unsplash.com/photo-1481070414801-51fd732d7184?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFuaW5pfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  }, {
    id: 'm5',
    name: 'Quinoa Salad Bowl',
    description: 'Organic quinoa with roasted vegetables, avocado, and lemon tahini dressing',
    price: 14.99,
    category: 'Lunch',
    photoUrl: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cXVpbm9hJTIwc2FsYWR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    popular: true
  }, {
    id: 'm6',
    name: 'Chocolate Croissant',
    description: 'Flaky butter croissant filled with dark chocolate',
    price: 4.5,
    category: 'Pastries',
    photoUrl: 'https://images.unsplash.com/photo-1623334044303-241021148842?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwY3JvaXNzYW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  }],
  socialMedia: {
    facebook: 'https://facebook.com/urbanbites',
    instagram: 'https://instagram.com/urbanbites',
    twitter: 'https://twitter.com/urbanbites'
  },
  seo: {
    metaTitle: 'Urban Bites Café | Specialty Coffee & Healthy Food in Downtown',
    metaDescription: 'Urban Bites Café offers specialty coffee, fresh pastries, and healthy breakfast and lunch options in Downtown. Visit us for a cozy atmosphere and locally-sourced ingredients.',
    keywords: ['café', 'coffee shop', 'downtown café', 'healthy breakfast', 'organic food', 'specialty coffee', 'vegan options', 'gluten-free', 'outdoor seating']
  }
};
// Available options for features, amenities, etc.
const availableFeatures = ['Outdoor Seating', 'Takeout', 'Delivery', 'Vegetarian Options', 'Vegan Options', 'Gluten-Free Options', 'Reservations', 'Private Dining', 'Happy Hour', 'Live Music', 'Catering', 'Kids Menu', 'BYOB', 'Full Bar', 'Wine List', 'Craft Beer'];
const availableAmenities = ['Free Wi-Fi', 'Restrooms', 'Air Conditioning', 'Heating', 'Wheelchair Accessible', 'Pet Friendly', 'Power Outlets', 'TV', 'Parking', 'Bike Racks', 'Smoking Area', 'Non-Smoking', 'High Chairs', 'Booster Seats', 'Changing Tables'];
const availablePaymentMethods = ['Credit Cards', 'Debit Cards', 'Cash', 'Mobile Payments', 'Apple Pay', 'Google Pay', 'PayPal', 'Venmo', 'Cryptocurrency'];
const categories = ['Restaurants', 'Cafés', 'Bars', 'Shopping', 'Entertainment', 'Services', 'Health & Wellness', 'Accommodation', 'Transportation', 'Education', 'Professional Services'];
const subcategories: Record<string, string[]> = {
  Restaurants: ['American', 'Italian', 'Chinese', 'Japanese', 'Mexican', 'Indian', 'Thai', 'Mediterranean', 'Steakhouse', 'Seafood', 'Vegetarian', 'Vegan', 'Fast Food', 'Pizza', 'Sushi', 'Barbecue', 'Deli', 'Bakery'],
  Cafés: ['Coffee Shop', 'Espresso Bar', 'Tea House', 'Juice Bar', 'Smoothie Shop', 'Breakfast & Brunch', 'Dessert Shop', 'Ice Cream Shop'],
  Bars: ['Pub', 'Sports Bar', 'Wine Bar', 'Cocktail Bar', 'Brewery', 'Nightclub', 'Lounge', 'Karaoke Bar'],
  Shopping: ['Clothing', 'Shoes', 'Jewelry', 'Books', 'Electronics', 'Home Goods', 'Furniture', 'Grocery', 'Specialty Food', 'Gifts', 'Art', 'Antiques'],
  Entertainment: ['Movie Theater', 'Theater', 'Museum', 'Art Gallery', 'Live Music Venue', 'Arcade', 'Bowling', 'Comedy Club'],
  Services: ['Hair Salon', 'Barber Shop', 'Nail Salon', 'Spa', 'Laundry', 'Dry Cleaning', 'Tailor', 'Auto Repair', 'Pet Services', 'Printing']
};
export function BusinessProfileEditor() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('basic');
  const [formState, setFormState] = useState<Business | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: ''
  });
  const [newService, setNewService] = useState<Partial<Service>>({
    name: '',
    description: '',
    price: 0,
    category: ''
  });
  const [newHolidayHours, setNewHolidayHours] = useState({
    date: '',
    hours: ''
  });
  // Fetch business data
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use the mock data
    setLoading(true);
    setTimeout(() => {
      setBusiness(mockBusiness);
      setFormState(mockBusiness);
      setLoading(false);
    }, 500);
  }, []);
  // Scroll to the section when hash changes
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      setActiveSection(hash);
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  }, [window.location.hash]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, section?: string, subsection?: string) => {
    const {
      name,
      value
    } = e.target;
    setFormState(prev => {
      if (!prev) return prev;
      if (section && subsection) {
        return {
          ...prev,
          [section]: {
            ...prev[section as keyof Business],
            [subsection]: {
              ...(prev[section as keyof Business] as any)[subsection],
              [name]: value
            }
          }
        };
      } else if (section) {
        return {
          ...prev,
          [section]: {
            ...prev[section as keyof Business],
            [name]: value
          }
        };
      } else {
        return {
          ...prev,
          [name]: value
        };
      }
    });
  };
  const handleCheckboxChange = (name: string, value: string, checked: boolean, section?: string) => {
    setFormState(prev => {
      if (!prev) return prev;
      let currentValues: string[];
      if (section) {
        currentValues = [...(prev[section as keyof Business] as any || [])];
      } else {
        currentValues = [...(prev[name as keyof Business] as any || [])];
      }
      if (checked) {
        currentValues.push(value);
      } else {
        currentValues = currentValues.filter(v => v !== value);
      }
      if (section) {
        return {
          ...prev,
          [section]: currentValues
        };
      } else {
        return {
          ...prev,
          [name]: currentValues
        };
      }
    });
  };
  const handleAddMenuItem = () => {
    if (!newMenuItem.name || !newMenuItem.description || !newMenuItem.category || !newMenuItem.price) {
      return;
    }
    setFormState(prev => {
      if (!prev) return prev;
      const newMenu = [...(prev.menu || [])];
      newMenu.push({
        id: `m${Date.now()}`,
        name: newMenuItem.name || '',
        description: newMenuItem.description || '',
        price: Number(newMenuItem.price) || 0,
        category: newMenuItem.category || '',
        photoUrl: newMenuItem.photoUrl,
        popular: newMenuItem.popular
      });
      return {
        ...prev,
        menu: newMenu
      };
    });
    setNewMenuItem({
      name: '',
      description: '',
      price: 0,
      category: ''
    });
  };
  const handleRemoveMenuItem = (id: string) => {
    setFormState(prev => {
      if (!prev || !prev.menu) return prev;
      return {
        ...prev,
        menu: prev.menu.filter(item => item.id !== id)
      };
    });
  };
  const handleAddService = () => {
    if (!newService.name || !newService.description || !newService.category || !newService.price) {
      return;
    }
    setFormState(prev => {
      if (!prev) return prev;
      const newServices = [...(prev.services || [])];
      newServices.push({
        id: `s${Date.now()}`,
        name: newService.name || '',
        description: newService.description || '',
        price: Number(newService.price) || 0,
        category: newService.category || '',
        duration: newService.duration
      });
      return {
        ...prev,
        services: newServices
      };
    });
    setNewService({
      name: '',
      description: '',
      price: 0,
      category: ''
    });
  };
  const handleRemoveService = (id: string) => {
    setFormState(prev => {
      if (!prev || !prev.services) return prev;
      return {
        ...prev,
        services: prev.services.filter(service => service.id !== id)
      };
    });
  };
  const handleAddHolidayHours = () => {
    if (!newHolidayHours.date || !newHolidayHours.hours) {
      return;
    }
    setFormState(prev => {
      if (!prev) return prev;
      const holidayHours = {
        ...(prev.hours.holidayHours || {})
      };
      holidayHours[newHolidayHours.date] = newHolidayHours.hours;
      return {
        ...prev,
        hours: {
          ...prev.hours,
          holidayHours
        }
      };
    });
    setNewHolidayHours({
      date: '',
      hours: ''
    });
  };
  const handleRemoveHolidayHours = (date: string) => {
    setFormState(prev => {
      if (!prev || !prev.hours.holidayHours) return prev;
      const holidayHours = {
        ...prev.hours.holidayHours
      };
      delete holidayHours[date];
      return {
        ...prev,
        hours: {
          ...prev.hours,
          holidayHours
        }
      };
    });
  };
  const handleSaveForm = () => {
    // Validate form
    const errors: Record<string, string> = {};
    if (!formState?.name) {
      errors.name = 'Business name is required';
    }
    if (!formState?.category) {
      errors.category = 'Category is required';
    }
    if (!formState?.description) {
      errors.description = 'Description is required';
    }
    if (!formState?.contact.phone) {
      errors['contact.phone'] = 'Phone number is required';
    }
    if (!formState?.contact.email) {
      errors['contact.email'] = 'Email is required';
    }
    if (!formState?.contact.address.street) {
      errors['contact.address.street'] = 'Street address is required';
    }
    if (!formState?.contact.address.city) {
      errors['contact.address.city'] = 'City is required';
    }
    if (!formState?.contact.address.state) {
      errors['contact.address.state'] = 'State is required';
    }
    if (!formState?.contact.address.zipCode) {
      errors['contact.address.zipCode'] = 'ZIP code is required';
    }
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      // In a real app, this would send the form data to an API
      setIsSaving(true);
      setTimeout(() => {
        setBusiness(formState);
        setIsSaving(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }, 1000);
    } else {
      // Scroll to the first error
      const firstErrorField = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (firstErrorField) {
        firstErrorField.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  };
  const handleUploadPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    // In a real app, this would upload the files to a server
    setUploadingPhotos(true);
    setTimeout(() => {
      const newPhotos: Photo[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Create a temporary URL for the file
        const url = URL.createObjectURL(file);
        newPhotos.push({
          id: `p${Date.now() + i}`,
          url: url,
          alt: file.name.split('.')[0],
          type: 'other'
        });
      }
      setFormState(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          photos: [...prev.photos, ...newPhotos]
        };
      });
      setUploadingPhotos(false);
    }, 1500);
  };
  const handleRemovePhoto = (id: string) => {
    setFormState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        photos: prev.photos.filter(photo => photo.id !== id)
      };
    });
  };
  const handleSetPrimaryPhoto = (id: string) => {
    setFormState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        photos: prev.photos.map(photo => ({
          ...photo,
          isPrimary: photo.id === id
        }))
      };
    });
  };
  const handlePhotoTypeChange = (id: string, type: Photo['type']) => {
    setFormState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        photos: prev.photos.map(photo => photo.id === id ? {
          ...photo,
          type
        } : photo)
      };
    });
  };
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading business profile...</p>
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </main>
        <Footer />
      </div>;
  }
  if (!business || !formState) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Business Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              We couldn't find your business information.
            </p>
            <Link to="/business/register" className="text-blue-600 hover:text-blue-800 font-medium">
              Register Your Business
            </Link>
          </div>
        </main>
        <Footer />
      </div>;
  }
  // Define form sections
  const formSections: FormSection[] = [{
    id: 'basic',
    title: 'Basic Information',
    description: 'General information about your business',
    icon: <BuildingIcon className="w-5 h-5" />,
    isCompleted: !!(formState.name && formState.category && formState.description),
    component: <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Business Name*
            </label>
            <input type="text" id="name" name="name" value={formState.name} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-md ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`} />
            {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category*
              </label>
              <select id="category" name="category" value={formState.category} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-md ${formErrors.category ? 'border-red-500' : 'border-gray-300'}`}>
                <option value="">Select a category</option>
                {categories.map(category => <option key={category} value={category}>
                    {category}
                  </option>)}
              </select>
              {formErrors.category && <p className="mt-1 text-sm text-red-600">
                  {formErrors.category}
                </p>}
            </div>
            <div>
              <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
                Subcategory
              </label>
              <select id="subcategory" name="subcategory" value={formState.subcategory || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" disabled={!formState.category || !subcategories[formState.category]}>
                <option value="">Select a subcategory</option>
                {formState.category && subcategories[formState.category]?.map(subcategory => <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>)}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Full Description*
            </label>
            <textarea id="description" name="description" rows={5} value={formState.description} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-md ${formErrors.description ? 'border-red-500' : 'border-gray-300'}`} placeholder="Provide a detailed description of your business..."></textarea>
            {formErrors.description && <p className="mt-1 text-sm text-red-600">
                {formErrors.description}
              </p>}
            <p className="mt-1 text-xs text-gray-500">
              {formState.description.length}/1000 characters
            </p>
          </div>
          <div>
            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Short Description
            </label>
            <input type="text" id="shortDescription" name="shortDescription" value={formState.shortDescription} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Brief summary of your business (up to 100 characters)" maxLength={100} />
            <p className="mt-1 text-xs text-gray-500">
              {formState.shortDescription.length}/100 characters
            </p>
          </div>
          <div>
            <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
              Price Range
            </label>
            <div className="flex space-x-4">
              {['$', '$$', '$$$', '$$$$'].map(range => <label key={range} className="flex items-center">
                  <input type="radio" name="priceRange" value={range} checked={formState.priceRange === range} onChange={handleInputChange} className="mr-2" />
                  <span>{range}</span>
                </label>)}
            </div>
          </div>
        </div>
  }, {
    id: 'contact',
    title: 'Contact Information',
    description: 'How customers can reach you',
    icon: <PhoneIcon className="w-5 h-5" />,
    isCompleted: !!(formState.contact.phone && formState.contact.email && formState.contact.address.street),
    component: <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact.phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number*
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                  <PhoneIcon className="w-4 h-4" />
                </span>
                <input type="tel" id="contact.phone" name="phone" value={formState.contact.phone} onChange={e => handleInputChange(e, 'contact')} className={`flex-1 px-3 py-2 border rounded-r-md ${formErrors['contact.phone'] ? 'border-red-500' : 'border-gray-300'}`} />
              </div>
              {formErrors['contact.phone'] && <p className="mt-1 text-sm text-red-600">
                  {formErrors['contact.phone']}
                </p>}
            </div>
            <div>
              <label htmlFor="contact.email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address*
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                  <MailIcon className="w-4 h-4" />
                </span>
                <input type="email" id="contact.email" name="email" value={formState.contact.email} onChange={e => handleInputChange(e, 'contact')} className={`flex-1 px-3 py-2 border rounded-r-md ${formErrors['contact.email'] ? 'border-red-500' : 'border-gray-300'}`} />
              </div>
              {formErrors['contact.email'] && <p className="mt-1 text-sm text-red-600">
                  {formErrors['contact.email']}
                </p>}
            </div>
          </div>
          <div>
            <label htmlFor="contact.website" className="block text-sm font-medium text-gray-700 mb-1">
              Website URL
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                <GlobeIcon className="w-4 h-4" />
              </span>
              <input type="url" id="contact.website" name="website" value={formState.contact.website} onChange={e => handleInputChange(e, 'contact')} className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md" placeholder="https://www.example.com" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Address</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="contact.address.street" className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address*
                </label>
                <input type="text" id="contact.address.street" name="street" value={formState.contact.address.street} onChange={e => handleInputChange(e, 'contact', 'address')} className={`w-full px-3 py-2 border rounded-md ${formErrors['contact.address.street'] ? 'border-red-500' : 'border-gray-300'}`} />
                {formErrors['contact.address.street'] && <p className="mt-1 text-sm text-red-600">
                    {formErrors['contact.address.street']}
                  </p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="contact.address.city" className="block text-sm font-medium text-gray-700 mb-1">
                    City*
                  </label>
                  <input type="text" id="contact.address.city" name="city" value={formState.contact.address.city} onChange={e => handleInputChange(e, 'contact', 'address')} className={`w-full px-3 py-2 border rounded-md ${formErrors['contact.address.city'] ? 'border-red-500' : 'border-gray-300'}`} />
                  {formErrors['contact.address.city'] && <p className="mt-1 text-sm text-red-600">
                      {formErrors['contact.address.city']}
                    </p>}
                </div>
                <div>
                  <label htmlFor="contact.address.state" className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province*
                  </label>
                  <input type="text" id="contact.address.state" name="state" value={formState.contact.address.state} onChange={e => handleInputChange(e, 'contact', 'address')} className={`w-full px-3 py-2 border rounded-md ${formErrors['contact.address.state'] ? 'border-red-500' : 'border-gray-300'}`} />
                  {formErrors['contact.address.state'] && <p className="mt-1 text-sm text-red-600">
                      {formErrors['contact.address.state']}
                    </p>}
                </div>
                <div>
                  <label htmlFor="contact.address.zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP/Postal Code*
                  </label>
                  <input type="text" id="contact.address.zipCode" name="zipCode" value={formState.contact.address.zipCode} onChange={e => handleInputChange(e, 'contact', 'address')} className={`w-full px-3 py-2 border rounded-md ${formErrors['contact.address.zipCode'] ? 'border-red-500' : 'border-gray-300'}`} />
                  {formErrors['contact.address.zipCode'] && <p className="mt-1 text-sm text-red-600">
                      {formErrors['contact.address.zipCode']}
                    </p>}
                </div>
              </div>
              <div>
                <label htmlFor="contact.address.country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input type="text" id="contact.address.country" name="country" value={formState.contact.address.country} onChange={e => handleInputChange(e, 'contact', 'address')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
            </div>
          </div>
        </div>
  }, {
    id: 'photos',
    title: 'Photos & Media',
    description: 'Showcase your business with images',
    icon: <ImageIcon className="w-5 h-5" />,
    isCompleted: formState.photos.length > 0,
    component: <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 rounded-md mr-3">
                <InfoIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Photo Guidelines</h3>
                <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                  <li>Upload high-quality, well-lit photos</li>
                  <li>
                    Include exterior, interior, and product/service photos
                  </li>
                  <li>Recommended size: at least 1000x750 pixels</li>
                  <li>Maximum file size: 5MB per image</li>
                  <li>Accepted formats: JPEG, PNG</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Upload Photos</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input type="file" id="photo-upload" multiple accept="image/jpeg, image/png" className="hidden" onChange={handleUploadPhotos} />
              <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center justify-center">
                <UploadIcon className="w-12 h-12 text-gray-400 mb-3" />
                <span className="text-gray-600 font-medium mb-1">
                  Drag photos here or click to upload
                </span>
                <span className="text-gray-500 text-sm">
                  Upload up to 10 photos at a time
                </span>
              </label>
            </div>
            {uploadingPhotos && <div className="mt-3 flex items-center">
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                <span className="text-sm text-gray-600">
                  Uploading photos...
                </span>
              </div>}
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">
              Current Photos ({formState.photos.length})
            </h3>
            {formState.photos.length === 0 ? <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-1">No photos uploaded yet</p>
                <p className="text-gray-500 text-sm">
                  Businesses with photos get 2x more views
                </p>
              </div> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {formState.photos.map(photo => <div key={photo.id} className={`border rounded-lg overflow-hidden ${photo.isPrimary ? 'ring-2 ring-blue-500' : ''}`}>
                    <div className="relative h-48">
                      <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <button onClick={() => handleRemovePhoto(photo.id)} className="p-1.5 bg-white rounded-full text-red-600 hover:bg-red-100 shadow-sm" title="Remove photo">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                      {photo.isPrimary && <div className="absolute top-2 left-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-md">
                            Primary Photo
                          </span>
                        </div>}
                    </div>
                    <div className="p-3">
                      <div className="mb-2">
                        <input type="text" value={photo.alt} onChange={e => {
                  setFormState(prev => {
                    if (!prev) return prev;
                    return {
                      ...prev,
                      photos: prev.photos.map(p => p.id === photo.id ? {
                        ...p,
                        alt: e.target.value
                      } : p)
                    };
                  });
                }} className="w-full px-2 py-1 text-sm border border-gray-300 rounded" placeholder="Photo description" />
                      </div>
                      <div className="flex justify-between items-center">
                        <select value={photo.type} onChange={e => handlePhotoTypeChange(photo.id, e.target.value as Photo['type'])} className="text-sm border border-gray-300 rounded px-2 py-1">
                          <option value="exterior">Exterior</option>
                          <option value="interior">Interior</option>
                          <option value="food">Food/Product</option>
                          <option value="menu">Menu</option>
                          <option value="team">Team</option>
                          <option value="other">Other</option>
                        </select>
                        {!photo.isPrimary && <button onClick={() => handleSetPrimaryPhoto(photo.id)} className="text-sm text-blue-600 hover:text-blue-800">
                            Set as Primary
                          </button>}
                      </div>
                    </div>
                  </div>)}
              </div>}
          </div>
        </div>
  }, {
    id: 'hours',
    title: 'Hours & Availability',
    description: 'When customers can visit you',
    icon: <ClockIcon className="w-5 h-5" />,
    isCompleted: true,
    component: <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Regular Hours</h3>
            <div className="space-y-3">
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => <div key={day} className="flex items-center">
                  <div className="w-28 font-medium capitalize">{day}</div>
                  <input type="text" name={day} value={(formState.hours as any)[day]} onChange={e => handleInputChange(e, 'hours')} className="flex-1 px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., 9:00 AM - 5:00 PM or Closed" />
                </div>)}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">
              Special or Holiday Hours
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <div className="p-2 bg-blue-100 rounded-md mr-3">
                  <InfoIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-sm text-gray-600">
                  Add special hours for holidays or events when your regular
                  hours change. This helps customers know when you're open
                  during holidays.
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {/* Current Holiday Hours */}
              {formState.hours.holidayHours && Object.keys(formState.hours.holidayHours).length > 0 && <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-3">Current Special Hours</h4>
                    <div className="space-y-2">
                      {Object.entries(formState.hours.holidayHours).map(([date, hours]) => <div key={date} className="flex items-center justify-between">
                            <div>
                              <span className="font-medium">
                                {new Date(date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                              </span>
                              <span className="ml-3 text-gray-600">
                                {hours}
                              </span>
                            </div>
                            <button onClick={() => handleRemoveHolidayHours(date)} className="text-red-600 hover:text-red-800">
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>)}
                    </div>
                  </div>}
              {/* Add New Holiday Hours */}
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-3">Add Special Hours</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="holiday-date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input type="date" id="holiday-date" value={newHolidayHours.date} onChange={e => setNewHolidayHours({
                  ...newHolidayHours,
                  date: e.target.value
                })} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="holiday-hours" className="block text-sm font-medium text-gray-700 mb-1">
                      Hours
                    </label>
                    <input type="text" id="holiday-hours" value={newHolidayHours.hours} onChange={e => setNewHolidayHours({
                  ...newHolidayHours,
                  hours: e.target.value
                })} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., 10:00 AM - 3:00 PM or Closed" />
                  </div>
                </div>
                <div className="mt-3">
                  <button onClick={handleAddHolidayHours} disabled={!newHolidayHours.date || !newHolidayHours.hours} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed">
                    Add Special Hours
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  }, {
    id: 'menu',
    title: 'Menu & Services',
    description: 'What you offer to customers',
    icon: <MenuIcon className="w-5 h-5" />,
    isCompleted: formState.menu && formState.menu.length > 0 || formState.services && formState.services.length > 0,
    component: <div className="space-y-8">
          {/* Menu Items Section (for restaurants, cafes, etc.) */}
          <div>
            <h3 className="text-lg font-medium mb-3">Menu Items</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <div className="p-2 bg-blue-100 rounded-md mr-3">
                  <InfoIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-sm text-gray-600">
                  Add your most popular or signature menu items. This helps
                  customers see what you offer before they visit. You can add
                  more details like prices, descriptions, and photos.
                </div>
              </div>
            </div>
            {/* Current Menu Items */}
            {formState.menu && formState.menu.length > 0 ? <div className="space-y-4 mb-6">
                {formState.menu.map(item => <div key={item.id} className="border rounded-md p-4">
                    <div className="flex justify-between">
                      <div className="flex-grow">
                        <div className="flex items-center mb-1">
                          <h4 className="font-medium">{item.name}</h4>
                          {item.popular && <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                              Popular
                            </span>}
                          <span className="ml-auto font-medium">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          {item.description}
                        </p>
                        <div className="text-sm text-gray-500">
                          Category: {item.category}
                        </div>
                      </div>
                      <div className="ml-4">
                        <button onClick={() => handleRemoveMenuItem(item.id)} className="text-red-600 hover:text-red-800">
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>)}
              </div> : <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center mb-6">
                <UtensilsIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-1">No menu items added yet</p>
                <p className="text-gray-500 text-sm">
                  Add your popular dishes to attract more customers
                </p>
              </div>}
            {/* Add New Menu Item */}
            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-3">Add Menu Item</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="menu-item-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Item Name*
                    </label>
                    <input type="text" id="menu-item-name" value={newMenuItem.name || ''} onChange={e => setNewMenuItem({
                  ...newMenuItem,
                  name: e.target.value
                })} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="menu-item-price" className="block text-sm font-medium text-gray-700 mb-1">
                      Price*
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                        $
                      </span>
                      <input type="number" id="menu-item-price" value={newMenuItem.price || ''} onChange={e => setNewMenuItem({
                    ...newMenuItem,
                    price: parseFloat(e.target.value) || 0
                  })} step="0.01" min="0" className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md" />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="menu-item-description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <textarea id="menu-item-description" value={newMenuItem.description || ''} onChange={e => setNewMenuItem({
                ...newMenuItem,
                description: e.target.value
              })} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="menu-item-category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category*
                    </label>
                    <input type="text" id="menu-item-category" value={newMenuItem.category || ''} onChange={e => setNewMenuItem({
                  ...newMenuItem,
                  category: e.target.value
                })} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., Breakfast, Lunch, Desserts" />
                  </div>
                  <div>
                    <label htmlFor="menu-item-photo" className="block text-sm font-medium text-gray-700 mb-1">
                      Photo URL (Optional)
                    </label>
                    <input type="url" id="menu-item-photo" value={newMenuItem.photoUrl || ''} onChange={e => setNewMenuItem({
                  ...newMenuItem,
                  photoUrl: e.target.value
                })} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="https://example.com/photo.jpg" />
                  </div>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="menu-item-popular" checked={newMenuItem.popular || false} onChange={e => setNewMenuItem({
                ...newMenuItem,
                popular: e.target.checked
              })} className="mr-2" />
                  <label htmlFor="menu-item-popular" className="text-sm text-gray-700">
                    Mark as popular item
                  </label>
                </div>
                <div>
                  <button onClick={handleAddMenuItem} disabled={!newMenuItem.name || !newMenuItem.description || !newMenuItem.category || !newMenuItem.price} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed">
                    Add Menu Item
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Services Section (for service businesses) */}
          <div>
            <h3 className="text-lg font-medium mb-3">Services</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <div className="p-2 bg-blue-100 rounded-md mr-3">
                  <InfoIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-sm text-gray-600">
                  Add services you offer with descriptions and pricing. This is
                  useful for businesses like salons, spas, repair shops, etc.
                </div>
              </div>
            </div>
            {/* Current Services */}
            {formState.services && formState.services.length > 0 ? <div className="space-y-4 mb-6">
                {formState.services.map(service => <div key={service.id} className="border rounded-md p-4">
                    <div className="flex justify-between">
                      <div className="flex-grow">
                        <div className="flex items-center mb-1">
                          <h4 className="font-medium">{service.name}</h4>
                          <span className="ml-auto font-medium">
                            $
                            {typeof service.price === 'number' ? service.price.toFixed(2) : service.price}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          {service.description}
                        </p>
                        <div className="flex text-sm text-gray-500">
                          <span>Category: {service.category}</span>
                          {service.duration && <span className="ml-4">
                              Duration: {service.duration}
                            </span>}
                        </div>
                      </div>
                      <div className="ml-4">
                        <button onClick={() => handleRemoveService(service.id)} className="text-red-600 hover:text-red-800">
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>)}
              </div> : <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center mb-6">
                <TagIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-1">No services added yet</p>
                <p className="text-gray-500 text-sm">
                  Add your services to help customers understand what you offer
                </p>
              </div>}
            {/* Add New Service */}
            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-3">Add Service</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="service-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Service Name*
                    </label>
                    <input type="text" id="service-name" value={newService.name || ''} onChange={e => setNewService({
                  ...newService,
                  name: e.target.value
                })} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="service-price" className="block text-sm font-medium text-gray-700 mb-1">
                      Price*
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                        $
                      </span>
                      <input type="number" id="service-price" value={newService.price || ''} onChange={e => setNewService({
                    ...newService,
                    price: parseFloat(e.target.value) || 0
                  })} step="0.01" min="0" className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md" />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="service-description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <textarea id="service-description" value={newService.description || ''} onChange={e => setNewService({
                ...newService,
                description: e.target.value
              })} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="service-category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category*
                    </label>
                    <input type="text" id="service-category" value={newService.category || ''} onChange={e => setNewService({
                  ...newService,
                  category: e.target.value
                })} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., Haircuts, Repairs, Consultations" />
                  </div>
                  <div>
                    <label htmlFor="service-duration" className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (Optional)
                    </label>
                    <input type="text" id="service-duration" value={newService.duration || ''} onChange={e => setNewService({
                  ...newService,
                  duration: e.target.value
                })} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., 30 minutes, 1 hour" />
                  </div>
                </div>
                <div>
                  <button onClick={handleAddService} disabled={!newService.name || !newService.description || !newService.category || !newService.price} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed">
                    Add Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  }, {
    id: 'features',
    title: 'Features & Amenities',
    description: 'What makes your business special',
    icon: <TagIcon className="w-5 h-5" />,
    isCompleted: formState.features.length > 0 || formState.amenities.length > 0,
    component: <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Features</h3>
            <p className="text-sm text-gray-600 mb-4">
              Select the features that apply to your business. These help
              customers understand what you offer.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {availableFeatures.map(feature => <label key={feature} className="flex items-center p-3 border rounded-md hover:bg-gray-50">
                  <input type="checkbox" checked={formState.features.includes(feature)} onChange={e => handleCheckboxChange('features', feature, e.target.checked)} className="mr-3" />
                  <span>{feature}</span>
                </label>)}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Amenities</h3>
            <p className="text-sm text-gray-600 mb-4">
              Select the amenities available at your business location.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {availableAmenities.map(amenity => <label key={amenity} className="flex items-center p-3 border rounded-md hover:bg-gray-50">
                  <input type="checkbox" checked={formState.amenities.includes(amenity)} onChange={e => handleCheckboxChange('amenities', amenity, e.target.checked)} className="mr-3" />
                  <span>{amenity}</span>
                </label>)}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Payment Methods</h3>
            <p className="text-sm text-gray-600 mb-4">
              Select the payment methods you accept at your business.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {availablePaymentMethods.map(method => <label key={method} className="flex items-center p-3 border rounded-md hover:bg-gray-50">
                  <input type="checkbox" checked={formState.paymentMethods.includes(method)} onChange={e => handleCheckboxChange('paymentMethods', method, e.target.checked)} className="mr-3" />
                  <span>{method}</span>
                </label>)}
            </div>
          </div>
        </div>
  }, {
    id: 'social',
    title: 'Social Media',
    description: 'Connect your online presence',
    icon: <InstagramIcon className="w-5 h-5" />,
    isCompleted: formState.socialMedia && Object.values(formState.socialMedia).some(Boolean),
    component: <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 rounded-md mr-3">
                <InfoIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm text-gray-600">
                Link your social media accounts to help customers connect with
                you across platforms. This can increase your online visibility
                and engagement.
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="p-2 bg-[#4267B2] text-white rounded-md mr-3">
                <FacebookIcon className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <label htmlFor="social-facebook" className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                <input type="url" id="social-facebook" name="facebook" value={formState.socialMedia?.facebook || ''} onChange={e => handleInputChange(e, 'socialMedia')} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="https://facebook.com/yourbusiness" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-2 bg-[#E1306C] text-white rounded-md mr-3">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <label htmlFor="social-instagram" className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <input type="url" id="social-instagram" name="instagram" value={formState.socialMedia?.instagram || ''} onChange={e => handleInputChange(e, 'socialMedia')} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="https://instagram.com/yourbusiness" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-2 bg-[#1DA1F2] text-white rounded-md mr-3">
                <TwitterIcon className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <label htmlFor="social-twitter" className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter
                </label>
                <input type="url" id="social-twitter" name="twitter" value={formState.socialMedia?.twitter || ''} onChange={e => handleInputChange(e, 'socialMedia')} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="https://twitter.com/yourbusiness" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-2 bg-[#0077B5] text-white rounded-md mr-3">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <label htmlFor="social-linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <input type="url" id="social-linkedin" name="linkedin" value={formState.socialMedia?.linkedin || ''} onChange={e => handleInputChange(e, 'socialMedia')} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="https://linkedin.com/company/yourbusiness" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-2 bg-[#FF0000] text-white rounded-md mr-3">
                <YoutubeIcon className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <label htmlFor="social-youtube" className="block text-sm font-medium text-gray-700 mb-1">
                  YouTube
                </label>
                <input type="url" id="social-youtube" name="youtube" value={formState.socialMedia?.youtube || ''} onChange={e => handleInputChange(e, 'socialMedia')} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="https://youtube.com/c/yourbusiness" />
              </div>
            </div>
          </div>
        </div>
  }, {
    id: 'seo',
    title: 'SEO Settings',
    description: 'Optimize your online visibility',
    icon: <HashIcon className="w-5 h-5" />,
    isCompleted: formState.seo && formState.seo.metaTitle && formState.seo.metaDescription,
    component: <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 rounded-md mr-3">
                <InfoIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm text-gray-600">
                These settings help improve your visibility in search engines. A
                good meta title and description can increase clicks to your
                business profile.
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="seo-title" className="block text-sm font-medium text-gray-700 mb-1">
              Meta Title
            </label>
            <input type="text" id="seo-title" name="metaTitle" value={formState.seo?.metaTitle || ''} onChange={e => handleInputChange(e, 'seo')} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., Urban Bites Café | Specialty Coffee & Healthy Food in Downtown" />
            <p className="mt-1 text-xs text-gray-500">
              {(formState.seo?.metaTitle || '').length}/60 characters
              (recommended: 50-60)
            </p>
          </div>
          <div>
            <label htmlFor="seo-description" className="block text-sm font-medium text-gray-700 mb-1">
              Meta Description
            </label>
            <textarea id="seo-description" name="metaDescription" rows={3} value={formState.seo?.metaDescription || ''} onChange={e => handleInputChange(e, 'seo')} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Brief description of your business for search results..."></textarea>
            <p className="mt-1 text-xs text-gray-500">
              {(formState.seo?.metaDescription || '').length}/160 characters
              (recommended: 120-160)
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keywords
            </label>
            <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-md mb-2">
              {formState.seo?.keywords && formState.seo.keywords.length > 0 ? formState.seo.keywords.map((keyword, index) => <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md flex items-center">
                    {keyword}
                    <button type="button" onClick={() => {
              setFormState(prev => {
                if (!prev || !prev.seo) return prev;
                return {
                  ...prev,
                  seo: {
                    ...prev.seo,
                    keywords: prev.seo.keywords.filter((_, i) => i !== index)
                  }
                };
              });
            }} className="ml-1 text-blue-600 hover:text-blue-800">
                      <XIcon className="w-3 h-3" />
                    </button>
                  </span>) : <span className="text-gray-500 text-sm">
                  No keywords added yet
                </span>}
            </div>
            <div className="flex">
              <input type="text" id="new-keyword" placeholder="Add a keyword..." className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md" onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const input = e.target as HTMLInputElement;
              const keyword = input.value.trim();
              if (keyword) {
                setFormState(prev => {
                  if (!prev) return prev;
                  const currentSeo = prev.seo || {
                    metaTitle: '',
                    metaDescription: '',
                    keywords: []
                  };
                  const currentKeywords = currentSeo.keywords || [];
                  return {
                    ...prev,
                    seo: {
                      ...currentSeo,
                      keywords: [...currentKeywords, keyword]
                    }
                  };
                });
                input.value = '';
              }
            }
          }} />
              <button type="button" onClick={e => {
            const input = document.getElementById('new-keyword') as HTMLInputElement;
            const keyword = input.value.trim();
            if (keyword) {
              setFormState(prev => {
                if (!prev) return prev;
                const currentSeo = prev.seo || {
                  metaTitle: '',
                  metaDescription: '',
                  keywords: []
                };
                const currentKeywords = currentSeo.keywords || [];
                return {
                  ...prev,
                  seo: {
                    ...currentSeo,
                    keywords: [...currentKeywords, keyword]
                  }
                };
              });
              input.value = '';
            }
          }} className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                Add
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Press Enter or click Add to add a keyword. Recommended: 5-10
              relevant keywords.
            </p>
          </div>
        </div>
  }];
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Edit Business Profile</h1>
            <p className="text-gray-600">
              Update your business information and settings
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/business/dashboard" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
              Cancel
            </Link>
            <button onClick={handleSaveForm} disabled={isSaving} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
              {isSaving ? <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving...
                </> : <>
                  <SaveIcon className="w-4 h-4 mr-2" />
                  Save Changes
                </>}
            </button>
          </div>
        </div>
        {saveSuccess && <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg flex items-start">
            <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-800">
                Changes saved successfully
              </h3>
              <p className="text-green-600 text-sm">
                Your business profile has been updated. These changes are now
                live.
              </p>
            </div>
          </div>}
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="flex min-w-max border-b">
              {formSections.map(section => <button key={section.id} onClick={() => {
              setActiveSection(section.id);
              const element = document.getElementById(section.id);
              if (element) {
                element.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }} className={`flex items-center px-6 py-3 text-sm font-medium whitespace-nowrap ${activeSection === section.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`}>
                  <span className="mr-2">{section.icon}</span>
                  <span>{section.title}</span>
                  {section.isCompleted && <CheckIcon className="w-4 h-4 text-green-500 ml-2" />}
                </button>)}
            </div>
          </div>
        </div>
        {/* Form Content */}
        <div className="w-full">
          <div className="space-y-8">
            {formSections.map(section => <div key={section.id} id={section.id} className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-1">{section.title}</h2>
                <p className="text-gray-600 mb-6">{section.description}</p>
                {section.component}
              </div>)}
            <div className="flex justify-end space-x-3">
              <Link to="/business/dashboard" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                Cancel
              </Link>
              <button onClick={handleSaveForm} disabled={isSaving} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                {isSaving ? <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </> : <>
                    <SaveIcon className="w-4 h-4 mr-2" />
                    Save Changes
                  </>}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}