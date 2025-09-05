// Move all your business-related interfaces here
export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  holidayHours?: Record<string, string>;
}
export interface Photo {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
  type: 'exterior' | 'interior' | 'food' | 'menu' | 'team' | 'other';
}
// ... other interfaces ...
export interface Business {
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
  socialMedia?: SocialLinks;
  reviews?: Review[];
  articles?: Article[];
  events?: Event[];
  rating?: number;
  reviewCount?: number;
  status: 'active' | 'pending' | 'suspended' | 'rejected';
  verified: boolean;
  featured: boolean;
}